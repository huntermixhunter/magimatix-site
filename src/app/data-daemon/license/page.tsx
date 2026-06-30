import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DATA DAEMON — End User License Agreement",
  description:
    "The End User License Agreement (EULA) for the DATA Daemon dashboard: a proprietary, single-user license. One purchase, one user, self-hosted, no redistribution.",
};

// Static, public copy of the license that ships inside the product (EULA.md).
// The version bundled with the download is the canonical, controlling text.
export default function DataLicensePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/#data"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to DATA DAEMON
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-6 mb-2">
          End User License Agreement —{" "}
          <span className="gradient-text">DATA DAEMON</span>
        </h1>
        <p className="text-zinc-400 mb-10">
          Proprietary, single-user license. Copyright © 2026 Hunter Mix. All
          rights reserved. This page summarizes the agreement; the{" "}
          <code className="text-zinc-300">EULA.md</code> file included with your
          download is the canonical, controlling text.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              1. License grant (single user, per purchase)
            </h2>
            <p>
              Each purchase grants <strong>one user</strong> a personal,
              non-exclusive, non-transferable, revocable license to install and
              use one copy of the Software per purchase, on devices you own or
              control, and to modify it for your own use. Deploying it for
              multiple users or a team requires one purchase per user or a
              separate written license.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              2. Restrictions
            </h2>
            <p>
              You may not distribute, publish, share, sublicense, sell, resell,
              rent, lease, or host the Software as a service; you may not
              redistribute it in any bundle, course, template, or marketplace
              (free or paid); you may not reverse engineer it for the purpose of
              redistribution or building a competing product; you may not remove
              proprietary notices; and you may not circumvent any license key or
              technical protection measure. Modifying the Software for your own
              use is permitted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              3. Ownership
            </h2>
            <p>
              The Software is licensed, not sold. The Licensor retains all
              copyrights, trademarks, trade secrets, and other intellectual
              property rights. All rights not expressly granted are reserved.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              4. Experimental software — assumption of risk
            </h2>
            <p>
              The Software is experimental and is an autonomous AI agent that can
              execute commands, create/modify/delete files, install software,
              control your mouse, keyboard, and screen, access the network, and
              act on your behalf in connected accounts. AI is non-deterministic
              and may behave unexpectedly; actions may be irreversible. You
              accept these risks and are solely responsible for supervising it.
              Run it only on systems you control and keep backups.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              5. Not professional advice
            </h2>
            <p>
              Any output — financial, investment, legal, tax, medical, health, or
              business — is for general information only, may be inaccurate, and
              is not professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              6. Refunds
            </h2>
            <p>
              The Software is a digital product delivered immediately. All sales
              are final and non-refundable once the download has been accessed,
              except where required by law or granted in writing. If a download
              link fails or you were charged in error, contact us and we will
              make it right.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              7. No warranty &amp; limitation of liability
            </h2>
            <p>
              The Software is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranty of any kind. To the maximum extent
              permitted by law, the Licensor is not liable for any indirect,
              incidental, special, or consequential damages, or loss of data,
              profits, or revenue. Total aggregate liability shall not exceed the
              amount you paid for the Software.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              8. Term, governing law
            </h2>
            <p>
              This Agreement terminates automatically if you breach it, in
              particular the Restrictions; on termination you must delete all
              copies. It is governed by the laws of the State of Idaho, USA, with
              exclusive venue in the courts of Idaho.
            </p>
          </section>
        </div>

        <p className="text-xs text-zinc-500 mt-12 leading-relaxed">
          By purchasing, downloading, installing, or using the DATA Daemon
          Software, you acknowledge that you have read and agree to this End User
          License Agreement and the accompanying disclaimer. This page is a
          license agreement, not legal advice to you.
        </p>

        <div className="mt-10">
          <Link
            href="/data-daemon/checkout"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Continue to checkout →
          </Link>
        </div>
      </div>
    </main>
  );
}
