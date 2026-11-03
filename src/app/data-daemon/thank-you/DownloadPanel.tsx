"use client";

// Free, OS-specific downloads for DATA. Visitors choose Windows, Mac, or Linux and
// get that system's download plus plain-language setup steps. The Mac builds are
// unsigned, so the Mac tab walks through the one Terminal command that clears the
// macOS download block.
//
// The visitor's OS is preselected when the browser reveals it, and a #windows,
// #mac, or #linux link opens a specific tab (handy for support replies). All three
// panels are server-rendered (two of them hidden), so every download link is in
// the page HTML before any JavaScript runs.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  DATA_EXE_URL,
  DATA_INSTALL_GUIDE_URL,
  DATA_LATEST_URL,
  DATA_MAC_DOWNLOADS,
  DATA_MAC_INSTRUCTIONS_URL,
  DATA_MAC_TERMINAL_COMMAND,
  DATA_REPO_URL,
  DATA_VERSION,
  DATA_ZIP_URL,
} from "@/lib/data-release";

type Platform = "windows" | "mac" | "linux";

const PLATFORMS: { id: Platform; name: string; detail: string }[] = [
  { id: "windows", name: "Windows", detail: "Windows 10 and 11" },
  { id: "mac", name: "Mac", detail: "Apple Silicon or Intel" },
  { id: "linux", name: "Linux", detail: "Including Chromebook" },
];

const LINUX_COMMAND = `cd ~/Downloads && unzip -q DATA-${DATA_VERSION}.zip && cd DATA && bash install/install.sh && ./start_data.sh`;

// Best guess at the visitor's OS. User-agent sniffing is never perfect, which is
// why every system stays one click away.
function detectPlatform(): Platform | null {
  const uaData = (
    navigator as Navigator & { userAgentData?: { platform?: string } }
  ).userAgentData;
  const platform = (uaData?.platform || navigator.platform || "").toLowerCase();
  const hay = `${platform} ${navigator.userAgent.toLowerCase()}`;
  if (hay.includes("win")) return "windows";
  if (hay.includes("mac")) return "mac";
  if (hay.includes("linux") || hay.includes("cros")) return "linux";
  return null;
}

function linkedPlatform(): Platform | null {
  const hash = window.location.hash.slice(1).toLowerCase();
  if (hash === "windows" || hash === "linux") return hash;
  if (hash === "mac" || hash === "macos") return "mac";
  return null;
}

// The OS never changes; the URL hash can. Both read as null during server
// rendering and hydration, then resolve on the client without a mismatch warning.
const noopSubscribe = () => () => {};
function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const serverSnapshot = () => null;

const menu = (...items: string[]) => items.join(" > ");

