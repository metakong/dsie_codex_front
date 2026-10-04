// Cloudflare environment bindings declaration
declare global {
  interface CloudflareEnv {
    DB?: D1Database;
    GOOGLE_WEBHOOK_URL?: string;
  }
}

export {};
