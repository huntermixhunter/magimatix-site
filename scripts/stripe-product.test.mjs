// Guards the DATA product check on the Stripe account Magimatix shares with
// Auramaxxing. Stripe sends every checkout on that account to this site's
// webhook, so only DATA checkouts may ever get the DATA thank-you email, the
// sale notice, or the personalized thank-you page.
//
// Run with: node --test scripts/stripe-product.test.mjs
// (Node 22.18 or later: the routes are TypeScript and load through Node's
// built-in type stripping.)
//
// The real route handlers run with the Stripe client and the Resend mailer
// swapped for in-memory fakes (scripts/test-support/), so nothing touches the
// network and no email is sent. Webhook signatures are made and checked with
// the real Stripe library. The thank-you page is TSX, which Node cannot load
// directly; it uses the same isDataCheckout() tested here.
//
// SRC_ROOT=<folder> runs the same tests against another copy of src/. That is
// how the code before this check was shown to fail exactly the other-product cases.
import assert from "node:assert/strict";
import { register } from "node:module";
import { resolve as resolvePath } from "node:path";
import { afterEach, beforeEach, describe, test } from "node:test";
import { pathToFileURL } from "node:url";

const root = new URL("../", import.meta.url);
const srcRoot = process.env.SRC_ROOT
  ? pathToFileURL(`${resolvePath(process.env.SRC_ROOT)}/`).href
  : new URL("src/", root).href;
const fakesUrl = new URL("test-support/stripe-product-fakes.mjs", import.meta.url).href;

register("./test-support/stripe-product-hooks.mjs", import.meta.url, {
  data: {
    srcRoot,
    fakesUrl,
    nextServerUrl: new URL("node_modules/next/server.js", root).href,
  },
});

const { stripeState, mailbox, resetFakes, signedWebhook } = await import(fakesUrl);
const load = (path) => import(new URL(path, srcRoot).href);

const WEBHOOK_SECRET = "whsec_test_local_only";
const DATA_RETURN =
  "https://magimatix.com/data-daemon/thank-you?session_id={CHECKOUT_SESSION_ID}";

// Shapes match the sessions on the live account (checked 2026-11-08); ids and
// emails are made up.
const SESSIONS = {
  dataTagged: {
    id: "cs_test_data_tagged",
    payment_status: "paid",
    metadata: { product: "data-daemon" },
    return_url: DATA_RETURN,
    success_url: null,
    customer_details: { email: "supporter@example.com" },
    amount_total: 1500,
    currency: "usd",
  },
  // Every DATA checkout made before the tag existed looks like this.
  dataLegacy: {
    id: "cs_test_data_legacy",
    payment_status: "paid",
    metadata: {},
    return_url: DATA_RETURN,
    success_url: null,
    customer_details: { email: "early@example.com" },
    amount_total: 3900,
    currency: "usd",
  },
  dataUnpaid: {
    id: "cs_test_data_unpaid",
    payment_status: "unpaid",
    metadata: { product: "data-daemon" },
    return_url: DATA_RETURN,
    success_url: null,
    customer_details: { email: "maybe@example.com" },
    amount_total: 500,
    currency: "usd",
  },
  fieldGuide: {
    id: "cs_test_field_guide",
    payment_status: "paid",
    metadata: { product: "multidimensional-field-guide" },
    return_url: null,
    success_url:
      "https://auramaxxingacademy.com/field-guide-thank-you.html?session_id={CHECKOUT_SESSION_ID}",
    customer_details: { email: "reader@example.com" },
    amount_total: 2700,
    currency: "usd",
  },
  fieldGuideUnpaid: {
    id: "cs_test_field_guide_unpaid",
    payment_status: "unpaid",
    metadata: { product: "multidimensional-field-guide" },
    return_url: null,
    success_url:
      "https://auramaxxingacademy.com/field-guide-thank-you.html?session_id={CHECKOUT_SESSION_ID}",
    customer_details: { email: "browser@example.com" },
    amount_total: 2700,
    currency: "usd",
  },
  classroom: {
    id: "cs_test_classroom",
    payment_status: "paid",
    metadata: {
      app: "auramaxxing-academy",
      kind: "classroom",
      order: "ord_test",
      product: "founding-100",
    },
    return_url: null,
    success_url: "https://auramaxxingacademy.com/classroom/?checkout=success",
    customer_details: { email: "student@example.com" },
    amount_total: 10800,
    currency: "usd",
  },
  // The paused Field Debrief app: untagged, hosted checkout, its own success page.
  fieldDebrief: {
    id: "cs_test_field_debrief",
    payment_status: "paid",
    metadata: { handle: "someone", platform: "instagram" },
    return_url: null,
    success_url: "https://debrief.magimatix.com/success?session_id={CHECKOUT_SESSION_ID}",
    customer_details: { email: "creator@example.com" },
    amount_total: 500,
    currency: "usd",
  },
};
const OTHER_PAID = ["fieldGuide", "classroom", "fieldDebrief"];

