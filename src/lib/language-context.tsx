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
        'hero.badge': 'Creador de Sago One (SaaS)',
        'hero.stats.years': 'Años de Experiencia',
        'hero.stats.projects': 'Proyectos Entregados',
        'hero.stats.clients': 'Clientes Satisfechos',
        'hero.stats.tech': 'Tecnologías Dominadas',

        // Solutions Section
        'solutions.title': 'Soluciones que Transforman',
        'solutions.subtitle': 'Cada proyecto es único. Explora las áreas donde puedo aportar valor a tu visión.',
        'solutions.enterprise.title': 'Sistemas Empresariales',
        'solutions.enterprise.desc': 'Arquitecturas robustas que escalan con tu negocio. ERP, facturación electrónica, integraciones gubernamentales.',
        'solutions.enterprise.stats': '99.9% uptime',
        'solutions.digital.title': 'Productos Digitales',
        'solutions.digital.desc': 'De concepto a producto lanzado. Desarrollo ágil, iteraciones rápidas, enfoque en el usuario final.',
        'solutions.digital.stats': 'MVP en 4 semanas',
        'solutions.consulting.title': 'Consultoría Técnica',
        'solutions.consulting.desc': 'Auditorías de código, arquitectura de software, optimización de rendimiento y mentoría para equipos.',
        'solutions.consulting.stats': '15+ tecnologías',
        'solutions.explore': 'Explorar Solución',

        // About
        'about.title': 'Sobre Mí',
        'about.description': 'Ingeniero de software panameño especializado en crear soluciones empresariales escalables para FinTech y GovTech. No solo programo, diseño arquitecturas completas que transforman negocios.',
        'about.background.title': 'Una Perspectiva Única',
        'about.background.text': 'Mi trayectoria es única: pasé 7 años como productor musical e ingeniero de sonido antes de hacer la transición a la ingeniería de software. Esta experiencia me ha dado una perspectiva diferente sobre el diseño de soluciones y la atención al detalle.',
        'about.current.title': 'Experiencia Actual',
        'about.current.text': 'Actualmente trabajo en UbicSys S.A. y soy el creador de Sago One, un sistema SaaS completo de facturación electrónica PWA Offline-First que integra con la DGI de Panamá.',
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
        'projects.page_title': 'Casos de Éxito',
        'projects.page_subtitle': 'Soluciones reales que están transformando negocios. Desde sistemas SaaS multi-tenant hasta arquitecturas cloud enterprise híbridas.',

        // Services
        'services.page_title': 'Soluciones Empresariales de Software',
        'services.page_subtitle': 'No solo programo, diseño soluciones completas. Desde arquitecturas SaaS multi-tenant hasta integraciones complejas con sistemas gubernamentales. Especializado en FinTech y GovTech.',

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
        'footer.quote': '“Solucionar problemas para disfrutar la vida.”',
        'footer.builtBy': 'Construido por Ángel Nereira.',

        // General
        'general.learnMore': 'Saber más',
        'general.viewAll': 'Ver todo',

        // Admin
        'admin.title': 'Panel de Administración',
        'admin.dashboard': 'Dashboard',
        'admin.job_analysis': 'Análisis de Empleos',
        'admin.cover_letters': 'Cartas de Presentación',
        'admin.back_to_site': 'Volver al Sitio',
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
        'hero.badge': 'Creator of Sago One (SaaS)',
        'hero.stats.years': 'Years of Experience',
        'hero.stats.projects': 'Projects Delivered',
        'hero.stats.clients': 'Happy Clients',
        'hero.stats.tech': 'Technologies Mastered',

        // Solutions Section
        'solutions.title': 'Solutions that Transform',
        'solutions.subtitle': 'Each project is unique. Explore the areas where I can add value to your vision.',
        'solutions.enterprise.title': 'Enterprise Systems',
        'solutions.enterprise.desc': 'Robust architectures that scale with your business. ERP, electronic invoicing, government integrations.',
        'solutions.enterprise.stats': '99.9% uptime',
        'solutions.digital.title': 'Digital Products',
        'solutions.digital.desc': 'From concept to launched product. Agile development, fast iterations, end-user focus.',
        'solutions.digital.stats': 'MVP in 4 weeks',
        'solutions.consulting.title': 'Technical Consulting',
        'solutions.consulting.desc': 'Code audits, software architecture, performance optimization, and team mentorship.',
        'solutions.consulting.stats': '15+ technologies',
        'solutions.explore': 'Explore Solution',

        // About
        'about.title': 'About Me',
        'about.description': 'Panamanian software engineer specialized in creating scalable enterprise solutions for FinTech and GovTech. I don\'t just code, I design complete architectures that transform businesses.',
        'about.background.title': 'A Unique Perspective',
        'about.background.text': 'My journey is unique: I spent 7 years as a music producer and sound engineer before transitioning to software engineering. This experience has given me a different perspective on solution design and attention to detail.',
        'about.current.title': 'Current Experience',
        'about.current.text': 'I currently work at UbicSys S.A. and I am the creator of Sago One, a complete Offline-First PWA SaaS electronic invoicing system that integrates with Panama\'s DGI.',
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
        'projects.page_title': 'Success Stories',
        'projects.page_subtitle': 'Real solutions transforming businesses. From multi-tenant SaaS systems to hybrid enterprise cloud architectures.',

        // Services
        'services.page_title': 'Enterprise Software Solutions',
        'services.page_subtitle': 'I don\'t just code, I design complete solutions. From multi-tenant SaaS architectures to complex integrations with government systems. Specialized in FinTech and GovTech.',

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
        'footer.quote': '“Solving problems to enjoy life.”',
        'footer.builtBy': 'Built by Ángel Nereira.',

        // General
        'general.learnMore': 'Learn more',
        'general.viewAll': 'View all',

        // Admin
        'admin.title': 'Admin Panel',
        'admin.dashboard': 'Dashboard',
        'admin.job_analysis': 'Job Analysis',
        'admin.cover_letters': 'Cover Letters',
        'admin.back_to_site': 'Back to Site',
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

    // Always provide the context, but use default language ('es') during SSR
    // We handle hydration mismatch by only rendering children after mount if strictly needed,
    // or better: we provide the context immediately.
    // The previous issue was returning <>{children}</> without Provider wrapping it.

    // During SSR/Pre-render, effects don't run, so mounted is false.
    // We must wraps children in Provider regardless.

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {mounted ? children : children /* Render children immediately to allow SSR text generation with default language */}
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
