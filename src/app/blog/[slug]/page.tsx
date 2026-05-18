import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPost, formatDate } from "@/lib/posts";
import SiteNav from "../../_components/SiteNav";
import SiteFooter from "../../_components/SiteFooter";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://magimatix.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author ?? "Magimatix"],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author ?? "Magimatix" },
    publisher: {
      "@type": "Organization",
      name: "Magimatix",
      logo: {
        "@type": "ImageObject",
        url: "https://magimatix.com/logo.png",
      },
    },
    image: post.image
      ? [post.image.startsWith("http") ? post.image : `https://magimatix.com${post.image}`]
      : ["https://magimatix.com/opengraph-image"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://magimatix.com/blog/${post.slug}`,
    },
    keywords: (post.tags ?? []).join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://magimatix.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://magimatix.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://magimatix.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteNav />
      <main className="relative pt-28 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <span aria-hidden>←</span> Back to blog
          </Link>

          <header className="mb-10">
            {post.tags && post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider text-zinc-300 border border-white/10 rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-zinc-400 mb-6">{post.description}</p>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span>{post.author ?? "Magimatix"}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTimeMin} min read</span>
            </div>
          </header>

          {post.image ? (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-zinc-900">
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-16 pt-10 border-t border-white/10">
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
                Ready to talk?
              </p>
              <h3 className="text-2xl font-semibold mb-3">
                Let&apos;s build something that actually converts.
              </h3>
              <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
                Book a free 30-minute discovery call. We will learn your business, your goals, and your bottlenecks — then come back with a custom deck.
              </p>
              <Link
                href="/#contact"
                className="btn-glow inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-white"
              >
                Book Discovery Call
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
