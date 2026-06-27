import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  // Permanent redirects from the old /data and /daita product routes to the new
  // /data-daemon route. Keeps existing links — and any in-flight Stripe
  // success/cancel URLs still pointed at the old paths — from 404ing after the
  // rename.
  //
  // NOTE: product screenshots are served as static files from public/data/*.png
  // at /data/*.png. The :path* matcher below excludes any segment containing a
  // dot so those image requests are NOT redirected (which would 404 them).
  async redirects() {
    return [
      {
        source: "/data",
        destination: "/data-daemon",
        permanent: true,
      },
      {
        // Match only non-file sub-paths (no "." in the final segment) so the
        // public/data/*.png assets keep resolving.
        source: "/data/:path((?!.*\\.).*)",
        destination: "/data-daemon/:path",
        permanent: true,
      },
      {
        source: "/daita",
        destination: "/data-daemon",
        permanent: true,
      },
      {
        source: "/daita/:path*",
        destination: "/data-daemon/:path*",
        permanent: true,
      },
    ];
  },

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
