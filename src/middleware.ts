import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const intlMiddleware = createMiddleware({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix: 'as-needed',
    localeDetection: true,
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip intl middleware for admin routes and API routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
        return;
    }

    const response = intlMiddleware(request) ?? NextResponse.next();

    // Determine the active locale: explicit URL prefix takes precedence,
    // then fall back to the existing cookie value.
    const localeFromPath = pathname.startsWith('/en') ? 'en' : null;
    const localeFromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const activeLocale = localeFromPath ?? localeFromCookie ?? 'es';

    // Persist the locale preference with a long-lived cookie so that
    // returning visitors who type the root URL are redirected correctly.
    response.cookies.set(LOCALE_COOKIE, activeLocale, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}

export const config = {
    // Match all routes except Next.js internals, static files, and API
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)).*)',
    ],
};
