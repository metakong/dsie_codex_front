import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for VPS self-hosting — bundles a portable Node.js server into .next/standalone
  output: "standalone",

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            // Tighten/expand per embed needs in Phase 4. Any 'unsafe-*' addition must be justified in SECURITY_POLICY.md before merge.
            value:
              "default-src 'self'; " +
              "frame-src 'self' https://cal.com https://*.cal.com; " +
              "style-src 'self' fonts.googleapis.com; " +
              "font-src 'self' fonts.gstatic.com; " +
              "script-src 'self'; " +
              "img-src 'self' data: https:; " +
              "connect-src 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
