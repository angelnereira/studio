"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, Code, GitBranch, Github, Linkedin, Server, Terminal, Twitter, BrainCircuit, BotMessageSquare, Languages, Mic, Music, FunctionSquare, Gitlab, Download, Code2, Clipboard, ClipboardCheck, FileText } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SpotlightCard } from "@/components/spotlight-card";
import { ServicesCarousel } from "@/components/services-carousel";
import { generateCv, GenerateCvInput } from "@/ai/flows/generate-cv";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

// Nombre: python
// Descripción: Icono estilizado de Python.
const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11.5 8.5v-5" /><path d="M11.5 15.5v5" /><path d="M8.5 11.5h-5" /><path d="M15.5 11.5h5" /><path d="M15 15a4 4 0 0 1-4 4H8.5" /><path d="M9 9a4 4 0 0 1 4-4h2.5" /><circle cx="8" cy="8" r="2" /><circle cx="16" cy="16" r="2" />
    </svg>
);

// Nombre: typescript
// Descripción: Icono estilizado de TypeScript.
const TypescriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4h16v16H4z" /><path d="M12 17V7" /><path d="M9 10h6" /><path d="M15.5 10a2.5 2.5 0 0 1 0 5h-3" />
    </svg>
);

// Nombre: nextjs
// Descripción: Icono estilizado de Next.js.
const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 15V9l7.7 10.4A5 5 0 1 0 9 15z" /><path d="M15 12V9" />
    </svg>
);

// Nombre: nodejs
// Descripción: Icono estilizado de Node.js.
const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.34 15.66a4.5 4.5 0 0 1-8.68 0" /><path d="M18.14 8.34a4.5 4.5 0 0 1-8.68 0" /><path d="M12.48 2.5a4.5 4.5 0 0 1-5.32 7.9" /><path d="M11.52 21.5a4.5 4.5 0 0 1 5.32-7.9" /><path d="M5.86 8.34a4.5 4.5 0 0 1 8.68 0" /><path d="M3.66 15.66a4.5 4.5 0 0 1 8.68 0" />
    </svg>
);

// Nombre: google-cloud
// Descripción: Icono estilizado de Google Cloud.
const GoogleCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
);

// Nombre: firebase
// Descripción: Icono estilizado de Firebase.
const FirebaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m18.7 6.1-6-4.2a.5.5 0 0 0-.5 0l-6 4.2a.5.5 0 0 0-.2.4v11a.5.5 0 0 0 .7.4l6-4.2a.5.5 0 0 1 .5 0l6 4.2a.5.5 0 0 0 .7-.4v-11a.5.5 0 0 0-.2-.4Z" /><path d="M6.2 17.6 12 14" /><path d="M6.2 6.1 12 10" />
    </svg>
);

// Nombre: docker
// Descripción: Icono estilizado de Docker.
const DockerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21.3 12.77c.36-.6.36-1.94 0-2.54l-2-3.46a2 2 0 0 0-1.73-1H6.4a2 2 0 0 0-1.73 1l-2 3.46c-.36.6-.36 1.94 0 2.54l2 3.46a2 2 0 0 0 1.73 1h10.86a2 2 0 0 0 1.73-1Z" /><path d="M8 12h8" /><path d="M8 9h2" /><path d="M14 9h2" /><path d="M8 15h2" />
    </svg>
);

// Nombre: git
// Descripción: Icono estilizado de Git.
const GitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M18 6L6 18" /><path d="M6 9v6" />
    </svg>
);

// Nombre: github
// Descripción: Icono estilizado de GitHub.
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

// Nombre: ci-cd
// Descripción: Icono estilizado de CI/CD.
const CiCdIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" /><path d="m12 6-3.5 3.5" /><path d="M12 6h3.5" /><path d="M12 6v3.5" /><path d="m12 18 3.5-3.5" /><path d="M12 18h-3.5" /><path d="M12 18v-3.5" />
    </svg>
);

// Nombre: linux
// Descripción: Icono estilizado de Linux (Tux).
const LinuxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M13.84 11.33c-.1-1.04.1-2.12.53-3.15.44-1.04.53-2.24.23-3.3l.2.3c.3 1.03.03 2.2-.5 3.2-.54 1-.84 2.1-.73 3.15" /><path d="M15.45 13.11c.88.94 1.45 2.1 1.45 3.39 0 2.7-2.2 4.9-5 4.9s-5-2.2-5-4.9c0-1.28.57-2.45 1.45-3.39" /><path d="M10.16 11.33c.1-1.04-.1-2.12-.53-3.15-.44-1.04-.53-2.24-.23-3.3l-.2.3c-.3 1.03-.03 2.2.5 3.2.54 1 .84 2.1.73 3.15" /><path d="M12 13.5a1.5 1.5 0 0 0-3 0" /><path d="M12.01 2.01a.01.01 0 1 0 0 .02" /><path d="M12.01 2.01a.01.01 0 1 0 0 .02" /><path d="M12 18.5c.33.33.67.5 1 .5s.67-.17 1-.5" />
    </svg>
);

