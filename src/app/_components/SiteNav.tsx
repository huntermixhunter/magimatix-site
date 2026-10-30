"use client";

// Lightweight nav for the blog, which runs on a flat background instead of the
// video shell. Link list is kept in sync with SiteShell's nav by hand: both
// point at the same set of top-level pages.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/services", label: "AI Services" },
  { href: "/websites", label: "Websites" },
  { href: "/data-daemon", label: "DATA DAEMON" },
  { href: "https://forum.magimatix.com", label: "Forum" },
  { href: "/blog", label: "Blog" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Magimatix"
            width={140}
            height={40}
            className="h-8 md:h-9 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                isActive(l.href) ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-glow inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold text-white"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="lg:hidden text-white"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-6 pb-5 space-y-3 border-t border-white/5 pt-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/faq"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-zinc-400 hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-aurora-cyan hover:text-white transition-colors font-medium"
          >
            Contact →
          </Link>
        </div>
      )}
    </nav>
  );
}
