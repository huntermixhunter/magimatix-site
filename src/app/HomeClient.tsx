"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// ── Calendly ───────────────────────────────────────────────────────────────
// Free discovery call. Live event link from the Calendly account
// (hunterthomasmix@gmail.com). The popup is a modal overlay themed DARK to
// match the aurora palette. The background is lifted off near-black to a
// charcoal (1a1a24) and text is forced pure white — that gives Calendly's
// muted secondary text (field helper copy, the post-booking confirmation
// line) enough contrast to read, fixing the washed-out grey from before.
const CALENDLY_BASE_URL = "https://calendly.com/hunterthomasmix/discovery-call";
const CALENDLY_URL =
  `${CALENDLY_BASE_URL}?hide_gdpr_banner=1&background_color=1a1a24&text_color=ffffff&primary_color=5b7fff`;

// ── DATA DAEMON Dashboard product ───────────────────────────────────────────────────
// Self-hosted AI command center — the $39 tool-only tier and the front door to
// the whole AI offering. Demo video + product screenshots live in /public/data.
// On-site embedded Stripe Checkout — buyers complete payment on magimatix.com.
const DATA_CHECKOUT_URL = "/data-daemon/checkout";
const DATA_VIDEO_ID = "uQjrYX_nB7I";

const dataShots = [
  {
    src: "/data/data-bridge.png",
    title: "The main channel",
    caption: "Talk to your AI in plain language. It reads files, runs commands, and acts — not just chat.",
  },
  {
    src: "/data/data-workspaces.png",
    title: "Split into parallel panes",
    caption: "Point each pane at a different folder and model. Several agents working at once, side by side.",
  },
  {
    src: "/data/data-matrix.png",
    title: "A living memory graph",
    caption: "Everything it learns is wired into a searchable neural map you can explore and recall.",
  },
  {
    src: "/data/data-connectors.png",
    title: "Run local models too",
    caption: "Scan your hardware and run private models on your own machine — no cloud, no per-token bill.",
  },
];

// ── Field Debrief — the $5 live demo of DATA DAEMON ──────────────────────────
// debrief.magimatix.com is a standalone product: point the AI at any public
// Instagram or TikTok handle and it renders a 6-page HUD diagnostic PDF. On the
// homepage it doubles as proof of what DATA DAEMON does, at an impulse price.
// Sample pages copied from the live debrief site into /public/debrief.
const DEBRIEF_URL = "https://debrief.magimatix.com";

const debriefShots = [
  {
    src: "/debrief/debrief-vitals.png",
    tag: "PAGE 02 · VITALS",
    title: "Account vitals, benchmarked",
    caption: "Reach, engagement rate, follower velocity and posting cadence, read against where they should be (not just listed).",
  },
  {
    src: "/debrief/debrief-diagnosis.png",
    tag: "PAGE 04 · DIAGNOSIS",
    title: "The one root cause",
    caption: "The single biggest thing suppressing the account's reach, named plainly, with the winning pattern your top posts already share.",
  },
  {
    src: "/debrief/debrief-protocol.png",
    tag: "PAGE 05 · PROTOCOL",
    title: "A six-directive fix",
    caption: "Specific, ordered moves to correct the diagnosis, plus a day-by-day 14-day plan. Written to be done, not admired.",
  },
];

const dataFeatures = [
  "Multi-pane workspace — many agents, one screen",
  "Reads and writes your files, runs real commands",
  "Browses the web and controls your screen",
  "Persistent memory across every session",
  "Cloud or fully-local models — your choice",
  "Self-hosted on your machine — you own it all",
];

// Calendly's widget.js attaches this to window once loaded.
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

