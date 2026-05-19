

import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog, Smartphone, LineChart, ShieldCheck, Wallet, GitPullRequest, Cloud, Construction, Gauge, Users, Repeat, FileInput, Shield, GitMerge, CloudCog, Mail, Calendar, BarChart } from "lucide-react";

export type ServicePackage = {
  name: string;
  price: number | string;
  originalPrice?: number;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: string;
  time: string;
};

export type ServiceAddOn = {
  name: string;
  price: number;
  originalPrice?: number;
  priceSuffix?: string;
  description?: string;
};

export type Service = {
  title: string;
  slug: string;
  tabLabel: string;
  icon: React.ElementType;
  shortDescription: string;
  fullDescription: string;
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  tags: string[];
  published: boolean;
  category: "Web Development" | "AI Solutions" | "Infrastructure & Maintenance" | "Business Management" | "Mentorías y Capacitación" | "Ciberseguridad";
};


export const services: Service[] = [
  // === WEB DEVELOPMENT SERVICES ===
  {
    title: "Desarrollo Web",
    slug: "web-development",
    tabLabel: "Desarrollo Web",
    icon: Rocket,
    category: "Web Development",
    shortDescription: "Soluciones web a medida, desde landing pages hasta aplicaciones empresariales complejas.",
    fullDescription: "Creamos experiencias web robustas, escalables y centradas en el usuario. Ya sea que necesites una simple página de aterrizaje para validar una idea o una aplicación web empresarial completa, tenemos la solución.",
    packages: [
      {
        name: "Lanzamiento Digital",
        price: 1500,
        description: "Ideal para startups y pequeños negocios que necesitan una presencia online rápida y efectiva.",
        features: [
          "Landing page responsiva",
          "Optimización SEO básica",
          "Formulario de contacto",
          "Integración Google Analytics",
          "Hosting por 1 año",
          "Mantenimiento post-entrega (desde $250/mes)"
        ],
        cta: "Empezar Lanzamiento",
        time: "2-3 semanas"
      },
      {
        name: "Presencia Corporativa",
        price: 2800,
        description: "Un sitio web completo para empresas medianas y profesionales establecidos que buscan consolidar su marca.",
        features: [
          "Sitio web multi-página",
          "Panel de administración (CMS)",
          "Sistema de blog avanzado",
          "Integración CRM básica",
          "Optimización de velocidad",
          "Certificado SSL premium",
          "Mantenimiento post-entrega (desde $350/mes)"
        ],
        cta: "Construir Presencia",
        time: "4-6 semanas"
      },
      {
        name: "Solución Empresarial",
        price: "6,000+",
        description: "Aplicaciones web personalizadas y de alta complejidad para grandes empresas y corporaciones.",
        features: [
          "Aplicación web a medida",
          "Arquitectura de microservicios",
          "Panel administrativo completo",
          "API REST personalizada",
          "Integración con sistemas existentes",
          "Seguridad de nivel empresarial",
          "Mantenimiento post-entrega (desde $650/mes)"
        ],
        cta: "Diseñar Solución",
        time: "8-12+ semanas"
      }
    ],
    addOns: [
      { name: "Blog integrado", price: 240, description: "Para el paquete Lanzamiento Digital." },
      { name: "Chat en vivo", price: 160, description: "Para cualquier paquete." },
      { name: "Multiidioma (ES/EN)", price: 320, description: "Para cualquier paquete." },
      { name: "Sistema de citas online", price: 640, description: "Para el paquete Presencia Corporativa." },
    ],
    tags: ["Web", "Empresas Emergentes", "PYMEs", "Corporativo"],
    published: true,
  },
  {
    title: "Tienda Online (E-commerce)",
    slug: "tienda-online-ecommerce",
    tabLabel: "E-commerce",
    icon: ShoppingCart,
    category: "Web Development",
    shortDescription: "Vende tus productos 24/7 con una tienda online potente, segura y fácil de gestionar.",
    fullDescription: "Llevamos tu negocio al mundo digital con una plataforma de e-commerce completa. Desde la configuración inicial hasta la integración de pasarelas de pago, te damos las herramientas para vender en línea exitosamente.",
    packages: [
      {
        name: "Catálogo Digital",
        price: 1200,
        description: "Muestra tus productos en un catálogo online profesional con opción de contacto directo para ventas.",
        features: ["Catálogo de hasta 100 productos", "Diseño responsivo", "Galería de imágenes por producto", "Botón de WhatsApp para pedidos", "Capacitación de gestión", "Mantenimiento post-entrega (desde $250/mes)"],
        cta: "Crear Catálogo",
        time: "3-4 semanas"
      },
      {
        name: "E-commerce Esencial",
        price: 1920,
        originalPrice: 2560,
        description: "Una tienda online completa con carrito de compras y pagos en línea para empezar a vender ya.",
        features: ["Todo lo de Catálogo Digital", "Carrito de compras", "Integración con pasarelas de pago (Stripe/PayPal)", "Gestión de inventario básica", "Sistema de cupones de descuento", "Mantenimiento post-entrega (desde $350/mes)"],
        cta: "Lanzar Tienda",
        time: "5-7 semanas"
      },
      {
        name: "E-commerce Avanzado",
        price: "4,800+",
        description: "Soluciones de e-commerce a medida para grandes volúmenes de venta y funcionalidades complejas.",
        features: ["Todo lo de E-commerce Esencial", "Cuentas de clientes y perfiles", "Sistema de reseñas de productos", "Integración con sistemas de envío", "Facturación automática", "Mantenimiento post-entrega (desde $650/mes)"],
        cta: "Escalar Ventas",
        time: "8-12+ semanas"
      }
    ],
    addOns: [],
    tags: ["E-commerce", "PYMEs", "Retail", "Ventas"],
    published: true,
  },
  {
    title: "Gestión de Negocios",
    slug: "gestion-de-negocios",
    tabLabel: "ERP",
    icon: Briefcase,
    category: "Business Management",
    shortDescription: "Sistemas a medida para inventario, planilla y facturación. Optimiza tus operaciones.",
    fullDescription: "Digitaliza y automatiza los procesos clave de tu empresa con software a medida. Desarrollamos sistemas de gestión de inventario, manejo de planilla y facturación electrónica para reducir errores, ahorrar tiempo y darte control total sobre tu negocio.",
    packages: [
      {
        name: "Módulo Individual",
        price: 2800,
        description: "Elige un módulo (Inventario, Planilla o Facturación) y digitaliza un área clave de tu empresa.",
        features: ["Un módulo a elección", "Carga inicial de datos (hasta 500 registros)", "Dashboard de reportes básicos", "Capacitación para 2 usuarios", "Mantenimiento post-entrega (desde $350/mes)"],
        cta: "Digitalizar Módulo",
        time: "4-6 semanas"
      },
      {
        name: "Suite PYME",
        price: 3600,
        originalPrice: 4800,
        description: "Una solución integrada con dos módulos a tu elección para una gestión más completa.",
        features: ["Dos módulos a elección", "Integración entre módulos seleccionados", "Dashboard de reportes unificado", "Capacitación para 5 usuarios", "Mantenimiento post-entrega (desde $650/mes)"],
        cta: "Integrar Suite",
        time: "8-10 semanas"
      },
      {
        name: "ERP a Medida",
        price: "7,200+",
        description: "Un sistema de planificación de recursos empresariales (ERP) completo y personalizado para tu compañía.",
        features: ["Módulos de Inventario, Planilla y Facturación", "Módulos adicionales (CRM, Compras, etc.)", "Integración con hardware (scanners, impresoras fiscales)", "Migración de datos completa", "Mantenimiento post-entrega (desde $1,500/mes)"],
        cta: "Construir ERP",
        time: "12-20+ semanas"
      }
    ],
    addOns: [],
    tags: ["PYMEs", "ERP", "Gestión", "Operaciones"],
    published: true,
  },
  {
    title: "Aplicaciones Móviles",
    slug: "aplicaciones-moviles",
    tabLabel: "Apps Móviles",
    icon: Smartphone,
    category: "Web Development",
    shortDescription: "Apps para iOS y Android que conectan con tus usuarios y fortalecen tu marca.",
    fullDescription: "Lleva tu servicio o producto al bolsillo de tus clientes con aplicaciones móviles nativas o multiplataforma. Creamos apps intuitivas, de alto rendimiento y listas para publicar en la App Store y Google Play.",
    packages: [
      {
        name: "MVP App",
        price: "3,200 - 6,400",
        description: "Lanza una primera versión de tu aplicación para validar tu idea en el mercado con funcionalidades clave.",
        features: ["App para iOS o Android (multiplataforma)", "Hasta 5 pantallas clave", "Diseño de interfaz estándar", "Integración con backend básico (Firebase)", "Publicación en tiendas de apps", "Mantenimiento post-entrega (desde $650/mes)"],
        cta: "Lanzar MVP",
        time: "6-8 semanas"
      },
      {
        name: "App Profesional",
        price: "6,400 - 12,000",
        description: "Una aplicación completa con diseño personalizado y funcionalidades avanzadas para un negocio establecido.",
        features: ["App para iOS y Android", "Diseño de interfaz 100% personalizado", "Notificaciones push", "Cuentas de usuario y perfiles", "Integración con APIs de terceros", "Mantenimiento post-entrega (desde $650/mes)"],
        cta: "Desarrollar App",
        time: "10-16 semanas"
      },
      {
        name: "App Empresarial",
        price: "12,000+",
        description: "Soluciones móviles complejas con integraciones a nivel de sistema, seguridad avanzada y escalabilidad.",
        features: ["Todo lo del plan Profesional", "Pagos dentro de la app", "Funcionalidades offline", "Dashboard de administración web", "Mantenimiento post-entrega (desde $1,500/mes)"],
        cta: "Crear Solución Móvil",
        time: "16+ semanas"
      }
    ],
    addOns: [],
    tags: ["Móvil", "iOS", "Android", "Startups"],
    published: true,
  },
  {
    title: "Portafolio Profesional y Marca Personal",
    slug: "portafolio-profesional",
    tabLabel: "Portafolio",
    icon: Puzzle,
    category: "Web Development",
    shortDescription: "Destaca en tu sector con un portafolio web que refleje tu talento y construya tu marca personal.",
    fullDescription: "Creamos una plataforma digital para profesionales (abogados, arquitectos, médicos, etc.) y freelancers que buscan consolidar su marca personal. Un portafolio autogestionable para mostrar tus proyectos, experiencia y atraer nuevas oportunidades.",
    packages: [
      {
        name: "Portafolio Esencial",
        price: 480,
        originalPrice: 800,
        description: "Tu tarjeta de presentación digital. Un sitio elegante y directo al grano.",
        features: [
          "Sitio web de hasta 5 páginas",
          "Diseño 100% responsivo",
          "Sistema de gestión de citas básico",
          "Formulario de contacto funcional",
          "Hosting y dominio por 1 año",
          "Mantenimiento post-entrega (desde $250/mes)"
        ],
        cta: "Crear Portafolio",
        time: "1-2 semanas",
      },
      {
        name: "Marca Profesional",
        price: 1440,
        originalPrice: 1920,
        description: "Un sitio completo para establecer tu autoridad en el mercado, con blog y gestión de citas.",
        features: [
          "Sitio web multi-página avanzado",
          "Sección de blog autogestionable",
          "Sistema de gestión de citas avanzado",
          "Galería de proyectos dinámica",
          "Mantenimiento post-entrega (desde $350/mes)"
        ],
        cta: "Construir Marca",
        time: "3-4 semanas",
      },
      {
        name: "Solución Integral",
        price: "2880+",
        description: "La plataforma definitiva para profesionales que quieren gestionar todo su negocio desde un solo lugar.",
        features: [
          "Todo lo de Marca Profesional",
          "Base de datos de clientes (CRM básico)",
          "Área de clientes privada",
          "Sistema de facturación integrado",
          "Mantenimiento post-entrega (desde $650/mes)"
        ],
        cta: "Diseñar Solución",
        time: "6-8+ semanas",
      },
    ],
    addOns: [
      { name: "Sistema de Facturación", price: 480, description: "Añade un sistema para generar y enviar facturas." },
      { name: "Gestión de Citas Avanzada", price: 320, description: "Calendario y reservas online." },
      { name: "Gestión de Correos y Campañas", price: 400, priceSuffix: "/mes", description: "Manejo de newsletter y campañas de marketing." },
      { name: "Posicionamiento SEO Avanzado", price: 600, priceSuffix: "/mes", description: "Estrategia continua de SEO para mejorar tu ranking." },
    ],
    tags: ["Marca Personal", "Freelancers", "Profesionales", "Web"],
    published: true,
  },
  // === AI SOLUTIONS SERVICES ===
  {
    title: "Soluciones con IA",
    slug: "ai-solutions",
    tabLabel: "IA",
    icon: BrainCircuit,
    category: "AI Solutions",
    shortDescription: "Desde chatbots inteligentes hasta sistemas de recomendación y análisis predictivo.",
    fullDescription: "Integramos el poder de la inteligencia artificial en tus operaciones para automatizar procesos, personalizar la experiencia del cliente y extraer insights valiosos de tus datos.",
    packages: [
      {
        name: "IA Básica",
        price: "2,500 - 4,000",
        description: "Implementa un asistente virtual inteligente para automatizar la atención al cliente.",
        features: [
          "Chatbot básico con FAQ",
          "Integración WhatsApp Business",
          "Dashboard de conversaciones",
          "Entrenamiento inicial",
          "Mantenimiento post-entrega (desde $350/mes)"
        ],
        cta: "Implementar Chatbot",
        time: "3-4 semanas"
      },
      {
        name: "IA Avanzada",
        price: "5,000 - 9,000",
        description: "Desarrolla sistemas de recomendación y análisis para una personalización profunda.",
        features: [
          "Chatbot con procesamiento de lenguaje natural (NLP)",
          "Sistema de recomendaciones de productos",
          "Análisis de sentimientos en comentarios",
          "Integración multi-canal",
          "Mantenimiento post-entrega (desde $650/mes)"
        ],
        cta: "Desarrollar IA",
        time: "6-8 semanas"
      },
      {
        name: "IA Empresarial",
        price: "10,000+",
        description: "Soluciones de IA a medida con modelos de Machine Learning propios y análisis de big data.",
        features: [
          "Solución de IA 100% personalizada",
          "Modelos de machine learning propios",
          "Integración con Big Data",
          "Pipeline de datos automatizado",
          "Mantenimiento post-entrega (desde $1,500/mes)"
        ],
        cta: "Crear Solución IA",
        time: "10-16+ semanas"
      }
    ],
    addOns: [],
    tags: ["IA", "Chatbot", "Machine Learning", "Automatización"],
    published: true,
  },
  {
    title: "Automatización de Procesos",
    slug: "automatizacion-de-procesos",
    tabLabel: "RPA",
    icon: Repeat,
    category: "AI Solutions",
    shortDescription: "Ahorra tiempo y reduce errores automatizando tareas manuales y repetitivas (RPA).",
    fullDescription: "Identificamos cuellos de botella en tus flujos de trabajo y desarrollamos scripts y sistemas automatizados para eliminarlos. Desde la generación de reportes hasta la sincronización de datos entre plataformas, liberamos a tu equipo para que se enfoque en tareas de alto valor.",
    packages: [
      {
        name: "Automatización Puntual",
        price: "1,800 - 3,500",
        description: "Automatiza una tarea repetitiva específica, como la generación de un reporte diario o la extracción de datos.",
        features: ["Análisis de la tarea a automatizar", "Desarrollo de script de automatización", "Ejecución programada (diaria, semanal)", "Documentación y entrega del script", "Mantenimiento post-entrega (desde $250/mes)"],
        cta: "Automatizar Tarea",
        time: "1-2 semanas"
      },
      {
        name: "Flujo de Trabajo",
        price: "3,500 - 7,000",
        description: "Conecta varias aplicaciones y automatiza un flujo de trabajo completo, como el onboarding de un nuevo cliente.",
        features: ["Análisis del flujo de trabajo completo", "Integración de hasta 3 aplicaciones (vía API)", "Sistema de notificaciones por email/Slack", "Dashboard de monitoreo del flujo", "Mantenimiento post-entrega (desde $650/mes)"],
        cta: "Automatizar Flujo",
        time: "3-5 semanas"
      },
      {
        name: "RPA Empresarial",
        price: "8,500+",
        description: "Implementación de Robotic Process Automation (RPA) para automatizar procesos complejos a gran escala.",
        features: ["Consultoría y estrategia de RPA", "Desarrollo de múltiples 'bots' de software", "Integración con sistemas legados", "Panel de control y orquestación de bots", "Mantenimiento post-entrega (desde $1,500/mes)"],
        cta: "Implementar RPA",
        time: "6-10+ semanas"
      }
    ],
    addOns: [],
    tags: ["RPA", "Automatización", "Eficiencia", "Operaciones"],
    published: true,
  },
  // === MENTORSHIP AND SUPPORT ===
  {
    title: "Mentoría y Capacitación Técnica",
    slug: "mentoria-capacitacion",
    tabLabel: "Capacitación",
    icon: Users,
    category: "Mentorías y Capacitación",
    shortDescription: "Eleva las habilidades de tu equipo con mentorías personalizadas y capacitación en tecnologías de vanguardia.",
    fullDescription: "Potencia el talento interno de tu organización. Ofrezco programas de mentoría y capacitación diseñados para acelerar el desarrollo profesional de individuos y equipos, enfocados en las tecnologías y prácticas más demandadas del mercado.",
    packages: [
      {
        name: "Impulso Profesional",
        price: 480,
        priceSuffix: "/ 4 sesiones",
        description: "Mentoría 1-a-1 para desarrolladores que buscan acelerar su carrera, resolver bloqueos y mejorar sus habilidades.",
        features: ["4 sesiones individuales de 1 hora", "Revisión de código y portafolio", "Plan de carrera personalizado", "Acceso a red de contactos", "Soporte por chat entre sesiones"],
        cta: "Iniciar Mentoría",
        time: "1 mes"
      },
      {
        name: "Acelerador de Equipos",
        price: 1500,
        priceSuffix: "/mes",
        description: "Acompañamiento continuo para equipos de desarrollo corporativos que buscan modernizar sus prácticas y acelerar su velocidad de entrega.",
        features: ["8 horas de mentoría grupal/mes", "Revisión de arquitectura de proyectos", "Implementación de mejores prácticas (CI/CD, Testing)", "Talleres de resolución de problemas", "Soporte prioritario para el equipo"],
        cta: "Acelerar Equipo",
        time: "Suscripción mensual"
      },
      {
        name: "Workshop Corporativo",
        price: "3,500+",
        description: "Programa de modernización tecnológica intensivo y a medida para equipos de TI corporativos que necesitan actualizar sus capacidades en arquitecturas modernas.",
        features: ["Temario 100% personalizado (React, IA, Cloud, etc.)", "Workshop práctico de 8-16 horas", "Material de estudio y recursos", "Certificado de participación", "Sesión de seguimiento post-workshop"],
        cta: "Cotizar Workshop",
        time: "A coordinar"
      }
    ],
    addOns: [],
    tags: ["Mentoría", "Capacitación", "Equipos", "Corporativo"],
    published: true,
  },
  {
    title: "Planes de Soporte y Crecimiento",
    slug: "planes-soporte-crecimiento",
    tabLabel: "SLA / CTO",
    icon: ShieldCheck,
    category: "Infrastructure & Maintenance",
    shortDescription: "Asegura la salud y evolución de tu proyecto con nuestros planes de suscripción.",
    fullDescription: "Ofrecemos planes de suscripción para el mantenimiento continuo, soporte técnico y desarrollo de nuevas funcionalidades. Garantiza que tu inversión tecnológica siga generando valor a largo plazo.",
    packages: [
      {
        name: "SLA Básico",
        price: 250,
        priceSuffix: "/mes",
        description: "Garantía de operatividad para sistemas en producción: monitoreo proactivo, parches de seguridad y respuesta garantizada.",
        features: ["Monitoreo de disponibilidad 24/7", "Backups diarios automatizados", "Actualizaciones de seguridad críticas (dependencias, CVEs)", "Soporte técnico por email (respuesta garantizada en 24h)", "Reporte mensual de salud del sistema"],
        cta: "Contratar SLA",
        time: "Suscripción mensual"
      },
      {
        name: "SLA Empresarial",
        price: 650,
        priceSuffix: "/mes",
        description: "Gestión técnica continua para plataformas de negocio críticas: optimización de base de datos, mejoras iterativas y soporte prioritario.",
        features: ["Todo lo del SLA Básico", "Auditoría mensual de rendimiento PostgreSQL", "Soporte prioritario por chat (respuesta en 4h)", "6 horas de desarrollo para mejoras y nuevas funcionalidades", "Rotación programada de credenciales y claves de seguridad"],
        cta: "Contratar SLA Empresarial",
        time: "Suscripción mensual"
      },
      {
        name: "Fractional CTO",
        price: 1500,
        priceSuffix: "/mes",
        description: "Dirección técnica estratégica a tiempo parcial. Tu arquitecto de confianza para decisiones de infraestructura, roadmap tecnológico y liderazgo del equipo de desarrollo.",
        features: ["Todo lo del SLA Empresarial", "15 horas de desarrollo o arquitectura/mes", "Llamada estratégica quincenal (roadmap, decisiones de stack)", "Soporte de emergencia 24/7 con tiempo de respuesta en 1h", "Representación técnica ante directivos y stakeholders"],
        cta: "Contratar Fractional CTO",
        time: "Contrato mensual"
      }
    ],
    addOns: [],
    tags: ["Soporte", "Suscripción", "Mantenimiento", "Corporativo"],
    published: true,
  },
  {
    title: "Sistemas Fiscales & DGI",
    slug: "sistemas-fiscales-dgi",
    tabLabel: "DGI / PAC",
    icon: Receipt,
    category: "Business Management",
    shortDescription: "Integración certificada con Facturación Electrónica de Panamá (DGI/PAC).",
    fullDescription: "Desarrollo de software de facturación electrónica certificado y conforme a la normativa de la DGI de Panamá. Implementamos soluciones completas con firma electrónica, validación de esquemas, códigos QR/CUFE y comunicación segura con PACs autorizados.",
    packages: [
      {
        name: "Integración API",
        price: 3200,
        description: "Módulo de conexión certificado para integrar tu software existente con la facturación electrónica DGI vía PAC.",
        features: ["Integración API (REST/SOAP) con PAC certificado", "Generación de XML firmados con firma electrónica", "Manejo de respuestas DGI/PAC y contingencias", "Pruebas de homologación incluidas", "Mantenimiento post-entrega (desde $350/mes)"],
        cta: "Integrar Facturación",
        time: "3-5 semanas"
      },
      {
        name: "Portal de Facturación",
        price: 5500,
        description: "Portal web completo para emisión y recepción de facturas electrónicas, listo para el cumplimiento de la Resolución DGI N.° 201-6299.",
        features: ["Portal Web Seguro con autenticación empresarial", "Emisión, Anulación y Notas de Crédito/Débito", "Recepción de documentos y gestión de gastos", "Catálogo de clientes y productos integrado", "Dashboard fiscal con reportes 43 y 94", "Mantenimiento post-entrega (desde $650/mes)"],
        cta: "Crear Portal",
        time: "6-8 semanas"
      },
      {
        name: "Sistema Fiscal Completo",
        price: "11,000+",
        description: "ERP fiscal empresarial completo: la solución definitiva para empresas que superan los umbrales de la Resolución N.° 201-6299 y necesitan operar con un ISV propio integrado a PAC.",
        features: ["Todo lo del Portal de Facturación", "Control de inventario avanzado en tiempo real", "Módulo de contabilidad básica integrado", "Arquitectura multi-empresa (SaaS) escalable", "POS táctil offline-first incluido", "Mantenimiento post-entrega (desde $1,500/mes)"],
        cta: "Desarrollar Sistema",
        time: "10-14+ semanas"
      }
    ],
    addOns: [
      { name: "Homologación PAC", price: 800, description: "Gestión completa del proceso de certificación." },
      { name: "Soporte 24/7", price: 500, priceSuffix: "/mes", description: "Soporte crítico para emisión de facturas." }
    ],
    tags: ["DGI", "Panamá", "FinTech", "Legal"],
    published: true,
  },
  // === CYBERSECURITY ===
  {
    title: "Ciberseguridad y Auditoría",
    slug: "ciberseguridad-auditoria",
    tabLabel: "Ciberseguridad",
    icon: Shield,
    category: "Ciberseguridad",
    shortDescription: "Protege tu empresa con auditorías de seguridad, pruebas de penetración y monitoreo continuo antes de que lo hagan los atacantes.",
    fullDescription: "Con instituciones como la CSS, Titán y la Contraloría de Panamá sufriendo ataques recientes, la seguridad digital ya no es opcional. Evaluamos tu sistema de forma ética y profesional para encontrar vulnerabilidades antes que los hackers, y te entregamos un plan claro de acción para blindar tu operación.",
    packages: [
      {
        name: "Diagnóstico de Seguridad",
        price: 900,
        description: "Una radiografía rápida de los riesgos de seguridad de tu sistema, ideal para saber dónde estás parado.",
        features: [
          "Escaneo de vulnerabilidades conocidas (OWASP Top 10)",
          "Revisión de configuraciones básicas del servidor",
          "Análisis de exposición de puertos y servicios activos",
          "Verificación de versiones desactualizadas de software",
          "Reporte ejecutivo con semáforo de riesgo (Alto / Medio / Bajo)",
          "Recomendaciones de remediación priorizadas"
        ],
        cta: "Iniciar Diagnóstico",
        time: "1-2 semanas"
      },
      {
        name: "Auditoría Completa",
        price: 2800,
        description: "Evaluación exhaustiva de todos los vectores de ataque de tu infraestructura y aplicaciones digitales.",
        features: [
          "Todo lo del Diagnóstico de Seguridad",
          "Auditoría de código de aplicaciones web (análisis estático)",
          "Pruebas de autenticación, sesiones y control de acceso",
          "Análisis de cifrado de datos en tránsito y en reposo",
          "Revisión de logs y políticas de permisos de usuarios",
          "Plan de remediación detallado con roadmap de correcciones",
          "Reunión técnica de revisión de resultados con el equipo"
        ],
        cta: "Auditar Sistema",
        time: "3-4 semanas"
      },
      {
        name: "Pentesting Profesional",
        price: "4,800+",
        description: "Simulamos un ataque real a tus sistemas (ethical hacking) para encontrar exactamente lo que un hacker encontraría.",
        features: [
          "Todo lo de la Auditoría Completa",
          "Pruebas de penetración en aplicaciones web y red interna",
          "Análisis de amenazas internas (insider threats)",
          "Ingeniería social y phishing controlado (opcional)",
          "Informe técnico + informe ejecutivo de resultados",
          "Plan de respuesta a incidentes personalizado",
          "Presentación de resultados a dirección o junta"
        ],
        cta: "Contratar Pentesting",
        time: "4-8 semanas"
      }
    ],
    addOns: [
      { name: "Monitoreo Continuo de Seguridad", price: 350, priceSuffix: "/mes", description: "Vigilancia activa de amenazas y alertas en tiempo real." },
      { name: "Plan de Respuesta a Incidentes", price: 1000, description: "Documentación y protocolos para actuar en caso de un ataque." },
      { name: "Capacitación de Concienciación al Personal", price: 800, description: "Taller para que tu equipo identifique phishing y amenazas comunes." }
    ],
    tags: ["Ciberseguridad", "Auditoría", "Pentesting", "Empresas"],
    published: true,
  },
  // === INFRASTRUCTURE & SERVERS ===
  {
    title: "Infraestructura y Servidores",
    slug: "infraestructura-servidores",
    tabLabel: "Servidores",
    icon: Server,
    category: "Infrastructure & Maintenance",
    shortDescription: "Configura, administra y escala tu infraestructura tecnológica local o en la nube, sin necesidad de un equipo TI propio.",
    fullDescription: "Desde instalar y configurar un servidor en tu oficina hasta diseñar una arquitectura cloud completa, me encargo de toda la capa técnica para que tu negocio funcione sin interrupciones. Ideal para empresas que necesitan un departamento TI externo, confiable y disponible.",
    packages: [
      {
        name: "Configuración de Servidor",
        price: "700 - 1,200",
        description: "Instala y configura correctamente tu servidor local o en la nube desde cero, listo para producción.",
        features: [
          "Instalación y hardening del sistema operativo (Linux/Windows Server)",
          "Configuración de firewall y políticas de acceso seguro",
          "Instalación de servicios web (Nginx/Apache) y bases de datos",
          "Configuración de SSL/TLS y dominio personalizado",
          "Sistema de backups automáticos programados",
          "Documentación completa de la infraestructura configurada"
        ],
        cta: "Configurar Servidor",
        time: "1-2 semanas"
      },
      {
        name: "Administración Mensual",
        price: 400,
        priceSuffix: "/mes",
        description: "Tu departamento TI externo: administramos tu infraestructura para que tú te concentres en tu negocio.",
        features: [
          "Monitoreo de disponibilidad y rendimiento 24/7",
          "Aplicación de parches de seguridad y actualizaciones críticas",
          "Gestión de backups y planes de recuperación",
          "Soporte técnico remoto (respuesta garantizada en 4h)",
          "Reporte mensual de estado y salud del servidor",
          "Hasta 4 horas de cambios y mejoras incluidas al mes"
        ],
        cta: "Contratar Administración",
        time: "Suscripción mensual"
      },
      {
        name: "Infraestructura Empresarial",
        price: "3,500+",
        description: "Diseño e implementación de infraestructura compleja: on-premise, cloud o arquitectura híbrida.",
        features: [
          "Diseño de arquitectura de red y servidores a medida",
          "Implementación de VPN corporativa segura",
          "Virtualización (Proxmox) y contenedores (Docker / Kubernetes)",
          "Alta disponibilidad, balanceo de carga y failover",
          "Estrategia de disaster recovery y continuidad del negocio",
          "Migración de sistemas legacy a infraestructura moderna"
        ],
        cta: "Diseñar Infraestructura",
        time: "4-10+ semanas"
      }
    ],
    addOns: [
      { name: "Migración a la Nube (AWS/GCP/Azure)", price: 1200, description: "Mueve tu infraestructura actual a la nube sin tiempo de inactividad." },
      { name: "Configuración de VPN Corporativa", price: 600, description: "Acceso remoto seguro para empleados y oficinas remotas." },
      { name: "Respaldo Offsite en la Nube", price: 200, priceSuffix: "/mes", description: "Copias de seguridad cifradas almacenadas fuera de tu sitio." }
    ],
    tags: ["Servidores", "Cloud", "Infraestructura", "DevOps"],
    published: true,
  },
  // === LOCAL BUSINESS SYSTEMS ===
  {
    title: "Sistemas para Negocios Locales",
    slug: "soluciones-negocios-locales",
    tabLabel: "Negocios Locales",
    icon: Building,
    category: "Business Management",
    shortDescription: "Sistemas de punto de venta y gestión completa para restaurantes, salones de belleza, bares y comercios locales.",
    fullDescription: "Digitaliza tu negocio con una solución diseñada para la realidad de los comercios locales. Sin tecnicismos ni complicaciones: un sistema que tu equipo aprende en un día y que te da el control total sobre ventas, inventario y clientes. Ideal para restaurantes, salones de belleza, bares, tiendas de ropa y cualquier negocio con local físico.",
    packages: [
      {
        name: "Sistema Básico POS",
        price: 1200,
        description: "Tu negocio en orden: punto de venta y control de inventario en una sola pantalla táctil.",
        features: [
          "Sistema POS táctil (tablet o pantalla táctil)",
          "Control de inventario con alertas de stock bajo",
          "Registro de ventas y generación de recibos",
          "Reportes diarios de ventas y productos más vendidos",
          "Capacitación para 2 usuarios incluida",
          "Soporte post-entrega (desde $150/mes)"
        ],
        cta: "Implementar POS",
        time: "2-3 semanas"
      },
      {
        name: "Sistema de Gestión Completo",
        price: 3000,
        description: "Gestiona tu restaurante, salón de belleza o local con todas las herramientas que un negocio moderno necesita.",
        features: [
          "Todo lo del Sistema Básico POS",
          "Gestión de mesas / citas / turnos (según el tipo de negocio)",
          "Módulo de clientes y programa de fidelización básico",
          "Control de costos y márgenes por producto o servicio",
          "Reportes avanzados de desempeño del negocio",
          "Integración con impresora de comandas (cocina/servicio)",
          "Soporte post-entrega (desde $250/mes)"
        ],
        cta: "Digitalizar Negocio",
        time: "4-6 semanas"
      },
      {
        name: "Solución Premium con App",
        price: "5,500+",
        description: "La herramienta definitiva para negocios que quieren crecer: sistema de gestión completo más app para tus clientes.",
        features: [
          "Todo lo del Sistema de Gestión Completo",
          "App móvil para clientes (iOS y Android)",
          "Pedidos en línea y reservas digitales desde la app",
          "Programa de lealtad con puntos y recompensas",
          "Dashboard de analítica del negocio en tiempo real",
          "Integración con plataformas de delivery (Uber Eats, etc.)",
          "Soporte post-entrega (desde $400/mes)"
        ],
        cta: "Crear Solución Premium",
        time: "8-12+ semanas"
      }
    ],
    addOns: [
      { name: "Menú Digital con QR", price: 350, description: "Menú interactivo accesible desde el celular del cliente." },
      { name: "Integración con Plataforma de Delivery", price: 500, description: "Conecta tu sistema con Uber Eats, PedidosYa u otras plataformas." },
      { name: "Sistema de Reservas Online", price: 400, description: "Reservas y citas por WhatsApp, web o app." }
    ],
    tags: ["Restaurantes", "Salones", "Negocios Locales", "POS"],
    published: true,
  },
  // === R&D / CONSULTING ===
  {
    title: "Consultoría e I+D Tecnológico",
    slug: "investigacion-desarrollo",
    tabLabel: "I+D / Consultoría",
    icon: LineChart,
    category: "AI Solutions",
    shortDescription: "Acompaña la innovación y expansión de tu empresa con consultoría tecnológica estratégica y desarrollo de prototipos.",
    fullDescription: "Si tu empresa quiere innovar, adoptar nuevas tecnologías o construir un producto nuevo pero no sabe por dónde empezar, aquí es donde entramos. Evaluamos tu situación, exploramos opciones y construimos los primeros prototipos para validar ideas antes de hacer una inversión grande.",
    packages: [
      {
        name: "Sesión de Consultoría",
        price: 750,
        priceSuffix: "/ 4 horas",
        description: "Claridad técnica para decisiones estratégicas: evaluamos tu situación y trazamos un camino concreto.",
        features: [
          "Reunión de discovery para entender tus objetivos y contexto",
          "Evaluación del estado actual de tu tecnología",
          "Propuesta de arquitectura de solución con pros y contras",
          "Informe ejecutivo con roadmap tecnológico priorizado",
          "Seguimiento por email durante 30 días"
        ],
        cta: "Agendar Consultoría",
        time: "1-2 semanas"
      },
      {
        name: "Prueba de Concepto (POC)",
        price: "3,500 - 5,500",
        description: "Valida tu idea antes de invertir: construimos un prototipo funcional para probar el mercado rápidamente.",
        features: [
          "Definición conjunta de alcance y criterios de éxito",
          "Desarrollo de prototipo funcional (interfaz + lógica core)",
          "Pruebas internas y sesión de demostración en vivo",
          "Informe técnico de viabilidad y próximos pasos recomendados",
          "Código fuente entregado al cliente al finalizar"
        ],
        cta: "Construir POC",
        time: "4-8 semanas"
      },
      {
        name: "Proyecto I+D Completo",
        price: "8,000+",
        description: "Innovación con metodología: investigamos, desarrollamos y lanzamos nuevas capacidades tecnológicas para tu empresa.",
        features: [
          "Sprint de investigación y análisis del estado del arte",
          "Desarrollo iterativo con ciclos de feedback y ajuste",
          "Integración con los sistemas existentes de la empresa",
          "Documentación técnica completa del proyecto",
          "Transferencia de conocimiento al equipo interno",
          "Acompañamiento post-lanzamiento los primeros 3 meses"
        ],
        cta: "Iniciar I+D",
        time: "12-24+ semanas"
      }
    ],
    addOns: [
      { name: "Análisis de Competencia Tecnológica", price: 500, description: "Evaluación de las soluciones tecnológicas que usa tu competencia." },
      { name: "Capacitación del Equipo en la Solución", price: 800, description: "Entrenamiento práctico para que tu equipo adopte la nueva tecnología." }
    ],
    tags: ["I+D", "Innovación", "Consultoría", "Tecnología"],
    published: true,
  },
];

