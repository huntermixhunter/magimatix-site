// Post-payment thank-you page for a "name your price" contribution. Stripe
// redirects supporters here with a session_id; we verify it to personalize the
// thank-you, but the download is free and always shown either way (the product is
// open source, so nothing is gated behind payment).
import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import DownloadPanel from "./DownloadPanel";

export const runtime = "nodejs";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let paid = false;
  let email: string | null = null;
  let amount: string | null = null;

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
      if (session.amount_total != null) {
        amount = `$${(session.amount_total / 100).toFixed(0)}`;
      }
    } catch {
      paid = false;
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-6">{paid ? "🙏" : "⬇️"}</div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {paid ? "Thank you for supporting DATA!" : "Get DATA"}
        </h1>
        <p className="text-zinc-400 mb-8">
          {paid ? (
            <>
              Your {amount ? `${amount} ` : ""}contribution keeps{" "}
              <span className="gradient-text font-semibold">DATA DAEMON</span>{" "}
              free and getting better.
              {email ? (
                <>
                  {" "}
                  A receipt is on its way to{" "}
                  <span className="text-zinc-200">{email}</span>.
                </>
              ) : null}{" "}
              Grab your download below.
            </>
          ) : (
            <>
              Download{" "}
              <span className="gradient-text font-semibold">DATA DAEMON</span>{" "}
              below — free and open source, yours to run on your own machine.
            </>
          )}
        </p>

        <DownloadPanel />

        <p className="text-xs text-zinc-500 mt-8 leading-relaxed">
          Unzip and open{" "}
          <span className="font-mono text-zinc-300">INSTALL.txt</span> to get
          started. Prefer the source? Everything is on{" "}
          <Link
            href="/data-daemon/checkout"
            className="text-zinc-300 underline underline-offset-2 hover:text-white"
          >
            the get page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
