// Website contact-form handler.
//
// Accepts a JSON submission from the homepage contact form and emails it to the
// Captain via Resend (same sending identity as every other transactional mail
// on this domain). The submitter's address becomes the reply_to, so replying
// from the inbox goes straight back to them. A hidden honeypot field ("website")
// silently drops obvious bots without telling them why.
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  phone?: string;
  website?: string; // honeypot — real users never fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Pretend success, send nothing.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json(
      { error: "That message is too long. Please shorten it." },
      { status: 422 },
    );
  }

  const result = await sendContactEmail({
    name,
    email,
    message,
    company: (body.company || "").trim().slice(0, 200),
    phone: (body.phone || "").trim().slice(0, 60),
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Could not send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
