#!/usr/bin/env node
/**
 * generate-favicons.mjs
 *
 * Regenerates the favicon set from public/logo.png.
 *
 * The Magimatix logo is an "MM" cosmic-gradient monogram with the wordmark
 * "MAGIMATIX" underneath. At favicon sizes (16x16, 32x32, 180x180) the
 * wordmark is illegible, so we extract only the monogram and use that.
 *
 * Outputs (Next.js app-router file conventions — see
 *   node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md):
 *
 *   src/app/favicon.ico    — multi-resolution ICO (16, 32, 48) — legacy fallback
 *   src/app/icon.png       — 512x512 PNG, modern browsers prefer this
 *   src/app/apple-icon.png — 180x180 PNG for iOS home screen
 *
 * Re-run with: node scripts/generate-favicons.mjs
 */

import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "public/logo.png");
const APP = resolve(ROOT, "src/app");

// Monogram bounding box inside logo.png, established by brightness scan
// (see scripts/_favicon_crop_*.png exploration). The logo is 1633x598;
// the MM monogram occupies roughly x=335..1323, y=14..395.
//
// We add a small breathing-room margin so the monogram does not touch the
// favicon edge.
const MONO_LEFT = 305;
const MONO_TOP = 0;
const MONO_WIDTH = 1050;
const MONO_HEIGHT = 410;

// Magimatix brand-dark — matches the site's bg-black palette so the favicon
// reads as a square chip on light backgrounds (browser light mode) instead of
// a ragged transparent silhouette.
const BG = { r: 0, g: 0, b: 0, alpha: 1 };

async function buildSquarePng(size, padding = 0.08) {
  const inner = Math.round(size * (1 - padding * 2));
  const monogram = await sharp(SOURCE)
    .extract({
      left: MONO_LEFT,
      top: MONO_TOP,
      width: MONO_WIDTH,
      height: MONO_HEIGHT,
    })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Composite onto a square solid-black canvas
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: monogram, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  console.log("→ Generating icon.png (512x512)");
  const icon512 = await buildSquarePng(512);
  writeFileSync(resolve(APP, "icon.png"), icon512);

  console.log("→ Generating apple-icon.png (180x180)");
  const apple180 = await buildSquarePng(180);
  writeFileSync(resolve(APP, "apple-icon.png"), apple180);

  console.log("→ Generating favicon.ico (16, 32, 48)");
  const [ico16, ico32, ico48] = await Promise.all([
    buildSquarePng(16, 0.04),
    buildSquarePng(32, 0.06),
    buildSquarePng(48, 0.08),
  ]);
  const icoBuffer = await pngToIco([ico16, ico32, ico48]);
  writeFileSync(resolve(APP, "favicon.ico"), icoBuffer);

  console.log("✓ Favicon set regenerated in src/app/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
