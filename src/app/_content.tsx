// ─────────────────────────────────────────────────────────────────────────────
// Shared site content.
//
// Every page (home chooser, /services, /websites, /data-daemon, /contact,
// /faq) reads from this one file so copy only ever lives in one place.
// Pulled out of the old monolithic HomeClient when the site was split from a
// single long scroll into a "what are you looking for?" router.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";

// ── Booking ──────────────────────────────────────────────────────────────────
export const CALENDLY_BASE_URL =
  "https://calendly.com/hunterthomasmix/discovery-call";
export const CALENDLY_URL = `${CALENDLY_BASE_URL}?hide_gdpr_banner=1&background_color=1a1a24&text_color=ffffff&primary_color=5b7fff`;

// ── Product links ────────────────────────────────────────────────────────────
export const DATA_CHECKOUT_URL = "/data-daemon/checkout";
export const DATA_VIDEO_ID = "LzzKZVD_axY";

// ── DATA DAEMON ──────────────────────────────────────────────────────────────
export const dataShots = [
  {
    src: "/data/data-bridge.png",
    title: "The main channel",
    caption:
      "Talk to your AI in plain language. It reads files, runs commands, and acts. Not just chat.",
  },
  {
    src: "/data/data-workspaces.png",
    title: "Split into parallel panes",
    caption:
      "Point each pane at a different folder and model. Several agents working at once, side by side.",
  },
  {
    src: "/data/data-matrix.png",
    title: "A living memory graph",
    caption:
      "Everything it learns is wired into a searchable neural map you can explore and recall.",
  },
  {
    src: "/data/data-connectors.png",
    title: "Run local models too",
    caption:
      "Scan your hardware and run private models on your own machine. No cloud, no per-token bill.",
  },
];

export const dataFeatures = [
  "Multi-pane workspace: many agents, one screen",
  "Reads and writes your files, runs real commands",
  "Browses the web and controls your screen",
  "Persistent memory across every session",
  "Cloud or fully-local models, your choice",
  "Self-hosted on your machine, you own it all",
];

// ── Done-for-you capabilities ────────────────────────────────────────────────
export type Service = {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: ReactNode;
};

