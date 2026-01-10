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
        // Hero - Ingeniero de Software Full Stack (no Arquitecto)
        'hero.greeting': 'Hola, soy',
        'hero.name': 'Ángel Nereira',
        'hero.title': 'Ingeniero de Software Full Stack',
        'hero.subtitle': 'Desarrollador FinTech & Aplicaciones Web Modernas',
        'hero.description': 'Ingeniero especializado en soluciones FinTech, GovTech y plataformas SaaS. Construyo aplicaciones modernas que funcionan en cualquier dispositivo, garantizando seguridad y escalabilidad.',
        'hero.cta.services': 'Ver Proyectos',
        'hero.cta.contact': 'Consultoría Técnica',
        'hero.badge': 'Creador de Sago One · FinTech SaaS',
        'hero.stats.years': 'Años de Experiencia',
        'hero.stats.projects': 'Proyectos Entregados',
        'hero.stats.facturas': 'Facturas Procesadas',
        'hero.stats.uptime': 'Uptime SaaS',

        // Solutions Section
        'solutions.title': 'Soluciones que Escalan',
        'solutions.subtitle': 'Ingeniería de software de alto nivel para productos que necesitan rendimiento, seguridad y disponibilidad.',
        'solutions.enterprise.title': 'FinTech & Compliance',
        'solutions.enterprise.desc': 'Sistemas de facturación electrónica, integración con entidades gubernamentales (DGI, PAC) y seguridad de nivel bancario.',
        'solutions.enterprise.stats': 'AES-256 Encryption',
        'solutions.digital.title': 'PWA Offline-First',
        'solutions.digital.desc': 'Aplicaciones progresivas que funcionan sin internet. Service Workers, caché estratégico y sincronización inteligente.',
        'solutions.digital.stats': '100% Offline Capable',
        'solutions.consulting.title': 'Desarrollo SaaS',
        'solutions.consulting.desc': 'Sistemas multi-tenant, escalabilidad horizontal y optimización de bases de datos PostgreSQL.',
        'solutions.consulting.stats': 'Multi-Tenant Ready',
        'solutions.explore': 'Ver Detalles',

        // About - Sin referencias a productor musical
        'about.title': 'Sobre Mí',
        'about.description': 'Ingeniero de Software Full Stack especializado en FinTech y GovTech. Diseño y construyo sistemas SaaS escalables que procesan miles de transacciones diarias.',
        'about.background.title': 'Enfoque Técnico',
        'about.background.text': 'Mi especialidad es construir aplicaciones PWA Offline-First y sistemas de alta disponibilidad. Trabajo con Next.js, TypeScript y PostgreSQL para crear productos robustos que resuelven problemas reales de negocio.',
        'about.current.title': 'Proyectos Actuales',
        'about.current.text': 'Actualmente desarrollo Sago One (SaaS de facturación electrónica) y Plenty Market (E-commerce PWA). Ambos sistemas manejan datos críticos con encriptación AES-256 y diseño multi-tenant.',
        'about.philosophy.title': 'Mi Filosofía',
        'about.philosophy.text': 'Código limpio, soluciones escalables, documentación clara',

        // Skills
        'skills.title': 'Stack Tecnológico',
        'skills.description': 'Las herramientas que uso para construir Sago One y Plenty Market.',
        'skills.cta': 'Ver Stack Completo',
        'skills.category.core': 'Core',
        'skills.category.data': 'Data',
        'skills.category.infrastructure': 'Infrastructure',

        // Services
        'services.title': 'Servicios',
        'services.description': 'Soluciones de software para productos que necesitan escalar.',
        'services.cta': 'Ver todos los servicios',

        // Projects
        'projects.title': 'Proyectos en Producción',
        'projects.description': 'Sistemas reales procesando transacciones. La ingeniería detrás de cada solución.',
        'projects.page_title': 'Casos de Éxito',
        'projects.page_subtitle': 'Sistemas FinTech y E-commerce en producción. La ingeniería detrás de cada solución.',
        'projects.challenge': 'El Desafío Técnico',
        'projects.tech_highlights': 'Highlights Técnicos',

        // Metrics (replacing testimonials)
        'metrics.title': 'Métricas en Producción',
        'metrics.subtitle': 'Números reales de sistemas en producción.',

        // Services
        'services.page_title': 'Soluciones de Software Enterprise',
        'services.page_subtitle': 'Desarrollo sistemas completos: desde PWA Offline-First hasta integraciones complejas con APIs gubernamentales. Especializado en FinTech SaaS.',

        // CTA
        'cta.title': '¿Necesitas un desarrollo de alto nivel?',
        'cta.subtitle': 'Construyamos sistemas que escalen. Disponible para proyectos FinTech, E-commerce y SaaS.',
        'cta.button': 'Agendar Consultoría',

        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Sobre Mí',
        'nav.services': 'Servicios',
        'nav.projects': 'Proyectos',
        'nav.skills': 'Stack',
        'nav.contact': 'Contacto',
        'nav.calculator': 'Calculadora',

        // Footer
        'footer.rights': 'Todos los derechos reservados.',
        'footer.built': 'Desarrollado con',
        'footer.quote': '"Código limpio, soluciones escalables."',
        'footer.builtBy': 'Construido por Ángel Nereira.',

        // General
        'general.learnMore': 'Ver más',
        'general.viewAll': 'Ver todo',

        // Admin
        'admin.title': 'Panel de Administración',
        'admin.dashboard': 'Dashboard',
        'admin.job_analysis': 'Análisis de Empleos',
        'admin.cover_letters': 'Cartas de Presentación',
        'admin.back_to_site': 'Volver al Sitio',

        // Projects Details
        'project.sago_one.title': 'Sago One',
        'project.sago_one.label': 'FinTech SaaS | Compliance | Next.js 15',
        'project.sago_one.subtitle': 'Plataforma SaaS de Facturación Electrónica PWA Offline-First',
        'project.sago_one.description': 'Plataforma SaaS de facturación electrónica certificada por la DGI. Construida sobre Next.js 15 para aprovechar el Server-Side Rendering y velocidad extrema. Implementa una arquitectura PWA (Progressive Web App) que garantiza operatividad offline-first mediante Service Workers, crucial para la estabilidad comercial en zonas con baja conectividad.',
        'project.sago_one.challenge': 'El reto era mantener la facturación operativa sin internet. La solución fue implementar una estrategia de caché agresiva con Service Workers y sincronización en segundo plano al recuperar conexión. Esto permite a comerciantes en zonas rurales o con conectividad inestable seguir facturando sin interrupciones.',
        'project.sago_one.highlight.security.title': 'Seguridad Nivel Bancario',
        'project.sago_one.highlight.security.desc': 'Encriptación AES-256 para credenciales PAC/DGI, autenticación robusta y manejo seguro de datos.',
        'project.sago_one.highlight.database.title': 'Base de Datos Multi-Tenant',
        'project.sago_one.highlight.database.desc': 'PostgreSQL optimizado para multi-tenancy, permitiendo gestión de múltiples empresas con aislamiento.',
        'project.sago_one.highlight.performance.title': 'Performance Extremo',
        'project.sago_one.highlight.performance.desc': '99.9% Uptime. React Server Components para renderizado óptimo y bundle size mínimo.',

        'project.plenty_market.title': 'Plenty Market',
        'project.plenty_market.label': 'E-commerce Internacional | PWA | Logística Compleja',
        'project.plenty_market.subtitle': 'PWA E-commerce con Partner Program y Gestión de Inventarios',
        'project.plenty_market.description': 'Modernización completa de una página estática a una PWA de alto rendimiento desarrollada en Next.js 14 y TypeScript. Integra un sistema complejo de logística (Partner Program) con gestión de inventarios en tiempo real, variantes de productos y zonas libres de impuestos.',
        'project.plenty_market.challenge': 'El desafío era migrar un sitio estático a una plataforma e-commerce completa manteniendo la UX fluida. Implementamos un sistema de Partner Program que permite a vendedores gestionar inventario con zonas de impuestos diferenciadas y sincronización en tiempo real.',
        'project.plenty_market.highlight.state.title': 'Gestión de Estado Optimizada',
        'project.plenty_market.highlight.state.desc': 'Zustand para manejo de carrito y sesión global ligero. Persistencia de estado sin overhead.',
        'project.plenty_market.highlight.media.title': 'Optimización de Media',
        'project.plenty_market.highlight.media.desc': 'Integración con Cloudinary para transformación on-the-fly (WebP/AVIF) y Lazy loading inteligente.',
        'project.plenty_market.highlight.migration.title': 'Migración de Base de Datos',
        'project.plenty_market.highlight.migration.desc': 'Migración a PostgreSQL (Neon) vía Prisma ORM para integridad de datos relacionales complejos.',

        // Metrics Details
        'metric.facturas.label': 'Facturas Procesadas',
        'metric.facturas.desc': 'Facturas electrónicas emitidas a través de Sago One con cumplimiento DGI.',
        'metric.uptime.label': 'Uptime Garantizado',
        'metric.uptime.desc': 'Disponibilidad de servicios en producción con arquitectura serverless.',
        'metric.latency.label': 'Tiempo de Respuesta',
        'metric.latency.desc': 'Latencia promedio de API en operaciones críticas de facturación.',
        'metric.offline.label': 'Offline Capable',
        'metric.offline.desc': 'Funcionalidad completa sin conexión gracias a Service Workers y PWA.',
    },
    en: {
        // Hero - Full Stack Software Engineer (not Architect)
        'hero.greeting': 'Hi, I\'m',
        'hero.name': 'Ángel Nereira',
        'hero.title': 'Full Stack Software Engineer',
        'hero.subtitle': 'FinTech Developer & Modern Web Apps',
        'hero.description': 'Engineer specialized in FinTech, GovTech, and SaaS platforms. I build modern applications that work on any device, ensuring security and scalability.',
        'hero.cta.services': 'View Projects',
        'hero.cta.contact': 'Technical Consulting',
        'hero.badge': 'Creator of Sago One · FinTech SaaS',
        'hero.stats.years': 'Years of Experience',
        'hero.stats.projects': 'Projects Delivered',
        'hero.stats.facturas': 'Invoices Processed',
        'hero.stats.uptime': 'SaaS Uptime',

        // Solutions Section
        'solutions.title': 'Solutions that Scale',
        'solutions.subtitle': 'High-level software engineering for products that need performance, security and availability.',
        'solutions.enterprise.title': 'FinTech & Compliance',
        'solutions.enterprise.desc': 'Electronic invoicing systems, government integrations (DGI, PAC) and bank-grade security.',
        'solutions.enterprise.stats': 'AES-256 Encryption',
        'solutions.digital.title': 'PWA Offline-First',
        'solutions.digital.desc': 'Progressive applications that work without internet. Service Workers, strategic caching and smart sync.',
        'solutions.digital.stats': '100% Offline Capable',
        'solutions.consulting.title': 'SaaS Development',
        'solutions.consulting.desc': 'Multi-tenant systems, horizontal scalability and PostgreSQL database optimization.',
        'solutions.consulting.stats': 'Multi-Tenant Ready',
        'solutions.explore': 'View Details',

        // About - No references to music producer
        'about.title': 'About Me',
        'about.description': 'Full Stack Software Engineer specialized in FinTech and GovTech. I design and build scalable SaaS systems that process thousands of daily transactions.',
        'about.background.title': 'Technical Focus',
        'about.background.text': 'My specialty is building Offline-First PWA applications and high-availability systems. I work with Next.js, TypeScript and PostgreSQL to create robust products that solve real business problems.',
        'about.current.title': 'Current Projects',
        'about.current.text': 'Currently developing Sago One (electronic invoicing SaaS) and Plenty Market (E-commerce PWA). Both systems handle critical data with AES-256 encryption and multi-tenant design.',
        'about.philosophy.title': 'My Philosophy',
        'about.philosophy.text': 'Clean code, scalable solutions, clear documentation',

        // Skills
        'skills.title': 'Tech Stack',
        'skills.description': 'The tools I use to build Sago One and Plenty Market.',
        'skills.cta': 'View Full Stack',
        'skills.category.core': 'Core',
        'skills.category.data': 'Data',
        'skills.category.infrastructure': 'Infrastructure',

        // Services
        'services.title': 'Services',
        'services.description': 'Software solutions for products that need to scale.',
        'services.cta': 'View all services',

        // Projects
        'projects.title': 'Projects in Production',
        'projects.description': 'Real systems processing transactions. The engineering behind each solution.',
        'projects.page_title': 'Success Stories',
        'projects.page_subtitle': 'FinTech and E-commerce systems in production. The engineering behind each solution.',
        'projects.challenge': 'The Technical Challenge',
        'projects.tech_highlights': 'Technical Highlights',

        // Project Details
        'project.sago_one.title': 'Sago One',
        'project.sago_one.label': 'FinTech SaaS | Compliance | Next.js 15',
        'project.sago_one.subtitle': 'SaaS Platform for Electronic Invoicing PWA Offline-First',
        'project.sago_one.description': 'DGI-certified electronic invoicing SaaS platform. Built on Next.js 15 to leverage Server-Side Rendering and extreme speed. Implements a PWA (Progressive Web App) architecture ensuring offline-first operation via Service Workers, crucial for commercial stability in low-connectivity zones.',
        'project.sago_one.challenge': 'The challenge was to keep invoicing operational without internet. The solution was implementing an aggressive caching strategy with Service Workers and background synchronization upon reconnection. This allows merchants in rural or unstable areas to continue invoicing without interruptions.',
        'project.sago_one.highlight.security.title': 'Bank-Grade Security',
        'project.sago_one.highlight.security.desc': 'AES-256 encryption for PAC/DGI credentials, robust authentication, and secure handling of sensitive fiscal data.',
        'project.sago_one.highlight.database.title': 'Multi-Tenant Database',
        'project.sago_one.highlight.database.desc': 'PostgreSQL optimized for multi-tenancy, allowing management of multiple branches and companies with data isolation.',
        'project.sago_one.highlight.performance.title': 'Extreme Performance',
        'project.sago_one.highlight.performance.desc': '99.9% Uptime. React Server Components for optimal rendering and minimal bundle size.',

        'project.plenty_market.title': 'Plenty Market',
        'project.plenty_market.label': 'International E-commerce | PWA | Complex Logistics',
        'project.plenty_market.subtitle': 'PWA E-commerce with Partner Program and Inventory Management',
        'project.plenty_market.description': 'Complete modernization from a static site to a high-performance PWA built in Next.js 14 and TypeScript. Integrates a complex logistics system (Partner Program) with real-time inventory management, product variants, and tax-free zones.',
        'project.plenty_market.challenge': 'The challenge was migrating a static site to a full e-commerce platform while maintaining fluid UX. We implemented a Partner Program allowing vendors to manage inventory with differentiated tax zones and real-time stock sync.',
        'project.plenty_market.highlight.state.title': 'Optimized State Management',
        'project.plenty_market.highlight.state.desc': 'Zustand for lightweight global cart and session handling. State persistence between sessions without overhead.',
        'project.plenty_market.highlight.media.title': 'Media Optimization',
        'project.plenty_market.highlight.media.desc': 'Integration with Cloudinary for on-the-fly transformation (WebP/AVIF) and smart Lazy loading.',
        'project.plenty_market.highlight.migration.title': 'Database Migration',
        'project.plenty_market.highlight.migration.desc': 'Migration to PostgreSQL (Neon) via Prisma ORM for complex relational data integrity.',

        // Metrics (replacing testimonials)
        'metrics.title': 'Production Metrics',
        'metrics.subtitle': 'Real numbers from production systems.',
        'metric.facturas.label': 'Invoices Processed',
        'metric.facturas.desc': 'Electronic invoices issued through Sago One with DGI compliance.',
        'metric.uptime.label': 'Guaranteed Uptime',
        'metric.uptime.desc': 'Availability of production services with serverless architecture.',
        'metric.latency.label': 'Response Time',
        'metric.latency.desc': 'Average API latency in critical invoicing operations.',
        'metric.offline.label': 'Offline Capable',
        'metric.offline.desc': 'Full offline functionality thanks to Service Workers and PWA.',

        // Services
        'services.page_title': 'Enterprise Software Solutions',
        'services.page_subtitle': 'I develop complete systems: from Offline-First PWAs to complex government API integrations. Specialized in FinTech SaaS.',

        // CTA
        'cta.title': 'Need high-level development?',
        'cta.subtitle': 'Let\'s build systems that scale. Available for FinTech, E-commerce and SaaS projects.',
        'cta.button': 'Book Consulting',

        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.projects': 'Projects',
        'nav.skills': 'Stack',
        'nav.contact': 'Contact',
        'nav.calculator': 'Calculator',
        'nav.blog': 'Blog',

        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.built': 'Developed with',
        'footer.quote': '"Clean code, scalable solutions."',
        'footer.builtBy': 'Built by Ángel Nereira.',

        // General
        'general.learnMore': 'Learn more',
        'general.viewAll': 'View all',
        'general.viewCode': 'View Code',
        'general.viewLive': 'View Live',

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

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {mounted ? children : children}
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
