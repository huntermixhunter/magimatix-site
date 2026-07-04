// Gated download for the DATA Dashboard.
//
// There is no license system in the product (it runs fully local), so the only
// thing protecting the file is proof of a paid Stripe session. We re-verify the
// session against Stripe on every request — no database, no shareable token
// that outlives a refund check.
//
// The file lives on Vercel Blob at an unguessable but technically-public URL.
// DATA_DOWNLOAD_URL / DATA_INSTALLER_URL are server-only env vars.
//
// Delivery strategy depends on size:
//   • zip (~23 MB): streamed server-side through this route so the blob URL is
//     never exposed to the buyer. Comfortably finishes inside the function
//     window.
//   • installer .exe (~50 MB, voice stack baked in): streaming this through the
//     serverless function risks the function being killed mid-stream on slower
//     connections, which truncates the file and produces Inno Setup's "setup
//     files are corrupted" error at the buyer's end. So after verifying the paid
//     Stripe session we 302-redirect to the blob CDN, which handles arbitrary
//     file sizes with proper range support. The redirect target is gated at
//     request time by the Stripe check; the unguessable URL is acceptable
//     exposure for a one-shot download link.
import { NextResponse } from "next/server";
import {
  getStripe,
  DATA_DOWNLOAD_URL,
  DATA_INSTALLER_URL,
  DATA_DMG_URL,
} from "@/lib/stripe";

export const runtime = "nodejs";
// Safety net for the streamed zip path: allow the function to run long enough to
// finish a slow transfer instead of being cut off mid-stream.
export const maxDuration = 300;

// Three delivery formats. The cross-platform .zip is the default and works
// everywhere (Windows / macOS / Linux). The Windows one-click installer (.exe)
// is offered via ?format=installer, and the macOS disk image (.dmg) via
// ?format=dmg.
const FORMATS = {
  zip: {
    url: () => DATA_DOWNLOAD_URL,
    filename: "DATA-Daemon.zip",
    contentType: "application/zip",
    redirect: false,
  },
  installer: {
    url: () => DATA_INSTALLER_URL,
    filename: "DATA-Daemon-Setup.exe",
    contentType: "application/octet-stream",
    // Too large to safely stream through the function — hand off to the CDN.
    redirect: true,
  },
  dmg: {
    url: () => DATA_DMG_URL,
    filename: "DATA-Daemon.dmg",
    contentType: "application/x-apple-diskimage",
    // ~20 MB — small enough to stream through the function like the zip,
    // keeping the blob URL hidden.
    redirect: false,
  },
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const formatParam = searchParams.get("format");
  const format =
    formatParam === "installer"
      ? FORMATS.installer
      : formatParam === "dmg"
        ? FORMATS.dmg
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

    // Large installer: hand the transfer to the blob CDN rather than streaming
    // it through this function (which can truncate the file → "setup files are
    // corrupted"). The Stripe check above is the gate; the redirect is one-shot.
    if (format.redirect) {
      return NextResponse.redirect(fileUrl, {
        status: 302,
        headers: { "Cache-Control": "no-store" },
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
