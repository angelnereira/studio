"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        // Trigger a page reload to apply translations
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="absolute -bottom-0.5 -right-0.5 text-[10px] font-bold uppercase bg-primary text-primary-foreground rounded px-0.5">
                        {language}
                    </span>
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("es")} className={language === 'es' ? 'bg-accent' : ''}>
                    <span className="mr-2">🇪🇸</span>
                    Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === 'en' ? 'bg-accent' : ''}>
                    <span className="mr-2">🇺🇸</span>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
