# Security Standards

## Authentication & Authorization

- ALL admin routes must be protected. Verify auth middleware exists before modifying admin pages.
- API routes must validate session on every request (no client-side trust).
- Use Next.js middleware for route protection, not page-level checks.

## Rate Limiting (REQUIRED for these routes)

- /api/cv/download → max 10 requests/IP/hour
- /api/contact → max 5 requests/IP/hour  
- /api/admin/* → max 100 requests/IP/hour
- Use Upstash Redis + @upstash/ratelimit if not already implemented

## File Security

- PDF files (CV) must NEVER be in /public directory
- Serve sensitive files ONLY via API routes with proper auth/rate-limiting
- PDFs must be served with headers:
  Content-Type: application/pdf
  Content-Disposition: attachment; filename="..."
  X-Content-Type-Options: nosniff

## Security Headers (next.config.js)

Ensure these headers are configured:

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

## Environment Variables

- NEVER commit .env files
- NEVER expose server-side secrets to the client bundle
- Prefix client-safe vars with NEXT_PUBLIC_
- Document all required env vars in .env.example
