"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    es: {
        // Hero
        'hero.greeting': 'Hola, soy',
        'hero.name': 'Ángel Nereira',
        'hero.title': 'Ingeniero de Software',
        'hero.subtitle': 'Transformo ideas en soluciones digitales escalables',
        'hero.description': 'Especialista en FinTech y GovTech. Diseño arquitecturas empresariales que generan valor real para tu negocio.',
        'hero.cta.services': 'Ver Soluciones',
        'hero.cta.contact': 'Agendar Consultoría',
        'hero.stats.years': 'Años de Experiencia',
        'hero.stats.projects': 'Proyectos Entregados',
        'hero.stats.clients': 'Clientes Satisfechos',
        'hero.stats.tech': 'Tecnologías Dominadas',

        // About
        'about.title': 'Sobre Mí',
        'about.description': 'Ingeniero de software panameño especializado en crear soluciones empresariales escalables para FinTech y GovTech. No solo programo, diseño arquitecturas completas que transforman negocios.',
        'about.background.title': 'Una Perspectiva Única',
        'about.background.text': 'Mi trayectoria es única: pasé 7 años como productor musical e ingeniero de sonido antes de hacer la transición a la ingeniería de software. Esta experiencia me ha dado una perspectiva diferente sobre el diseño de soluciones y la atención al detalle.',
        'about.current.title': 'Experiencia Actual',
        'about.current.text': 'Actualmente trabajo en UbicSys S.A., donde diseño y desarrollo soluciones FinTech y GovTech. Mi proyecto principal es SAGO-FACTU, un sistema SaaS completo de facturación electrónica que integra con la DGI de Panamá.',
        'about.philosophy.title': 'Mi Filosofía',
        'about.philosophy.text': 'Solucionar problemas para disfrutar la vida',

        // Skills
        'skills.title': 'Stack Tecnológico',
        'skills.description': 'Herramientas y tecnologías que domino para resolver problemas complejos.',
        'skills.cta': 'Ver todas las Habilidades',

        // Services
        'services.title': 'Mis Servicios',
        'services.description': 'Soluciones de software a la medida para potenciar tu negocio.',
        'services.cta': 'Ver todos los servicios',

        // Projects
        'projects.title': 'Proyectos Destacados',
        'projects.description': 'Una selección de proyectos que demuestran mi enfoque en la resolución de problemas.',

        // Testimonials
        'testimonials.title': 'Lo que dicen otros',

        // CTA
        'cta.title': '¿Listo para transformar tu negocio?',
        'cta.subtitle': 'Colaboremos en soluciones que escalen globalmente. Estoy disponible para nuevos desafíos y oportunidades.',
        'cta.button': 'Conversemos sobre tu proyecto',

        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Sobre Mí',
        'nav.services': 'Servicios',
        'nav.projects': 'Proyectos',
        'nav.skills': 'Habilidades',
        'nav.contact': 'Contacto',
        'nav.calculator': 'Calculadora',

        // Footer
        'footer.rights': 'Todos los derechos reservados.',
        'footer.built': 'Diseñado y desarrollado con',

        // General
        'general.learnMore': 'Saber más',
        'general.viewAll': 'Ver todo',
    },
    en: {
        // Hero
        'hero.greeting': 'Hi, I\'m',
        'hero.name': 'Ángel Nereira',
        'hero.title': 'Software Engineer',
        'hero.subtitle': 'I transform ideas into scalable digital solutions',
        'hero.description': 'FinTech and GovTech specialist. I design enterprise architectures that generate real value for your business.',
        'hero.cta.services': 'View Solutions',
        'hero.cta.contact': 'Book a Consultation',
        'hero.stats.years': 'Years of Experience',
        'hero.stats.projects': 'Projects Delivered',
        'hero.stats.clients': 'Happy Clients',
        'hero.stats.tech': 'Technologies Mastered',

        // About
        'about.title': 'About Me',
        'about.description': 'Panamanian software engineer specialized in creating scalable enterprise solutions for FinTech and GovTech. I don\'t just code, I design complete architectures that transform businesses.',
        'about.background.title': 'A Unique Perspective',
        'about.background.text': 'My journey is unique: I spent 7 years as a music producer and sound engineer before transitioning to software engineering. This experience has given me a different perspective on solution design and attention to detail.',
        'about.current.title': 'Current Experience',
        'about.current.text': 'I currently work at UbicSys S.A., where I design and develop FinTech and GovTech solutions. My main project is SAGO-FACTU, a complete SaaS electronic invoicing system that integrates with Panama\'s DGI.',
        'about.philosophy.title': 'My Philosophy',
        'about.philosophy.text': 'Solving problems to enjoy life',

        // Skills
        'skills.title': 'Tech Stack',
        'skills.description': 'Tools and technologies I master to solve complex problems.',
        'skills.cta': 'View all Skills',

        // Services
        'services.title': 'My Services',
        'services.description': 'Custom software solutions to empower your business.',
        'services.cta': 'View all services',

        // Projects
        'projects.title': 'Featured Projects',
        'projects.description': 'A selection of projects that demonstrate my problem-solving approach.',

        // Testimonials
        'testimonials.title': 'What others say',

        // CTA
        'cta.title': 'Ready to transform your business?',
        'cta.subtitle': 'Let\'s collaborate on solutions that scale globally. I\'m available for new challenges and opportunities.',
        'cta.button': 'Let\'s discuss your project',

        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'nav.calculator': 'Calculator',

        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.built': 'Designed and built with',

        // General
        'general.learnMore': 'Learn more',
        'general.viewAll': 'View all',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('es');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export { translations };
export type { Language };
