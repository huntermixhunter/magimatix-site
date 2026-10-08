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
    default: "Magimatix | AI Automations & Web Design",
    template: "%s | Magimatix",
  },
  description:
    "Magimatix builds AI automations and premium websites that transform businesses. Workflow automation, AI chatbots, data analytics, custom web design, e-commerce, and UI/UX, all crafted with precision.",
  keywords: [
    "AI automation agency",
    "workflow automation",
    "AI chatbots for business",
    "business automation",
    "AI solutions for business",
    "AI powered websites",
    "digital agency",
    "Magimatix",
    "web design agency",
    "custom website design",
    "e-commerce website",
    "UI UX design services",
    "web development services",
    "small business website",
    "landing page design",
    "web design Idaho",
    "website design services",
    "business website",
    "web design Sandpoint Idaho",
    "web designer Sandpoint Idaho",
    "website design Sandpoint",
    "AI automation Sandpoint Idaho",
    "small business website Sandpoint",
    "web design North Idaho",
    "website design Bonner County",
    "web design Coeur d'Alene",
    "web design Bonners Ferry",
    "digital agency North Idaho",
    "Sandpoint Idaho web developer",
    "local web design Idaho",
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
    title: "Magimatix | AI Automations & Web Design",
    description:
      "AI automations and premium websites that transform your business. Modern, high-performance digital experiences crafted with precision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magimatix | AI Automations & Web Design",
    description:
      "AI automations and premium websites that transform your business.",
    creator: "@magimatix",
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "US-ID",
    "geo.placename": "Sandpoint, Idaho",
    "geo.position": "48.2766;-116.5535",
    ICBM: "48.2766, -116.5535",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Magimatix",
    url: siteUrl,
    description: "Premium AI automation and web design agency. Workflow automation, AI chatbots, custom websites, and e-commerce for businesses worldwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Magimatix",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/opengraph-image`,
    description:
      "Magimatix builds AI automations and premium websites that transform businesses. We specialize in workflow automation, AI chatbots, data analytics, custom web design, e-commerce, and UI/UX design for businesses worldwide.",
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Coeur d'Alene, Idaho, USA",
    },
    priceRange: "$$",
    serviceType: [
      "AI Automation",
      "Workflow Automation",
      "AI Chatbots",
      "Data Analytics",
      "Web Design",
      "E-Commerce",
      "UI/UX Design",
      "SEO Optimization",
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
      { "@type": "City", name: "Sandpoint", containedIn: { "@type": "State", name: "Idaho" } },
      { "@type": "City", name: "Coeur d'Alene", containedIn: { "@type": "State", name: "Idaho" } },
      { "@type": "City", name: "Bonners Ferry", containedIn: { "@type": "State", name: "Idaho" } },
      { "@type": "City", name: "Priest River", containedIn: { "@type": "State", name: "Idaho" } },
      { "@type": "City", name: "Hope", containedIn: { "@type": "State", name: "Idaho" } },
      { "@type": "City", name: "Ponderay", containedIn: { "@type": "State", name: "Idaho" } },
      { "@type": "City", name: "Spokane", containedIn: { "@type": "State", name: "Washington" } },
      {
        "@type": "AdministrativeArea",
        name: "Bonner County, Idaho",
      },
      {
        "@type": "AdministrativeArea",
        name: "North Idaho",
      },
    ],
    knowsAbout: [
      "AI Automation",
      "Machine Learning",
      "Business Automation",
      "Chatbot Development",
      "Data Analytics",
      "Web Design",
      "UI/UX Design",
      "E-Commerce",
      "Search Engine Optimization",
      "React",
      "Next.js",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/contact`,
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Magimatix Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Workflow Automation",
            description: "Intelligent AI workflows that eliminate repetitive tasks and streamline operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Chatbots & Agents",
            description: "Custom AI that handles customer support, sales, and scheduling 24/7 across all channels.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data & Analytics",
            description: "AI-powered dashboards and predictive analytics that turn raw data into actionable insights.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Solutions",
            description: "Tailored machine learning models and AI integrations built for your specific business processes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Websites",
            description: "Bespoke websites built from the ground up to reflect your brand and convert visitors into customers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce",
            description: "High-converting online stores with seamless checkout flows and payment integrations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description: "Research-driven interfaces optimized for engagement, usability, and conversions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Performance",
            description: "Core Web Vitals optimization and search engine visibility built into every project.",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Magimatix",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/opengraph-image`,
    description:
      "Magimatix is a web design and AI automation agency based in Sandpoint, Idaho. We build premium websites and AI-powered systems for small businesses across North Idaho, Bonner County, and beyond.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sandpoint",
      addressRegion: "ID",
      postalCode: "83864",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.2766,
      longitude: -116.5535,
    },
    areaServed: [
      { "@type": "City", name: "Sandpoint" },
      { "@type": "City", name: "Ponderay" },
      { "@type": "City", name: "Bonners Ferry" },
      { "@type": "City", name: "Priest River" },
      { "@type": "City", name: "Hope" },
      { "@type": "City", name: "Clark Fork" },
      { "@type": "City", name: "Coeur d'Alene" },
      { "@type": "AdministrativeArea", name: "Bonner County, Idaho" },
      { "@type": "AdministrativeArea", name: "North Idaho" },
    ],
    serviceType: [
      "AI Automation",
      "Workflow Automation",
      "AI Chatbots",
      "Web Design",
      "E-Commerce",
      "UI/UX Design",
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/contact`,
      areaServed: ["Sandpoint", "North Idaho", "US"],
      availableLanguage: "English",
    },
  },

];

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
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
