
export type PracticalAbilityData = {
    title: string;
    description: string;
    iconName: string;
};

export type SkillCategory = "frontend" | "backend" | "data" | "devops" | "cloud" | "security" | "ai-engineering" | "mobile-systems";

export type SkillData = {
    name: string;
    slug: string;
    description: string;
    category: SkillCategory;
    practicalAbilities: PracticalAbilityData[];
    iconName: string;
};

export type SkillCategoryData = {
    id: SkillCategory;
    name: string;
    description: string;
    businessValue: string;
    iconName: string;
};

export const skillsData: SkillData[] = [
    // === FRONTEND ===
    {
        name: "Next.js",
        slug: "nextjs",
        iconName: "TbBrandNextjs",
        description: "Framework React de producción para aplicaciones web de alto rendimiento con SSR, SSG y React Server Components.",
        category: "frontend",
        practicalAbilities: [
            { title: "App Router & Server Components", description: "Arquitecturas modernas con React Server Components para renderizado óptimo y bundle size mínimo.", iconName: "Zap" },
            { title: "API Routes & Server Actions", description: "Backend integrado con endpoints RESTful y Server Actions para operaciones de base de datos.", iconName: "Server" },
            { title: "PWA & Offline-First", description: "Service Workers y estrategias de caché para aplicaciones que operan sin conexión.", iconName: "Shield" },
        ]
    },
    {
        name: "TypeScript",
        slug: "typescript",
        iconName: "SiTypescript",
        description: "Superset de JavaScript con tipado estático. Esencial para proyectos escalables y mantenibles.",
        category: "frontend",
        practicalAbilities: [
            { title: "Type Safety End-to-End", description: "Tipado desde la base de datos (Prisma) hasta el frontend, eliminando errores en tiempo de compilación.", iconName: "Shield" },
            { title: "Interfaces & Generics", description: "Diseño de tipos reutilizables para APIs, componentes y lógica de negocio.", iconName: "Layers" },
            { title: "Integración con Prisma", description: "Tipos autogenerados desde el schema para queries type-safe.", iconName: "Database" },
        ]
    },
    {
        name: "JavaScript",
        slug: "javascript",
        iconName: "SiJavascript",
        description: "Lenguaje fundamental de la web. Dominio profundo de ES6+, async/await y patrones modernos.",
        category: "frontend",
        practicalAbilities: [
            { title: "ES6+ & Modern Patterns", description: "Destructuring, spread operators, modules, async/await y programación funcional.", iconName: "Code2" },
            { title: "Node.js Runtime", description: "Desarrollo backend con Node.js, APIs RESTful y scripts de automatización.", iconName: "Server" },
            { title: "Service Workers", description: "Implementación de PWA con caché strategies y sincronización offline.", iconName: "Zap" },
        ]
    },

    // === BACKEND ===
    {
        name: "Go (Golang)",
        slug: "golang",
        iconName: "SiGo",
        description: "Lenguaje compilado de alto rendimiento para servicios backend concurrentes, APIs de baja latencia y herramientas de sistemas.",
        category: "backend",
        practicalAbilities: [
            { title: "Goroutines & Concurrencia", description: "Manejo de miles de conexiones simultáneas con goroutines y channels para servicios de alto throughput.", iconName: "Zap" },
            { title: "Microservicios Fiscales", description: "Microservicio Go en Sago One que genera CUFE/CAFE offline (~15µs/op, algoritmo Módulo 10).", iconName: "Server" },
            { title: "SDK HKA Open Source", description: "Gateway SOAP fiscal multi-tenant con validación estricta y enrutamiento dinámico de tipos de documento.", iconName: "Database" },
        ]
    },
    {
        name: "Rust",
        slug: "rust",
        iconName: "SiRust",
        description: "Lenguaje de sistemas con garantías de memoria sin GC. Lo uso para herramientas nativas Android (VPN routing, audio DSP) y módulos críticos sin overhead.",
        category: "backend",
        practicalAbilities: [
            { title: "Tooling Nativo Android", description: "Gravital-Share: forwarding de tráfico VPN para dispositivos en hotspot con reglas iptables/nftables dinámicas.", iconName: "Server" },
            { title: "Audio / DSP Pipeline", description: "Gravital-Talk: filtros de audio de baja latencia construidos desde principios de procesamiento digital de señales.", iconName: "Zap" },
            { title: "Memory Safety Sin GC", description: "Garantías de seguridad de memoria en compilación, ideal para componentes embebidos críticos.", iconName: "Shield" },
        ]
    },
    {
        name: "Kotlin",
        slug: "kotlin",
        iconName: "SiKotlin",
        description: "Lenguaje principal para Android nativo. Lo uso para construir herramientas de desarrollador como terminales Linux profesionales en el bolsillo.",
        category: "mobile-systems",
        practicalAbilities: [
            { title: "Android Nativo", description: "Gravital-Shell: terminal Linux profesional para Android con interfaz nativa y gestor APK integrado.", iconName: "Code2" },
            { title: "JNI & Procesos Nativos", description: "Interoperación con código C/proot para ejecutar entornos Alpine Linux aislados sin root.", iconName: "Server" },
            { title: "Coroutines & Flow", description: "Manejo asíncrono moderno para UI responsiva y operaciones de larga duración.", iconName: "Zap" },
        ]
    },

    // === DATA ===
    {
        name: "PostgreSQL",
        slug: "postgresql",
        iconName: "SiPostgresql",
        description: "Base de datos relacional robusta y extensible. El estándar para aplicaciones empresariales con cargas transaccionales críticas.",
        category: "data",
        practicalAbilities: [
            { title: "Row Level Security", description: "Aislamiento multi-tenant a nivel de base de datos en Sago One, combinado con Prisma Client Extensions.", iconName: "Shield" },
            { title: "Queries Optimizadas", description: "JOINs eficientes, índices estratégicos y análisis de query plans para operaciones fiscales con miles de transacciones diarias.", iconName: "Zap" },
            { title: "Transacciones ACID", description: "Operaciones atómicas para datos críticos: facturación, inventario, pagos y nómina.", iconName: "Database" },
        ]
    },
    {
        name: "Prisma ORM",
        slug: "prisma",
        iconName: "PrismaIcon",
        description: "ORM moderno con tipado automático. Schema declarativo, migraciones versionadas y Client Extensions para multi-tenancy seguro.",
        category: "data",
        practicalAbilities: [
            { title: "Schema Declarativo", description: "Definición de modelos, relaciones y validaciones en un solo archivo.", iconName: "Layers" },
            { title: "Client Extensions Multi-Tenant", description: "Aislamiento de tenants enforced a nivel de driver, sin filtros olvidados en queries individuales.", iconName: "GitBranch" },
            { title: "Type-Safe Queries", description: "Autocompletado y validación de queries en tiempo de compilación.", iconName: "Shield" },
        ]
    },
    {
        name: "Neon",
        slug: "neon",
        iconName: "NeonIcon",
        description: "PostgreSQL serverless con branching nativo. Crítico para entornos resilientes de staging y producción sin sobrecostos.",
        category: "data",
        practicalAbilities: [
            { title: "Serverless PostgreSQL", description: "Escalado automático y pago por uso. Sin administración de servidores.", iconName: "Zap" },
            { title: "Database Branching", description: "Branches aislados de la base de datos para QA y previews por feature, sin afectar producción.", iconName: "GitBranch" },
            { title: "Connection Pooling", description: "Gestión eficiente de conexiones para aplicaciones serverless en Vercel Edge.", iconName: "Server" },
        ]
    },
    {
        name: "SQL",
        slug: "sql",
        iconName: "SqlIcon",
        description: "Lenguaje estándar para consultas de bases de datos relacionales. Imprescindible para optimización y análisis de datos.",
        category: "data",
        practicalAbilities: [
            { title: "Queries Complejas", description: "CTEs, window functions, subqueries y aggregations avanzadas.", iconName: "Code2" },
            { title: "Optimización", description: "Análisis de EXPLAIN plans e indexación estratégica.", iconName: "Zap" },
            { title: "Migraciones Auditables", description: "SQL de migración versionado y revisable, con rollback predecible.", iconName: "Server" },
        ]
    },
    {
        name: "Redis / Upstash",
        slug: "redis-upstash",
        iconName: "SiRedis",
        description: "Base de datos in-memory y serverless para caching de alta velocidad, rate limiting y pub/sub. Upstash para edge computing sin estado.",
        category: "data",
        practicalAbilities: [
            { title: "Caching con TTL e Invalidación", description: "Estrategias de caché para reducir latencia de APIs y eliminar consultas redundantes a PostgreSQL.", iconName: "Zap" },
            { title: "Rate Limiting Serverless", description: "Control de tasa de peticiones en edge functions con Upstash Redis para APIs públicas y privadas.", iconName: "Shield" },
            { title: "Pub/Sub y Colas", description: "Comunicación asíncrona entre microservicios con canales de publicación-suscripción.", iconName: "Layers" },
        ]
    },
    {
        name: "BullMQ",
        slug: "bullmq",
        iconName: "BullMQIcon",
        description: "Sistema de colas distribuidas sobre Redis para procesamiento background, jobs programados y orquestación de tareas con reintentos exponenciales.",
        category: "data",
        practicalAbilities: [
            { title: "Jobs Asíncronos", description: "Descarga de trabajo pesado (envío masivo de emails, generación de PDFs fiscales) fuera del request principal.", iconName: "Zap" },
            { title: "Reintentos & Dead-Letter", description: "Reintentos exponenciales configurables, jobs muertos en colas de inspección y observabilidad por evento.", iconName: "Shield" },
            { title: "Workers Horizontales", description: "Escalado horizontal de consumidores sin coordinación manual; throughput proporcional al número de workers.", iconName: "Server" },
        ]
    },

    // === DEVOPS ===
    {
        name: "Docker",
        slug: "docker",
        iconName: "FaDocker",
        description: "Containerización de aplicaciones. Ambientes consistentes desde desarrollo hasta producción, base para CI/CD reproducible.",
        category: "devops",
        practicalAbilities: [
            { title: "Dockerfiles Optimizados", description: "Multi-stage builds para imágenes ligeras y seguras.", iconName: "Layers" },
            { title: "Docker Compose", description: "Orquestación local de servicios para desarrollo.", iconName: "Server" },
            { title: "Registry & CI/CD", description: "Integración con registries y pipelines de despliegue.", iconName: "GitBranch" },
        ]
    },
    {
        name: "Git & CI/CD",
        slug: "git",
        iconName: "FaGitAlt",
        description: "Control de versiones distribuido y automatización de pipelines. GitHub Actions para builds, tests y despliegues reproducibles.",
        category: "devops",
        practicalAbilities: [
            { title: "GitFlow & Trunk-Based", description: "Estrategias de branching según el contexto del proyecto.", iconName: "GitBranch" },
            { title: "GitHub Actions", description: "Pipelines CI/CD con testing automatizado, builds reproducibles y despliegues a Vercel/Railway.", iconName: "Zap" },
            { title: "DB Branching Integrado", description: "Cada PR levanta su propia rama de base de datos (Neon) para QA aislado antes del merge.", iconName: "Layers" },
        ]
    },
    {
        name: "Linux",
        slug: "linux",
        iconName: "LinuxIcon",
        description: "Sistema operativo de servidores. Administración, scripting, configuración de firewalls y operaciones en cliente activo (Consulado de Colombia).",
        category: "devops",
        practicalAbilities: [
            { title: "Shell Scripting", description: "Automatización de tareas con Bash y scripts de mantenimiento.", iconName: "Code2" },
            { title: "Firewall Config", description: "Configuración de firewalls (iptables/nftables/ufw) y SSH hardening en infraestructura crítica.", iconName: "Shield" },
            { title: "Server Administration", description: "Gestión de servidores locales, redes y mantenimiento periódico para clientes activos.", iconName: "Server" },
        ]
    },
    {
        name: "Railway",
        slug: "railway",
        iconName: "SiRailway",
        description: "Plataforma PaaS moderna para despliegue de contenedores y servicios backend con networking automático, secretos integrados y zero-config.",
        category: "devops",
        practicalAbilities: [
            { title: "Deploy desde Dockerfile & GitHub", description: "Despliegue automático en cada push con builds reproducibles desde imagen Docker o repositorio.", iconName: "GitBranch" },
            { title: "Variables de Entorno Gestionadas", description: "Gestión centralizada de secretos y configuraciones por entorno sin exposición de credenciales.", iconName: "Shield" },
            { title: "Databases Administradas", description: "PostgreSQL y Redis provisionados con backups automáticos, networking privado y monitoreo integrado.", iconName: "Database" },
        ]
    },

    // === CLOUD ===
    {
        name: "Vercel",
        slug: "vercel",
        iconName: "SiVercel",
        description: "Plataforma de despliegue para Next.js. Edge functions, preview deployments y CI/CD automático con observabilidad nativa.",
        category: "cloud",
        practicalAbilities: [
            { title: "Edge Runtime", description: "Lógica serverless ejecutada en el edge para baja latencia global; Sago One y Plenty Market corren ahí.", iconName: "Zap" },
            { title: "Preview Deployments", description: "Cada PR genera una URL aislada con base de datos branched para QA antes de merge.", iconName: "GitBranch" },
            { title: "Analytics & Vitals", description: "Web Vitals, logs en tiempo real y monitoreo de performance para mantener TTI < 3s.", iconName: "Layers" },
        ]
    },
    {
        name: "Google Cloud",
        slug: "google-cloud",
        iconName: "SiGooglecloud",
        description: "Plataforma cloud enterprise. Cloud Run, Cloud SQL y servicios serverless para cargas de trabajo que no encajan en edge runtime.",
        category: "cloud",
        practicalAbilities: [
            { title: "Cloud Run", description: "Contenedores serverless con escalado a cero y pago por uso para microservicios Go.", iconName: "Zap" },
            { title: "Cloud SQL", description: "PostgreSQL administrado para clientes que requieren residencia de datos específica.", iconName: "Database" },
            { title: "Networking & Security", description: "VPCs, IAM y service accounts para arquitecturas aisladas y auditables.", iconName: "Shield" },
        ]
    },

    // === SECURITY ===
    {
        name: "Seguridad & Compliance",
        slug: "security-compliance",
        iconName: "Shield",
        description: "Protocolos de seguridad de nivel bancario y arquitectura multi-tenant: AES-256-CBC, JWT, Row Level Security y cumplimiento DGI/PAC.",
        category: "security",
        practicalAbilities: [
            { title: "Encriptación AES-256-CBC", description: "Cifrado de credenciales PAC/DGI y datos fiscales con protocolos de nivel bancario.", iconName: "Shield" },
            { title: "Auth & JWT", description: "NextAuth, JWT y sesiones seguras con flujos de verificación que previenen accesos no autorizados.", iconName: "Server" },
            { title: "Multi-Tenancy + RLS", description: "Aislamiento de tenants a nivel de driver Prisma y Row Level Security en PostgreSQL: imposible filtrar datos cruzados.", iconName: "Database" },
        ]
    },
    {
        name: "PWA Offline-First",
        slug: "pwa-offline-first",
        iconName: "Zap",
        description: "Arquitecturas Progressive Web App con Service Workers para operaciones ininterrumpidas sin conectividad. Garantía de continuidad del negocio.",
        category: "security",
        practicalAbilities: [
            { title: "Service Workers & Caché", description: "Estrategias de caché agresiva que mantienen operativas las transacciones críticas sin internet.", iconName: "Zap" },
            { title: "Sincronización Offline", description: "Cola de operaciones offline con resolución de conflictos y sincronización automática al recuperar conexión.", iconName: "Server" },
            { title: "CUFE/CAFE Offline", description: "Algoritmo Módulo 10 implementado en Go para generar códigos fiscales sin conexión con contingencia de 72h.", iconName: "Layers" },
        ]
    },

    // === MOBILE & SYSTEMS ===
    {
        name: "Web Bluetooth & ESC/POS",
        slug: "web-bluetooth-escpos",
        iconName: "BluetoothIcon",
        description: "Impresión térmica e integración con periféricos directamente desde el navegador. Sin drivers, sin apps nativas, sin fricción para el merchant.",
        category: "mobile-systems",
        practicalAbilities: [
            { title: "Impresión Térmica", description: "Comandos ESC/POS sobre Web Bluetooth para impresoras térmicas en el POS de Sago One.", iconName: "Zap" },
            { title: "Escáner de Códigos en Tiempo Real", description: "Captura de barcode con la cámara y layout split-screen cámara/carrito para POS táctil.", iconName: "Code2" },
            { title: "Sin Apps Nativas", description: "El merchant solo abre el navegador. Cero instalación, cero permisos especiales, cero soporte de drivers.", iconName: "Server" },
        ]
    },
    {
        name: "Alpine Linux & PTY",
        slug: "alpine-linux-pty",
        iconName: "LinuxIcon",
        description: "Entornos Linux mínimos y pseudo-terminales reales. Base de Gravital-Shell: ejecuta Alpine en Android sin root, con sesiones múltiples y persistentes.",
        category: "mobile-systems",
        practicalAbilities: [
            { title: "Alpine sin Root", description: "Entornos Alpine Linux ejecutándose sobre Android con proot, sin requerir privilegios root.", iconName: "Server" },
            { title: "PTY Real", description: "Pseudo-terminales reales para herramientas que requieren TTY (vim, htop, less) — no emulaciones aproximadas.", iconName: "Code2" },
            { title: "Sesiones Exportables", description: "Estado completo de sesión exportable/importable; continuidad real entre dispositivos.", iconName: "GitBranch" },
        ]
    },

    // === AI ENGINEERING ===
    {
        name: "AI Engineering",
        slug: "ai-engineering",
        iconName: "BrainCircuit",
        description: "Ingeniería avanzada con modelos de IA — no vibecoding sino orquestación programática, automatización de pipelines y administración guiada por agentes.",
        category: "ai-engineering",
        practicalAbilities: [
            { title: "Vercel AI SDK & LLMs", description: "Integración de Claude, GPT-4, Gemini y modelos locales en flujos de producción con streaming y tool-use.", iconName: "Zap" },
            { title: "TensorFlow.js Edge AI", description: "Asistencia biométrica en Sago One: modelos corriendo en el dispositivo sin enviar datos sensibles a la nube.", iconName: "Code2" },
            { title: "Agentes de Código", description: "Uso de Claude Code, Open Hands y agentes CLI para automatizar tareas de ingeniería: refactoring, testing, deploys.", iconName: "Server" },
        ]
    },
];

