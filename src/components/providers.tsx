"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
