import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const CANONICAL_ORIGIN = "https://magimatix.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  // If this robots.txt is being served from a non-canonical host
  // (e.g. *.vercel.app), disallow everything so Google ignores it
  if (host !== "magimatix.com" && host !== "") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
  };
}