export const aiServices: Service[] = [
  {
    id: "automation",
    title: "Workflow Automation",
    description:
      "Eliminate the repetitive busywork eating your week. Data entry, follow-ups, scheduling, posting. We automate it so you get the hours back.",
    items: [
      "Process audit + automation map",
      "Custom workflow build",
      "App integrations (CRM, email, sheets, social)",
      "Scheduled + triggered runs",
      "Error alerts + monitoring",
      "Documentation + handoff",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12" />
      </svg>
    ),
  },
  {
    id: "agents",
    title: "AI Chatbots & Agents",
    description:
      "Custom-trained conversational AI that handles support, sales, and scheduling, available 24/7 across all your channels.",
    items: [
      "Trained on your business data",
      "Lead capture + qualification",
      "Appointment booking",
      "24/7 across web, SMS + social",
      "Human handoff when needed",
      "Monthly retraining",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    id: "analytics",
    title: "Data & Analytics",
    description:
      "Transform raw data into actionable insights with AI-powered dashboards, reporting, and predictive analytics.",
    items: [
      "Data source connections",
      "Custom live dashboard",
      "Automated reporting",
      "KPI tracking + alerts",
      "Predictive insights",
      "Exportable reports",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    id: "custom",
    title: "Custom AI Solutions",
    description:
      "Tailored models and integrations built specifically for your business processes, wired straight into the tools you already run.",
    items: [
      "Discovery + feasibility scoping",
      "Custom model / integration build",
      "API wiring to your stack",
      "Testing + validation",
      "Deployment + documentation",
      "Training + support window",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
];

// ── Websites ─────────────────────────────────────────────────────────────────
export const webCapabilities = [
  "Custom sites, zero templates",
  "E-commerce + secure checkout",
  "UI/UX, copy, and brand",
  "SEO + Core Web Vitals tuning",
  "Lead forms wired to your inbox",
  "You own 100% of the code",
];

export const webDeliverables = [
  {
    title: "Custom design, no templates",
    body: "Every site is drawn for your business from a blank page. No theme you can spot from across the room, and no page builder you cannot escape later.",
  },
  {
    title: "Built to convert, not to decorate",
    body: "Clear offer, clear path, lead capture wired straight to your inbox. The job of the site is to turn a visitor into a conversation.",
  },
  {
    title: "Fast by default",
    body: "Core Web Vitals, image optimization, and on-page SEO are part of the build, not an upsell bolted on six months later.",
  },
  {
    title: "AI leverage wired in",
    body: "Chatbots, automated follow-up, and lead routing live inside the site, so it keeps working while you sleep instead of sitting there.",
  },
  {
    title: "E-commerce when you need it",
    body: "Product catalogs, secure checkout, inventory, and mobile-first purchase flows for selling locally or shipping nationwide.",
  },
  {
    title: "You own everything",
    body: "The code, the domain, the content, the brand assets. No hostage situations and no proprietary builder lock-in.",
  },
];

// ── Portfolio ────────────────────────────────────────────────────────────────
export const portfolio = [
  {
    title: "Dusk 2 Dawn Lighting",
    description:
      "Professional landscape lighting company. Custom design with elegant dark theme and immersive hero imagery.",
    image: "/portfolio-dusk2dawn.jpg",
    url: "https://dusk2dawnlighting.com/",
    tags: ["Web Design", "Business"],
  },
  {
    title: "Truesum Bookkeeping",
    description:
      "Precision bookkeeping service. Clean, modern design with warm earth tones and professional feel.",
    image: "/portfolio-truesum.jpg",
    url: "https://truesumbookkeeping.com/",
    tags: ["Web Design", "SaaS"],
  },
  {
    title: "Elixir Keys",
    description:
      "Premium wholesale botanicals brand. Rich, organic aesthetic with a luxurious dark-green palette.",
    image: "/portfolio-elixirkeys.jpg",
    url: "https://elixirkeys.com/",
    tags: ["Web Design", "E-Commerce"],
  },
  {
    title: "Selkirk Sprinklers",
    description:
      "Irrigation and sprinkler services company in northern Idaho. Clean, conversion-focused design built to drive local leads.",
    image: "/portfolio-selkirk.jpg",
    url: "https://selkirksprinklers.com/",
    tags: ["Web Design", "Business"],
  },
];

// ── Process ──────────────────────────────────────────────────────────────────
export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "A 30-minute call to learn your business, your goals, and your bottlenecks.",
  },
  {
    step: "02",
    title: "AI Solutions",
    description:
      "Your call feeds our own AI workflow to engineer a solution specific to you. Never templated.",
  },
  {
    step: "03",
    title: "Proposal",
    description:
      "A custom deck mapping the recommended build and the price. You decide from there.",
  },
  {
    step: "04",
    title: "Build & Launch",
    description:
      "We ship it clean and fast, then optimize as your business grows.",
  },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string; topics: string[] };

// `topics` lets each page pull only the questions that belong to it, while /faq
// still renders the whole set.
export const faqItems: FaqItem[] = [
  {
    q: "What exactly is DATA DAEMON, and is it really free?",
    a: "Yes. It is free and open source under Apache-2.0. DATA DAEMON is our own AI command center, the same self-hosted dashboard we run the agency on, packaged so you can run it yourself: many agents in one screen, reading your files, running commands, browsing the web, and remembering everything across sessions. Download it, read every line of the source, and run it on your own machine at no cost. If it earns a place in your workflow you can name your price to support development, but that is entirely optional. If you want a whole system built for you instead, that is done-for-you.",
    topics: ["data"],
  },
  {
    q: "What is the difference between DATA DAEMON and done-for-you?",
    a: "DATA DAEMON is the free, open-source tool, run by you. You install it on your own machine and drive it yourself. Done-for-you is the full build: we design and ship the whole AI system end to end (automations, agents, integrations, and the website that fronts it), scoped and priced to your business. If you want the tool installed and wired up for you somewhere in between, mention it on the call and we will scope a paid setup for you.",
    topics: ["data", "services"],
  },
  {
    q: "Do you still build websites?",
    a: "Yes. A website is one line item inside a done-for-you build, and we build fast, custom, conversion-focused sites with copy, SEO, and lead capture, with you owning 100% of the code. The difference is we wire AI leverage (chatbots, automations, lead routing) into the site instead of handing you a brochure that just sits there.",
    topics: ["websites", "services"],
  },
  {
    q: "Do I own everything?",
    a: "Yes. DATA DAEMON is open source and self-hosted on your machine. The code is yours to run, modify, and share under Apache-2.0. On done-for-you builds you own the code, the domain, the content, and the brand assets, full stop. No hostage situations, no proprietary builder you cannot escape.",
    topics: ["websites", "services", "data"],
  },
  {
    q: "How long does a done-for-you build take?",
    a: "Most builds launch in 2–4 weeks from kickoff. A focused automation or a simple site can go live in 7–14 days; larger systems with e-commerce or deep AI integration run 4–6 weeks depending on the wiring. We do not draw out timelines to look busy. Once you say go, we move.",
    topics: ["services", "websites"],
  },
  {
    q: "What does a monthly fee cover, if any?",
    a: "DATA DAEMON has none. It is free and open source, self-hosted by you. Done-for-you builds can carry an optional monthly that covers hosting, SSL, security patches, uptime monitoring, backups, small updates, plus whatever we scope: automation upkeep, SEO reporting, agent retraining. Think of it as the team that keeps the asset working, not just a hosting bill.",
    topics: ["services", "websites"],
  },
  {
    q: "What computers does DATA DAEMON run on?",
    a: "Windows, macOS, and Linux. Windows has an .exe installer. Mac has separate .dmg downloads for Apple Silicon and Intel, with Python included. Copy the DATA folder out of the disk image and follow the downloadable Mac setup guide, which covers unsigned-app approval. Linux and source ZIP installs need Python 3.10+. Chat requires a supported AI provider, using your own account or a local model.",
    topics: ["data"],
  },
  {
    q: "Do you work with clients outside of Idaho?",
    a: "Absolutely. We are based in Idaho but our clients are everywhere: local landscape lighting in Sandpoint, wholesale botanicals shipping nationwide, bookkeeping services. The work is remote-friendly by design, and DATA DAEMON is a download anyone can run.",
    topics: ["services", "websites"],
  },
  {
    q: "What happens on the free discovery call?",
    a: "30 minutes to learn your business, your goals, and your bottlenecks. A few days later we come back with a custom deck mapping the recommended build and the price. You decide from there. No pressure, no templated pitch.",
    topics: ["services", "websites", "contact"],
  },
];

export const faqFor = (topic: string) =>
  faqItems.filter((item) => item.topics.includes(topic));
