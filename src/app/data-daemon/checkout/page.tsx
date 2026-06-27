"use client";

// Embedded Stripe Checkout for the DATA Dashboard. The payment form is rendered
// inline (Stripe iframe) on magimatix.com — the buyer never leaves the site.
import { useCallback } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export default function DataCheckoutPage() {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    if (!res.ok) {
      throw new Error("Unable to start checkout.");
    }
    const data = await res.json();
    return data.clientSecret as string;
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/#data"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to DATA DAEMON
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-6 mb-2">
          Checkout — <span className="gradient-text">DATA DAEMON</span> Dashboard
        </h1>
        <p className="text-zinc-400 mb-6">
          One-time purchase. Self-hosted. Runs on your own machine.
        </p>

        <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 mb-10">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 5.7 10.5 4.6v7.1H3V5.7Zm0 12.6 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.7h-9.5v6.8Zm0-15.4v6.9H21V3l-9.5 1.1Z" />
          </svg>
          <p className="text-sm text-zinc-300 leading-relaxed">
            <span className="font-semibold text-white">Windows 10 / 11 only.</span>{" "}
            DATA DAEMON does not yet run on macOS or Linux — a macOS version is coming soon.
            Please make sure you are on Windows before purchasing.
          </p>
        </div>

        {/* Stripe renders its own (light) form inside this card */}
        <div className="rounded-2xl overflow-hidden bg-white p-1">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

        <p className="text-xs text-zinc-500 mt-6 font-mono tracking-wide text-center">
          Payments secured by Stripe · You will get an instant download after
          payment
        </p>
      </div>
    </main>
  );
}
