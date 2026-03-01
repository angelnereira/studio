
export type ProjectData = {
    title: string;
    id: string;
    label: string;
    description: string;
    technologies: string[];
    techHighlights: {
        title: string;
        description: string;
    }[];
    challenge?: string;
    githubUrl?: string;
    liveUrl?: string;
    caseStudy?: string;
};

export type MetricData = {
    value: string;
    label: string;
    description: string;
};

export const projectsData: ProjectData[] = [
    {
        title: "Sago One",
        id: "sago-one-fintech-saas",
        label: "ERP SaaS Todo-en-Uno | POS & FinTech | Next.js 15",
        description: "Plataforma Enterprise Todo-en-Uno para negocios en Panamá. Comenzando como un sistema PWA de facturación electrónica certificada por la DGI, ahora integra Inventario Pro en tiempo real, un Punto de Venta (POS) táctil ágil y gestión de Nómina Legal. Su arquitectura offline-first garantiza operatividad ininterrumpida en zonas con baja conectividad.",
        technologies: ["Next.js 15", "TypeScript", "Prisma ORM", "Neon PostgreSQL", "PWA", "Service Workers", "AES-256", "Vercel"],
        techHighlights: [
            {
                title: "Seguridad Nivel Bancario",
                description: "Encriptación AES-256 para credenciales PAC/DGI. Autenticación robusta y manejo seguro de datos fiscales sensibles."
            },
            {
                title: "Ecosistema Modular (ERP)",
                description: "Integración fluida entre Facturación v2.0, Punto de Venta (POS) rápido, gestión de inventario con tracking de lotes y planillas legales."
            },
            {
                title: "Performance Extremo",
                description: "99.9% Uptime y carga instantánea. React Server Components para renderizado óptimo y bundle size mínimo."
            }
        ],
        challenge: "El reto era mantener la facturación operativa sin internet. La solución fue implementar una estrategia de caché agresiva con Service Workers y sincronización en segundo plano al recuperar conexión. Esto permite a comerciantes en zonas rurales o con conectividad inestable seguir facturando sin interrupciones.",
        liveUrl: "https://sagoone.com",
        githubUrl: "https://github.com/angelnereira/sago-factu-V0.2",
    },
    {
        title: "Plenty Market",
        id: "plenty-market-ecommerce-pwa",
        label: "E-commerce Internacional | PWA | Logística Compleja",
        description: "Modernización completa de una página estática a una PWA de alto rendimiento desarrollada en Next.js 14 (App Router) y TypeScript. Integra un sistema complejo de logística (Partner Program) con gestión de inventarios en tiempo real, variantes de productos y zonas libres de impuestos.",
        technologies: ["Next.js 14", "TypeScript", "Prisma ORM", "Neon PostgreSQL", "Zustand", "Cloudinary", "Vercel", "PWA"],
        techHighlights: [
            {
                title: "Gestión de Estado Optimizada",
                description: "Zustand para manejo de carrito y sesión global ligero y rápido. Persistencia de estado entre sesiones sin overhead."
            },
            {
                title: "Optimización de Media",
                description: "Integración con Cloudinary para transformación de imágenes on-the-fly (WebP/AVIF). Lazy loading inteligente."
            },
            {
                title: "Migración de Base de Datos",
                description: "Migración a PostgreSQL (Neon) vía Prisma ORM para integridad de datos relacionales complejos (Pedidos vs. Inventario)."
            }
        ],
        challenge: "El desafío era migrar un sitio estático a una plataforma e-commerce completa manteniendo la experiencia de usuario fluida. Implementamos un sistema de Partner Program que permite a vendedores internacionales gestionar inventario con zonas de impuestos diferenciadas y sincronización en tiempo real.",
        liveUrl: "https://plenty-market.vercel.app",
        githubUrl: "https://github.com/angelnereira/plenty-market",
    },
];

export const metricsData: MetricData[] = [
    {
        value: "10,000+",
        label: "Facturas Procesadas",
        description: "Facturas electrónicas emitidas a través de Sago One con cumplimiento DGI."
    },
    {
        value: "99.9%",
        label: "Uptime Garantizado",
        description: "Disponibilidad de servicios en producción con arquitectura serverless."
    },
    {
        value: "< 200ms",
        label: "Tiempo de Respuesta",
        description: "Latencia promedio de API en operaciones críticas de facturación."
    },
    {
        value: "100%",
        label: "Offline Capable",
        description: "Funcionalidad completa sin conexión gracias a Service Workers y PWA."
    },
];
