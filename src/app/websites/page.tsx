import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import FaqAccordion from "../_components/FaqAccordion";
import CtaBand from "../_components/CtaBand";
import BookCallButton from "../_components/BookCallButton";
import {
  webCapabilities,
  webDeliverables,
  portfolio,
  processSteps,
  faqFor,
} from "../_content";

export const metadata: Metadata = {
  title: "Websites & Web Design — Custom, Fast, Built to Convert",
  description:
    "Custom websites with zero templates: conversion-focused design, copy, SEO and Core Web Vitals tuning, e-commerce, and lead capture wired to your inbox — with AI leverage built in. You own 100% of the code.",
  alternates: { canonical: "/websites" },
  openGraph: {
    title: "Websites & Web Design | Magimatix",
    description:
      "Custom, fast, conversion-focused websites with AI leverage wired in. Zero templates. You own 100% of the code.",
    url: "https://magimatix.com/websites",
    type: "website",
  },
};

export default function WebsitesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Websites & Web Design"
        title={
          <>
            A Site Built to <span className="gradient-text">Convert</span>
          </>
        }
        lede="Custom design from a blank page, tuned for speed and search, with lead capture wired to your inbox and AI leverage living inside it. Not a brochure that sits there, and not a template anyone can spot. You own 100% of the code."
      >
        <BookCallButton>Book Your Free Discovery Call →</BookCallButton>
        <p className="text-xs text-zinc-500 mt-5 font-mono tracking-wide">
          Most sites launch in 7–14 days · 90-day money-back guarantee
        </p>
      </PageHero>

      {/* ── Capability chips ───────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 reveal">
          <div className="glass rounded-2xl p-7 md:p-9">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {webCapabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-aurora-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="leading-snug">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── What you actually get ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
              What You Get
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Six things every build <span className="gradient-text">includes</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {webDeliverables.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-7">
                <h3 className="text-base md:text-lg font-semibold mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ──────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-16 md:py-20 relative scroll-mt-24">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
              Our Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Projects We&apos;ve <span className="gradient-text">Built</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              Real sites for real businesses. Click through and judge them live.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 reveal">
            {portfolio.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass service-card rounded-2xl overflow-hidden group block"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-aurora-cyan/70 border border-aurora-cyan/20 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-aurora-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-aurora-cyan font-medium">
                    Visit Site
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-sm font-mono text-aurora-blue tracking-widest uppercase mb-4">
              Our Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              From Vision to <span className="gradient-text">Reality</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto reveal">
            {processSteps.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-aurora-blue/30 to-transparent" />
                )}
                <div className="text-4xl font-bold gradient-text mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10 reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Questions <span className="gradient-text">Worth Asking</span>
            </h2>
          </div>
          <div className="reveal">
            <FaqAccordion items={faqFor("websites")} />
          </div>
          <p className="text-center text-sm text-zinc-500 mt-8">
            <Link href="/faq" className="text-aurora-cyan hover:text-white transition-colors">
              See every question we get asked →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Let's build the site."
        body="Pick a time for a free 30-minute call. We will look at what you have, tell you what we would change, and map the build. No pressure."
        primaryLabel="Book Your Free Call →"
        secondaryHref="/services"
        secondaryLabel="See the AI services too"
      />
    </SiteShell>
  );
}