export default function DownloadPanel() {
  const detected = useSyncExternalStore(noopSubscribe, detectPlatform, serverSnapshot);
  const linked = useSyncExternalStore(subscribeToHash, linkedPlatform, serverSnapshot);
  const [picked, setPicked] = useState<Platform | null>(null);
  const active = picked ?? linked ?? detected;

  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<Platform, HTMLButtonElement | null>>>({});
  const scrolledToLink = useRef(false);

  // A shared #mac (or #windows, #linux) link should land on the steps, not the
  // top of the page. Wait until the linked panel is actually open: during
  // hydration it is still hidden, and a short page may not be scrollable yet.
  useEffect(() => {
    if (scrolledToLink.current || !linked || active !== linked) return;
    scrolledToLink.current = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      rootRef.current?.scrollIntoView({
        block: "start",
        behavior: reduceMotion ? "instant" : "smooth",
      });
    } catch {
      // A browser that rejects the "instant" option still gets the plain scroll.
      rootRef.current?.scrollIntoView();
    }
  }, [linked, active]);

  function choose(platform: Platform, moveFocus = false) {
    setPicked(platform);
    if (moveFocus) tabRefs.current[platform]?.focus();
  }

  // Arrow keys, Home, and End move between tabs (WAI-ARIA tabs pattern).
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = PLATFORMS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    choose(PLATFORMS[next].id, true);
  }

  return (
    <div ref={rootRef} id="download" className="w-full text-left">
      <h2 className="text-xl font-semibold text-white">Download DATA</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Free, with no account needed. Choose your system for the download and the
        setup steps.
      </p>

      <div
        role="tablist"
        aria-label="Operating system"
        className="mt-6 grid grid-cols-3 gap-2 sm:gap-3"
      >
        {PLATFORMS.map((platform, index) => {
          const selected = active === platform.id;
          // Exactly one tab sits in the Tab order, even before a system is chosen.
          const tabbable = active ? selected : index === 0;
          return (
            <button
              key={platform.id}
              ref={(node) => {
                tabRefs.current[platform.id] = node;
              }}
              type="button"
              role="tab"
              id={`download-tab-${platform.id}`}
              aria-selected={selected}
              aria-controls={`download-panel-${platform.id}`}
              tabIndex={tabbable ? 0 : -1}
              onClick={() => choose(platform.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`relative min-h-12 cursor-pointer rounded-xl border px-2 py-3 text-center transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 ${
                selected
                  ? "border-aurora-blue/70 bg-aurora-blue/15 text-white"
                  : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span className="block text-sm font-semibold sm:text-base">
                {platform.name}
              </span>
              <span
                className={`mt-0.5 hidden text-xs sm:block ${
                  selected ? "text-zinc-200" : "text-zinc-400"
                }`}
              >
                {platform.detail}
              </span>
              {selected ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-purple"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {active === null ? (
        <p className="mt-6 text-sm text-zinc-400">
          Pick Windows, Mac, or Linux above to see the right download and how to set
          it up.
        </p>
      ) : null}

      <div
        role="tabpanel"
        id="download-panel-windows"
        aria-labelledby="download-tab-windows"
        hidden={active !== "windows"}
        className="mt-8"
      >
        <WindowsSteps />
      </div>
      <div
        role="tabpanel"
        id="download-panel-mac"
        aria-labelledby="download-tab-mac"
        hidden={active !== "mac"}
        className="mt-8"
      >
        <MacSteps />
      </div>
      <div
        role="tabpanel"
        id="download-panel-linux"
        aria-labelledby="download-tab-linux"
        hidden={active !== "linux"}
        className="mt-8"
      >
        <LinuxSteps />
      </div>

      {/* Open source: the trust lever. Anyone can read every line before running it. */}
      <div className="mt-10 border-t border-white/10 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <a
            href={DATA_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-300 underline underline-offset-2 transition-colors hover:text-white"
          >
            View the full source on GitHub →
          </a>
          <a
            href={DATA_LATEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-300 underline underline-offset-2 transition-colors hover:text-white"
          >
            All files and checksums →
          </a>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Free and open source under Apache-2.0. Audit it, fork it, run it your way.
        </p>
      </div>
    </div>
  );
}

function WindowsSteps() {
  return (
    <>
      <Steps>
        <Step number={1} title="Download the installer">
          <a href={DATA_EXE_URL} className={primaryButton}>
            Download for Windows (.exe) ↓
          </a>
          <p>
            For Windows 10 and 11. If your browser says the file is not commonly
            downloaded, choose <Ui>Keep</Ui>.
          </p>
        </Step>
        <Step number={2} title="Run the installer">
          <p>
            {/* Keep the explicit space: the compiler drops a leading space from a
                text run that contains HTML entities. */}
            Open <Ui>{`DATA-Setup-${DATA_VERSION}.exe`}</Ui>{" "}
            from your Downloads. If Windows shows &ldquo;Windows protected your PC,&rdquo;
            click{" "}
            <Ui>More info</Ui>, then <Ui>Run anyway</Ui>. That screen appears because
            DATA is not code-signed.
          </p>
        </Step>
        <Step number={3} title="Launch DATA">
          <p>
            Finish the setup with <Ui>Launch DATA Daemon now</Ui> checked. DATA opens
            in your browser at <LocalLink />. Next time, start it from the Start menu
            or your desktop shortcut.
          </p>
        </Step>
        <ConnectAiStep number={4} />
      </Steps>
      <p className="mt-8 text-sm leading-relaxed text-zinc-400">
        Prefer a portable folder? Get the{" "}
        <a
          href={DATA_ZIP_URL}
          className="font-medium text-zinc-200 underline underline-offset-2 hover:text-white"
        >
          .zip
        </a>
        , unzip it, and double-click <Code>install\install.bat</Code>. That route needs
        Python 3.10 or newer.
      </p>
    </>
  );
}

function MacSteps() {
  return (
    <>
      <Steps>
        <Step number={1} title="Download the version for your Mac">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {DATA_MAC_DOWNLOADS.map((download) => (
              <a key={download.url} href={download.url} className={primaryButton}>
                {download.label} (.dmg) ↓
              </a>
            ))}
          </div>
          <p>
            Not sure which? Open the <Ui>Apple menu</Ui>, then <Ui>About This Mac</Ui>.
            A <Ui>Chip</Ui> line such as Apple M1, M2, or later means Apple Silicon. A{" "}
            <Ui>Processor</Ui> line naming Intel means Intel.
          </p>
        </Step>
        <Step number={2} title="Copy DATA into Downloads">
          <p>
            Double-click the downloaded .dmg. In the window that opens, click the{" "}
            <Ui>DATA</Ui> folder once and press <Kbd>Command+C</Kbd>. Then in Finder,
            choose <Ui>{menu("Go", "Downloads")}</Ui> and press <Kbd>Command+V</Kbd>.
            Wait for the copy to finish.
          </p>
          <p className="text-sm text-zinc-400">
            Already have a DATA folder in Downloads? Do not replace it, because it holds
            your settings.
          </p>
        </Step>
        <Step number={3} title="Open Terminal">
          <p>
            Press <Kbd>Command+Space</Kbd>, type <Ui>Terminal</Ui>, and press{" "}
            <Kbd>Return</Kbd>.
          </p>
        </Step>
        <Step number={4} title="Paste this command and press Return">
          <CommandBlock command={DATA_MAC_TERMINAL_COMMAND} />
          <p>
            Paste the whole line exactly as shown. If Terminal asks to access your
            Downloads folder, click <Ui>Allow</Ui>. DATA then starts and opens in your
            browser at <LocalLink />. Keep Terminal open while you use it.
          </p>
          <WhyTerminal />
        </Step>
        <ConnectAiStep number={5} />
      </Steps>
      <p className="mt-8 text-sm leading-relaxed text-zinc-400">
        Next time, just double-click <Ui>Start DATA.command</Ui> in{" "}
        <Ui>{menu("Downloads", "DATA")}</Ui>. Keep that folder: it holds your settings
        and conversations.
      </p>
      <MacTroubleshooting />
      <a
        href={DATA_MAC_INSTRUCTIONS_URL}
        download="DATA-Mac-Setup.txt"
        className="mt-6 inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Save these Mac steps (.txt) ↓
      </a>
    </>
  );
}

function LinuxSteps() {
  return (
    <Steps>
      <Step number={1} title="Download the .zip">
        <a href={DATA_ZIP_URL} className={primaryButton}>
          Download for Linux (.zip) ↓
        </a>
        <p>
          You need Python 3.10 or newer and unzip. On Debian or Ubuntu:{" "}
          <Code>sudo apt install python3 python3-pip unzip</Code>
        </p>
      </Step>
      <Step number={2} title="Install and start DATA">
        <p>Open a terminal and run:</p>
        <CommandBlock command={LINUX_COMMAND} />
        <p>
          DATA opens in your browser at <LocalLink />. Keep the terminal open while you
          use it. Next time, open DATA from your app menu or run{" "}
          <Code>~/Downloads/DATA/start_data.sh</Code>.
        </p>
        <p className="text-sm text-zinc-400">
          Saved the .zip somewhere else? Change <Code>~/Downloads</Code> to that
          folder. On a Chromebook, turn on Linux in Settings first, move the .zip into{" "}
          <Ui>Linux files</Ui>, and use <Code>cd ~</Code> instead.
        </p>
      </Step>
      <ConnectAiStep number={3} />
    </Steps>
  );
}

function ConnectAiStep({ number }: { number: number }) {
  return (
    <Step number={number} title="Connect your AI">
      <p>
        DATA chats through an AI tool you already use, signed in with your own
        account. Install one and sign in once: <Ui>Claude Code</Ui>, <Ui>Codex</Ui>{" "}
        (with ChatGPT), <Ui>Gemini CLI</Ui>, or <Ui>Ollama</Ui> (free and fully
        local). No API keys needed.
      </p>
      <a
        href={DATA_INSTALL_GUIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm font-medium text-zinc-200 underline underline-offset-2 transition-colors hover:text-white"
      >
        Sign-in steps for each tool (INSTALL.txt) →
      </a>
    </Step>
  );
}

function WhyTerminal() {
  return (
    <div className="flex gap-3 rounded-xl border border-aurora-cyan/20 bg-aurora-cyan/[0.05] p-4">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 h-5 w-5 flex-none text-aurora-cyan"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
      <div className="space-y-2 text-sm leading-relaxed text-zinc-300">
        <p className="font-semibold text-white">Why the Terminal step?</p>
        <p>
          DATA is free and open source, but it is not signed or notarized by Apple.
          So the first time it runs, macOS blocks it with a warning that Apple could
          not verify it, or that it comes from an unidentified developer.
        </p>
        <p>
          This command clears that download block for your DATA folder only, then
          starts DATA. It does not turn off your Mac&rsquo;s security settings and does
          not need your password. Only run it on a copy you downloaded from this page.
        </p>
      </div>
    </div>
  );
}

function MacTroubleshooting() {
  return (
    <details className="group mt-6 rounded-xl border border-white/10 bg-white/[0.02]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
        Something not working on your Mac?
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 flex-none transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <dl className="space-y-4 border-t border-white/10 px-4 py-4 text-sm leading-relaxed">
        <Fix problem="A warning appeared when you double-clicked DATA">
          That is the normal first-run block for an app Apple has not signed. Close it
          and use the Terminal command in step 4.
        </Fix>
        <Fix problem="“No such file or directory”">
          The DATA folder must be copied out of the .dmg, named exactly DATA, and sit
          directly inside Downloads.
        </Fix>
        <Fix problem="“Operation not permitted”">
          Open <Ui>{menu("System Settings", "Privacy & Security", "Files & Folders")}</Ui>,
          find Terminal, and allow its access to Downloads. Then run the command again.
        </Fix>
        <Fix problem="“Different Mac processor” or “Bad CPU type”">
          Download the other version in step 1. About This Mac shows which chip you
          have.
        </Fix>
        <Fix problem="“Damaged” or a malware warning">
          Do not override it. Delete the download, get a fresh copy from this page, and{" "}
          <a
            href="/contact"
            className="font-medium text-zinc-200 underline underline-offset-2 hover:text-white"
          >
            contact us
          </a>{" "}
          if it happens again.
        </Fix>
        <Fix problem="Your browser did not open">
          With Terminal still running, visit <LocalLink /> yourself.
        </Fix>
      </dl>
    </details>
  );
}

function CommandBlock({ command }: { command: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");
  const codeRef = useRef<HTMLElement>(null);

  // Return the button to "Copy" a moment after each copy.
  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
    } catch {
      // Clipboard access can be blocked. Select the command instead, so a keyboard
      // copy still gets the exact text.
      const code = codeRef.current;
      const selection = window.getSelection();
      if (code && selection) {
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("selected");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1 pl-4 pr-1">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          Terminal
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-zinc-200 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            {status === "copied" ? (
              <path d="M20 6 9 17l-5-5" />
            ) : (
              <>
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </>
            )}
          </svg>
          {status === "copied" ? "Copied" : status === "selected" ? "Selected" : "Copy"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap px-4 py-3 font-mono text-[13px] leading-6 text-zinc-100 [overflow-wrap:anywhere]">
        <code ref={codeRef}>{command}</code>
      </pre>
      <span aria-live="polite" className="sr-only">
        {status === "copied"
          ? "Command copied to the clipboard."
          : status === "selected"
            ? "Command selected. Copy it with your keyboard."
            : ""}
      </span>
    </div>
  );
}

const primaryButton =
  "btn-glow inline-block w-full rounded-full px-7 py-3.5 text-center text-base font-medium text-white sm:w-auto";

function Steps({ children }: { children: ReactNode }) {
  return <ol className="space-y-8">{children}</ol>;
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative pl-10">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-xs font-semibold tabular-nums text-zinc-100"
      >
        {number}
      </span>
      <h3 className="text-base font-semibold leading-7 text-white">{title}</h3>
      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-zinc-300">
        {children}
      </div>
    </li>
  );
}

function Fix({ problem, children }: { problem: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-medium text-white">{problem}</dt>
      <dd className="mt-1 text-zinc-300">{children}</dd>
    </div>
  );
}

function Ui({ children }: { children: ReactNode }) {
  return <span className="font-medium text-zinc-100">{children}</span>;
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.8em] text-zinc-100">
      {children}
    </kbd>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-100 [overflow-wrap:anywhere]">
      {children}
    </code>
  );
}

function LocalLink() {
  return (
    <a
      href="http://localhost:7777"
      className="font-mono text-[0.9em] text-zinc-100 underline underline-offset-2 hover:text-white"
    >
      localhost:7777
    </a>
  );
}
