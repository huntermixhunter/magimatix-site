"use client";

// Contact form — posts to /api/contact, which emails us through Resend.
// Lifted verbatim out of the old homepage so /contact owns it now.

import { useState } from "react";

export default function ContactForm() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // honeypot — hidden from real users
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setContact({ name: "", email: "", company: "", message: "", website: "" });
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-aurora-green/30 bg-aurora-green/5 p-6 text-center">
        <p className="text-aurora-green font-medium mb-1">Message sent.</p>
        <p className="text-zinc-400 text-sm">
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
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
          <label htmlFor="contact-name" className="block text-sm text-zinc-300 mb-2">
            Name <span className="text-aurora-pink">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={contact.name}
            onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm text-zinc-300 mb-2">
            Email <span className="text-aurora-pink">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={contact.email}
            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="block text-sm text-zinc-300 mb-2">
          Company <span className="text-zinc-500 font-normal">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          value={contact.company}
          onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors"
          placeholder="Your business"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm text-zinc-300 mb-2">
          Message <span className="text-aurora-pink">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={contact.message}
          onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-aurora-cyan/60 focus:ring-1 focus:ring-aurora-cyan/40 transition-colors resize-y"
          placeholder="What are you trying to build, and what would a win look like?"
        />
      </div>

      {status === "error" && <p className="text-sm text-aurora-pink">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
