import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "./_components/SiteShell";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// The chooser.
//
// The homepage used to be one very long scroll holding every service, the two
// products, the portfolio, the process, the whole FAQ and the contact form.
// Now it asks one question and routes. Each card owns a full page of its own,
// so nobody reads about a product they did not come for.
// ─────────────────────────────────────────────────────────────────────────────

type Choice = {
  href: string;
  kicker: string;
  title: string;
  body: string;
  badge?: string;
  accent: "purple" | "cyan" | "green" | "blue";
  icon: React.ReactNode;
};

const accents = {
  purple: {
    text: "text-aurora-purple",
    bg: "bg-aurora-purple/10",
    hover: "hover:border-aurora-purple/40",
    glow: "group-hover:text-aurora-purple",
  },
  cyan: {
    text: "text-aurora-cyan",
    bg: "bg-aurora-cyan/10",
    hover: "hover:border-aurora-cyan/40",
    glow: "group-hover:text-aurora-cyan",
  },
  green: {
    text: "text-aurora-green",
    bg: "bg-aurora-green/10",
    hover: "hover:border-aurora-green/40",
    glow: "group-hover:text-aurora-green",
  },
  blue: {
    text: "text-aurora-blue",
    bg: "bg-aurora-blue/10",
    hover: "hover:border-aurora-blue/40",
    glow: "group-hover:text-aurora-blue",
  },
};

const choices: Choice[] = [
  {
    href: "/data-daemon",
    kicker: "DATA DAEMON",
    title: "Run my own AI workspace",
    body: "A free, open-source dashboard for AI agents, files, tools, and persistent memory.",
    badge: "Free · open source",
    accent: "green",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
  },
  {
    href: "/services",
    kicker: "AI Services",
    title: "Put AI to work for me",
    body: "Automate busywork, answer customers, and connect the tools your business runs on.",
    accent: "purple",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
  },
  {
    href: "/websites",
    kicker: "Websites",
    title: "Build a better website",
    body: "A custom site built to bring in customers, with design, search, and lead capture handled.",
    accent: "cyan",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <SiteShell loader>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-8 md:pt-28 md:pb-10 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="animate-fade-in-up opacity-0 text-xs md:text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
            AI tools &amp; websites for your business
          </p>
          <h1 className="animate-fade-in-up opacity-0 animate-delay-200 text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            What are you <span className="gradient-text">looking for?</span>
          </h1>
          <p className="animate-fade-in-up opacity-0 animate-delay-200 text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Choose where to start. We will take you straight to what you need.
          </p>
        </div>
      </section>

      {/* ── The chooser ────────────────────────────────────────────────────── */}
      <section id="chooser" aria-label="Choose a service or product" className="pb-12 relative scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5 animate-fade-in-up opacity-0 animate-delay-400">
            {choices.map((choice) => {
              const a = accents[choice.accent];
              return (
                <Link
                  key={choice.href}
                  href={choice.href}
                  className={`glass service-card rounded-2xl p-6 group flex flex-col transition-colors ${a.hover}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${a.bg} ${a.text}`}
                    >
                      {choice.icon}
                    </div>
                    {choice.badge && (
                      <span
                        className={`text-[0.65rem] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 ${a.bg} ${a.text}`}
                      >
                        {choice.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-mono tracking-widest uppercase mb-2 ${a.text}`}
                  >
                    {choice.kicker}
                  </p>
                  <h2
                    className={`text-lg md:text-xl font-bold leading-snug mb-3 transition-colors ${a.glow}`}
                  >
                    {choice.title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {choice.body}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-medium mt-4 ${a.text}`}
                  >
                    Show me
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Fifth option: the human path, given its own wide band */}
          <Link
            href="/contact"
            className="glass service-card rounded-2xl p-6 group mt-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:border-aurora-pink/40 transition-colors animate-fade-in-up opacity-0 animate-delay-500"
          >
            <div className="w-12 h-12 rounded-xl bg-aurora-pink/10 text-aurora-pink flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono tracking-widest uppercase mb-2 text-aurora-pink">
                Not sure yet
              </p>
              <h2 className="text-lg md:text-xl font-bold leading-snug mb-2 group-hover:text-aurora-pink transition-colors">
                Talk it through with us
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                A free 30-minute call to find the right next step for your business.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-aurora-pink flex-shrink-0">
              Book a call
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs md:text-sm text-zinc-400 mt-12 animate-fade-in-up opacity-0 animate-delay-600">
            {[
              "Self-hosted, you own it",
              "No long-term contract",
            ].map((claim) => (
              <span key={claim} className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {claim}
              </span>
            ))}
          </div>

          {/* Quiet secondary links for the browsers */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-sm">
            <Link href="/websites#portfolio" className="text-zinc-500 hover:text-white transition-colors">
              See our work
            </Link>
            <Link href="/faq" className="text-zinc-500 hover:text-white transition-colors">
              Common questions
            </Link>
            <Link href="/blog" className="text-zinc-500 hover:text-white transition-colors">
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
