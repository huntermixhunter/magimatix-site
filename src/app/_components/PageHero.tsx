// Compact page header used at the top of every interior page. Keeps the
// eyebrow / headline / lede rhythm consistent without each page re-rolling it.

import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  eyebrowClass = "text-aurora-cyan",
  title,
  lede,
  children,
}: {
  eyebrow: string;
  eyebrowClass?: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pt-32 pb-14 md:pt-40 md:pb-20 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white transition-colors mb-6"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          All options
        </Link>
        <p className={`text-sm font-mono tracking-widest uppercase mb-4 ${eyebrowClass}`}>
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
          {title}
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {lede}
        </p>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
