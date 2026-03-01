import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip intl middleware for admin routes and API routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
        return;
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all routes except Next.js internals, static files, and API
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)).*)',
    ]
};