// Nombre: vercel
// Descripción: Icono estilizado de Vercel.
const VercelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 2 12 12 22 22 12 12 2" />
    </svg>
);

// Nombre: kubernetes
// Descripción: Icono estilizado de Kubernetes.
const KubernetesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" /><path d="M12 3v2.5" /><path d="m18.36 5.64 1.77-1.77" /><path d="M21 12h-2.5" /><path d="m18.36 18.36-1.77-1.77" /><path d="M12 21v-2.5" /><path d="m5.64 18.36-1.77 1.77M3 12h2.5" /><path d="m5.64 5.64 1.77 1.77" /><path d="M12 8.5v7" /><path d="m15.5 12-7 3.5" /><path d="m8.5 12 7 3.5" />
    </svg>
);

// Nombre: openshift
// Descripción: Icono estilizado de OpenShift.
const OpenShiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.38 2.01 6.23 4.41a2 2 0 0 0-1.23 1.83v9.52a2 2 0 0 0 1.23 1.83l6.15 2.4a2 2 0 0 0 1.54 0l6.15-2.4a2 2 0 0 0 1.23-1.83V6.24a2 2 0 0 0-1.23-1.83l-6.15-2.4a2 2 0 0 0-1.54 0z" /><path d="m16.5 8-9 4.5" /><path d="m12 12.25 4.5 2.25" /><path d="M12 17v-4.75" />
    </svg>
);

// Nombre: tailwindcss
// Descripción: Icono estilizado de Tailwind CSS.
const TailwindCssIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z" /><path d="M10 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" /><path d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2" />
    </svg>
);

// Nombre: postgresql
// Descripción: Icono estilizado de PostgreSQL.
const PostgreSqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 14c-1.5 1.5-3.5 2.5-6 2.5v-5c2.5 0 4.5-1 6-2.5" /><path d="M6 16.5V21" /><path d="M6 3v5.5" /><path d="M15 5.5c-1.5-1.5-3.5-2.5-6-2.5v5c2.5 0 4.5 1 6 2.5" /><path d="M9 11.5v-5" /><path d="M9 21v-3.5" /><path d="M18 21v-5" /><path d="M18 3v5" />
    </svg>
);

