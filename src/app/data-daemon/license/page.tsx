import Link from "next/link";
import type { Metadata } from "next";
import { DATA_REPO_URL } from "@/lib/data-release";

export const metadata: Metadata = {
  title: "DATA DAEMON — License (Apache-2.0)",
  description:
    "DATA DAEMON is free and open-source software licensed under Apache-2.0. Use it, modify it, redistribute it. Provided as is, with an important note on running an autonomous AI agent.",
};

const LICENSE_URL = `${DATA_REPO_URL}/blob/main/LICENSE`;

// Public summary of the DATA license. The canonical, controlling text is the
// Apache-2.0 LICENSE file in the repository and inside the download.
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

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1 text-xs font-medium text-emerald-300 mt-6 mb-4">
          Free &amp; open source · Apache-2.0
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          License — <span className="gradient-text">DATA DAEMON</span>
        </h1>
        <p className="text-zinc-400 mb-10">
          DATA DAEMON is free and open-source software, released under the{" "}
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 underline underline-offset-2 hover:text-white"
          >
            Apache License 2.0
          </a>
          . This page is a plain-language summary; the{" "}
          <code className="text-zinc-300">LICENSE</code> file in the repository
          and inside your download is the canonical, controlling text.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              1. What you can do
            </h2>
            <p>
              You may use, copy, modify, and distribute the Software, for any
              purpose including commercial use, and you may build on it. The
              Apache-2.0 license also includes an express grant of patent rights
              from the contributors. In short: it is yours to run, change, and
              share.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              2. The conditions
            </h2>
            <p>
              When you redistribute the Software or a derivative, keep the
              copyright and license notices and the{" "}
              <code className="text-zinc-300">NOTICE</code> file, state any
              significant changes you made, and include a copy of the Apache-2.0
              license. You may not use the DATA or Magimatix names or marks to
              endorse or promote your derivative without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              3. Experimental software — assumption of risk
            </h2>
            <p>
              The Software is experimental and is an autonomous AI agent that can
              execute commands, create/modify/delete files, install software,
              control your mouse, keyboard, and screen, access the network, and
              act on your behalf in connected accounts. AI is non-deterministic
              and may behave unexpectedly; actions may be irreversible. You accept
              these risks and are solely responsible for supervising it. Run it
              only on systems you control and keep backups.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              4. Not professional advice
            </h2>
            <p>
              Any output — financial, investment, legal, tax, medical, health, or
              business — is for general information only, may be inaccurate, and
              is not professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              5. No warranty &amp; limitation of liability
            </h2>
            <p>
              As stated in the Apache-2.0 license, the Software is provided on an
              &ldquo;as is&rdquo; basis, without warranties or conditions of any
              kind, express or implied. To the maximum extent permitted by law,
              no contributor is liable for any damages arising from the use of
              the Software. You bear the entire risk of its use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              6. Supporting the project
            </h2>
            <p>
              DATA is free — there is nothing to buy. If you want to support
              continued development, contributions are pay-what-you-want and
              entirely optional; they grant no additional license or warranty.
            </p>
          </section>
        </div>

        <p className="text-xs text-zinc-500 mt-12 leading-relaxed">
          By downloading, installing, or using the DATA DAEMON Software, you
          acknowledge the Apache-2.0 license and the risk notice above. This page
          is a summary, not legal advice to you.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/data-daemon/checkout"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Get DATA — free →
          </Link>
          <a
            href={DATA_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5 transition-colors"
          >
            View source on GitHub →
          </a>
        </div>
      </div>
    </main>
  );
}
