"use client";

// Get DATA. The product is free and open source (Apache-2.0), so the top of this
// page is a straight, unguarded download from GitHub Releases. Payment is optional
// and secondary: a "name your price" tip that supports development, rendered as an
// embedded Stripe Checkout the visitor only sees after they choose an amount.
import { useCallback, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import DownloadPanel from "../thank-you/DownloadPanel";
import { DATA_REPO_URL } from "@/lib/data-release";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

// Preset tip amounts (US dollars). "Custom" lets the supporter type their own.
const PRESETS = [5, 19, 39, 100];

export default function DataGetPage() {
  // Chosen tip in whole dollars, and whether the Stripe form is mounted yet.
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [paying, setPaying] = useState(false);
  // The amount (in cents) locked in when the supporter proceeds to payment.
  const [amount, setAmount] = useState(0);

  const customCents = Math.round(parseFloat(custom || "0") * 100);
  const chosenCents =
    selected != null ? selected * 100 : customCents > 0 ? customCents : 0;
  const canPay = chosenCents >= 100; // Stripe minimum is $1; below that, just download.

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error("Unable to start payment.");
    const data = await res.json();
    return data.clientSecret as string;
  }, [amount]);

  function proceed() {
    if (!canPay) return;
    setAmount(chosenCents);
    setPaying(true);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/data-daemon"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to DATA DAEMON
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1 text-xs font-medium text-emerald-300 mt-6 mb-4">
          Free &amp; open source · Apache-2.0
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Get <span className="gradient-text">DATA DAEMON</span>
        </h1>
        <p className="text-zinc-400 mb-8 max-w-xl">
          Your own self-hosted AI command center. Free to download, free to run,
          and the full source is public. Read every line before you trust it on
          your machine.
        </p>

        {/* Name your price: optional support, up top. */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-8 mb-10">
          <h2 className="text-xl font-semibold mb-1">Name your price</h2>
          <p className="text-sm text-zinc-400 mb-6 max-w-lg">
            DATA is free, always. If it saves you time or you just want to keep
            it getting better, you can chip in whatever it is worth to you. Zero
            is a completely valid answer. The download below is yours either way.
          </p>

          {!paying ? (
            <>
              <div className="flex flex-wrap gap-3 mb-4">
                {PRESETS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelected(amt);
                      setCustom("");
                    }}
                    className={`px-5 py-3 rounded-full text-sm font-semibold border transition-colors ${
                      selected === amt
                        ? "border-white bg-white text-black"
                        : "border-white/15 text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
                <div
                  className={`flex items-center rounded-full border px-4 py-2 transition-colors ${
                    selected == null && custom
                      ? "border-white"
                      : "border-white/15"
                  }`}
                >
                  <span className="text-zinc-400 text-sm mr-1">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="decimal"
                    placeholder="Other"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      setSelected(null);
                    }}
                    className="w-20 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={proceed}
                disabled={!canPay}
                className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {canPay ? `Support with $${(chosenCents / 100).toFixed(0)} →` : "Choose an amount"}
              </button>
              <p className="text-xs text-zinc-500 mt-3">
                Secure payment by Stripe. Minimum $1 to send a tip; the download
                is free regardless.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-zinc-300 mb-4">
                Supporting DATA with{" "}
                <span className="font-semibold text-white">
                  ${(amount / 100).toFixed(0)}
                </span>
                .{" "}
                <button
                  type="button"
                  onClick={() => setPaying(false)}
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  Change amount
                </button>
              </p>
              <div className="rounded-2xl overflow-hidden bg-white p-1">
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ fetchClientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </>
          )}
        </div>

        {/* Free download: no gate, always available. Windows, Mac, and Linux tabs,
            each with its own setup steps (the Mac tab covers the unsigned-app
            Terminal step). */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 mt-10 mb-10">
          <DownloadPanel />
        </div>

        <p className="text-xs text-zinc-500 mt-8 leading-relaxed">
          DATA is experimental, autonomous software provided &ldquo;as is&rdquo;
          under the{" "}
          <Link
            href="/data-daemon/license"
            className="text-zinc-200 underline underline-offset-2 hover:text-white"
          >
            Apache-2.0 license
          </Link>
          . You run it on your own machine at your own risk. Full source:{" "}
          <a
            href={DATA_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 underline underline-offset-2 hover:text-white"
          >
            github.com/huntermixhunter/D.A.T.A
          </a>
        </p>
      </div>
    </main>
  );
}
