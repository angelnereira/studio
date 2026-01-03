"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

type Language = 'es' | 'en';

export function LanguageToggle() {
    const [mounted, setMounted] = React.useState(false);
    const [language, setLanguageState] = React.useState<Language>('es');

    React.useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
            setLanguageState(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'es' ? 'en' : 'es';
        setLanguageState(newLang);
        localStorage.setItem('language', newLang);
        document.documentElement.lang = newLang;
        // Trigger a page reload to apply translations globally
        window.location.reload();
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
            title={language === 'es' ? "Cambiar a Inglés" : "Switch to Spanish"}
        >
            <Languages className="h-[1.3rem] w-[1.3rem] transition-all" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border border-background">
                {language.toUpperCase()}
            </span>
            <span className="sr-only">Toggle language</span>
        </Button>
    );
}
