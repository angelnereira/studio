
export type PracticalAbilityData = {
    title: string;
    description: string;
    iconName: string;
};

export type SkillCategory = "frontend" | "backend" | "data" | "devops" | "cloud" | "security" | "ai-engineering";

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
            { title: "PWA & Offline-First", description: "Implementación de Service Workers y estrategias de caché para aplicaciones offline-first.", iconName: "Shield" },
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
        description: "Lenguaje compilado de alto rendimiento para servicios backend concurrentes, APIs de baja latencia y sistemas distribuidos a escala.",
        category: "backend",
        practicalAbilities: [
            { title: "Goroutines & Concurrencia", description: "Manejo de miles de conexiones simultáneas con goroutines y channels para servicios de alto throughput.", iconName: "Zap" },
            { title: "APIs REST de Alto Rendimiento", description: "Servicios HTTP con latencias de microsegundos, binarios nativos y sin dependencias de runtime.", iconName: "Server" },
            { title: "Integración con Kafka & Redis", description: "Productores y consumidores de eventos en tiempo real con SDKs nativos de Go para arquitecturas distribuidas.", iconName: "Database" },
        ]
    },

    // === DATA ===
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
    {
        name: "Redis / Upstash",
        slug: "redis-upstash",
        iconName: "SiRedis",
        description: "Base de datos in-memory y serverless para caching de alta velocidad, rate limiting y pub/sub. Upstash para edge computing sin estado.",
        category: "data",
        practicalAbilities: [
            { title: "Caching con TTL e Invalidación", description: "Estrategias de caché para reducir latencia de APIs y eliminar consultas redundantes a PostgreSQL.", iconName: "Zap" },
            { title: "Rate Limiting Serverless", description: "Control de tasa de peticiones en edge functions con Upstash Redis para APIs públicas y privadas.", iconName: "Shield" },
            { title: "Pub/Sub y Colas", description: "Comunicación asíncrona entre microservicios con canales de publicación-suscripción y colas de mensajes.", iconName: "Layers" },
        ]
    },
    {
        name: "Apache Kafka",
        slug: "apache-kafka",
        iconName: "SiApachekafka",
        description: "Plataforma de streaming de eventos distribuida para arquitecturas event-driven y procesamiento de datos a escala en tiempo real.",
        category: "data",
        practicalAbilities: [
            { title: "Producers & Consumers", description: "Publicación y consumo de eventos con tópicos, particiones y grupos de consumidores para alto throughput.", iconName: "GitBranch" },
            { title: "Procesamiento de Streams", description: "Filtrado, transformación y agregación de eventos en tiempo real con baja latencia.", iconName: "Zap" },
            { title: "Integración Go & Node.js", description: "SDKs nativos para producir y consumir mensajes desde servicios en Go y APIs en Node.js.", iconName: "Server" },
        ]
    },
    {
        name: "MinIO",
        slug: "minio",
        iconName: "SiMinio",
        description: "Almacenamiento de objetos S3-compatible de alto rendimiento para assets, documentos, backups y datos no estructurados con alta disponibilidad.",
        category: "data",
        practicalAbilities: [
            { title: "Gestión de Buckets & Políticas", description: "CRUD de objetos, políticas de acceso, versioning y lifecycle management para datos críticos.", iconName: "Database" },
            { title: "Integración SDK JS & Go", description: "Carga y descarga de archivos desde aplicaciones Next.js y servicios Go con presigned URLs.", iconName: "Code2" },
            { title: "Modo Distribuido", description: "Alta disponibilidad con replicación multi-nodo para resiliencia y tolerancia a fallos.", iconName: "Server" },
        ]
    },

    // === DEVOPS ===
    {
        name: "Docker",
        slug: "docker",
        iconName: "FaDocker",
        description: "Containerización de aplicaciones. Ambientes consistentes desde desarrollo hasta producción.",
        category: "devops",
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
        category: "devops",
        practicalAbilities: [
            { title: "Deployments & Services", description: "Configuración de pods, réplicas, load balancing y networking.", iconName: "Server" },
            { title: "Auto-Scaling (HPA)", description: "Escalado automático basado en métricas de CPU/memoria.", iconName: "Zap" },
            { title: "Helm Charts", description: "Gestión de configuraciones complejas con templates reutilizables.", iconName: "Layers" },
        ]
    },
    {
        name: "Git",
        slug: "git",
        iconName: "FaGitAlt",
        description: "Control de versiones distribuido. Branching strategies, rebasing y colaboración en equipo.",
        category: "devops",
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
        category: "devops",
        practicalAbilities: [
            { title: "Shell Scripting", description: "Automatización de tareas con Bash y scripts de mantenimiento.", iconName: "Code2" },
            { title: "Administración de Servidores", description: "Configuración de servicios, usuarios, permisos y networking.", iconName: "Server" },
            { title: "Seguridad", description: "Firewalls (iptables/ufw), SSH hardening y auditoría de logs.", iconName: "Shield" },
        ]
    },
    {
        name: "Terraform",
        slug: "terraform",
        iconName: "SiTerraform",
        description: "Infrastructure as Code declarativa para provisionar, versionar y gestionar infraestructura cloud de forma reproducible y consistente.",
        category: "devops",
        practicalAbilities: [
            { title: "Infraestructura Declarativa", description: "Definición de recursos cloud con HCL y gestión de estado remoto para equipos.", iconName: "Layers" },
            { title: "Provisioning Multi-Cloud", description: "Aprovisionamiento reproducible en Google Cloud, Oracle OCI y Railway desde un solo codebase.", iconName: "Server" },
            { title: "Módulos Reutilizables", description: "Abstracción de configuraciones complejas en módulos versionados para diferentes entornos.", iconName: "Code2" },
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
        description: "Plataforma de despliegue para Next.js. Edge functions, preview deployments y CI/CD automático.",
        category: "cloud",
        practicalAbilities: [
            { title: "GitOps & Preview Deploys", description: "Deploy automático en cada push con URLs de preview para cada PR.", iconName: "GitBranch" },
            { title: "Edge Functions", description: "Lógica serverless ejecutada en el edge para baja latencia global.", iconName: "Zap" },
            { title: "Analytics & Monitoring", description: "Web Vitals, logs en tiempo real y monitoreo de performance.", iconName: "Layers" },
        ]
    },
    {
        name: "Google Cloud",
        slug: "google-cloud",
        iconName: "SiGooglecloud",
        description: "Plataforma cloud enterprise. GKE, Cloud Run, Cloud SQL y servicios serverless.",
        category: "cloud",
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
        category: "cloud",
        practicalAbilities: [
            { title: "OCI Compute", description: "Instancias escalables con shapes flexibles y bare metal.", iconName: "Server" },
            { title: "Object Storage", description: "Almacenamiento de objetos con tiers de acceso y lifecycle policies.", iconName: "Database" },
            { title: "Networking & Security", description: "VCNs, subnets, security lists y NSGs para arquitecturas seguras.", iconName: "Shield" },
        ]
    },

    // === SECURITY ===
    {
        name: "Seguridad y Criptografía",
        slug: "security-cryptography",
        iconName: "Shield",
        description: "Implementación de protocolos de seguridad de nivel bancario: AES-256, autenticación robusta y cumplimiento normativo DGI/PAC.",
        category: "security",
        practicalAbilities: [
            { title: "Encriptación AES-256", description: "Cifrado de datos sensibles (credenciales PAC/DGI, datos fiscales) con protocolos de nivel bancario.", iconName: "Shield" },
            { title: "Autenticación Segura", description: "NextAuth, JWT, sesiones seguras y flujos de verificación que previenen accesos no autorizados.", iconName: "Server" },
            { title: "Cumplimiento Normativo", description: "Integración certificada con APIs gubernamentales (DGI/PAC) con validación estricta y auditoría de cada transacción.", iconName: "Layers" },
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
            { title: "App Instalable (PWA)", description: "Experiencia nativa en cualquier dispositivo sin App Store. Menor fricción de adopción y mayor retención.", iconName: "Layers" },
        ]
    },

    // === AI ENGINEERING ===
    {
        name: "AI Engineering",
        slug: "ai-engineering",
        iconName: "BrainCircuit",
        description: "Ingeniería avanzada con modelos de IA — no vibecoding sino automatización de procesos, orquestación de modelos y administración de infraestructura mediante agentes de código.",
        category: "ai-engineering",
        practicalAbilities: [
            { title: "Integración de APIs de Modelos", description: "Consumo y orquestación programática de Claude, GPT-4, Gemini y modelos locales desde aplicaciones de producción.", iconName: "Zap" },
            { title: "Agentes de Código Avanzados", description: "Uso de Claude Code, Open Hands y agentes CLI para automatizar tareas de ingeniería: refactoring, testing, deploys y análisis de código.", iconName: "Code2" },
            { title: "IA para Infraestructura", description: "Administración de servidores, diagnóstico de sistemas y ejecución de pipelines CI/CD guiados por agentes de inteligencia artificial.", iconName: "Server" },
        ]
    },
];

