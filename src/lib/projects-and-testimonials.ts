


export type Project = {
  title: string;
  id: string;
  label: string;
  description: string;
  technologies: string[];
  techHighlights: {
    title: string;
    description: string;
  }[];
  challenge?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
  status?: "production" | "open-source";
};

export type Metric = {
  value: string;
  label: string;
  description: string;
};

export const projectsData: Project[] = [
  {
    title: "Sago One",
    id: "sago-one-fintech-saas",
    label: "ERP SaaS Todo-en-Uno · POS & FinTech · Next.js 15",
    description: "Plataforma SaaS B2B multi-tenant para emisión de documentos fiscales electrónicos vía SOAP HKA/DGI (PAC-compliant). Cubre operadores de Zona Libre, logística portuaria (Puerto Cruceros Colón 2000) y financieras de crédito. Arquitectura PWA Offline-First que garantiza continuidad operativa incluso sin conexión a internet.",
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Neon", "Prisma ORM", "Go", "Rust", "Tailwind v4", "Vercel Edge", "Railway"],
    techHighlights: [
      {
        title: "Microservicio Go para CUFE/CAFE",
        description: "Generación offline de códigos fiscales con algoritmo Módulo 10 a ~15µs/op y seguimiento de contingencia de 72 horas."
      },
      {
        title: "POS Offline-First",
        description: "Impresión térmica vía Web Bluetooth (ESC/POS), escáner de códigos de barras en tiempo real con layout split-screen cámara/carrito."
      },
      {
        title: "Seguridad Multi-Tenant Bancaria",
        description: "Encriptación AES-256-CBC, Row Level Security (RLS) con Prisma Client Extensions. Más de 10 empresas activas en producción."
      }
    ],
    challenge: "Mantener la facturación operativa sin internet en mercados con conectividad variable. La solución combina Service Workers agresivos, sincronización en background y un microservicio Go que genera CUFE/CAFE offline con la lógica Módulo 10. Comerciantes en Zona Libre y zonas rurales facturan sin interrupciones aunque caiga la red.",
    liveUrl: "https://sagoone.com",
    githubUrl: "https://github.com/angelnereira/sago-factu-V0.2",
    status: "production",
  },
  {
    title: "Plenty Market",
    id: "plenty-market-ecommerce-pwa",
    label: "E-commerce Internacional · PWA · Logística Compleja",
    description: "Migración de infraestructura estática a plataforma e-commerce de alto rendimiento con Partner Program logístico, zonas libres de impuestos y sincronización de inventario en tiempo real. Cada segundo de latencia reducido representa un 7% más de conversión.",
    technologies: ["Next.js 14", "TypeScript", "Prisma ORM", "Neon PostgreSQL", "Zustand", "Cloudinary", "Vercel", "PWA"],
    techHighlights: [
      {
        title: "TTI bajo 3s",
        description: "Caché estratégico y optimización del bundle reducen el Time-To-Interactive a menos de 3 segundos, impactando directamente la tasa de conversión."
      },
      {
        title: "Optimización de Media",
        description: "Integración con Cloudinary para transformación on-the-fly (WebP/AVIF). 60% de reducción en la carga de imágenes."
      },
      {
        title: "Partner Program Activo",
        description: "Vendedores internacionales gestionan inventario con zonas de impuestos diferenciadas y sincronización de stock en tiempo real."
      }
    ],
    challenge: "Migrar un sitio estático a una plataforma e-commerce completa sin sacrificar UX. El Partner Program permite operar zonas libres de impuestos con reglas fiscales diferenciadas y sincroniza stock entre vendedores en tiempo real.",
    liveUrl: "https://plenty-market.vercel.app",
    githubUrl: "https://github.com/angelnereira/plenty-market",
    status: "production",
  },
  {
    title: "HKA-SDK",
    id: "hka-sdk-fiscal-gateway",
    label: "SDK Fiscal HKA/DGI · Go · Open Source",
    description: "SDK y gateway fiscal para HKA PAC que abstrae la complejidad del protocolo SOAP con validación estricta, enrutamiento dinámico de tipos de documento y soporte multi-tenant nativo. Lo extraje de Sago One para permitir que cualquier proyecto fiscal en Panamá se integre sin reimplementar el protocolo.",
    technologies: ["Go", "SOAP", "XML", "Multi-tenant", "DGI/HKA"],
    techHighlights: [
      {
        title: "Validación Estricta",
        description: "Esquemas tipados para cada tipo de documento DGI. Errores de payload se detectan antes de tocar la red."
      },
      {
        title: "Routing Dinámico",
        description: "Resolución de endpoints por tipo de documento sin hardcoding ni reflection. Configuración via interfaces."
      },
      {
        title: "Multi-Tenant Nativo",
        description: "Credenciales y configuración por tenant, sin estado global. Listo para SaaS desde el primer commit."
      }
    ],
    githubUrl: "https://github.com/angelnereira/HKA-SDK",
    status: "open-source",
  },
  {
    title: "Gravital-Shell",
    id: "gravital-shell-android-terminal",
    label: "Terminal Linux Profesional para Android · Kotlin · Open Source",
    description: "Terminal Linux profesional para Android — ejecuta entornos Alpine Linux aislados sin root, con soporte PTY real, sesiones múltiples, gestor de paquetes APK y exportación/importación de sesiones. Construido para desarrolladores que necesitan un entorno serio en el bolsillo.",
    technologies: ["Kotlin", "Android", "Alpine Linux", "PTY", "JNI"],
    techHighlights: [
      {
        title: "PTY Real Sin Root",
        description: "Implementación de pseudo-terminales reales en Android usando proot, sin requerir privilegios de root."
      },
      {
        title: "Sesiones Persistentes",
        description: "Exportar/importar el estado completo de una sesión. Sigue trabajando en otro dispositivo desde donde lo dejaste."
      },
      {
        title: "Gestor APK Integrado",
        description: "Instalación de paquetes Alpine directamente desde el terminal con interfaz nativa Android."
      }
    ],
    githubUrl: "https://github.com/angelnereira/Gravital-Shell",
    status: "open-source",
  },
  {
    title: "Gravital-Share",
    id: "gravital-share-android-vpn",
    label: "VPN Hotspot Forwarding · Rust · Open Source",
    description: "Resuelve un problema concreto de enrutamiento VPN en Android: garantiza que el tráfico de dispositivos conectados al hotspot del anfitrión atraviese el túnel VPN del mismo. Útil para teams remotos que comparten una red segura desde un único dispositivo.",
    technologies: ["Rust", "Android", "Networking", "VPN", "iptables"],
    techHighlights: [
      {
        title: "Forwarding Transparente",
        description: "Reglas iptables/nftables dinámicas que enrutan automáticamente el tráfico del hotspot a través del túnel VPN activo."
      },
      {
        title: "Sin Overhead",
        description: "Componente nativo Rust con uso de memoria mínimo. No interfiere con el tráfico del dispositivo anfitrión."
      },
      {
        title: "Seguro por Defecto",
        description: "Si la VPN cae, el forwarding se detiene. Cero filtración de tráfico sin protección."
      }
    ],
    githubUrl: "https://github.com/angelnereira/Gravital-Share",
    status: "open-source",
  },
  {
    title: "Gravital-Talk",
    id: "gravital-talk-audio-comm",
    label: "Librería de Comunicación / Audio · Rust · Open Source",
    description: "Biblioteca de comunicación y audio standalone con integración nativa de autenticación Gravital ID y persistencia en Gravital Cloud. Diseñada para ser embebida en aplicaciones que necesitan canales de voz seguros sin depender de SDKs propietarios.",
    technologies: ["Rust", "Audio", "DSP", "WebRTC", "Auth"],
    techHighlights: [
      {
        title: "Pipeline DSP Propio",
        description: "Filtros de audio de baja latencia construidos desde principios de Procesamiento Digital de Señales aplicados en mis años como audio engineer."
      },
      {
        title: "Auth Gravital ID",
        description: "Integración nativa con el sistema de identidad Gravital sin exponer credenciales en el cliente."
      },
      {
        title: "Persistencia Cloud",
        description: "Sesiones, grabaciones y metadatos sincronizados a Gravital Cloud con encriptación end-to-end."
      }
    ],
    githubUrl: "https://github.com/angelnereira/Gravital-Talk",
    status: "open-source",
  },
];

// Métricas cuantificables en lugar de testimonios genéricos
export const metricsData: Metric[] = [
  {
    value: "10,000+",
    label: "Facturas Procesadas",
    description: "Facturas electrónicas emitidas a través de Sago One con cumplimiento DGI."
  },
  {
    value: "99.9%",
    label: "Uptime Garantizado",
    description: "Disponibilidad de servicios en producción con arquitectura serverless."
  },
  {
    value: "< 200ms",
    label: "Tiempo de Respuesta",
    description: "Latencia promedio de API en operaciones críticas de facturación."
  },
  {
    value: "10+",
    label: "Empresas en Producción",
    description: "Clientes empresariales activos en Sago One incluyendo Zona Libre y logística portuaria."
  },
];

// Testimonial type mantenido por compatibilidad pero no usado en UI principal
export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  avatarId: string;
};

export const testimonialsData: Testimonial[] = [];
