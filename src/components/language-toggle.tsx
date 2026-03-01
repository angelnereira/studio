"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
    const [mounted, setMounted] = React.useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const toggleLanguage = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';

        let newPath = pathname;
        if (nextLocale === 'en') {
            newPath = `/en${pathname === '/' ? '' : pathname}`;
        } else {
            newPath = pathname.replace(/^\/en/, '') || '/';
        }

        // document.documentElement.lang is updated by NextIntl rendering
        router.push(newPath);
    };

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle language</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent hover:text-accent-foreground"
            onClick={toggleLanguage}
            title={locale === 'es' ? "Cambiar a Inglés" : "Switch to Spanish"}
        >
            <Languages className="h-[1.3rem] w-[1.3rem] transition-all" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border border-background">
                {locale.toUpperCase()}
            </span>
            <span className="sr-only">Toggle language</span>
        </Button>
    );
}
