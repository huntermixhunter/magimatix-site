// Uploads a DATA Daemon product file to Vercel Blob and prints the URL to put
// in the matching server-only env var. The blob URL is unguessable (random
// suffix) and is never exposed to buyers — the /api/download route streams the
// bytes after verifying a paid Stripe session.
//
// Handles both product formats, picked automatically by file extension:
//   • .zip → DATA_DOWNLOAD_URL  (cross-platform: Windows / macOS / Linux)
//   • .exe → DATA_INSTALLER_URL (Windows one-click installer)
//
// Usage:
//   1. Set BLOB_READ_WRITE_TOKEN in .env.local (from the Vercel Blob store).
//   2. node scripts/upload-data-zip.mjs "C:\\path\\to\\DATA-v1.0.23.zip"
//      node scripts/upload-data-zip.mjs "C:\\path\\to\\DATA-Setup-v1.0.23.exe"
//
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import { put } from "@vercel/blob";
import { config } from "dotenv";

config({ path: ".env.local" });

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/upload-data-zip.mjs "<path-to-zip-or-exe>"');
  process.exit(1);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const ext = extname(filePath).toLowerCase();
const FORMATS = {
  ".zip": { contentType: "application/zip", envVar: "DATA_DOWNLOAD_URL" },
  ".exe": {
    contentType: "application/octet-stream",
    envVar: "DATA_INSTALLER_URL",
  },
};
const fmt = FORMATS[ext];
if (!fmt) {
  console.error(`Unsupported file type "${ext}". Expected .zip or .exe.`);
  process.exit(1);
}

const data = await readFile(filePath);
const name = basename(filePath);

const blob = await put(`data-product/${name}`, data, {
  access: "public", // Vercel Blob only supports public; URL is unguessable
  addRandomSuffix: true,
  contentType: fmt.contentType,
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

console.log("\nUploaded:", name);
console.log(`Set this in your env (${fmt.envVar}):\n`);
console.log(blob.url);
