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
```

## Adding images

Put image files in `site/public/blog/` and reference them as `/blog/filename.jpg`
in the frontmatter `image:` field.

## Filename = URL slug

`why-i-built-magimatix.md` becomes `magimatix.com/blog/why-i-built-magimatix`.
Use lowercase, hyphen-separated, no spaces.
