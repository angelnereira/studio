import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog } from "lucide-react";

export type Service = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  architecture: {
    summary: string;
    diagramHint: string;
    recommendedStack: string[];
    details: string;
  };
  deliverables: string[];
  pricing: {
    currency: "USD";
    startingPrice: number;
    averagePrice: number;
    monthlyMaintenanceFrom: number;
    notes: string;
  };
  timeEstimate: {
    minWeeks: number;
    maxWeeks: number;
  };
  illustration: {
    storagePath: string;
    alt: string;
    caption: string;
    promptForGenerator: string;
  };
  cta: {
    buttonText: string;
    contactFormRef: string;
  };
  tags: string[];
  published: boolean;
  icon: ReactElement;
};

export const services: Service[] = [
  {
    title: "Creación de Aplicaciones Móviles",
    slug: "creacion-de-aplicaciones-moviles",
    shortDescription: "Apps nativas y cross-platform para iOS y Android, listas para escalar.",
    fullDescription: "...",
    architecture: {
      summary: "Arquitectura cross-platform con backend serverless para máxima escalabilidad y mínimo coste operativo.",
      diagramHint: "Diagrama mostrando React Native, Firebase (Auth, Firestore, Functions) y APIs externas.",
      recommendedStack: ["React Native", "TypeScript", "Firebase", "Expo"],
      details: "..."
    },
    deliverables: ["App (iOS/Android)", "Backend API", "Panel de administración", "CI/CD"],
    pricing: {
      currency: "USD",
      startingPrice: 3000,
      averagePrice: 8000,
      monthlyMaintenanceFrom: 50,
      notes: "El precio inicial cubre un MVP con hasta 5 pantallas y una integración de API."
    },
    timeEstimate: { minWeeks: 8, maxWeeks: 16 },
    illustration: {
      storagePath: "storage/services/creacion-de-aplicaciones-moviles/illustration.jpg",
      alt: "Desarrollo de aplicaciones móviles con React Native y Firebase",
      caption: "Apps móviles modernas y escalables.",
      promptForGenerator: "Isometric illustration of a mobile app development workspace — smartphone screens, code snippets, cloud icons, TypeScript and React Native logos, modern flat style, high detail"
    },
    cta: { buttonText: "Cotizar App Móvil", contactFormRef: "forms/estimateRequest" },
    tags: ["movil", "react-native", "firebase", "ios", "android"],
    published: true,
    icon: <Rocket />
  },
  {
    title: "Creación de Aplicaciones Web",
    slug: "creacion-de-aplicaciones-web",
    shortDescription: "Aplicaciones web modernas, rápidas y seguras con Next.js y Vercel.",
    fullDescription: "...",
    architecture: {
      summary: "Aplicación web Server-Side Rendered (SSR) o Static Site Generation (SSG) para performance y SEO óptimos.",
      diagramHint: "Diagrama con Next.js en Vercel, conectado a Firebase/Postgres y APIs de terceros.",
      recommendedStack: ["Next.js", "TypeScript", "React", "Vercel", "Tailwind CSS"],
      details: "..."
    },
    deliverables: ["Aplicación web", "Backend API (si aplica)", "CMS integrado", "Despliegue continuo"],
    pricing: {
      currency: "USD",
      startingPrice: 2000,
      averagePrice: 7000,
      monthlyMaintenanceFrom: 20,
      notes: "El precio inicial incluye un sitio de hasta 10 páginas con CMS."
    },
    timeEstimate: { minWeeks: 4, maxWeeks: 12 },
    illustration: {
      storagePath: "storage/services/creacion-de-aplicaciones-web/illustration.jpg",
      alt: "Desarrollo de aplicaciones web con Next.js",
      caption: "Web apps rápidas y optimizadas para SEO.",
      promptForGenerator: "Modern web app illustration — developer desk, monitors with UI wireframes, server rack, Next.js and Firebase icons, clean aesthetic"
    },
    cta: { buttonText: "Cotizar App Web", contactFormRef: "forms/estimateRequest" },
    tags: ["web", "nextjs", "react", "seo", "pwa"],
    published: true,
    icon: <Code2 />
  },
  {
    title: "Sistemas de Facturación",
    slug: "sistemas-de-facturacion",
    shortDescription: "Soluciones de facturación a medida, integradas con sistemas contables y pasarelas de pago.",
    fullDescription: "...",
    architecture: {
      summary: "Sistema web seguro con base de datos relacional, APIs para integraciones y un panel de control intuitivo.",
      diagramHint: "Diagrama mostrando el flujo desde la creación de una factura hasta el pago y registro contable.",
      recommendedStack: ["Node.js", "PostgreSQL", "React", "Docker", "Stripe API"],
      details: "..."
    },
    deliverables: ["Plataforma de facturación", "API de integración", "Dashboard de reportería", "Seguridad Nivel PCI (si aplica)"],
    pricing: {
      currency: "USD",
      startingPrice: 2500,
      averagePrice: 9000,
      monthlyMaintenanceFrom: 50,
      notes: "Cumplimiento con normativas locales (ej. DGI en Panamá) puede tener costos adicionales."
    },
    timeEstimate: { minWeeks: 10, maxWeeks: 20 },
    illustration: {
      storagePath: "storage/services/sistemas-de-facturacion/illustration.jpg",
      alt: "Sistema de facturación en la nube",
      caption: "Facturación automatizada y segura.",
      promptForGenerator: "Billing system illustration — invoices, receipts, secure shield icon, database, smooth vector art"
    },
    cta: { buttonText: "Cotizar Sistema", contactFormRef: "forms/estimateRequest" },
    tags: ["facturacion", "fintech", "api", "seguridad", "enterprise"],
    published: true,
    icon: <Receipt />
  },
  {
    title: "Portafolios Profesionales",
    slug: "portafolios-profesionales",
    shortDescription: "Sitios web elegantes y autoadministrables para profesionales y creativos.",
    fullDescription: "...",
    architecture: {
      summary: "Sitio estático generado con Next.js (SSG) para máxima velocidad y seguridad, con un CMS headless.",
      diagramHint: "Flujo de contenido desde un CMS (Sanity, Contentful) hacia el sitio estático en Vercel.",
      recommendedStack: ["Next.js", "Sanity.io", "Vercel", "Tailwind CSS"],
      details: "..."
    },
    deliverables: ["Sitio web personal", "CMS para auto-gestión", "Optimización SEO", "Diseño responsive"],
    pricing: {
      currency: "USD",
      startingPrice: 500,
      averagePrice: 1500,
      monthlyMaintenanceFrom: 5,
      notes: "El precio inicial incluye una plantilla premium y configuración del CMS."
    },
    timeEstimate: { minWeeks: 1, maxWeeks: 3 },
    illustration: {
      storagePath: "storage/services/portafolios-profesionales/illustration.jpg",
      alt: "Portafolio profesional en múltiples dispositivos",
      caption: "Tu marca personal, elevada.",
      promptForGenerator: "Professional portfolio mockups on devices — lawyer, architect and doctor themed, clean minimal UI, responsive screens"
    },
    cta: { buttonText: "Crear mi Portafolio", contactFormRef: "forms/estimateRequest" },
    tags: ["portafolio", "web", "diseño", "marca-personal"],
    published: true,
    icon: <Briefcase />
  },
  {
    title: "Sistemas de Inventario",
    slug: "sistemas-de-inventario",
    shortDescription: "Controla tu stock en tiempo real con un sistema a medida, accesible desde cualquier lugar.",
    fullDescription: "...",
    architecture: {
      summary: "Aplicación web y móvil conectada a una base de datos centralizada para la gestión de inventario en tiempo real.",
      diagramHint: "Diagrama de flujo: entrada de mercancía, escaneo de código de barras, actualización en BD, reportes.",
      recommendedStack: ["React", "Node.js", "PostgreSQL", "React Native (opcional)"],
      details: "..."
    },
    deliverables: ["Plataforma de gestión de stock", "App móvil para operarios", "Dashboard de análisis", "Integración con punto de venta"],
    pricing: {
      currency: "USD",
      startingPrice: 2000,
      averagePrice: 6000,
      monthlyMaintenanceFrom: 20,
      notes: "El precio puede variar según la necesidad de hardware (scanners) e integraciones."
    },
    timeEstimate: { minWeeks: 8, maxWeeks: 16 },
    illustration: {
      storagePath: "storage/services/sistemas-de-inventario/illustration.jpg",
      alt: "Sistema de gestión de inventario",
      caption: "Control total sobre tu inventario.",
      promptForGenerator: "Inventory system illustration — warehouse shelves, barcode scanners, dashboard analytics, logistic icons"
    },
    cta: { buttonText: "Cotizar Sistema de Inventario", contactFormRef: "forms/estimateRequest" },
    tags: ["inventario", "logistica", "erp", "retail"],
    published: true,
    icon: <Building />
  },
  {
    title: "E-commerce",
    slug: "e-commerce",
    shortDescription: "Tiendas online completas, desde el catálogo de productos hasta el checkout y la integración de pagos.",
    fullDescription: "...",
    architecture: {
      summary: "Plataforma de e-commerce headless, usando un backend robusto y un frontend rápido y personalizable.",
      diagramHint: "Arquitectura con Shopify/BigCommerce como backend y un frontend en Next.js para una experiencia de usuario superior.",
      recommendedStack: ["Next.js", "Shopify API", "TypeScript", "Stripe"],
      details: "..."
    },
    deliverables: ["Tienda online", "Pasarela de pagos", "Gestión de productos y pedidos", "Optimización de conversión"],
    pricing: {
      currency: "USD",
      startingPrice: 2000,
      averagePrice: 10000,
      monthlyMaintenanceFrom: 30,
      notes: "No incluye costos de plataforma (ej. Shopify) ni comisiones por transacción."
    },
    timeEstimate: { minWeeks: 6, maxWeeks: 18 },
    illustration: {
      storagePath: "storage/services/e-commerce/illustration.jpg",
      alt: "Plataforma de E-commerce",
      caption: "Vende online con una tienda profesional.",
      promptForGenerator: "E-commerce platform illustration — shopping cart, product cards, payment gateway integration, seamless checkout flow"
    },
    cta: { buttonText: "Construir mi Tienda", contactFormRef: "forms/estimateRequest" },
    tags: ["ecommerce", "tienda-online", "shopify", "pagos"],
    published: true,
    icon: <ShoppingCart />
  },
  {
    title: "Consultoría de Software",
    slug: "consultoria-de-software",
    shortDescription: "Asesoría estratégica para optimizar tu arquitectura, procesos de desarrollo y stack tecnológico.",
    fullDescription: "...",
    architecture: {
      summary: "N/A - El servicio es la definición de la arquitectura misma.",
      diagramHint: "Un diagrama de flujo mostrando el proceso: Auditoría -> Diagnóstico -> Propuesta -> Implementación.",
      recommendedStack: ["Miro", "Notion", "Jira", "Git"],
      details: "..."
    },
    deliverables: ["Auditoría técnica", "Roadmap de mejoras", "Diseño de arquitectura", "Plan de implementación"],
    pricing: {
      currency: "USD",
      startingPrice: 50,
      averagePrice: 150,
      monthlyMaintenanceFrom: 0,
      notes: "Precios por hora. Retainers mensuales disponibles desde $800 USD."
    },
    timeEstimate: { minWeeks: 1, maxWeeks: 4 },
    illustration: {
      storagePath: "storage/services/consultoria-de-software/illustration.jpg",
      alt: "Consultoría de arquitectura de software",
      caption: "Estrategia y experiencia para tu proyecto.",
      promptForGenerator: "Consultancy illustration — meeting table, architectural diagrams, lightbulb ideas, arrows showing strategy and planning"
    },
    cta: { buttonText: "Agendar Consultoría", contactFormRef: "forms/estimateRequest" },
    tags: ["consultoria", "arquitectura", "devops", "estrategia"],
    published: true,
    icon: <Puzzle />
  },
  {
    title: "Integración de IA",
    slug: "integracion-de-inteligencia-artificial",
    shortDescription: "Potencia tus aplicaciones con modelos de IA para análisis de datos, automatización y personalización.",
    fullDescription: "...",
    architecture: {
      summary: "Integración de modelos de IA (OpenAI, Gemini) a través de APIs en aplicaciones existentes o nuevas.",
      diagramHint: "Diagrama mostrando una app que envía datos a una API de IA y recibe una respuesta que mejora la UX.",
      recommendedStack: ["Python", "Node.js", "Google AI Platform", "Hugging Face"],
      details: "..."
    },
    deliverables: ["Feature de IA integrada", "Pipeline de datos para IA", "Optimización de prompts", "Dashboard de monitoreo de IA"],
    pricing: {
      currency: "USD",
      startingPrice: 3000,
      averagePrice: 15000,
      monthlyMaintenanceFrom: 100,
      notes: "No incluye costos de uso de las APIs de IA (ej. OpenAI, Google AI)."
    },
    timeEstimate: { minWeeks: 6, maxWeeks: 24 },
    illustration: {
      storagePath: "storage/services/integracion-de-inteligencia-artificial/illustration.jpg",
      alt: "Integración de Inteligencia Artificial en apps",
      caption: "Inteligencia artificial para potenciar tu negocio.",
      promptForGenerator: "AI integration illustration — neural network overlay on existing app screens, data flow, models running in cloud"
    },
    cta: { buttonText: "Cotizar Integración IA", contactFormRef: "forms/estimateRequest" },
    tags: ["ia", "ai", "machine-learning", "gemini", "openai"],
    published: true,
    icon: <BrainCircuit />
  },
  {
    title: "Chatbots Inteligentes",
    slug: "chatbots",
    shortDescription: "Asistentes virtuales y chatbots para atención al cliente, ventas y automatización de tareas.",
    fullDescription: "...",
    architecture: {
      summary: "Chatbot basado en reglas o integrado con un LLM (Large Language Model) para conversaciones naturales.",
      diagramHint: "Flujo de conversación, desde la pregunta del usuario hasta la respuesta del bot, con posibles consultas a una base de datos.",
      recommendedStack: ["Dialogflow", "Genkit", "Firebase", "WhatsApp API"],
      details: "..."
    },
    deliverables: ["Chatbot funcional", "Integración (web, WhatsApp, etc.)", "Panel de analíticas", "Flujos de conversación"],
    pricing: {
      currency: "USD",
      startingPrice: 500,
      averagePrice: 3000,
      monthlyMaintenanceFrom: 10,
      notes: "El precio varía si es un bot basado en reglas o conectado a un LLM."
    },
    timeEstimate: { minWeeks: 1, maxWeeks: 6 },
    illustration: {
      storagePath: "storage/services/chatbots/illustration.jpg",
      alt: "Desarrollo de chatbots inteligentes",
      caption: "Automatiza la comunicación con tus clientes.",
      promptForGenerator: "Chatbot illustration — chat window, bot avatar, flowchart, user interactions, conversational UI"
    },
    cta: { buttonText: "Crear mi Chatbot", contactFormRef: "forms/estimateRequest" },
    tags: ["chatbot", "ia", "atencion-al-cliente", "automatizacion"],
    published: true,
    icon: <Bot />
  },
  {
    title: "Bases de Datos y Registros",
    slug: "bases-de-datos-y-registros",
    shortDescription: "Diseño, migración y optimización de bases de datos relacionales y NoSQL para performance y seguridad.",
    fullDescription: "...",
    architecture: {
      summary: "Modelado de datos optimizado para el caso de uso, con estrategias de indexación, replicación y backup.",
      diagramHint: "Diagrama entidad-relación (SQL) o estructura de documentos (NoSQL).",
      recommendedStack: ["PostgreSQL", "Firestore", "MongoDB", "SQLAlchemy"],
      details: "..."
    },
    deliverables: ["Modelo de datos", "Base de datos implementada", "Plan de migración", "Estrategia de backups"],
    pricing: {
      currency: "USD",
      startingPrice: 800,
      averagePrice: 4500,
      monthlyMaintenanceFrom: 20,
      notes: "El precio depende del volumen de datos y la complejidad de la migración."
    },
    timeEstimate: { minWeeks: 2, maxWeeks: 8 },
    illustration: {
      storagePath: "storage/services/bases-de-datos-y-registros/illustration.jpg",
      alt: "Diseño y optimización de bases de datos",
      caption: "Datos organizados, seguros y rápidos.",
      promptForGenerator: "Database illustration — stacked databases, secure storage, replication arrows and backups"
    },
    cta: { buttonText: "Optimizar mi Base de Datos", contactFormRef: "forms/estimateRequest" },
    tags: ["database", "sql", "nosql", "postgres", "firestore"],
    published: true,
icon: <Database />
  },
  {
    title: "Controles de Acceso",
    slug: "controles-de-acceso",
    shortDescription: "Implementación de sistemas de autenticación, roles y permisos (RBAC) para proteger tus aplicaciones.",
    fullDescription: "...",
    architecture: {
      summary: "Sistema de autenticación robusto usando JWT, OAuth 2.0 y control de acceso basado en roles.",
      diagramHint: "Flujo de login, emisión de token, validación en el backend y acceso a recursos protegidos.",
      recommendedStack: ["Firebase Auth", "Auth0", "JWT", "OAuth2"],
      details: "..."
    },
    deliverables: ["Sistema de login/registro", "Roles y permisos", "Integración con SSO (opcional)", "Seguridad de API"],
    pricing: {
      currency: "USD",
      startingPrice: 600,
      averagePrice: 3500,
      monthlyMaintenanceFrom: 10,
      notes: "El precio varía con la complejidad de los roles y la integración de SSO."
    },
    timeEstimate: { minWeeks: 1, maxWeeks: 5 },
    illustration: {
      storagePath: "storage/services/controles-de-acceso/illustration.jpg",
      alt: "Implementación de control de acceso y seguridad",
      caption: "Protege tus datos y aplicaciones.",
      promptForGenerator: "Access control illustration — locks, keys, user roles, SSO icons, secure shield"
    },
    cta: { buttonText: "Asegurar mi App", contactFormRef: "forms/estimateRequest" },
    tags: ["seguridad", "auth", "rbac", "sso", "jwt"],
    published: true,
    icon: <KeyRound />
  },
  {
    title: "Mantenimiento de Servidores",
    slug: "mantenimiento-de-servidores",
    shortDescription: "Asegura la estabilidad y seguridad de tu infraestructura con monitoreo y actualizaciones proactivas.",
    fullDescription: "...",
    architecture: {
      summary: "Plan de mantenimiento que incluye monitoreo de uptime, parches de seguridad, backups y optimización de rendimiento.",
      diagramHint: "Ciclo de monitoreo, alerta, acción y reporte para el mantenimiento de un servidor.",
      recommendedStack: ["Linux", "Docker", "Ansible", "Prometheus", "Grafana"],
      details: "..."
    },
    deliverables: ["Monitoreo 24/7", "Reportes de rendimiento", "Gestión de backups", "Actualizaciones de seguridad"],
    pricing: {
      currency: "USD",
      startingPrice: 250,
      averagePrice: 500,
      monthlyMaintenanceFrom: 250,
      notes: "Precio mensual. El costo varía según el número y tipo de servidores."
    },
    timeEstimate: { minWeeks: 0, maxWeeks: 0 },
    illustration: {
      storagePath: "storage/services/mantenimiento-servidores/illustration.jpg",
      alt: "Mantenimiento y monitoreo de servidores en la nube",
      caption: "Tu infraestructura, siempre operativa.",
      promptForGenerator: "Server maintenance illustration — server racks, monitoring dashboard with graphs, gears and tools, secure lock icon."
    },
    cta: { buttonText: "Solicitar Mantenimiento", contactFormRef: "forms/estimateRequest" },
    tags: ["servidores", "devops", "seguridad", "linux", "mantenimiento"],
    published: true,
    icon: <Server />
  },
  {
    title: "Mantenimiento de Aplicaciones",
    slug: "mantenimiento-de-aplicaciones",
    shortDescription: "Soporte continuo para tus aplicaciones, incluyendo corrección de errores y actualizaciones menores.",
    fullDescription: "...",
    architecture: {
      summary: "Retainer mensual para asegurar el correcto funcionamiento de aplicaciones, actualización de dependencias y resolución de bugs.",
      diagramHint: "Flujo de ticket de soporte: reporte de bug, diagnóstico, corrección, despliegue.",
      recommendedStack: ["Git", "Jira", "Sentry", "Dependabot"],
      details: "..."
    },
    deliverables: ["Corrección de errores", "Actualización de dependencias", "Soporte técnico", "Mejoras menores"],
    pricing: {
      currency: "USD",
      startingPrice: 350,
      averagePrice: 700,
      monthlyMaintenanceFrom: 350,
      notes: "Precio mensual. Incluye un banco de horas para soporte y desarrollo."
    },
    timeEstimate: { minWeeks: 0, maxWeeks: 0 },
    illustration: {
      storagePath: "storage/services/mantenimiento-aplicaciones/illustration.jpg",
      alt: "Mantenimiento de aplicaciones web y móviles",
      caption: "Tu aplicación, siempre al día.",
      promptForGenerator: "Application maintenance illustration — mobile and web screens with tools, code being updated, checkmarks for resolved bugs."
    },
    cta: { buttonText: "Solicitar Mantenimiento", contactFormRef: "forms/estimateRequest" },
    tags: ["soporte", "mantenimiento", "bug-fixing", "actualizaciones"],
    published: true,
    icon: <FileCog />
  },
  {
    title: "Mantenimiento de Sitios Web",
    slug: "mantenimiento-de-sitios-web",
    shortDescription: "Mantén tu sitio web seguro, rápido y funcionando sin problemas con nuestro plan de mantenimiento.",
    fullDescription: "...",
    architecture: {
      summary: "Servicio de mantenimiento para sitios CMS (WordPress, etc.) y estáticos, incluyendo actualizaciones de plugins/core, backups y scans de seguridad.",
      diagramHint: "Calendario de tareas de mantenimiento: backups semanales, actualizaciones mensuales, scans diarios.",
      recommendedStack: ["WordPress", "Next.js", "Google Analytics", "Sucuri"],
      details: "..."
    },
    deliverables: ["Actualizaciones de CMS y plugins", "Backups periódicos", "Scans de malware", "Reportes de estado"],
    pricing: {
      currency: "USD",
      startingPrice: 100,
      averagePrice: 200,
      monthlyMaintenanceFrom: 100,
      notes: "Precio mensual. Planes varían según la complejidad del sitio (ej. e-commerce)."
    },
    timeEstimate: { minWeeks: 0, maxWeeks: 0 },
    illustration: {
      storagePath: "storage/services/mantenimiento-sitios-web/illustration.jpg",
      alt: "Mantenimiento de sitios web y CMS",
      caption: "Tu sitio web, siempre protegido.",
      promptForGenerator: "Website maintenance illustration — website on a monitor with a shield, tools, backup clouds, and update icons."
    },
    cta: { buttonText: "Solicitar Mantenimiento", contactFormRef: "forms/estimateRequest" },
    tags: ["mantenimiento-web", "wordpress", "seguridad", "backups"],
    published: true,
    icon: <MonitorCog />
  }
];
