// Transactional email via Resend (HTTPS API, no SDK dependency).
//
// The DATA Daemon sends one kind of email today: the post-purchase download
// link. We deliberately do NOT email the raw Blob URL. Instead we email a link
// back to the thank-you page (/data-daemon/thank-you?session_id=...), which
// re-verifies the Stripe session on every load before revealing the download.
// That keeps the same "proof of paid session" gate as the on-page flow, and the
// link keeps working from the buyer's inbox as long as the payment stands.
//
// Sending identity: the verified Resend domain is send.magimatix.com. The API
// key must belong to the SAME Resend account that domain is verified on, or
// Resend silently refuses and nothing is delivered.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Default from-address uses the verified sending subdomain. Override with
// RESEND_FROM if you want a different display name / mailbox.
const DEFAULT_FROM = "DATA Daemon <daemon@send.magimatix.com>";

// Canonical site origin for building buyer-facing links. Overridable so preview
// deployments can point links at themselves.
const SITE_URL = (process.env.SITE_URL || "https://magimatix.com").replace(
  /\/+$/,
  "",
);

type SendResult = { ok: boolean; id?: string; error?: string };

/**
 * Low-level Resend send. Never throws — returns {ok:false, error} on failure so
 * callers (e.g. the Stripe webhook) can log and still return 2xx.
 */
async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY is not configured — skipping send.");
    return { ok: false, error: "no_api_key" };
  }
  const from = process.env.RESEND_FROM || DEFAULT_FROM;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        ...(opts.replyTo || process.env.RESEND_REPLY_TO
          ? { reply_to: opts.replyTo || process.env.RESEND_REPLY_TO }
          : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[email] Resend rejected send:", res.status, detail);
      return { ok: false, error: `resend_${res.status}` };
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    console.error("[email] Resend request failed:", err);
    return { ok: false, error: "request_failed" };
  }
}

/**
 * Send (or re-send) the DATA Daemon download link to a buyer.
 * `sessionId` is the paid Stripe Checkout session; the link routes back through
 * the session-gated thank-you page.
 */
