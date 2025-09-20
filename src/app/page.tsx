import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, Code, GitBranch, Github, Linkedin, Server, Terminal, Twitter, BrainCircuit, BotMessageSquare, Languages, Mic, Music, FunctionSquare, Gitlab, Download } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');
const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

const skills = [
  { name: "Python", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Python</title><path d="M12.083 1.025c-3.12.02-5.63 2.115-5.63 5.42h2.804c0-1.83 1.29-2.804 2.826-2.804s2.826.973 2.826 2.803c0 1.54-1.033 2.502-2.503 3.253-2.24 1.12-4.45 2.22-4.45 5.51h2.783c0-2.31 1.22-3.13 2.8-3.95 1.77-.9 3.5-1.8 3.5-4.52C17.06 3.145 15.223 1.005 12.083 1.025Zm-1.88 15.657c-1.31 0-2.04.75-2.04 1.74 0 .99.73 1.74 2.04 1.74s2.04-.75 2.04-1.74c0-.99-.73-1.74-2.04-1.74Z" fill="#3776AB"/><path d="M11.917 21.975c3.12-.02 5.63-2.115 5.63-5.42h-2.804c0 1.83-1.29 2.804-2.826 2.804s-2.826-.973-2.826-2.803c0-1.54 1.033-2.502 2.503-3.253 2.24-1.12 4.45-2.22 4.45-5.51h-2.783c0-2.31-1.22-3.13-2.8-3.95-1.77-.9-3.5-1.8-3.5-4.52C6.94 3.145 4.78 1.005 1.64 1.025c-3.12.02-5.63 2.115-5.63 5.42h2.804c0-1.83 1.29-2.804 2.826-2.804s2.826.973 2.826 2.803c0 1.54-1.033 2.502-2.503 3.253-2.24 1.12-4.45 2.22-4.45 5.51h2.783c0-2.31-1.22-3.13-2.8-3.95-1.77-.9-3.5-1.8-3.5-4.52C6.94 20.855 9.1 22.995 12.24 22.975c3.12-.02 5.63-2.115 5.63-5.42h-2.804c0 1.83-1.29 2.804-2.826 2.804s-2.826-.973-2.826-2.803c0-1.54 1.033-2.502 2.503-3.253 2.24-1.12 4.45-2.22 4.45-5.51h-2.783c0-2.31-1.22-3.13-2.8-3.95-1.77-.9-3.5-1.8-3.5-4.52C17.06 3.145 19.22 1.005 22.36 1.025c3.12.02 5.63 2.115 5.63 5.42h-2.804c0-1.83-1.29-2.804-2.826-2.804s-2.826.973-2.826-2.803c0-1.54 1.033-2.502 2.503-3.253 2.24-1.12 4.45-2.22 4.45-5.51h2.783c0 2.31 1.22 3.13 2.8 3.95 1.77.9 3.5 1.8 3.5 4.52C27.06 20.855 24.9 22.995 21.76 22.975c3.12.02 5.63-2.115 5.63-5.42h-2.804c0 1.83-1.29 2.804 2.826 2.804s2.826.973 2.826 2.803c0 1.54-1.033 2.502-2.503 3.253-2.24 1.12-4.45 2.22-4.45 5.51h-2.783c0 2.31 1.22 3.13 2.8 3.95 1.77.9 3.5 1.8 3.5 4.52Zm1.88-15.657c1.31 0 2.04.75 2.04 1.74 0 .99-.73 1.74-2.04 1.74s-2.04-.75-2.04-1.74c0-.99.73-1.74 2.04-1.74Z" fill="#FFD43B"/></svg> },
  { name: "TypeScript", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TypeScript</title><path d="M1.5 0 h 21 v 21 h -21 z" fill="#007acc" /><path d="M1.5,21V0h21V21h-2.25V2.25H3.75V21H1.5Z" fill="#007acc" /><path d="M8.2,16.5h2.1V9.3h3.2V7.2H8.2v9.3Z M16.3,9.3c-1.3,0-2.3.4-3.1,1.2s-1.2,1.8-1.2,3c0,1.2.4,2.2,1.2,3s1.8,1.2,3.1,1.2c1.3,0,2.3-.4,3.1-1.2s1.2-1.8,1.2-3c0-1.2-.4-2.2-1.2-3S17.6,9.3,16.3,9.3Zm0,8.3c-1,0-1.8-.3-2.4-1s-.9-1.5-.9-2.5c0-1,.3-1.8,1-2.5s1.4-1,2.3-1c1,0,1.8.3,2.4,1s.9,1.5.9,2.5c0,1-.3,1.8-.9,2.5s-1.4,1-2.4,1Z" fill="#fff" /></svg> },
  { name: "Next.js", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-nextjs"><path d="M9 15V9l7.7 10.6A9 9 0 1 1 8.3 4.2"/></svg> },
  { name: "Node.js", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Node.js</title><path d="M11.39 0H2.61L0 2.61v18.78L2.61 24h18.78L24 21.39V8.61L21.39 6H12.61zm.24 1.36h8.04l2 2V20l-1.36 1.36H3.36L2 21.35V3.36l1.36-1.36h8.27zM12 4.17a7.83 7.83 0 1 0 0 15.66 7.83 7.83 0 0 0 0-15.66zm0 1.44a6.39 6.39 0 1 1 0 12.78 6.39 6.39 0 0 1 0-12.78z" fill="#339933"/></svg> },
  { name: "Google Cloud", icon: <Cloud /> },
  { name: "Firebase", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-firebase"><path d="M4.62 16.22c-.12.48-.12.96.02 1.42.23.73.66 1.35 1.28 1.83.6.46 1.3.74 2.06.82a5.57 5.57 0 0 0 2.22-.44l.2-.08.14-.06.13-.05c.4-.2.8-.43 1.15-.71l.1-.08c.17-.15.33-.3.48-.47L19.5 8.5 14.5 3.5 4.62 16.22Z"/><path d="m19.5 8.5-1-1-3-3-1.42-1.42c-.2-.2-.45-.36-.72-.48a4.99 4.99 0 0 0-2.2-0l-.16.03-.18.04-.18.05s-.1.03-.14.05L3.5 8.5l6 12 5-5-1.5-1.5-3.5 3.5-3-3L12.5 10l7-1.5Z"/></svg> },
  { name: "Docker", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-docker"><path d="M22 12.5c0-2.2-2-3.5-4-3.5-1.2 0-2.7.9-3.5 2.1-.8-1.2-2.3-2.1-3.5-2.1-2 0-4 1.3-4 3.5 0 .9.3 2.1 1.2 3.1-1.1.4-2.2 1.5-2.2 3.4 0 2.2 2 4 4 4h8c2 0 4-1.8 4-4 0-1.9-1.1-3-2.2-3.4.9-1 1.2-2.2 1.2-3.1Z" /><path d="M5 12.5H3" /><path d="M6 15.5H3" /><path d="M6 9.5H3" /><path d="M8 6.5H6" /><path d="M9 3.5H7" /></svg> },
  { name: "Git", icon: <GitBranch /> },
  { name: "GitHub/GitLab", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitLab</title><path d="m23.999 9.695-1.366-4.213A.838.838 0 0 0 21.82 4.87L18.18 2.05a.84.84 0 0 0-.965-.004l-2.03 1.559-2.73-8.41a.42.42 0 0 0-.792 0L8.934 3.606 6.903 2.046a.84.84 0 0 0-.964.004L2.298 4.87a.838.838 0 0 0-.813.612L.092 9.695a.42.42 0 0 0 .15.427l11.413 8.784a.42.42 0 0 0 .504 0l11.69-8.784a.42.42 0 0 0 .15-.427" fill="#FC6D26"/></svg> },
  { name: "CI/CD", icon: <Terminal /> },
  { name: "Linux", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linux"><path d="M13.8 17.5c-1.2 1.2-3 2-4.8 2s-3.6-.8-4.8-2c-1.2-1.2-2-3-2-4.8s.8-3.6 2-4.8c1.2-1.2 3-2 4.8-2l7.1 7.1c.3-.2.5-.3.7-.5 1.2-1.2 2-3 2-4.8s-.8-3.6-2-4.8c-1.2-1.2-3-2-4.8-2s-3.6.8-4.8 2-2 3-2 4.8c0 1.3.4 2.6 1 3.8"/><path d="M12.5 12.5a3.5 3.5 0 1 0-5 0 3.5 3.5 0 0 0 5 0Z"/><path d="M18.8 15.2c1.2 1.2 2 3 2 4.8s-.8 3.6-2 4.8-3 2-4.8 2-3.6-.8-4.8-2c-.3-.3-.6-.6-.8-1"/></svg> },
  { name: "Vercel", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Vercel</title><path d="M24 22.525H0l12-21.05z" fill="#000000"/></svg> },
  { name: "Kubernetes", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Kubernetes</title><path d="M12 .012a11.89 11.89 0 0 0-1.897.192l-8.465 2.82A1.986 1.986 0 0 0 .193 4.904L2.83 12 .192 19.096a1.986 1.986 0 0 0 1.445 1.88l8.465 2.82A11.89 11.89 0 0 0 12 23.988a11.89 11.89 0 0 0 1.897-.192l8.465-2.82a1.986 1.986 0 0 0 1.445-1.88L21.17 12l2.639-7.096a1.986 1.986 0 0 0-1.445-1.88l-8.465-2.82A11.89 11.89 0 0 0 12 .012zm-.948 4.23L4.415 6.09l-1.58 4.225h5.42zm1.896 0v15.51a9.904 9.904 0 0 1 0-15.51zm.948-1.74l6.637-2.212 1.58 4.225h-5.42zM4.415 17.91l6.637 1.848v-7.39H2.835zm8.483 1.848l6.637-1.848 1.58-4.225h-5.42z" fill="#326CE5"/></svg> },
  { name: "OpenShift", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>OpenShift</title><path d="M12.022 2.001A9.993 9.993 0 002.022 12a9.993 9.993 0 0010.002 9.999A9.993 9.993 0 0022.021 12 9.993 9.993 0 0012.022 2.001zm0 2.856a7.137 7.137 0 017.137 7.142 7.137 7.137 0 01-7.137 7.142 7.137 7.137 0 01-7.14-7.142 7.137 7.137 0 017.14-7.142zm5.427 3.25L12.023 15.65 6.598 8.107l1.01-1.01 4.415 4.41 4.41-4.41z" fill="#EE0000"/></svg> },
  { name: "Tailwind CSS", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Tailwind CSS</title><path d="M12 18a6 6 0 01-6-6h12a6 6 0 01-6 6zm0-12a6 6 0 016 6H6a6 6 0 016-6z" fill="#38B2AC"/></svg> },
  { name: "PostgreSQL", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PostgreSQL</title><path d="M12 24c-1.844 0-3.52-.51-4.996-1.528l.001.002C5.51 21.49 4.312 20.1 3.52 18.5h9.96c.14 0 .27-.06.37-.16.1-.1.15-.23.15-.36v-6.96c0-.13-.05-.26-.15-.36-.1-.1-.23-.16-.37-.16H3.52c-.14 0-.27.06-.37.16-.1.1-.15.23-.15.36V18.5c0 1.25-.33 2.5-.97 3.5-.64 1-1.54 1.5-2.5 1.5H0v-1.48h-.002c1.474-3.53 4.33-6.52 7.52-6.52v-2.98c-1.474-3.53-4.33-6.52-7.52-6.52V4.48h.002C1.036.95 3.892-.04 7.082-.04V10c1.475 3.53 4.33 6.52 7.52 6.52v2.98c-1.474 3.53-4.33 6.52-7.52 6.52v1.98c3.192 0 6.05-.99 7.522-2.972l-.002.002C18.49 23.49 19.688 22.1 20.48 20.5H10.52c-.14 0-.27-.06-.37-.16-.1-.1-.15-.23-.15-.36v-6.96c0-.13.05-.26.15-.36.1.1.23.16.37.16h9.96c.14 0 .27.06.37.16.1.1.15.23.15.36V20.5c0 1.25.33 2.5.97 3.5.64 1 1.54 1.5 2.5 1.5H24V22.52h.002c-1.474-3.53-4.33-6.52-7.52-6.52v-2.98c1.474-3.53 4.33-6.52 7.52-6.52V8.52h-.002c-1.036 3.53-3.892 6.52-7.082 6.52V5c-1.475-3.53-4.33-6.52-7.52-6.52V3.02C8.108 3.02 10.156 2 12 2s3.892 1.02 5.373 3.02l.002-.002c1.492 1.98 2.625 4.32 2.625 7.48 0 3.16-1.133 5.5-2.625 7.48l-.002-.002C15.892 21.98 13.844 23 12 23v1z" fill="#336791"/></svg> }
];


const projects = [
  {
    title: "App Web de Control de Acceso",
    id: "access-control",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 4.5V3M19.5 19.5l-1.06-1.06M4.5 19.5l1.06-1.06M12 19.5V21M4.5 4.5l1.06 1.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
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
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Dashboard interactivo que visualiza métricas de ventas en tiempo real, conectándose directamente a la base de datos de producción. Permite a los gerentes tomar decisiones basadas en datos actualizados al segundo.",
    technologies: ["Next.js", "Recharts", "PostgreSQL", "Node.js", "Vercel"],
    problem: "La gerencia carecía de visibilidad inmediata sobre el rendimiento de las ventas, basándose en reportes diarios o semanales.",
    impact: "Mejora en la capacidad de reacción a tendencias del mercado y optimización de estrategias de venta con un ciclo de feedback inmediato.",
    liveUrl: "#",
  },
  {
    title: "Gestión de Planilla con Cálculos en Tiempo Real",
    id: "payroll-management",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
       <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 17h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    description: "Aplicación web para la administración de planillas que realiza cálculos de salarios, deducciones e impuestos en tiempo real a medida que se ingresan los datos. Simplifica un proceso complejo y propenso a errores.",
    technologies: ["React", "Node.js", "TypeScript", "Docker", "Google Cloud"],
    problem: "El cálculo manual de la planilla era lento, ineficiente y generaba errores costosos para la empresa.",
    impact: "Automatización completa del cálculo de planillas, garantizando precisión y cumplimiento, y liberando horas de trabajo del personal de RRHH.",
    githubUrl: "#",
  },
   {
    title: "Pipeline de Despliegue Automatizado (CI/CD)",
    id: "ci-cd-pipeline",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
       <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Implementación de un pipeline de CI/CD para una aplicación de microservicios, automatizando las pruebas, construcción de imágenes Docker y despliegue en un clúster de Kubernetes.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Google Cloud Build"],
    problem: "Los despliegues manuales eran lentos, propensos a errores y requerían una ventana de mantenimiento significativa.",
    impact: "Reducción del tiempo de despliegue de horas a minutos. Aumento de la frecuencia de despliegues en un 500% con una tasa de error cercana a cero.",
    githubUrl: "#",
  },
  {
    title: "Chatbot de Servicio al Cliente con IA",
    id: "ai-chatbot",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7v.01M9 11h.01M15 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Desarrollo de un chatbot inteligente para automatizar la atención al cliente. Integrado con una base de conocimientos y opcionalmente con WhatsApp para resolver preguntas frecuentes y escalar casos complejos a agentes humanos.",
    technologies: ["Genkit", "Dialogflow", "Node.js", "Firebase", "WhatsApp API"],
    problem: "El equipo de soporte estaba sobrecargado con consultas repetitivas, resultando en altos tiempos de espera para los clientes.",
    impact: "Automatización del 70% de las consultas de primer nivel, reduciendo el tiempo de respuesta promedio en un 90% y mejorando la satisfacción del cliente.",
    liveUrl: "#",
  },
];

const testimonials = [
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-sm bg-transparent border-primary/50 text-primary">Software Engineer | Panamá 🇵🇦</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Ángel Nereira
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Construyendo soluciones escalables que transforman datos en impacto global.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">¿Hablamos?</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a href="/Angel_Nereira_CV.pdf" download>
                      <Download className="mr-2" />
                      Descargar CV
                    </a>
                  </Button>
                </div>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                  <Languages className="h-5 w-5" />
                  <span>Español (Nativo)</span>
                  <span>|</span>
                  <span>English (Advanced)</span>
                </div>
              </div>
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt="Ángel Nereira"
                  data-ai-hint="professional headshot"
                  width={400}
                  height={400}
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full lg:order-last border-4 border-secondary"
                />
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Sobre Mí</h2>
                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Soy un ingeniero de software panameño con una visión clara: impulsar la transformación tecnológica en Panamá y más allá, creando soluciones innovadoras, eficientes y de alto impacto.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl pt-8 text-lg text-center text-foreground/80 space-y-4">
                <p>
                    Mi trayectoria es una fusión poco común entre la ingeniería de sonido y la ingeniería de software. Esta dualidad me ha enseñado a abordar los problemas con la precisión técnica de un ingeniero y la creatividad de un artista. Mi filosofía es simple: "Solucionar problemas para disfrutar la vida". Aplico esta mentalidad para desarrollar software robusto, escalable y seguro que genera valor real.
                </p>
                <p>
                    Mi objetivo es ser un pionero en la innovación tecnológica de Panamá, con un enfoque en software, ciencia de datos e inteligencia artificial, siempre con una proyección global. Apuesto por la inclusión y el empoderamiento de las personas a través de la tecnología.
                </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Stack Tecnológico</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un conjunto de herramientas versátil para resolver problemas reales, desde el desarrollo web hasta la infraestructura en la nube.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <TooltipProvider>
              {skills.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div className="group relative flex flex-col items-center justify-center space-y-2 rounded-lg bg-secondary/70 p-6 shadow-sm transition-all duration-300 ease-geist backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                      <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                      <span className="font-medium text-center text-foreground">{skill.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-center bg-secondary border-primary/30 text-foreground">
                    <p className="font-bold mb-2">{skill.name}</p>
                    <p>{skill.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Proyectos Destacados</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Una selección de proyectos que demuestran mi enfoque en la resolución de problemas y la aplicación de tecnología.
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 py-12">
              {projects.map((project) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <Card className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl cursor-pointer">
                        <CardHeader className="flex-row items-center gap-4">
                          {project.logo && (
                            <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                               <project.logo className="w-6 h-6" />
                            </div>
                          )}
                          <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto">
                           <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                              ))}
                              {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
                          </div>
                        </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                         {project.logo && (
                            <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                               <project.logo className="w-8 h-8" />
                            </div>
                          )}
                          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                      </div>
                      <DialogDescription>{project.description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Problema Resuelto</h4>
                          <p className="text-sm text-muted-foreground">{project.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Impacto Generado</h4>
                          <p className="text-sm text-muted-foreground">{project.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Tecnologías Utilizadas</h4>
                           <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                              ))}
                          </div>
                        </div>
                    </div>
                     <div className="flex justify-end gap-2 mt-4">
                        {project.githubUrl && <Button variant="ghost" size="sm" asChild><Link href={project.githubUrl}><Github className="mr-2 h-4 w-4" /> Código Fuente</Link></Button>}
                        {project.liveUrl && <Button asChild size="sm"><Link href={project.liveUrl}>Ver Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <Avatar>
                        <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                ¿Buscas un desarrollador panameño para tu equipo global?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Colaboremos en soluciones que escalen globalmente. Estoy disponible para nuevos desafíos y oportunidades.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">Conversemos sobre tu proyecto</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
