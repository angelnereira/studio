
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Shield, Database, Zap, Code2, Target, ExternalLink } from 'lucide-react';
import { AnimatedDiv } from '@/components/animated-div';
import { skills, skillCategories, getSkillsByCategory } from '@/lib/skills';
import type { Project, Metric } from '@/lib/projects-and-testimonials';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SpotlightCard } from '@/components/spotlight-card';
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ServicesCarousel } from './services-carousel';
import { useLanguage } from '@/lib/language-context';

// Project Icons
const SagoOneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlentyMarketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const projectIcons: { [key: string]: React.ElementType } = {
  'sago-one-fintech-saas': SagoOneIcon,
  'plenty-market-ecommerce-pwa': PlentyMarketIcon,
};

// Icon mapping for tech highlights
const highlightIcons: { [key: string]: React.ElementType } = {
  'Seguridad Nivel Bancario': Shield,
  'Base de Datos Multi-Tenant': Database,
  'Performance Extremo': Zap,
  'Gestión de Estado Optimizada': Code2,
  'Optimización de Media': Zap,
  'Migración de Base de Datos': Database,
};

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <section id="skills" className="w-full">
        <div className="container px-4 md:px-6">
          <AnimatedDiv>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  {t('skills.title')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('skills.description')}
                </p>
              </div>
            </div>
          </AnimatedDiv>

          {/* Grid de Skills por Categoría - Engineering-First */}
          <div className="mt-12 space-y-12">
            {skillCategories.map((category, catIndex) => (
              <AnimatedDiv key={category.id} delay={0.1 * catIndex}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {getSkillsByCategory(category.id).map((skill) => (
                    <Tooltip key={skill.slug}>
                      <TooltipTrigger asChild>
                        <Link href={`/skills/${skill.slug}`}>
                          <SpotlightCard className="group p-4 bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                            <div className="flex flex-col items-center text-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <skill.icon className="w-6 h-6 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {skill.name}
                              </span>
                            </div>
                          </SpotlightCard>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{skill.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </AnimatedDiv>
            ))}
          </div>

          <AnimatedDiv delay={0.4} className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/skills">
                {t('skills.cta')} <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </AnimatedDiv>
        </div>
      </section>
    </TooltipProvider>
  )
}

export function ProjectsSection({ projects: projectsData }: { projects: Project[] }) {
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!projectsData || projectsData.length === 0) {
    return null;
  }

  const projects = projectsData.map(p => ({ ...p, logo: projectIcons[p.id] }));

  return (
    <section id="projects" className="w-full bg-background/50">
      <div className="container px-4 md:px-6">
        <AnimatedDiv>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('projects.title')}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('projects.description')}
              </p>
            </div>
          </div>
        </AnimatedDiv>
        <div className="mx-auto grid max-w-5xl justify-center gap-8 py-12 grid-cols-1 lg:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedDiv key={project.id} delay={0.1 * index}>
              {isClient ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <SpotlightCard className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full h-full bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl cursor-pointer">
                      <CardHeader className="flex-row items-start gap-4">
                        {project.logo && (
                          <div className="w-14 h-14 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <project.logo className="w-7 h-7" />
                          </div>
                        )}
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-xs font-medium">{project.label}</Badge>
                          <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary text-xl">{project.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <CardDescription className="line-clamp-4 text-sm leading-relaxed">{project.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="mt-auto flex-col items-start gap-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                          ))}
                          {project.technologies.length > 4 && <Badge variant="outline" className="text-xs">+{project.technologies.length - 4}</Badge>}
                        </div>
                        <div className="flex items-center text-sm text-primary font-medium group-hover:underline">
                          Ver Caso de Ingeniería <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardFooter>
                    </SpotlightCard>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        {project.logo && (
                          <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <project.logo className="w-8 h-8" />
                          </div>
                        )}
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">{project.label}</Badge>
                          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                        </div>
                      </div>
                      <DialogDescription className="text-base leading-relaxed">{project.description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* El Desafío Técnico */}
                      {project.challenge && (
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            {t('projects.challenge')}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
                        </div>
                      )}

                      {/* Tech Highlights */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          {t('projects.tech_highlights')}
                        </h4>
                        <div className="grid gap-3">
                          {project.techHighlights.map((highlight, i) => {
                            const IconComponent = highlightIcons[highlight.title] || Code2;
                            return (
                              <div key={i} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground text-sm">{highlight.title}</p>
                                  <p className="text-xs text-muted-foreground">{highlight.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Stack */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Database className="h-5 w-5 text-primary" />
                          Stack Tecnológico
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/10">
                      {project.githubUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.githubUrl} target="_blank">
                            <Github className="mr-2 h-4 w-4" /> Código
                          </Link>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button asChild size="sm">
                          <Link href={project.liveUrl} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" /> Ver en Producción
                          </Link>
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <SpotlightCard className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full h-full bg-secondary/50 backdrop-blur-sm border border-white/10">
                  <CardHeader className="flex-row items-center gap-4">
                    {project.logo && (
                      <div className="w-14 h-14 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <project.logo className="w-7 h-7" />
                      </div>
                    )}
                    <div>
                      <Badge variant="outline" className="mb-2">{project.label}</Badge>
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-4">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardFooter>
                </SpotlightCard>
              )}
            </AnimatedDiv>
          ))}
        </div>
        <AnimatedDiv delay={0.3} className="text-center">
          <Button asChild variant="outline">
            <Link href="/proyectos">
              Ver Todos los Casos <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </AnimatedDiv>
      </div>
    </section>
  );
}

