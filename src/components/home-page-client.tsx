"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedDiv } from "@/components/animated-div";
import { projectsData, testimonialsData } from "@/lib/projects-and-testimonials";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { SpotlightCard } from "./spotlight-card";

const DynamicSkillsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.SkillsSection), {
  loading: () => <Skeleton className="h-64 w-full" />,
});
const DynamicServicesSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ServicesSection), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicProjectsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ProjectsSection), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicTestimonialsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.TestimonialsSection), {
  loading: () => <Skeleton className="h-64 w-full" />,
});

export default function HomePageClient() {

  return (
    <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
        {/* Hero Section */}
        <section>
          <div className="container px-4 md:px-6 text-center py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40">
             <AnimatedDiv>
               <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl sm:tracking-tight md:text-4xl md:tracking-tighter lg:text-5xl xl:text-6xl font-headline">
                  <span className="block mb-1 sm:mb-2">Angel Nereira</span>
                  <div className="relative w-full overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap">
                      <span className="block text-primary mx-2 sm:mx-3 md:mx-4">Ingeniero de Software y DevOps</span>
                      <span className="block text-primary mx-2 sm:mx-3 md:mx-4">Ingeniero de Software y DevOps</span>
                      <span className="block text-primary mx-2 sm:mx-3 md:mx-4">Ingeniero de Software y DevOps</span>
                      <span className="block text-primary mx-2 sm:mx-3 md:mx-4">Ingeniero de Software y DevOps</span>
                    </div>
                  </div>
              </h1>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg lg:text-xl mt-4 sm:mt-5 md:mt-6">
                  De la Idea a la Solución Tecnológica
              </p>
              <p className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg text-primary/80">"Solucionar problemas para disfrutar la vida."</p>
              <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Hablemos</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Link href="/skills">Ver Habilidades</Link>
                </Button>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full bg-background/50">
           <AnimatedDiv>
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
          </AnimatedDiv>
        </section>

        {/* Dynamic Sections */}
        <DynamicSkillsSection />
        <DynamicServicesSection />
        <DynamicProjectsSection projects={projectsData} />
        <DynamicTestimonialsSection testimonials={testimonialsData} />


        {/* CTA Section */}
        <section className="w-full bg-background/50">
          <AnimatedDiv>
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
          </AnimatedDiv>
        </section>
    </div>
  );
}
