"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap, CheckCircle2, Building2, Code2, Database, Cloud } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedDiv } from "@/components/animated-div";
import { projectsData, testimonialsData } from "@/lib/projects-and-testimonials";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { SpotlightCard } from "./spotlight-card";
import { Badge } from "@/components/ui/badge";

const DynamicServicesSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ServicesSection), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicProjectsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ProjectsSection), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicTestimonialsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.TestimonialsSection), {
  loading: () => <Skeleton className="h-64 w-full" />,
});

// Key stats for credibility
const stats = [
  { value: "5+", label: "Años de Experiencia", icon: TrendingUp },
  { value: "20+", label: "Proyectos Entregados", icon: CheckCircle2 },
  { value: "100%", label: "Clientes Satisfechos", icon: Users },
  { value: "15+", label: "Tecnologías Dominadas", icon: Zap },
];

// Core technologies (replacing the marquee)
const coreTechnologies = [
  { name: "Next.js", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "PostgreSQL", icon: Database },
  { name: "Oracle Cloud", icon: Cloud },
];

// Value propositions for target audience
const valueProps = [
  {
    title: "Para Empresarios y Ejecutivos",
    desc: "Soluciones tecnológicas que impulsan el crecimiento y optimizan operaciones.",
    icon: Building2,
  },
  {
    title: "Para Reclutadores",
    desc: "Ingeniero senior con experiencia en sistemas empresariales críticos.",
    icon: Users,
  },
  {
    title: "Para Emprendedores",
    desc: "De MVP a producto escalable. Arquitectura pensada para el crecimiento.",
    icon: Sparkles,
  },
];

export default function HomePageClient() {
  return (
    <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
      {/* Hero Section - Redesigned */}
      <section className="relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 text-center py-12 sm:py-16 md:py-24 lg:py-32">
          <AnimatedDiv>
            {/* Badge */}
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/30 bg-primary/5">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Disponible para nuevos proyectos
            </Badge>

            {/* Main heading */}
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline mb-6">
              <span className="block text-muted-foreground text-lg sm:text-xl md:text-2xl font-normal mb-2">
                Hola, soy
              </span>
              <span className="block text-gradient">Ángel Nereira</span>
              <span className="block text-primary mt-2">Ingeniero de Software</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl text-foreground font-medium mb-4">
              Transformo ideas en soluciones digitales escalables
            </p>

            {/* Description */}
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg mb-8">
              Especialista en FinTech y GovTech. Diseño arquitecturas empresariales que generan valor real para tu negocio.
            </p>

            {/* Core tech stack badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {coreTechnologies.map((tech) => (
                <Badge key={tech.name} variant="secondary" className="px-3 py-1.5 text-sm">
                  <tech.icon className="w-3.5 h-3.5 mr-1.5" />
                  {tech.name}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/services">
                  Ver Soluciones
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link href="/contact">
                  Agendar Consultoría
                </Link>
              </Button>
            </div>
          </AnimatedDiv>

          {/* Stats Section */}
          <AnimatedDiv delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-secondary/30 border border-white/5">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* Value Propositions - Target Audience */}
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <AnimatedDiv>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline mb-4">
                ¿Cómo puedo ayudarte?
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                Soluciones adaptadas a tus necesidades específicas.
              </p>
            </div>
          </AnimatedDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {valueProps.map((prop, index) => (
              <AnimatedDiv key={index} delay={0.1 * index}>
                <SpotlightCard className="group h-full p-6 bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <prop.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{prop.title}</h3>
                  <p className="text-muted-foreground text-sm">{prop.desc}</p>
                </SpotlightCard>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Condensed */}
      <section id="about" className="w-full bg-background/50">
        <AnimatedDiv>
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline mb-4">
                  Sobre Mí
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Ingeniero de software panameño especializado en crear soluciones empresariales escalables para FinTech y GovTech. No solo programo, diseño arquitecturas completas que transforman negocios.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <SpotlightCard className="p-6 bg-secondary/30 border border-white/5">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Una Perspectiva Única</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Mi trayectoria es única: pasé 7 años como productor musical e ingeniero de sonido antes de hacer la transición a la ingeniería de software. Esta experiencia me ha dado una perspectiva diferente sobre el diseño de soluciones y la atención al detalle.
                  </p>
                </SpotlightCard>

                <SpotlightCard className="p-6 bg-secondary/30 border border-white/5">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Experiencia Actual</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Actualmente trabajo en UbicSys S.A., donde diseño y desarrollo soluciones FinTech y GovTech. Mi proyecto principal es SAGO-FACTU, un sistema SaaS completo de facturación electrónica que integra con la DGI de Panamá.
                  </p>
                </SpotlightCard>
              </div>

              <div className="text-center mt-8">
                <blockquote className="text-xl md:text-2xl font-medium italic text-primary/80">
                  "Solucionar problemas para disfrutar la vida"
                </blockquote>
              </div>
            </div>
          </div>
        </AnimatedDiv>
      </section>

      {/* Dynamic Sections - Services and Projects only (no skills carousel) */}
      <DynamicServicesSection />
      <DynamicProjectsSection projects={projectsData} />
      <DynamicTestimonialsSection testimonials={testimonialsData} />

      {/* CTA Section - Redesigned */}
      <section className="w-full">
        <AnimatedDiv>
          <div className="container px-4 md:px-6">
            <SpotlightCard className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter font-headline mb-4">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-lg mb-8">
                Colaboremos en soluciones que escalen globalmente. Estoy disponible para nuevos desafíos y oportunidades.
              </p>
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/contact">
                  Conversemos sobre tu proyecto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </SpotlightCard>
          </div>
        </AnimatedDiv>
      </section>
    </div>
  );
}
