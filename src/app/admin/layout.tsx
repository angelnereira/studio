
// Root admin layout - just passes children
// Authentication is handled by the (dashboard) layout for protected routes
// and (auth) layout for login/verify-request pages

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
