import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import FaqAccordion from "../_components/FaqAccordion";
import { DEBRIEF_URL, debriefShots, faqFor } from "../_content";

export const metadata: Metadata = {
  title: "Field Debrief — An AI Diagnostic on Any Instagram or TikTok",
  description:
    "Point our AI at any public Instagram or TikTok handle and get a six-page Field Debrief in about sixty seconds: benchmarked vitals, the posts that worked and why, the one root cause killing reach, and a 14-day fix. $5, no login.",
  alternates: { canonical: "/field-debrief" },
  openGraph: {
    title: "Field Debrief — An AI Diagnostic on Any Instagram or TikTok",
    description:
      "Six pages of HUD analysis on any public handle in about sixty seconds. $5, no login, no password.",
    url: "https://magimatix.com/field-debrief",
    type: "website",
  },
};

const pages = [
  { n: "01", title: "Cover + mission", body: "The handle, the window analysed, and the headline read in one line." },
  { n: "02", title: "Vitals", body: "Reach, engagement rate, follower velocity and posting cadence, each benchmarked against where they should be." },
  { n: "03", title: "Signal map", body: "Your top posts ranked, with the pattern they share pulled out and named." },
  { n: "04", title: "Diagnosis", body: "The single biggest thing suppressing reach, stated plainly, with the evidence behind the call." },
  { n: "05", title: "Fix protocol", body: "Six ordered directives that correct the diagnosis. Specific moves, not vibes." },
  { n: "06", title: "14-day flight plan", body: "A day-by-day schedule to run the protocol, written to be done rather than admired." },
];

const steps = [
  { n: "1", title: "Type a handle", body: "Any public Instagram or TikTok account — yours, a competitor's, a client you want to pitch." },
  { n: "2", title: "Pay $5", body: "Flat, one time, no subscription and no account to create." },
  { n: "3", title: "Get the PDF", body: "About sixty seconds later the finished six-page debrief lands, ready to read or send on." },
];

export default function FieldDebriefPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="See It Work · $5"
        title={
          <>
            Watch an AI Read a <span className="gradient-text">Real Account</span>
          </>
        }
        lede="Point our AI at any public Instagram or TikTok handle and it renders a six-page Field Debrief: the vitals, the posts that worked and why, the one root cause holding the account back, and a 14-day fix. Five dollars, no login, about sixty seconds."
      >
        <a
          href={DEBRIEF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
        >
          Run a Field Debrief · $5 →
        </a>
        <p className="text-xs text-zinc-500 mt-5 font-mono tracking-wide">
          No account · No password · Works on any public handle
        </p>
      </PageHero>

      {/* ── Stat strip ─────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 relative">
        <div className="max-w-3xl mx-auto px-6 reveal">
          <div className="glass rounded-2xl px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs md:text-sm text-zinc-400">
            <span>
              <span className="text-aurora-cyan font-bold">6</span> pages of HUD analysis
            </span>
            <span>
              <span className="text-aurora-cyan font-bold">~60s</span> handle to PDF
            </span>
            <span>
              <span className="text-aurora-cyan font-bold">$5</span> flat, no subscription
            </span>
            <span>
              <span className="text-aurora-cyan font-bold">0</span> logins or passwords
            </span>
          </div>
        </div>
      </section>

      {/* ── Sample pages ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
              Real Output
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Three pages from a <span className="gradient-text">live debrief</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              These are not mockups. They are real pages from a real read on a
              real account. Submit your own handle to get the same six on yours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 reveal">
            {debriefShots.map((shot) => (
              <a
                key={shot.src}
                href={DEBRIEF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass service-card rounded-2xl overflow-hidden group block"
              >
                <div className="relative overflow-hidden border-b border-white/5 bg-black">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={1588}
                    height={2246}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="p-6">
                  <p className="text-[0.7rem] font-mono tracking-widest uppercase text-aurora-cyan mb-2">
                    {shot.tag}
                  </p>
                  <h3 className="text-base md:text-lg font-semibold mb-1.5 group-hover:text-aurora-cyan transition-colors">
                    {shot.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {shot.caption}
                  </p>
                </figcaption>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is in all six pages ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
              What You Get
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              All six pages, <span className="gradient-text">end to end</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {pages.map((page) => (
              <div key={page.n} className="glass rounded-2xl p-6">
                <p className="font-mono text-xs tracking-widest text-aurora-cyan mb-3">
                  PAGE {page.n}
                </p>
                <h3 className="text-base font-semibold mb-2">{page.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {page.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-mono text-aurora-blue tracking-widest uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Three steps, <span className="gradient-text">one minute</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 reveal">
            {steps.map((step, i) => (
              <div key={step.n} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gradient-to-r from-aurora-blue/30 to-transparent" />
                )}
                <div className="text-4xl font-bold gradient-text mb-4">
                  {step.n}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.body}
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
              Before you <span className="gradient-text">run one</span>
            </h2>
          </div>
          <div className="reveal">
            <FaqAccordion items={faqFor("debrief")} />
          </div>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-20" />
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <p className="text-sm font-mono text-aurora-green tracking-widest uppercase mb-4">
            This Is a Demo of Something Bigger
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            The Field Debrief is one agent. There is a whole fleet.
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-9">
            This debrief is rendered by DATA DAEMON, the free and open-source AI
            command center we run the agency on. If you like what it did to one
            Instagram account, the full dashboard is a download away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={DEBRIEF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
            >
              Run a Field Debrief · $5 →
            </a>
            <Link
              href="/data-daemon"
              className="text-base font-medium px-8 py-4 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors inline-block"
            >
              Meet DATA DAEMON — free
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