// The routes log as they work. Keep those lines out of the test report, and
// keep them so a test can check what a route said.
const logs = [];
const realConsole = { log: console.log, error: console.error };

beforeEach(() => {
  resetFakes();
  for (const session of Object.values(SESSIONS)) stripeState.sessions.set(session.id, session);
  process.env.STRIPE_WEBHOOK_SECRET = WEBHOOK_SECRET;
  logs.length = 0;
  console.log = (...args) => logs.push(args.map(String).join(" "));
  console.error = (...args) => logs.push(args.map(String).join(" "));
});

afterEach(() => {
  Object.assign(console, realConsole);
});

describe("isDataCheckout", () => {
  test("pins the tag value that every tagged session stores", async () => {
    const { DATA_PRODUCT } = await load("lib/stripe-product.ts");
    assert.equal(DATA_PRODUCT, "data-daemon");
  });

  test("accepts a tagged DATA checkout", async () => {
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    assert.equal(isDataCheckout(SESSIONS.dataTagged), true);
    assert.equal(isDataCheckout(SESSIONS.dataUnpaid), true);
  });

  test("accepts an untagged checkout that returns to the DATA thank-you page", async () => {
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    assert.equal(isDataCheckout(SESSIONS.dataLegacy), true);
    for (const return_url of [
      "http://localhost:3000/data-daemon/thank-you?session_id={CHECKOUT_SESSION_ID}",
      "https://magimatix.com/data-daemon/thank-you/",
    ]) {
      assert.equal(isDataCheckout({ metadata: {}, return_url }), true, return_url);
    }
  });

  test("rejects Field Guide, classroom, and Field Debrief checkouts", async () => {
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    for (const name of [...OTHER_PAID, "fieldGuideUnpaid"]) {
      assert.equal(isDataCheckout(SESSIONS[name]), false, name);
    }
  });

  test("judges a tagged session by its tag alone", async () => {
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    assert.equal(
      isDataCheckout({ metadata: { product: "founding-100" }, return_url: DATA_RETURN }),
      false,
    );
  });

  test("rejects untagged checkouts that return anywhere else", async () => {
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    for (const return_url of [
      "https://magimatix.com/data/thank-you?session_id={CHECKOUT_SESSION_ID}",
      "https://magimatix.com/data-daemon/thank-you-not",
      "https://auramaxxingacademy.com/data-daemon",
    ]) {
      assert.equal(isDataCheckout({ metadata: {}, return_url }), false, return_url);
    }
  });

  test("rejects missing sessions and unreadable return addresses", async () => {
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    for (const session of [null, undefined, {}, { metadata: null, return_url: null }]) {
      assert.equal(isDataCheckout(session), false, JSON.stringify(session));
    }
    assert.equal(isDataCheckout({ metadata: {}, return_url: "/data-daemon/thank-you" }), false);
    assert.equal(isDataCheckout({ metadata: {}, return_url: "not a url" }), false);
  });
});

const completed = (session) => ({
  id: `evt_${session.id}`,
  object: "event",
  type: "checkout.session.completed",
  data: { object: session },
});

async function postWebhook(event, { secret = WEBHOOK_SECRET, signature } = {}) {
  const { POST } = await load("app/api/stripe/webhook/route.ts");
  const { payload, header } = signedWebhook(event, secret);
  const headers = { "content-type": "application/json" };
  if (signature !== null) headers["stripe-signature"] = signature ?? header;
  return POST(
    new Request("https://magimatix.com/api/stripe/webhook", {
      method: "POST",
      headers,
      body: payload,
    }),
  );
}

