// Lists all DATA product zips in the Vercel Blob store.
import { list } from "@vercel/blob";
import { config } from "dotenv";

config({ path: ".env.local" });

const { blobs } = await list({
  prefix: "data-product/",
  token: process.env.BLOB_READ_WRITE_TOKEN,
  limit: 1000,
});

blobs.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
let total = 0;
for (const b of blobs) {
  total += b.size;
  console.log(
    `${(b.size / 1024 / 1024).toFixed(2).padStart(7)} MB  ${new Date(b.uploadedAt).toISOString()}  ${b.pathname}`
  );
}
console.log(`\n${blobs.length} blobs, ${(total / 1024 / 1024).toFixed(2)} MB total`);
console.log("\n--- URLs ---");
for (const b of blobs) console.log(b.url);