// ── The Ladder ───────────────────────────────────────────────────────────────
// Two ways to put AI to work, lowest commitment to highest. DATA DAEMON is the $39
// front door (a real, shipping product you own). Done-for-you is the bespoke
// build — automations, AI systems, and websites, scoped per client. (A $99
// setup bundle is a planned middle rung — held back until it actually ships.)
const tiers = [
  {
    id: "dfy",
    eyebrow: "We build it",
    name: "Done-for-You",
    price: "Custom",
    priceNote: "scoped to you",
    accent: "green",
    tagline:
      "We design and build the whole system end to end — automations, agents, integrations, and the website that fronts it.",
    points: [
      "Workflow automation + AI agents",
      "Custom integrations to your stack",
      "Websites & web design included",
      "Built, deployed, and supported by us",
    ],
    ctaLabel: "Book a free call →",
    ctaHref: "#contact",
    featured: false,
    badge: "",
  },
  {
    id: "tool",
    eyebrow: "Run it yourself",
    name: "DATA DAEMON",
    price: "$39",
    origPrice: "$49",
    priceNote: "one-time",
    accent: "cyan",
    tagline:
      "Your own AI command center. Download it, install it, and run a fleet of agents on your own machine.",
    points: [
      "Self-hosted — you own it outright",
      "Many agents, one fast dashboard",
      "Cloud or fully-local models",
      "One-time price, no subscription",
    ],
    ctaLabel: "Get DATA DAEMON →",
    ctaHref: DATA_CHECKOUT_URL,
    featured: false,
    badge: "20% off launch",
  },
];

// Aurora accent class maps — keeps Tailwind's purge happy (static strings).
const accentMap: Record<
  string,
  { text: string; ring: string; chipBg: string; dot: string }
> = {
  cyan: {
    text: "text-aurora-cyan",
    ring: "border-aurora-cyan/40 shadow-[0_0_50px_rgba(34,211,238,0.10)]",
    chipBg: "bg-aurora-cyan/10",
    dot: "text-aurora-cyan",
  },
  purple: {
    text: "text-aurora-purple",
    ring: "border-aurora-purple/50 shadow-[0_0_60px_rgba(168,128,255,0.16)]",
    chipBg: "bg-aurora-purple/10",
    dot: "text-aurora-purple",
  },
  green: {
    text: "text-aurora-green",
    ring: "border-aurora-green/40 shadow-[0_0_50px_rgba(74,222,128,0.10)]",
    chipBg: "bg-aurora-green/10",
    dot: "text-aurora-green",
  },
};

