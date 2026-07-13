import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone" removed — was required for VPS/Node.js self-hosting.
  // Cloudflare Workers deployment via @opennextjs/cloudflare manages its own output (.open-next/).
  // Re-add only if reverting to Hetzner VPS deployment path.

  async headers() {
    // Security headers apply in production only.
    // Next.js dev mode uses eval() in webpack bundles for HMR and source maps,
    // which violates script-src 'self' and prevents React from hydrating.
    // In dev, the browser blocks those scripts, event handlers never attach,
    // and forms fall back to native HTML submission (page reload = "text clears").
    // All security headers are safe to omit locally — they protect the live VPS deployment.
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

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
            // Tighten/expand per embed needs in Phase 4.
            // Any 'unsafe-*' addition must be justified in SECURITY_POLICY.md before merge.
            value:
              "default-src 'self'; " +
              "frame-src 'self' https://cal.com https://*.cal.com; " +
              "style-src 'self' https://fonts.googleapis.com; " +
              "font-src 'self' https://fonts.gstatic.com; " +
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