export async function sendDownloadEmail(params: {
  to: string;
  sessionId: string;
}): Promise<SendResult> {
  const link = `${SITE_URL}/data-daemon/thank-you?session_id=${encodeURIComponent(
    params.sessionId,
  )}`;

  const subject = "Your DATA DAEMON download is ready";

  const text = [
    "Thank you for your purchase of DATA DAEMON.",
    "",
    "Download it here (works on Windows, macOS, and Linux):",
    link,
    "",
    "This link re-checks your purchase each time, so keep this email — you can",
    "use it again to re-download on any of your machines.",
    "",
    "Unzip and open INSTALL.txt to get started.",
    "",
    "— Magimatix",
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#121218;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <tr><td style="padding:36px 36px 8px 36px;">
            <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8b8b9a;">Magimatix</p>
            <h1 style="margin:0 0 16px 0;font-size:24px;line-height:1.25;color:#ffffff;">Your DATA&nbsp;DAEMON download is ready</h1>
            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#c4c4cf;">
              Thank you for your purchase. Click below to download DATA&nbsp;DAEMON — it works on Windows, macOS, and Linux.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
              <tr><td style="border-radius:999px;background:linear-gradient(90deg,#7c3aed,#ec4899);">
                <a href="${link}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">Download DATA&nbsp;DAEMON &darr;</a>
              </td></tr>
            </table>
            <p style="margin:0 0 24px 0;font-size:13px;line-height:1.6;color:#8b8b9a;">
              Keep this email — the link re-checks your purchase each time, so you can re-download on any of your machines. Unzip and open <span style="font-family:monospace;color:#c4c4cf;">INSTALL.txt</span> to get started.
            </p>
            <p style="margin:0;font-size:12px;line-height:1.6;color:#6b6b78;word-break:break-all;">
              If the button does not work, paste this link into your browser:<br />${link}
            </p>
          </td></tr>
          <tr><td style="padding:20px 36px 32px 36px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#6b6b78;">Sent by Magimatix &middot; magimatix.com</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return sendEmail({ to: params.to, subject, html, text });
}

/**
 * Notify the seller (the Captain) that a sale just happened, and who bought it.
 * Recipient is SALE_NOTIFY_TO (fall back to the known owner inbox). Never throws.
 * A failure here must never affect the 200 we owe Stripe.
 */
export async function sendSaleNotification(params: {
  buyerEmail: string | null;
  sessionId: string;
  amountTotal?: number | null; // in the smallest currency unit (e.g. cents)
  currency?: string | null;
}): Promise<SendResult> {
  const to =
    process.env.SALE_NOTIFY_TO ||
    process.env.RESEND_REPLY_TO ||
    "hunterthomasmix@gmail.com";

  const amount =
    params.amountTotal != null
      ? `${(params.amountTotal / 100).toFixed(2)} ${(params.currency || "usd").toUpperCase()}`
      : "unknown amount";
  const buyer = params.buyerEmail || "(no email on session)";
  const dash = `https://dashboard.stripe.com/payments`;

  const subject = `New DATA DAEMON sale — ${buyer}`;

  const text = [
    "New DATA DAEMON purchase.",
    "",
    `Buyer:    ${buyer}`,
    `Amount:   ${amount}`,
    `Session:  ${params.sessionId}`,
    "",
    `Stripe:   ${dash}`,
    "",
    "— DATA",
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#121218;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <tr><td style="padding:32px 34px 8px 34px;">
            <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8b8b9a;">DATA DAEMON &middot; New sale</p>
            <h1 style="margin:0 0 18px 0;font-size:24px;line-height:1.25;color:#ffffff;">${amount}</h1>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:1.7;color:#c4c4cf;">
              <tr><td style="color:#8b8b9a;padding-right:12px;">Buyer</td><td style="color:#ffffff;">${buyer}</td></tr>
              <tr><td style="color:#8b8b9a;padding-right:12px;">Amount</td><td style="color:#ffffff;">${amount}</td></tr>
              <tr><td style="color:#8b8b9a;padding-right:12px;vertical-align:top;">Session</td><td style="color:#c4c4cf;font-family:monospace;font-size:12px;word-break:break-all;">${params.sessionId}</td></tr>
            </table>
            <p style="margin:22px 0 0 0;font-size:13px;line-height:1.6;">
              <a href="${dash}" style="color:#ec4899;text-decoration:none;">Open Stripe payments &rarr;</a>
            </p>
          </td></tr>
          <tr><td style="padding:20px 34px 30px 34px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#6b6b78;">Automated notice &middot; magimatix.com</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return sendEmail({ to, subject, html, text });
}

/**
 * Escape a user-supplied string before dropping it into an HTML email body,
 * so a submitter cannot inject markup into the message we send ourselves.
 */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Deliver a website contact-form submission to the Captain's inbox. The
 * submitter's own address is set as reply_to so replying from the inbox goes
 * straight back to them. Never throws — returns {ok:false} on failure so the
 * route can surface a clean error.
 */
export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}): Promise<SendResult> {
  const to =
    process.env.CONTACT_NOTIFY_TO ||
    process.env.SALE_NOTIFY_TO ||
    process.env.RESEND_REPLY_TO ||
    "hunterthomasmix@gmail.com";

  const name = params.name.trim();
  const email = params.email.trim();
  const message = params.message.trim();
  const company = (params.company || "").trim();
  const phone = (params.phone || "").trim();

  const subject = `New Magimatix inquiry — ${name}`;

  const textRows = [
    "New contact-form submission from magimatix.com.",
    "",
    `Name:     ${name}`,
    `Email:    ${email}`,
    ...(company ? [`Company:  ${company}`] : []),
    ...(phone ? [`Phone:    ${phone}`] : []),
    "",
    "Message:",
    message,
    "",
    "— Magimatix",
  ];
  const text = textRows.join("\n");

  const eName = escapeHtml(name);
  const eEmail = escapeHtml(email);
  const eCompany = escapeHtml(company);
  const ePhone = escapeHtml(phone);
  const eMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#121218;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <tr><td style="padding:32px 34px 8px 34px;">
            <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8b8b9a;">Magimatix &middot; New inquiry</p>
            <h1 style="margin:0 0 18px 0;font-size:22px;line-height:1.25;color:#ffffff;">${eName}</h1>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:1.7;color:#c4c4cf;">
              <tr><td style="color:#8b8b9a;padding-right:12px;">Email</td><td style="color:#ffffff;"><a href="mailto:${eEmail}" style="color:#ec4899;text-decoration:none;">${eEmail}</a></td></tr>
              ${company ? `<tr><td style="color:#8b8b9a;padding-right:12px;">Company</td><td style="color:#ffffff;">${eCompany}</td></tr>` : ""}
              ${phone ? `<tr><td style="color:#8b8b9a;padding-right:12px;">Phone</td><td style="color:#ffffff;">${ePhone}</td></tr>` : ""}
            </table>
            <p style="margin:22px 0 6px 0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8b8b9a;">Message</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#e4e4ef;">${eMessage}</p>
          </td></tr>
          <tr><td style="padding:20px 34px 30px 34px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#6b6b78;">Reply directly to this email to respond &middot; magimatix.com</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return sendEmail({ to, subject, html, text, replyTo: email });
}
