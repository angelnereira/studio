import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Proxy function - protection is handled at the page level
export function proxy(request: NextRequest) {
  return NextResponse.next()
}

// Don't run on any routes
export const config = {
  matcher: [],
}
