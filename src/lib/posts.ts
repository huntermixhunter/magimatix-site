import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author?: string;
  tags?: string[];
  image?: string; // /path or absolute URL
  imageAlt?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTimeMin: number;
};

export type Post = PostMeta & {
  html: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

function parseFile(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Post '${slug}' is missing required frontmatter (title, date).`);
  }
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: String(fm.title),
    description: String(fm.description ?? ""),
    date: String(fm.date),
    author: fm.author ? String(fm.author) : "Magimatix",
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    image: fm.image ? String(fm.image) : undefined,
    imageAlt: fm.imageAlt ? String(fm.imageAlt) : undefined,
    readingTimeMin: estimateReadingTime(content),
    html,
  };
}

export function getAllPostSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""))
    .filter((slug) => !slug.startsWith("_") && slug.toLowerCase() !== "readme");
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts: PostMeta[] = [];
  for (const slug of slugs) {
    const full = readPostFile(slug);
    if (full) {
      const { html: _html, ...meta } = full;
      posts.push(meta);
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readPostFile(slug: string): Post | null {
  ensureDir();
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return parseFile(slug, raw);
}

export function getPost(slug: string): Post | null {
  return readPostFile(slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
