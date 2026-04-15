"use client";

import * as React from "react";
import Link from "next/link";
import { skillCategories, getSkillsByCategory, categoryIconMap } from "@/lib/skills";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SkillsPage() {
  const t = useTranslations("skills");

  return (
    <>
      {/* Header */}
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            {t("page_title")}
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            {t("page_subtitle")}
          </p>
        </div>
      </AnimatedDiv>

      {/* Category Cards Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skillCategories.map((cat, idx) => {
          const Icon = categoryIconMap[cat.iconName];
          const catSkills = getSkillsByCategory(cat.id);
          return (
            <AnimatedDiv key={cat.id} delay={0.07 * idx}>
              <Link href={`/skills/${cat.id}`} className="group block h-full">
                <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-secondary/30 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
                  {/* Icon */}
                  <div className="p-6 pb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-lg font-bold font-headline leading-tight transition-colors duration-300 group-hover:text-primary">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skills count + tech badges */}
                  <div className="px-6 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {catSkills.slice(0, 4).map(s => (
                        <Badge key={s.slug} variant="secondary" className="text-[10px] px-2 py-0.5">
                          {s.name}
                        </Badge>
                      ))}
                      {catSkills.length > 4 && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5 text-muted-foreground">
                          +{catSkills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="px-6 pb-6 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                        {catSkills.length} {catSkills.length === 1 ? t("tech_singular") : t("tech_plural")}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary/70 group-hover:text-primary transition-colors">
                        {t("explore_area")} <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </AnimatedDiv>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <AnimatedDiv delay={0.5} className="text-center mt-16 py-12 border-t border-white/5">
        <p className="text-sm text-muted-foreground mb-4">
          {t("cta_subtitle")}
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            {t("cta_button")} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </AnimatedDiv>
    </>
  );
}
