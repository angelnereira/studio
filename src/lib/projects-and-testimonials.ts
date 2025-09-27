

export type Project = {
  title: string;
  id: string;
  description: string;
  technologies: string[];
  problem: string;
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type Testimonial = {
    name: string;
    title: string;
    quote: string;
    avatarId: string;
};

export const projectsData: Project[] = [
  {
    title: "App Web de Control de Acceso",
    id: "access-control",
    description: "Plataforma web desplegada en Vercel para la gestión de acceso de personal en tiempo real. Permite registrar entradas y salidas, generar reportes y administrar perfiles de empleados de forma segura.",
    technologies: ["Next.js", "TypeScript", "Firebase Auth", "Firestore", "Vercel"],
    problem: "Digitalizar y automatizar el control de asistencia de empleados, eliminando procesos manuales y mejorando la seguridad.",
    impact: "Reducción del tiempo administrativo en un 40% y generación de reportes de asistencia precisos al instante.",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Dashboard de Ventas en Tiempo Real",
    id: "sales-dashboard",
    description: "Dashboard interactivo que visualiza métricas de ventas en tiempo real, conectándose directamente a la base de datos de producción. Permite a los gerentes tomar decisiones basadas en datos actualizados al segundo.",
    technologies: ["Next.js", "Recharts", "PostgreSQL", "Node.js", "Vercel"],
    problem: "La gerencia carecía de visibilidad inmediata sobre el rendimiento de las ventas, basándose en reportes diarios o semanales.",
    impact: "Mejora en la capacidad de reacción a tendencias del mercado y optimización de estrategias de venta con un ciclo de feedback inmediato.",
    liveUrl: "#",
  },
  {
    title: "Gestión de Planilla con Cálculos en Tiempo Real",
    id: "payroll-management",
    description: "Aplicación web para la administración de planillas que realiza cálculos de salarios, deducciones e impuestos en tiempo real a medida que se ingresan los datos. Simplifica un proceso complejo y propenso a errores.",
    technologies: ["React", "Node.js", "TypeScript", "Docker", "Google Cloud"],
    problem: "El cálculo manual de la planilla era lento, ineficiente y generaba errores costosos para la empresa.",
    impact: "Automatización completa del cálculo de planillas, garantizando precisión y cumplimiento, y liberando horas de trabajo del personal de RRHH.",
    githubUrl: "#",
  },
   {
    title: "Pipeline de Despliegue Automatizado (CI/CD)",
    id: "ci-cd-pipeline",
    description: "Implementación de un pipeline de CI/CD para una aplicación de microservicios, automatizando las pruebas, construcción de imágenes Docker y despliegue en un clúster de Kubernetes.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Google Cloud Build"],
    problem: "Los despliegues manuales eran lentos, propensos a errores y requerían una ventana de mantenimiento significativa.",
    impact: "Reducción del tiempo de despliegue de horas a minutos. Aumento de la frecuencia de despliegues en un 500% con una tasa de error cercana a cero.",
    githubUrl: "#",
  },
  {
    title: "Chatbot de Servicio al Cliente con IA",
    id: "ai-chatbot",
    description: "Desarrollo de un chatbot inteligente para automatizar la atención al cliente. Integrado con una base de conocimientos y opcionalmente con WhatsApp para resolver preguntas frecuentes y escalar casos complejos a agentes humanos.",
    technologies: ["Genkit", "Dialogflow", "Node.js", "Firebase", "WhatsApp API"],
    problem: "El equipo de soporte estaba sobrecargado con consultas repetitivas, resultando en altos tiempos de espera para los clientes.",
    impact: "Automatización del 70% de las consultas de primer nivel, reduciendo el tiempo de respuesta promedio en un 90% y mejorando la satisfacción del cliente.",
    liveUrl: "#",
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
