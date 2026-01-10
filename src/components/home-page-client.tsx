"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, TrendingUp, Zap, CheckCircle2, Shield, Code2, Database, Cloud, Server, Rocket } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedDiv } from "@/components/animated-div";
import { projectsData, metricsData } from "@/lib/projects-and-testimonials";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { SpotlightCard } from "./spotlight-card";
import { Badge } from "@/components/ui/badge";
import { HackerText } from "@/components/ui/hacker-text";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const DynamicServicesSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ServicesSection), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicProjectsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ProjectsSection), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicMetricsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.MetricsSection), {
  loading: () => <Skeleton className="h-64 w-full" />,
});

import { useLanguage } from "@/lib/language-context";

// Core Stack - Solo tecnologías de Sago One y Plenty Market
const coreTechnologies = [
  { name: "Next.js 15", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "PostgreSQL", icon: Database },
  { name: "Neon", icon: Database },
  { name: "Prisma", icon: Server },
];

export default function HomePageClient() {
  const { t } = useLanguage();

  // Stats actualizados con métricas técnicas
  const stats = [
    { value: "5+", label: t('hero.stats.years'), icon: TrendingUp },
    { value: "10K+", label: t('hero.stats.facturas'), icon: CheckCircle2 },
    { value: "99.9%", label: t('hero.stats.uptime'), icon: Shield },
    { value: "< 200ms", label: "Response Time", icon: Zap },
  ];

  // Solution categories - enfocado en arquitectura técnica
  const solutionCards = [
    {
      title: t('solutions.enterprise.title'),
      desc: t('solutions.enterprise.desc'),
      icon: Shield,
      href: "/services",
      gradient: "from-emerald-500/20 to-teal-500/20",
      stats: t('solutions.enterprise.stats'),
    },
    {
      title: t('solutions.digital.title'),
      desc: t('solutions.digital.desc'),
      icon: Sparkles,
      href: "/services",
      gradient: "from-lime-500/20 to-emerald-500/20",
      stats: t('solutions.digital.stats'),
    },
    {
      title: t('solutions.consulting.title'),
      desc: t('solutions.consulting.desc'),
      icon: Cloud,
      href: "/contact",
      gradient: "from-teal-500/20 to-cyan-500/20",
      stats: t('solutions.consulting.stats'),
    },
  ];

  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  return (
    <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
      {/* Hero Section - Arquitecto Full Stack FinTech */}
      <section className="relative overflow-hidden pt-8 md:pt-12 lg:pt-20 pb-16">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">

            {/* Columna Izquierda: Contenido */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div>
                {/* Badge */}
                <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/30 bg-primary/5 inline-flex">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  {t('hero.badge')}
                </Badge>

                {/* Main heading */}
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline mb-6 leading-tight">
                  <span className="block text-muted-foreground text-xl sm:text-2xl font-normal mb-2">
                    {t('hero.greeting')}
                  </span>
                  <span className="block text-gradient">
                    <HackerText text={t('hero.name') || "Ángel Nereira"} />
                  </span>
                  <span className="block text-primary mt-2 text-3xl sm:text-4xl md:text-5xl">{t('hero.title')}</span>
                </h1>

                {/* Description */}
                <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl mb-6 leading-relaxed mx-auto lg:mx-0">
                  {t('hero.description')}
                </p>

                {/* Core tech stack badges - Stack de Sago One / Plenty Market */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                  {coreTechnologies.map((tech) => (
                    <Badge key={tech.name} variant="secondary" className="px-3 py-1.5 text-xs sm:text-sm bg-secondary/50 border-white/5 backdrop-blur-sm">
                      <tech.icon className="w-3.5 h-3.5 mr-1.5 text-primary" />
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <MagneticWrapper>
                    <Button asChild size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
                      <Link href="/contact">
                        {t('hero.cta.contact')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </MagneticWrapper>
                  <MagneticWrapper>
                    <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 text-base border-white/10 hover:bg-secondary/50 transition-all hover:scale-105">
                      <Link href="/proyectos">
                        {t('hero.cta.services')}
                      </Link>
                    </Button>
                  </MagneticWrapper>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Imagen Hero */}
            <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto lg:mr-0 flex justify-center lg:justify-end">
              <div className="relative w-full aspect-square max-w-[500px] lg:max-w-[600px]">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-emerald-500/20 rounded-full blur-3xl opacity-60 scale-75 animate-pulse" />
                <Image
                  src="/images/hero-architect.png"
                  alt="Software Architect Building Digital Solutions"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(223,255,0,0.2)]"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto border-t border-white/5 pt-8 lg:pt-12">
            {stats.map((stat, index) => (
              <AnimatedDiv key={stat.label} delay={0.3 + (0.1 * index)} className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <stat.icon className="w-5 h-5" />
                  <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section - Arquitecturas que Escalan */}
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <AnimatedDiv>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline mb-4">
                {t('solutions.title')}
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                {t('solutions.subtitle')}
              </p>
            </div>
          </AnimatedDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {solutionCards.map((solution, index) => (
              <AnimatedDiv key={index} delay={0.1 * index} className="h-full">
                <Link href={solution.href} className="block h-full">
                  <SpotlightCard
                    className={`group h-full flex flex-col p-6 !bg-transparent bg-gradient-to-br ${solution.gradient} border border-white/10 hover:border-primary/40 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 bg-background/50 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${hoveredCard === index ? 'scale-110 bg-primary/20' : ''}`}>
                        <solution.icon className={`w-7 h-7 transition-colors duration-300 ${hoveredCard === index ? 'text-primary' : 'text-foreground/80'}`} />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5 bg-background/50 backdrop-blur-sm border-white/5">
                        {solution.stats}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {solution.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {solution.desc}
                      </p>
                    </div>

                    <div className={`mt-auto pt-3 flex items-center text-xs font-semibold transition-all duration-300 border-t border-white/5 ${hoveredCard === index ? 'text-primary' : 'text-muted-foreground'}`}>
                      <span>{t('solutions.explore')}</span>
                      <ArrowRight className={`ml-2 h-3.5 w-3.5 transition-transform duration-300 ${hoveredCard === index ? 'translate-x-1' : ''}`} />
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Sin referencias a productor musical */}
      <section id="about" className="w-full bg-background/50">
        <AnimatedDiv>
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline mb-4">
                  {t('about.title')}
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  {t('about.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="group relative p-6 pl-8 border-l-2 border-white/10 hover:border-primary transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="font-bold text-xl mb-4 text-foreground/90 flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-primary" />
                    {t('about.background.title')}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {t('about.background.text')}
                  </p>
                </div>

                <div className="group relative p-6 pl-8 border-l-2 border-white/10 hover:border-primary transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="font-bold text-xl mb-4 text-foreground/90 flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-primary" />
                    {t('about.current.title')}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {t('about.current.text')}
                  </p>
                </div>
              </div>

              <div className="text-center mt-8">
                <blockquote className="text-xl md:text-2xl font-medium italic text-primary/80">
                  "{t('about.philosophy.text')}"
                </blockquote>
              </div>
            </div>
          </div>
        </AnimatedDiv>
      </section>

      {/* Dynamic Sections - Services, Projects, Metrics */}
      <DynamicServicesSection />
      <DynamicProjectsSection projects={projectsData} />
      <DynamicMetricsSection metrics={metricsData} />

      {/* CTA Section - Consultoría Técnica */}
      <section className="w-full">
        <AnimatedDiv>
          <div className="container px-4 md:px-6">
            <SpotlightCard className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter font-headline mb-4">
                {t('cta.title')}
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-lg mb-8">
                {t('cta.subtitle')}
              </p>
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/contact">
                  {t('cta.button')}
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
