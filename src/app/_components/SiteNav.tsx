import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#web-design", label: "Web Design" },
  { href: "/#ai-services", label: "AI Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function SiteNav() {
  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Magimatix"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-base font-semibold tracking-tight">
            Magimatix
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn-glow inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold text-white"
          >
            Contact
          </Link>
        </div>
        <Link
          href="/#contact"
          className="md:hidden btn-glow inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold text-white"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
