import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, Code, GitBranch, Github, Linkedin, Server, Terminal, Twitter, BrainCircuit, BotMessageSquare, Languages, Mic, Music, FunctionSquare, Gitlab, Download, Code2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SpotlightCard } from "@/components/spotlight-card";


const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');
const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><title>Python</title><path d="M11.952 1.453c-2.438 0-4.321 1.59-4.321 4.23h2.16c0-1.428 1-2.16 2.16-2.16s2.16.732 2.16 2.16c0 1.2-.78 1.932-1.92 2.52-1.74.9-3.432 1.728-3.432 4.3h2.148c0-1.8 1-2.436 2.16-3.096 1.32-.768 2.688-1.404 2.688-3.528C16.273 3.043 14.4 1.453 11.952 1.453zm-1.452 12.21c-1.02 0-1.572.588-1.572 1.356s.552 1.356 1.572 1.356 1.572-.588 1.572-1.356-.552-1.356-1.572-1.356zM11.952 22.547c2.438 0 4.321-1.59 4.321-4.23h-2.16c0 1.428-1 2.16-2.16 2.16s-2.16-.732-2.16-2.16c0-1.2.78-1.932 1.92-2.52 1.74-.9 3.432-1.728 3.432-4.3h-2.148c0 1.8-1 2.436-2.16 3.096-1.32.768-2.688 1.404-2.688 3.528C7.68 21.047 9.552 22.547 11.952 22.547zm1.452-12.21c1.02 0 1.572.588 1.572 1.356s-.552 1.356-1.572 1.356-1.572-.588-1.572-1.356.552-1.356 1.572-1.356z" fill="#3776AB"/><path d="M12.048 1.453c2.438 0 4.321 1.59 4.321 4.23h-2.16c0-1.428-1-2.16-2.16-2.16s-2.16.732-2.16 2.16c0 1.2-.78 1.932-1.92 2.52-1.74.9-3.432 1.728-3.432 4.3h2.148c0-1.8 1-2.436 2.16-3.096 1.32-.768 2.688-1.404 2.688-3.528C7.727 3.043 9.6 1.453 12.048 1.453zm1.452 12.21c1.02 0 1.572.588 1.572 1.356s-.552 1.356-1.572 1.356-1.572-.588-1.572-1.356.552-1.356 1.572-1.356zM12.048 22.547c-2.438 0-4.321-1.59-4.321-4.23h2.16c0 1.428 1 2.16 2.16 2.16s2.16-.732 2.16-2.16c0-1.2.78-1.932 1.92-2.52 1.74-.9 3.432-1.728 3.432-4.3h-2.148c0 1.8 1 2.436 2.16 3.096 1.32-.768 2.688 1.404 2.688 3.528C16.32 21.047 14.448 22.547 12.048 22.547zm-1.452-12.21c-1.02 0-1.572.588-1.572 1.356s.552 1.356 1.572 1.356 1.572-.588 1.572-1.356-.552-1.356-1.572-1.356z" fill="#FFD43B"/></svg>
);
const TypescriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>TypeScript</title><path d="M1.5 0h21v21h-21z" /><path d="M1.5,21V0h21V21h-2.25V2.25H3.75V21H1.5Z" /><path d="M8.2,16.5h2.1V9.3h3.2V7.2H8.2v9.3Z M16.3,9.3c-1.3,0-2.3.4-3.1,1.2s-1.2,1.8-1.2,3c0,1.2.4,2.2,1.2,3s1.8,1.2,3.1,1.2c1.3,0,2.3-.4,3.1-1.2s1.2-1.8,1.2-3c0-1.2-.4-2.2-1.2-3S17.6,9.3,16.3,9.3Zm0,8.3c-1,0-1.8-.3-2.4-1s-.9-1.5-.9-2.5c0-1,.3-1.8,1-2.5s1.4-1,2.3-1c1,0,1.8.3,2.4,1s.9,1.5.9,2.5c0,1-.3,1.8-.9,2.5s-1.4,1-2.4,1Z" fill="#fff" /></svg>
);
const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Next.js</title><path d="M12 0A12 12 0 1 0 12 24A12 12 0 1 0 12 0zM8.22 19.34V6.66h2.14v10.6l6.8-10.6h2.26L11.52 17.34v2z" /></svg>
);
const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Node.js</title><path d="M11.39 0H2.61L0 2.61v18.78L2.61 24h18.78L24 21.39V8.61L21.39 6H12.61zm.24 1.36h8.04l2 2V20l-1.36 1.36H3.36L2 21.35V3.36l1.36-1.36h8.27zM12 4.17a7.83 7.83 0 1 0 0 15.66 7.83 7.83 0 0 0 0-15.66zm0 1.44a6.39 6.39 0 1 1 0 12.78 6.39 6.39 0 0 1 0-12.78z" /></svg>
);
const FirebaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Firebase</title><path d="M3.684 19.45a.34.34 0 0 1-.168-.046.335.335 0 0 1-.164-.316L4.408 8.23 3.5 8.5v-2l10.832-6.5h.336l-3.328 17.528a.339.339 0 0 1-.32.28.328.328 0 0 1-.336-.312l.6-3.152-7.42 5.004a.332.332 0 0 1-.184.052zm15.808-11.3L9.16 2.096l-1.852 3.1L14.5 3.5l5 5zm-3.328-3.048L18 3.5l-3.5 3.5-1.5-1.5z"/></svg>
);
const DockerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Docker</title><path d="M22.46 12.35c0-1.66-1.24-3-3-3h-.5c-.88 0-1.7.4-2.26 1.13-.56-.73-1.38-1.13-2.26-1.13s-1.7.4-2.26 1.13C11.62 9.75 10.8 9.35 10 9.35h-.5c-1.76 0-3 1.34-3 3 0 .7.24 1.35.63 1.88-.5.4-1.13 1-1.13 2.12 0 1.33 1.1 2.5 2.5 2.5h10c1.4 0 2.5-1.17 2.5-2.5 0-1.12-.63-1.72-1.13-2.12.4-.53.63-1.18.63-1.88zM8.5 13.85H6v-1.5h2.5zm0-3H6v-1.5h2.5zm4 3H10v-1.5h2.5zm0-3H10v-1.5h2.5zm4 3h-2.5v-1.5H16.5zm0-3h-2.5v-1.5H16.5z"/></svg>
);
const GithubGitlabIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);
const LinuxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Linux</title><path d="M5.62 13.11c-.37 0-.58.3-.58.82v1.73c0 .52.21.82.58.82.38 0 .59-.3.59-.82v-1.73c0-.52-.21-.82-.59-.82zm-3.3 0c-.38 0-.59.3-.59.82v1.73c0 .52.21.82.59.82.37 0 .58-.3.58-.82v-1.73c0-.52-.21-.82-.58-.82zm14.63.15c-.4 0-.6.2-.6.7v3.29c0 .5.2.7.6.7s.6-.2.6-.7v-3.29c0-.5-.2-.7-.6-.7zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.18 17.6c-.34.3-.78.47-1.32.47-.9 0-1.5-.4-1.92-1.12l-2.3 4.38c-.34.64-.8.97-1.4.97-.4 0-.7-.1-1-.32l8.3-8.3zm-10.36-1.5c.34-.3.78-.47 1.32-.47.9 0 1.5.4 1.92 1.12l2.3-4.38c.34-.64.8-.97 1.4-.97.4 0 .7.1 1 .32l-8.24 8.24c.02-.12.04-.23.04-.34v-3.52z"/></svg>
);
const VercelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Vercel</title><path d="M12 24L24 4H0L12 24z" /></svg>
);
const KubernetesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Kubernetes</title><path d="M12 .012a11.89 11.89 0 0 0-1.897.192l-8.465 2.82A1.986 1.986 0 0 0 .193 4.904L2.83 12 .192 19.096a1.986 1.986 0 0 0 1.445 1.88l8.465 2.82A11.89 11.89 0 0 0 12 23.988a11.89 11.89 0 0 0 1.897-.192l8.465-2.82a1.986 1.986 0 0 0 1.445-1.88L21.17 12l2.639-7.096a1.986 1.986 0 0 0-1.445-1.88l-8.465-2.82A11.89 11.89 0 0 0 12 .012zm-.948 4.23L4.415 6.09l-1.58 4.225h5.42zm1.896 0v15.51a9.904 9.904 0 0 1 0-15.51zm.948-1.74l6.637-2.212 1.58 4.225h-5.42zM4.415 17.91l6.637 1.848v-7.39H2.835zm8.483 1.848l6.637-1.848 1.58-4.225h-5.42z" /></svg>
);
const OpenShiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>OpenShift</title><path d="M12.022 2.001A9.993 9.993 0 002.022 12a9.993 9.993 0 0010.002 9.999A9.993 9.993 0 0022.021 12 9.993 9.993 0 0012.022 2.001zm0 2.856a7.137 7.137 0 017.137 7.142 7.137 7.137 0 01-7.137 7.142 7.137 7.137 0 01-7.14-7.142 7.137 7.137 0 017.14-7.142zm5.427 3.25L12.023 15.65 6.598 8.107l1.01-1.01 4.415 4.41 4.41-4.41z" /></svg>
);
const TailwindCssIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>Tailwind CSS</title><path d="M12 18a6 6 0 01-6-6h12a6 6 0 01-6 6zm0-12a6 6 0 016 6H6a6 6 0 016-6z" /></svg>
);
const PostgreSqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>PostgreSQL</title><path d="M12 24c-1.844 0-3.52-.51-4.996-1.528l.001.002C5.51 21.49 4.312 20.1 3.52 18.5h9.96c.14 0 .27-.06.37-.16.1-.1.15-.23.15-.36v-6.96c0-.13-.05-.26-.15-.36-.1-.1-.23-.16-.37-.16H3.52c-.14 0-.27.06-.37.16-.1.1-.15.23-.15.36V18.5c0 1.25-.33 2.5-.97 3.5-.64 1-1.54 1.5-2.5 1.5H0v-1.48h-.002c1.474-3.53 4.33-6.52 7.52-6.52v-2.98c-1.474-3.53-4.33-6.52-7.52-6.52V4.48h.002C1.036.95 3.892-.04 7.082-.04V10c1.475 3.53 4.33 6.52 7.52 6.52v2.98c-1.474-3.53-4.33-6.52-7.52-6.52v1.98c3.192 0 6.05-.99 7.522-2.972l-.002.002C18.49 23.49 19.688 22.1 20.48 20.5H10.52c-.14 0-.27-.06-.37-.16-.1-.1-.15-.23-.15-.36v-6.96c0-.13.05-.26.15-.36.1.1.23.16.37.16h9.96c.14 0 .27.06.37.16.1.1.15.23.15.36V20.5c0 1.25.33 2.5.97 3.5.64 1 1.54 1.5 2.5 1.5H24V22.52h.002c-1.474-3.53-4.33-6.52-7.52-6.52v-2.98c1.474-3.53 4.33-6.52 7.52-6.52V8.52h-.002c-1.036 3.53-3.892 6.52-7.082 6.52V5c-1.475-3.53-4.33-6.52-7.52-6.52V3.02C8.108 3.02 10.156 2 12 2s3.892 1.02 5.373 3.02l.002-.002c1.492 1.98 2.625 4.32 2.625 7.48 0 3.16-1.133 5.5-2.625 7.48l-.002-.002C15.892 21.98 13.844 23 12 23v1z" /></svg>
);

