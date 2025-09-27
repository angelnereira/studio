"use client";

import type {Metadata} from 'next';
import './globals.css';
import {Providers} from '@/components/providers';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {Toaster} from '@/components/ui/toaster';
import { useReportWebVitals } from 'next/web-vitals';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

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
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">
            <div className="container max-w-5xl mx-auto px-4 py-12 md:py-24 lg:py-32">
                {children}
            </div>
          </main>
          <SiteFooter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
