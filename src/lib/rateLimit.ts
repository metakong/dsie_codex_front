export interface RateLimitStore {
  check(key: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }>;
}

export const LIMIT = 3;
export const WINDOW_MS = 86_400_000; // 24-hour window
export const OVER_LIMIT_MESSAGE = "Come back tomorrow for another free analysis";

interface RateLimitRecord {
  timestamps: number[];
}

/**
 * Concrete in-memory store suitable for local development and single-instance VPS deployments.
 * NOTE: For multi-instance production environments, this interface should be implemented using
 * a shared store like Redis (e.g., Upstash Redis or self-hosted Redis on the VPS).
 */
export class InMemoryRateLimitStore implements RateLimitStore {
  private cache = new Map<string, RateLimitRecord>();

  async check(key: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    const now = Date.now();
    const record = this.cache.get(key) || { timestamps: [] };

    // Clean up timestamps outside the current 24-hour window
    const windowStart = now - WINDOW_MS;
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length < LIMIT) {
      record.timestamps.push(now);
      this.cache.set(key, record);
      
      // Calculate reset time based on the oldest timestamp in the active window
      const oldestActive = record.timestamps[0];
      const resetAt = oldestActive + WINDOW_MS;

      return {
        allowed: true,
        remaining: LIMIT - record.timestamps.length,
        resetAt,
      };
    }

    // Limit exceeded
    const oldestTimestamp = record.timestamps[0];
    const resetAt = oldestTimestamp + WINDOW_MS;

    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }
}

// Single instanced in-memory store for the application
export const defaultRateLimitStore = new InMemoryRateLimitStore();

/**
 * Extract the client's real IP address from request headers.
 * Behind Nginx, Cloudflare, or other reverse proxies on a self-hosted VPS,
 * the real client IP is forwarded via the 'x-forwarded-for' header.
 * 
 * VPS MIGRATION NOTE: In production behind Nginx/Cloudflare, verify that the reverse proxy
 * is correctly configured to set 'x-forwarded-for' and 'x-real-ip'.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain a comma-separated chain of IPs. The first element is the client.
    const ip = forwardedFor.split(",")[0].trim();
    if (ip) return ip;
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Fallback if no proxy headers are present (e.g. direct local development request)
  return "127.0.0.1";
}
