// Middleware disabled temporarily due to NextAuth v5 beta edge runtime issues
// Protection is handled at the page level instead
export { default } from 'next-auth/middleware'

export const config = {
  matcher: [], // Disable middleware
}
