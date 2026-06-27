// Server-side Stripe client + product configuration.
//
// All values come from environment variables so no secrets live in the repo.
// See .env.example for the full list. The client is constructed lazily on first
// use (not at module import) so `next build` does not crash when the secret key
// is absent — the SDK constructor throws on an empty key.
import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  _stripe = new Stripe(key);
  return _stripe;
}

// The Stripe Price ID for the DATA Dashboard product (created in the Stripe
// dashboard or via the API). e.g. "price_1Q...".
export const DATA_PRICE_ID = process.env.STRIPE_DATA_PRICE_ID ?? "";

// Absolute URL to the purchasable download (Vercel Blob). The /api/download
// route streams from here only after verifying the buyer's session is paid.
// This is the cross-platform .zip — works on Windows, macOS, and Linux.
export const DATA_DOWNLOAD_URL = process.env.DATA_DOWNLOAD_URL ?? "";

// Absolute URL to the Windows one-click installer (.exe) on Vercel Blob.
// Served by /api/download?format=installer for Windows buyers who want the
// guided setup instead of the zip. macOS/Linux buyers use the zip above.
export const DATA_INSTALLER_URL = process.env.DATA_INSTALLER_URL ?? "";

// Enable Stripe Tax automatic calculation. Leave "false" until Stripe Tax is
// configured with tax registrations, otherwise checkout session creation fails.
export const AUTOMATIC_TAX = process.env.STRIPE_AUTOMATIC_TAX === "true";
