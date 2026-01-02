
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github } from 'lucide-react';
import { AnimatedDiv } from '@/components/animated-div';
import { skills } from '@/lib/skills';
import type { Project, Testimonial } from '@/lib/projects-and-testimonials';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SpotlightCard } from '@/components/spotlight-card';
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ServicesCarousel } from './services-carousel';

// Icon for SAGO-FACTU - Electronic Invoicing
const SagoFactuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon for UETA Travel - Travel Management System
const UetaTravelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Icon for GovTech Portal - Government Services
const GovTechPortalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18M3 10h18M12 3l9 7v11H3V10l9-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon for FinTech Dashboard - Financial Analytics
const FinTechDashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14h3v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon for Biometric Access Control
const BiometricAccessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2a10 10 0 0 1 8.66 5M12 22a10 10 0 0 1-8.66-5M3.34 7A10 10 0 0 1 12 2M20.66 17A10 10 0 0 1 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Icon for Payments API - Multi-channel Payments
const PaymentsAPIIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M1 10h22" stroke="currentColor" strokeWidth="2" />
    <path d="M6 15h4M15 15h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const projectIcons: { [key: string]: React.ElementType } = {
  'sago-factu': SagoFactuIcon,
  'ueta-travel': UetaTravelIcon,
  'govtech-portal': GovTechPortalIcon,
  'fintech-dashboard': FinTechDashboardIcon,
  'biometric-access': BiometricAccessIcon,
  'payments-api': PaymentsAPIIcon
};

export function SkillsSection() {
  return (
    <TooltipProvider>
      <section id="skills" className="w-full">
        <div className="container px-4 md:px-6">
          <AnimatedDiv>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Habilidades y Stack Tecnológico
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Más que una lista de tecnologías, esta es mi caja de herramientas para resolver problemas complejos. Cada habilidad y herramienta se aplica con un propósito: construir soluciones eficientes, escalables y centradas en el usuario que generan un impacto real.
                </p>
              </div>
            </div>
          </AnimatedDiv>
          <div className="group/container relative mt-12 w-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 z-10 w-[7.5%] bg-gradient-to-r from-background to-transparent" />
            <div className="flex h-40 w-max animate-marquee items-center transition-all duration-500 ease-geist py-4 group-hover/container:[animation-play-state:paused]">
              {[...skills, ...skills].map((skill, index) => (
                <Tooltip key={`${skill.slug}-tooltip-${index}`}>
                  <TooltipTrigger asChild>
                    <Link href={`/skills/${skill.slug}`} className="block">
                      <div className="relative mx-2 flex w-36 h-28 flex-col items-center justify-center text-center transition-all duration-500 ease-geist hover:translate-y-2">
                        <div
                          className="flex h-24 w-24 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-secondary/50 p-6 transition-all duration-300"
                        >
                          <skill.icon className='h-10 w-10 text-primary' />
                        </div>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{skill.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 z-10 w-[7.5%] bg-gradient-to-l from-background to-transparent" />
          </div>
          <AnimatedDiv delay={0.4} className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/skills">
                Ver todas las Habilidades <ArrowRight className="ml-2" />
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!projectsData) {
    return null;
  }

  const projects = projectsData.map(p => ({ ...p, logo: projectIcons[p.id] }));

  return (
    <section id="projects" className="w-full bg-background/50">
      <div className="container px-4 md:px-6">
        <AnimatedDiv>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Proyectos Destacados</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Una selección de proyectos que demuestran mi enfoque en la resolución de problemas y la aplicación de tecnología.
              </p>
            </div>
          </div>
        </AnimatedDiv>
        <div className="mx-auto grid max-w-5xl justify-center gap-8 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedDiv key={project.id} delay={0.1 * index}>
              {isClient ? (
                <Dialog>
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
              ) : (
                // Render a placeholder or null on the server
                <SpotlightCard className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full bg-secondary/50 backdrop-blur-sm border border-white/10">
                  <CardHeader className="flex-row items-center gap-4">
                    {project.logo && (
                      <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <project.logo className="w-6 h-6" />
                      </div>
                    )}
                    <CardTitle>{project.title}</CardTitle>
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
              )}
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ testimonials: testimonialsData }: { testimonials: Testimonial[] }) {

  if (!testimonialsData) {
    return null;
  }

  const testimonials = testimonialsData.map(t => {
    const avatar = PlaceHolderImages.find(p => p.id === t.avatarId);
    return { ...t, avatar };
  });

  return (
    <section id="testimonials" className="w-full">
      <div className="container px-4 md:px-6">
        <AnimatedDiv>
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
        </AnimatedDiv>
        <div className="grid gap-8 mt-12 grid-cols-1 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <AnimatedDiv key={testimonial.name} delay={0.1 * index}>
              <SpotlightCard className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
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
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="w-full">
      <div className="container px-4 md:px-6">
        <AnimatedDiv>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Mis Servicios</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Soluciones de software a la medida para potenciar tu negocio. Desde aplicaciones web hasta inteligencia artificial.
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
              Ver todos los servicios <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </AnimatedDiv>
      </div>
    </section>
  );
}
