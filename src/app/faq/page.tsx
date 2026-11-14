import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import FaqAccordion from "../_components/FaqAccordion";
import CtaBand from "../_components/CtaBand";
import { faqItems } from "../_content";

export const metadata: Metadata = {
  title: "FAQ: Straight Answers About How We Work",
  description:
    "Straight answers on custom dashboards, DATA DAEMON, done-for-you AI builds, websites, ownership, timelines, pricing, and what happens after you say go.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Magimatix FAQ: Straight Answers About How We Work",
    description:
      "Ownership, timelines, pricing, and what happens after you say go. No fluff, no fine print.",
    url: "https://magimatix.com/faq",
    type: "website",
  },
};

// Page-level FAQ schema so these answers are eligible for rich results.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="Common Questions"
        title={
          <>
            Questions <span className="gradient-text">Worth Asking</span>
          </>
        }
        lede="Straight answers on the products, ownership, timelines, and what actually happens after you say go. No fluff, no fine print."
      />

      <section className="pb-16 md:pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 reveal">
          <FaqAccordion items={faqItems} />
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
          <p className="text-sm text-zinc-500">
            Looking for something specific?{" "}
            <Link href="/data-daemon" className="text-aurora-green hover:text-white transition-colors">
              DATA DAEMON
            </Link>
            {" · "}
            <Link href="/dashboards" className="text-aurora-blue hover:text-white transition-colors">
              Custom dashboards
            </Link>
            {" · "}
            <Link href="/services" className="text-aurora-purple hover:text-white transition-colors">
              AI services
            </Link>
            {" · "}
            <Link href="/websites" className="text-aurora-cyan hover:text-white transition-colors">
              Websites
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Still curious? Talk to us."
        body="A free 30-minute call answers more than any FAQ can. Bring the awkward questions."
        primaryLabel="Book a Free Call →"
        secondaryHref="/contact"
        secondaryLabel="Or send a message"
      />
    </SiteShell>
  );
}
