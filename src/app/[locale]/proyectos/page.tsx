"use client";

import * as React from "react";
import { ExternalLink, Github, Code2, Database, Target, Zap, Shield, Terminal, Network, AudioLines, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { useTranslations } from "next-intl";
import { TiltCard } from "@/components/ui/tilt-card";
import { projectsData } from "@/lib/projects-and-testimonials";

// Stable mapping: project id → i18n key prefix under `project.*`
const PROJECT_I18N_KEY: Record<string, string> = {
  "sago-one-fintech-saas": "sago_one",
  "plenty-market-ecommerce-pwa": "plenty_market",
  "hka-sdk-fiscal-gateway": "hka_sdk",
  "gravital-shell-android-terminal": "gravital_shell",
  "gravital-share-android-vpn": "gravital_share",
  "gravital-talk-audio-comm": "gravital_talk",
};

// Highlights: { i18n key, icon } per project — pulled from `project.<key>.highlight.<key>.*`
const PROJECT_HIGHLIGHTS: Record<string, { key: string; icon: React.ElementType }[]> = {
  "sago-one-fintech-saas": [
    { key: "security", icon: Shield },
    { key: "database", icon: Database },
    { key: "performance", icon: Zap },
  ],
  "plenty-market-ecommerce-pwa": [
    { key: "state", icon: Code2 },
    { key: "media", icon: Zap },
    { key: "migration", icon: Database },
  ],
  "hka-sdk-fiscal-gateway": [
    { key: "validation", icon: Shield },
    { key: "routing", icon: Network },
    { key: "multitenant", icon: Database },
  ],
  "gravital-shell-android-terminal": [
    { key: "pty", icon: Terminal },
    { key: "sessions", icon: Code2 },
    { key: "apk", icon: Database },
  ],
  "gravital-share-android-vpn": [
    { key: "forwarding", icon: Network },
    { key: "performance", icon: Zap },
    { key: "fail_secure", icon: Shield },
  ],
  "gravital-talk-audio-comm": [
    { key: "dsp", icon: AudioLines },
    { key: "auth", icon: Shield },
    { key: "cloud", icon: Database },
  ],
};

// Per-project metrics shown on the listing page. Open-source projects show
// stack-derived highlights instead of production metrics.
const PROJECT_METRICS: Record<string, { value: string; labelKey: string; fallback: string }[]> = {
  "sago-one-fintech-saas": [
    { value: "10,000+", labelKey: "metric.facturas.label", fallback: "Invoices" },
    { value: "99.9%", labelKey: "metric.uptime.label", fallback: "Uptime" },
    { value: "< 200ms", labelKey: "metric.latency.label", fallback: "Latency" },
  ],
  "plenty-market-ecommerce-pwa": [
    { value: "100%", labelKey: "metric.offline.label", fallback: "Offline" },
    { value: "WebP/AVIF", labelKey: "metric.image_opt.label", fallback: "Image opt" },
    { value: "< 3s", labelKey: "metric.tti.label", fallback: "TTI" },
  ],
};

export default function ProyectosPage() {
  const t = useTranslations();

  const projects = projectsData.map((p) => {
    const i18nKey = PROJECT_I18N_KEY[p.id];
    const highlightDefs = PROJECT_HIGHLIGHTS[p.id] ?? [];
    const isOpenSource = p.status === "open-source";
    return {
      id: p.id,
      title: i18nKey ? t(`project.${i18nKey}.title`) : p.title,
      label: i18nKey ? t(`project.${i18nKey}.label`) : p.label,
      subtitle: i18nKey ? t(`project.${i18nKey}.subtitle`) : p.label,
      description: i18nKey ? t(`project.${i18nKey}.description`) : p.description,
      challenge: i18nKey ? t(`project.${i18nKey}.challenge`) : (p.challenge ?? ""),
      techHighlights: highlightDefs.map((h) => ({
        title: i18nKey ? t(`project.${i18nKey}.highlight.${h.key}.title`) : "",
        description: i18nKey ? t(`project.${i18nKey}.highlight.${h.key}.desc`) : "",
        icon: h.icon,
      })),
      stack: p.technologies,
      status: isOpenSource ? "Open Source" : t("projects.status_production"),
      statusColor: isOpenSource ? "bg-purple-500/10 text-purple-300" : "bg-green-500/10 text-green-600",
      metrics: PROJECT_METRICS[p.id] ?? [],
      github: p.githubUrl,
      demo: p.liveUrl,
      isOpenSource,
    };
  });

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

                  {/* Métricas (only for production projects with real numbers) */}
                  {project.metrics.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Métricas en Producción
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-4 bg-primary/5 border border-primary/10 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-primary">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{t(metric.labelKey)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                          {project.isOpenSource ? "Ver Repo" : "Ver en Producción"}
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
