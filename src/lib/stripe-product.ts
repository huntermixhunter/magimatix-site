// Which Stripe Checkout sessions belong to DATA DAEMON.
//
// The Stripe account is shared with Auramaxxing (auramaxxingacademy.com). Stripe
// sends every checkout on the account to this site's webhook, and a session id
// from any of those sales can also be handed to the thank-you page or the
// "email me the link" route. So every route that acts on a session checks it
// here first: only DATA checkouts get the thank-you email, the sale notice, or
// the personalized thank-you page.
//
// New checkouts carry metadata.product = DATA_PRODUCT, written by
// src/app/api/checkout/route.ts. Session metadata is set server-side with the
// secret key, so a buyer cannot add or change it.
//
// Checkouts created before the tag existed (everything through November 2026)
// carry no product tag. Those are recognized by the page Stripe returns the
// buyer to, which only this site's checkout route sets. A session that carries
// any product tag is judged by the tag alone.
//
// The value is a contract with every tagged session Stripe stores: never change it.
export const DATA_PRODUCT = "data-daemon";

const DATA_RETURN_PATH = "/data-daemon/thank-you";

export type CheckoutSessionLike = {
  metadata?: Record<string, string> | null;
  return_url?: string | null;
};

export function isDataCheckout(
  session: CheckoutSessionLike | null | undefined,
): boolean {
  if (!session) return false;
  const product = session.metadata?.product;
  if (product) return product === DATA_PRODUCT;
  return returnsToDataThankYou(session.return_url);
}

function returnsToDataThankYou(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url).pathname.replace(/\/+$/, "") === DATA_RETURN_PATH;
  } catch {
    return false;
  }
}
