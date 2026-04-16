// Minimal root layout required by Next.js App Router when using next-intl
// with the [locale] routing pattern. The actual <html>, <body>, providers
// and locale setup live in src/app/[locale]/layout.tsx.
// See: https://next-intl-docs.vercel.app/docs/getting-started/app-router

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
