import { NextResponse, NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { 
  matcher: '/welcome' 
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const greeting: string | undefined = await get('greeting');
  
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(greeting);
}