const skills = [
  { name: "Python", icon: <PythonIcon className="text-transparent" />, description: "Mi lenguaje preferido para backend, ciencia de datos e IA por su versatilidad y ecosistema robusto." },
  { name: "TypeScript", icon: <TypescriptIcon className="text-transparent" />, description: "Esencial para construir aplicaciones front-end y back-end a gran escala, garantizando código mantenible y libre de errores." },
  { name: "Next.js", icon: <NextjsIcon className="text-white" />, description: "El framework de React para producción. Su rendimiento, SSR y ecosistema lo hacen mi elección para aplicaciones web modernas." },
  { name: "Node.js", icon: <NodejsIcon className="text-[#339933]" />, description: "Ideal para construir APIs rápidas y escalables, permitiéndome usar JavaScript/TypeScript en todo el stack." },
  { name: "Google Cloud", icon: <Cloud />, description: "Mi plataforma en la nube preferida para desplegar aplicaciones escalables, desde VMs hasta servicios serverless y de IA." },
  { name: "Firebase", icon: <FirebaseIcon className="text-[#FFCA28]" />, description: "La solución BaaS para acelerar el desarrollo. La uso para autenticación, bases de datos en tiempo real y hosting." },
  { name: "Docker", icon: <DockerIcon className="text-[#2496ED]" />, description: "Fundamental en mi flujo de trabajo para crear entornos de desarrollo consistentes y desplegar aplicaciones en contenedores." },
  { name: "Git", icon: <GitBranch />, description: "El estándar para control de versiones. Indispensable para el trabajo en equipo, la integridad del código y las prácticas de CI/CD." },
  { name: "GitHub/GitLab", icon: <GithubGitlabIcon className="text-white" />, description: "Plataformas clave para alojar repositorios, colaborar y automatizar flujos de trabajo con Actions y Pipelines." },
  { name: "CI/CD", icon: <Terminal />, description: "Mi filosofía para entregar valor de forma rápida y segura, automatizando pruebas y despliegues." },
  { name: "Linux", icon: <LinuxIcon className="text-white" />, description: "El sistema operativo de servidor por excelencia. Domino la línea de comandos para administrar sistemas y redes." },
  { name: "Vercel", icon: <VercelIcon className="text-white" />, description: "La mejor plataforma para desplegar aplicaciones front-end. Su integración con Next.js, rendimiento y DX son inigualables." },
  { name: "Kubernetes", icon: <KubernetesIcon className="text-[#326CE5]" />, description: "El estándar para la orquestación de contenedores. Lo uso para gestionar aplicaciones complejas y de alta disponibilidad." },
  { name: "OpenShift", icon: <OpenShiftIcon className="text-[#EE0000]" />, description: "Mi elección para entornos empresariales que requieren una plataforma de Kubernetes gestionada y con herramientas de desarrollo integradas." },
  { name: "Tailwind CSS", icon: <TailwindCssIcon className="text-[#38B2AC]" />, description: "Un framework CSS utility-first que me permite construir diseños complejos y personalizados de forma rápida y mantenible." },
  { name: "PostgreSQL", icon: <PostgreSqlIcon className="text-[#336791]" />, description: "Mi base de datos relacional de código abierto preferida por su robustez, extensibilidad y rendimiento." }
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
                  alt="Abstract technology background"
                  data-ai-hint="abstract technology"
                  width={400}
                  height={400}
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full lg:order-last border-4 border-primary/50"
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
                     <SpotlightCard className="relative flex flex-col items-center justify-center space-y-2 rounded-lg bg-secondary/70 p-6 shadow-sm transition-all duration-300 ease-geist backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                      <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                      <span className="font-medium text-center text-foreground">{skill.name}</span>
                    </SpotlightCard>
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
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
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
