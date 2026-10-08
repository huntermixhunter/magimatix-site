"use client";

// Opens the Calendly scheduler in a centered popup overlay (no scroll trap).
// Dropped anywhere a page wants the "book a free call" action without pulling
// in the whole contact form.

import Script from "next/script";
import type { ReactNode } from "react";
import { CALENDLY_URL } from "../_content";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function BookCallButton({
  children = "Book a Free Call →",
  className = "btn-glow text-base font-medium px-8 py-4 rounded-full text-white inline-block cursor-pointer",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Widget script not ready yet — fall back to opening in a new tab.
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {children}
      </button>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
