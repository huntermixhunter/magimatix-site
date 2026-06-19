// Gated download for the DATA Dashboard.
//
// There is no license system in the product (it runs fully local), so the only
// thing protecting the file is proof of a paid Stripe session. We re-verify the
// session against Stripe on every request — no database, no shareable token
// that outlives a refund check.
//
// The file lives on Vercel Blob at an unguessable but technically-public URL.
// To avoid leaking that URL to buyers (which would let them re-share it
// forever), we never redirect to it — we fetch it server-side and stream the
// bytes back through this route. DATA_DOWNLOAD_URL is a server-only env var and
// never reaches the browser.
import { NextResponse } from "next/server";
import { getStripe, DATA_DOWNLOAD_URL } from "@/lib/stripe";

export const runtime = "nodejs";

const DOWNLOAD_FILENAME = "DATA-Dashboard.zip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return new NextResponse("Missing session_id.", { status: 400 });
  }
  if (!DATA_DOWNLOAD_URL) {
    return new NextResponse("Download is not configured yet.", {
      status: 500,
    });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return new NextResponse("Payment not completed for this session.", {
        status: 403,
      });
    }

    const upstream = await fetch(DATA_DOWNLOAD_URL);
    if (!upstream.ok || !upstream.body) {
      console.error(
        "[download] failed to fetch blob:",
        upstream.status,
        upstream.statusText,
      );
      return new NextResponse("Download temporarily unavailable.", {
        status: 502,
      });
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_FILENAME}"`,
        ...(upstream.headers.get("content-length")
          ? { "Content-Length": upstream.headers.get("content-length")! }
          : {}),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[download] session verification failed:", err);
    return new NextResponse("Invalid or expired session.", { status: 400 });
  }
}
