# Blog posts

Drop a new `.md` file in this folder and it appears at `/blog/<filename>` automatically.

## Required frontmatter

```yaml
---
title: "Your post title"
description: "One-sentence summary — used in the post card and meta description."
date: "2026-05-17"   # ISO yyyy-mm-dd
---
```

## Optional frontmatter

```yaml
author: "Magimatix"
tags: ["AI", "SEO", "Web Design"]
image: "/blog/your-image.jpg"        # drop file in /public/blog/
imageAlt: "Description of the image"
scene: "A literal visual concept for the hero image. See note below."
```

### About the `scene` field

This is a hint for the FLUX image generator. It should describe a **literal physical
scene** — a place, object, or environment — that visually metaphors the post's topic.
**Never** mention abstract concepts like "AI", "robot", "data", "code", "brain", etc.
FLUX latches onto concrete nouns and ignores negation, so writing "no robots" still
produces a robot. Describe what you *do* want, not what you don't.

Good examples:
- `"A craftsman's workbench at golden hour with a single brass tool lit by a window."`
- `"An empty independent bookstore at dusk with warm interior lighting on a quiet street."`
- `"A weathered map spread on a wooden desk beside a glass of whiskey, single lamp."`

Bad examples (will summon clichés):
- `"A small business using AI"` → produces a robot in an office
- `"Modern technology for shops"` → produces a glowing screen with code on it

## Filename = URL slug

`why-i-built-magimatix.md` becomes `magimatix.com/blog/why-i-built-magimatix`.
Use lowercase, hyphen-separated, no spaces.

## Auto-generating hero images (fal.ai / FLUX)

Hero images can be auto-generated with a single command using fal.ai. Add your
key to `site/.env.local` once:

```
FAL_KEY=your_fal_api_key_here
```

Then for any post:

```bash
npm run post:image -- <slug>                            # default: FLUX dev, premium quality
npm run post:image -- <slug> --model schnell            # fastest + cheapest (~$0.003)
npm run post:image -- <slug> --model pro                # highest quality (~$0.04)
npm run post:image -- <slug> --prompt "custom prompt"   # override auto prompt
npm run post:image -- <slug> --force                    # overwrite existing image
npm run post:image -- <slug> --dry-run                  # preview prompt only
```

The script will:

1. Read the post's title, description, tags, and optional `scene` field.
2. Build an editorial-photography prompt anchored on the literal `scene` (or a safe
   default storefront scene if `scene` is not provided). FLUX does not respect
   negative prompts, so the prompt describes only what we *do* want.
3. Call FLUX, download the image to `public/blog/<slug>.jpg`.
4. Update the post's frontmatter with `image:` and `imageAlt:` automatically.

## Standard post-creation flow

### Fast path (one command — image + commit + push + live in ~60s)

```bash
# 1. Write the post
$EDITOR src/content/blog/my-new-post.md

# 2. Ship it
npm run post:ship -- my-new-post
```

`post:ship` generates the hero image, stages the post + image, commits with a
sensible message, and pushes to `origin/main`. Vercel auto-deploys the push to
`magimatix.com` in roughly 30–60 seconds.

Useful flags (anything after the slug is passed through to the image step):

```bash
npm run post:ship -- my-new-post --skip-image     # post already has an image
npm run post:ship -- my-new-post --force          # regenerate even if image exists
npm run post:ship -- my-new-post --model schnell  # cheaper/faster FAL model (~$0.003)
```

### Manual path (full control)

```bash
# 1. Write the post
$EDITOR src/content/blog/my-new-post.md

# 2. Generate the hero image
npm run post:image -- my-new-post

# 3. Preview locally
npm run dev   # then visit http://localhost:3000/blog/my-new-post

# 4. Commit + push
git add src/content/blog/my-new-post.md public/blog/my-new-post.jpg
git commit -m "blog: my new post"
git push
```
