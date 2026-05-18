#!/usr/bin/env node
/**
 * ship-post.mjs
 *
 * One-command publish for a blog post:
 *   1. Generates the hero image via FAL (calls scripts/generate-post-image.mjs)
 *   2. Stages the post markdown + hero image
 *   3. Commits with a descriptive message
 *   4. Pushes to origin/main → Vercel auto-deploys to magimatix.com
 *
 * Usage:
 *   npm run post:ship -- <slug>
 *   npm run post:ship -- <slug> --skip-image    # post already has an image
 *   npm run post:ship -- <slug> --force         # regenerate image even if it exists
 *   npm run post:ship -- <slug> --model schnell # cheaper/faster FAL model
 *
 * Any flag not listed above is passed straight through to generate-post-image.mjs.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITE_ROOT = resolve(__dirname, "..");

const argv = process.argv.slice(2);
if (argv.length === 0 || argv[0].startsWith("--")) {
  console.error("Usage: npm run post:ship -- <slug> [--skip-image] [--force] [other flags]");
  process.exit(2);
}

const slug = argv[0];
const flags = argv.slice(1);
const skipImage = flags.includes("--skip-image");
const imageFlags = flags.filter((f) => f !== "--skip-image");

const postPath = join(SITE_ROOT, "src", "content", "blog", `${slug}.md`);
const imagePath = join(SITE_ROOT, "public", "blog", `${slug}.jpg`);

if (!existsSync(postPath)) {
  console.error(`✗ Post not found: ${postPath}`);
  console.error(`  Write the markdown first, then run npm run post:ship -- ${slug}`);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: SITE_ROOT, shell: process.platform === "win32", ...opts });
  if (r.status !== 0) {
    console.error(`✗ Command failed: ${cmd} ${args.join(" ")}`);
    process.exit(r.status || 1);
  }
}

function capture(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: SITE_ROOT, shell: process.platform === "win32", encoding: "utf8" });
  return (r.stdout || "").trim();
}

// Step 1: image
if (!skipImage) {
  console.log(`\n▸ Step 1/4 — Generating hero image for "${slug}"…`);
  run("node", [join("scripts", "generate-post-image.mjs"), slug, ...imageFlags]);
} else {
  console.log(`\n▸ Step 1/4 — Skipping image generation (--skip-image)`);
}

// Step 2: read post metadata for a good commit message
const raw = readFileSync(postPath, "utf8");
const { data: frontmatter } = matter(raw);
const title = frontmatter.title || slug;

// Step 3: stage + commit
console.log(`\n▸ Step 2/4 — Staging files…`);
const filesToStage = [postPath];
if (existsSync(imagePath)) filesToStage.push(imagePath);
run("git", ["add", ...filesToStage]);

const status = capture("git", ["status", "--porcelain", ...filesToStage]);
if (!status) {
  console.log(`▸ Nothing to commit for ${slug} — files are already up to date.`);
  console.log(`  Pushing anyway in case earlier commits are unpushed…`);
} else {
  console.log(`\n▸ Step 3/4 — Committing…`);
  const message = `blog: ${title}`;
  run("git", ["commit", "-m", message]);
}

// Step 4: push
console.log(`\n▸ Step 4/4 — Pushing to origin/main…`);
run("git", ["push", "origin", "main"]);

console.log(`\n✓ Published. Vercel will deploy in ~30-60 seconds.`);
console.log(`  Live URL: https://magimatix.com/blog/${slug}`);
console.log(`  Deploy status: https://vercel.com/${process.env.VERCEL_TEAM || "your-team"}/magimatix`);