// ── Done-for-you capabilities ────────────────────────────────────────────────
// The done-for-you services we build and run for clients, defined below.
const aiServices = [
  {
    title: "Workflow Automation",
    description:
      "Eliminate the repetitive busywork eating your week. Data entry, follow-ups, scheduling, posting — we automate it so you get the hours back.",
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
    title: "AI Chatbots & Agents",
    description:
      "Custom-trained conversational AI that handles support, sales, and scheduling — available 24/7 across all your channels.",
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
    title: "Custom AI Solutions",
    description:
      "Tailored models and integrations built specifically for your business processes — wired straight into the tools you already run.",
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

// Websites — one capability inside Done-for-you.
const webCapabilities = [
  "Custom sites — zero templates",
  "E-commerce + secure checkout",
  "UI/UX, copy, and brand",
  "SEO + Core Web Vitals tuning",
  "Lead forms wired to your inbox",
  "You own 100% of the code",
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "A 30-minute call to learn your business, your goals, and your bottlenecks.",
  },
  {
    step: "02",
    title: "AI Solutions",
    description: "Your call feeds our own AI workflow to engineer a solution specific to you — never templated.",
  },
  {
    step: "03",
    title: "Proposal",
    description: "A custom deck mapping the recommended build and the price. You decide from there.",
  },
  {
    step: "04",
    title: "Build & Launch",
    description: "We ship it clean and fast, then optimize as your business grows.",
  },
];

const faqItems = [
  {
    q: "What exactly is DATA DAEMON, and why is it only $39?",
    a: "DATA DAEMON is our own AI command center — the same self-hosted dashboard we run the agency on, packaged so you can run it yourself. It is a one-time $39 download you install on your own machine: many agents in one screen, reading your files, running commands, browsing the web, and remembering everything across sessions. It is the front door to the whole AI offering — the cheapest way to put real AI to work without hiring anyone. If you want a whole system built for you instead, that is done-for-you.",
  },
  {
    q: "What is the difference between the $39 tool and done-for-you?",
    a: "The $39 tool is DATA DAEMON, run by you — you install it on your own machine and drive it yourself. Done-for-you is the full build: we design and ship the whole AI system end to end — automations, agents, integrations, and the website that fronts it — scoped and priced to your business. If you want the tool installed and wired up for you somewhere in between, mention it on the call and we will scope a setup for you.",
  },
  {
    q: "Do you still build websites?",
    a: "Yes. A website is one line item inside a done-for-you build — and we build fast, custom, conversion-focused sites with copy, SEO, and lead capture, with you owning 100% of the code. The difference is we wire AI leverage — chatbots, automations, lead routing — into the site instead of handing you a brochure that just sits there.",
  },
  {
    q: "Do I own everything?",
    a: "Yes. DATA DAEMON is self-hosted on your machine — you own the install outright. On done-for-you builds you own the code, the domain, the content, and the brand assets, full stop. No hostage situations, no proprietary builder you cannot escape.",
  },
  {
    q: "What is the 90-day money-back guarantee?",
    a: "On a done-for-you build: if you are not happy within 90 days of launch, ask for a refund and we give it back. The only condition is that the refund unwinds the deal — we take the work down and you return the deliverables, since we host and manage it. You are never stuck paying for work you do not love, and we are never out the hours for work someone keeps for free.",
  },
  {
    q: "How long does a done-for-you build take?",
    a: "Most builds launch in 2–4 weeks from kickoff. A focused automation or a simple site can go live in 7–14 days; larger systems with e-commerce or deep AI integration run 4–6 weeks depending on the wiring. We do not draw out timelines to look busy — once you say go, we move.",
  },
  {
    q: "What does a monthly fee cover, if any?",
    a: "DATA DAEMON has none — it is a one-time purchase you self-host. Done-for-you builds can carry an optional monthly that covers hosting, SSL, security patches, uptime monitoring, backups, small updates, plus whatever we scope — automation upkeep, SEO reporting, agent retraining. Think of it as the team that keeps the asset working, not just a hosting bill.",
  },
  {
    q: "What computers does DATA DAEMON run on?",
    a: "Windows, macOS, and Linux. Windows comes with a one-click installer (.exe) and Mac with a native disk image (.dmg); Linux uses the included zip and a one-line setup. All you need is Python 3.10+ and a free AI provider CLI (Claude, ChatGPT, Gemini, or Ollama) — the included INSTALL.txt walks you through it.",
  },
  {
    q: "Do you work with clients outside of Idaho?",
    a: "Absolutely. We are based in Idaho but our clients are everywhere — local landscape lighting in Sandpoint, wholesale botanicals shipping nationwide, bookkeeping services. The work is remote-friendly by design, and DATA DAEMON is a download anyone can run.",
  },
  {
    q: "What happens on the free discovery call?",
    a: "30 minutes to learn your business, your goals, and your bottlenecks. A few days later we come back with a custom deck mapping the recommended build and the price. You decide from there — no pressure, no templated pitch.",
  },
];

// Real client testimonials only. The section below renders ONLY when this array
// has entries — nothing fabricated ever ships. Drop in real quotes as you collect
// them. Shape:
// { quote: "...", name: "Jane Doe", role: "Owner, Dusk 2 Dawn Lighting", project: "Dusk 2 Dawn Lighting" }
const testimonials: {
  quote: string;
  name: string;
  role: string;
  project?: string;
}[] = [];

export default function HomeClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact form state. Status drives the button label and the inline notice.
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // honeypot — hidden from real users
  });
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [contactError, setContactError] = useState("");

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactStatus === "sending") return;
    setContactStatus("sending");
    setContactError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setContactError(data.error || "Something went wrong. Please try again.");
        setContactStatus("error");
        return;
      }
      setContactStatus("sent");
      setContact({ name: "", email: "", company: "", message: "", website: "" });
    } catch {
      setContactError("Network error. Please try again.");
      setContactStatus("error");
    }
  };

  // Open the Calendly scheduler in a centered popup overlay (no scroll trap).
  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Widget script not ready yet — fall back to opening in a new tab.
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Force video playback — some browsers block autoplay even when muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    const onReady = () => setVideoLoaded(true);
    // Mobile browsers throttle preload and often never fire canplaythrough,
    // so listen for earlier events too and force-clear after a short timeout.
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onReady);
    if (video.readyState >= 2) setVideoLoaded(true);

    const fallback = window.setTimeout(() => setVideoLoaded(true), 2500);

    tryPlay();

    const onInteraction = () => {
      tryPlay();
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
    };
    document.addEventListener("touchstart", onInteraction, { once: true });
    document.addEventListener("click", onInteraction, { once: true });

    return () => {
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onReady);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {!videoLoaded && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/logo.png"
              alt="Magimatix"
              width={200}
              height={57}
              className="h-10 md:h-14 w-auto"
              priority
            />
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="loading-dot" />
                <span className="loading-dot" style={{ animationDelay: "0.2s" }} />
                <span className="loading-dot" style={{ animationDelay: "0.4s" }} />
              </div>
              <p className="text-sm text-zinc-500 tracking-widest uppercase font-mono">
                Loading your experience
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background Video — 720p H.264 for all devices */}
      <video
        ref={videoRef}
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/bg-video-0605.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40 z-[1] pointer-events-none h-[100vh] h-[100lvh]" />

      {/* Navigation */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 md:px-6 md:py-1 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Magimatix"
              width={140}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
              What We Build
            </a>
            <a href="#data" className="text-sm text-zinc-400 hover:text-white transition-colors">
              DATA DAEMON
            </a>
            <a href="#debrief" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Field Debrief
            </a>
            <a href="#portfolio" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#process" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Process
            </a>
            <a href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Blog
            </a>
            <a href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href="#contact"
              className="btn-glow text-sm font-medium px-5 py-2.5 rounded-full text-white"
            >
              Get in Touch
            </a>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden px-6 pb-4 space-y-3" onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}>
          <a href="#pricing" className="block text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          <a href="#services" className="block text-sm text-zinc-400 hover:text-white transition-colors">What We Build</a>
          <a href="#data" className="block text-sm text-zinc-400 hover:text-white transition-colors">DATA DAEMON</a>
          <a href="#debrief" className="block text-sm text-zinc-400 hover:text-white transition-colors">Field Debrief</a>
          <a href="#portfolio" className="block text-sm text-zinc-400 hover:text-white transition-colors">Portfolio</a>
          <a href="#process" className="block text-sm text-zinc-400 hover:text-white transition-colors">Process</a>
          <a href="/blog" className="block text-sm text-zinc-400 hover:text-white transition-colors">Blog</a>
          <a href="#faq" className="block text-sm text-zinc-400 hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="block text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16 pb-28 md:pt-0 md:pb-0">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="animate-fade-in-up opacity-0 text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-5">
              Buy the tool or hire the team
            </p>
            <h1 className="animate-fade-in-up opacity-0 animate-delay-200 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              We Make AI{" "}
              <span className="gradient-text">Work</span> for Your Business
            </h1>
            <p className="animate-fade-in-up opacity-0 animate-delay-200 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              We design and build practical AI integrations that give your
              business back its time, cut the cost of the work you do every
              day, and turn more of your attention into more paying clients.
            </p>
            <div className="animate-fade-in-up opacity-0 animate-delay-300 flex flex-col items-center justify-center gap-5">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#data"
                  className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white"
                >
                  Meet DATA DAEMON
                </a>
                <a
                  href="#contact"
                  className="glass text-base font-medium px-8 py-4 rounded-full text-white hover:border-white/30 transition-colors"
                >
                  Book a Free Call
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Self-hosted — you own it
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  90-day money-back guarantee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  No long-term contract
                </span>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </section>

        {/* The Ladder — pricing / two ways in */}
        <div id="pricing" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                Two Ways In
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Choose how you want to experience{" "}
                <span className="gradient-text">Magimatix</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Either have us build everything you need to save time and money or
                if you feel up to the task try out our custom AI interface we built
                that we actually run the agency on and build your own stuff! We just
                want you to be able to make AI work for your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto reveal items-stretch">
              {tiers.map((tier) => {
                const a = accentMap[tier.accent];
                return (
                  <div
                    key={tier.id}
                    className={`glass rounded-2xl p-8 flex flex-col relative ${
                      tier.featured ? `glass-strong ${a.ring}` : ""
                    }`}
                  >
                    {tier.badge && (
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[0.65rem] font-mono tracking-widest uppercase px-4 py-1 rounded-full ${a.chipBg} ${a.text} border border-white/10`}>
                        {tier.badge}
                      </span>
                    )}
                    <p className={`text-xs font-mono tracking-widest uppercase mb-3 ${a.text}`}>
                      {tier.eyebrow}
                    </p>
                    <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {tier.tagline}
                    </p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {tier.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${a.dot}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          <span className="leading-snug">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tier.ctaHref}
                      className={`text-center text-sm font-medium px-6 py-3.5 rounded-full transition-colors ${
                        tier.featured
                          ? "btn-glow text-white"
                          : "border border-white/15 text-white hover:bg-white/5"
                      }`}
                    >
                      {tier.ctaLabel}
                    </a>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-zinc-500 mt-8 font-mono tracking-wide">
              Not sure where you fit? Book a free call and we will point you to the right rung.
            </p>
          </div>
        </section>

        {/* What We Build For You — Done-for-you capabilities */}
        <div id="services" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-purple tracking-widest uppercase mb-4">
                Done-for-You
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                What We Build{" "}
                <span className="gradient-text">For You</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Want the result without running the tool? We design, build, and
                deploy the whole AI system — then keep it running as your
                business grows.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
              {aiServices.map((service) => (
                <div
                  key={service.title}
                  className="glass service-card rounded-2xl p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-aurora-purple/10 flex items-center justify-center mx-auto mb-5 text-aurora-purple">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
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

            {/* Websites — one capability inside done-for-you */}
            <div className="glass rounded-2xl p-8 md:p-10 max-w-5xl mx-auto mt-8 reveal">
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-aurora-cyan tracking-widest uppercase">
                        Also included
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold">Websites &amp; web design</h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    Yes — we build sites. A fast, custom, conversion-focused
                    website is one line item inside a done-for-you build — with
                    AI leverage wired in, not a brochure that sits there. You own
                    100% of the code.
                  </p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {webCapabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm text-zinc-300">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-aurora-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="leading-snug">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-12 reveal">
              <a
                href="#contact"
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
              >
                Book Your Free Discovery Call
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <div id="portfolio" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                Our Work
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Projects We&apos;ve{" "}
                <span className="gradient-text">Built</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Real results for real businesses. Here are some of the sites and systems we&apos;ve designed and developed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 reveal">
              {[
                {
                  title: "Dusk 2 Dawn Lighting",
                  description: "Professional landscape lighting company. Custom design with elegant dark theme and immersive hero imagery.",
                  image: "/portfolio-dusk2dawn.jpg",
                  url: "https://dusk2dawnlighting.com/",
                  tags: ["Web Design", "Business"],
                },
                {
                  title: "Truesum Bookkeeping",
                  description: "Precision bookkeeping service. Clean, modern design with warm earth tones and professional feel.",
                  image: "/portfolio-truesum.jpg",
                  url: "https://truesumbookkeeping.com/",
                  tags: ["Web Design", "SaaS"],
                },
                {
                  title: "Elixir Keys",
                  description: "Premium wholesale botanicals brand. Rich, organic aesthetic with a luxurious dark-green palette.",
                  image: "/portfolio-elixirkeys.jpg",
                  url: "https://elixirkeys.com/",
                  tags: ["Web Design", "E-Commerce"],
                },
                {
                  title: "Selkirk Sprinklers",
                  description: "Irrigation and sprinkler services company in northern Idaho. Clean, conversion-focused design built to drive local leads.",
                  image: "/portfolio-selkirk.jpg",
                  url: "https://selkirksprinklers.com/",
                  tags: ["Web Design", "Business"],
                },
              ].map((project) => (
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

        {/* Process Section */}
        <div id="process" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-blue tracking-widest uppercase mb-4">
                Our Process
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                From Vision to{" "}
                <span className="gradient-text">Reality</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                A streamlined, transparent process that keeps you in control at every stage.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto reveal">
              {processSteps.map((item, i) => (
                <div key={item.step} className="relative text-center">
                  {/* Connector line */}
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

        {/* DATA DAEMON Dashboard — the $39 front door, expanded */}
        <div id="data" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <p className="text-sm font-mono text-aurora-green tracking-widest uppercase mb-4">
                The $39 Front Door
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Meet{" "}
                <span className="gradient-text">DATA DAEMON</span> — Your AI Command Center
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                DATA means Dashboard for Analytical Thought and Action. It is the
                AI interface we run the agency on. We&apos;re handing you the option
                to build the same way we do here. Optimized for use with top AI
                subscription models (Claude Code CLI, Codex CLI) not API to save
                you money. API version of DATA may be released in the future.
                Packaged so you can easily run it yourself and
                manage everything in one place. A fleet of AI agents from one local,
                self-hosted screen. They chat, write code, run commands, browse the
                web, control your screen, and remember everything across sessions.
                Yours outright, one time.
              </p>
            </div>

            {/* Demo video — responsive 16:9 */}
            <div className="reveal max-w-4xl mx-auto mb-14">
              <div className="glass rounded-2xl overflow-hidden p-2 md:p-3">
                <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${DATA_VIDEO_ID}`}
                    title="DATA DAEMON Dashboard — Demo"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Screenshot gallery */}
            <div className="grid md:grid-cols-2 gap-6 reveal mb-14">
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
                    <p className="text-sm text-zinc-400 leading-relaxed">{shot.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Feature list + CTA */}
            <div className="glass-strong rounded-2xl p-8 md:p-12 max-w-4xl mx-auto reveal text-center">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-2xl mx-auto mb-10">
                {dataFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={DATA_CHECKOUT_URL}
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
              >
                Get DATA DAEMON — $39 →
              </a>
              <p className="text-xs text-zinc-500 mt-4 font-mono tracking-wide">
                One-time purchase · Self-hosted · Runs on your machine
              </p>
              <p className="inline-flex items-center gap-2 mt-4 text-xs text-zinc-400 font-mono tracking-wide border border-white/10 rounded-full px-4 py-1.5">
                <svg className="w-3.5 h-3.5 text-aurora-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 5.7 10.5 4.6v7.1H3V5.7Zm0 12.6 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.7h-9.5v6.8Zm0-15.4v6.9H21V3l-9.5 1.1Z" />
                </svg>
                Windows · macOS · Linux — one-click installers for Windows &amp; Mac
              </p>
            </div>
          </div>
        </section>

        {/* Field Debrief — the $5 live demo of DATA DAEMON (debrief.magimatix.com) */}
        <div id="debrief" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 reveal">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                See It Work · $5
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Watch It Read a{" "}
                <span className="gradient-text">Real Account</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Want proof before you buy the whole command center? Point our AI
                at any public Instagram or TikTok handle and it renders a 6-page
                Field Debrief: the vitals, the posts that worked and why, the one
                root cause holding the account back, and a 14-day fix. $5, no
                login, about 60 seconds.
              </p>
            </div>

            {/* Stat strip */}
            <div className="reveal max-w-3xl mx-auto mb-12">
              <div className="glass rounded-2xl px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs md:text-sm text-zinc-400">
                <span><span className="text-aurora-cyan font-bold">6</span> pages of HUD analysis</span>
                <span><span className="text-aurora-cyan font-bold">~60s</span> handle to PDF</span>
                <span><span className="text-aurora-cyan font-bold">$5</span> flat, no subscription</span>
                <span><span className="text-aurora-cyan font-bold">0</span> logins or passwords</span>
              </div>
            </div>

            {/* Sample pages — real debrief on a live account */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 reveal mb-12">
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
                    <p className="text-sm text-zinc-400 leading-relaxed">{shot.caption}</p>
                  </figcaption>
                </a>
              ))}
            </div>

            <div className="text-center reveal">
              <a
                href={DEBRIEF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
              >
                Run a Field Debrief · $5 →
              </a>
              <p className="text-xs text-zinc-500 mt-4 font-mono tracking-wide">
                These are six real pages from one live account. Submit your own handle for your own read.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section — renders only when real client quotes exist */}
        {testimonials.length > 0 && (
          <>
            <div id="testimonials" className="section-divider max-w-4xl mx-auto" />
            <section className="py-20 relative">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 reveal">
                  <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                    Client Words
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                    What Clients{" "}
                    <span className="gradient-text">Say</span>
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    The work speaks for itself — but they say it better.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
                  {testimonials.map((t) => (
                    <figure
                      key={t.name}
                      className="glass service-card rounded-2xl p-8 flex flex-col"
                    >
                      <div className="flex gap-1 mb-5 text-aurora-cyan" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 0 0-.363 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.367-2.447a1 1 0 0 0-1.176 0l-3.367 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 0 0-.363-1.118L2.345 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957Z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-zinc-300 leading-relaxed mb-6 flex-1">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-auto">
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-zinc-400">{t.role}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* FAQ Section */}
        <div id="faq" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
              {/* Left: intro */}
              <div className="reveal lg:sticky lg:top-28">
                <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                  Common Questions
                </p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                  Questions{" "}
                  <span className="gradient-text">Worth Asking</span>
                </h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                  Straight answers on the two tiers, ownership, timelines, and
                  what actually happens after you say go. No fluff, no fine print.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan hover:text-white transition-colors group"
                >
                  Still curious? Talk to us
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* Right: accordion */}
              <div className="reveal">
                <div className="space-y-3">
                  {faqItems.map((item, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={item.q}
                        className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "border-aurora-blue/40 shadow-[0_0_40px_rgba(91,127,255,0.12)]"
                            : "hover:border-white/20"
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left group"
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-start gap-4 md:gap-5">
                            <span
                              className={`font-mono text-xs tracking-widest pt-1 transition-colors ${
                                isOpen ? "text-aurora-cyan" : "text-zinc-600 group-hover:text-zinc-400"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-base md:text-lg font-semibold leading-snug transition-colors ${
                                isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
                              }`}
                            >
                              {item.q}
                            </span>
                          </span>
                          <span
                            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isOpen
                                ? "bg-aurora-blue/20 rotate-180"
                                : "bg-white/5 group-hover:bg-white/10"
                            }`}
                          >
                            <svg
                              className={`w-4 h-4 transition-colors ${
                                isOpen ? "text-aurora-cyan" : "text-zinc-400"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </button>
                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-6 md:px-8 pb-6 md:pb-7 pl-[3.75rem] md:pl-[4.25rem]">
                              <div className="h-px bg-gradient-to-r from-aurora-cyan/30 via-aurora-blue/20 to-transparent mb-5" />
                              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Contact Section */}
        <div id="contact" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-6 text-center reveal">
            <p className="text-sm font-mono text-aurora-pink tracking-widest uppercase mb-4">
              Let&apos;s Work Together
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Put AI to{" "}
              <span className="gradient-text">Work</span>?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Run DATA DAEMON yourself for $39, or pick a time below for a free 30-minute
              call and we&apos;ll map the right build for your business — no
              pressure, no templated pitch.
            </p>

            {/* Primary path — book the call directly via popup overlay */}
            <div className="glass-strong rounded-2xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto mb-10">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                Book Your Free Discovery Call
              </p>
              <p className="text-zinc-400 text-base mb-6 leading-relaxed">
                Grab a 30-minute slot that works for you. Opens an instant
                scheduler — pick a time and you&apos;re booked.
              </p>
              <button
                type="button"
                onClick={openCalendly}
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block cursor-pointer"
              >
                Pick a Time →
              </button>
              {/* Calendly popup assets */}
              <link
                rel="stylesheet"
                href="https://assets.calendly.com/assets/external/widget.css"
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="afterInteractive"
              />
            </div>

            {/* Secondary path — send a message directly (emails us via Resend) */}
            <div className="flex items-center gap-4 max-w-3xl mx-auto mb-10">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                or send a message
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="glass-strong rounded-2xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto mb-10 text-left">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-2">
                Prefer to Write?
              </p>
              <p className="text-zinc-400 text-base mb-6 leading-relaxed">
                Tell us a little about your business and what you want to build.
                We read every message and reply personally.
              </p>

              {contactStatus === "sent" ? (
                <div className="rounded-xl border border-aurora-green/30 bg-aurora-green/5 p-6 text-center">
                  <p className="text-aurora-green font-medium mb-1">
                    Message sent.
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Thanks for reaching out. We&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitContact} className="space-y-5" noValidate>
                  {/* Honeypot — visually hidden, off-screen, ignored by humans */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label>
                      Do not fill this out
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={contact.website}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, website: e.target.value }))
                        }
                      />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm text-zinc-300 mb-2"
                      >
                        Name <span className="text-aurora-pink">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contact.name}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, name: e.target.value }))
                        }
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm text-zinc-300 mb-2"
                      >
                        Email <span className="text-aurora-pink">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, email: e.target.value }))
                        }
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm text-zinc-300 mb-2"
                    >
                      Company{" "}
                      <span className="text-zinc-500 font-normal">(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={contact.company}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, company: e.target.value }))
                      }
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors"
                      placeholder="Your business"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm text-zinc-300 mb-2"
                    >
                      Message <span className="text-aurora-pink">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={contact.message}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, message: e.target.value }))
                      }
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors resize-y"
                      placeholder="What are you trying to build, and what would a win look like?"
                    />
                  </div>

                  {contactStatus === "error" && (
                    <p className="text-sm text-aurora-pink">{contactError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {contactStatus === "sending" ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            <p className="text-sm text-zinc-500">
              Just want the tool?{" "}
              <a href={DATA_CHECKOUT_URL} className="text-aurora-green hover:text-white transition-colors font-medium">
                Get DATA DAEMON for $39 →
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-5 md:py-6 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Magimatix"
                  width={200}
                  height={57}
                  className="h-6 md:h-7 w-auto"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <a href="#pricing" className="text-xs text-zinc-500 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#data" className="text-xs text-zinc-500 hover:text-white transition-colors">
                  DATA DAEMON
                </a>
                <a href="#services" className="text-xs text-zinc-500 hover:text-white transition-colors">
                  What We Build
                </a>
                <a href="/blog" className="text-xs text-zinc-500 hover:text-white transition-colors">
                  Blog
                </a>
                <a href="#faq" className="text-xs text-zinc-500 hover:text-white transition-colors">
                  FAQ
                </a>
                <a href="#contact" className="text-xs text-zinc-500 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
              <p className="text-xs text-zinc-600">
                &copy; 2026 Magimatix LLC. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
