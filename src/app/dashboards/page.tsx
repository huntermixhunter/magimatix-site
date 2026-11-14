import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../_components/SiteShell";
import PageHero from "../_components/PageHero";
import BookCallButton from "../_components/BookCallButton";
import FaqAccordion from "../_components/FaqAccordion";
import CtaBand from "../_components/CtaBand";
import { faqFor } from "../_content";

const description =
  "Custom dashboards for businesses and individuals. Bring projects, data, apps, and optional AI into one workspace designed and built around you by Magimatix.";

export const metadata: Metadata = {
  title: "Custom Dashboards for Businesses & Individuals",
  description,
  alternates: { canonical: "/dashboards" },
  openGraph: {
    title: "Custom Dashboards for Businesses & Individuals | Magimatix",
    description,
    url: "https://magimatix.com/dashboards",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Dashboards | Magimatix",
    description,
  },
};

const audiences = [
  {
    label: "For businesses",
    title: "Your business, in one place.",
    body: "See what needs attention and give your team a shared place to move work forward.",
    accent: "text-aurora-cyan",
    examples: [
      {
        title: "Leads, clients & sales",
        body: "Bring customer records, follow-ups, bookings, and sales figures into a clear daily view.",
      },
      {
        title: "Projects & operations",
        body: "Track jobs, deadlines, tasks, and the numbers that tell you how work is going.",
      },
      {
        title: "Client & team portals",
        body: "Give clients or teammates a place for project updates, files, and approvals relevant to them.",
      },
    ],
  },
  {
    label: "For individuals",
    title: "A workspace that fits you.",
    body: "Bring your projects and everyday tools together, whether you work solo or are organizing your own life.",
    accent: "text-aurora-blue",
    examples: [
      {
        title: "Projects, plans & goals",
        body: "Keep your tasks, calendar, notes, and progress together in a layout that makes sense to you.",
      },
      {
        title: "Content & creative work",
        body: "Organize ideas, assets, publishing plans, and results across your creative projects.",
      },
      {
        title: "Your own AI workspace",
        body: "Bring assistants, research, files, and useful automations into one interface built for your routine.",
      },
    ],
  },
];

const capabilities = [
  {
    title: "Connect the tools you use",
    body: "Bring information together from your apps, spreadsheets, and existing systems. We confirm the available connections during discovery.",
  },
  {
    title: "See what matters. Act on it.",
    body: "Choose the reports, alerts, and actions you need, from updating a project to starting a workflow, all from your dashboard.",
  },
  {
    title: "Add AI where it helps",
    body: "Summarize updates, search your information, or hand repetitive tasks to an assistant. AI is optional and scoped to your needs.",
  },
  {
    title: "Make it your own",
    body: "Custom screens, your branding, and views for desktop and mobile. You own the custom code, with handoff and support agreed up front.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Dashboard Development",
  description,
  serviceType: "Custom dashboards for businesses and individuals",
  url: "https://magimatix.com/dashboards",
  provider: {
    "@type": "Organization",
    name: "Magimatix",
    url: "https://magimatix.com",
  },
};

export default function DashboardsPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        eyebrow="Custom Dashboards"
        eyebrowClass="text-aurora-blue"
        title={
          <>
            Your dashboard.<br />
            <span className="gradient-text">Built around you.</span>
          </>
        }
        lede="We design and build custom dashboards for businesses and individuals. Your projects, data, apps, and AI tools, together in a workspace made for how you work."
      >
        <BookCallButton>Plan My Dashboard →</BookCallButton>
        <p className="text-xs text-zinc-400 mt-5 font-mono tracking-wide">
          Free 30-minute discovery call · Custom scope and quote
        </p>
      </PageHero>

      <section aria-labelledby="dashboard-examples" className="pb-16 md:pb-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 reveal">
            <h2 id="dashboard-examples" className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              What would yours bring together?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Start with the parts of your day that feel scattered. These are a
              few ways a custom dashboard can help.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {audiences.map((audience) => (
              <article key={audience.label} className="glass rounded-2xl p-6 md:p-9 reveal">
                <p className={`text-xs font-mono tracking-widest uppercase mb-4 ${audience.accent}`}>
                  {audience.label}
                </p>
                <h3 className="text-2xl font-bold tracking-tight mb-3">{audience.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-7">{audience.body}</p>
                <ul className="divide-y divide-white/10 border-t border-white/10">
                  {audience.examples.map((example) => (
                    <li key={example.title} className="py-5 last:pb-0">
                      <h4 className="text-base font-semibold mb-2">{example.title}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">{example.body}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="dashboard-build" className="py-12 md:py-16 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16" />
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
          <div className="reveal">
            <p className="text-sm font-mono text-aurora-blue tracking-widest uppercase mb-4">The build</p>
            <h2 id="dashboard-build" className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Your tools.<br />Your workflow.<br />
              <span className="gradient-text">Your dashboard.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We start with what you need to see and do each day, map the
              connections, and agree on a scope and price. Then we design and
              build it with you, from the first screen through launch.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Want to see a workspace we build and use ourselves?{" "}
              <Link href="/data-daemon" className="text-aurora-green hover:text-white transition-colors">
                Explore DATA DAEMON →
              </Link>
            </p>
          </div>
          <dl className="divide-y divide-white/10 border-t border-white/10 reveal">
            {capabilities.map((capability) => (
              <div key={capability.title} className="py-6 first:pt-6">
                <dt className="text-lg font-semibold mb-2">{capability.title}</dt>
                <dd className="text-sm text-zinc-400 leading-relaxed">{capability.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="dashboard-questions" className="pt-16 pb-8 relative">
        <div className="section-divider max-w-4xl mx-auto mb-16" />
        <div className="max-w-4xl mx-auto px-6">
          <h2 id="dashboard-questions" className="text-2xl md:text-3xl font-bold text-center mb-10 reveal">
            Before we build
          </h2>
          <div className="reveal">
            <FaqAccordion items={faqFor("dashboards")} />
          </div>
        </div>
      </section>

      <CtaBand
        title="What would make your day easier?"
        body="Bring your ideas, your spreadsheet, or the list of tabs you open every morning. We will map out a dashboard for your business or personal workflow."
        primaryLabel="Plan My Dashboard →"
        secondaryHref="/contact"
        secondaryLabel="Tell us what you need"
        note="Free 30-minute call · Scope and price agreed before the build"
      />
    </SiteShell>
  );
}
