import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "AI Services" },
  { href: "/websites", label: "Websites" },
  { href: "/data-daemon", label: "DATA DAEMON" },
  { href: "/field-debrief", label: "Field Debrief" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-12 md:mt-24 px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Magimatix LLC. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
