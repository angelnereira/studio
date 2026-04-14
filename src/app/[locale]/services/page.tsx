"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight, Code2, Database, Server, Shield, Brain, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, Service } from "@/lib/services";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { useTranslations } from "next-intl";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

// ── Service Areas Matrix Data ──────────────────────────────────────────────
const serviceAreas = [
  {
    id: "web",
    tabLabel: "Web & Móvil",
    name: "Aplicaciones Web y Móvil",
    services: "Desarrollo Web, E-commerce, Apps Móviles, Portafolio",
    businessValue: "Presencia digital de alto rendimiento, TTI <3s, conversión optimizada y experiencia nativa en cualquier dispositivo.",
    icon: Code2,
    categories: ["Web Development"],
  },
  {
    id: "erp",
    tabLabel: "Empresarial & DGI",
    name: "Sistemas Empresariales y Cumplimiento Fiscal",
    services: "ERP a Medida, Facturación DGI/PAC, Sistemas de Gestión",
    businessValue: "Automatización de procesos operativos, cumplimiento obligatorio con la Resolución DGI N.° 201-6299, eliminación de multas fiscales y reducción de costos fijos.",
    icon: Database,
    categories: ["Business Management"],
  },
  {
    id: "ai",
    tabLabel: "IA & Automatización",
    name: "Inteligencia Artificial y Automatización (RPA)",
    services: "Chatbots NLP, Sistemas de Recomendación, RPA, Pipelines de Datos",
    businessValue: "Eliminación de trabajo manual redundante, decisiones predictivas, ROI asimétrico: automatizar lo que cuesta $15K/año por una fracción del costo.",
    icon: Brain,
    categories: ["AI Solutions"],
  },
  {
    id: "infra",
    tabLabel: "SLA & Soporte",
    name: "Infraestructura, SLA y Dirección Técnica",
    services: "SLA Básico, SLA Empresarial, Fractional CTO",
    businessValue: "Continuidad operativa garantizada 24/7, protección de activos digitales, evolución tecnológica continua y dirección técnica estratégica sin contratar un CTO a tiempo completo.",
    icon: Server,
    categories: ["Infrastructure & Maintenance"],
  },
  {
    id: "training",
    tabLabel: "Capacitación",
    name: "Capacitación Corporativa y Modernización Tecnológica",
    services: "Mentoría 1:1, Acelerador de Equipos, Workshops Corporativos",
    businessValue: "Modernización de equipos de TI legados, reducción de deuda técnica organizacional y aceleración de la velocidad de entrega de código de toda la organización.",
    icon: BookOpen,
    categories: ["Mentorías y Capacitación"],
  },
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────
function getServicesByArea(categories: readonly string[]) {
  return services.filter(
    s => s.published && categories.includes(s.category)
  );
}

// ── Service Card ───────────────────────────────────────────────────────────
function ServiceCard({ service, t }: { service: Service; t: ReturnType<typeof useTranslations> }) {
  const startingPackage = service.packages[0];
  const startingPrice = startingPackage.price;
  const originalPrice = startingPackage.originalPrice;
  const priceSuffix = startingPackage.priceSuffix || '';

  return (
    <TiltCard className="h-full">
      <SpotlightCard className="group relative flex flex-col transition-all duration-300 bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl h-full">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
            <service.icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-headline transition-colors duration-300 group-hover:text-primary">{service.title}</CardTitle>
            <CardDescription className="text-sm">{service.shortDescription}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">{t('services.plans_from')}</h4>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-primary">
                ${typeof startingPrice === 'number' ? startingPrice.toLocaleString() : startingPrice}
                <span className="text-sm font-normal text-muted-foreground">{priceSuffix}</span>
              </p>
              {originalPrice && (
                <p className="text-lg font-normal text-muted-foreground line-through">${originalPrice.toLocaleString()}</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">{t('services.ideal_for')}</h4>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/services/${service.slug}`}>{t('services.view_details')}</Link>
          </Button>
          <MagneticWrapper className="w-full">
            <Button asChild className="w-full">
              <Link href={`/calculadora?service=${service.slug}`}>
                <span className="hidden sm:inline">{t('services.quick_quote')}</span>
                <span className="sm:hidden">{t('services.quote')}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </MagneticWrapper>
        </CardFooter>
      </SpotlightCard>
    </TiltCard>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const t = useTranslations();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.filter(s => s.published).map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.shortDescription,
                "url": `https://angelnereira.com/services/${service.slug}`,
                "provider": { "@type": "ProfessionalService", "name": "Ángel Nereira Studio" },
                "offers": {
                  "@type": "Offer",
                  "price": service.packages[0].price,
                  "priceCurrency": "USD"
                }
              }
            }))
          })
        }}
      />

      {/* Header */}
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('services.page_title')}</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              {t('services.page_subtitle')}
            </p>
          </div>
        </div>
      </AnimatedDiv>

      {/* ── Service Areas Matrix ─────────────────────────────────────────── */}
      <AnimatedDiv delay={0.1}>
        <div className="mb-14">
          <h2 className="text-xl font-bold font-headline mb-6 text-center tracking-tight">
            Áreas de Especialización → Valor de Negocio
          </h2>

          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-[1fr_1.2fr_1.8fr] gap-px bg-white/5 rounded-t-xl overflow-hidden border border-white/10 border-b-0">
            <div className="bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary">Área de Servicio</div>
            <div className="bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary">Soluciones Incluidas</div>
            <div className="bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary">Problema que Resuelve</div>
          </div>

          {/* Table rows */}
          <div className="rounded-xl md:rounded-t-none overflow-hidden border border-white/10 divide-y divide-white/5">
            {serviceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.8fr] bg-secondary/10 hover:bg-secondary/30 transition-colors duration-300"
                >
                  <div className="px-5 py-5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm leading-snug pt-1">{area.name}</p>
                  </div>
                  <div className="px-5 py-5 hidden md:block">
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.services}</p>
                  </div>
                  <div className="px-5 py-5 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 hidden md:block" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.businessValue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedDiv>

      {/* ── Service Cards with Category Tabs ─────────────────────────────── */}
      <AnimatedDiv delay={0.2}>
        <Tabs defaultValue="web" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-8 bg-secondary/30 p-1">
            {serviceAreas.map(area => (
              <TabsTrigger
                key={area.id}
                value={area.id}
                className="flex items-center gap-1.5 text-xs sm:text-sm"
              >
                <area.icon className="h-3.5 w-3.5" />
                {area.tabLabel}
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceAreas.map(area => (
            <TabsContent key={area.id} value={area.id}>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {getServicesByArea(area.categories).map((service, index) => (
                  <AnimatedDiv key={service.slug} delay={0.08 * index}>
                    <ServiceCard service={service} t={t} />
                  </AnimatedDiv>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </AnimatedDiv>

      {/* CTA */}
      <AnimatedDiv delay={0.4} className="text-center mt-12 p-6 sm:p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold tracking-tighter font-headline">¿Tienes un Reto Único?</h2>
        <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
          Cada proyecto es un mundo. Si tu idea no encaja perfectamente en estas categorías, es una excelente señal. Me especializo en crear soluciones a medida para problemas complejos.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/contact">Hablemos de tu Proyecto</Link>
        </Button>
      </AnimatedDiv>
    </>
  );
}
