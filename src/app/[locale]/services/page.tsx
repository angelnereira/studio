"use client";

import * as React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Code2 } from "lucide-react";
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

// ── One row per service ────────────────────────────────────────────────────
const serviceAreas = [
  {
    id: "web-development",
    tabLabel: "Web Custom",
    name: "Desarrollo Web de Alto Rendimiento",
    techStack: "Next.js 15, TypeScript, React Server Components, Tailwind CSS",
    businessValue:
      "SEO supremo desde el primer render, TTI <3 s, mantenibilidad garantizada y prevención de deuda técnica que erosiona el ROI a largo plazo.",
    slug: "web-development",
  },
  {
    id: "tienda-online-ecommerce",
    tabLabel: "E-commerce",
    name: "Tiendas Online y E-commerce",
    techStack: "Next.js, Stripe/PayPal, Cloudinary, Prisma ORM, Neon PostgreSQL",
    businessValue:
      "Ventas 24/7 sin fricción: cada segundo de TTI ahorrado incrementa la tasa de conversión. Catálogo dinámico, pasarelas de pago y gestión de inventario en tiempo real.",
    slug: "tienda-online-ecommerce",
  },
  {
    id: "aplicaciones-moviles",
    tabLabel: "Apps Móviles",
    name: "Aplicaciones Móviles iOS y Android",
    techStack: "React Native, TypeScript, Firebase, REST APIs, App Store / Google Play",
    businessValue:
      "Presencia en el bolsillo del cliente: notificaciones push, pagos in-app, funcionalidad offline y publicación en tiendas de apps con ciclo de entrega ágil.",
    slug: "aplicaciones-moviles",
  },
  {
    id: "portafolio-profesional",
    tabLabel: "Portafolio",
    name: "Portafolio Profesional y Marca Personal Digital",
    techStack: "Next.js, CMS autogestionable, SEO On-Page, Sistema de citas, CRM básico",
    businessValue:
      "Diferenciación digital medible: captación de clientes inbound, posicionamiento de autoridad en el mercado y conversión directa desde el portafolio web.",
    slug: "portafolio-profesional",
  },
  {
    id: "gestion-de-negocios",
    tabLabel: "ERP",
    name: "Sistemas ERP y Gestión Empresarial",
    techStack: "Next.js, PostgreSQL, Prisma ORM, Módulos de Inventario / Planilla / CRM",
    businessValue:
      "Automatización de procesos operativos críticos: elimina horas semanales de trabajo manual en inventario y nómina, reduciendo costos fijos y errores de transcripción humana.",
    slug: "gestion-de-negocios",
  },
  {
    id: "sistemas-fiscales-dgi",
    tabLabel: "DGI / PAC",
    name: "Facturación Electrónica DGI y Cumplimiento Fiscal",
    techStack: "API REST/SOAP PAC certificado, AES-256, XML firmado, QR/CUFE, Dashboard fiscal",
    businessValue:
      "Cumplimiento obligatorio con la Resolución N.° 201-6299 (deadline 2026). Elimina el riesgo de multas fiscales, garantiza la continuidad operativa y la certificación ante la DGI.",
    slug: "sistemas-fiscales-dgi",
  },
  {
    id: "ai-solutions",
    tabLabel: "IA",
    name: "Soluciones con Inteligencia Artificial",
    techStack: "Google Gemini, Claude API, LangChain, NLP, sistemas de recomendación, análisis predictivo",
    businessValue:
      "Atención al cliente 24/7 sin costo marginal por interacción, personalización a escala y decisiones basadas en datos que incrementan márgenes operativos hasta un 15%.",
    slug: "ai-solutions",
  },
  {
    id: "automatizacion-de-procesos",
    tabLabel: "RPA",
    name: "Automatización de Procesos Robóticos (RPA)",
    techStack: "Node.js scripts, API integrations, bots de software, orquestación de flujos, dashboards de monitoreo",
    businessValue:
      "ROI asimétrico: una automatización que sustituye trabajo manual de $15K/año se amortiza en semanas. Erradica errores de entrada de datos y libera al equipo para tareas de alto valor.",
    slug: "automatizacion-de-procesos",
  },
  {
    id: "planes-soporte-crecimiento",
    tabLabel: "SLA / CTO",
    name: "Planes SLA y Dirección Técnica (Fractional CTO)",
    techStack: "Monitoring 24/7, PostgreSQL optimization, dependencias NPM/CVE, rotación AES-256, roadmap tecnológico",
    businessValue:
      "Continuidad operativa garantizada sin los costos de un CTO a tiempo completo. Evolución tecnológica continua, protección del activo digital y soporte de emergencia con respuesta <1h.",
    slug: "planes-soporte-crecimiento",
  },
  {
    id: "mentoria-capacitacion",
    tabLabel: "Capacitación",
    name: "Capacitación Corporativa y Modernización de Equipos TI",
    techStack: "Next.js, TypeScript, arquitecturas cloud, CI/CD, React Server Components, workshops prácticos",
    businessValue:
      "Moderniza equipos de TI legados, reduce deuda técnica organizacional y acelera la velocidad de entrega de código de toda la organización con programas B2B a medida.",
    slug: "mentoria-capacitacion",
  },
  {
    id: "ciberseguridad-auditoria",
    tabLabel: "Ciberseguridad",
    name: "Ciberseguridad y Auditoría de Sistemas",
    techStack: "OWASP Top 10, análisis SAST, Nmap, pruebas de penetración, gestión de CVEs, cifrado AES-256",
    businessValue:
      "Previene filtraciones de datos: el costo de remediar un ataque supera 10× el de una auditoría preventiva. Identifica tus vulnerabilidades antes que los atacantes y protege la reputación y los datos de tus clientes.",
    slug: "ciberseguridad-auditoria",
  },
  {
    id: "infraestructura-servidores",
    tabLabel: "Servidores",
    name: "Infraestructura, Servidores y Administración TI",
    techStack: "Linux (Ubuntu/Debian), Nginx, Docker, Proxmox, VPNs, Firewalls, AWS / GCP / Azure",
    businessValue:
      "Tu departamento TI externo: infraestructura confiable sin el costo de un sysadmin de tiempo completo. Desde configurar un servidor local hasta arquitectura cloud escalable con administración continua.",
    slug: "infraestructura-servidores",
  },
  {
    id: "soluciones-negocios-locales",
    tabLabel: "Negocios Locales",
    name: "Sistemas POS y Gestión para Negocios Locales",
    techStack: "POS táctil, control de inventario, impresoras de comandas, fidelización, integración delivery, app móvil",
    businessValue:
      "Digitaliza tu restaurante, salón o tienda con un sistema completo de ventas, inventario y clientes. Toma decisiones con datos reales y deja de depender de hojas de papel o Excel.",
    slug: "soluciones-negocios-locales",
  },
  {
    id: "investigacion-desarrollo",
    tabLabel: "I+D / Consultoría",
    name: "Consultoría Tecnológica e Investigación y Desarrollo",
    techStack: "Arquitectura de soluciones, MVPs, pruebas de concepto, análisis de viabilidad, roadmaps tecnológicos",
    businessValue:
      "Valida ideas antes de invertir. Transforma necesidades de negocio en soluciones tecnológicas concretas: desde un diagnóstico estratégico hasta un prototipo funcional que demuestra valor a inversores o directivos.",
    slug: "investigacion-desarrollo",
  },
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────
function getServiceBySlug(slug: string) {
  return services.find(s => s.published && s.slug === slug) ?? null;
}

// ── Service Card ───────────────────────────────────────────────────────────
function ServiceCard({
  service,
  t,
}: {
  service: Service;
  t: ReturnType<typeof useTranslations>;
}) {
  const pkg = service.packages[0];
  const priceSuffix = pkg.priceSuffix ?? "";

  return (
    <TiltCard className="h-full">
      <SpotlightCard className="group relative flex flex-col h-full bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
            <service.icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-headline transition-colors duration-300 group-hover:text-primary">
              {service.title}
            </CardTitle>
            <CardDescription className="text-sm">{service.shortDescription}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
              {t("services.plans_from")}
            </h4>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-primary">
                ${typeof pkg.price === "number" ? pkg.price.toLocaleString() : pkg.price}
                <span className="text-sm font-normal text-muted-foreground">{priceSuffix}</span>
              </p>
              {pkg.originalPrice && (
                <p className="text-lg font-normal text-muted-foreground line-through">
                  ${pkg.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
              {t("services.ideal_for")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/services/${service.slug}`}>{t("services.view_details")}</Link>
          </Button>
          <MagneticWrapper className="w-full">
            <Button asChild className="w-full">
              <Link href={`/calculadora?service=${service.slug}`}>
                <span className="hidden sm:inline">{t("services.quick_quote")}</span>
                <span className="sm:hidden">{t("services.quote")}</span>
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

      {/* ── Service Cards with Tabs ───────────────────────────────────────── */}
      <AnimatedDiv delay={0.2}>
        <Tabs defaultValue="web-development" className="w-full">
          {/* Tab bar — scrollable on mobile */}
          <div className="overflow-x-auto pb-1">
            <TabsList className="flex w-max gap-1 h-auto bg-secondary/30 p-1 min-w-full md:min-w-0">
              {serviceAreas.map(area => {
                const svc = getServiceBySlug(area.slug);
                const Icon = svc?.icon ?? Code2;
                return (
                  <TabsTrigger
                    key={area.id}
                    value={area.id}
                    className="flex items-center gap-1.5 text-xs whitespace-nowrap px-3 py-2"
                  >
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                    {area.tabLabel}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {serviceAreas.map(area => {
              const svc = getServiceBySlug(area.slug);
              return (
                <TabsContent key={area.id} value={area.id}>
                  {svc ? (
                    <div className="max-w-2xl mx-auto">
                      <AnimatedDiv>
                        <ServiceCard service={svc} t={t} />
                      </AnimatedDiv>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-12">
                      Servicio no disponible.
                    </p>
                  )}
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </AnimatedDiv>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <AnimatedDiv delay={0.4} className="text-center mt-16 p-6 sm:p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold tracking-tighter font-headline">¿Tienes un Reto Único?</h2>
        <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
          Cada proyecto es un mundo. Si tu idea no encaja perfectamente en estas categorías, es una
          excelente señal. Me especializo en crear soluciones a medida para problemas complejos.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/contact">Hablemos de tu Proyecto</Link>
        </Button>
      </AnimatedDiv>
    </>
  );
}
