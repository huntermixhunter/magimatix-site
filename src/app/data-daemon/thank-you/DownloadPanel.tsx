"use client";

// OS-aware, free download for DATA. The product is open source and the installers
// live on GitHub Releases, so every link here is public and permanent — there is
// no payment gate. We detect the visitor's OS and lead with the right build, but
// keep every format reachable behind a toggle because UA sniffing is never perfect
// (and someone may be setting it up for a different machine).
import { useState, useSyncExternalStore } from "react";
import {
  DATA_EXE_URL,
  DATA_ZIP_URL,
  DATA_REPO_URL,
  DATA_LATEST_URL,
} from "@/lib/data-release";

type OS = "windows" | "mac" | "linux" | "other";

function detectOS(): OS {
  if (typeof navigator === "undefined") return "other";
  const uaData = (
    navigator as Navigator & { userAgentData?: { platform?: string } }
  ).userAgentData;
  const platform = (uaData?.platform || navigator.platform || "").toLowerCase();
  const ua = navigator.userAgent.toLowerCase();
  const hay = `${platform} ${ua}`;
  if (hay.includes("win")) return "windows";
  if (hay.includes("mac")) return "mac";
  if (hay.includes("linux") || hay.includes("cros") || hay.includes("android"))
    return "linux";
  return "other";
}

// The OS never changes, so subscribe is a no-op. useSyncExternalStore renders the
// server snapshot ("other") during hydration, then swaps in the real OS on the
// client without a hydration-mismatch warning.
const noopSubscribe = () => () => {};

export default function DownloadPanel() {
  const os = useSyncExternalStore<OS>(noopSubscribe, detectOS, () => "other");
  const [showAll, setShowAll] = useState(false);

  const isWindows = os === "windows";

  return (
    <div className="w-full">
      {isWindows ? (
        <>
          <a
            href={DATA_EXE_URL}
            className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block w-full sm:w-auto"
          >
            Download for Windows (.exe) ↓
          </a>
          <p className="text-xs text-zinc-500 mt-3">
            One-click setup for Windows 10 / 11.{" "}
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
            >
              On Mac or Linux? Get the .zip.
            </button>
          </p>
        </>
      ) : (
        <>
          <a
            href={DATA_ZIP_URL}
            className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block w-full sm:w-auto"
          >
            Download DATA (.zip) ↓
          </a>
          <p className="text-xs text-zinc-500 mt-3">
            Works on macOS, Linux, and Windows — unzip and run{" "}
            <span className="font-mono text-zinc-300">install.sh</span> (or{" "}
            <span className="font-mono text-zinc-300">install.bat</span> on
            Windows).{" "}
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
            >
              On Windows? Get the one-click installer.
            </button>
          </p>
        </>
      )}

      {showAll ? (
        <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <a
            href={DATA_EXE_URL}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .exe installer — Windows
          </a>
          <a
            href={DATA_ZIP_URL}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .zip — Windows / macOS / Linux
          </a>
          <a
            href={DATA_LATEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            All releases on GitHub
          </a>
        </div>
      ) : null}

      {/* Open source — the trust lever. Anyone can read every line before running it. */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <a
          href={DATA_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
        >
          View the full source on GitHub →
        </a>
        <p className="text-xs text-zinc-500 mt-2">
          Free and open source under Apache-2.0. Audit it, fork it, run it your
          way.
        </p>
      </div>
    </div>
  );
}
