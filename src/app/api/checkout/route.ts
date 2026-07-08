// Creates an embedded Stripe Checkout Session for a "name your price" tip that
// supports DATA development. The product itself is free and open source — this
// endpoint never gates a download; it only charges the amount the supporter chose.
// Returns the session client_secret, which the on-page <EmbeddedCheckout/> mounts.
import { NextResponse } from "next/server";
import { getStripe, AUTOMATIC_TAX } from "@/lib/stripe";

export const runtime = "nodejs";

// Stripe minimum charge is $1; cap a single tip at $2,000 as a sanity bound.
const MIN_CENTS = 100;
const MAX_CENTS = 200_000;

export async function POST(request: Request) {
  let amount = 0;
  try {
    const body = (await request.json()) as { amount?: unknown };
    amount = Math.round(Number(body?.amount) || 0);
  } catch {
    amount = 0;
  }

  if (!Number.isFinite(amount) || amount < MIN_CENTS || amount > MAX_CENTS) {
    return NextResponse.json(
      { error: "Please choose an amount between $1 and $2,000." },
      { status: 400 },
    );
  }

  try {
    const origin =
      request.headers.get("origin") ?? new URL(request.url).origin;

    const session = await getStripe().checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: "Support DATA development",
              description:
                "A pay-what-you-want contribution to DATA DAEMON, the free and open-source AI command center.",
            },
          },
        },
      ],
      // After payment, Stripe sends the supporter back to the thank-you page.
      return_url: `${origin}/data-daemon/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      customer_creation: "always",
      automatic_tax: { enabled: AUTOMATIC_TAX },
      allow_promotion_codes: true,
      submit_type: "donate",
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("[checkout] failed to create session:", err);
    return NextResponse.json(
      { error: "Unable to start payment. Please try again." },
      { status: 500 },
    );
  }
}
