import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  // Permanent redirects from the old /data and /daita product routes to the new
  // /data-daemon route. Keeps existing links and in-flight Stripe success/cancel
  // URLs pointing at valid pages after the rename.
  //
  // NOTE: product screenshots are served as static files from public/data/*.png
  // at /data/*.png. The :path* matcher below excludes any segment containing a
  // dot so those image requests are NOT redirected (which would 404 them).
  async redirects() {
    return [
      {
        source: "/forum",
        destination: "https://forum.magimatix.com/",
        permanent: false,
      },
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
        // The $5 Field Debrief was removed from the site entirely (2026-10-23).
        // Old inbound links and search results land on the homepage chooser
        // instead of a 404.
        source: "/field-debrief",
        destination: "/",
        permanent: true,
      },
      {
        source: "/field-debrief/:path*",
        destination: "/",
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
        source: "/downloads/DATA-Mac-Setup.txt",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="DATA-Mac-Setup.txt"',
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        // Apply to all routes: reinforces canonical and prevents
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
