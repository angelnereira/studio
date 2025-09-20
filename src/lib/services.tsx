
import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog, Smartphone, LineChart, ShieldCheck, Wallet, GitPullRequest, Cloud, Construction, Gauge, Users } from "lucide-react";

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
  // === CATEGORÍA: PRESENCIA ONLINE ===
  {
    title: "Página Web Sencilla / Landing Page",
    slug: "pagina-web-sencilla",
    icon: <Rocket />,
    shortDescription: "Lanza tu presencia en línea con una página web rápida, moderna y optimizada para convertir visitantes.",
    fullDescription: "Creamos páginas web de una sola sección o sitios pequeños (hasta 3 páginas) que capturan la esencia de tu marca y comunican tu valor de forma clara y directa. Ideal para validar ideas, promocionar eventos o establecer una presencia profesional.",
    packages: [
      { name: "Básico", price: 350, description: "Una landing page profesional para empezar.", features: ["Diseño de 1 página", "Formulario de contacto", "100% Responsivo", "Despliegue incluido"], cta: "Empezar Ahora" },
      { name: "Profesional", price: 750, description: "Un sitio pequeño de hasta 3 páginas.", features: ["Todo en Básico", "Hasta 3 secciones (ej. Home, Sobre Nosotros, Contacto)", "Integración con CMS básico", "SEO Técnico inicial"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 1500, description: "Paquete completo con blog y optimización.", features: ["Todo en Profesional", "Blog auto-administrable", "Optimización de velocidad avanzada", "Analítica web"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["Startups", "MVPs", "Marketing"],
    published: true,
  },
  {
    title: "Portafolio para Profesionales",
    slug: "portafolio-profesional",
    icon: <Briefcase />,
    shortDescription: "Destaca tu trabajo y experiencia con un portafolio digital elegante que atraiga clientes y oportunidades.",
    fullDescription: "Diseñamos y desarrollamos portafolios web a medida para profesionales como tú (arquitectos, abogados, doctores, freelancers). Mostramos tus proyectos, habilidades y testimonios de una forma que genera confianza y te diferencia de la competencia.",
    packages: [
      { name: "Básico", price: 450, description: "Un portafolio limpio y profesional para mostrar tus mejores trabajos.", features: ["Galería de hasta 10 proyectos", "Página de biografía/CV", "Formulario de contacto", "Diseño elegante y minimalista"], cta: "Crear mi Portafolio" },
      { name: "Profesional", price: 900, description: "Portafolio dinámico con CMS para que puedas actualizar tus proyectos tú mismo.", features: ["Todo en Básico", "Gestor de Contenidos para proyectos", "Sección de blog o artículos", "Optimización SEO para tu nombre"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 1800, description: "La solución definitiva con casos de estudio detallados, video y más.", features: ["Todo en Profesional", "Páginas de caso de estudio a medida", "Integración de video y testimonios", "Sistema de agendamiento de citas"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["Freelancers", "Creativos", "Consultores"],
    published: false,
  },
  // === CATEGORÍA: E-COMMERCE Y PAGOS ===
  {
    title: "Tienda Online / E-commerce",
    slug: "tienda-online-ecommerce",
    icon: <ShoppingCart />,
    shortDescription: "Vende tus productos en línea con una tienda virtual rápida, segura y fácil de gestionar para tus clientes y para ti.",
    fullDescription: "Creamos soluciones de e-commerce completas, desde catálogos de productos y carritos de compra hasta la integración segura de pasarelas de pago. Nos enfocamos en una experiencia de compra fluida que maximice tus ventas.",
    packages: [
      { name: "Básico", price: 1500, description: "Lanza tu primera tienda online y empieza a vender.", features: ["Catálogo de hasta 50 productos", "Carrito de compras funcional", "Integración con 1 pasarela de pago (Stripe/PayPal)", "Panel para gestionar pedidos"], cta: "Empezar a Vender" },
      { name: "Profesional", price: 4000, description: "Una tienda robusta con funcionalidades avanzadas para escalar tu negocio.", features: ["Todo en Básico", "Productos ilimitados y variantes", "Cuentas de cliente y historial de pedidos", "Cupones de descuento y promociones"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 9000, description: "Solución a medida para e-commerce de alto volumen con integraciones complejas.", features: ["Todo en Profesional", "Integración con sistemas de inventario (ERP)", "Búsqueda avanzada de productos", "Programa de lealtad y referidos"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["Retail", "PYMEs", "Emprendedores"],
    published: false,
  },
    {
    title: "Integración de Pasarelas de Pago",
    slug: "integracion-pasarelas-de-pago",
    icon: <Wallet />,
    shortDescription: "Acepta pagos en línea de forma segura y eficiente en tu sitio o aplicación actual.",
    fullDescription: "Integramos las principales pasarelas de pago (Stripe, PayPal) en tu plataforma existente. Nos encargamos de todo el flujo técnico, desde el botón de pago hasta la confirmación de la transacción, garantizando la seguridad de los datos de tus clientes.",
    packages: [
        { name: "Básico", price: 500, description: "Integración de un método de pago simple.", features: ["Integración de Stripe o PayPal", "Botones de pago para productos/servicios", "Manejo de notificaciones (webhooks)"], cta: "Integrar Pagos" },
        { name: "Profesional", price: 1200, description: "Suscripciones y pagos recurrentes.", features: ["Todo en Básico", "Modelo de suscripción (pagos mensuales/anuales)", "Portal de cliente para gestionar suscripción"], cta: "Solicitar Cotización" },
        { name: "Enterprise", price: 2500, description: "Flujos de pago complejos y multi-pasarela.", features: ["Todo en Profesional", "Integración de múltiples pasarelas", "Marketplace (pagos divididos)", "Facturación automatizada"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["SaaS", "E-commerce", "Servicios"],
    published: false,
  },
  // === CATEGORÍA: OPERACIONES INTERNAS ===
  {
    title: "Sistemas de Inventarios",
    slug: "sistemas-de-inventarios",
    icon: <Building />,
    shortDescription: "Digitaliza y automatiza el control de tu stock con un sistema a medida que evita pérdidas y optimiza compras.",
    fullDescription: "Desarrollamos sistemas de gestión de inventario que te dan control total sobre tus existencias. Registra entradas, salidas, transferencias entre bodegas y recibe alertas automáticas de stock bajo para nunca perder una venta.",
    packages: [
      { name: "Básico", price: 2000, description: "Control de inventario esencial para pequeñas empresas.", features: ["Registro de productos y proveedores", "Entradas y salidas de stock manuales", "Reporte de existencias básico"], cta: "Optimizar mi Inventario" },
      { name: "Profesional", price: 5000, description: "Sistema avanzado con alertas y reportes detallados.", features: ["Todo en Básico", "Alertas de stock mínimo", "Lector de código de barras (vía app)", "Reportes de rotación y valoración"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 10000, description: "Integración completa con tu ecosistema de ventas y contabilidad (ERP).", features: ["Todo en Profesional", "Múltiples bodegas y sucursales", "Integración con punto de venta (POS) y e-commerce", "Predicción de demanda básica"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["PYMEs", "Retail", "Distribución"],
    published: false,
  },
  {
    title: "Control de Personal y Planilla",
    slug: "control-de-personal-y-planilla",
    icon: <Users />,
    shortDescription: "Gestiona la asistencia, roles y cálculo de nómina de tu equipo con una plataforma centralizada y segura.",
    fullDescription: "Simplificamos la gestión de recursos humanos con una aplicación a medida. Controla el acceso, registra la asistencia (check-in/check-out) y automatiza el cálculo de la planilla básica, reduciendo errores y ahorrando tiempo administrativo.",
     packages: [
      { name: "Básico", price: 1800, description: "Gestión de perfiles y roles de empleados.", features: ["Base de datos de empleados", "Perfiles y roles de acceso", "Directorio de personal"], cta: "Digitalizar mi Equipo" },
      { name: "Profesional", price: 4500, description: "Sistema de control de asistencia y tiempo.", features: ["Todo en Básico", "Registro de entrada/salida (check-in/out)", "Reportes de horas trabajadas", "Gestión de ausencias y vacaciones"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 8000, description: "Solución integral con cálculo de nómina.", features: ["Todo en Profesional", "Cálculo de salario y deducciones básicas", "Generación de recibos de pago", "Dashboard de RRHH"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["PYMEs", "Recursos Humanos", "Operaciones"],
    published: false,
  },
  // === CATEGORÍA: APLICACIONES Y DATOS ===
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
    title: "Aplicaciones Móviles",
    slug: "aplicaciones-moviles",
    icon: <Smartphone />,
    shortDescription: "Llega a tus clientes dondequiera que estén con una aplicación móvil nativa (iOS/Android) o PWA.",
    fullDescription: "Desarrollamos aplicaciones móviles que ofrecen una experiencia de usuario fluida y nativa. Ya sea una app para iOS y Android o una Progressive Web App (PWA) de instalación directa, creamos la solución perfecta para tu caso de uso.",
    packages: [
      { name: "Básico", price: 4000, description: "Una Progressive Web App (PWA) funcional.", features: ["App instalable desde el navegador", "Funcionalidad offline básica", "Notificaciones push", "Diseño adaptado a móvil"], cta: "Lanzar mi PWA" },
      { name: "Profesional", price: 10000, description: "Aplicación híbrida para iOS y Android.", features: ["Todo en Básico", "Publicación en App Store y Play Store", "Acceso a funcionalidades nativas (cámara, GPS)", "Base de código única (React Native)"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 25000, description: "Desarrollo nativo para máximo rendimiento y experiencia de usuario.", features: ["Todo en Profesional", "Desarrollo nativo separado (Swift/Kotlin)", "Máximo rendimiento y fluidez", "Integraciones complejas con hardware"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["Móvil", "iOS", "Android", "PWA"],
    published: false,
  },
  {
    title: "Dashboards de Monitoreo de Negocio",
    slug: "dashboards-de-monitoreo",
    icon: <LineChart />,
    shortDescription: "Visualiza los KPIs más importantes de tu negocio en tiempo real para tomar decisiones basadas en datos.",
    fullDescription: "Transformamos tus datos en conocimiento. Creamos dashboards interactivos que conectan tus diversas fuentes de información (ventas, marketing, operaciones) en un solo lugar, permitiéndote monitorear la salud de tu negocio de un vistazo.",
    packages: [
      { name: "Básico", price: 1200, description: "Un dashboard enfocado en una sola área de negocio.", features: ["Conexión a 1 fuente de datos (ej. Google Analytics)", "Hasta 5 métricas clave (KPIs)", "Visualizaciones de datos estándar", "Actualización diaria"], cta: "Visualizar mis Datos" },
      { name: "Profesional", price: 3500, description: "Dashboard integral que cruza información de varias áreas.", features: ["Todo en Básico", "Conexión a 3 fuentes de datos", "Métricas y filtros personalizados", "Alertas por email basadas en umbrales"], cta: "Solicitar Cotización" },
      { name: "Enterprise", price: 7000, description: "Plataforma de Business Intelligence (BI) a medida con análisis predictivo.", features: ["Todo en Profesional", "Conexión a múltiples fuentes de datos", "Datos en tiempo real (streaming)", "Modelos predictivos simples"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["Datos", "BI", "Analytics", "KPIs"],
    published: false,
  },
  {
    title: "Diseño y Manejo de Bases de Datos",
    slug: "diseno-bases-de-datos",
    icon: <Database />,
    shortDescription: "Una base de datos bien diseñada es la columna vertebral de tu aplicación. La construimos para que sea escalable y eficiente.",
    fullDescription: "Diseñamos y optimizamos la arquitectura de tu base de datos (SQL o NoSQL) para garantizar que tu aplicación sea rápida, segura y capaz de crecer. Desde el diseño del esquema inicial hasta la optimización de consultas complejas.",
    packages: [
      { name: "Básico", price: 800, description: "Diseño de esquema para una nueva aplicación.", features: ["Modelado de datos (hasta 10 entidades)", "Elección de tecnología (SQL/NoSQL)", "Script de creación de la base de datos"], cta: "Diseñar mi BD" },
      { name: "Profesional", price: 2000, description: "Optimización y migración de una base de datos existente.", features: ["Auditoría de rendimiento de consultas", "Optimización de índices", "Plan de migración de datos", "Estrategia de backups"], cta: "Optimizar mi BD" },
      { name: "Enterprise", price: 4500, description: "Arquitecturas de datos de alta disponibilidad y para Big Data.", features: ["Todo en Profesional", "Configuración de clústeres y réplicas", "Diseño de Data Warehouse / Data Lake", "Estrategias de sharding"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["SQL", "NoSQL", "Arquitectura", "Big Data"],
    published: false,
  },
  // === CATEGORÍA: INTELIGENCIA ARTIFICIAL Y CONSULTORÍA ===
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
  // === CATEGORÍA: SOPORTE Y OPTIMIZACIÓN ===
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
  },
  {
    title: "Auditoría y Optimización de Performance",
    slug: "auditoria-optimizacion-performance",
    icon: <Gauge />,
    shortDescription: "Acelera tu sitio o aplicación web para mejorar la experiencia de usuario, el SEO y la tasa de conversión.",
    fullDescription: "Analizamos a fondo tu aplicación para identificar cuellos de botella en el rendimiento. Optimizamos el código, las imágenes, las consultas a la base de datos y la configuración del servidor para que tu sitio vuele.",
    packages: [
      { name: "Básico", price: 600, description: "Análisis y reporte de rendimiento.", features: ["Auditoría con Google PageSpeed/Lighthouse", "Reporte detallado de problemas", "Plan de acción priorizado"], cta: "Auditar mi Sitio" },
      { name: "Profesional", price: 1800, description: "Implementación de las optimizaciones clave.", features: ["Todo en Básico", "Optimización de imágenes y assets", "Mejoras de caché (caching)", "Minificación de CSS/JS"], cta: "Optimizar mi Sitio" },
      { name: "Enterprise", price: 4000, description: "Optimización profunda a nivel de código y base de datos.", features: ["Todo en Profesional", "Refactorización de código crítico", "Optimización de consultas a la base de datos", "Implementación de CDN"], cta: "Agendar Llamada" }
    ],
    addOns: [],
    tags: ["Performance", "Web Vitals", "SEO", "Optimización"],
    published: false,
  }
];
