
import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog, Smartphone, LineChart, ShieldCheck, Wallet, GitPullRequest, Cloud, Construction, Gauge, Users, Repeat, FileInput, Shield, GitMerge, CloudCog } from "lucide-react";

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
  icon: ReactElement;
  shortDescription: string;
  fullDescription: string;
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  tags: string[];
  published: boolean;
  category: "Web Development" | "AI Solutions" | "Infrastructure & Maintenance" | "Business Management";
};


export const services: Service[] = [
  // === WEB DEVELOPMENT SERVICES ===
  {
    title: "Desarrollo Web",
    slug: "web-development",
    icon: <Rocket />,
    category: "Web Development",
    shortDescription: "Soluciones web a medida, desde landing pages hasta aplicaciones empresariales complejas.",
    fullDescription: "Creamos experiencias web robustas, escalables y centradas en el usuario. Ya sea que necesites una simple página de aterrizaje para validar una idea o una aplicación web empresarial completa, tenemos la solución.",
    packages: [
      {
        name: "Lanzamiento Digital",
        price: 900,
        originalPrice: 1200,
        description: "Ideal para startups y pequeños negocios que necesitan una presencia online rápida y efectiva.",
        features: [
          "Landing page responsiva",
          "Optimización SEO básica",
          "Formulario de contacto",
          "Integración Google Analytics",
          "Hosting por 1 año"
        ],
        cta: "Empezar Lanzamiento",
        time: "2-3 semanas"
      },
      {
        name: "Presencia Corporativa",
        price: 2625,
        originalPrice: 3500,
        description: "Un sitio web completo para empresas medianas y profesionales establecidos que buscan consolidar su marca.",
        features: [
          "Sitio web multi-página",
          "Panel de administración (CMS)",
          "Sistema de blog avanzado",
          "Integración CRM básica",
          "Optimización de velocidad",
          "Certificado SSL premium",
          "Backup automático"
        ],
        cta: "Construir Presencia",
        time: "4-6 semanas"
      },
      {
        name: "Solución Empresarial",
        price: "7,500+",
        description: "Aplicaciones web personalizadas y de alta complejidad para grandes empresas y corporaciones.",
        features: [
          "Aplicación web a medida",
          "Arquitectura de microservicios",
          "Panel administrativo completo",
          "API REST personalizada",
          "Integración con sistemas existentes",
          "Seguridad de nivel empresarial",
          "Documentación técnica y capacitación"
        ],
        cta: "Diseñar Solución",
        time: "8-12+ semanas"
      }
    ],
    addOns: [
        { name: "Blog integrado", price: 300, description: "Para el paquete Lanzamiento Digital." },
        { name: "Chat en vivo", price: 200, description: "Para cualquier paquete." },
        { name: "Multiidioma (ES/EN)", price: 400, description: "Para cualquier paquete." },
        { name: "Sistema de citas online", price: 800, description: "Para el paquete Presencia Corporativa." },
    ],
    tags: ["Web", "Startups", "PYMEs", "Corporativo"],
    published: true,
  },
   {
    title: "Tienda Online (E-commerce)",
    slug: "tienda-online-ecommerce",
    icon: <ShoppingCart />,
    category: "Web Development",
    shortDescription: "Vende tus productos 24/7 con una tienda online potente, segura y fácil de gestionar.",
    fullDescription: "Llevamos tu negocio al mundo digital con una plataforma de e-commerce completa. Desde la configuración inicial hasta la integración de pasarelas de pago, te damos las herramientas para vender en línea exitosamente.",
    packages: [
      {
        name: "Catálogo Digital",
        price: 1125,
        originalPrice: 1500,
        description: "Muestra tus productos en un catálogo online profesional con opción de contacto directo para ventas.",
        features: ["Catálogo de hasta 100 productos", "Diseño responsivo", "Galería de imágenes por producto", "Botón de WhatsApp para pedidos", "Capacitación de gestión"],
        cta: "Crear Catálogo",
        time: "3-4 semanas"
      },
      {
        name: "E-commerce Esencial",
        price: 2400,
        originalPrice: 3200,
        description: "Una tienda online completa con carrito de compras y pagos en línea para empezar a vender ya.",
        features: ["Todo lo de Catálogo Digital", "Carrito de compras", "Integración con pasarelas de pago (Stripe/PayPal)", "Gestión de inventario básica", "Sistema de cupones de descuento"],
        cta: "Lanzar Tienda",
        time: "5-7 semanas"
      },
      {
        name: "E-commerce Avanzado",
        price: "6,000+",
        description: "Soluciones de e-commerce a medida para grandes volúmenes de venta y funcionalidades complejas.",
        features: ["Todo lo de E-commerce Esencial", "Cuentas de clientes y perfiles", "Sistema de reseñas de productos", "Integración con sistemas de envío", "Facturación automática", "Optimización para la conversión"],
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
    icon: <Briefcase />,
    category: "Business Management",
    shortDescription: "Sistemas a medida para inventario, planilla y facturación. Optimiza tus operaciones.",
    fullDescription: "Digitaliza y automatiza los procesos clave de tu empresa con software a medida. Desarrollamos sistemas de gestión de inventario, manejo de planilla y facturación electrónica para reducir errores, ahorrar tiempo y darte control total sobre tu negocio.",
    packages: [
      {
        name: "Módulo Individual",
        price: 1875,
        originalPrice: 2500,
        description: "Elige un módulo (Inventario, Planilla o Facturación) y digitaliza un área clave de tu empresa.",
        features: ["Un módulo a elección", "Carga inicial de datos (hasta 500 registros)", "Dashboard de reportes básicos", "Capacitación para 2 usuarios", "Soporte de implementación"],
        cta: "Digitalizar Módulo",
        time: "4-6 semanas"
      },
      {
        name: "Suite PYME",
        price: 4500,
        originalPrice: 6000,
        description: "Una solución integrada con dos módulos a tu elección para una gestión más completa.",
        features: ["Dos módulos a elección", "Integración entre módulos seleccionados", "Dashboard de reportes unificado", "Capacitación para 5 usuarios", "Roles y permisos de usuario"],
        cta: "Integrar Suite",
        time: "8-10 semanas"
      },
      {
        name: "ERP a Medida",
        price: "9,000+",
        description: "Un sistema de planificación de recursos empresariales (ERP) completo y personalizado para tu compañía.",
        features: ["Módulos de Inventario, Planilla y Facturación", "Módulos adicionales (CRM, Compras, etc.)", "Integración con hardware (scanners, impresoras fiscales)", "Migración de datos completa", "Soporte y mantenimiento premium"],
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
    icon: <Smartphone />,
    category: "Web Development",
    shortDescription: "Apps para iOS y Android que conectan con tus usuarios y fortalecen tu marca.",
    fullDescription: "Lleva tu servicio o producto al bolsillo de tus clientes con aplicaciones móviles nativas o multiplataforma. Creamos apps intuitivas, de alto rendimiento y listas para publicar en la App Store y Google Play.",
     packages: [
      {
        name: "MVP App",
        price: "4,000 - 8,000",
        description: "Lanza una primera versión de tu aplicación para validar tu idea en el mercado con funcionalidades clave.",
        features: ["App para iOS o Android (multiplataforma)", "Hasta 5 pantallas clave", "Diseño de interfaz estándar", "Integración con backend básico (Firebase)", "Publicación en tiendas de apps"],
        cta: "Lanzar MVP",
        time: "6-8 semanas"
      },
      {
        name: "App Profesional",
        price: "8,000 - 15,000",
        description: "Una aplicación completa con diseño personalizado y funcionalidades avanzadas para un negocio establecido.",
        features: ["App para iOS y Android", "Diseño de interfaz 100% personalizado", "Notificaciones push", "Cuentas de usuario y perfiles", "Integración con APIs de terceros"],
        cta: "Desarrollar App",
        time: "10-16 semanas"
      },
      {
        name: "App Empresarial",
        price: "15,000+",
        description: "Soluciones móviles complejas con integraciones a nivel de sistema, seguridad avanzada y escalabilidad.",
        features: ["Todo lo del plan Profesional", "Pagos dentro de la app", "Funcionalidades offline", "Dashboard de administración web", "Analíticas avanzadas de uso"],
        cta: "Crear Solución Móvil",
        time: "16+ semanas"
      }
    ],
    addOns: [],
    tags: ["Móvil", "iOS", "Android", "Startups"],
    published: true,
  },
  // === AI SOLUTIONS SERVICES ===
  {
    title: "Soluciones con IA",
    slug: "ai-solutions",
    icon: <BrainCircuit />,
    category: "AI Solutions",
    shortDescription: "Desde chatbots inteligentes hasta sistemas de recomendación y análisis predictivo.",
    fullDescription: "Integramos el poder de la inteligencia artificial en tus operaciones para automatizar procesos, personalizar la experiencia del cliente y extraer insights valiosos de tus datos.",
    packages: [
      {
        name: "IA Básica",
        price: "1,200 - 2,500",
        description: "Implementa un asistente virtual inteligente para automatizar la atención al cliente.",
        features: [
          "Chatbot básico con FAQ",
          "Integración WhatsApp Business",
          "Dashboard de conversaciones",
          "Entrenamiento inicial",
          "Soporte por 3 meses"
        ],
        cta: "Implementar Chatbot",
        time: "3-4 semanas"
      },
      {
        name: "IA Avanzada",
        price: "3,500 - 7,000",
        description: "Desarrolla sistemas de recomendación y análisis para una personalización profunda.",
        features: [
          "Chatbot con procesamiento de lenguaje natural (NLP)",
          "Sistema de recomendaciones de productos",
          "Análisis de sentimientos en comentarios",
          "Integración multi-canal",
          "Dashboard de analytics de IA"
        ],
        cta: "Desarrollar IA",
        time: "6-8 semanas"
      },
      {
        name: "IA Empresarial",
        price: "8,000+",
        description: "Soluciones de IA a medida con modelos de Machine Learning propios y análisis de big data.",
        features: [
          "Solución de IA 100% personalizada",
          "Modelos de machine learning propios",
          "Integración con Big Data",
          "Pipeline de datos automatizado",
          "Monitoreo y optimización continua",
          "Consultoría estratégica en IA"
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
    icon: <Repeat />,
    category: "AI Solutions",
    shortDescription: "Ahorra tiempo y reduce errores automatizando tareas manuales y repetitivas (RPA).",
    fullDescription: "Identificamos cuellos de botella en tus flujos de trabajo y desarrollamos scripts y sistemas automatizados para eliminarlos. Desde la generación de reportes hasta la sincronización de datos entre plataformas, liberamos a tu equipo para que se enfoque en tareas de alto valor.",
    packages: [
      {
        name: "Tarea Específica",
        price: "500 - 1,500",
        description: "Automatiza una tarea repetitiva específica, como la generación de un reporte diario o la extracción de datos.",
        features: ["Análisis de la tarea a automatizar", "Desarrollo de script de automatización", "Ejecución programada (diaria, semanal)", "Documentación y entrega del script"],
        cta: "Automatizar Tarea",
        time: "1-2 semanas"
      },
      {
        name: "Flujo de Trabajo",
        price: "2,000 - 5,000",
        description: "Conecta varias aplicaciones y automatiza un flujo de trabajo completo, como el onboarding de un nuevo cliente.",
        features: ["Análisis del flujo de trabajo completo", "Integración de hasta 3 aplicaciones (vía API)", "Sistema de notificaciones por email/Slack", "Dashboard de monitoreo del flujo"],
        cta: "Automatizar Flujo",
        time: "3-5 semanas"
      },
      {
        name: "RPA Empresarial",
        price: "7,000+",
        description: "Implementación de Robotic Process Automation (RPA) para automatizar procesos complejos a gran escala.",
        features: ["Consultoría y estrategia de RPA", "Desarrollo de múltiples 'bots' de software", "Integración con sistemas legados", "Panel de control y orquestación de bots", "Capacitación y soporte continuo"],
        cta: "Implementar RPA",
        time: "6-10+ semanas"
      }
    ],
    addOns: [],
    tags: ["RPA", "Automatización", "Eficiencia", "Operaciones"],
    published: true,
  },
  // === SUPPORT & GROWTH SERVICES ===
  {
    title: "Planes de Soporte y Crecimiento",
    slug: "planes-soporte-crecimiento",
    icon: <ShieldCheck />,
    category: "Infrastructure & Maintenance",
    shortDescription: "Asegura la salud y evolución de tu proyecto con nuestros planes de suscripción.",
    fullDescription: "Ofrecemos planes de suscripción para el mantenimiento continuo, soporte técnico y desarrollo de nuevas funcionalidades. Garantiza que tu inversión tecnológica siga generando valor a largo plazo.",
    packages: [
      {
        name: "Soporte Esencial",
        price: 140,
        priceSuffix: "/mes",
        description: "Para mantener tu sitio o app segura y funcionando óptimamente.",
        features: ["Monitoreo de disponibilidad 24/7", "Backups diarios", "Actualizaciones de seguridad críticas", "Soporte técnico por email (respuesta en 24h)"],
        cta: "Obtener Soporte",
        time: "Suscripción mensual"
      },
      {
        name: "Crecimiento Plus",
        price: 350,
        priceSuffix: "/mes",
        description: "Ideal para negocios que buscan mejorar y añadir funcionalidades continuamente.",
        features: ["Todo lo del plan Esencial", "Soporte prioritario por chat", "4 horas de desarrollo para mejoras", "Consultoría proactiva de mejoras"],
        cta: "Empezar a Crecer",
        time: "Suscripción mensual"
      },
      {
        name: "Socio Estratégico",
        price: 980,
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
