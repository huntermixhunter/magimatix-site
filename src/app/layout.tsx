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
    "web design agency",
    "AI automation agency",
    "custom website design",
    "e-commerce website",
    "UI UX design services",
    "workflow automation",
    "AI chatbots for business",
    "digital agency",
    "Magimatix",
    "web development services",
    "business automation",
    "small business website",
    "landing page design",
    "AI solutions for business",
    "web design Idaho",
    "website design services",
    "business website",
    "AI powered websites",
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
    description: "Premium web design and AI automation agency. Custom websites, e-commerce, AI chatbots, and workflow automation for businesses worldwide.",
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
      "Magimatix builds premium websites and AI automations that transform businesses. We specialize in custom web design, e-commerce, UI/UX design, workflow automation, AI chatbots, and data analytics for businesses worldwide.",
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Coeur d'Alene, Idaho, USA",
    },
    priceRange: "$$",
    serviceType: [
      "Web Design",
      "AI Automation",
      "E-Commerce",
      "UI/UX Design",
      "Workflow Automation",
      "AI Chatbots",
      "Data Analytics",
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
      "Web Design",
      "AI Automation",
      "Machine Learning",
      "UI/UX Design",
      "E-Commerce",
      "Search Engine Optimization",
      "Business Automation",
      "Chatbot Development",
      "Data Analytics",
      "React",
      "Next.js",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/#contact`,
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
      "Web Design",
      "AI Automation",
      "E-Commerce",
      "UI/UX Design",
      "Workflow Automation",
      "AI Chatbots",
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/#contact`,
      areaServed: ["Sandpoint", "North Idaho", "US"],
      availableLanguage: "English",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What web design services does Magimatix offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Magimatix offers custom website design, e-commerce development, UI/UX design, SEO and performance optimization, and complete brand identity for businesses of all sizes.",
        },
      },
      {
        "@type": "Question",
        name: "What AI automation services does Magimatix provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Magimatix builds workflow automation systems, AI chatbots and agents, data analytics dashboards, and custom machine learning integrations tailored to your specific business processes.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a custom website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most Magimatix websites are completed in 2–6 weeks depending on complexity. The process includes discovery, design, development, and launch — with your input at every stage.",
        },
      },
      {
        "@type": "Question",
        name: "Does Magimatix work with small businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Magimatix works with small businesses, startups, and established companies. Every project is custom-built to fit your specific goals and budget.",
        },
      },
      {
        "@type": "Question",
        name: "Can Magimatix help my business with AI automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Magimatix designs and implements AI automations for customer support, lead generation, workflow management, and data processing — reducing manual work and increasing operational efficiency.",
        },
      },
      {
        "@type": "Question",
        name: "Does Magimatix work with businesses in Sandpoint and North Idaho?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Magimatix is based in Sandpoint, Idaho and works with small businesses throughout Bonner County and North Idaho, including Sandpoint, Ponderay, Bonners Ferry, Priest River, Hope, Coeur d'Alene, and the greater Spokane area.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to be local to hire Magimatix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — while Magimatix is based in Sandpoint, Idaho and serves North Idaho businesses, we work with clients across the United States and internationally. Everything is handled remotely with clear communication at every stage.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a website cost from Magimatix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Website pricing at Magimatix depends on your goals, features, and complexity. Most small business websites start around $1,500–$3,500. E-commerce stores, booking systems, and custom web apps are priced per project. Contact us for a free estimate — we work to fit real budgets.",
        },
      },
      {
        "@type": "Question",
        name: "Does Magimatix offer website maintenance and ongoing support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Magimatix offers post-launch support, content updates, performance monitoring, and ongoing maintenance. Whether you need a quick fix or a monthly retainer, we keep your site fast, secure, and up to date.",
        },
      },
      {
        "@type": "Question",
        name: "Can Magimatix redesign my existing website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Magimatix specializes in website redesigns — taking outdated or underperforming sites and rebuilding them with modern design, faster load times, and better SEO. We can work with your existing content or help you start fresh.",
        },
      },
      {
        "@type": "Question",
        name: "Does Magimatix help with SEO and Google search rankings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every Magimatix website is built with on-page SEO from the start — structured data, meta tags, fast load times, and local business schema. We also offer SEO strategy for businesses in Sandpoint, Coeur d'Alene, and across North Idaho who want to rank higher in local search.",
        },
      },
      {
        "@type": "Question",
        name: "Does Magimatix build e-commerce websites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Magimatix builds custom e-commerce stores with product catalogs, payment processing, inventory management, and mobile-optimized checkout. Whether you are selling products locally in North Idaho or shipping nationwide, we build stores that convert.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started working with Magimatix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book a free 30-minute discovery call so we can learn your business, goals, and bottlenecks. A few days later we come back with a custom deck mapping the recommended build and the price. No pressure, no templated solutions.",
        },
      },
    ],
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
