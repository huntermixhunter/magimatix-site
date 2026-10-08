import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import FaqAccordion from "../_components/FaqAccordion";
import CtaBand from "../_components/CtaBand";
import BookCallButton from "../_components/BookCallButton";
import { aiServices, processSteps, faqFor } from "../_content";

export const metadata: Metadata = {
  title: "AI Services — Automation, Agents & Custom Builds",
  description:
    "Done-for-you AI: workflow automation that kills the busywork, chatbots and agents that answer 24/7, analytics dashboards, and custom AI wired into the tools you already run. Scoped, built, deployed, and maintained by Magimatix.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI Services — Automation, Agents & Custom Builds | Magimatix",
    description:
      "Workflow automation, AI chatbots and agents, analytics dashboards, and custom AI builds — designed, deployed, and maintained for you.",
    url: "https://magimatix.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Done-for-You"
        eyebrowClass="text-aurora-purple"
        title={
          <>
            What We Build <span className="gradient-text">For You</span>
          </>
        }
        lede="Want the result without running the tool? We design, build, and deploy the whole AI system — then keep it running as the business grows. Four capabilities, scoped to what you actually need."
      >
        <BookCallButton>Book Your Free Discovery Call →</BookCallButton>
        <p className="text-xs text-zinc-500 mt-5 font-mono tracking-wide">
          30 minutes · No pressure · 90-day money-back guarantee
        </p>
      </PageHero>

      {/* ── Capabilities ───────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            {aiServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="glass service-card rounded-2xl p-8 text-center scroll-mt-28"
              >
                <div className="w-14 h-14 rounded-xl bg-aurora-purple/10 flex items-center justify-center mx-auto mb-5 text-aurora-purple">
                  {service.icon}
                </div>
                <h2 className="text-lg font-semibold mb-3">{service.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-5 pt-5 border-t border-white/5 space-y-2 text-left">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-aurora-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Websites pointer ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/websites"
            className="glass service-card rounded-2xl p-8 md:p-10 block group hover:border-aurora-cyan/40 transition-colors reveal"
          >
            <div className="grid md:grid-cols-[1.3fr_auto] gap-6 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-aurora-cyan tracking-widest uppercase">
                      Also done-for-you
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold group-hover:text-aurora-cyan transition-colors">
                      Websites &amp; web design
                    </h2>
                  </div>
                </div>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  Yes, we still build sites. A fast, custom, conversion-focused
                  website with the AI leverage wired straight into it, not a
                  brochure that sits there. It has a page of its own.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan">
                See the web work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────────── */}
      <section id="process" className="py-16 md:py-20 relative scroll-mt-24">
        <div className="section-divider max-w-4xl mx-auto mb-16 md:mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-sm font-mono text-aurora-blue tracking-widest uppercase mb-4">
              Our Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              From Vision to <span className="gradient-text">Reality</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              A streamlined, transparent process that keeps you in control at
              every stage.
            </p>
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
            <FaqAccordion items={faqFor("services")} />
          </div>
          <p className="text-center text-sm text-zinc-500 mt-8">
            <Link href="/faq" className="text-aurora-cyan hover:text-white transition-colors">
              See every question we get asked →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to put AI to work?"
        body="Pick a time for a free 30-minute call and we will map the right build for your business. No pressure, no templated pitch."
        primaryLabel="Book Your Free Call →"
        secondaryHref="/data-daemon"
        secondaryLabel="Or run the tool yourself — free"
        note="Prefer to write? Use the contact form instead."
      />
    </SiteShell>
  );
}
