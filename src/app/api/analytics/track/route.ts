import { NextRequest, NextResponse } from 'next/server';
import { trackPageView, trackVisitor } from '@/lib/analytics';
import { rateLimit } from '@/lib/rate-limit';

function parseDevice(ua: string): string {
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|iphone|android.*mobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/opr\//i.test(ua) || /opera/i.test(ua)) return 'Opera';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  return 'Other';
}

function parseOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows';
  if (/macintosh|mac os/i.test(ua)) return 'macOS';
  if (/iphone|ipad/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

function parseReferrerSource(referrer: string): string {
  if (!referrer) return 'direct';
  try {
    const host = new URL(referrer).hostname;
    if (/google\./i.test(host)) return 'Google';
    if (/linkedin\./i.test(host)) return 'LinkedIn';
    if (/github\./i.test(host)) return 'GitHub';
    if (/twitter\.|x\.com/i.test(host)) return 'X/Twitter';
    if (/facebook\./i.test(host)) return 'Facebook';
    if (/instagram\./i.test(host)) return 'Instagram';
    if (/youtube\./i.test(host)) return 'YouTube';
    if (/bing\./i.test(host)) return 'Bing';
    return host;
  } catch {
    return 'direct';
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const { allowed } = await rateLimit(ip, 'analytics', 120, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'rate limited' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const ua = request.headers.get('user-agent') ?? '';

  const country =
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry') ??
    body.country ??
    'Unknown';

  const result = await trackPageView({
    path: body.path ?? '/',
    referrer: parseReferrerSource(body.referrer ?? ''),
    device: parseDevice(ua),
    browser: parseBrowser(ua),
    os: parseOS(ua),
    screen: body.screen ?? '',
    language: body.language ?? '',
    country,
    visitorId: body.visitorId,
  });

  if (body.visitorId) {
    await trackVisitor(body.visitorId);
  }

  return NextResponse.json({
    ok: true,
    previousCount: result?.previousCount ?? 0,
    newCount: result?.newCount ?? 0,
  });
}
