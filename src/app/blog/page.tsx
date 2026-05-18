import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/posts";
import SiteNav from "../_components/SiteNav";
import SiteFooter from "../_components/SiteFooter";

export const metadata: Metadata = {
  title: "Blog — Web Design, SEO & AI Automations",
  description:
    "Field notes from Magimatix on premium web design, modern SEO, and AI automations for small businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Magimatix Blog — Web Design, SEO & AI Automations",
    description:
      "Field notes from Magimatix on premium web design, modern SEO, and AI automations for small businesses.",
    url: "https://magimatix.com/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://magimatix.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://magimatix.com/blog" },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Magimatix Blog",
    url: "https://magimatix.com/blog",
    description:
      "Web design, SEO, and AI automation writing from the Magimatix team.",
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://magimatix.com/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author ?? "Magimatix" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <SiteNav />
      <main className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Field Notes
            </p>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6">
              The <span className="gradient-text">Magimatix</span> Blog
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Honest writing on web design, modern SEO, and AI automations for
              small businesses. No fluff, no recycled listicles — just what is
              actually working in the field.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-center text-zinc-500 py-24">
              First post landing soon. Check back in a few days.
            </p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="service-card glass rounded-2xl overflow-hidden h-full flex flex-col group"
                  >
                    {post.image ? (
                      <div className="relative aspect-[16/9] bg-zinc-900 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt ?? post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9] bg-gradient-to-br from-aurora-blue/20 via-aurora-purple/20 to-aurora-cyan/20" />
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.readingTimeMin} min read</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-white text-zinc-100 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-3 flex-1">
                        {post.description}
                      </p>
                      {post.tags && post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 rounded-full px-2 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
