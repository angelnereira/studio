
import { skills, skillCategories, getSkillsByCategory, categoryIconMap } from '@/lib/skills';
import * as React from 'react';
import Link from 'next/link';
import { SpotlightCard } from '@/components/spotlight-card';
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatedDiv } from '@/components/animated-div';

export default function SkillsPage() {
  return (
    <>
      {/* Header */}
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Arquitectura Tecnológica
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Cada tecnología tiene un propósito arquitectónico y un impacto medible en el negocio. Este es el stack que sustenta sistemas como Sago One y Plenty Market en producción.
          </p>
        </div>
      </AnimatedDiv>

      {/* ── Architecture Matrix Table ── */}
      <AnimatedDiv delay={0.15}>
        <div className="mt-14">
          <h2 className="text-xl font-bold font-headline mb-6 text-center tracking-tight">
            Stack por Capa Arquitectónica → Valor de Negocio
          </h2>

          {/* Table header – desktop only */}
          <div className="hidden md:grid md:grid-cols-[1fr_1.1fr_1.6fr] gap-px bg-white/5 rounded-t-xl overflow-hidden border border-white/10 border-b-0">
            <div className="bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary">
              Capa Arquitectónica
            </div>
            <div className="bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary">
              Stack Implementado
            </div>
            <div className="bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary">
              Traducción al Valor de Negocio
            </div>
          </div>

          {/* Table rows */}
          <div className="rounded-xl md:rounded-t-none overflow-hidden border border-white/10 divide-y divide-white/5">
            {skillCategories.map((cat, i) => {
              const Icon = categoryIconMap[cat.iconName] || categoryIconMap['Code2'];
              const catSkills = getSkillsByCategory(cat.id);
              return (
                <div
                  key={cat.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr_1.6fr] gap-px bg-secondary/10 hover:bg-secondary/30 transition-colors duration-300"
                >
                  {/* Col 1: Layer name */}
                  <div className="px-5 py-5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm leading-snug">{cat.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 md:hidden">{cat.description}</p>
                    </div>
                  </div>

                  {/* Col 2: Technologies */}
                  <div className="px-5 py-5 hidden md:flex flex-wrap gap-1.5 content-start">
                    {catSkills.map(s => (
                      <Link key={s.slug} href={`/skills/${s.slug}`}>
                        <Badge
                          variant="secondary"
                          className="text-[11px] cursor-pointer hover:border-primary/40 hover:text-primary transition-colors"
                        >
                          {s.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  {/* Col 3: Business value */}
                  <div className="px-5 py-5 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 hidden md:block" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.businessValue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedDiv>

      {/* ── Skills grouped by category ── */}
      {skillCategories.map((cat, catIdx) => {
        const catSkills = getSkillsByCategory(cat.id);
        const Icon = categoryIconMap[cat.iconName] || categoryIconMap['Code2'];
        return (
          <AnimatedDiv key={cat.id} delay={0.1 * (catIdx + 1)}>
            <section className="mt-16">
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-headline leading-tight">{cat.name}</h2>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>

              {/* Skill cards */}
              <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {catSkills.map((skill, idx) => {
                  const SkillIcon = skill.icon;
                  return (
                    <AnimatedDiv key={skill.slug} delay={0.05 * idx}>
                      <Link href={`/skills/${skill.slug}`} className="group block h-full">
                        <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-secondary/30 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-lg">
                          <CardHeader className="flex-row items-center gap-3 p-4 pb-2">
                            <div className="w-10 h-10 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                              <SkillIcon className="w-5 h-5" />
                            </div>
                            <CardTitle className="transition-colors duration-300 group-hover:text-primary text-base font-bold leading-tight">
                              {skill.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 p-4 pt-2">
                            <CardDescription className="text-sm leading-relaxed text-muted-foreground/90 line-clamp-3">
                              {skill.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button variant="link" className="p-0 h-auto font-semibold text-xs text-primary/70 group-hover:text-primary transition-colors">
                              Ver detalles <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </CardFooter>
                        </SpotlightCard>
                      </Link>
                    </AnimatedDiv>
                  );
                })}
              </div>
            </section>
          </AnimatedDiv>
        );
      })}
    </>
  );
}
