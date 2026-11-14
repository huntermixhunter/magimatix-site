import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const siteUrl = "https://magimatix.com";

// Top-level pages the chooser on the homepage routes into. `/data-daemon/*`
// sub-routes (checkout, thank-you, license) are transactional and stay out.
const staticPages: { path: string; priority: number }[] = [
  { path: "/dashboards", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/websites", priority: 0.9 },
  { path: "/data-daemon", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postEntries,
  ];
}
