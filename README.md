# magimatix.com

Production website and digital storefront for Magimatix, a small web and
automation studio in Sandpoint, Idaho. Live at https://magimatix.com

Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, deployed on
Vercel.

## What this actually is

Not a brochure template. It is a marketing site and a working one-time-purchase
storefront running in the same application, with payment, fulfilment and
transactional email wired end to end.

**Commerce**
- Stripe embedded checkout for a one-time digital product
- Webhook endpoint that verifies the Stripe signature before trusting any payload
- Transactional email through Resend on a verified sending domain
- Release assets published to GitHub Releases, with a stable redirect in front of
  them so older emailed links never break when a version ships

**Content**
- Markdown blog with frontmatter, parsed with `gray-matter` and rendered with `marked`
- Seven posts, each with a generated hero image
- Dynamic Open Graph images, plus `sitemap.ts` and `robots.ts` generated at build time

**Pages**
Home, services, websites, dashboards, FAQ, contact, blog index and post, and a
four-step product flow for the desktop app (landing, checkout, thank you, license).

## API routes

| Route | Purpose |
|---|---|
| `POST /api/checkout` | Creates a Stripe embedded checkout session |
| `POST /api/stripe/webhook` | Verifies the Stripe signature, records the sale, triggers email |
| `POST /api/contact` | Contact form submission |
| `GET /api/download` | 302 redirect to the current release asset for the requested format |
| `POST /api/email-download` | Emails a download link via Resend |

## One design decision worth calling out

Fulfilment does not depend on webhook timing. The buyer's download is resolved
synchronously on the thank-you page when Stripe redirects them back, so a slow or
dropped webhook can never leave a paying customer staring at nothing. The webhook
still runs, but its job is durable record-keeping and email, not delivery.

The download route is deliberately dumb for the same reason: it holds no version
numbers, it just forwards to the current release. Links printed in emails two
versions ago still resolve today.

## Running it locally

```bash
npm install
cp .env.example .env.local   # fill in your own keys
npm run dev
```

Then open http://localhost:3000

`.env.example` documents every variable the app reads, with each value left
empty. No credentials are committed to this repository. Production values are
set in Vercel.

## Scripts

| Command | What it does |
|---|---|
| `npm run post:image` | Generates a hero image for a blog post |
| `npm run post:ship` | Builds and publishes a post |
| `npm run favicons` | Regenerates the favicon set from a source PNG |
| `npm run data:upload` | Uploads a product build to Vercel Blob |

## A note on AGENTS.md

The Next.js version used here is newer than most model training data. `AGENTS.md`
points coding agents at the docs bundled in `node_modules/next/dist/docs/` instead
of letting them write against remembered, older APIs.