describe("Stripe webhook", () => {
  for (const name of OTHER_PAID) {
    test(`acknowledges a paid ${name} checkout and sends nothing`, async () => {
      const res = await postWebhook(completed(SESSIONS[name]));
      assert.equal(res.status, 200);
      assert.deepEqual(await res.json(), { received: true });
      assert.equal(mailbox.download.length, 0, "no DATA download email to that buyer");
      assert.equal(mailbox.sale.length, 0, "no DATA sale notice");
      assert.ok(
        logs.some((line) => line.includes("not a DATA checkout, ignored")),
        "the webhook logs that it ignored the checkout",
      );
    });
  }

  test("emails a tagged DATA supporter and sends one sale notice", async () => {
    const res = await postWebhook(completed(SESSIONS.dataTagged));
    assert.equal(res.status, 200);
    assert.deepEqual(mailbox.download, [
      { to: "supporter@example.com", sessionId: "cs_test_data_tagged" },
    ]);
    assert.equal(mailbox.sale.length, 1);
    assert.equal(mailbox.sale[0].sessionId, "cs_test_data_tagged");
    assert.equal(mailbox.sale[0].amountTotal, 1500);
  });

  test("still serves a DATA checkout made before the tag", async () => {
    const res = await postWebhook(completed(SESSIONS.dataLegacy));
    assert.equal(res.status, 200);
    assert.deepEqual(mailbox.download, [
      { to: "early@example.com", sessionId: "cs_test_data_legacy" },
    ]);
    assert.equal(mailbox.sale.length, 1);
  });

  test("sends nothing for an unpaid DATA checkout", async () => {
    const res = await postWebhook(completed(SESSIONS.dataUnpaid));
    assert.equal(res.status, 200);
    assert.equal(mailbox.download.length, 0);
    assert.equal(mailbox.sale.length, 0);
  });

  test("ignores other event types", async () => {
    const res = await postWebhook({
      id: "evt_other",
      object: "event",
      type: "payment_intent.succeeded",
      data: { object: { id: "pi_test", object: "payment_intent" } },
    });
    assert.equal(res.status, 200);
    assert.equal(mailbox.download.length + mailbox.sale.length, 0);
  });

  test("rejects a forged signature", async () => {
    const res = await postWebhook(completed(SESSIONS.dataTagged), { signature: "t=1,v1=bogus" });
    assert.equal(res.status, 400);
    assert.equal(mailbox.download.length + mailbox.sale.length, 0);
  });

  test("rejects an event signed with a different secret", async () => {
    const res = await postWebhook(completed(SESSIONS.dataTagged), { secret: "whsec_someone_else" });
    assert.equal(res.status, 400);
    assert.equal(mailbox.download.length + mailbox.sale.length, 0);
  });

  test("rejects a request with no signature", async () => {
    const res = await postWebhook(completed(SESSIONS.dataTagged), { signature: null });
    assert.equal(res.status, 400);
    assert.equal(mailbox.download.length + mailbox.sale.length, 0);
  });
});

async function postEmail(body) {
  const { POST } = await load("app/api/email-download/route.ts");
  return POST(
    new Request("https://magimatix.com/api/email-download", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

describe("email-download", () => {
  for (const name of [...OTHER_PAID, "fieldGuideUnpaid"]) {
    test(`refuses a ${name} checkout without sending anything`, async () => {
      const res = await postEmail({ session_id: SESSIONS[name].id });
      assert.equal(res.status, 403);
      assert.deepEqual(await res.json(), { error: "This purchase is not for DATA DAEMON." });
      assert.equal(mailbox.download.length, 0);
    });
  }

  test("sends a tagged DATA supporter the link, only to the address on the session", async () => {
    const res = await postEmail({ session_id: "cs_test_data_tagged" });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true, sentTo: "su***@example.com" });
    assert.deepEqual(mailbox.download, [
      { to: "supporter@example.com", sessionId: "cs_test_data_tagged" },
    ]);
  });

  test("still serves a DATA checkout made before the tag", async () => {
    const res = await postEmail({ session_id: "cs_test_data_legacy" });
    assert.equal(res.status, 200);
    assert.deepEqual(mailbox.download, [
      { to: "early@example.com", sessionId: "cs_test_data_legacy" },
    ]);
  });

  test("refuses an unpaid DATA checkout", async () => {
    const res = await postEmail({ session_id: "cs_test_data_unpaid" });
    assert.equal(res.status, 403);
    assert.deepEqual(await res.json(), { error: "Payment not completed for this session." });
    assert.equal(mailbox.download.length, 0);
  });

  test("answers 400 for an unknown session", async () => {
    const res = await postEmail({ session_id: "cs_test_does_not_exist" });
    assert.equal(res.status, 400);
    assert.equal(mailbox.download.length, 0);
  });

  test("answers 400 when session_id is missing or the body is not JSON", async () => {
    assert.equal((await postEmail({})).status, 400);
    assert.equal((await postEmail("not json")).status, 400);
    assert.equal(mailbox.download.length, 0);
  });
});

async function postCheckout(body) {
  const { POST } = await load("app/api/checkout/route.ts");
  return POST(
    new Request("https://magimatix.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://magimatix.com" },
      body: JSON.stringify(body),
    }),
  );
}

describe("checkout", () => {
  test("tags every new checkout, and the check accepts what checkout creates", async () => {
    const res = await postCheckout({ amount: 1500 });
    assert.equal(res.status, 200);
    assert.equal(stripeState.created.length, 1);
    const params = stripeState.created[0];
    assert.equal(params.metadata?.product, "data-daemon");
    assert.equal(params.return_url, DATA_RETURN);
    assert.equal(params.line_items[0].price_data.unit_amount, 1500);
    const { isDataCheckout } = await load("lib/stripe-product.ts");
    assert.equal(
      isDataCheckout({ metadata: params.metadata, return_url: params.return_url }),
      true,
    );
  });

  test("refuses amounts outside $1 to $2,000 without creating a session", async () => {
    for (const amount of [0, 99, 200_001, "abc"]) {
      const res = await postCheckout({ amount });
      assert.equal(res.status, 400, String(amount));
    }
    assert.equal(stripeState.created.length, 0);
  });
});
