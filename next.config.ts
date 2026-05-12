import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  async headers() {
    return [
      {
        // Apply to all routes — reinforces canonical and prevents
        // Vercel alias domains (*.vercel.app) from being indexed
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        // Only apply to non-canonical hosts
        has: [
          {
            type: "host",
            value: "(?!magimatix\\.com$).*",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        // Redirect www to non-www (permanent 308)
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.magimatix.com",
          },
        ],
        destination: "https://magimatix.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
