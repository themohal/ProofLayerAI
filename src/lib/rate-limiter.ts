// Simple in-memory rate limiter (use Redis in production for multi-instance)
const requests = new Map<string, { count: number; resetAt: number }>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  starter: { maxRequests: 20, windowMs: 60000 },    // 20/min
  pro: { maxRequests: 100, windowMs: 60000 },       // 100/min
  growth: { maxRequests: 500, windowMs: 60000 },    // 500/min
  enterprise: { maxRequests: 2000, windowMs: 60000 }, // 2000/min
};

export function checkRateLimit(
  key: string,
  plan: string
): { allowed: boolean; remaining: number; resetAt: number } {
  const config = RATE_LIMITS[plan] || RATE_LIMITS.starter;
  const now = Date.now();

  const entry = requests.get(key);

  if (!entry || now > entry.resetAt) {
    requests.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt };
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of requests.entries()) {
    if (now > entry.resetAt) {
      requests.delete(key);
    }
  }
}, 60000);
