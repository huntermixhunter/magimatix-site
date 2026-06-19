// Uploads the DATA Dashboard product zip to Vercel Blob and prints the URL to
// put in DATA_DOWNLOAD_URL (server-only env var). The blob URL is unguessable
// (random suffix) and is never exposed to buyers — the /api/download route
// streams the bytes after verifying a paid Stripe session.
//
// Usage:
//   1. Set BLOB_READ_WRITE_TOKEN in .env.local (from the Vercel Blob store).
//   2. node scripts/upload-data-zip.mjs "C:\\path\\to\\DATA-v1.0.8.zip"
//
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { put } from "@vercel/blob";
import { config } from "dotenv";

config({ path: ".env.local" });

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/upload-data-zip.mjs "<path-to-zip>"');
  process.exit(1);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const data = await readFile(filePath);
const name = basename(filePath);

const blob = await put(`data-product/${name}`, data, {
  access: "public", // Vercel Blob only supports public; URL is unguessable
  addRandomSuffix: true,
  contentType: "application/zip",
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

console.log("\nUploaded:", name);
console.log("Set this in your env (DATA_DOWNLOAD_URL):\n");
console.log(blob.url);
