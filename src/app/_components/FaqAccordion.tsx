"use client";

// Reusable FAQ accordion. Each page passes the slice of questions that belongs
// to it (see `faqFor` in _content.tsx); /faq renders the whole set.

import { useState } from "react";
import type { FaqItem } from "../_content";

export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openFaq === i;
        return (
          <div
            key={item.q}
            className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-aurora-blue/40 shadow-[0_0_40px_rgba(91,127,255,0.12)]"
                : "hover:border-white/20"
            }`}
          >
            <button
              onClick={() => setOpenFaq(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-4 md:gap-5">
                <span
                  className={`font-mono text-xs tracking-widest pt-1 transition-colors ${
                    isOpen ? "text-aurora-cyan" : "text-zinc-600 group-hover:text-zinc-400"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-base md:text-lg font-semibold leading-snug transition-colors ${
                    isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
                  }`}
                >
                  {item.q}
                </span>
              </span>
              <span
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "bg-aurora-blue/20 rotate-180" : "bg-white/5 group-hover:bg-white/10"
                }`}
              >
                <svg
                  className={`w-4 h-4 transition-colors ${
                    isOpen ? "text-aurora-cyan" : "text-zinc-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 md:px-8 pb-6 md:pb-7 pl-[3.75rem] md:pl-[4.25rem]">
                  <div className="h-px bg-gradient-to-r from-aurora-cyan/30 via-aurora-blue/20 to-transparent mb-5" />
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
