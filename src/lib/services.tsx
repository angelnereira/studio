

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
  name:string;
  price: number;
  originalPrice?: number;
  priceSuffix?: string;
  description?: string;
};

export type Service = {
  title: string;
  slug: string;
  icon: React.ElementType;
  shortDescription: string;
  fullDescription: string;
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  tags: string[];
  published: boolean;
  category: "Web Development" | "AI Solutions" | "Infrastructure & Maintenance" | "Business Management" | "Mentorías y Capacitación";
};


export const services: Service[] = [
  // === WEB DEVELOPMENT SERVICES ===
  {
    title: "Desarrollo Web",
    slug: "web-development",
    icon: Rocket,
    category: "Web Development",
    shortDescription: "Soluciones web a medida, desde landing pages hasta aplicaciones empresariales complejas.",
    fullDescription: "Creamos experiencias web robustas, escalables y centradas en el usuario. Ya sea que necesites una simple página de aterrizaje para validar una idea o una aplicación web empresarial completa, tenemos la solución.",
    packages: [
      {
        name: "Lanzamiento Digital",
        price: 720,
        originalPrice: 1200,
        description: "Ideal para startups y pequeños negocios que necesitan una presencia online rápida y efectiva.",
        features: [
          "Landing page responsiva",
          "Optimización SEO básica",
          "Formulario de contacto",
          "Integración Google Analytics",
          "Hosting por 1 año",
          "Mantenimiento post-entrega (desde $56/mes)"
        ],
        cta: "Empezar Lanzamiento",
        time: "2-3 semanas"
      },
      {
        name: "Presencia Corporativa",
        price: 2100,
        originalPrice: 2800,
        description: "Un sitio web completo para empresas medianas y profesionales establecidos que buscan consolidar su marca.",
        features: [
          "Sitio web multi-página",
          "Panel de administración (CMS)",
          "Sistema de blog avanzado",
          "Integración CRM básica",
          "Optimización de velocidad",
          "Certificado SSL premium",
          "Mantenimiento post-entrega (desde $112/mes)"
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
          "Mantenimiento post-entrega (desde $280/mes)"
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
    tags: ["Web", "Startups", "PYMEs", "Corporativo"],
    published: true,
  },
   {
    title: "Tienda Online (E-commerce)",
    slug: "tienda-online-ecommerce",
    icon: ShoppingCart,
    category: "Web Development",
    shortDescription: "Vende tus productos 24/7 con una tienda online potente, segura y fácil de gestionar.",
    fullDescription: "Llevamos tu negocio al mundo digital con una plataforma de e-commerce completa. Desde la configuración inicial hasta la integración de pasarelas de pago, te damos las herramientas para vender en línea exitosamente.",
    packages: [
      {
        name: "Catálogo Digital",
        price: 720,
        originalPrice: 1200,
        description: "Muestra tus productos en un catálogo online profesional con opción de contacto directo para ventas.",
        features: ["Catálogo de hasta 100 productos", "Diseño responsivo", "Galería de imágenes por producto", "Botón de WhatsApp para pedidos", "Capacitación de gestión", "Mantenimiento post-entrega (desde $56/mes)"],
        cta: "Crear Catálogo",
        time: "3-4 semanas"
      },
      {
        name: "E-commerce Esencial",
        price: 1920,
        originalPrice: 2560,
        description: "Una tienda online completa con carrito de compras y pagos en línea para empezar a vender ya.",
        features: ["Todo lo de Catálogo Digital", "Carrito de compras", "Integración con pasarelas de pago (Stripe/PayPal)", "Gestión de inventario básica", "Sistema de cupones de descuento", "Mantenimiento post-entrega (desde $112/mes)"],
        cta: "Lanzar Tienda",
        time: "5-7 semanas"
      },
      {
        name: "E-commerce Avanzado",
        price: "4,800+",
        description: "Soluciones de e-commerce a medida para grandes volúmenes de venta y funcionalidades complejas.",
        features: ["Todo lo de E-commerce Esencial", "Cuentas de clientes y perfiles", "Sistema de reseñas de productos", "Integración con sistemas de envío", "Facturación automática", "Mantenimiento post-entrega (desde $280/mes)"],
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
    icon: Briefcase,
    category: "Business Management",
    shortDescription: "Sistemas a medida para inventario, planilla y facturación. Optimiza tus operaciones.",
    fullDescription: "Digitaliza y automatiza los procesos clave de tu empresa con software a medida. Desarrollamos sistemas de gestión de inventario, manejo de planilla y facturación electrónica para reducir errores, ahorrar tiempo y darte control total sobre tu negocio.",
    packages: [
      {
        name: "Módulo Individual",
        price: 1500,
        originalPrice: 2000,
        description: "Elige un módulo (Inventario, Planilla o Facturación) y digitaliza un área clave de tu empresa.",
        features: ["Un módulo a elección", "Carga inicial de datos (hasta 500 registros)", "Dashboard de reportes básicos", "Capacitación para 2 usuarios", "Mantenimiento post-entrega (desde $112/mes)"],
        cta: "Digitalizar Módulo",
        time: "4-6 semanas"
      },
      {
        name: "Suite PYME",
        price: 3600,
        originalPrice: 4800,
        description: "Una solución integrada con dos módulos a tu elección para una gestión más completa.",
        features: ["Dos módulos a elección", "Integración entre módulos seleccionados", "Dashboard de reportes unificado", "Capacitación para 5 usuarios", "Mantenimiento post-entrega (desde $280/mes)"],
        cta: "Integrar Suite",
        time: "8-10 semanas"
      },
      {
        name: "ERP a Medida",
        price: "7,200+",
        description: "Un sistema de planificación de recursos empresariales (ERP) completo y personalizado para tu compañía.",
        features: ["Módulos de Inventario, Planilla y Facturación", "Módulos adicionales (CRM, Compras, etc.)", "Integración con hardware (scanners, impresoras fiscales)", "Migración de datos completa", "Mantenimiento post-entrega (desde $784/trimestre)"],
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
    icon: Smartphone,
    category: "Web Development",
    shortDescription: "Apps para iOS y Android que conectan con tus usuarios y fortalecen tu marca.",
    fullDescription: "Lleva tu servicio o producto al bolsillo de tus clientes con aplicaciones móviles nativas o multiplataforma. Creamos apps intuitivas, de alto rendimiento y listas para publicar en la App Store y Google Play.",
     packages: [
      {
        name: "MVP App",
        price: "3,200 - 6,400",
        description: "Lanza una primera versión de tu aplicación para validar tu idea en el mercado con funcionalidades clave.",
        features: ["App para iOS o Android (multiplataforma)", "Hasta 5 pantallas clave", "Diseño de interfaz estándar", "Integración con backend básico (Firebase)", "Publicación en tiendas de apps", "Mantenimiento post-entrega (desde $280/mes)"],
        cta: "Lanzar MVP",
        time: "6-8 semanas"
      },
      {
        name: "App Profesional",
        price: "6,400 - 12,000",
        description: "Una aplicación completa con diseño personalizado y funcionalidades avanzadas para un negocio establecido.",
        features: ["App para iOS y Android", "Diseño de interfaz 100% personalizado", "Notificaciones push", "Cuentas de usuario y perfiles", "Integración con APIs de terceros", "Mantenimiento post-entrega (desde $280/mes)"],
        cta: "Desarrollar App",
        time: "10-16 semanas"
      },
      {
        name: "App Empresarial",
        price: "12,000+",
        description: "Soluciones móviles complejas con integraciones a nivel de sistema, seguridad avanzada y escalabilidad.",
        features: ["Todo lo del plan Profesional", "Pagos dentro de la app", "Funcionalidades offline", "Dashboard de administración web", "Mantenimiento post-entrega (desde $784/trimestre)"],
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
          "Mantenimiento post-entrega (desde $56/mes)"
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
          "Mantenimiento post-entrega (desde $112/mes)"
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
          "Mantenimiento post-entrega (desde $280/mes)"
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
    icon: BrainCircuit,
    category: "AI Solutions",
    shortDescription: "Desde chatbots inteligentes hasta sistemas de recomendación y análisis predictivo.",
    fullDescription: "Integramos el poder de la inteligencia artificial en tus operaciones para automatizar procesos, personalizar la experiencia del cliente y extraer insights valiosos de tus datos.",
    packages: [
      {
        name: "IA Básica",
        price: "960 - 2,000",
        description: "Implementa un asistente virtual inteligente para automatizar la atención al cliente.",
        features: [
          "Chatbot básico con FAQ",
          "Integración WhatsApp Business",
          "Dashboard de conversaciones",
          "Entrenamiento inicial",
          "Mantenimiento post-entrega (desde $112/mes)"
        ],
        cta: "Implementar Chatbot",
        time: "3-4 semanas"
      },
      {
        name: "IA Avanzada",
        price: "2,800 - 5,600",
        description: "Desarrolla sistemas de recomendación y análisis para una personalización profunda.",
        features: [
          "Chatbot con procesamiento de lenguaje natural (NLP)",
          "Sistema de recomendaciones de productos",
          "Análisis de sentimientos en comentarios",
          "Integración multi-canal",
          "Mantenimiento post-entrega (desde $280/mes)"
        ],
        cta: "Desarrollar IA",
        time: "6-8 semanas"
      },
      {
        name: "IA Empresarial",
        price: "6,400+",
        description: "Soluciones de IA a medida con modelos de Machine Learning propios y análisis de big data.",
        features: [
          "Solución de IA 100% personalizada",
          "Modelos de machine learning propios",
          "Integración con Big Data",
          "Pipeline de datos automatizado",
          "Mantenimiento post-entrega (desde $784/trimestre)"
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
    icon: Repeat,
    category: "AI Solutions",
    shortDescription: "Ahorra tiempo y reduce errores automatizando tareas manuales y repetitivas (RPA).",
    fullDescription: "Identificamos cuellos de botella en tus flujos de trabajo y desarrollamos scripts y sistemas automatizados para eliminarlos. Desde la generación de reportes hasta la sincronización de datos entre plataformas, liberamos a tu equipo para que se enfoque en tareas de alto valor.",
    packages: [
      {
        name: "Tarea Específica",
        price: "400 - 1,200",
        description: "Automatiza una tarea repetitiva específica, como la generación de un reporte diario o la extracción de datos.",
        features: ["Análisis de la tarea a automatizar", "Desarrollo de script de automatización", "Ejecución programada (diaria, semanal)", "Documentación y entrega del script", "Mantenimiento post-entrega (desde $56/mes)"],
        cta: "Automatizar Tarea",
        time: "1-2 semanas"
      },
      {
        name: "Flujo de Trabajo",
        price: "1,600 - 4,000",
        description: "Conecta varias aplicaciones y automatiza un flujo de trabajo completo, como el onboarding de un nuevo cliente.",
        features: ["Análisis del flujo de trabajo completo", "Integración de hasta 3 aplicaciones (vía API)", "Sistema de notificaciones por email/Slack", "Dashboard de monitoreo del flujo", "Mantenimiento post-entrega (desde $280/mes)"],
        cta: "Automatizar Flujo",
        time: "3-5 semanas"
      },
      {
        name: "RPA Empresarial",
        price: "5,600+",
        description: "Implementación de Robotic Process Automation (RPA) para automatizar procesos complejos a gran escala.",
        features: ["Consultoría y estrategia de RPA", "Desarrollo de múltiples 'bots' de software", "Integración con sistemas legados", "Panel de control y orquestación de bots", "Mantenimiento post-entrega (desde $784/trimestre)"],
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
    icon: Users,
    category: "Mentorías y Capacitación",
    shortDescription: "Eleva las habilidades de tu equipo con mentorías personalizadas y capacitación en tecnologías de vanguardia.",
    fullDescription: "Potencia el talento interno de tu organización. Ofrezco programas de mentoría y capacitación diseñados para acelerar el desarrollo profesional de individuos y equipos, enfocados en las tecnologías y prácticas más demandadas del mercado.",
    packages: [
      {
        name: "Impulso Profesional",
        price: 360,
        originalPrice: 480,
        priceSuffix: "/ 4 sesiones",
        description: "Mentoría 1-a-1 para desarrolladores que buscan acelerar su carrera, resolver bloqueos y mejorar sus habilidades.",
        features: ["4 sesiones individuales de 1 hora", "Revisión de código y portafolio", "Plan de carrera personalizado", "Acceso a red de contactos", "Soporte por chat entre sesiones"],
        cta: "Iniciar Mentoría",
        time: "1 mes"
      },
      {
        name: "Acelerador de Equipos",
        price: 960,
        priceSuffix: "/mes",
        description: "Acompañamiento continuo para equipos de desarrollo que buscan mejorar sus prácticas y velocidad de entrega.",
        features: ["8 horas de mentoría grupal/mes", "Revisión de arquitectura de proyectos", "Implementación de mejores prácticas (CI/CD, Testing)", "Talleres de resolución de problemas", "Soporte prioritario para el equipo"],
        cta: "Acelerar Equipo",
        time: "Suscripción mensual"
      },
      {
        name: "Workshop Corporativo",
        price: "2,000+",
        description: "Capacitación intensiva y a medida para empresas que necesitan formar a sus colaboradores en tecnologías específicas.",
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
    icon: ShieldCheck,
    category: "Infrastructure & Maintenance",
    shortDescription: "Asegura la salud y evolución de tu proyecto con nuestros planes de suscripción.",
    fullDescription: "Ofrecemos planes de suscripción para el mantenimiento continuo, soporte técnico y desarrollo de nuevas funcionalidades. Garantiza que tu inversión tecnológica siga generando valor a largo plazo.",
    packages: [
      {
        name: "Soporte Inicial",
        price: 56,
        priceSuffix: "/mes",
        description: "Para mantener tu proyecto pequeño seguro y actualizado.",
        features: ["Monitoreo de disponibilidad", "Backups semanales", "Actualizaciones de seguridad", "Soporte técnico por email (respuesta en 48h)"],
        cta: "Obtener Soporte",
        time: "Suscripción mensual"
      },
      {
        name: "Soporte Básico",
        price: 112,
        priceSuffix: "/mes",
        description: "Para mantener tu sitio o app segura y funcionando óptimamente.",
        features: ["Monitoreo de disponibilidad 24/7", "Backups diarios", "Actualizaciones de seguridad críticas", "Soporte técnico por email (respuesta en 24h)"],
        cta: "Obtener Soporte",
        time: "Suscripción mensual"
      },
      {
        name: "Crecimiento Plus",
        price: 280,
        priceSuffix: "/mes",
        description: "Ideal para negocios que buscan mejorar y añadir funcionalidades continuamente.",
        features: ["Todo lo del plan Básico", "Soporte prioritario por chat", "4 horas de desarrollo para mejoras", "Consultoría proactiva de mejoras"],
        cta: "Empezar a Crecer",
        time: "Suscripción mensual"
      },
      {
        name: "Socio Estratégico",
        price: 784,
        priceSuffix: "/trimestre",
        description: "Una alianza para empresas que ven la tecnología como pilar de su estrategia.",
        features: ["Todo lo del plan Crecimiento Plus", "15 horas de desarrollo por trimestre", "Llamada de estrategia mensual", "Soporte prioritario 24/7 para emergencias"],
        cta: "Formar Alianza",
        time: "Suscripción trimestral"
      }
    ],
    addOns: [],
    tags: ["Soporte", "Suscripción", "Mantenimiento", "Corporativo"],
    published: true,
  },
];
