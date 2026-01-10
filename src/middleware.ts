import { auth } from "@/auth"
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPanel = req.nextUrl.pathname.startsWith('/admin');
  const isOnLoginPage = req.nextUrl.pathname === '/admin/login';

  // Allow access to login page always
  if (isOnLoginPage) {
    return NextResponse.next();
  }

  // Protect admin routes (except login)
  if (isOnAdminPanel && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