export const skillCategories: SkillCategoryData[] = [
    {
        id: "frontend",
        name: "Frontend & Producto Web",
        description: "Next.js 15, React 19, TypeScript",
        businessValue: "TTI < 3s, SEO desde el primer render, alta mantenibilidad y prevención de la deuda técnica que erosiona el ROI.",
        iconName: "Code2"
    },
    {
        id: "backend",
        name: "Backend & Servicios API",
        description: "Go, Rust, Node.js — APIs concurrentes y herramientas nativas",
        businessValue: "Servicios de baja latencia, microservicios fiscales con tiempos de respuesta en microsegundos y herramientas nativas sin overhead.",
        iconName: "Server"
    },
    {
        id: "data",
        name: "Datos & Persistencia",
        description: "PostgreSQL, Prisma, Neon, Redis, BullMQ, SQL",
        businessValue: "Escalabilidad elástica, tipado seguro extremo a extremo, colas distribuidas para procesamiento background y branching de base de datos por PR.",
        iconName: "Database"
    },
    {
        id: "devops",
        name: "DevOps & Infraestructura",
        description: "Docker, GitHub Actions, Linux, Railway",
        businessValue: "Pipelines CI/CD automatizados, builds reproducibles, configuración de firewalls e infraestructura operativa sin fricción.",
        iconName: "Settings2"
    },
    {
        id: "cloud",
        name: "Cloud Computing",
        description: "Vercel Edge, Google Cloud",
        businessValue: "Alta disponibilidad global (99.9% uptime), auto-escalado ante picos de demanda y cumplimiento de estándares de seguridad corporativa.",
        iconName: "Cloud"
    },
    {
        id: "security",
        name: "Seguridad & Compliance",
        description: "AES-256-CBC, JWT, RLS, PWA Offline-First, DGI/PAC",
        businessValue: "Cumplimiento normativo bancario y DGI, aislamiento multi-tenant garantizado y continuidad ininterrumpida sin conectividad.",
        iconName: "Shield"
    },
    {
        id: "mobile-systems",
        name: "Móvil & Sistemas",
        description: "Kotlin / Android, Alpine Linux, ESC/POS, Web Bluetooth",
        businessValue: "Herramientas nativas para developers, integración con periféricos físicos sin drivers y entornos Linux en el bolsillo.",
        iconName: "Smartphone"
    },
    {
        id: "ai-engineering",
        name: "AI Engineering",
        description: "Vercel AI SDK, TensorFlow.js, agentes de código",
        businessValue: "Automatización de procesos de ingeniería, IA en el edge sin filtrar datos sensibles y orquestación profesional de modelos.",
        iconName: "BrainCircuit"
    },
];

