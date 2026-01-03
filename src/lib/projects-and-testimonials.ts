

export type Project = {
  title: string;
  id: string;
  description: string;
  technologies: string[];
  problem: string;
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
};

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  avatarId: string;
};

export const projectsData: Project[] = [
  {
    title: "Sago One",
    id: "sago-factu",
    description: "Plataforma de facturación electrónica líder en Panamá. PWA Offline-first que permite emitir facturas en segundos desde cualquier dispositivo. Seguridad bancaria AES-256 integrando proveedores PAC y DGI.",
    technologies: ["Next.js 15", "TypeScript", "Prisma", "Neon DB", "PWA", "AES-256", "Vercel"],
    problem: "Comerciantes y PYMES enfrentaban procesos burocráticos lentos, sistemas de facturación costosos y dependencia de conexión a internet para cumplir con la DGI.",
    impact: "Digitalización masiva de facturación con experiencia PWA. Emisión sin conexión, sincronización automática y cumplimiento fiscal garantizado. Reducción de 90% en tiempos de gestión.",
    liveUrl: "https://sagoone.com",
    githubUrl: "https://github.com/angelnereira/sago-factu-V0.2",
  },
  {
    title: "UETA Travel Access",
    id: "ueta-travel",
    description: "Sistema empresarial integral para gestión de operaciones de viajes corporativos. Desplegado en Oracle Cloud Infrastructure con arquitectura escalable y segura. Incluye módulos de reservas, gestión de itinerarios, facturación y reportes analíticos en tiempo real.",
    technologies: ["Oracle Cloud", "Oracle Database", "Next.js", "TypeScript", "REST APIs", "OCI Functions"],
    problem: "La gestión manual de viajes corporativos generaba ineficiencias operativas, errores en reservas y falta de visibilidad sobre costos y análisis de viajes.",
    impact: "Digitalización completa de operaciones, reduciendo tiempo de procesamiento de reservas en 70%, mejorando la experiencia del cliente con portal self-service y proporcionando análisis de datos en tiempo real para decisiones estratégicas.",
  },
  {
    title: "Portal de Servicios GovTech",
    id: "govtech-portal",
    description: "Plataforma digital para institución gubernamental que permite a ciudadanos realizar trámites en línea, hacer seguimiento de solicitudes y recibir notificaciones. Incluye sistema de autenticación segura, gestión documental y pagos electrónicos.",
    technologies: ["Next.js", "PostgreSQL", "Node.js", "TypeScript", "OAuth 2.0", "Stripe", "Vercel"],
    problem: "Los ciudadanos debían hacer largas filas y múltiples visitas presenciales para completar trámites gubernamentales básicos, generando frustración y pérdida de productividad.",
    impact: "Digitalización de 15+ trámites gubernamentales, reduciendo tiempos de espera en 80%, mejorando la satisfacción ciudadana y liberando recursos de la institución para casos que realmente requieren atención presencial.",
  },
  {
    title: "Dashboard Ejecutivo FinTech",
    id: "fintech-dashboard",
    description: "Dashboard analítico en tiempo real para monitoreo de métricas financieras clave. Integra datos de múltiples fuentes (transacciones, cuentas, inversiones) y presenta KPIs visuales con alertas automáticas para detección de anomalías y oportunidades.",
    technologies: ["Next.js", "PostgreSQL", "Recharts", "TypeScript", "WebSockets", "Redis", "Docker"],
    problem: "Ejecutivos financieros carecían de visibilidad inmediata sobre el estado de las operaciones, dependiendo de reportes diarios o semanales que limitaban su capacidad de respuesta ante cambios del mercado.",
    impact: "Toma de decisiones basada en datos en tiempo real, reducción del ciclo de feedback de días a segundos, detección automática de anomalías y mejora en la capacidad de reacción ante oportunidades de mercado.",
  },
  {
    title: "Sistema de Control de Acceso Biométrico",
    id: "biometric-access",
    description: "Plataforma de gestión de acceso con reconocimiento biométrico (facial y huella digital) para edificios corporativos. Incluye registro de empleados, control de horarios, reportes de asistencia y integración con sistemas de planilla.",
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "FastAPI", "Docker", "Raspberry Pi"],
    problem: "El control de acceso tradicional con tarjetas era vulnerable a fraudes (préstamo de credenciales), generaba costos de reposición y carecía de trazabilidad confiable.",
    impact: "Eliminación del 100% de fraudes de asistencia, reducción de costos operativos en 60%, generación automática de reportes de asistencia para RRHH y mejora en la seguridad física de las instalaciones.",
  },
  {
    title: "API de Integración de Pagos Multicanal",
    id: "payments-api",
    description: "API RESTful que unifica múltiples métodos de pago (tarjetas, ACH, Yappy, criptomonedas) en una sola interfaz. Diseñada para alta disponibilidad con arquitectura de microservicios, incluye webhooks para notificaciones en tiempo real y dashboard de reconciliación.",
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Stripe", "AWS"],
    problem: "Integrar múltiples proveedores de pago requería desarrollar y mantener integraciones separadas para cada proveedor, aumentando la complejidad técnica y el tiempo de desarrollo.",
    impact: "Reducción del tiempo de integración de semanas a días, aumento de tasa de conversión en 25% al ofrecer más opciones de pago, y simplificación de la reconciliación contable con reportes unificados.",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    name: "Líder Técnico",
    title: "Global Tech Company",
    quote: "Ángel tiene una capacidad única para entender arquitecturas complejas y proponer soluciones eficientes. Su curiosidad y empuje son un gran activo para cualquier equipo.",
    avatarId: 'testimonial-1',
  },
  {
    name: "Gerente de Producto",
    title: "Startup Innovadora",
    quote: "La mentalidad de Ángel orientada al producto y su enfoque en las mejores prácticas de desarrollo fueron clave para entregar una solución robusta a tiempo. Su profesionalismo es excepcional.",
    avatarId: 'testimonial-2',
  },
];
