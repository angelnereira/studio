"use client";

import { Providers } from '@/components/providers';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { useReportWebVitals } from 'next/web-vitals';

export function RootLayoutClient({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useReportWebVitals((metric) => {
        // Solo log en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log(metric);
        }
    });

    return (
        <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning>
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
    );
}
