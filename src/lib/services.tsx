
import { ReactElement } from "react";
import { Briefcase, Building, Puzzle, Code2, Bot, Database, KeyRound, ShoppingCart, Receipt, BrainCircuit, Rocket, Server, FileCog, MonitorCog, Smartphone, LineChart, ShieldCheck, Wallet, GitPullRequest, Cloud, Construction, Gauge, Users, Repeat, FileInput, Shield, GitMerge, CloudCog } from "lucide-react";

export type ServicePackage = {
  name: string; // Ej: "Sitio Web Básico / Landing Page"
  price: number;
  originalPrice?: number;
  priceSuffix?: string; // Ej: "/mes"
  description: string;
  features: string[];
  cta: string;
  time: string; // Ej: "1-2 semanas"
};

export type ServiceAddOn = {
  name:string;
  price: number;
  originalPrice?: number;
  priceSuffix?: string;
  description: string;
};

export type Service = {
  title: string;
  slug: string;
  icon: ReactElement;
  shortDescription: string; // Usado en la tarjeta de la página principal de servicios
  fullDescription: string; // Usado en la página de detalles del servicio
  packages: ServicePackage[];
  addOns: ServiceAddOn[];
  tags: string[]; // Ej: "PYMEs", "Retail", etc.
  published: boolean;
  category: "Desarrollo y Aplicaciones" | "Gestión de Negocios y Operaciones" | "Automatización e Inteligencia Artificial" | "Infraestructura y Mantenimiento";
};

