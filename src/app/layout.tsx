import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://magimatix.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Magimatix | Web Design & AI Automations",
    template: "%s | Magimatix",
  },
  description:
    "Magimatix builds premium websites and AI automations that transform businesses. Custom web design, e-commerce, UI/UX, workflow automation, AI chatbots, and data analytics — all crafted with precision.",
  keywords: [
    "web design",
    "AI automation",
    "custom websites",
    "e-commerce",
    "UI UX design",
    "workflow automation",
    "AI chatbots",
    "digital agency",
    "Magimatix",
    "web development",
    "business automation",
    "Next.js",
  ],
  authors: [{ name: "Magimatix", url: siteUrl }],
  creator: "Magimatix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Magimatix",
    title: "Magimatix | Web Design & AI Automations",
    description:
      "Premium websites and AI automations that transform your business. Modern, high-performance digital experiences crafted with precision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magimatix | Web Design & AI Automations",
    description:
      "Premium websites and AI automations that transform your business.",
    creator: "@magimatix",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Magimatix",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Magimatix builds premium websites and AI automations that transform businesses.",
  foundingDate: "2025",
  serviceType: ["Web Design", "AI Automation", "E-Commerce", "UI/UX Design"],
  areaServed: "Worldwide",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
