import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware disabled - protection is handled at the page level
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Don't run on any routes
export const config = {
  matcher: [],
}
