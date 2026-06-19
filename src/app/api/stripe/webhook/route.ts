// Stripe webhook endpoint.
//
// Fulfillment (showing the download) happens synchronously on the thank-you
// page after Stripe redirects the buyer back, so delivery never depends on
// webhook timing. This endpoint exists for durable record-keeping and as the
// hook point for future automation (e.g. emailing the download link, syncing a
// customer list). It verifies the Stripe signature before trusting anything.
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text(); // raw body required for signature check
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return new Response("Missing signature or webhook secret.", {
      status: 400,
    });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return new Response("Webhook signature verification failed.", {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        "[webhook] DATA purchase completed:",
        session.id,
        session.customer_details?.email ?? "(no email)",
      );
      // Future: send download email, add to mailing list, etc.
      break;
    }
    default:
      // Other event types are ignored.
      break;
  }

  return Response.json({ received: true });
}
