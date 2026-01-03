"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, Github, Code2, Cloud, Database, Lock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { useLanguage } from "@/lib/language-context";

export default function ProyectosPage() {
  const { t } = useLanguage();

  const projects = [
    {
      id: "sago-factu",
      title: "Sago One",
      subtitle: "Plataforma de Facturación Electrónica PWA Offline-First",
      description: "Solución líder en Panamá para facturación electrónica. PWA progresiva que permite emitir facturas sin internet, con cifrado militar AES-256 e integración directa con proveedores PAC y DGI. Rendimiento extremo con Next.js 15 y Neon DB.",
      problem: "Comerciantes sufren con sistemas lentos, burocráticos y dependientes de internet estable. La seguridad de datos fiscales y la movilidad eran inexistentes en soluciones tradicionales.",
      solution: "PWA Offline-First que garantiza facturación ininterrumpida. Sincronización automática, cifrado de extremo a extremo y experiencia de usuario fluida en cualquier dispositivo móvil o desktop.",
      features: [
        "PWA Offline-First con Service Workers",
        "Seguridad Bancaria (Cifrado AES-256)",
        "Integración DGI/PAC en Tiempo Real",
        "Sincronización Automática de Datos",
        "Multi-Tenant y Multi-Usuario",
        "Generación de QR y CUFE Instantánea",
        "Panel de Métricas en Tiempo Real",
        "API RESTful Escalable"
      ],
      stack: [
        "Next.js 15",
        "TypeScript",
        "Prisma ORM",
        "Neon Postgres",
        "PWA / Service Workers",
        "Tailwind CSS",
        "Vercel",
        "AES-256"
      ],
      status: "En Producción",
      statusColor: "bg-green-500/10 text-green-600",
      type: "FinTech · GovTech · PWA",
      github: "https://github.com/angelnereira/sago-factu-V0.2",
      demo: "https://sagoone.com",
      caseStudy: "/proyectos/sago-factu"
    },
    {
      id: "ueta-travel",
      title: "UETA Travel Access",
      subtitle: "Sistema de Gestión de Viajes Empresariales",
      description: "Plataforma integral de gestión de viajes desplegada en Oracle Cloud Infrastructure con integración completa de bases de datos enterprise Oracle Database.",
      problem: "Gestionar viajes corporativos requiere coordinación entre múltiples sistemas, bases de datos empresariales y alta disponibilidad.",
      solution: "Sistema empresarial completo desplegado en Oracle Cloud Infrastructure, aprovechando Oracle Database y servicios cloud enterprise para garantizar robustez, escalabilidad y rendimiento.",
      features: [
        "Arquitectura Enterprise en Oracle Cloud Infrastructure",
        "Oracle Database como motor principal",
        "Alta Disponibilidad y Redundancia",
        "Oracle Object Storage para archivos",
        "Compute Instances escalables",
        "Networking y seguridad enterprise",
        "Monitoreo y logging avanzado",
        "Dashboard en tiempo real"
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Oracle Cloud Infrastructure",
        "Oracle Database",
        "Oracle Compute",
        "Oracle Object Storage"
      ],
      status: "En Desarrollo",
      statusColor: "bg-blue-500/10 text-blue-600",
      type: "Enterprise · Cloud · Travel",
      github: "https://github.com/angelnereira/Ueta-Travel-Access",
      demo: null,
    },
    {
      id: "portfolio",
      title: "Portfolio Personal",
      subtitle: "Sitio Web Profesional con Prisma ORM",
      description: "Portfolio profesional desarrollado con las últimas tecnologías, migrado recientemente de Firebase a Prisma ORM para mejor type-safety y developer experience.",
      problem: "Portfolio estático sin base de datos tipo-safe, limitaciones de Firebase SDK, experiencia de desarrollo mejorable.",
      solution: "Migración completa a Prisma ORM con PostgreSQL, manteniendo el diseño pero mejorando significativamente la arquitectura y DX.",
      features: [
        "Migración Firebase → Prisma (Type-safety completo)",
        "Responsive Design optimizado para móviles",
        "SEO Optimizado (meta tags, sitemap, schema markup)",
        "Blog integrado con MDX",
        "4 tipos de formularios de contacto",
        "Integración con Gemini AI",
        "Bundle size reducido -87%"
      ],
      stack: [
        "Next.js 15",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Tailwind CSS",
        "Vercel",
        "Gemini AI"
      ],
      status: "En Producción",
      statusColor: "bg-green-500/10 text-green-600",
      type: "Web · Portfolio",
      github: "https://github.com/angelnereira/studio",
      demo: "https://angelnereira.com",
    }
  ];

  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            {t('projects.page_title')}
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            {t('projects.page_subtitle')}
          </p>
        </div>
      </AnimatedDiv>

      <div className="mt-12 space-y-12">
        {projects.map((project, index) => (
          <AnimatedDiv key={project.id} delay={0.1 * (index + 1)}>
            <SpotlightCard className="relative overflow-hidden bg-secondary/50 backdrop-blur-sm border border-white/10">
              <div className="p-6 sm:p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl sm:text-3xl font-bold font-headline">{project.title}</h2>
                      <Badge className={project.statusColor}>{project.status}</Badge>
                    </div>
                    <p className="text-lg text-muted-foreground">{project.subtitle}</p>
                    <p className="text-sm text-primary/70 mt-1">{project.type}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/80 mb-6">{project.description}</p>

                {/* Problem & Solution */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <h3 className="font-semibold mb-2 text-destructive">El Problema</h3>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">La Solución</h3>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    Características Técnicas
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Stack Tecnológico
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {(project.github || project.demo || project.caseStudy) && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    {project.caseStudy && (
                      <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                        <Link href={project.caseStudy}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Ver Caso de Estudio
                        </Link>
                      </Button>
                    )}
                    {project.github && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.github} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          Ver Código
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild variant="secondary" size="sm">
                        <Link href={project.demo} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Ver Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </SpotlightCard>
          </AnimatedDiv>
        ))}
      </div>

      {/* CTA Section */}
      <AnimatedDiv delay={0.5} className="text-center mt-16 p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold tracking-tighter font-headline">¿Necesitas una Solución Similar?</h2>
        <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
          Cada proyecto es único. Si tu negocio necesita una solución personalizada,
          arquitectura cloud, o integración compleja, estoy aquí para ayudarte.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/contact">
              Consultoría Técnica
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">
              Ver Soluciones
            </Link>
          </Button>
        </div>
      </AnimatedDiv>
    </>
  );
}
