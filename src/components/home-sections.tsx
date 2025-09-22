
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github } from 'lucide-react';
import { AnimatedDiv } from '@/components/animated-div';
import { skills } from '@/lib/skills';
import { projects, testimonials } from '@/lib/projects-and-testimonials';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SpotlightCard } from '@/components/spotlight-card';
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};


export function SkillsSection() {
    return (
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
             <div className="group/container relative mt-12 w-full overflow-hidden px-4">
                <div className="absolute inset-y-0 left-0 z-10 w-[7.5%] bg-gradient-to-r from-background to-transparent" />
                <div className="flex h-56 w-max animate-marquee items-center p-4 transition-all duration-500 ease-geist group-hover/container:h-64 hover:[animation-play-state:paused]">
                  {[...skills, ...skills].map((skill, index) => (
                    <div
                      key={`${skill.slug}-item-${index}`}
                      className="group/item relative mx-2 flex w-36 flex-col items-center justify-start text-center transition-all duration-500 ease-geist h-28 group-hover/container:opacity-75 hover:!opacity-100"
                    >
                      <div className="flex h-24 w-24 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-secondary p-6 transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl">
                        <skill.icon className='h-10 w-10 text-primary' />
                      </div>
                      <div className="absolute bottom-0 w-full overflow-hidden opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 pt-2 h-0 group-hover/item:h-auto group-hover/item:relative p-2">
                        <p className="font-bold text-primary">
                          {skill.name}
                        </p>
                        <p className="text-xs text-foreground/90 dark:text-foreground/80 mt-1">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              <div className="absolute inset-y-0 right-0 z-10 w-[7.5%] bg-gradient-to-l from-background to-transparent" />
            </div>
            <AnimatedDiv delay={0.4} className="text-center mt-20">
              <Button asChild variant="outline">
                <Link href="/skills">
                  Ver todas las Habilidades <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </AnimatedDiv>
          </div>
        </section>
    )
}

export function ProjectsSection() {
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
            <div className="mx-auto grid max-w-5xl justify-center gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const ProjectLogo = project.logo;
                return (
                <AnimatedDiv key={project.id} delay={0.1 * index}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <SpotlightCard className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl cursor-pointer">
                          <CardHeader className="flex-row items-center gap-4">
                            {ProjectLogo && (
                              <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                 <ProjectLogo className="w-6 h-6" />
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
                           {ProjectLogo && (
                              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                 <ProjectLogo className="w-8 h-8" />
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
                </AnimatedDiv>
              )})}
            </div>
          </div>
        </section>
    );
}

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="w-full">
          <div className="container px-4 md:px-6">
            <AnimatedDiv>
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
            </AnimatedDiv>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
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

    