export const services: Service[] = [
  // === CATEGORÍA: DESARROLLO Y APLICACIONES ===
  {
    title: "Sitio Web Básico / Landing Page",
    slug: "landing-page",
    icon: <Rocket />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Lanza tu presencia online para capturar clientes potenciales y validar tu idea de negocio rápidamente.",
    fullDescription: "Creamos una página de aterrizaje (landing page) profesional y de alto impacto, diseñada para convertir visitantes en clientes. Es la solución perfecta para lanzar un nuevo producto, promocionar un evento o establecer una presencia digital sólida desde el día uno.",
    packages: [
      {
        name: "Paquete Landing Page",
        price: 392,
        originalPrice: 560,
        description: "Una página web de una sola sección, optimizada para conversiones.",
        features: ["Diseño profesional y moderno", "100% adaptable a móviles y tabletas", "Formulario de contacto funcional", "Optimización SEO inicial para Google", "Despliegue incluido"],
        cta: "Lanzar mi Página",
        time: "1–2 semanas"
      }
    ],
    addOns: [],
    tags: ["Startups", "Marketing", "Eventos"],
    published: true,
  },
  {
    title: "Sitio Web Corporativo",
    slug: "sitio-web-corporativo",
    icon: <Building />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Establece la credibilidad de tu empresa con un sitio web profesional de múltiples páginas.",
    fullDescription: "Desarrollamos un sitio web corporativo completo (5-10 páginas) que sirve como tu centro de operaciones digital. Comunica la historia de tu marca, presenta tus servicios y genera confianza en tus clientes e inversores. Incluye secciones como 'Sobre Nosotros', 'Servicios', 'Equipo' y 'Contacto'.",
    packages: [
      {
        name: "Paquete Corporativo",
        price: 1225,
        originalPrice: 1750,
        description: "Un sitio web completo y dinámico para presentar tu empresa al mundo.",
        features: ["Diseño de hasta 10 páginas", "Sistema de gestión de contenido (CMS) para que actualices tu mismo", "Blog integrado", "Diseño a la medida de tu marca", "Analítica web"],
        cta: "Construir mi Sitio",
        time: "3–5 semanas"
      }
    ],
    addOns: [],
    tags: ["PYMEs", "Empresas", "Corporativo"],
    published: true,
  },
  {
    title: "Portafolio Profesional",
    slug: "portafolio-profesional",
    icon: <Briefcase />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Destaca tu trabajo y experiencia para atraer clientes y oportunidades de alto valor.",
    fullDescription: "Diseñamos un portafolio digital elegante y persuasivo para profesionales como abogados, arquitectos, médicos o contratistas. Mostramos tus proyectos, casos de éxito y testimonios de una manera que te posiciona como un experto en tu campo.",
    packages: [
      {
        name: "Paquete Portafolio",
        price: 490,
        originalPrice: 700,
        description: "Un portafolio digital a medida para mostrar tu trayectoria profesional.",
        features: ["Galería de proyectos ilimitada", "Diseño enfocado en tu marca personal", "Sección de biografía, CV y testimonios", "Fácil de actualizar por ti mismo", "Optimizado para búsquedas con tu nombre"],
        cta: "Crear mi Portafolio",
        time: "2–4 semanas"
      }
    ],
    addOns: [],
    tags: ["Profesionales", "Freelancers", "Consultores"],
    published: true,
  },
  {
    title: "E-commerce y Tienda Online",
    slug: "tienda-online-ecommerce",
    icon: <ShoppingCart />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Vende tus productos 24/7 con una tienda online segura, rápida y fácil de gestionar.",
    fullDescription: "Construimos tu tienda virtual desde cero. Implementamos un catálogo de productos completo, un carrito de compras intuitivo y una pasarela de pagos segura para que puedas empezar a vender en línea sin fricciones, ofreciendo la mejor experiencia a tus clientes.",
    packages: [
      {
        name: "Paquete E-commerce",
        price: 1960,
        originalPrice: 2800,
        description: "Una solución de comercio electrónico completa para digitalizar tus ventas.",
        features: ["Catálogo de productos auto-gestionable", "Integración de pasarela de pagos (tarjetas, Yappy, Nequi)", "Gestión de pedidos e inventario básico", "Cuentas de cliente", "Diseño optimizado para la conversión"],
        cta: "Empezar a Vender",
        time: "5–8 semanas"
      }
    ],
    addOns: [],
    tags: ["Retail", "PYMEs", "Emprendedores"],
    published: true,
  },
  {
    title: "Aplicaciones Web Personalizadas",
    slug: "aplicaciones-web-personalizadas",
    icon: <Code2 />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Digitaliza las operaciones de tu negocio con una herramienta web construida a la medida de tus necesidades.",
    fullDescription: "Si un software existente no resuelve tu problema, construimos una aplicación web desde cero, diseñada exclusivamente para tus procesos. Desde sistemas de gestión interna hasta plataformas para clientes, creamos la solución exacta que tu negocio necesita para crecer.",
    packages: [
       {
        name: "Paquete Aplicación a Medida",
        price: 1715,
        originalPrice: 2450,
        description: "Una aplicación web robusta para resolver un problema de negocio específico.",
        features: ["Análisis y diseño de la solución", "Desarrollo de funcionalidades a medida", "Base de datos segura y escalable", "Panel de administración", "Autenticación y roles de usuario"],
        cta: "Digitalizar mi Proceso",
        time: "4–10 semanas"
      }
    ],
    addOns: [],
    tags: ["Operaciones", "Logística", "Servicios"],
    published: true,
  },
  {
    title: "Aplicaciones Móviles (iOS y Android)",
    slug: "aplicaciones-moviles",
    icon: <Smartphone />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Llega a tus clientes dondequiera que estén con una aplicación móvil para iOS y Android.",
    fullDescription: "Desarrollamos una primera versión de tu aplicación móvil (MVP) para que puedas lanzarla al mercado, obtener feedback de usuarios reales y validar tu modelo de negocio. Construimos para iOS y Android, asegurando una experiencia de usuario nativa y fluida.",
    packages: [
      {
        name: "Paquete App Móvil (MVP)",
        price: 2940,
        originalPrice: 4200,
        description: "Lanza la primera versión de tu app en iOS y Android.",
        features: ["Diseño de interfaz y experiencia de usuario (UI/UX)", "Funcionalidades clave para el MVP", "Backend y base de datos en la nube", "Publicación en App Store y Google Play", "Panel de administración básico"],
        cta: "Lanzar mi App",
        time: "8–16 semanas"
      }
    ],
    addOns: [],
    tags: ["Startups", "Móvil", "Innovación"],
    published: true,
  },
  {
    title: "Migración y Modernización Digital",
    slug: "migracion-modernizacion-digital",
    icon: <CloudCog />,
    category: "Desarrollo y Aplicaciones",
    shortDescription: "Actualiza tu sitio web o sistema obsoleto a una tecnología moderna, rápida y segura.",
    fullDescription: "Migramos tu plataforma actual (ej. un sitio viejo en WordPress o un sistema de escritorio) a una arquitectura moderna en la nube. El resultado es un sistema más rápido, más seguro, más fácil de mantener y preparado para el futuro.",
    packages: [
      {
        name: "Paquete de Modernización",
        price: 980,
        originalPrice: 1400,
        description: "Transforma tu sistema legado en una solución moderna.",
        features: ["Auditoría del sistema actual", "Plan de migración de datos y funcionalidades", "Reconstrucción con tecnología moderna (Next.js, Firebase)", "Mejora de rendimiento y seguridad", "Capacitación en la nueva plataforma"],
        cta: "Modernizar mi Sistema",
        time: "2–6 semanas"
      }
    ],
    addOns: [],
    tags: ["Legacy", "Tech Debt", "Performance"],
    published: true,
  },

  // === CATEGORÍA: GESTIÓN DE NEGOCIOS Y OPERACIONES ===
  {
    title: "Sistemas de Facturación Electrónica",
    slug: "sistemas-facturacion-electronica",
    icon: <Receipt />,
    category: "Gestión de Negocios y Operaciones",
    shortDescription: "Automatiza la emisión de facturas electrónicas y cumple con las normativas de la DGI en Panamá.",
    fullDescription: "Implementamos o desarrollamos un sistema que se conecta con un Proveedor de Autorización Calificado (PAC) para generar facturas electrónicas de forma automática. Olvídate de los procesos manuales y asegura el cumplimiento fiscal de tu empresa.",
    packages: [
       {
        name: "Paquete de Facturación",
        price: 735,
        originalPrice: 1050,
        description: "Integra la facturación electrónica en tus procesos de venta.",
        features: ["Conexión con PAC autorizado por la DGI", "Generación de facturas, notas de crédito y débito", "Envío automático de facturas al cliente", "Portal para consulta de documentos fiscales", "Reportes de ventas y impuestos"],
        cta: "Automatizar Facturación",
        time: "3–6 semanas"
      }
    ],
    addOns: [],
    tags: ["Finanzas", "PYMEs", "Cumplimiento"],
    published: true,
  },
  {
    title: "Sistema de Inventario y Catálogo",
    slug: "sistema-inventario",
    icon: <FileCog />,
    category: "Gestión de Negocios y Operaciones",
    shortDescription: "Controla tus existencias en tiempo real para evitar pérdidas y optimizar tus compras.",
    fullDescription: "Desarrollamos un sistema a medida para la gestión de tu inventario. Controla entradas, salidas, transferencias entre sucursales y obtén visibilidad total de tu stock. Recibe alertas de stock bajo para no perder nunca una venta.",
    packages: [
      {
        name: "Paquete de Inventario",
        price: 1225,
        originalPrice: 1750,
        description: "Digitaliza el control de tu inventario para una gestión eficiente.",
        features: ["Catálogo de productos con variantes (tallas, colores)", "Control de entradas y salidas de stock", "Múltiples bodegas o sucursales", "Reportes de rotación y valoración", "Alertas de stock mínimo"],
        cta: "Controlar mi Stock",
        time: "4–8 semanas"
      }
    ],
    addOns: [],
    tags: ["Retail", "Logística", "Distribución"],
    published: true,
  },
  {
    title: "Integración de Pasarelas de Pago",
    slug: "integracion-pasarelas-pago",
    icon: <Wallet />,
    category: "Gestión de Negocios y Operaciones",
    shortDescription: "Acepta pagos en tu sitio web o aplicación con tarjetas, Yappy, Nequi y más.",
    fullDescription: "Integramos las principales pasarelas de pago locales (Banco General, Banistmo) e internacionales (Stripe, PayPal) en tu plataforma. Nos encargamos de todo el proceso técnico para que puedas recibir pagos de forma segura y confiable.",
    packages: [
      {
        name: "Paquete de Pagos",
        price: 490,
        description: "Habilita pagos con tarjeta de crédito, Yappy y otros métodos en tu plataforma.",
        features: ["Integración de 1 a 2 pasarelas de pago", "Procesamiento seguro de transacciones", "Manejo de pagos únicos y suscripciones", "Confirmaciones de pago automáticas", "Panel para ver historial de transacciones"],
        cta: "Aceptar Pagos Online",
        time: "2–4 semanas"
      }
    ],
    addOns: [],
    tags: ["E-commerce", "SaaS", "Servicios"],
    published: true,
  },
  {
    title: "Dashboards de Análisis de Datos",
    slug: "dashboards-analisis-datos",
    icon: <LineChart />,
    category: "Gestión de Negocios y Operaciones",
    shortDescription: "Toma decisiones inteligentes visualizando los datos más importantes de tu negocio en un solo lugar.",
    fullDescription: "Transformamos tus hojas de cálculo y reportes dispersos en un dashboard interactivo y en tiempo real. Conectamos tus fuentes de datos (ventas, marketing, operaciones) para darte una visión 360° de la salud y el rendimiento de tu empresa.",
    packages: [
      {
        name: "Paquete de Dashboard",
        price: 735,
        originalPrice: 1050,
        description: "Un panel de control para monitorear tus indicadores clave de rendimiento (KPIs).",
        features: ["Conexión a tus fuentes de datos (Excel, base de datos, etc.)", "Visualización de hasta 10 KPIs", "Gráficas interactivas y filtros dinámicos", "Acceso seguro desde cualquier dispositivo", "Actualización automática de datos"],
        cta: "Visualizar mis Datos",
        time: "3–6 semanas"
      }
    ],
    addOns: [],
    tags: ["BI", "Analytics", "Gerencia"],
    published: true,
  },
  {
    title: "Sistemas de Gestión para PYMES",
    slug: "sistemas-gestion-pymes",
    icon: <Users />,
    category: "Gestión de Negocios y Operaciones",
    shortDescription: "Una solución todo-en-uno para administrar clientes (CRM), proyectos y operaciones.",
    fullDescription: "Desarrollamos un sistema de gestión (tipo ERP/CRM simplificado) a la medida de tu PYME. Centraliza la información de tus clientes, da seguimiento a proyectos, gestiona tareas y obtén una visión completa de tus operaciones en una sola plataforma.",
    packages: [
      {
        name: "Paquete de Gestión PYME",
        price: 1470,
        originalPrice: 2100,
        description: "Un sistema centralizado para organizar y hacer crecer tu negocio.",
        features: ["Módulo de Gestión de Clientes (CRM)", "Módulo de Gestión de Proyectos y Tareas", "Base de datos centralizada", "Roles y permisos para tu equipo", "Reportes operativos básicos"],
        cta: "Organizar mi Negocio",
        time: "5–10 semanas"
      }
    ],
    addOns: [],
    tags: ["PYMEs", "CRM", "ERP", "Operaciones"],
    published: true,
  },

  // === CATEGORÍA: AUTOMATIZACIÓN E INTELIGENCIA ARTIFICIAL ===
  {
    title: "Automatización de Procesos (RPA)",
    slug: "automatizacion-procesos-rpa",
    icon: <Repeat />,
    category: "Automatización e Inteligencia Artificial",
    shortDescription: "Libera a tu equipo de tareas repetitivas y manuales para que puedan enfocarse en lo que realmente importa.",
    fullDescription: "Identificamos y automatizamos procesos administrativos que consumen tiempo, como la entrada de datos, la generación de reportes o la comunicación entre sistemas. Usamos herramientas de software (RPA) para que los robots hagan el trabajo repetitivo por ti.",
    packages: [
      {
        name: "Paquete de Automatización",
        price: 490,
        description: "Automatiza una tarea manual para aumentar la eficiencia de tu equipo.",
        features: ["Análisis del proceso a automatizar", "Desarrollo del 'robot' de software", "Integración con tus aplicaciones actuales (Excel, email, etc.)", "Ejecución programada y monitoreo", "Reducción de errores humanos a cero"],
        cta: "Automatizar mi Empresa",
        time: "2–6 semanas"
      }
    ],
    addOns: [],
    tags: ["Eficiencia", "RPA", "Operaciones"],
    published: true,
  },
  {
    title: "Chatbots con Inteligencia Artificial",
    slug: "chatbots-ia",
    icon: <Bot />,
    category: "Automatización e Inteligencia Artificial",
    shortDescription: "Ofrece atención al cliente 24/7 en tu sitio web o WhatsApp y resuelve consultas al instante.",
    fullDescription: "Implementamos un chatbot inteligente que puede responder preguntas frecuentes, calificar clientes potenciales, agendar citas e incluso integrarse con tus sistemas internos. Reduce la carga de tu equipo de soporte y mejora la satisfacción de tus clientes.",
    packages: [
      {
        name: "Paquete Chatbot IA",
        price: 490,
        description: "Un asistente virtual para atender a tus clientes de forma automática.",
        features: ["Entrenamiento con la información de tu negocio", "Implementación en tu sitio web o WhatsApp", "Capacidad para responder preguntas frecuentes", "Escalamiento a un agente humano si es necesario", "Panel para revisar conversaciones"],
        cta: "Implementar mi Chatbot",
        time: "2–4 semanas"
      }
    ],
    addOns: [],
    tags: ["IA", "Atención al Cliente", "Ventas"],
    published: true,
  },
  {
    title: "Sistemas de Recomendación",
    slug: "sistemas-recomendacion",
    icon: <BrainCircuit />,
    category: "Automatización e Inteligencia Artificial",
    shortDescription: "Aumenta tus ventas mostrando a cada cliente los productos o servicios que tienen más probabilidad de comprar.",
    fullDescription: "Para negocios con catálogos amplios (e-commerce, servicios), implementamos un motor de recomendación (similar al de Netflix o Amazon). Analizamos el comportamiento de tus usuarios para ofrecer sugerencias personalizadas que incrementan el valor del carrito y la retención.",
    packages: [
       {
        name: "Paquete de Recomendación",
        price: 735,
        originalPrice: 1050,
        description: "Personaliza la experiencia de compra de tus clientes.",
        features: ["Análisis del historial de compras y navegación", "Implementación de algoritmos de recomendación (ej. 'clientes que compraron esto también compraron...')", "Integración en tu e-commerce o plataforma", "Pruebas A/B para medir impacto en ventas", "Dashboard de rendimiento"],
        cta: "Aumentar mis Ventas",
        time: "3–6 semanas"
      }
    ],
    addOns: [],
    tags: ["IA", "E-commerce", "Ventas"],
    published: true,
  },
   {
    title: "Análisis de Datos con IA",
    slug: "analisis-datos-ia",
    icon: <Gauge />,
    category: "Automatización e Inteligencia Artificial",
    shortDescription: "Descubre patrones y tendencias ocultas en los datos de tu negocio para tomar decisiones estratégicas.",
    fullDescription: "Utilizamos algoritmos de Machine Learning para analizar tus datos históricos (ventas, clientes, operaciones) y generar insights valiosos. Podemos predecir la demanda, segmentar a tus clientes de forma avanzada o identificar las causas de la pérdida de clientes (churn).",
    packages: [
      {
        name: "Paquete de Análisis IA",
        price: 1225,
        originalPrice: 1750,
        description: "Extrae inteligencia de tus datos para guiar tu estrategia de negocio.",
        features: ["Definición del problema de negocio a resolver", "Recolección y limpieza de datos", "Entrenamiento de un modelo de Machine Learning", "Presentación de resultados y insights clave", "Implementación de un dashboard con los hallazgos"],
        cta: "Analizar mis Datos",
        time: "4–8 semanas"
      }
    ],
    addOns: [],
    tags: ["IA", "Machine Learning", "Estrategia"],
    published: true,
  },

  // === CATEGORía: INFRAESTRUCTURA Y MANTENIMIENTO ===
  {
    title: "Mantenimiento de Software",
    slug: "mantenimiento-software",
    icon: <MonitorCog />,
    category: "Infraestructura y Mantenimiento",
    shortDescription: "Asegura que tu aplicación funcione de manera óptima, segura y sin interrupciones.",
    fullDescription: "Ofrecemos planes de mantenimiento mensual para que puedas enfocarte en tu negocio con tranquilidad. Nos encargamos de las actualizaciones, monitoreo de seguridad, backups y solución de errores, garantizando la salud a largo plazo de tu sistema.",
    packages: [
      {
        name: "Plan de Mantenimiento Mensual",
        price: 98,
        originalPrice: 140,
        priceSuffix: "/mes",
        description: "Un plan para mantener tu software seguro y funcionando.",
        features: ["Monitoreo de rendimiento y disponibilidad 24/7", "Backups automáticos", "Actualizaciones de seguridad críticas", "Soporte técnico por email", "Reporte mensual de estado"],
        cta: "Asegurar mi Sistema",
        time: "Suscripción mensual"
      }
    ],
    addOns: [],
    tags: ["Soporte", "Seguridad", "DevOps"],
    published: true,
  },
   {
    title: "Migración a la Nube",
    slug: "migracion-nube",
    icon: <Cloud />,
    category: "Infraestructura y Mantenimiento",
    shortDescription: "Mueve tus sistemas a la nube (Google Cloud, AWS) para mejorar la escalabilidad, seguridad y reducir costos.",
    fullDescription: "Diseñamos y ejecutamos un plan de migración para mover tus aplicaciones y bases de datos desde servidores locales a una infraestructura en la nube. Esto te permite pagar solo por lo que usas, escalar automáticamente y acceder a servicios de clase mundial.",
    packages: [
      {
        name: "Paquete de Migración a la Nube",
        price: 980,
        originalPrice: 1400,
        description: "Moderniza tu infraestructura y prepárala para el futuro.",
        features: ["Análisis de la infraestructura actual", "Diseño de la arquitectura en la nube", "Plan y ejecución de la migración", "Configuración de seguridad y redes", "Optimización de costos en la nube (FinOps)"],
        cta: "Migrar a la Nube",
        time: "4–10 semanas"
      }
    ],
    addOns: [],
    tags: ["Cloud", "AWS", "Google Cloud", "DevOps"],
    published: true,
  },
  {
    title: "Consultoría en Arquitectura de Software",
    slug: "consultoria-arquitectura-software",
    icon: <Puzzle />,
    category: "Infraestructura y Mantenimiento",
    shortDescription: "Asesoría experta para asegurar que tu proyecto de software se construya sobre bases sólidas y escalables.",
    fullDescription: "Si tienes una idea o un proyecto en marcha, te ayudamos a tomar las decisiones técnicas correctas. Realizamos auditorías de código, diseñamos la arquitectura tecnológica y definimos el roadmap técnico para evitar errores costosos a futuro.",
    packages: [
      {
        name: "Paquete de Consultoría",
        price: 392,
        originalPrice: 560,
        description: "Guía técnica para asegurar el éxito de tu proyecto.",
        features: ["Sesiones de trabajo para definir requerimientos", "Diseño de la arquitectura del sistema", "Recomendación de stack tecnológico", "Plan de desarrollo y fases (roadmap)", "Documento de arquitectura"],
        cta: "Agendar Consultoría",
        time: "1–3 semanas"
      }
    ],
    addOns: [],
    tags: ["Estrategia", "Arquitectura", "CTO"],
    published: true,
  },
   {
    title: "Integración de Sistemas y APIs",
    slug: "integracion-sistemas-apis",
    icon: <GitMerge />,
    category: "Infraestructura y Mantenimiento",
    shortDescription: "Conecta tus diferentes herramientas de software para que trabajen juntas y compartan información.",
    fullDescription: "Hacemos que tus sistemas (CRM, ERP, software de marketing, etc.) se comuniquen entre sí. Desarrollamos conectores (APIs) que permiten un flujo de datos automático, eliminando la necesidad de entrada manual de datos y sincronizando tu operación.",
    packages: [
      {
        name: "Paquete de Integración",
        price: 490,
        originalPrice: 700,
        description: "Conecta dos o más sistemas para automatizar el flujo de datos.",
        features: ["Análisis de los sistemas a integrar", "Desarrollo de la API o conector", "Mapeo y transformación de datos", "Monitoreo del flujo de información", "Manejo de errores y reintentos"],
        cta: "Conectar mis Sistemas",
        time: "2–6 semanas"
      }
    ],
    addOns: [],
    tags: ["API", "Automatización", "Eficiencia"],
    published: true,
  },
  {
    title: "Ciberseguridad y Protección de Datos",
    slug: "ciberseguridad-proteccion-datos",
    icon: <Shield />,
    category: "Infraestructura y Mantenimiento",
    shortDescription: "Protege la información de tu empresa y de tus clientes contra ataques y fugas de datos.",
    fullDescription: "Realizamos un análisis de seguridad de tus aplicaciones e infraestructura para identificar y corregir vulnerabilidades. Implementamos las mejores prácticas para proteger tus sistemas (hardening) y te preparamos para cumplir con las normativas de protección de datos.",
    packages: [
      {
        name: "Paquete de Ciberseguridad",
        price: 735,
        description: "Auditoría y fortalecimiento de la seguridad de tus sistemas.",
        features: ["Análisis de vulnerabilidades (auditoría)", "Pruebas de penetración básicas (pentesting)", "Implementación de parches de seguridad", "Configuración de firewalls y monitoreo", "Reporte de hallazgos y recomendaciones"],
        cta: "Proteger mi Negocio",
        time: "3–8 semanas"
      }
    ],
    addOns: [],
    tags: ["Seguridad", "Cybersecurity", "Compliance"],
    published: true,
  },
];

    
