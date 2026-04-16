import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/routing';
import { NextRequest, NextResponse } from 'next/server';

// Regex that matches exactly the /en or /en/... prefix — prevents false
// positives on paths like /enquiries or /english-tips.
const EN_PREFIX_RE = /^\/en(\/|$)/;

const LOCALE_COOKIE = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin and API routes bypass i18n entirely.
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Run next-intl's locale middleware — this handles detection, rewrites
    // and redirects based on the URL prefix, Accept-Language header and the
    // NEXT_LOCALE cookie.
    const response = intlMiddleware(request) ?? NextResponse.next();

    // Persist the resolved locale in a long-lived cookie so that returning
    // visitors who type the bare domain URL are redirected to their preferred
    // language. The URL prefix takes precedence; fall back to the existing
    // cookie, then to the default locale.
    const localeFromPath = EN_PREFIX_RE.test(pathname) ? 'en' : null;
    const localeFromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const activeLocale = localeFromPath ?? localeFromCookie ?? routing.defaultLocale;

    response.cookies.set(LOCALE_COOKIE, activeLocale, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)).*)',
    ],
};
