import type { Metadata, Viewport } from 'next';
import './globals.css';
import { RootLayoutClient } from '@/components/root-layout-client';

// SEO Metadata optimizada para Ingeniero de Software Full Stack FinTech
export const metadata: Metadata = {
  metadataBase: new URL('https://angelnereira.com'),
  title: {
    default: 'Ángel Nereira | Ingeniero de Software Full Stack & Desarrollador FinTech',
    template: '%s | Ángel Nereira - Full Stack Developer',
  },
  description: 'Ángel Nereira: Ingeniero de Software Full Stack especializado en Next.js, TypeScript y PostgreSQL. Desarrollo de soluciones SaaS FinTech (Facturación Electrónica) y E-commerce escalables. Creador de Sago One.',
  keywords: [
    'Desarrollador Full Stack Panamá',
    'Ingeniero de Software FinTech',
    'Desarrollador SaaS',
    'Experto Next.js Panamá',
    'PWA Offline-First Developer',
    'Integración Facturación Electrónica DGI API',
    'Desarrollador PostgreSQL Prisma',
    'React Developer',
    'Sago One',
    'Plenty Market',
    'TypeScript Developer',
    'React Server Components',
    'Neon Database',
    'Vercel Deployment',
  ],
  authors: [{ name: 'Ángel Nereira', url: 'https://angelnereira.com' }],
  creator: 'Ángel Nereira',
  publisher: 'Ángel Nereira',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    alternateLocale: 'en_US',
    url: 'https://angelnereira.com',
    siteName: 'Ángel Nereira - Full Stack Developer',
    title: 'Ángel Nereira | Ingeniero de Software Full Stack & Desarrollador FinTech',
    description: 'Especialista en ecosistemas Next.js, aplicaciones PWA Offline-First y soluciones SaaS escalables. Creador de Sago One.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ángel Nereira - Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ángel Nereira | Ingeniero de Software Full Stack',
    description: 'Especialista en Next.js, PWA y soluciones SaaS FinTech. Creador de Sago One.',
    creator: '@angelnereira',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://angelnereira.com',
    languages: {
      'es-PA': 'https://angelnereira.com',
      'en-US': 'https://angelnereira.com/en',
    },
  },
  category: 'technology',
  verification: {
    google: 'verification_token',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Geist+Sans:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ángel Nereira',
              jobTitle: 'Full Stack Software Engineer',
              description: 'Ingeniero de Software Full Stack especializado en Next.js, TypeScript y PostgreSQL. Desarrollo de soluciones SaaS FinTech.',
              url: 'https://angelnereira.com',
              sameAs: [
                'https://github.com/angelnereira',
                'https://linkedin.com/in/angelnereira',
              ],
              knowsAbout: [
                'Next.js',
                'TypeScript',
                'PostgreSQL',
                'Prisma ORM',
                'PWA Development',
                'FinTech SaaS',
                'Electronic Invoicing',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Sago One',
                url: 'https://sagoone.com',
              },
            }),
          }}
        />
      </head>
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
}
