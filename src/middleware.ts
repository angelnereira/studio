import { auth } from "@/auth"
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Never protect these paths
  const publicAdminPaths = ['/admin/login', '/admin/verify-request'];
  if (publicAdminPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Only run middleware on admin routes
  matcher: ['/admin/:path*'],
};
