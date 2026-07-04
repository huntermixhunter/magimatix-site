// Post-payment fulfillment page. Stripe redirects the buyer here with a
// session_id. We verify the session is genuinely paid (server-side, against
// Stripe) and only then reveal the download link. This is the primary delivery
// path — it does not depend on the webhook.
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

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
    } catch {
      paid = false;
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {paid ? (
          <>
            <div className="text-5xl mb-6">✅</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Thank you for your purchase!
            </h1>
            <p className="text-zinc-400 mb-8">
              Your copy of <span className="gradient-text font-semibold">DATA DAEMON</span>{" "}
              is ready. Click below to download.
              {email ? (
                <>
                  {" "}
                  We&apos;ve also emailed the download link to{" "}
                  <span className="text-zinc-200">{email}</span>.
                </>
              ) : null}
            </p>

            <DownloadPanel sessionId={sessionId!} />

            <p className="text-xs text-zinc-500 mt-8 leading-relaxed">
              Keep this page or your receipt — the download link works again from
              your receipt&apos;s confirmation. Unzip and open{" "}
              <span className="font-mono text-zinc-300">INSTALL.txt</span> to get
              started.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              We couldn&apos;t confirm your payment
            </h1>
            <p className="text-zinc-400 mb-8">
              If you were charged, please contact us and we&apos;ll sort it out
              right away. Otherwise you can try again.
            </p>
            <Link
              href="/data-daemon/checkout"
              className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block"
            >
              Back to checkout
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
