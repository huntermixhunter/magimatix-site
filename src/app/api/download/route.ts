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
import {
  getStripe,
  DATA_DOWNLOAD_URL,
  DATA_INSTALLER_URL,
} from "@/lib/stripe";

export const runtime = "nodejs";

// Two delivery formats. The cross-platform .zip is the default and works
// everywhere (Windows / macOS / Linux). The Windows one-click installer (.exe)
// is offered as an alternative for Windows buyers via ?format=installer.
const FORMATS = {
  zip: {
    url: () => DATA_DOWNLOAD_URL,
    filename: "DATA-Daemon.zip",
    contentType: "application/zip",
  },
  installer: {
    url: () => DATA_INSTALLER_URL,
    filename: "DATA-Daemon-Setup.exe",
    contentType: "application/octet-stream",
  },
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const format =
    searchParams.get("format") === "installer"
      ? FORMATS.installer
      : FORMATS.zip;

  if (!sessionId) {
    return new NextResponse("Missing session_id.", { status: 400 });
  }
  const fileUrl = format.url();
  if (!fileUrl) {
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

    const upstream = await fetch(fileUrl);
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
        "Content-Type": format.contentType,
        "Content-Disposition": `attachment; filename="${format.filename}"`,
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