const skills = [
  { name: "Python", icon: <PythonIcon />, description: "Mi lenguaje preferido para backend, ciencia de datos e IA por su versatilidad y ecosistema robusto." },
  { name: "TypeScript", icon: <TypescriptIcon />, description: "Esencial para construir aplicaciones front-end y back-end a gran escala, garantizando código mantenible y libre de errores." },
  { name: "Next.js", icon: <NextjsIcon />, description: "El framework de React para producción. Su rendimiento, SSR y ecosistema lo hacen mi elección para aplicaciones web modernas." },
  { name: "Node.js", icon: <NodejsIcon />, description: "Ideal para construir APIs rápidas y escalables, permitiéndome usar JavaScript/TypeScript en todo el stack." },
  { name: "Google Cloud", icon: <GoogleCloudIcon />, description: "Mi plataforma en la nube preferida para desplegar aplicaciones escalables, desde VMs hasta servicios serverless y de IA." },
  { name: "Firebase", icon: <FirebaseIcon />, description: "La solución BaaS para acelerar el desarrollo. La uso para autenticación, bases de datos en tiempo real y hosting." },
  { name: "Docker", icon: <DockerIcon />, description: "Fundamental en mi flujo de trabajo para crear entornos de desarrollo consistentes y desplegar aplicaciones en contenedores." },
  { name: "Git", icon: <GitIcon />, description: "El estándar para control de versiones. Indispensable para el trabajo en equipo, la integridad del código y las prácticas de CI/CD." },
  { name: "GitHub/GitLab", icon: <GithubIcon />, description: "Plataformas clave para alojar repositorios, colaborar y automatizar flujos de trabajo con Actions y Pipelines." },
  { name: "CI/CD", icon: <CiCdIcon />, description: "Mi filosofía para entregar valor de forma rápida y segura, automatizando pruebas y despliegues." },
  { name: "Linux", icon: <LinuxIcon />, description: "El sistema operativo de servidor por excelencia. Domino la línea de comandos para administrar sistemas y redes." },
  { name: "Vercel", icon: <VercelIcon />, description: "La mejor plataforma para desplegar aplicaciones front-end. Su integración con Next.js, rendimiento y DX son inigualables." },
  { name: "Kubernetes", icon: <KubernetesIcon />, description: "El estándar para la orquestación de contenedores. Lo uso para gestionar aplicaciones complejas y de alta disponibilidad." },
  { name: "OpenShift", icon: <OpenShiftIcon />, description: "Mi elección para entornos empresariales que requieren una plataforma de Kubernetes gestionada y con herramientas de desarrollo integradas." },
  { name: "Tailwind CSS", icon: <TailwindCssIcon />, description: "Un framework CSS utility-first que me permite construir diseños complejos y personalizados de forma rápida y mantenible." },
  { name: "PostgreSQL", icon: <PostgreSqlIcon />, description: "Mi base de datos relacional de código abierto preferida por su robustez, extensibilidad y rendimiento." }
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

const aboutMe = `Soy un ingeniero de software panameño con una visión clara: impulsar la transformación tecnológica en Panamá y más allá, creando soluciones innovadoras, eficientes y de alto impacto. Mi trayectoria es una fusión poco común entre la ingeniería de sonido y la ingeniería de software. Esta dualidad me ha enseñado a abordar los problemas con la precisión técnica de un ingeniero y la creatividad de un artista. Mi filosofía es simple: "Solucionar problemas para disfrutar la vida". Aplico esta mentalidad para desarrollar software robusto, escalable y seguro que genera valor real. Mi objetivo es ser un pionero en la innovación tecnológica de Panamá, con un enfoque en software, ciencia de datos e inteligencia artificial, siempre con una proyección global. Apuesto por la inclusión y el empoderamiento de las personas a través de la tecnología.`;


function CvGeneratorButton() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [cvContent, setCvContent] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCvContent("");
    try {
      const cvInput: GenerateCvInput = {
        about: aboutMe,
        skills: skills.map(({ name, description }) => ({ name, description })),
        projects: projects.map(({ title, description, technologies, impact }) => ({ title, description, technologies, impact })),
        testimonials: testimonials.map(({ name, title, quote }) => ({ name, title, quote })),
      };
      const result = await generateCv(cvInput);
      setCvContent(result.cvContent);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar el CV. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopy = () => {
    if (cvContent) {
      navigator.clipboard.writeText(cvContent);
      setCopied(true);
      toast({ title: "Copiado al portapapeles!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" onClick={handleGenerate}>
          <Download className="mr-2" />
          Generar CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl h-5/6 flex flex-col">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle>CV Generado por IA</DialogTitle>
          {cvContent && (
             <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              <span className="sr-only">Copiar</span>
            </Button>
          )}
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4 -mr-4">
          {isGenerating && !cvContent && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2">
                <BrainCircuit className="h-8 w-8 animate-pulse text-primary" />
                <p className="text-muted-foreground">Generando CV dinámico...</p>
              </div>
            </div>
          )}
          {cvContent ? (
             <div className="prose prose-sm dark:prose-invert max-w-none">
               <p style={{ whiteSpace: 'pre-wrap' }}>{cvContent}</p>
             </div>
          ) : !isGenerating && (
             <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>Listo para generar</AlertTitle>
              <AlertDescription>
                El CV se generará aquí.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-background relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-sm bg-transparent border-primary/50 text-primary">Software Engineer | Panamá 🇵🇦</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Ángel Nereira
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                    Construyendo soluciones escalables que transforman datos en impacto global.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/contact">¿Hablamos?</Link>
                  </Button>
                  <CvGeneratorButton />
                </div>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 justify-center lg:justify-start">
                  <Languages className="h-5 w-5" />
                  <span>Español (Nativo)</span>
                  <span>|</span>
                  <span>English (Advanced)</span>
                </div>
              </div>
              <div className="relative w-full max-w-md mx-auto lg:max-w-2xl h-auto">
                 <Image
                    src="https://i.postimg.cc/VJCCNJp0/Chat-GPT-Image-Sep-20-2025-10-11-35-PM.png"
                    alt="Software Engineer Avatar"
                    width={500}
                    height={500}
                    className="drop-shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
                    priority
                    data-ai-hint="software developer avatar"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Services Carousel Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Mis Servicios</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Soluciones de software a la medida para potenciar tu negocio. Desde aplicaciones web hasta inteligencia artificial.
                </p>
              </div>
            </div>
            <div className="py-12">
               <ServicesCarousel />
            </div>
             <div className="text-center">
                <Button asChild variant="outline">
                    <Link href="/services">
                        Ver todos los servicios <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
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
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
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
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-secondary p-6 shadow-sm transition-all duration-300 hover:bg-secondary/80 hover:-translate-y-1">
                      <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                      <span className="font-medium text-center">{skill.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-center bg-secondary border-primary/30 text-foreground">
                    <p className="font-bold mb-2">{skill.name}</p>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Proyectos Destacados</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Una selección de proyectos que demuestran mi enfoque en la resolución de problemas y la aplicación de tecnología.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl justify-center gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <SpotlightCard className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl cursor-pointer">
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
                    </SpotlightCard>
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
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <SpotlightCard key={testimonial.name} className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
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
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
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
               <SpotlightCard className="group relative rounded-md p-0 overflow-hidden bg-transparent border-none shadow-none">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Conversemos sobre tu proyecto</Link>
                  </Button>
               </SpotlightCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    