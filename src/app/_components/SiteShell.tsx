"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SiteShell: the chrome every page shares.
//
// Background video + dark overlay, the page-aware top nav, the footer, and the
// IntersectionObserver that powers the `.reveal` animation. Pages supply only
// their own <main> content.
//
// `loader` gates the full-screen logo splash on the video being ready. That is
// a homepage-only flourish; sub-pages mount instantly so a click from the
// chooser never feels like a reload.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/services", label: "AI Services" },
  { href: "/websites", label: "Websites" },
  { href: "/data-daemon", label: "DATA DAEMON" },
  { href: "https://forum.magimatix.com", label: "Forum" },
  { href: "/blog", label: "Blog" },
];

const footerLinks = [
  { href: "/services", label: "AI Services" },
  { href: "/websites", label: "Websites" },
  { href: "/data-daemon", label: "DATA DAEMON" },
  { href: "https://forum.magimatix.com", label: "Forum" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const legacySections: Record<string, string> = {
  "#pricing": "/services",
  "#services": "/services",
  "#portfolio": "/websites#portfolio",
  "#process": "/services#process",
  "#data": "/data-daemon",
  "#debrief": "/",
  "#testimonials": "/websites",
  "#faq": "/faq",
  "#contact": "/contact",
};

export default function SiteShell({
  children,
  loader = false,
}: {
  children: React.ReactNode;
  loader?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(!loader);
  const [menuOpen, setMenuOpen] = useState(false);

  // Re-arm the reveal observer on every route change: a client-side navigation
  // swaps the DOM without remounting this shell.
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Old bookmarks and shared links still reach their new destination.
  useEffect(() => {
    if (pathname !== "/") return;
    const redirectSection = () => {
      const destination = legacySections[window.location.hash];
      if (!destination) return;
      const target = new URL(destination, window.location.origin);
      target.search = window.location.search;
      router.replace(target.pathname + target.search + target.hash);
    };
    redirectSection();
    window.addEventListener("hashchange", redirectSection);
    return () => window.removeEventListener("hashchange", redirectSection);
  }, [pathname, router]);

  // Force playback: some browsers block autoplay even when muted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };
    const onReady = () => setVideoLoaded(true);

    // Mobile browsers throttle preload and often never fire canplaythrough, so
    // listen for earlier events too and force-clear after a short timeout.
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onReady);
    const readyFrame =
      video.readyState >= 2 ? window.requestAnimationFrame(onReady) : undefined;

    const fallback = window.setTimeout(() => setVideoLoaded(true), 2500);
    tryPlay();

    const onInteraction = () => {
      tryPlay();
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
    };
    document.addEventListener("touchstart", onInteraction, { once: true });
    document.addEventListener("click", onInteraction, { once: true });

    return () => {
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onReady);
      window.clearTimeout(fallback);
      if (readyFrame !== undefined) window.cancelAnimationFrame(readyFrame);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Loading splash: homepage only */}
      {loader && !videoLoaded && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/logo.png"
              alt="Magimatix"
              width={200}
              height={57}
              className="h-10 md:h-14 w-auto"
              priority
            />
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="loading-dot" />
                <span className="loading-dot" style={{ animationDelay: "0.2s" }} />
                <span className="loading-dot" style={{ animationDelay: "0.4s" }} />
              </div>
              <p className="text-sm text-zinc-500 tracking-widest uppercase font-mono">
                Loading your experience
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background video: 720p H.264 for all devices */}
      <video
        ref={videoRef}
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/bg-video-0605.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/55 z-[1] pointer-events-none h-[100vh] h-[100lvh]" />

      {/* Navigation */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 md:px-6 md:py-1 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Magimatix"
              width={140}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-glow text-sm font-medium px-5 py-2.5 rounded-full text-white"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden px-6 pb-5 pt-1 space-y-3 border-t border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
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
              Get in Touch →
            </Link>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 py-5 md:py-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Magimatix"
                width={200}
                height={57}
                className="h-6 md:h-7 w-auto"
              />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} Magimatix LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
