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

// Calendly's widget.js attaches this to window once loaded.
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const webDesignServices = [
  {
    title: "Custom Websites",
    description:
      "Bespoke, hand-crafted websites built from the ground up to reflect your brand identity and convert visitors into customers.",
    items: [
      "Custom design — zero templates",
      "Mobile-first responsive build",
      "Copywriting for every page",
      "Lead form wired straight to your inbox",
      "On-page SEO + analytics setup",
      "You own 100% of the code",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
      </svg>
    ),
  },
  {
    title: "E-Commerce",
    description:
      "High-converting online stores with seamless checkout flows, inventory management, and payment integrations.",
    items: [
      "Product catalog setup",
      "Stripe / card payment integration",
      "Secure, optimized checkout",
      "Inventory + order management",
      "Automated receipt + order emails",
      "Abandoned-cart recovery",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive, research-driven interfaces designed for engagement. User flows, wireframes, and prototypes that put your audience first.",
    items: [
      "Discovery + audience research",
      "Sitemap & user flows",
      "Wireframes + interactive prototype",
      "Design system (color, type, components)",
      "Accessibility (WCAG) pass",
      "Revisions until you approve",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.764m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "SEO & Performance",
    description:
      "Blazing-fast load times, Core Web Vitals optimization, and search engine visibility built into every project.",
    items: [
      "Local + keyword search research",
      "Google Business Profile optimization",
      "On-page SEO (titles, meta, schema)",
      "Core Web Vitals tuning",
      "Image compression + lazy-load",
      "Monthly ranking report",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const aiServices = [
  {
    title: "Workflow Automation",
    description:
      "Eliminate repetitive tasks with intelligent AI workflows. From data processing to social media posting and customer communications, we automate it all.",
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
      "Tailored machine learning models and AI integrations built specifically for your business processes and goals.",
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

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "A 30-minute call to learn your business, your goals, and your bottlenecks.",
  },
  {
    step: "02",
    title: "AI Solutions",
    description: "Your call feeds our AI workflow to engineer solutions specific to you — never templated.",
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

const pricingTiers = [
  {
    name: "Launch",
    tagline: "For solo operators and brand-new businesses",
    setup: "2,500",
    monthly: "297",
    accent: "cyan",
    featured: false,
    features: [
      "1-page custom site (no templates)",
      "Local SEO setup — Google Business Profile, schema, sitemap",
      "Mobile-optimized, Core Web Vitals tuned",
      "Hosting, SSL, security, uptime monitoring",
      "1 revision round during build",
      "1 content update per month",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tagline: "For established businesses ready to make the phone ring",
    setup: "4,997",
    monthly: "497",
    accent: "purple",
    featured: true,
    guarantee: "90-day rank-or-refund guarantee",
    features: [
      "Up to 5 pages, fully custom design",
      "Full on-page + technical SEO",
      "Lead capture forms with email integration",
      "Google Business Profile optimization",
      "2 content updates per month",
      "Monthly SEO performance report",
      "Keyword ranking tracking",
      "Priority email support",
    ],
  },
  {
    name: "Scale",
    tagline: "For businesses ready to dominate with AI leverage",
    setup: "9,997",
    monthly: "997",
    accent: "pink",
    featured: false,
    features: [
      "Everything in Growth",
      "E-commerce or online booking integration",
      "Custom AI chatbot trained on your business",
      "1 AI automation built and deployed",
      "Priority phone + email support",
      "1 automation iteration per quarter",
      "Quarterly 60-min strategy call",
    ],
  },
];

const pricingAddOns = [
  { label: "Additional AI automation", price: "$1,500 + $97/mo" },
  { label: "Logo + brand identity", price: "$1,500" },
  { label: "Photo / video day (local only)", price: "$1,200" },
  { label: "Blog + social content", price: "$497/mo" },
  { label: "Google Ads management", price: "15% of spend ($497/mo min)" },
];

const faqItems = [
  {
    q: "Why does Magimatix cost more than the $500 freelancer I found on Fiverr?",
    a: "Because we are not selling a website — we are selling a system that books work. The $500 site is a brochure: it sits there. Our sites are engineered to rank locally, capture leads, and feed your phone. One real customer typically pays for the entire build. Cheap is the most expensive option you can buy.",
  },
  {
    q: "What is the 90-day rank-or-refund guarantee?",
    a: "On the Growth plan, if you do not rank on page one of Google for at least one of your agreed-upon local keywords within 90 days of launch, we refund the setup fee in full and keep working until you do. We can offer this because we have done the work to deserve the confidence.",
  },
  {
    q: "How long does it take to launch?",
    a: "Launch plan: 7-14 days from kickoff. Growth plan: 3-4 weeks. Scale plan: 4-6 weeks depending on integrations. We do not draw out timelines to look busy — once you say go, we move.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. You own the code, the domain, the content, and the brand assets — full stop. If you ever leave, we hand it over clean. No hostage situations, no proprietary builders you cannot escape.",
  },
  {
    q: "What does the monthly fee actually cover?",
    a: "Hosting, SSL, security patches, uptime monitoring, regular backups, small content updates, plus your tier's specific deliverables (SEO reporting on Growth, AI automation upkeep on Scale, etc). Think of it as the team that keeps the asset working — not just a hosting bill.",
  },
  {
    q: "Can you redesign or rebuild my existing site?",
    a: "Yes, and we usually recommend it over trying to patch what is there. Most existing sites have foundational problems — slow code, no schema, unclear messaging — that are faster to fix from scratch than to retrofit.",
  },
  {
    q: "What if I do not see results in 90 days?",
    a: "On the Growth plan, the rank-or-refund guarantee kicks in (see above). Across every plan, if the site is built right and the data says something is not working, we change it. We chase results, not invoices.",
  },
  {
    q: "Do you work with clients outside of Idaho?",
    a: "Absolutely. We are based in Idaho but our clients are everywhere — local landscape lighting in Sandpoint, wholesale botanicals shipping nationwide, bookkeeping services. The work is remote-friendly by design.",
  },
  {
    q: "How is this different from a $20/month Squarespace or Wix site?",
    a: "Two ways: design and leverage. Template builders give you the same drag-and-drop layout 50,000 other businesses are using — Google sees right through it. Our sites are custom-coded for speed, SEO, and conversion, then paired with the option to add AI leverage (chatbots, automations, lead routing) that template platforms simply cannot do.",
  },
  {
    q: "What happens on the free discovery call?",
    a: "30 minutes to learn your business, your goals, and your bottlenecks. A few days later we come back with a custom deck mapping the recommended build and the price. You decide from there — no pressure, no templated solutions.",
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
        <div className="max-w-7xl mx-auto px-4 py-0.5 md:px-6 md:py-1 flex items-center justify-between">
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
            <a href="#portfolio" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#web-design" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Web Design
            </a>
            <a href="#ai-services" className="text-sm text-zinc-400 hover:text-white transition-colors">
              AI Services
            </a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Pricing
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
          <a href="#portfolio" className="block text-sm text-zinc-400 hover:text-white transition-colors">Portfolio</a>
          <a href="#web-design" className="block text-sm text-zinc-400 hover:text-white transition-colors">Web Design</a>
          <a href="#ai-services" className="block text-sm text-zinc-400 hover:text-white transition-colors">AI Services</a>
          <a href="#pricing" className="block text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          <a href="#process" className="block text-sm text-zinc-400 hover:text-white transition-colors">Process</a>
          <a href="/blog" className="block text-sm text-zinc-400 hover:text-white transition-colors">Blog</a>
          <a href="#faq" className="block text-sm text-zinc-400 hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="block text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="animate-fade-in-up opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              A Website That Brings You{" "}
              <span className="gradient-text">Customers</span>
            </h1>
            <p className="animate-fade-in-up opacity-0 animate-delay-200 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              We build fast, custom sites engineered to rank locally and turn
              visitors into booked work — not just a pretty brochure that sits
              there. Most builds pay for themselves with a single new customer.
            </p>
            <div className="animate-fade-in-up opacity-0 animate-delay-300 flex flex-col items-center justify-center gap-5">
              <a
                href="#contact"
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white"
              >
                Book Your Free Discovery Call
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  90-day rank-or-refund guarantee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  You own everything
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

        {/* Services Overview */}
        <div id="services" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                What We Do
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Two Ways We Get You{" "}
                <span className="gradient-text">More Customers</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                A website that turns visitors into paying customers, or automation that
                does the busywork for you. Both do the same job — give you back your time
                and grow your revenue.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto reveal">
              {/* Web Design Card */}
              <a
                href="#web-design"
                className="glass service-card rounded-2xl p-10 group cursor-pointer block"
              >
                <div className="w-14 h-14 rounded-xl bg-aurora-cyan/10 flex items-center justify-center mb-6 group-hover:bg-aurora-cyan/20 transition-colors">
                  <svg className="w-7 h-7 text-aurora-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-aurora-cyan transition-colors">
                  Web Design
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  A fast, professional website that turns visitors into paying customers —
                  so the people already searching for what you do call you instead of
                  your competitor.
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-aurora-cyan font-medium">
                  View Services
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>

              {/* AI Services Card */}
              <a
                href="#ai-services"
                className="glass service-card rounded-2xl p-10 group cursor-pointer block"
              >
                <div className="w-14 h-14 rounded-xl bg-aurora-purple/10 flex items-center justify-center mb-6 group-hover:bg-aurora-purple/20 transition-colors">
                  <svg className="w-7 h-7 text-aurora-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-aurora-purple transition-colors">
                  AI Services
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  We automate the repetitive busywork eating your week — follow-ups, data
                  entry, scheduling — so you get hours back and spend them on the work that
                  actually makes you money.
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-aurora-purple font-medium">
                  View Services
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
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
                Real results for real businesses. Here are some of the websites we&apos;ve designed and developed.
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

        {/* Web Design Section */}
        <div id="web-design" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                Web Design
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Websites That{" "}
                <span className="gradient-text">Make an Impact</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Every project is a unique digital experience — meticulously designed,
                expertly developed, and optimized for results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
              {webDesignServices.map((service) => (
                <div
                  key={service.title}
                  className="glass service-card rounded-2xl p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-aurora-cyan/10 flex items-center justify-center mx-auto mb-5 text-aurora-cyan">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-5 pt-5 border-t border-white/5 space-y-2 text-left">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-aurora-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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

        {/* AI Services Section */}
        <div id="ai-services" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-purple tracking-widest uppercase mb-4">
                AI Services
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Automate. Optimize.{" "}
                <span className="gradient-text">Dominate.</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Harness the power of artificial intelligence to supercharge your operations
                and stay ahead of the competition.
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
          </div>
        </section>

        {/* Pricing Section */}
        <div id="pricing" className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <p className="text-sm font-mono text-aurora-pink tracking-widest uppercase mb-4">
                Pricing
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Investments That{" "}
                <span className="gradient-text">Pay You Back</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Three tiers built around the value we create — not the hours we spend.
                Every plan is a system designed to grow your business, not a static brochure.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto reveal">
              {pricingTiers.map((tier) => {
                const accentMap: Record<string, { text: string; bg: string; border: string; ring: string }> = {
                  cyan: {
                    text: "text-aurora-cyan",
                    bg: "bg-aurora-cyan/10",
                    border: "border-aurora-cyan/30",
                    ring: "ring-aurora-cyan/40",
                  },
                  purple: {
                    text: "text-aurora-purple",
                    bg: "bg-aurora-purple/10",
                    border: "border-aurora-purple/40",
                    ring: "ring-aurora-purple/60",
                  },
                  pink: {
                    text: "text-aurora-pink",
                    bg: "bg-aurora-pink/10",
                    border: "border-aurora-pink/30",
                    ring: "ring-aurora-pink/40",
                  },
                };
                const c = accentMap[tier.accent];
                return (
                  <div
                    key={tier.name}
                    className={`relative glass service-card rounded-2xl p-8 md:p-10 flex flex-col ${
                      tier.featured ? `ring-2 ${c.ring} md:scale-105 md:-my-2 z-10` : ""
                    }`}
                  >
                    {tier.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`text-[10px] font-mono tracking-widest uppercase px-4 py-1.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className={`text-2xl font-bold mb-2 ${c.text}`}>{tier.name}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed min-h-[2.5rem]">
                        {tier.tagline}
                      </p>
                    </div>

                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-sm text-zinc-500">$</span>
                        <span className="text-5xl font-bold tracking-tight">{tier.setup}</span>
                        <span className="text-sm text-zinc-500 ml-1">setup</span>
                      </div>
                      <div className="flex items-baseline gap-1 text-zinc-300">
                        <span className="text-sm text-zinc-500">+ $</span>
                        <span className="text-2xl font-semibold">{tier.monthly}</span>
                        <span className="text-sm text-zinc-500">/ month</span>
                      </div>
                    </div>

                    {tier.guarantee && (
                      <div className={`mb-6 px-4 py-3 rounded-xl ${c.bg} border ${c.border} flex items-start gap-2`}>
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                        <span className={`text-xs font-medium ${c.text}`}>{tier.guarantee}</span>
                      </div>
                    )}

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                          <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${c.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className={
                        tier.featured
                          ? "btn-glow text-sm font-medium px-6 py-3.5 rounded-full text-white text-center"
                          : "btn-outline-glow text-sm font-medium px-6 py-3.5 rounded-full text-white text-center"
                      }
                    >
                      Start with {tier.name}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Add-Ons */}
            <div className="mt-20 max-w-4xl mx-auto reveal">
              <div className="text-center mb-10">
                <p className="text-sm font-mono text-aurora-blue tracking-widest uppercase mb-3">
                  Add-Ons
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Stack what you need, when you need it
                </h3>
              </div>
              <div className="glass rounded-2xl p-8 md:p-10">
                <ul className="divide-y divide-white/5">
                  {pricingAddOns.map((addon) => (
                    <li
                      key={addon.label}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4"
                    >
                      <span className="text-zinc-300 text-sm md:text-base">{addon.label}</span>
                      <span className="text-aurora-cyan font-mono text-sm md:text-base font-medium text-right">
                        {addon.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-center text-xs text-zinc-500 mt-6 font-mono tracking-wide">
                Every project starts with a free discovery call. No surprise fees, no scope-creep.
              </p>
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
                  Straight answers on pricing, ownership, timelines, and what
                  actually happens after you say go. No fluff, no fine print.
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

        {/* Disqualification / Fit Check */}
        <div className="section-divider max-w-4xl mx-auto" />
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14 reveal">
              <p className="text-sm font-mono text-aurora-pink tracking-widest uppercase mb-4">
                Honest Fit Check
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                We&apos;re Not for{" "}
                <span className="gradient-text">Everyone</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                We&apos;d rather tell you up front than waste your discovery call.
                Magimatix is probably the wrong fit if&hellip;
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 reveal">
              {[
                {
                  title: "You want the cheapest option",
                  body: "A $500 brochure site exists — we are not it. We build systems that bring in work, and we price for that outcome.",
                },
                {
                  title: "You want a box checked, not a result",
                  body: "If a site that just “looks done” is the goal, we are overkill. We build to rank, capture leads, and feed your phone.",
                },
                {
                  title: "You cannot make a few decisions",
                  body: "We need you reachable for one 30-minute call and a handful of quick calls during the build. No responsiveness, no momentum.",
                },
                {
                  title: "You expect page one overnight",
                  body: "Real local ranking takes the 90-day window we guarantee — not 90 hours. We move fast, but search is earned, not bought.",
                },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-7 flex items-start gap-4">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-aurora-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 reveal">
              <p className="text-zinc-300 text-lg mb-6">
                Still here? Then we should talk.
              </p>
              <a
                href="#contact"
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
              >
                Book Your Free Discovery Call
              </a>
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
              Ready to{" "}
              <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Whether you need a stunning website or intelligent AI automations,
              we&apos;re here to bring your vision to life. Pick a time below for a
              free 30-minute discovery call — no pressure, no templated pitch.
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
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Magimatix"
                  width={200}
                  height={57}
                  className="h-8 md:h-10 w-auto"
                />
              </div>
              <div className="flex items-center gap-8">
                <a href="#web-design" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Web Design
                </a>
                <a href="#ai-services" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  AI Services
                </a>
                <a href="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Blog
                </a>
                <a href="#faq" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  FAQ
                </a>
                <a href="#contact" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
              <p className="text-sm text-zinc-600">
                &copy; 2026 Magimatix LLC. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
