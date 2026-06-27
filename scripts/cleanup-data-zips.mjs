// Lists every blob under data-product/ and deletes all EXCEPT the live one
// named in DATA_DOWNLOAD_URL. Dry-run by default; pass --apply to delete.
//
//   node scripts/cleanup-data-zips.mjs           # preview
//   node scripts/cleanup-data-zips.mjs --apply    # actually delete
//
import { list, del } from "@vercel/blob";
import { config } from "dotenv";

config({ path: ".env.local" });

const apply = process.argv.includes("--apply");
const token = process.env.BLOB_READ_WRITE_TOKEN;
const liveUrl = (process.env.DATA_DOWNLOAD_URL || "").trim();

if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
  process.exit(1);
}
if (!liveUrl) {
  console.error("Missing DATA_DOWNLOAD_URL in .env.local — refusing to run without a protected URL.");
  process.exit(1);
}

const { blobs } = await list({ prefix: "data-product/", token, limit: 1000 });

if (!blobs.length) {
  console.log("No blobs found under data-product/.");
  process.exit(0);
}

// Normalize for matching (ignore trailing query if any)
const norm = (u) => u.split("?")[0];
const liveNorm = norm(liveUrl);

const keep = [];
const remove = [];
for (const b of blobs) {
  if (norm(b.url) === liveNorm) keep.push(b);
  else remove.push(b);
}

console.log(`\nFound ${blobs.length} blob(s) under data-product/\n`);
console.log("KEEP (live):");
keep.forEach((b) => console.log(`  ✓ ${b.pathname}  (${(b.size / 1048576).toFixed(2)} MB)`));
if (!keep.length) {
  console.error("\n⚠ The live DATA_DOWNLOAD_URL did not match ANY blob. Aborting to avoid deleting the live file.");
  process.exit(1);
}

console.log(`\n${apply ? "DELETING" : "WOULD DELETE"} (${remove.length}):`);
remove.forEach((b) => console.log(`  ✗ ${b.pathname}  (${(b.size / 1048576).toFixed(2)} MB)`));

if (!remove.length) {
  console.log("\nNothing to delete — store already clean.");
  process.exit(0);
}

if (!apply) {
  console.log("\nDry run. Re-run with --apply to delete the above.");
  process.exit(0);
}

await del(remove.map((b) => b.url), { token });
console.log(`\nDeleted ${remove.length} old zip(s). Live v1.0.16 retained.`);
