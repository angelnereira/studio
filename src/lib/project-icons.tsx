
import * as React from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

const AccessControlIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 4.5V3M19.5 19.5l-1.06-1.06M4.5 19.5l1.06-1.06M12 19.5V21M4.5 4.5l1.06 1.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const SalesDashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PayrollManagementIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 17h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const CiCdPipelineIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AiChatbotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7v.01M9 11h.01M15 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const projects = [
  {
    title: "App Web de Control de Acceso",
    id: "access-control",
    logo: AccessControlIcon,
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
    logo: SalesDashboardIcon,
    description: "Dashboard interactivo que visualiza métricas de ventas en tiempo real, conectándose directamente a la base de datos de producción. Permite a los gerentes tomar decisiones basadas en datos actualizados al segundo.",
    technologies: ["Next.js", "Recharts", "PostgreSQL", "Node.js", "Vercel"],
    problem: "La gerencia carecía de visibilidad inmediata sobre el rendimiento de las ventas, basándose en reportes diarios o semanales.",
    impact: "Mejora en la capacidad de reacción a tendencias del mercado y optimización de estrategias de venta con un ciclo de feedback inmediato.",
    liveUrl: "#",
  },
  {
    title: "Gestión de Planilla con Cálculos en Tiempo Real",
    id: "payroll-management",
    logo: PayrollManagementIcon,
    description: "Aplicación web para la administración de planillas que realiza cálculos de salarios, deducciones e impuestos en tiempo real a medida que se ingresan los datos. Simplifica un proceso complejo y propenso a errores.",
    technologies: ["React", "Node.js", "TypeScript", "Docker", "Google Cloud"],
    problem: "El cálculo manual de la planilla era lento, ineficiente y generaba errores costosos para la empresa.",
    impact: "Automatización completa del cálculo de planillas, garantizando precisión y cumplimiento, y liberando horas de trabajo del personal de RRHH.",
    githubUrl: "#",
  },
   {
    title: "Pipeline de Despliegue Automatizado (CI/CD)",
    id: "ci-cd-pipeline",
    logo: CiCdPipelineIcon,
    description: "Implementación de un pipeline de CI/CD para una aplicación de microservicios, automatizando las pruebas, construcción de imágenes Docker y despliegue en un clúster de Kubernetes.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Google Cloud Build"],
    problem: "Los despliegues manuales eran lentos, propensos a errores y requerían una ventana de mantenimiento significativa.",
    impact: "Reducción del tiempo de despliegue de horas a minutos. Aumento de la frecuencia de despliegues en un 500% con una tasa de error cercana a cero.",
    githubUrl: "#",
  },
  {
    title: "Chatbot de Servicio al Cliente con IA",
    id: "ai-chatbot",
    logo: AiChatbotIcon,
    description: "Desarrollo de un chatbot inteligente para automatizar la atención al cliente. Integrado con una base de conocimientos y opcionalmente con WhatsApp para resolver preguntas frecuentes y escalar casos complejos a agentes humanos.",
    technologies: ["Genkit", "Dialogflow", "Node.js", "Firebase", "WhatsApp API"],
    problem: "El equipo de soporte estaba sobrecargado con consultas repetitivas, resultando en altos tiempos de espera para los clientes.",
    impact: "Automatización del 70% de las consultas de primer nivel, reduciendo el tiempo de respuesta promedio en un 90% y mejorando la satisfacción del cliente.",
    liveUrl: "#",
  },
];

export const testimonials = [
  {
    name: "Líder Técnico",
    title: "Global Tech Company",
    quote: "Ángel tiene una capacidad única para entender arquitecturas complejas y proponer soluciones eficientes. Su curiosidad y empuje son un gran activo para cualquier equipo.",
    avatar: testimonialImages.test1,
  },
  {
    name: "Gerente de Producto",
    title: "Startup Innovadora",
    quote: "La mentalidad de Ángel orientada al producto y su enfoque en las mejores prácticas de desarrollo fueron clave para entregar una solución robusta a tiempo. Su profesionalismo es excepcional.",
    avatar: testimonialImages.test2,
  },
];
