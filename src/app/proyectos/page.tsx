"use client";

import * as React from "react";
import { ExternalLink, Github, Code2, Database, Lock, Target, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { useLanguage } from "@/lib/language-context";
import { TiltCard } from "@/components/ui/tilt-card";

export default function ProyectosPage() {
  const { t } = useLanguage();

  const projects = [
    {
      id: "sago-one-fintech-saas",
      title: t('project.sago_one.title'),
      label: t('project.sago_one.label'),
      subtitle: t('project.sago_one.subtitle'),
      description: t('project.sago_one.description'),
      challenge: t('project.sago_one.challenge'),
      techHighlights: [
        {
          title: t('project.sago_one.highlight.security.title'),
          description: t('project.sago_one.highlight.security.desc'),
          icon: Shield
        },
        {
          title: t('project.sago_one.highlight.database.title'),
          description: t('project.sago_one.highlight.database.desc'),
          icon: Database
        },
        {
          title: t('project.sago_one.highlight.performance.title'),
          description: t('project.sago_one.highlight.performance.desc'),
          icon: Zap
        }
      ],
      stack: [
        "Next.js 15",
        "TypeScript",
        "Prisma ORM",
        "Neon PostgreSQL",
        "PWA / Service Workers",
        "AES-256 Encryption",
        "Vercel",
        "Docker"
      ],
      status: "En Producción",
      statusColor: "bg-green-500/10 text-green-600",
      metrics: [
        { value: "10,000+", label: t('metric.facturas.label') },
        { value: "99.9%", label: "Uptime" },
        { value: "< 200ms", label: "Response Time" },
      ],
      github: "https://github.com/angelnereira/sago-factu-V0.2",
      demo: "https://sagoone.com",
    },
    {
      id: "plenty-market-ecommerce-pwa",
      title: t('project.plenty_market.title'),
      label: t('project.plenty_market.label'),
      subtitle: t('project.plenty_market.subtitle'),
      description: t('project.plenty_market.description'),
      challenge: t('project.plenty_market.challenge'),
      techHighlights: [
        {
          title: t('project.plenty_market.highlight.state.title'),
          description: t('project.plenty_market.highlight.state.desc'),
          icon: Code2
        },
        {
          title: t('project.plenty_market.highlight.media.title'),
          description: t('project.plenty_market.highlight.media.desc'),
          icon: Zap
        },
        {
          title: t('project.plenty_market.highlight.migration.title'),
          description: t('project.plenty_market.highlight.migration.desc'),
          icon: Database
        }
      ],
      stack: [
        "Next.js 14",
        "TypeScript",
        "Prisma ORM",
        "Neon PostgreSQL",
        "Zustand",
        "Cloudinary",
        "Vercel",
        "PWA"
      ],
      status: "En Producción",
      statusColor: "bg-green-500/10 text-green-600",
      metrics: [
        { value: "100%", label: "Offline Capable" },
        { value: "WebP/AVIF", label: "Image Optimization" },
        { value: "< 3s", label: "Time to Interactive" },
      ],
      github: "https://github.com/angelnereira/plenty-market",
      demo: "https://plenty-market.vercel.app",
    },
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

      {/* Structured Data for Projects - Real Software Products Visibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projects.map(project => ({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.title,
            "description": project.description,
            "applicationCategory": project.id.includes('fintech') ? "FinanceApplication" : "BusinessApplication",
            "operatingSystem": "Web, Chrome, Safari, iOS, Android (PWA)",
            "url": project.demo,
            "author": {
              "@type": "Person",
              "name": "Ángel Nereira"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/OnlineOnly"
            },
            "featureList": project.techHighlights.map(h => h.title).join(", ")
          })))
        }}
      />

      <div className="mt-12 space-y-16">
        {projects.map((project, index) => (
          <AnimatedDiv key={project.id} delay={0.1 * (index + 1)}>
            <TiltCard className="h-full">
              <SpotlightCard className="relative overflow-hidden bg-secondary/50 backdrop-blur-sm border border-white/10 h-full">
                <div className="p-6 sm:p-8 md:p-10">
                  {/* ... content ... */}
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Badge variant="outline" className="text-xs font-medium">{project.label}</Badge>
                        <Badge className={project.statusColor}>{project.status}</Badge>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-headline">{project.title}</h2>
                      <p className="text-lg text-muted-foreground mt-1">{project.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 mb-8 leading-relaxed">{project.description}</p>

                  {/* El Desafío Técnico */}
                  <div className="p-5 bg-primary/5 border border-primary/20 rounded-lg mb-8">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                      <Target className="h-5 w-5" />
                      {t('projects.challenge')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                  </div>

                  {/* Tech Highlights */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      {t('projects.tech_highlights')}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.techHighlights.map((highlight, i) => (
                        <div key={i} className="p-4 bg-secondary/50 border border-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <highlight.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground text-sm">{highlight.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Métricas en Producción
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="text-center p-4 bg-primary/5 border border-primary/10 rounded-lg">
                          <div className="text-xl sm:text-2xl font-bold text-primary">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
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
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
                    {project.github && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.github} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          Ver Código
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild size="sm">
                        <Link href={project.demo} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Ver en Producción
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </AnimatedDiv>
        ))}
      </div>

      {/* CTA Section */}
      <AnimatedDiv delay={0.5} className="text-center mt-16 p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold tracking-tighter font-headline">{t('cta.title')}</h2>
        <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/contact">
              {t('cta.button')}
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">
              {t('hero.cta.services')}
            </Link>
          </Button>
        </div>
      </AnimatedDiv>
    </>
  );
}
