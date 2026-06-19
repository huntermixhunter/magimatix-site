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
          ← Back to DATA
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-6 mb-2">
          Checkout — <span className="gradient-text">DATA</span> Dashboard
        </h1>
        <p className="text-zinc-400 mb-10">
          One-time purchase. Self-hosted. Runs on your own machine.
        </p>

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
