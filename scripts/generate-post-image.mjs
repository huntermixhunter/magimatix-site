#!/usr/bin/env node
/**
 * generate-post-image.mjs
 *
 * Generate a hero image for a blog post via fal.ai (FLUX) and wire it into the
 * post's frontmatter so the blog index + post page pick it up automatically.
 *
 * Usage:
 *   node scripts/generate-post-image.mjs <slug>
 *   node scripts/generate-post-image.mjs <slug> --prompt "custom prompt override"
 *   node scripts/generate-post-image.mjs <slug> --model schnell|dev|pro|ultra   (default: ultra)
 *   node scripts/generate-post-image.mjs <slug> --force          # overwrite existing image
 *   node scripts/generate-post-image.mjs <slug> --dry-run        # print prompt, do not call FAL
 *
 * Requires FAL_KEY in site/.env.local
 *
 * Output:
 *   - site/public/blog/<slug>.jpg
 *   - frontmatter `image:` and `imageAlt:` fields updated in the .md file
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_ROOT = path.resolve(__dirname, "..");

// Load env. Next.js convention: .env.local overrides .env. Load both, .env.local last.
dotenv.config({ path: path.join(SITE_ROOT, ".env") });
dotenv.config({ path: path.join(SITE_ROOT, ".env.local"), override: true });
const POSTS_DIR = path.join(SITE_ROOT, "src", "content", "blog");
const PUBLIC_BLOG_DIR = path.join(SITE_ROOT, "public", "blog");

// ----- CLI parsing -------------------------------------------------------

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith("--")) {
  console.error("Usage: node scripts/generate-post-image.mjs <slug> [--prompt \"...\"] [--model schnell|dev|pro|ultra] [--force] [--dry-run]");
  process.exit(1);
}
const slug = args[0];
let customPrompt = null;
let modelChoice = "ultra";
let force = false;
let dryRun = false;

for (let i = 1; i < args.length; i++) {
  const a = args[i];
  if (a === "--prompt") customPrompt = args[++i];
  else if (a === "--model") modelChoice = args[++i];
  else if (a === "--force") force = true;
  else if (a === "--dry-run") dryRun = true;
  else {
    console.error(`Unknown flag: ${a}`);
    process.exit(1);
  }
}

const MODEL_ENDPOINTS = {
  schnell: "https://fal.run/fal-ai/flux/schnell",            // fastest, lower quality, ~$0.003/image
  dev:     "https://fal.run/fal-ai/flux/dev",                // balanced, ~$0.025/image
  pro:     "https://fal.run/fal-ai/flux-pro/v1.1",           // high quality, ~$0.04/image
  ultra:   "https://fal.run/fal-ai/flux-pro/v1.1-ultra",     // highest quality + 2K, ~$0.06/image (default)
};
const endpoint = MODEL_ENDPOINTS[modelChoice];
if (!endpoint) {
  console.error(`Unknown model '${modelChoice}'. Choose from: schnell, dev, pro, ultra`);
  process.exit(1);
}

// ----- Locate post -------------------------------------------------------

const mdPath = path.join(POSTS_DIR, `${slug}.md`);
let raw;
try {
  raw = await fs.readFile(mdPath, "utf8");
} catch {
  console.error(`Post not found: ${mdPath}`);
  process.exit(1);
}
const parsed = matter(raw);
const fm = parsed.data;

if (!fm.title) {
  console.error(`Post '${slug}' is missing a title in frontmatter.`);
  process.exit(1);
}

const outImagePath = path.join(PUBLIC_BLOG_DIR, `${slug}.jpg`);
const publicImageUrl = `/blog/${slug}.jpg`;

// ----- Prompt construction ----------------------------------------------

// IMPORTANT — FLUX behavior note:
// FLUX (via fal.ai) does NOT have a separate negative-prompt field on this endpoint
// and tends to LATCH ONTO whatever concrete nouns appear in the positive prompt,
// even when those nouns are preceded by "no" or "avoid". Writing "no robots" reliably
// produces a robot. The fix is to NEVER mention forbidden subjects at all and to
// describe a concrete physical scene we *do* want.
//
// Relevance strategy:
//   1. If the post frontmatter has a `scene` field, use it verbatim — the author chose it.
//   2. If not, derive a concrete physical scene from the post's title, description, and tags
//      so every image is topically connected to the article rather than a generic placeholder.
function buildPhotographyDirection(aspectRatio = "16:9") {
  return [
    "Editorial magazine photograph in the style of The Verge, Monocle, or Kinfolk feature imagery.",
    "Shot on a medium-format camera, 50mm prime lens, shallow depth of field, natural ambient light with a single soft cool accent.",
    "Cinematic, restrained, premium, quiet. No people visible.",
    "Color grading: muted warm midtones, subtle aurora-like cool cyan and violet ambient glow in the background only, never on the main subject.",
    aspectRatio === "16:9"
      ? "16:9 landscape composition with strong negative space on one side suitable for a website hero crop."
      : "Landscape composition with strong negative space on one side suitable for a website hero crop.",
  ].join(" ");
}

function buildPrompt({ title, description, tags, scene }) {
  const photoDir = buildPhotographyDirection("16:9");

  // Author-specified scene: trust it completely.
  if (scene && typeof scene === "string") {
    return [scene, photoDir].join(" ");
  }

  // Derive a concrete, topic-specific scene from the post's own content.
  // Goal: the image should immediately signal the article's subject to a first-time reader.
  const tagLine = Array.isArray(tags) && tags.length > 0 ? `Topic tags: ${tags.join(", ")}.` : "";
  const contextLine = [
    title ? `Article title: "${title}".` : "",
    description ? `Article summary: ${description}` : "",
    tagLine,
  ].filter(Boolean).join(" ");

  return [
    // Lead with the explicit mandate so FLUX anchors on it.
    `A premium editorial photograph whose subject directly and specifically illustrates the following article: ${contextLine}`,
    // Force FLUX to commit to a concrete scene rather than drifting abstract.
    "Choose one specific, tangible object or setting that best embodies this article's core idea and render it as the hero of the frame.",
    "The visual must be immediately legible as connected to the article topic to a first-time viewer.",
    photoDir,
  ].filter(Boolean).join(" ");
}

const prompt = customPrompt ?? buildPrompt(fm);

console.log(`\n[generate-post-image] slug: ${slug}`);
console.log(`[generate-post-image] model: ${modelChoice} (${endpoint})`);
console.log(`[generate-post-image] prompt:\n${prompt}\n`);

if (dryRun) {
  console.log("[generate-post-image] --dry-run — skipping FAL call.");
  process.exit(0);
}

// ----- Existence check --------------------------------------------------

try {
  await fs.access(outImagePath);
  if (!force) {
    console.error(`Image already exists at ${outImagePath}. Re-run with --force to overwrite.`);
    process.exit(1);
  }
  console.log(`[generate-post-image] --force: overwriting existing image.`);
} catch {
  // does not exist, good
}

// ----- FAL key ----------------------------------------------------------

const FAL_KEY = process.env.FAL_KEY || process.env.FAL_API_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY in site/.env.local. Add a line like: FAL_KEY=your_key_here");
  process.exit(1);
}

// ----- Call FAL ---------------------------------------------------------

console.log(`[generate-post-image] calling FAL...`);
const startedAt = Date.now();

// Build request body — ultra uses aspect_ratio and manages inference internally;
// schnell/dev/pro use image_size + explicit inference/guidance params.
const requestBody =
  modelChoice === "ultra"
    ? {
        prompt,
        aspect_ratio: "16:9",
        num_images: 1,
        enable_safety_checker: true,
        output_format: "jpeg",
      }
    : {
        prompt,
        image_size: "landscape_16_9",
        num_images: 1,
        enable_safety_checker: true,
        num_inference_steps: modelChoice === "schnell" ? 4 : 28,
        guidance_scale: 3.5,
      };

const falRes = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Authorization": `Key ${FAL_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
});

if (!falRes.ok) {
  const errText = await falRes.text().catch(() => "");
  console.error(`FAL request failed: ${falRes.status} ${falRes.statusText}\n${errText}`);
  process.exit(1);
}

const falData = await falRes.json();
const firstImage = falData?.images?.[0];
if (!firstImage?.url) {
  console.error(`FAL response did not include an image URL. Raw response:\n${JSON.stringify(falData, null, 2)}`);
  process.exit(1);
}
const elapsedMs = Date.now() - startedAt;
console.log(`[generate-post-image] FAL returned in ${(elapsedMs / 1000).toFixed(1)}s — downloading ${firstImage.url}`);

// ----- Download image ---------------------------------------------------

await fs.mkdir(PUBLIC_BLOG_DIR, { recursive: true });
const imgRes = await fetch(firstImage.url);
if (!imgRes.ok) {
  console.error(`Failed to download generated image: ${imgRes.status}`);
  process.exit(1);
}
const buf = Buffer.from(await imgRes.arrayBuffer());
await fs.writeFile(outImagePath, buf);
console.log(`[generate-post-image] wrote ${outImagePath} (${(buf.length / 1024).toFixed(1)} KB)`);

// ----- Update frontmatter -----------------------------------------------

const updatedFm = { ...fm };
updatedFm.image = publicImageUrl;
if (!updatedFm.imageAlt) {
  updatedFm.imageAlt = `Editorial image illustrating: ${fm.title}`;
}

const updatedRaw = matter.stringify(parsed.content, updatedFm);
await fs.writeFile(mdPath, updatedRaw, "utf8");
console.log(`[generate-post-image] updated frontmatter in ${mdPath}`);
console.log(`[generate-post-image] done. View it at /blog/${slug}\n`);
