import type { Metadata, Viewport } from 'next';
import './globals.css';
import { RootLayoutClient } from '@/components/root-layout-client';
import { BackgroundAnimation } from '@/components/ui/background-animation';
import { GlobalEasterEggs } from '@/components/global-easter-eggs';

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
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Geist+Sans:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data - JSON-LD */}
        {/* Structured Data - JSON-LD optimized for AI Agents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': 'https://angelnereira.com/#person',
                name: 'Ángel Nereira',
                jobTitle: 'Full Stack Software Engineer',
                description: 'Ingeniero de Software Full Stack especializado en Next.js, TypeScript y PostgreSQL. Desarrollo de soluciones SaaS FinTech.',
                url: 'https://angelnereira.com',
                image: 'https://angelnereira.com/og-image.png',
                sameAs: [
                  'https://github.com/angelnereira',
                  'https://linkedin.com/in/angelnereira',
                  'https://twitter.com/angelnereira',
                ],
                knowsAbout: [
                  'Next.js', 'React', 'TypeScript', 'Node.js',
                  'PostgreSQL', 'Prisma ORM', 'Deep Learning',
                  'PWA Development', 'SaaS Architecture', 'FinTech Security',
                  'Electronic Invoicing Integration'
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                '@id': 'https://angelnereira.com/#service',
                name: 'Ángel Nereira Studio',
                description: 'Development studio specializing in high-performance web applications, FinTech solutions, and AI integration.',
                url: 'https://angelnereira.com',
                logo: 'https://angelnereira.com/logo.png',
                image: 'https://angelnereira.com/og-image.png',
                priceRange: '$$$',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'PA',
                  addressLocality: 'Panama City'
                },
                telephone: '+50760000000', // Update with real generic contact if available
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
                  ],
                  opens: '09:00',
                  closes: '18:00'
                },
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Software Development Services',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'SaaS Development',
                        description: 'End-to-end development of scalable Software as a Service platforms.'
                      }
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'FinTech Integrations',
                        description: 'Secure payment gateway and electronic invoicing integration.'
                      }
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'PWA Development',
                        description: 'Offline-first Progressive Web Apps for mobile and desktop.'
                      }
                    }
                  ]
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://angelnereira.com/#website',
                url: 'https://angelnereira.com',
                name: 'Ángel Nereira - Full Stack Developer',
                publisher: {
                  '@id': 'https://angelnereira.com/#person'
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://angelnereira.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              }
            ]),
          }}
        />
      </head>
      <RootLayoutClient>
        <GlobalEasterEggs />
        <BackgroundAnimation />
        {children}
      </RootLayoutClient>
    </html>
  );
}
