// Creates an embedded Stripe Checkout Session for the DATA Dashboard product.
// Returns the session client_secret, which the on-page <EmbeddedCheckout/>
// component mounts. The buyer never leaves magimatix.com.
import { NextResponse } from "next/server";
import { getStripe, DATA_PRICE_ID, AUTOMATIC_TAX } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!DATA_PRICE_ID) {
    return NextResponse.json(
      { error: "Product price is not configured." },
      { status: 500 },
    );
  }

  try {
    const origin =
      request.headers.get("origin") ?? new URL(request.url).origin;

    const session = await getStripe().checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: [{ price: DATA_PRICE_ID, quantity: 1 }],
      // After payment, Stripe sends the buyer back to this page; we verify the
      // session there and reveal the download.
      return_url: `${origin}/data-daemon/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      // Capture the email and create a customer for the receipt + records.
      customer_creation: "always",
      automatic_tax: { enabled: AUTOMATIC_TAX },
      // Let buyers apply discount codes if you create any in Stripe.
      allow_promotion_codes: true,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("[checkout] failed to create session:", err);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