// NUEVO: Metrics Section (reemplaza Testimonials)
export function MetricsSection({ metrics: metricsData }: { metrics: Metric[] }) {
  const { t } = useLanguage();

  if (!metricsData || metricsData.length === 0) {
    return null;
  }

  const metricIcons = [
    { icon: Code2 },
    { icon: Shield },
    { icon: Zap },
    { icon: Database },
  ];

  return (
    <section id="metrics" className="w-full">
      <div className="container px-4 md:px-6">
        <AnimatedDiv>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('metrics.title')}</h2>
            <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-lg">
              {t('metrics.subtitle')}
            </p>
          </div>
        </AnimatedDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-6xl mx-auto py-12">
          {metricsData.map((metric, index) => {
            // Dynamic spans for bento grid effect
            const colSpan = index === 0 || index === 3 ? "lg:col-span-4" : "lg:col-span-2";
            const gradient = index === 0 ? "bg-gradient-to-br from-primary/10 via-background to-background" :
              index === 3 ? "bg-gradient-to-tl from-primary/10 via-background to-background" :
                "bg-secondary/20";

            return (
              <AnimatedDiv key={metric.label} delay={0.1 * index} className={`${colSpan} group relative overflow-hidden rounded-2xl border border-white/10 p-8 ${gradient} hover:border-primary/30 transition-all duration-500`}>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                <div className="relative z-10 flex flex-col items-start h-full justify-between">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      {React.createElement(metricIcons[index % metricIcons.length].icon, { className: "w-6 h-6" })}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                      {metric.value}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2 opacity-80">{metric.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </AnimatedDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Mantener TestimonialsSection por compatibilidad pero vacío
export function TestimonialsSection({ testimonials: testimonialsData }: { testimonials: { name: string; title: string; quote: string; avatarId: string }[] }) {
  // No renderizar nada - reemplazado por MetricsSection
  return null;
}

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="w-full">
      <div className="container px-4 md:px-6">
        <AnimatedDiv>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('services.title')}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('services.description')}
              </p>
            </div>
          </div>
        </AnimatedDiv>
        <AnimatedDiv delay={0.2}>
          <div className="py-12">
            <ServicesCarousel />
          </div>
        </AnimatedDiv>
        <AnimatedDiv delay={0.4} className="text-center">
          <Button asChild variant="outline">
            <Link href="/services">
              {t('services.cta')} <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </AnimatedDiv>
      </div>
    </section>
  );
}
