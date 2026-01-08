

import * as React from "react";
import { Server, Shield, Zap, Layers, Code2, Database, GitBranch, Briefcase } from "lucide-react";
import { FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiVercel, SiKubernetes, SiJavascript, SiGooglecloud } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { LinuxIcon, PrismaIcon, NeonIcon, OracleCloudIcon } from "./icons";

export type PracticalAbility = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type Skill = {
  name: string;
  slug: string;
  icon: React.ElementType;
  description: string;
  category: "core" | "data" | "infrastructure";
  practicalAbilities: PracticalAbility[];
};

export const skills: Skill[] = [
  // === CORE: Frontend & Backend ===
  {
    name: "Next.js",
    slug: "nextjs",
    icon: (props: React.SVGProps<SVGSVGElement>) => <TbBrandNextjs {...props} />,
    description: "Framework React de producción para aplicaciones web de alto rendimiento con SSR, SSG y React Server Components.",
    category: "core",
    practicalAbilities: [
      { title: "App Router & Server Components", description: "Arquitecturas modernas con React Server Components para renderizado óptimo y bundle size mínimo.", icon: Zap },
      { title: "API Routes & Server Actions", description: "Backend integrado con endpoints RESTful y Server Actions para operaciones de base de datos.", icon: Server },
      { title: "PWA & Offline-First", description: "Implementación de Service Workers y estrategias de caché para aplicaciones offline-first.", icon: Shield },
    ]
  },
  {
    name: "TypeScript",
    slug: "typescript",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SiTypescript {...props} />,
    description: "Superset de JavaScript con tipado estático. Esencial para proyectos escalables y mantenibles.",
    category: "core",
    practicalAbilities: [
      { title: "Type Safety End-to-End", description: "Tipado desde la base de datos (Prisma) hasta el frontend, eliminando errores en tiempo de compilación.", icon: Shield },
      { title: "Interfaces & Generics", description: "Diseño de tipos reutilizables para APIs, componentes y lógica de negocio.", icon: Layers },
      { title: "Integración con Prisma", description: "Tipos autogenerados desde el schema para queries type-safe.", icon: Database },
    ]
  },
  {
    name: "JavaScript",
    slug: "javascript",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SiJavascript {...props} />,
    description: "Lenguaje fundamental de la web. Dominio profundo de ES6+, async/await y patrones modernos.",
    category: "core",
    practicalAbilities: [
      { title: "ES6+ & Modern Patterns", description: "Destructuring, spread operators, modules, async/await y programación funcional.", icon: Code2 },
      { title: "Node.js Runtime", description: "Desarrollo backend con Node.js, APIs RESTful y scripts de automatización.", icon: Server },
      { title: "Service Workers", description: "Implementación de PWA con caché strategies y sincronización offline.", icon: Zap },
    ]
  },

  // === DATA: Databases & ORMs ===
  {
    name: "PostgreSQL",
    slug: "postgresql",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SiPostgresql {...props} />,
    description: "Base de datos relacional robusta y extensible. El estándar para aplicaciones empresariales.",
    category: "data",
    practicalAbilities: [
      { title: "Diseño de Esquemas", description: "Modelado de datos normalizados, relaciones complejas y constraints para integridad.", icon: Database },
      { title: "Queries Optimizadas", description: "JOINs eficientes, índices estratégicos y análisis de query plans.", icon: Zap },
      { title: "Transacciones ACID", description: "Operaciones atómicas para datos críticos (facturación, inventario, pagos).", icon: Shield },
    ]
  },
  {
    name: "Prisma ORM",
    slug: "prisma",
    icon: PrismaIcon,
    description: "ORM moderno con tipado automático. Schema declarativo y migraciones versionadas.",
    category: "data",
    practicalAbilities: [
      { title: "Schema Declarativo", description: "Definición de modelos, relaciones y validaciones en un solo archivo.", icon: Layers },
      { title: "Migraciones Versionadas", description: "Control de versiones del schema con rollback y historial de cambios.", icon: GitBranch },
      { title: "Type-Safe Queries", description: "Autocompletado y validación de queries en tiempo de compilación.", icon: Shield },
    ]
  },
  {
    name: "Neon",
    slug: "neon",
    icon: NeonIcon,
    description: "PostgreSQL serverless con branching. Ideal para desarrollo y producción escalable.",
    category: "data",
    practicalAbilities: [
      { title: "Serverless PostgreSQL", description: "Escalado automático y pago por uso. Sin administración de servidores.", icon: Zap },
      { title: "Database Branching", description: "Crear branches de la base de datos para desarrollo y testing aislado.", icon: GitBranch },
      { title: "Connection Pooling", description: "Gestión eficiente de conexiones para aplicaciones serverless.", icon: Server },
    ]
  },
  {
    name: "SQL",
    slug: "sql",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 6.5C2 8.98 6.48 11 12 11s10-2.02 10-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: "Lenguaje estándar para consultas de bases de datos relacionales.",
    category: "data",
    practicalAbilities: [
      { title: "Queries Complejas", description: "CTEs, window functions, subqueries y aggregations avanzadas.", icon: Code2 },
      { title: "Optimización", description: "Análisis de EXPLAIN plans e indexación estratégica.", icon: Zap },
      { title: "Stored Procedures", description: "Lógica de negocio en la base de datos cuando es apropiado.", icon: Server },
    ]
  },

  // === INFRASTRUCTURE: Cloud & DevOps ===
  {
    name: "Vercel",
    slug: "vercel",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SiVercel {...props} />,
    description: "Plataforma de despliegue para Next.js. Edge functions, preview deployments y CI/CD automático.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "GitOps & Preview Deploys", description: "Deploy automático en cada push con URLs de preview para cada PR.", icon: GitBranch },
      { title: "Edge Functions", description: "Lógica serverless ejecutada en el edge para baja latencia global.", icon: Zap },
      { title: "Analytics & Monitoring", description: "Web Vitals, logs en tiempo real y monitoreo de performance.", icon: Layers },
    ]
  },
  {
    name: "Docker",
    slug: "docker",
    icon: (props: React.SVGProps<SVGSVGElement>) => <FaDocker {...props} />,
    description: "Containerización de aplicaciones. Ambientes consistentes desde desarrollo hasta producción.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "Dockerfiles Optimizados", description: "Multi-stage builds para imágenes ligeras y seguras.", icon: Layers },
      { title: "Docker Compose", description: "Orquestación local de servicios para desarrollo.", icon: Server },
      { title: "Registry & CI/CD", description: "Integración con registries y pipelines de despliegue.", icon: GitBranch },
    ]
  },
  {
    name: "Kubernetes",
    slug: "kubernetes",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SiKubernetes {...props} />,
    description: "Orquestación de contenedores a escala. Auto-scaling, self-healing y rolling updates.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "Deployments & Services", description: "Configuración de pods, réplicas, load balancing y networking.", icon: Server },
      { title: "Auto-Scaling (HPA)", description: "Escalado automático basado en métricas de CPU/memoria.", icon: Zap },
      { title: "Helm Charts", description: "Gestión de configuraciones complejas con templates reutilizables.", icon: Layers },
    ]
  },
  {
    name: "Google Cloud",
    slug: "google-cloud",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SiGooglecloud {...props} />,
    description: "Plataforma cloud enterprise. GKE, Cloud Run, Cloud SQL y servicios serverless.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "GKE (Kubernetes Engine)", description: "Clusters de Kubernetes administrados con auto-scaling y auto-repair.", icon: Server },
      { title: "Cloud Run", description: "Contenedores serverless con escalado a cero y pago por uso.", icon: Zap },
      { title: "Cloud SQL", description: "PostgreSQL administrado con backups automáticos y alta disponibilidad.", icon: Database },
    ]
  },
  {
    name: "Oracle Cloud",
    slug: "oracle-cloud",
    icon: OracleCloudIcon,
    description: "Cloud enterprise para cargas de trabajo críticas. OCI Compute, Object Storage y networking avanzado.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "OCI Compute", description: "Instancias escalables con shapes flexibles y bare metal.", icon: Server },
      { title: "Object Storage", description: "Almacenamiento de objetos con tiers de acceso y lifecycle policies.", icon: Database },
      { title: "Networking & Security", description: "VCNs, subnets, security lists y NSGs para arquitecturas seguras.", icon: Shield },
    ]
  },
  {
    name: "Git",
    slug: "git",
    icon: (props: React.SVGProps<SVGSVGElement>) => <FaGitAlt {...props} />,
    description: "Control de versiones distribuido. Branching strategies, rebasing y colaboración en equipo.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "GitFlow & Trunk-Based", description: "Estrategias de branching según el contexto del proyecto.", icon: GitBranch },
      { title: "Rebase & Cherry-Pick", description: "Historial limpio y manipulación precisa de commits.", icon: Layers },
      { title: "GitHub Actions", description: "CI/CD pipelines, automated testing y deploy workflows.", icon: Zap },
    ]
  },
  {
    name: "Linux",
    slug: "linux",
    icon: LinuxIcon,
    description: "Sistema operativo de servidores. Administración, scripting y seguridad.",
    category: "infrastructure",
    practicalAbilities: [
      { title: "Shell Scripting", description: "Automatización de tareas con Bash y scripts de mantenimiento.", icon: Code2 },
      { title: "Administración de Servidores", description: "Configuración de servicios, usuarios, permisos y networking.", icon: Server },
      { title: "Seguridad", description: "Firewalls (iptables/ufw), SSH hardening y auditoría de logs.", icon: Shield },
    ]
  },
];

// Helper para obtener skills por categoría
export const getSkillsByCategory = (category: "core" | "data" | "infrastructure") =>
  skills.filter(skill => skill.category === category);

// Categorías para el grid visual
export const skillCategories = [
  { id: "core", name: "Core", description: "Frontend & Backend" },
  { id: "data", name: "Data", description: "Bases de Datos & ORMs" },
  { id: "infrastructure", name: "Infrastructure", description: "Cloud & DevOps" },
] as const;
