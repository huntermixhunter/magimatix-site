import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import FaqAccordion from "../_components/FaqAccordion";
import {
  DATA_CHECKOUT_URL,
  DATA_VIDEO_ID,
  dataShots,
  dataFeatures,
  faqFor,
} from "../_content";
import { DATA_REPO_URL } from "@/lib/data-release";

export const metadata: Metadata = {
  title: "DATA DAEMON: Your Self-Hosted AI Command Center",
  description:
    "DATA DAEMON is a free, open-source AI command center you run on your own machine. A fleet of AI agents in one dashboard that read your files, run commands, browse the web, and remember everything across sessions. Windows, macOS, and Linux.",
  alternates: { canonical: "/data-daemon" },
  openGraph: {
    title: "DATA DAEMON: Your Self-Hosted AI Command Center",
    description:
      "Free and open source. A fleet of AI agents in one local dashboard, reading your files, running commands, browsing the web, and remembering everything.",
    url: "https://magimatix.com/data-daemon",
    type: "website",
  },
};

const whatItIs = [
  {
    title: "A daemon, not a chat window",
    body: "DATA stands for Dashboard for Analytical Thought and Action. A daemon is a program that runs quietly in the background, so this is a system that sits on your machine and works.",
  },
  {
    title: "The dashboard we run the agency on",
    body: "This is not a side project built to sell. It is the interface Magimatix is actually built on, packaged so you can build the same way we do.",
  },
  {
    title: "Priced for subscriptions, not tokens",
    body: "Optimized for the flat-rate AI coding CLIs (Claude Code, Codex) rather than metered APIs, so a heavy day of work does not become a surprise bill. An API build may follow later.",
  },
  {
    title: "Yours outright",
    body: "Apache-2.0, self-hosted, no account and no telemetry gate. Read every line of the source before you run it, then change whatever you want.",
  },
];

export default function DataDaemonPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Free & Open Source"
        eyebrowClass="text-aurora-green"
        title={
          <>
            Meet <span className="gradient-text">DATA DAEMON</span>
          </>
        }
        lede="A fleet of AI agents from one local, self-hosted screen. They chat, write code, run commands, browse the web, control your screen, and remember everything across sessions. Free, open source, and yours outright."
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={DATA_CHECKOUT_URL}
            className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
          >
            Get DATA DAEMON, free →
          </Link>
          <a
            href={DATA_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium px-8 py-4 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors inline-block"
          >
            View source on GitHub →
          </a>
        </div>
        <p className="text-xs text-zinc-500 mt-5 font-mono tracking-wide">
          Apache-2.0 · Self-hosted · Name your price
        </p>
      </PageHero>

      {/* ── Demo video ─────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 reveal">
          <div className="glass rounded-2xl overflow-hidden p-2 md:p-3">
            <div
              className="relative w-full rounded-xl overflow-hidden"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${DATA_VIDEO_ID}`}
                title="DATA DAEMON: Demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── What it actually is ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-mono text-aurora-green tracking-widest uppercase mb-4">
              What It Is
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              The command center, <span className="gradient-text">explained</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto reveal">
            {whatItIs.map((block) => (
              <div key={block.title} className="glass rounded-2xl p-7">
                <h3 className="text-base md:text-lg font-semibold mb-2.5">
                  {block.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshot gallery ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-mono text-aurora-green tracking-widest uppercase mb-4">
              Inside the Dashboard
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Four screens that do the <span className="gradient-text">heavy lifting</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 reveal">
            {dataShots.map((shot) => (
              <figure
                key={shot.src}
                className="glass service-card rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden border-b border-white/5">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={2880}
                    height={1800}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-1.5 group-hover:text-aurora-green transition-colors">
                    {shot.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {shot.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature list + download ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-strong rounded-2xl p-8 md:p-12 reveal text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Everything it does out of the box
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-2xl mx-auto mb-10">
              {dataFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-zinc-300"
                >
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={DATA_CHECKOUT_URL}
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
              >
                Download it free →
              </Link>
              <a
                href={DATA_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium px-8 py-4 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors inline-block"
              >
                Read the source →
              </a>
            </div>
            <p className="inline-flex items-center gap-2 mt-6 text-xs text-zinc-400 font-mono tracking-wide border border-white/10 rounded-full px-4 py-1.5">
              <svg className="w-3.5 h-3.5 text-aurora-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 5.7 10.5 4.6v7.1H3V5.7Zm0 12.6 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.7h-9.5v6.8Zm0-15.4v6.9H21V3l-9.5 1.1Z" />
              </svg>
              Windows · macOS · Linux. One-click installer for Windows and Mac
            </p>
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
              Before you <span className="gradient-text">download</span>
            </h2>
          </div>
          <div className="reveal">
            <FaqAccordion items={faqFor("data")} />
          </div>
          <p className="text-center text-sm text-zinc-500 mt-8">
            <Link href="/faq" className="text-aurora-cyan hover:text-white transition-colors">
              See every question we get asked →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-20" />
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <p className="text-sm font-mono text-aurora-pink tracking-widest uppercase mb-4">
            Or Have Us Do It
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Want the result without running the tool?
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-9">
            DATA DAEMON is for people who want to drive it themselves. If you
            would rather we design, build, and run the whole AI system for your
            business, that is the done-for-you side of the house.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/services"
              className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
            >
              See what we build for you →
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium px-8 py-4 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors inline-block"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
