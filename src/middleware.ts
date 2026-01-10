
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('authjs.session-token')?.value;

  // Simple check for existence of session token for admin routes
  // The real protection happens in the page/component or via next-auth middleware helper
  if (!currentUser && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return Response.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