// ─── English translations for skill categories ─────────────────────────────
const skillCategoriesEn: SkillCategoryData[] = [
    { id: "frontend",      name: "Frontend & Web Product",   description: "Next.js 15, React 19, TypeScript",                               businessValue: "TTI < 3s, SEO from the first render, high maintainability and prevention of technical debt that erodes client ROI.", iconName: "Code2" },
    { id: "backend",       name: "Backend & API Services",   description: "Go, Rust, Node.js — concurrent APIs and native tools",             businessValue: "Low-latency services, fiscal microservices with microsecond response times and native tools with zero overhead.", iconName: "Server" },
    { id: "data",          name: "Data & Persistence",       description: "PostgreSQL, Prisma, Neon, Redis, BullMQ, SQL",                    businessValue: "Elastic scalability, end-to-end type safety, distributed queues for background processing, and per-PR database branching.", iconName: "Database" },
    { id: "devops",        name: "DevOps & Infrastructure",  description: "Docker, GitHub Actions, Linux, Railway",                          businessValue: "Automated CI/CD pipelines, reproducible builds, firewall configuration, and frictionless operational infrastructure.", iconName: "Settings2" },
    { id: "cloud",         name: "Cloud Computing",          description: "Vercel Edge, Google Cloud",                                       businessValue: "Global high availability (99.9% uptime), auto-scaling for demand spikes, and compliance with corporate security standards.", iconName: "Cloud" },
    { id: "security",      name: "Security & Compliance",    description: "AES-256-CBC, JWT, RLS, PWA Offline-First, DGI/PAC",               businessValue: "Bank-grade and DGI regulatory compliance, guaranteed multi-tenant isolation, and uninterrupted connectivity-free continuity.", iconName: "Shield" },
    { id: "mobile-systems",name: "Mobile & Systems",         description: "Kotlin / Android, Alpine Linux, ESC/POS, Web Bluetooth",          businessValue: "Native developer tools, physical peripheral integration without drivers, and Linux environments in your pocket.", iconName: "Smartphone" },
    { id: "ai-engineering",name: "AI Engineering",           description: "Vercel AI SDK, TensorFlow.js, code agents",                       businessValue: "Engineering process automation, edge AI without leaking sensitive data, and professional model orchestration.", iconName: "BrainCircuit" },
];

