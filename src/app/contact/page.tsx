import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import BookCallButton from "../_components/BookCallButton";
import ContactForm from "../_components/ContactForm";
import { DATA_CHECKOUT_URL } from "../_content";

export const metadata: Metadata = {
  title: "Contact: Book a Free Discovery Call",
  description:
    "Book a free 30-minute discovery call with Magimatix, or send a message. We learn your business, find the bottleneck, and map the right AI build. No pressure, no templated pitch.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Magimatix: Book a Free Discovery Call",
    description:
      "A free 30-minute call. We learn the business, find the bottleneck, and tell you what we would build.",
    url: "https://magimatix.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Let's Work Together"
        eyebrowClass="text-aurora-pink"
        title={
          <>
            Ready to Put AI to <span className="gradient-text">Work</span>?
          </>
        }
        lede="Pick a time for a free 30-minute call and we will map the right build for your business. No pressure, and no templated pitch."
      />

      <section className="pb-16 md:pb-20 relative">
        <div className="max-w-3xl mx-auto px-6">
          {/* Primary path: book the call */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 md:p-10 text-center reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
              Book Your Free Discovery Call
            </p>
            <p className="text-zinc-400 text-base mb-6 leading-relaxed">
              Grab a 30-minute slot that works for you. Opens an instant
              scheduler. Pick a time and you&apos;re booked.
            </p>
            <BookCallButton>Pick a Time →</BookCallButton>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
              or send a message
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Secondary path: write to us */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 md:p-10 text-left reveal">
            <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-2">
              Prefer to Write?
            </p>
            <p className="text-zinc-400 text-base mb-6 leading-relaxed">
              Tell us a little about your business and what you want to build. We
              read every message and reply personally.
            </p>
            <ContactForm />
          </div>

          <p className="text-center text-sm text-zinc-500 mt-10">
            Just want the tool?{" "}
            <Link
              href={DATA_CHECKOUT_URL}
              className="text-aurora-green hover:text-white transition-colors font-medium"
            >
              Get DATA DAEMON, free &amp; open source →
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
