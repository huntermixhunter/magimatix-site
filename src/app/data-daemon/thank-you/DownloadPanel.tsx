"use client";

// OS-aware download options for the post-purchase thank-you page.
//
// The product ships three ways:
//   • Windows  — a one-click installer (.exe), recommended; the .zip also works.
//   • macOS    — a native disk image (.dmg), recommended; the .zip also works.
//   • Linux / ChromeOS / other — the cross-platform .zip (run install.sh).
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
  const [emailState, setEmailState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [emailMsg, setEmailMsg] = useState("");

  async function emailMeTheLink() {
    if (emailState === "sending") return;
    setEmailState("sending");
    setEmailMsg("");
    try {
      const res = await fetch("/api/email-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        sentTo?: string;
        error?: string;
      };
      if (res.ok) {
        setEmailState("sent");
        setEmailMsg(
          data.sentTo
            ? `Sent — check ${data.sentTo}`
            : "Sent — check your inbox.",
        );
      } else {
        setEmailState("error");
        setEmailMsg(data.error || "Could not send. Please try again.");
      }
    } catch {
      setEmailState("error");
      setEmailMsg("Could not send. Please try again.");
    }
  }

  const sid = encodeURIComponent(sessionId);
  const zipHref = `/api/download?session_id=${sid}`;
  const exeHref = `/api/download?session_id=${sid}&format=installer`;
  const dmgHref = `/api/download?session_id=${sid}&format=dmg`;

  const isWindows = os === "windows";
  const isMac = os === "mac";

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
      ) : isMac ? (
        <>
          <a
            href={dmgHref}
            className="btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block w-full sm:w-auto"
          >
            Download the Mac installer (.dmg) ↓
          </a>
          <p className="text-xs text-zinc-500 mt-3">
            Open the disk image and drag DATA to Applications (macOS).{" "}
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
            >
              Prefer the .zip, or on Windows / Linux?
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
              Want a native installer instead?
            </button>
          </p>
        </>
      )}

      {showAll ? (
        <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <a
            href={exeHref}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .exe installer — Windows
          </a>
          <a
            href={dmgHref}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .dmg installer — macOS
          </a>
          <a
            href={zipHref}
            className="text-sm font-medium px-5 py-3 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            .zip — Windows / macOS / Linux
          </a>
        </div>
      ) : null}

      {/* Email the link — the webhook already sends it automatically after
          purchase; this lets the buyer send it (again) to their inbox. */}
      <div className="mt-8 pt-6 border-t border-white/10">
        {emailState === "sent" ? (
          <p className="text-sm text-emerald-400">{emailMsg}</p>
        ) : (
          <>
            <button
              type="button"
              onClick={emailMeTheLink}
              disabled={emailState === "sending"}
              className="text-sm font-medium text-zinc-300 underline underline-offset-2 hover:text-white transition-colors disabled:opacity-50"
            >
              {emailState === "sending"
                ? "Sending…"
                : "Email me this download link"}
            </button>
            {emailState === "error" ? (
              <p className="text-xs text-rose-400 mt-2">{emailMsg}</p>
            ) : (
              <p className="text-xs text-zinc-500 mt-2">
                We also emailed it to you automatically after checkout.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
