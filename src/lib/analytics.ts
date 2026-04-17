import { redis } from './redis';

export interface TrackingData {
  path: string;
  referrer?: string;
  device?: string;
  browser?: string;
  os?: string;
  screen?: string;
  language?: string;
  country?: string;
  visitorId?: string;
}

export interface AnalyticsSummary {
  totalVisits: number;
  dailyViews: number;
  activeVisitors: number;
  popularPages: { path: string; views: number }[];
  devices: Record<string, number>;
  browsers: Record<string, number>;
  os: Record<string, number>;
  referrers: Record<string, number>;
  countries: Record<string, number>;
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export async function trackPageView(
  data: TrackingData,
): Promise<{ previousCount: number; newCount: number } | null> {
  if (!redis) return null;

  try {
    const pipeline = redis.pipeline();

    pipeline.hincrby('analytics:views', data.path, 1);
    pipeline.incr('analytics:total_visits');
    pipeline.incr(`analytics:daily:${todayKey()}`);
    pipeline.expire(`analytics:daily:${todayKey()}`, 86400 * 2);
    pipeline.zincrby('analytics:popular', 1, data.path);

    if (data.device) pipeline.hincrby('analytics:devices', data.device, 1);
    if (data.browser) pipeline.hincrby('analytics:browsers', data.browser, 1);
    if (data.os) pipeline.hincrby('analytics:os', data.os, 1);
    if (data.referrer) pipeline.hincrby('analytics:referrers', data.referrer, 1);
    if (data.country) pipeline.hincrby('analytics:countries', data.country, 1);
    if (data.screen) pipeline.hincrby('analytics:screens', data.screen, 1);
    if (data.language) pipeline.hincrby('analytics:languages', data.language, 1);

    if (data.visitorId) {
      pipeline.zadd('analytics:visitors', Date.now(), data.visitorId);
    }

    const results = await pipeline.exec();

    const newCount = (results?.[1]?.[1] as number) ?? 0;
    return { previousCount: newCount - 1, newCount };
  } catch {
    return null;
  }
}

export async function getPageViews(path: string): Promise<number> {
  if (!redis) return 0;
  try {
    const val = await redis.hget('analytics:views', path);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export async function getTotalSiteVisits(): Promise<number> {
  if (!redis) return 0;
  try {
    const val = await redis.get('analytics:total_visits');
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export async function getPopularPages(
  limit = 10,
): Promise<{ path: string; views: number }[]> {
  if (!redis) return [];
  try {
    const results = await redis.zrevrange('analytics:popular', 0, limit - 1, 'WITHSCORES');
    const pages: { path: string; views: number }[] = [];
    for (let i = 0; i < results.length; i += 2) {
      pages.push({ path: results[i], views: parseInt(results[i + 1], 10) });
    }
    return pages;
  } catch {
    return [];
  }
}

export async function trackVisitor(visitorId: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.zadd('analytics:visitors', Date.now(), visitorId);
  } catch {
    // silent
  }
}

export async function getActiveVisitors(): Promise<number> {
  if (!redis) return 0;
  try {
    const fiveMinAgo = Date.now() - 5 * 60 * 1000;
    await redis.zremrangebyscore('analytics:visitors', '-inf', fiveMinAgo);
    return await redis.zcard('analytics:visitors');
  } catch {
    return 0;
  }
}

export async function getDailyViews(): Promise<number> {
  if (!redis) return 0;
  try {
    const val = await redis.get(`analytics:daily:${todayKey()}`);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

async function getHashStats(key: string): Promise<Record<string, number>> {
  if (!redis) return {};
  try {
    const all = await redis.hgetall(key);
    const result: Record<string, number> = {};
    for (const [k, v] of Object.entries(all)) {
      result[k] = parseInt(v, 10);
    }
    return result;
  } catch {
    return {};
  }
}

export const getDeviceStats = () => getHashStats('analytics:devices');
export const getBrowserStats = () => getHashStats('analytics:browsers');
export const getOsStats = () => getHashStats('analytics:os');
export const getReferrerStats = () => getHashStats('analytics:referrers');
export const getCountryStats = () => getHashStats('analytics:countries');

export async function getFullAnalytics(): Promise<AnalyticsSummary> {
  const [
    totalVisits,
    dailyViews,
    activeVisitors,
    popularPages,
    devices,
    browsers,
    os,
    referrers,
    countries,
  ] = await Promise.all([
    getTotalSiteVisits(),
    getDailyViews(),
    getActiveVisitors(),
    getPopularPages(10),
    getDeviceStats(),
    getBrowserStats(),
    getOsStats(),
    getReferrerStats(),
    getCountryStats(),
  ]);

  return {
    totalVisits,
    dailyViews,
    activeVisitors,
    popularPages,
    devices,
    browsers,
    os,
    referrers,
    countries,
  };
}
