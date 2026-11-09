// In-memory stand-ins for src/lib/stripe.ts and src/lib/email.ts, used only by
// scripts/stripe-product.test.mjs. Nothing here touches the network and no
// email is ever sent: Stripe lookups read a Map, and "sent" emails land in an array.
import Stripe from "stripe";

// A real Stripe instance, used only for its webhook signature helpers (local
// crypto). The key is a placeholder and no request is ever made with it.
const signer = new Stripe("sk_test_placeholder_never_used");

export const stripeState = { sessions: new Map(), created: [] };
export const mailbox = { download: [], sale: [] };

export function resetFakes() {
  stripeState.sessions.clear();
  stripeState.created.length = 0;
  mailbox.download.length = 0;
  mailbox.sale.length = 0;
}

// Same shape the routes use: getStripe().webhooks and getStripe().checkout.sessions.
export function getStripe() {
  return {
    webhooks: signer.webhooks,
    checkout: {
      sessions: {
        async retrieve(id) {
          const session = stripeState.sessions.get(id);
          if (!session) throw new Error(`No such checkout.session: '${id}'`);
          return structuredClone(session);
        },
        async create(params) {
          stripeState.created.push(structuredClone(params));
          return {
            id: `cs_test_created_${stripeState.created.length}`,
            client_secret: "cs_test_client_secret_placeholder",
          };
        },
      },
    },
  };
}

export const AUTOMATIC_TAX = false;

export async function sendDownloadEmail(params) {
  mailbox.download.push(params);
  return { ok: true, id: "email_fake" };
}

export async function sendSaleNotification(params) {
  mailbox.sale.push(params);
  return { ok: true, id: "email_fake" };
}

// A webhook body plus the Stripe-Signature header Stripe would send with it.
export function signedWebhook(event, secret) {
  const payload = JSON.stringify(event);
  const header = signer.webhooks.generateTestHeaderString({ payload, secret });
  return { payload, header };
}