// ─── English text overrides ────────────────────────────────────────────────
type ServiceTextOverride = Pick<Service, 'slug' | 'tabLabel' | 'title' | 'shortDescription' | 'fullDescription' | 'tags'> & {
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
};

const servicesEn: ServiceTextOverride[] = [
  {
    slug: "web-development",
    tabLabel: "Web Dev",
    title: "Web Development",
    shortDescription: "Custom web solutions, from landing pages to complex enterprise applications.",
    fullDescription: "We create robust, scalable, user-centered web experiences. Whether you need a simple landing page to validate an idea or a complete enterprise web application, we have the solution.",
    packages: [
      { name: "Digital Launch", price: 1500, description: "Ideal for startups and small businesses needing a fast, effective online presence.", features: ["Responsive landing page", "Basic SEO optimization", "Contact form", "Google Analytics integration", "1-year hosting", "Post-delivery maintenance (from $250/mo)"], cta: "Start Launch", time: "2-3 weeks" },
      { name: "Corporate Presence", price: 2800, description: "A complete website for medium businesses and established professionals looking to consolidate their brand.", features: ["Multi-page website", "Admin panel (CMS)", "Advanced blog system", "Basic CRM integration", "Speed optimization", "Premium SSL certificate", "Post-delivery maintenance (from $350/mo)"], cta: "Build Presence", time: "4-6 weeks" },
      { name: "Enterprise Solution", price: "6,000+", description: "Custom, high-complexity web applications for large enterprises and corporations.", features: ["Custom web application", "Microservices architecture", "Full admin panel", "Custom REST API", "Integration with existing systems", "Enterprise-grade security", "Post-delivery maintenance (from $650/mo)"], cta: "Design Solution", time: "8-12+ weeks" },
    ],
    addOns: [
      { name: "Integrated Blog", price: 240, description: "For the Digital Launch package." },
      { name: "Live Chat", price: 160, description: "For any package." },
      { name: "Multi-language (ES/EN)", price: 320, description: "For any package." },
      { name: "Online Booking System", price: 640, description: "For the Corporate Presence package." },
    ],
    tags: ["Web", "Startups", "SMBs", "Corporate"],
  },
  {
    slug: "tienda-online-ecommerce",
    tabLabel: "E-commerce",
    title: "Online Store (E-commerce)",
    shortDescription: "Sell your products 24/7 with a powerful, secure, and easy-to-manage online store.",
    fullDescription: "We take your business to the digital world with a complete e-commerce platform. From initial setup to payment gateway integration, we give you the tools to sell online successfully.",
    packages: [
      { name: "Digital Catalog", price: 1200, description: "Showcase your products in a professional online catalog with direct contact option for sales.", features: ["Catalog of up to 100 products", "Responsive design", "Product image gallery", "WhatsApp button for orders", "Management training", "Post-delivery maintenance (from $250/mo)"], cta: "Create Catalog", time: "3-4 weeks" },
      { name: "Essential E-commerce", price: 1920, originalPrice: 2560, description: "A complete online store with shopping cart and online payments to start selling right away.", features: ["Everything in Digital Catalog", "Shopping cart", "Payment gateway integration (Stripe/PayPal)", "Basic inventory management", "Discount coupon system", "Post-delivery maintenance (from $350/mo)"], cta: "Launch Store", time: "5-7 weeks" },
      { name: "Advanced E-commerce", price: "4,800+", description: "Custom e-commerce solutions for high sales volumes and complex functionalities.", features: ["Everything in Essential E-commerce", "Customer accounts and profiles", "Product review system", "Shipping system integration", "Automatic invoicing", "Post-delivery maintenance (from $650/mo)"], cta: "Scale Sales", time: "8-12+ weeks" },
    ],
    addOns: [],
    tags: ["E-commerce", "SMBs", "Retail", "Sales"],
  },
  {
    slug: "gestion-de-negocios",
    tabLabel: "ERP",
    title: "Business Management",
    shortDescription: "Custom systems for inventory, payroll, and invoicing. Optimize your operations.",
    fullDescription: "Digitize and automate your company's key processes with custom software. We develop inventory management, payroll, and electronic invoicing systems to reduce errors, save time, and give you full control over your business.",
    packages: [
      { name: "Individual Module", price: 2800, description: "Choose one module (Inventory, Payroll, or Invoicing) and digitize a key area of your company.", features: ["One module of your choice", "Initial data upload (up to 500 records)", "Basic reporting dashboard", "Training for 2 users", "Post-delivery maintenance (from $350/mo)"], cta: "Digitize Module", time: "4-6 weeks" },
      { name: "SMB Suite", price: 3600, originalPrice: 4800, description: "An integrated solution with two modules of your choice for more complete management.", features: ["Two modules of your choice", "Integration between selected modules", "Unified reporting dashboard", "Training for 5 users", "Post-delivery maintenance (from $650/mo)"], cta: "Integrate Suite", time: "8-10 weeks" },
      { name: "Custom ERP", price: "7,200+", description: "A complete, customized enterprise resource planning (ERP) system for your company.", features: ["Inventory, Payroll and Invoicing modules", "Additional modules (CRM, Purchasing, etc.)", "Hardware integration (scanners, fiscal printers)", "Complete data migration", "Post-delivery maintenance (from $1,500/mo)"], cta: "Build ERP", time: "12-20+ weeks" },
    ],
    addOns: [],
    tags: ["SMBs", "ERP", "Management", "Operations"],
  },
  {
    slug: "aplicaciones-moviles",
    tabLabel: "Mobile Apps",
    title: "Mobile Applications",
    shortDescription: "iOS and Android apps that connect with your users and strengthen your brand.",
    fullDescription: "Put your service or product in your customers' pocket with native or cross-platform mobile applications. We create intuitive, high-performance apps ready to publish on the App Store and Google Play.",
    packages: [
      { name: "MVP App", price: "3,200 - 6,400", description: "Launch a first version of your application to validate your idea in the market with key functionalities.", features: ["App for iOS or Android (cross-platform)", "Up to 5 key screens", "Standard UI design", "Integration with basic backend (Firebase)", "App store publishing", "Post-delivery maintenance (from $650/mo)"], cta: "Launch MVP", time: "6-8 weeks" },
      { name: "Professional App", price: "6,400 - 12,000", description: "A complete application with custom design and advanced features for an established business.", features: ["App for iOS and Android", "100% custom UI design", "Push notifications", "User accounts and profiles", "Third-party API integration", "Post-delivery maintenance (from $650/mo)"], cta: "Develop App", time: "10-16 weeks" },
      { name: "Enterprise App", price: "12,000+", description: "Complex mobile solutions with system-level integrations, advanced security, and scalability.", features: ["Everything in Professional plan", "In-app payments", "Offline functionality", "Web admin dashboard", "Post-delivery maintenance (from $1,500/mo)"], cta: "Create Mobile Solution", time: "16+ weeks" },
    ],
    addOns: [],
    tags: ["Mobile", "iOS", "Android", "Startups"],
  },
  {
    slug: "portafolio-profesional",
    tabLabel: "Portfolio",
    title: "Professional Portfolio & Personal Brand",
    shortDescription: "Stand out in your field with a web portfolio that reflects your talent and builds your personal brand.",
    fullDescription: "We create a digital platform for professionals (lawyers, architects, doctors, etc.) and freelancers looking to consolidate their personal brand. A self-manageable portfolio to showcase your projects, experience, and attract new opportunities.",
    packages: [
      { name: "Essential Portfolio", price: 480, originalPrice: 800, description: "Your digital business card. An elegant, straight-to-the-point site.", features: ["Website of up to 5 pages", "100% responsive design", "Basic appointment management", "Functional contact form", "1-year hosting and domain", "Post-delivery maintenance (from $250/mo)"], cta: "Create Portfolio", time: "1-2 weeks" },
      { name: "Professional Brand", price: 1440, originalPrice: 1920, description: "A complete site to establish your market authority, with blog and appointment management.", features: ["Advanced multi-page website", "Self-manageable blog section", "Advanced appointment management", "Dynamic project gallery", "Post-delivery maintenance (from $350/mo)"], cta: "Build Brand", time: "3-4 weeks" },
      { name: "Comprehensive Solution", price: "2880+", description: "The ultimate platform for professionals who want to manage their entire business from one place.", features: ["Everything in Professional Brand", "Client database (basic CRM)", "Private client area", "Integrated invoicing system", "Post-delivery maintenance (from $650/mo)"], cta: "Design Solution", time: "6-8+ weeks" },
    ],
    addOns: [
      { name: "Invoicing System", price: 480, description: "Add a system to generate and send invoices." },
      { name: "Advanced Appointment Management", price: 320, description: "Calendar and online bookings." },
      { name: "Email & Campaign Management", price: 400, priceSuffix: "/mo", description: "Newsletter and marketing campaign management." },
      { name: "Advanced SEO Positioning", price: 600, priceSuffix: "/mo", description: "Continuous SEO strategy to improve your ranking." },
    ],
    tags: ["Personal Brand", "Freelancers", "Professionals", "Web"],
  },
  {
    slug: "ai-solutions",
    tabLabel: "AI",
    title: "AI Solutions",
    shortDescription: "From intelligent chatbots to recommendation systems and predictive analytics.",
    fullDescription: "We integrate the power of artificial intelligence into your operations to automate processes, personalize the customer experience, and extract valuable insights from your data.",
    packages: [
      { name: "Basic AI", price: "2,500 - 4,000", description: "Implement an intelligent virtual assistant to automate customer service.", features: ["Basic FAQ chatbot", "WhatsApp Business integration", "Conversation dashboard", "Initial training", "Post-delivery maintenance (from $350/mo)"], cta: "Implement Chatbot", time: "3-4 weeks" },
      { name: "Advanced AI", price: "5,000 - 9,000", description: "Develop recommendation and analysis systems for deep personalization.", features: ["Chatbot with natural language processing (NLP)", "Product recommendation system", "Sentiment analysis on comments", "Multi-channel integration", "Post-delivery maintenance (from $650/mo)"], cta: "Develop AI", time: "6-8 weeks" },
      { name: "Enterprise AI", price: "10,000+", description: "Custom AI solutions with proprietary machine learning models and big data analytics.", features: ["100% custom AI solution", "Proprietary machine learning models", "Big Data integration", "Automated data pipeline", "Post-delivery maintenance (from $1,500/mo)"], cta: "Create AI Solution", time: "10-16+ weeks" },
    ],
    addOns: [],
    tags: ["AI", "Chatbot", "Machine Learning", "Automation"],
  },
  {
    slug: "automatizacion-de-procesos",
    tabLabel: "RPA",
    title: "Process Automation",
    shortDescription: "Save time and reduce errors by automating manual and repetitive tasks (RPA).",
    fullDescription: "We identify bottlenecks in your workflows and develop automated scripts and systems to eliminate them. From report generation to data synchronization between platforms, we free your team to focus on high-value tasks.",
    packages: [
      { name: "Targeted Automation", price: "1,800 - 3,500", description: "Automate a specific repetitive task, such as generating a daily report or extracting data.", features: ["Task analysis", "Automation script development", "Scheduled execution (daily, weekly)", "Script documentation and delivery", "Post-delivery maintenance (from $250/mo)"], cta: "Automate Task", time: "1-2 weeks" },
      { name: "Workflow Automation", price: "3,500 - 7,000", description: "Connect multiple applications and automate a complete workflow, such as new client onboarding.", features: ["Complete workflow analysis", "Integration of up to 3 applications (via API)", "Email/Slack notification system", "Flow monitoring dashboard", "Post-delivery maintenance (from $650/mo)"], cta: "Automate Flow", time: "3-5 weeks" },
      { name: "Enterprise RPA", price: "8,500+", description: "Robotic Process Automation (RPA) implementation to automate complex processes at scale.", features: ["RPA consulting and strategy", "Development of multiple software 'bots'", "Integration with legacy systems", "Bot control panel and orchestration", "Post-delivery maintenance (from $1,500/mo)"], cta: "Implement RPA", time: "6-10+ weeks" },
    ],
    addOns: [],
    tags: ["RPA", "Automation", "Efficiency", "Operations"],
  },
  {
    slug: "mentoria-capacitacion",
    tabLabel: "Training",
    title: "Technical Mentorship & Training",
    shortDescription: "Elevate your team's skills with personalized mentorships and training in cutting-edge technologies.",
    fullDescription: "Enhance your organization's internal talent. I offer mentorship and training programs designed to accelerate the professional development of individuals and teams, focused on the most in-demand technologies and practices.",
    packages: [
      { name: "Professional Boost", price: 480, priceSuffix: "/ 4 sessions", description: "1-on-1 mentorship for developers looking to accelerate their career, unblock challenges, and improve skills.", features: ["4 individual 1-hour sessions", "Code and portfolio review", "Personalized career plan", "Network access", "Chat support between sessions"], cta: "Start Mentorship", time: "1 month" },
      { name: "Team Accelerator", price: 1500, priceSuffix: "/mo", description: "Ongoing support for corporate development teams looking to modernize their practices and accelerate delivery.", features: ["8 hours group mentorship/month", "Project architecture review", "Best practices implementation (CI/CD, Testing)", "Problem-solving workshops", "Priority support for the team"], cta: "Accelerate Team", time: "Monthly subscription" },
      { name: "Corporate Workshop", price: "3,500+", description: "Intensive, customized technology modernization program for corporate IT teams needing to update capabilities.", features: ["100% customized curriculum (React, AI, Cloud, etc.)", "8-16 hour practical workshop", "Study materials and resources", "Certificate of participation", "Post-workshop follow-up session"], cta: "Quote Workshop", time: "To be scheduled" },
    ],
    addOns: [],
    tags: ["Mentorship", "Training", "Teams", "Corporate"],
  },
  {
    slug: "planes-soporte-crecimiento",
    tabLabel: "SLA / CTO",
    title: "Support & Growth Plans",
    shortDescription: "Ensure the health and evolution of your project with our subscription plans.",
    fullDescription: "We offer subscription plans for ongoing maintenance, technical support, and new feature development. Ensure your technology investment continues generating value long-term.",
    packages: [
      { name: "Basic SLA", price: 250, priceSuffix: "/mo", description: "Operational guarantee for production systems: proactive monitoring, security patches, and guaranteed response.", features: ["24/7 availability monitoring", "Automated daily backups", "Critical security updates (dependencies, CVEs)", "Email technical support (guaranteed 24h response)", "Monthly system health report"], cta: "Get SLA", time: "Monthly subscription" },
      { name: "Enterprise SLA", price: 650, priceSuffix: "/mo", description: "Continuous technical management for critical business platforms: database optimization, iterative improvements, and priority support.", features: ["Everything in Basic SLA", "Monthly PostgreSQL performance audit", "Priority chat support (4h response)", "6 hours development for improvements and new features", "Scheduled credential and security key rotation"], cta: "Get Enterprise SLA", time: "Monthly subscription" },
      { name: "Fractional CTO", price: 1500, priceSuffix: "/mo", description: "Part-time strategic technical leadership. Your trusted architect for infrastructure decisions, technology roadmap, and development team leadership.", features: ["Everything in Enterprise SLA", "15 hours development or architecture/month", "Bi-weekly strategic call (roadmap, stack decisions)", "24/7 emergency support with 1h response time", "Technical representation to executives and stakeholders"], cta: "Hire Fractional CTO", time: "Monthly contract" },
    ],
    addOns: [],
    tags: ["Support", "Subscription", "Maintenance", "Corporate"],
  },
  {
    slug: "sistemas-fiscales-dgi",
    tabLabel: "DGI / PAC",
    title: "Fiscal Systems & DGI",
    shortDescription: "Certified integration with Panama's Electronic Invoicing (DGI/PAC).",
    fullDescription: "Development of certified electronic invoicing software compliant with Panama's DGI regulations. We implement complete solutions with electronic signatures, schema validation, QR/CUFE codes, and secure communication with authorized PACs.",
    packages: [
      { name: "API Integration", price: 3200, description: "Certified connection module to integrate your existing software with DGI electronic invoicing via PAC.", features: ["API integration (REST/SOAP) with certified PAC", "Signed XML generation with electronic signature", "DGI/PAC response handling and contingencies", "Homologation tests included", "Post-delivery maintenance (from $350/mo)"], cta: "Integrate Invoicing", time: "3-5 weeks" },
      { name: "Invoicing Portal", price: 5500, description: "Complete web portal for issuing and receiving electronic invoices, ready for DGI Resolution N.° 201-6299 compliance.", features: ["Secure Web Portal with corporate authentication", "Issuance, Cancellation and Credit/Debit Notes", "Document reception and expense management", "Integrated client and product catalog", "Fiscal dashboard with reports 43 and 94", "Post-delivery maintenance (from $650/mo)"], cta: "Create Portal", time: "6-8 weeks" },
      { name: "Complete Fiscal System", price: "11,000+", description: "Full enterprise fiscal ERP: the ultimate solution for companies exceeding Resolution N.° 201-6299 thresholds needing their own ISV integrated to PAC.", features: ["Everything in Invoicing Portal", "Advanced real-time inventory control", "Integrated basic accounting module", "Scalable multi-company (SaaS) architecture", "Offline-first touchscreen POS included", "Post-delivery maintenance (from $1,500/mo)"], cta: "Develop System", time: "10-14+ weeks" },
    ],
    addOns: [
      { name: "PAC Homologation", price: 800, description: "Complete management of the certification process." },
      { name: "24/7 Support", price: 500, priceSuffix: "/mo", description: "Critical support for invoice issuance." },
    ],
    tags: ["DGI", "Panama", "FinTech", "Legal"],
  },
  {
    slug: "ciberseguridad-auditoria",
    tabLabel: "Cybersecurity",
    title: "Cybersecurity & Audit",
    shortDescription: "Protect your company with security audits, penetration testing, and continuous monitoring before attackers do.",
    fullDescription: "With institutions suffering recent cyberattacks, digital security is no longer optional. We ethically and professionally evaluate your system to find vulnerabilities before hackers do, delivering a clear action plan to secure your operation.",
    packages: [
      { name: "Security Assessment", price: 900, description: "A quick X-ray of your system's security risks, ideal for knowing where you stand.", features: ["Known vulnerability scan (OWASP Top 10)", "Basic server configuration review", "Port exposure and active services analysis", "Outdated software version verification", "Executive report with risk traffic light (High/Medium/Low)", "Prioritized remediation recommendations"], cta: "Start Assessment", time: "1-2 weeks" },
      { name: "Full Audit", price: 2800, description: "Comprehensive evaluation of all attack vectors in your infrastructure and digital applications.", features: ["Everything in Security Assessment", "Web application code audit (static analysis)", "Authentication, session, and access control testing", "Data encryption analysis in transit and at rest", "Log review and user permission policies", "Detailed remediation plan with correction roadmap", "Technical results review meeting with team"], cta: "Audit System", time: "3-4 weeks" },
      { name: "Professional Pentesting", price: "4,800+", description: "We simulate a real attack on your systems (ethical hacking) to find exactly what a hacker would find.", features: ["Everything in Full Audit", "Penetration testing on web apps and internal network", "Internal threat analysis (insider threats)", "Social engineering and controlled phishing (optional)", "Technical + executive results reports", "Personalized incident response plan", "Results presentation to management or board"], cta: "Hire Pentesting", time: "4-8 weeks" },
    ],
    addOns: [
      { name: "Continuous Security Monitoring", price: 350, priceSuffix: "/mo", description: "Active threat surveillance and real-time alerts." },
      { name: "Incident Response Plan", price: 1000, description: "Documentation and protocols to act in case of an attack." },
      { name: "Staff Awareness Training", price: 800, description: "Workshop for your team to identify phishing and common threats." },
    ],
    tags: ["Cybersecurity", "Audit", "Pentesting", "Enterprises"],
  },
  {
    slug: "infraestructura-servidores",
    tabLabel: "Servers",
    title: "Infrastructure & Servers",
    shortDescription: "Configure, manage, and scale your local or cloud technology infrastructure, without needing your own IT team.",
    fullDescription: "From installing and configuring a server in your office to designing a complete cloud architecture, I handle the entire technical layer so your business runs without interruption. Ideal for companies needing an external, reliable, and available IT department.",
    packages: [
      { name: "Server Setup", price: "700 - 1,200", description: "Install and properly configure your local or cloud server from scratch, production-ready.", features: ["OS installation and hardening (Linux/Windows Server)", "Firewall and secure access policy configuration", "Web services (Nginx/Apache) and database installation", "SSL/TLS and custom domain configuration", "Automated scheduled backup system", "Complete documentation of configured infrastructure"], cta: "Configure Server", time: "1-2 weeks" },
      { name: "Monthly Administration", price: 400, priceSuffix: "/mo", description: "Your external IT department: we manage your infrastructure so you can focus on your business.", features: ["24/7 availability and performance monitoring", "Security patches and critical updates", "Backup management and recovery plans", "Remote technical support (guaranteed 4h response)", "Monthly server status and health report", "Up to 4 hours of changes and improvements per month"], cta: "Hire Administration", time: "Monthly subscription" },
      { name: "Enterprise Infrastructure", price: "3,500+", description: "Design and implementation of complex infrastructure: on-premise, cloud, or hybrid architecture.", features: ["Custom network and server architecture design", "Secure corporate VPN implementation", "Virtualization (Proxmox) and containers (Docker/Kubernetes)", "High availability, load balancing, and failover", "Disaster recovery and business continuity strategy", "Legacy system migration to modern infrastructure"], cta: "Design Infrastructure", time: "4-10+ weeks" },
    ],
    addOns: [
      { name: "Cloud Migration (AWS/GCP/Azure)", price: 1200, description: "Move your current infrastructure to the cloud without downtime." },
      { name: "Corporate VPN Setup", price: 600, description: "Secure remote access for employees and remote offices." },
      { name: "Offsite Cloud Backup", price: 200, priceSuffix: "/mo", description: "Encrypted backups stored off-site." },
    ],
    tags: ["Servers", "Cloud", "Infrastructure", "DevOps"],
  },
  {
    slug: "soluciones-negocios-locales",
    tabLabel: "Local Biz",
    title: "Systems for Local Businesses",
    shortDescription: "Point of sale and complete management systems for restaurants, salons, bars, and local businesses.",
    fullDescription: "Digitize your business with a solution designed for local businesses. No jargon or complications: a system your team learns in a day that gives you total control over sales, inventory, and customers. Ideal for restaurants, beauty salons, bars, clothing stores, and any business with a physical location.",
    packages: [
      { name: "Basic POS System", price: 1200, description: "Your business in order: point of sale and inventory control on one touchscreen.", features: ["Touchscreen POS (tablet or touch screen)", "Inventory control with low stock alerts", "Sales records and receipt generation", "Daily sales reports and best-selling products", "Training for 2 users included", "Post-delivery support (from $150/mo)"], cta: "Implement POS", time: "2-3 weeks" },
      { name: "Complete Management System", price: 3000, description: "Manage your restaurant, salon, or local business with all the tools a modern business needs.", features: ["Everything in Basic POS System", "Table/appointment/shift management (by business type)", "Customer module and basic loyalty program", "Cost and margin control per product or service", "Advanced business performance reports", "Integration with order printer (kitchen/service)", "Post-delivery support (from $250/mo)"], cta: "Digitize Business", time: "4-6 weeks" },
      { name: "Premium Solution with App", price: "5,500+", description: "The ultimate tool for businesses that want to grow: complete management system plus customer app.", features: ["Everything in Complete Management System", "Customer mobile app (iOS and Android)", "Online orders and digital reservations from the app", "Loyalty program with points and rewards", "Real-time business analytics dashboard", "Integration with delivery platforms (Uber Eats, etc.)", "Post-delivery support (from $400/mo)"], cta: "Create Premium Solution", time: "8-12+ weeks" },
    ],
    addOns: [
      { name: "QR Digital Menu", price: 350, description: "Interactive menu accessible from customer's phone." },
      { name: "Delivery Platform Integration", price: 500, description: "Connect your system with Uber Eats, PedidosYa, or other platforms." },
      { name: "Online Reservation System", price: 400, description: "Reservations and appointments via WhatsApp, web, or app." },
    ],
    tags: ["Restaurants", "Salons", "Local Business", "POS"],
  },
  {
    slug: "investigacion-desarrollo",
    tabLabel: "R&D / Consulting",
    title: "Technology Consulting & R&D",
    shortDescription: "Support your company's innovation and expansion with strategic technology consulting and prototype development.",
    fullDescription: "If your company wants to innovate, adopt new technologies, or build a new product but doesn't know where to start, this is where we come in. We evaluate your situation, explore options, and build first prototypes to validate ideas before making a large investment.",
    packages: [
      { name: "Consulting Session", price: 750, priceSuffix: "/ 4 hours", description: "Technical clarity for strategic decisions: we evaluate your situation and chart a concrete path.", features: ["Discovery meeting to understand your goals and context", "Current technology state evaluation", "Solution architecture proposal with pros and cons", "Executive report with prioritized technology roadmap", "Email follow-up for 30 days"], cta: "Schedule Consulting", time: "1-2 weeks" },
      { name: "Proof of Concept (POC)", price: "3,500 - 5,500", description: "Validate your idea before investing: we build a functional prototype to test the market quickly.", features: ["Joint scope and success criteria definition", "Functional prototype development (interface + core logic)", "Internal testing and live demo session", "Technical viability report and recommended next steps", "Source code delivered to client at completion"], cta: "Build POC", time: "4-8 weeks" },
      { name: "Complete R&D Project", price: "8,000+", description: "Innovation with methodology: we research, develop, and launch new technological capabilities for your company.", features: ["Research sprint and state-of-the-art analysis", "Iterative development with feedback cycles and adjustments", "Integration with company's existing systems", "Complete technical project documentation", "Knowledge transfer to internal team", "Post-launch support for first 3 months"], cta: "Start R&D", time: "12-24+ weeks" },
    ],
    addOns: [
      { name: "Technology Competitive Analysis", price: 500, description: "Evaluation of technology solutions used by your competition." },
      { name: "Team Training on the Solution", price: 800, description: "Practical training for your team to adopt the new technology." },
    ],
    tags: ["R&D", "Innovation", "Consulting", "Technology"],
  },
];

/**
 * Returns services in the given locale (defaults to Spanish).
 * Merges English text overrides while preserving shared fields (slug, icon, prices, published, category).
 */
export function getServices(locale: string = 'es'): Service[] {
  if (locale !== 'en') return services;
  return services.map(svc => {
    const override = servicesEn.find(o => o.slug === svc.slug);
    if (!override) return svc;
    return {
      ...svc,
      tabLabel: override.tabLabel,
      title: override.title,
      shortDescription: override.shortDescription,
      fullDescription: override.fullDescription,
      tags: override.tags,
      packages: svc.packages.map((pkg, i) => ({
        ...pkg,
        ...(override.packages[i] ?? {}),
        price: pkg.price,
        originalPrice: pkg.originalPrice,
        priceSuffix: pkg.priceSuffix,
      })),
      addOns: svc.addOns.map((addon, i) => ({
        ...addon,
        ...(override.addOns[i] ?? {}),
        price: addon.price,
        originalPrice: addon.originalPrice,
        priceSuffix: addon.priceSuffix,
      })),
    };
  });
}