export const skillCategories: SkillCategoryData[] = [
    {
        id: "frontend",
        name: "Frontend & Producto Web",
        description: "Next.js, TypeScript, JavaScript Moderno",
        businessValue: "Optimización SEO desde el primer render, TTI < 3s, alta mantenibilidad del código y prevención de deuda técnica que erosiona el ROI.",
        iconName: "Code2"
    },
    {
        id: "backend",
        name: "Backend & Servicios API",
        description: "Go (Golang) — APIs concurrentes y sistemas distribuidos",
        businessValue: "Servicios de baja latencia con binarios nativos, procesamiento concurrente de miles de requests y arquitecturas event-driven que escalan sin fricción.",
        iconName: "Server"
    },
    {
        id: "data",
        name: "Datos & Persistencia",
        description: "PostgreSQL, Prisma, Neon, Redis, Kafka, MinIO, SQL",
        businessValue: "Escalabilidad elástica, tipado seguro extremo a extremo, streaming de eventos en tiempo real y almacenamiento de objetos para datos críticos de negocio.",
        iconName: "Database"
    },
    {
        id: "devops",
        name: "DevOps & Infraestructura",
        description: "Docker, Kubernetes, Git, Linux, Terraform, Railway",
        businessValue: "Pipelines CI/CD automatizados, infraestructura reproducible con IaC, contenedores consistentes y operaciones sin fricción desde desarrollo hasta producción.",
        iconName: "Settings2"
    },
    {
        id: "cloud",
        name: "Cloud Computing",
        description: "Vercel, Google Cloud, Oracle Cloud",
        businessValue: "Alta disponibilidad global (99.9% uptime), auto-escalado ante picos de demanda y cumplimiento de estándares de seguridad corporativa en la nube.",
        iconName: "Cloud"
    },
    {
        id: "security",
        name: "Ciberseguridad",
        description: "AES-256, Autenticación, PWA Offline-First, Compliance DGI",
        businessValue: "Cumplimiento normativo bancario y DGI, protección contra brechas de datos y continuidad ininterrumpida de operaciones críticas sin conectividad.",
        iconName: "Shield"
    },
    {
        id: "ai-engineering",
        name: "AI Engineering",
        description: "APIs de modelos, agentes de código, automatización con IA",
        businessValue: "Automatización de procesos de ingeniería, reducción de tiempo de desarrollo y capacidad para orquestar, consumir y administrar modelos de IA como herramienta profesional.",
        iconName: "BrainCircuit"
    },
];
