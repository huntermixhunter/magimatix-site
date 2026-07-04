// On-demand re-send of the DATA Daemon download link.
//
// The webhook already emails the link automatically after purchase. This route
// backs the "email me the link" button on the thank-you page for buyers who
// want it sent (again) — e.g. they closed the receipt, or want it on the
// machine they'll install on. Same security model as everything else: we
// re-verify the Stripe session is genuinely paid before sending, and we only
// ever send to the email Stripe has on that session (never a caller-supplied
// address), so this can't be abused to spam arbitrary inboxes.
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendDownloadEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let sessionId: string | undefined;
  try {
    const body = (await request.json()) as { session_id?: string };
    sessionId = body.session_id;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed for this session." },
        { status: 403 },
      );
    }
    const email = session.customer_details?.email;
    if (!email) {
      return NextResponse.json(
        { error: "No email on this purchase." },
        { status: 422 },
      );
    }

    const result = await sendDownloadEmail({ to: email, sessionId: session.id });
    if (!result.ok) {
      return NextResponse.json(
        { error: "Could not send the email. Please try again." },
        { status: 502 },
      );
    }

    // Return a masked address so the UI can confirm where it went without
    // exposing the full email in a client response.
    const [local, domain] = email.split("@");
    const masked =
      local.length <= 2
        ? `${local[0] ?? ""}***@${domain ?? ""}`
        : `${local.slice(0, 2)}***@${domain ?? ""}`;

    return NextResponse.json({ ok: true, sentTo: masked });
  } catch (err) {
    console.error("[email-download] failed:", err);
    return NextResponse.json(
      { error: "Invalid or expired session." },
      { status: 400 },
    );
  }
}
