import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-24 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Magimatix LLC. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
