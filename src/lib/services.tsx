import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog } from "lucide-react";

export type ServicePackage = {
  name: "Básico" | "Profesional" | "Enterprise";
  price: number;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: string;
};

export type ServiceAddOn = {
  name: string;
  price: number;
  priceSuffix?: string;
  description: string;
};

export type Service = {
  title: string;
  slug: string;
  icon: ReactElement;
  shortDescription: string;
  fullDescription: string;
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  tags: string[];
  published: boolean;
};

export const services: Service[] = [
  {
    title: "Creación de Aplicaciones Web",
    slug: "creacion-de-aplicaciones-web",
    icon: <Code2 />,
    shortDescription: "Aplicaciones web modernas, rápidas y seguras con Next.js y Vercel.",
    fullDescription: "Desde landing pages hasta aplicaciones complejas, construimos soluciones web a medida que son rápidas, seguras y escalables. Nos enfocamos en una experiencia de usuario excepcional y un rendimiento técnico impecable.",
    packages: [
      {
        name: "Básico",
        price: 2000,
        description: "Ideal para MVPs, portafolios o sitios institucionales que necesitan una presencia online profesional y rápida.",
        features: ["Hasta 5 páginas estáticas", "Diseño responsive", "CMS para auto-gestión", "Optimización SEO inicial", "Despliegue en Vercel"],
        cta: "Empezar Proyecto"
      },
      {
        name: "Profesional",
        price: 5000,
        description: "La solución perfecta para negocios en crecimiento que requieren funcionalidades interactivas y backend.",
        features: ["Todo en Básico", "Hasta 10 páginas", "Backend con Node.js/Firebase", "Base de datos (Firestore/Postgres)", "Autenticación de usuarios"],
        cta: "Solicitar Cotización"
      },
      {
        name: "Enterprise",
        price: 12000,
        description: "Para aplicaciones a gran escala con requerimientos complejos de integración, seguridad y escalabilidad.",
        features: ["Todo en Profesional", "Páginas ilimitadas", "Integraciones con APIs de terceros", "Dashboard de administración a medida", "Soporte prioritario"],
        cta: "Agendar Llamada"
      }
    ],
    addOns: [
      { name: "Blog administrable", price: 400, description: "Añade un blog completo a tu sitio web." },
      { name: "Integración de E-commerce", price: 1500, description: "Capacidades de tienda online con pasarela de pagos." },
      { name: "Panel de Analítica Avanzado", price: 800, description: "Visualiza el comportamiento de tus usuarios." }
    ],
    tags: ["web", "nextjs", "react", "seo", "pwa"],
    published: true
  },
  {
    title: "Integración de IA",
    slug: "integracion-de-inteligencia-artificial",
    icon: <BrainCircuit />,
    shortDescription: "Potencia tus aplicaciones con modelos de IA para análisis, automatización y personalización.",
    fullDescription: "Llevamos tus aplicaciones al siguiente nivel integrando modelos de lenguaje avanzados (como GPT y Gemini) para crear funcionalidades inteligentes que mejoran la experiencia de usuario y automatizan procesos.",
    packages: [
      {
        name: "Básico",
        price: 1500,
        description: "Incorpora una funcionalidad de IA específica, como un generador de texto o un chatbot simple.",
        features: ["Integración de 1 modelo de IA", "Backend para la funcionalidad", "Hasta 10 horas de ajuste de prompts", "Documentación de API"],
        cta: "Empezar Proyecto"
      },
      {
        name: "Profesional",
        price: 4500,
        description: "Desarrolla soluciones de IA más complejas, como sistemas de recomendación o análisis de datos no estructurados.",
        features: ["Todo en Básico", "Integración de hasta 3 modelos", "Pipeline de datos para la IA", "Dashboard de monitoreo básico"],
        cta: "Solicitar Cotización"
      },
      {
        name: "Enterprise",
        price: 10000,
        description: "Soluciones de IA a medida con entrenamiento de modelos, sistemas multi-agente y flujos de trabajo complejos.",
        features: ["Todo en Profesional", "Fine-tuning de modelos", "Vector Database para RAG", "Soporte y optimización continua"],
        cta: "Agendar Llamada"
      }
    ],
    addOns: [
        { name: "Chatbot con memoria", price: 1200, description: "Un chatbot que recuerda conversaciones pasadas." },
        { name: "Sistema de Búsqueda Semántica", price: 2500, description: "Búsqueda inteligente sobre tus documentos." }
    ],
    tags: ["ia", "ai", "machine-learning", "gemini", "openai"],
    published: true
  },
  {
    title: "Consultoría de Software",
    slug: "consultoria-de-software",
    icon: <Puzzle />,
    shortDescription: "Asesoría estratégica para optimizar tu arquitectura, procesos y stack tecnológico.",
    fullDescription: "Ofrecemos nuestra experiencia para ayudarte a tomar las mejores decisiones técnicas. Realizamos auditorías, diseñamos arquitecturas escalables y optimizamos flujos de trabajo de desarrollo (DevOps).",
    packages: [
      {
        name: "Básico",
        price: 500,
        description: "Una sesión de diagnóstico y recomendaciones puntuales para un problema específico.",
        features: ["Sesión de 2 horas", "Análisis de 1 área (ej. performance)", "Documento de recomendaciones", "Roadmap de acción"],
        cta: "Agendar Sesión"
      },
      {
        name: "Profesional",
        price: 2500,
        priceSuffix: "/mes",
        description: "Acompañamiento mensual para equipos que necesitan una guía técnica continua.",
        features: ["Hasta 10 horas/mes de consultoría", "Revisión de código y arquitectura", "Soporte vía Slack", "Planificación de sprints"],
        cta: "Contratar Retainer"
      },
      {
        name: "Enterprise",
        price: 6000,
        priceSuffix: "/mes",
        description: "CTO fraccional para startups y empresas. Liderazgo técnico, estrategia y gestión de equipo.",
        features: ["Todo en Profesional", "Hasta 25 horas/mes", "Definición de roadmap tecnológico", "Participación en reuniones estratégicas"],
        cta: "Agendar Llamada"
      }
    ],
    addOns: [
        { name: "Auditoría de Seguridad", price: 1500, description: "Análisis completo de vulnerabilidades." },
        { name: "Diseño de Pipeline CI/CD", price: 1200, description: "Automatización de despliegues." }
    ],
    tags: ["consultoria", "arquitectura", "devops", "estrategia"],
    published: true
  },
  {
    title: "Mantenimiento y Soporte",
    slug: "mantenimiento-y-soporte",
    icon: <MonitorCog />,
    shortDescription: "Planes mensuales para asegurar que tu aplicación funcione de manera óptima, segura y actualizada.",
    fullDescription: "La tecnología no se detiene. Ofrecemos planes de mantenimiento para que puedas enfocarte en tu negocio mientras nosotros nos encargamos de la salud técnica de tu aplicación.",
    packages: [
      {
        name: "Básico",
        price: 250,
        priceSuffix: "/mes",
        description: "Tranquilidad para sitios y aplicaciones pequeñas. Monitoreo y backups.",
        features: ["Monitoreo de uptime 24/7", "Backups semanales", "Actualizaciones de seguridad", "Reporte mensual de estado"],
        cta: "Seleccionar Plan"
      },
      {
        name: "Profesional",
        price: 600,
        priceSuffix: "/mes",
        description: "Soporte activo para aplicaciones en producción con usuarios activos.",
        features: ["Todo en Básico", "Backups diarios", "Banco de 5 horas para bugs/mejoras", "Soporte por email prioritario"],
        cta: "Seleccionar Plan"
      },
      {
        name: "Enterprise",
        price: 1500,
        priceSuffix: "/mes",
        description: "Soporte de misión crítica para sistemas complejos y de alto tráfico.",
        features: ["Todo en Profesional", "Canal de Slack dedicado", "Banco de 15 horas", "Optimización de performance proactiva"],
        cta: "Seleccionar Plan"
      }
    ],
    addOns: [],
    tags: ["soporte", "mantenimiento", "seguridad", "devops"],
    published: true
  }
];
