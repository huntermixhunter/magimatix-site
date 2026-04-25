"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

const webDesignServices = [
  {
    title: "Custom Websites",
    description:
      "Bespoke, hand-crafted websites built from the ground up to reflect your brand identity and convert visitors into customers.",
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
      "Eliminate repetitive tasks with intelligent AI workflows. From data processing to customer communications, we automate it all.",
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
    description: "We learn your business, goals, and audience to craft a tailored strategy.",
  },
  {
    step: "02",
    title: "Design",
    description: "Concepts and prototypes refined until the vision is pixel-perfect.",
  },
  {
    step: "03",
    title: "Build",
    description: "Clean, performant code brought to life with modern frameworks.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description: "Deployed, optimized, and continuously improved as your business grows.",
  },
];

export default function Home() {
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

  const [formState, handleSubmit] = useForm("xlgavrod");

  return (
    <>
      {/* Background Video */}
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40 z-[1] pointer-events-none" />

      {/* Navigation */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Auramatix"
              width={140}
              height={40}
              className="h-16 w-auto"
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
            <a href="#process" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Process
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
        <div id="mobile-menu" className="hidden md:hidden px-6 pb-4 space-y-3">
          <a href="#portfolio" className="block text-sm text-zinc-400 hover:text-white transition-colors">Portfolio</a>
          <a href="#web-design" className="block text-sm text-zinc-400 hover:text-white transition-colors">Web Design</a>
          <a href="#ai-services" className="block text-sm text-zinc-400 hover:text-white transition-colors">AI Services</a>
          <a href="#process" className="block text-sm text-zinc-400 hover:text-white transition-colors">Process</a>
          <a href="#contact" className="block text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="animate-fade-in-up opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Where Design Meets{" "}
              <span className="gradient-text">Intelligence</span>
            </h1>
            <p className="animate-fade-in-up opacity-0 animate-delay-200 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              We craft premium digital experiences and intelligent AI automations
              that elevate your brand and streamline your business.
            </p>
            <div className="animate-fade-in-up opacity-0 animate-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#services"
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="btn-outline-glow text-base font-medium px-8 py-4 rounded-full text-white"
              >
                Start a Project
              </a>
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
        <section id="services" className="py-32 relative">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal">
              <p className="text-sm font-mono text-aurora-cyan tracking-widest uppercase mb-4">
                What We Do
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Two Pillars of{" "}
                <span className="gradient-text">Digital Excellence</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Whether you need a stunning digital presence or intelligent automation,
                we deliver solutions that set you apart.
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
                  Beautiful, responsive websites engineered for performance and built to convert.
                  From concept to launch, every pixel is intentional.
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
                  Intelligent automations and AI-powered solutions that save time,
                  reduce costs, and unlock new possibilities for your business.
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
        <section id="portfolio" className="py-32 relative">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
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
                  title: "Elixir Keys",
                  description: "Premium wholesale botanicals brand. Rich, organic aesthetic with a luxurious dark-green palette.",
                  image: "/portfolio-elixirkeys.jpg",
                  url: "https://elixirkeys.com/",
                  tags: ["Web Design", "E-Commerce"],
                },
                {
                  title: "TrueSum",
                  description: "Precision bookkeeping service. Clean, modern design with warm earth tones and professional feel.",
                  image: "/portfolio-truesum.jpg",
                  url: "https://truesum.vercel.app/",
                  tags: ["Web Design", "SaaS"],
                },
                {
                  title: "Selkirk Sprinklers",
                  description: "Local sprinkler system specialists. Bold, trustworthy design with strong calls to action.",
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

        {/* Web Design Section */}
        <section id="web-design" className="py-32 relative">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Services Section */}
        <section id="ai-services" className="py-32 relative">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-32 relative">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
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

        {/* CTA / Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
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
              we&apos;re here to bring your vision to life. Let&apos;s start a conversation.
            </p>

            <div className="glass-strong rounded-2xl p-10 md:p-14 max-w-2xl mx-auto">
              {formState.succeeded ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-aurora-green/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-aurora-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-zinc-400">Thank you for reaching out. We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-aurora-blue/50 focus:ring-1 focus:ring-aurora-blue/30 transition-all"
                      />
                      <ValidationError field="name" errors={formState.errors} className="text-red-400 text-sm mt-1" />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-aurora-blue/50 focus:ring-1 focus:ring-aurora-blue/30 transition-all"
                      />
                      <ValidationError field="email" errors={formState.errors} className="text-red-400 text-sm mt-1" />
                    </div>
                  </div>
                  <select
                    name="service"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-zinc-400 focus:outline-none focus:border-aurora-blue/50 focus:ring-1 focus:ring-aurora-blue/30 transition-all appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      What are you interested in?
                    </option>
                    <option value="web-design">Web Design</option>
                    <option value="ai-services">AI Services</option>
                    <option value="both">Both</option>
                  </select>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-aurora-blue/50 focus:ring-1 focus:ring-aurora-blue/30 transition-all resize-none"
                    />
                    <ValidationError field="message" errors={formState.errors} className="text-red-400 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="btn-glow w-full text-base font-medium px-8 py-4 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Auramatix"
                  width={120}
                  height={34}
                  className="h-6 w-auto"
                />
              </div>
              <div className="flex items-center gap-8">
                <a href="#web-design" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Web Design
                </a>
                <a href="#ai-services" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  AI Services
                </a>
                <a href="#contact" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
              <p className="text-sm text-zinc-600">
                &copy; 2026 Auramatix. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
