import { redis } from './redis';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export async function rateLimit(
  ip: string,
  action: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (!redis) {
    return { allowed: true, remaining: limit, resetAt: 0 };
  }

  const key = `rate:${action}:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const resetAt = now + windowSeconds;

  try {
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);
    const results = await pipeline.exec();

    const count = (results?.[0]?.[1] as number) ?? 1;
    const ttl = (results?.[1]?.[1] as number) ?? -1;

    if (ttl === -1) {
      await redis.expire(key, windowSeconds);
    }

    const allowed = count <= limit;
    const remaining = Math.max(0, limit - count);

    return { allowed, remaining, resetAt };
  } catch {
    return { allowed: true, remaining: limit, resetAt: 0 };
  }
}
