
export type PracticalAbilityData = {
    title: string;
    description: string;
    iconName: string; // Storing icon name as string for mapping
};

export type SkillData = {
    name: string;
    slug: string;
    description: string;
    category: "core" | "data" | "infrastructure";
    practicalAbilities: PracticalAbilityData[];
    iconName: string; // Storing icon name as string
};

export const skillsData: SkillData[] = [
    // === CORE: Frontend & Backend ===
    {
        name: "Next.js",
        slug: "nextjs",
        iconName: "TbBrandNextjs",
        description: "Framework React de producción para aplicaciones web de alto rendimiento con SSR, SSG y React Server Components.",
        category: "core",
        practicalAbilities: [
            { title: "App Router & Server Components", description: "Arquitecturas modernas con React Server Components para renderizado óptimo y bundle size mínimo.", iconName: "Zap" },
            { title: "API Routes & Server Actions", description: "Backend integrado con endpoints RESTful y Server Actions para operaciones de base de datos.", iconName: "Server" },
            { title: "PWA & Offline-First", description: "Implementación de Service Workers y estrategias de caché para aplicaciones offline-first.", iconName: "Shield" },
        ]
    },
    {
        name: "TypeScript",
        slug: "typescript",
        iconName: "SiTypescript",
        description: "Superset de JavaScript con tipado estático. Esencial para proyectos escalables y mantenibles.",
        category: "core",
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
        category: "core",
        practicalAbilities: [
            { title: "ES6+ & Modern Patterns", description: "Destructuring, spread operators, modules, async/await y programación funcional.", iconName: "Code2" },
            { title: "Node.js Runtime", description: "Desarrollo backend con Node.js, APIs RESTful y scripts de automatización.", iconName: "Server" },
            { title: "Service Workers", description: "Implementación de PWA con caché strategies y sincronización offline.", iconName: "Zap" },
        ]
    },

    // === DATA: Databases & ORMs ===
    {
        name: "PostgreSQL",
        slug: "postgresql",
        iconName: "SiPostgresql",
        description: "Base de datos relacional robusta y extensible. El estándar para aplicaciones empresariales.",
        category: "data",
        practicalAbilities: [
            { title: "Diseño de Esquemas", description: "Modelado de datos normalizados, relaciones complejas y constraints para integridad.", iconName: "Database" },
            { title: "Queries Optimizadas", description: "JOINs eficientes, índices estratégicos y análisis de query plans.", iconName: "Zap" },
            { title: "Transacciones ACID", description: "Operaciones atómicas para datos críticos (facturación, inventario, pagos).", iconName: "Shield" },
        ]
    },
    {
        name: "Prisma ORM",
        slug: "prisma",
        iconName: "PrismaIcon",
        description: "ORM moderno con tipado automático. Schema declarativo y migraciones versionadas.",
        category: "data",
        practicalAbilities: [
            { title: "Schema Declarativo", description: "Definición de modelos, relaciones y validaciones en un solo archivo.", iconName: "Layers" },
            { title: "Migraciones Versionadas", description: "Control de versiones del schema con rollback y historial de cambios.", iconName: "GitBranch" },
            { title: "Type-Safe Queries", description: "Autocompletado y validación de queries en tiempo de compilación.", iconName: "Shield" },
        ]
    },
    {
        name: "Neon",
        slug: "neon",
        iconName: "NeonIcon",
        description: "PostgreSQL serverless con branching. Ideal para desarrollo y producción escalable.",
        category: "data",
        practicalAbilities: [
            { title: "Serverless PostgreSQL", description: "Escalado automático y pago por uso. Sin administración de servidores.", iconName: "Zap" },
            { title: "Database Branching", description: "Crear branches de la base de datos para desarrollo y testing aislado.", iconName: "GitBranch" },
            { title: "Connection Pooling", description: "Gestión eficiente de conexiones para aplicaciones serverless.", iconName: "Server" },
        ]
    },
    {
        name: "SQL",
        slug: "sql",
        iconName: "SqlIcon",
        description: "Lenguaje estándar para consultas de bases de datos relacionales.",
        category: "data",
        practicalAbilities: [
            { title: "Queries Complejas", description: "CTEs, window functions, subqueries y aggregations avanzadas.", iconName: "Code2" },
            { title: "Optimización", description: "Análisis de EXPLAIN plans e indexación estratégica.", iconName: "Zap" },
            { title: "Stored Procedures", description: "Lógica de negocio en la base de datos cuando es apropiado.", iconName: "Server" },
        ]
    },

    // === INFRASTRUCTURE: Cloud & DevOps ===
    {
        name: "Vercel",
        slug: "vercel",
        iconName: "SiVercel",
        description: "Plataforma de despliegue para Next.js. Edge functions, preview deployments y CI/CD automático.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "GitOps & Preview Deploys", description: "Deploy automático en cada push con URLs de preview para cada PR.", iconName: "GitBranch" },
            { title: "Edge Functions", description: "Lógica serverless ejecutada en el edge para baja latencia global.", iconName: "Zap" },
            { title: "Analytics & Monitoring", description: "Web Vitals, logs en tiempo real y monitoreo de performance.", iconName: "Layers" },
        ]
    },
    {
        name: "Docker",
        slug: "docker",
        iconName: "FaDocker",
        description: "Containerización de aplicaciones. Ambientes consistentes desde desarrollo hasta producción.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "Dockerfiles Optimizados", description: "Multi-stage builds para imágenes ligeras y seguras.", iconName: "Layers" },
            { title: "Docker Compose", description: "Orquestación local de servicios para desarrollo.", iconName: "Server" },
            { title: "Registry & CI/CD", description: "Integración con registries y pipelines de despliegue.", iconName: "GitBranch" },
        ]
    },
    {
        name: "Kubernetes",
        slug: "kubernetes",
        iconName: "SiKubernetes",
        description: "Orquestación de contenedores a escala. Auto-scaling, self-healing y rolling updates.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "Deployments & Services", description: "Configuración de pods, réplicas, load balancing y networking.", iconName: "Server" },
            { title: "Auto-Scaling (HPA)", description: "Escalado automático basado en métricas de CPU/memoria.", iconName: "Zap" },
            { title: "Helm Charts", description: "Gestión de configuraciones complejas con templates reutilizables.", iconName: "Layers" },
        ]
    },
    {
        name: "Google Cloud",
        slug: "google-cloud",
        iconName: "SiGooglecloud",
        description: "Plataforma cloud enterprise. GKE, Cloud Run, Cloud SQL y servicios serverless.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "GKE (Kubernetes Engine)", description: "Clusters de Kubernetes administrados con auto-scaling y auto-repair.", iconName: "Server" },
            { title: "Cloud Run", description: "Contenedores serverless con escalado a cero y pago por uso.", iconName: "Zap" },
            { title: "Cloud SQL", description: "PostgreSQL administrado con backups automáticos y alta disponibilidad.", iconName: "Database" },
        ]
    },
    {
        name: "Oracle Cloud",
        slug: "oracle-cloud",
        iconName: "OracleCloudIcon",
        description: "Cloud enterprise para cargas de trabajo críticas. OCI Compute, Object Storage y networking avanzado.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "OCI Compute", description: "Instancias escalables con shapes flexibles y bare metal.", iconName: "Server" },
            { title: "Object Storage", description: "Almacenamiento de objetos con tiers de acceso y lifecycle policies.", iconName: "Database" },
            { title: "Networking & Security", description: "VCNs, subnets, security lists y NSGs para arquitecturas seguras.", iconName: "Shield" },
        ]
    },
    {
        name: "Git",
        slug: "git",
        iconName: "FaGitAlt",
        description: "Control de versiones distribuido. Branching strategies, rebasing y colaboración en equipo.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "GitFlow & Trunk-Based", description: "Estrategias de branching según el contexto del proyecto.", iconName: "GitBranch" },
            { title: "Rebase & Cherry-Pick", description: "Historial limpio y manipulación precisa de commits.", iconName: "Layers" },
            { title: "GitHub Actions", description: "CI/CD pipelines, automated testing y deploy workflows.", iconName: "Zap" },
        ]
    },
    {
        name: "Linux",
        slug: "linux",
        iconName: "LinuxIcon",
        description: "Sistema operativo de servidores. Administración, scripting y seguridad.",
        category: "infrastructure",
        practicalAbilities: [
            { title: "Shell Scripting", description: "Automatización de tareas con Bash y scripts de mantenimiento.", iconName: "Code2" },
            { title: "Administración de Servidores", description: "Configuración de servicios, usuarios, permisos y networking.", iconName: "Server" },
            { title: "Seguridad", description: "Firewalls (iptables/ufw), SSH hardening y auditoría de logs.", iconName: "Shield" },
        ]
    },
];

export const skillCategories = [
    { id: "core", name: "Core", description: "Frontend & Backend" },
    { id: "data", name: "Data", description: "Bases de Datos & ORMs" },
    { id: "infrastructure", name: "Infrastructure", description: "Cloud & DevOps" },
] as const;
