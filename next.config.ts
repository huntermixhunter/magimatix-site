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

  // www → non-www redirect handled in middleware.ts (edge, faster)
};

export default nextConfig;
