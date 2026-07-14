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
    // All security headers are safe to omit locally — they protect the live Cloudflare Workers deployment.
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
            //
            // script-src REQUIRES 'unsafe-inline': the Next.js App Router hydrates
            // statically prerendered pages via inline <script>self.__next_f.push(...)</script>
            // tags. With bare script-src 'self', the browser blocks those scripts, React
            // never hydrates, and every client interaction (mobile menu, demo tool, forms)
            // silently dies in production. A nonce-based CSP is the stricter alternative,
            // but nonces require per-request dynamic rendering of every page, which defeats
            // static prerendering on Cloudflare Workers. 'self' still blocks all cross-origin
            // script loads; the residual risk (inline script injection) requires an XSS hole
            // in a site that renders no user-generated content.
            //
            // Google Fonts origins removed: next/font self-hosts all font files at build
            // time, so nothing is ever fetched from fonts.googleapis.com / fonts.gstatic.com.
            value:
              "default-src 'self'; " +
              "frame-src 'self' https://cal.com https://*.cal.com; " +
              "style-src 'self'; " +
              "font-src 'self'; " +
              "script-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https:; " +
              "connect-src 'self'; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'self'; " +
              "upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
