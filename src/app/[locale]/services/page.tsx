"use client";

import * as React from "react";
import { Check, ArrowRight, Code2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, ServicePackage } from "@/lib/services";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { useTranslations } from "next-intl";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

// ── Service areas ──────────────────────────────────────────────────────────
const serviceAreas = [
  { id: "web-development",           tabLabel: "Web Custom",       slug: "web-development" },
  { id: "tienda-online-ecommerce",   tabLabel: "E-commerce",       slug: "tienda-online-ecommerce" },
  { id: "aplicaciones-moviles",      tabLabel: "Apps Móviles",     slug: "aplicaciones-moviles" },
  { id: "portafolio-profesional",    tabLabel: "Portafolio",       slug: "portafolio-profesional" },
  { id: "gestion-de-negocios",       tabLabel: "ERP",              slug: "gestion-de-negocios" },
  { id: "sistemas-fiscales-dgi",     tabLabel: "DGI / PAC",        slug: "sistemas-fiscales-dgi" },
  { id: "ai-solutions",              tabLabel: "IA",               slug: "ai-solutions" },
  { id: "automatizacion-de-procesos",tabLabel: "RPA",              slug: "automatizacion-de-procesos" },
  { id: "planes-soporte-crecimiento",tabLabel: "SLA / CTO",        slug: "planes-soporte-crecimiento" },
  { id: "mentoria-capacitacion",     tabLabel: "Capacitación",     slug: "mentoria-capacitacion" },
  { id: "ciberseguridad-auditoria",  tabLabel: "Ciberseguridad",   slug: "ciberseguridad-auditoria" },
  { id: "infraestructura-servidores",tabLabel: "Servidores",       slug: "infraestructura-servidores" },
  { id: "soluciones-negocios-locales",tabLabel: "Negocios Locales",slug: "soluciones-negocios-locales" },
  { id: "investigacion-desarrollo",  tabLabel: "I+D / Consultoría",slug: "investigacion-desarrollo" },
] as const;

// ── Helper ─────────────────────────────────────────────────────────────────
function getServiceBySlug(slug: string) {
  return services.find(s => s.published && s.slug === slug) ?? null;
}

// ── Plan Card ──────────────────────────────────────────────────────────────
function PlanCard({
  pkg,
  serviceSlug,
  isPopular,
}: {
  pkg: ServicePackage;
  serviceSlug: string;
  isPopular: boolean;
}) {
  return (
    <SpotlightCard
      className={`relative flex flex-col bg-secondary/40 backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isPopular
          ? "border-primary shadow-primary/20 shadow-lg"
          : "border-white/10 hover:border-primary/50 hover:shadow-primary/10"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow">
            Más Popular
          </Badge>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Name + description */}
        <div className="mb-4">
          <h3 className={`text-lg font-bold mb-1 ${isPopular ? "text-primary" : ""}`}>
            {pkg.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-6">
          <p className="text-3xl font-bold">
            ${typeof pkg.price === "number" ? pkg.price.toLocaleString() : pkg.price}
            {pkg.priceSuffix && (
              <span className="text-base font-normal text-muted-foreground">{pkg.priceSuffix}</span>
            )}
          </p>
          {pkg.originalPrice && (
            <p className="text-lg text-muted-foreground line-through">
              ${pkg.originalPrice.toLocaleString()}
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2.5 text-sm flex-1 mb-6">
          {pkg.features.map(feat => (
            <li key={feat} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Time + CTA */}
        <div className="mt-auto space-y-2">
          <p className="text-xs text-center text-muted-foreground">{pkg.time}</p>
          <Button
            asChild
            className="w-full"
            variant={isPopular ? "default" : "outline"}
          >
            <Link
              href={`/calculadora?service=${serviceSlug}&plan=${pkg.name.toLowerCase()}`}
            >
              {pkg.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </SpotlightCard>
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
            itemListElement: services
              .filter(s => s.published)
              .map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Service",
                  name: service.title,
                  description: service.shortDescription,
                  url: `https://angelnereira.com/services/${service.slug}`,
                  provider: {
                    "@type": "ProfessionalService",
                    name: "Ángel Nereira Studio",
                  },
                  offers: {
                    "@type": "Offer",
                    price: service.packages[0].price,
                    priceCurrency: "USD",
                  },
                },
              })),
          }),
        }}
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            {t("services.page_title")}
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            {t("services.page_subtitle")}
          </p>
        </div>
      </AnimatedDiv>

      {/* ── Service Selector + Plans ──────────────────────────────────────── */}
      <AnimatedDiv delay={0.15}>
        <Tabs defaultValue="web-development" className="w-full">

          {/* ── Selector grid ── */}
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 h-auto gap-2 bg-transparent p-0 mb-10">
            {serviceAreas.map(area => {
              const svc = getServiceBySlug(area.slug);
              const Icon = svc?.icon ?? Code2;
              return (
                <TabsTrigger
                  key={area.id}
                  value={area.id}
                  className="flex flex-col items-center gap-2 p-3 h-auto min-h-[4.5rem] rounded-xl border border-white/10 bg-secondary/20 text-muted-foreground
                    hover:bg-secondary/40 hover:border-white/20 hover:text-foreground
                    data-[state=active]:border-primary data-[state=active]:bg-primary/10
                    data-[state=active]:text-primary data-[state=active]:shadow-md data-[state=active]:shadow-primary/20
                    transition-all duration-200"
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-xs font-medium leading-tight text-center whitespace-normal">
                    {area.tabLabel}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* ── Tab content ── */}
          {serviceAreas.map(area => {
            const svc = getServiceBySlug(area.slug);
            if (!svc) return null;

            return (
              <TabsContent key={area.id} value={area.id} className="mt-0">
                <AnimatedDiv>
                  {/* Service header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 p-5 bg-secondary/20 rounded-xl border border-white/10">
                    <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                      <svc.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold font-headline">{svc.title}</h2>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {svc.shortDescription}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Plans grid — all 3 inline */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {svc.packages.map((pkg, i) => (
                      <PlanCard
                        key={pkg.name}
                        pkg={pkg}
                        serviceSlug={svc.slug}
                        isPopular={i === 1}
                      />
                    ))}
                  </div>

                  {/* Add-ons */}
                  {svc.addOns.length > 0 && (
                    <div className="mt-8 p-5 bg-secondary/20 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <PlusCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <h3 className="font-semibold text-base">{t("services.addons_title")}</h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {svc.addOns.map(addOn => (
                          <div
                            key={addOn.name}
                            className="flex justify-between items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-white/5"
                          >
                            <div className="min-w-0">
                              <p className="font-medium text-sm">{addOn.name}</p>
                              {addOn.description && (
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                  {addOn.description}
                                </p>
                              )}
                            </div>
                            <p className="font-bold text-primary text-sm whitespace-nowrap flex-shrink-0">
                              +${addOn.price.toLocaleString()}
                              {addOn.priceSuffix ?? ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </AnimatedDiv>
              </TabsContent>
            );
          })}
        </Tabs>
      </AnimatedDiv>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <AnimatedDiv delay={0.4} className="text-center mt-16 p-6 sm:p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold tracking-tighter font-headline">¿Tienes un Reto Único?</h2>
        <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
          Cada proyecto es un mundo. Si tu idea no encaja perfectamente en estas categorías, es una
          excelente señal. Me especializo en crear soluciones a medida para problemas complejos.
        </p>
        <MagneticWrapper className="inline-block mt-6">
          <Button asChild size="lg">
            <Link href="/contact">Hablemos de tu Proyecto</Link>
          </Button>
        </MagneticWrapper>
      </AnimatedDiv>
    </>
  );
}