// ─── English translations for individual skill descriptions ───────────────
const skillDescriptionsEn: Record<string, string> = {
    "nextjs":              "Production React framework for high-performance web applications with SSR, SSG and React Server Components.",
    "typescript":          "JavaScript superset with static typing. Essential for scalable and maintainable projects.",
    "javascript":          "Fundamental language of the web. Deep mastery of ES6+, async/await and modern patterns.",
    "golang":              "High-performance compiled language for concurrent backend services, low-latency APIs, and systems tooling.",
    "rust":                "Systems language with memory safety guarantees without GC. Used for native Android tools (VPN routing, audio DSP) and critical modules with zero overhead.",
    "kotlin":              "Primary language for native Android. Used to build developer tools like professional Linux terminals in your pocket.",
    "postgresql":          "Robust, extensible relational database. The standard for enterprise applications with critical transactional workloads.",
    "prisma":              "Modern ORM with automatic typing. Declarative schema, versioned migrations, and Client Extensions for secure multi-tenancy.",
    "neon":                "Serverless PostgreSQL with native branching. Critical for resilient staging and production environments without extra costs.",
    "sql":                 "Standard language for relational database queries. Essential for optimization and data analysis.",
    "redis-upstash":       "In-memory and serverless database for high-speed caching, rate limiting, and pub/sub. Upstash for stateless edge computing.",
    "bullmq":              "Distributed queue system on Redis for background processing, scheduled jobs, and task orchestration with exponential retries.",
    "docker":              "Application containerization. Consistent environments from development to production, base for reproducible CI/CD.",
    "git":                 "Distributed version control and pipeline automation. GitHub Actions for reproducible builds, tests, and deployments.",
    "linux":               "Server operating system. Administration, scripting, firewall configuration, and operations in active client deployments.",
    "railway":             "Modern PaaS platform for deploying containers and backend services with automatic networking, integrated secrets, and zero-config.",
    "vercel":              "Deployment platform for Next.js. Edge functions, preview deployments, and automatic CI/CD with native observability.",
    "google-cloud":        "Enterprise cloud platform. Cloud Run, Cloud SQL, and serverless services for workloads that don't fit edge runtime.",
    "security-compliance": "Bank-grade security protocols and multi-tenant architecture: AES-256-CBC, JWT, Row Level Security, and DGI/PAC compliance.",
    "pwa-offline-first":   "Progressive Web App architectures with Service Workers for uninterrupted operations without connectivity. Business continuity guarantee.",
    "web-bluetooth-escpos":"Thermal printing and peripheral integration directly from the browser. No drivers, no native apps, no friction for the merchant.",
    "alpine-linux-pty":    "Minimal Linux environments and real pseudo-terminals. Base of Gravital-Shell: runs Alpine on Android without root, with multiple persistent sessions.",
    "ai-engineering":      "Advanced engineering with AI models — not vibecoding but programmatic orchestration, pipeline automation, and agent-guided administration.",
};

export function getSkillsData(locale: string = 'es'): SkillData[] {
    if (locale !== 'en') return skillsData;
    return skillsData.map(skill => ({
        ...skill,
        description: skillDescriptionsEn[skill.slug] ?? skill.description,
    }));
}

export function getSkillCategories(locale: string = 'es'): SkillCategoryData[] {
    return locale === 'en' ? skillCategoriesEn : skillCategories;
}
