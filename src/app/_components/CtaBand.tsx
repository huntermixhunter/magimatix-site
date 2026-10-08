// Closing call-to-action band for interior pages. Primary action is the
// Calendly popup; the secondary slot is whatever that page wants next.

import Link from "next/link";
import type { ReactNode } from "react";
import BookCallButton from "./BookCallButton";

export default function CtaBand({
  eyebrow = "Next Step",
  title,
  body,
  primaryLabel = "Book a Free Call →",
  secondaryHref,
  secondaryLabel,
  note,
}: {
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: ReactNode;
}) {
  return (
    <section className="py-20 relative">
      <div className="section-divider max-w-4xl mx-auto mb-20" />
      <div className="max-w-3xl mx-auto px-6 text-center reveal">
        <p className="text-sm font-mono text-aurora-pink tracking-widest uppercase mb-4">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
          {title}
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-9">
          {body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <BookCallButton>{primaryLabel}</BookCallButton>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="text-base font-medium px-8 py-4 rounded-full border border-white/15 text-zinc-200 hover:bg-white/5 transition-colors inline-block"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
        {note && (
          <p className="text-xs text-zinc-500 mt-5 font-mono tracking-wide">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
