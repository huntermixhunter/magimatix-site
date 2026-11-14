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
    default: "Magimatix | Custom Dashboards, AI & Websites",
    template: "%s | Magimatix",
  },
  description:
    "Custom dashboards, AI automations, and websites for businesses and individuals. Magimatix brings your projects, data, and tools into systems built around you.",
  keywords: [
    "custom dashboards",
    "business dashboards",
    "personal dashboards",
    "custom client portals",
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
    title: "Magimatix | Custom Dashboards, AI & Websites",
    description:
      "Custom dashboards, AI automations, and websites for businesses and individuals. Your projects, data, and tools, brought together around you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magimatix | Custom Dashboards, AI & Websites",
    description:
      "Custom dashboards, AI automations, and websites for businesses and individuals. Built around how you work.",
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
    description: "Custom dashboards, AI automation, and web design for businesses and individuals. Connected workspaces built around how you work.",
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
      "Magimatix designs and builds custom dashboards, AI automations, and websites for businesses and individuals. Business operations, client portals, personal workspaces, and connected tools.",
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Coeur d'Alene, Idaho, USA",
    },
    priceRange: "$$",
    serviceType: [
      "Custom Dashboard Development",
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
      "Custom Dashboards",
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
            name: "Custom Dashboards",
            description: "Custom dashboards for businesses and individuals, connecting projects, data, apps, and optional AI in one workspace.",
            url: `${siteUrl}/dashboards`,
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
      "Magimatix builds custom dashboards, websites, and AI systems for businesses and individuals. Based in Sandpoint, Idaho, serving North Idaho and clients worldwide.",
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
      "Custom Dashboard Development",
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
