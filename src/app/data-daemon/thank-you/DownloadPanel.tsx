"use client";

// OS-aware download options for the post-purchase thank-you page.
//
// The product ships two ways:
//   • Windows  — a one-click installer (.exe), recommended; the .zip also works.
//   • macOS / Linux / ChromeOS — the cross-platform .zip (run install.sh).
//
// We detect the buyer's OS in the browser and lead with the right choice, but
// every format stays reachable behind a toggle because UA sniffing is never
// perfect (and a buyer may be setting it up for a different machine).
import { useState, useSyncExternalStore } from "react";

type OS = "windows" | "mac" | "linux" | "other";

function detectOS(): OS {
  if (typeof navigator === "undefined") return "other";
  // Prefer the modern, structured hint when the browser exposes it.
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

// The OS never changes, so subscribe is a no-op. useSyncExternalStore renders
// the server snapshot ("other") during hydration, then swaps in the real OS on
// the client without a hydration-mismatch warning — the SSR-safe way to read
// browser-only state.
const noopSubscribe = () => () => {};

export default function DownloadPanel({ sessionId }: { sessionId: string }) {
  const os = useSyncExternalStore<OS>(
    noopSubscribe,
    detectOS,
    () => "other",
  );
  const [showAll, setShowAll] = useState(false);

  const sid = encodeURIComponent(sessionId);
  const zipHref = `/api/download?session_id=${sid}`;
  const exeHref = `/api/download?session_id=${sid}&format=installer`;

  const isWindows = os === "windows";

  return (
    <div className="w-full">
      {isWindows ? (
        <>
          <a
            href={exeHref}
            className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block w-full sm:w-auto"
          >
            Download the Windows installer (.exe) ↓
          </a>
          <p className="text-xs text-zinc-500 mt-3">
            One-click setup for Windows 10 / 11.{" "}
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
            >
              Prefer the .zip, or on Mac / Linux?
            </button>
          </p>
        </>
      ) : (
        <>
          <a
            href={zipHref}
            className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block w-full sm:w-auto"
          >
            Download DATA DAEMON (.zip) ↓
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
              On Windows and want the one-click installer?
            </button>
          </p>
        </>
      )}

      {showAll ? (
        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={zipHref}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .zip — Windows / macOS / Linux
          </a>
          <a
            href={exeHref}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .exe installer — Windows only
          </a>
        </div>
      ) : null}
    </div>
  );
}
