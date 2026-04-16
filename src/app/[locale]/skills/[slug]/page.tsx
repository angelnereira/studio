import { skills, skillCategories, getSkillsByCategory, categoryIconMap, type Skill, type PracticalAbility } from "@/lib/skills";
import { type SkillCategoryData } from "@/lib/data/skills-data";
import { notFound } from "next/navigation";
import * as React from "react";
import { CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Zap, Rocket, Star, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface SlugPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// Generate static params for both category IDs and individual skill slugs
export async function generateStaticParams() {
  return [
    ...skillCategories.map(c => ({ slug: c.id })),
    ...skills.map(s => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = skillCategories.find(c => c.id === slug);
  if (category) {
    return {
      title: `${category.name} | Stack Tecnológico de Ángel Nereira`,
      description: category.businessValue,
    };
  }

  const skill = skills.find(s => s.slug === slug);
  if (!skill) return { title: "No encontrado" };

  return {
    title: `Dominio Técnico en ${skill.name} | Ingeniero de Software Ángel Nereira`,
    description: skill.description,
  };
}

// ── Category detail view ──────────────────────────────────────────────────────

interface CategoryLabels {
  backToAreas: string;
  skillsCount: string;
  viewDetails: string;
  businessValueLabel: string;
  interestedAreaTitle: string;
  interestedAreaDesc: string;
  contactBtn: string;
  allAreasBtn: string;
}

function SkillCard({ skill, viewDetailsLabel }: { skill: Skill; viewDetailsLabel: string }) {
  const SkillIcon = skill.icon;
  return (
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
            {viewDetailsLabel} <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </SpotlightCard>
    </Link>
  );
}

function CategoryDetailPage({ category, labels }: {
  category: SkillCategoryData;
  labels: CategoryLabels;
}) {
  const Icon = categoryIconMap[category.iconName];
  const catSkills = getSkillsByCategory(category.id);

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* Back + Header */}
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
          <Link
            href="/skills"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {labels.backToAreas}
          </Link>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-50" />
            <div className="relative bg-secondary/50 backdrop-blur-md text-primary p-6 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10">
              <Icon className="h-16 w-16" />
            </div>
          </div>

          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-widest text-[10px] font-bold">
              {labels.skillsCount}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </AnimatedDiv>

      {/* Business value box */}
      <AnimatedDiv delay={0.15}>
        <div className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl max-w-3xl mx-auto w-full">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{labels.businessValueLabel}</p>
              <p className="text-muted-foreground leading-relaxed">{category.businessValue}</p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      {/* Skills grid */}
      <AnimatedDiv delay={0.2}>
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {catSkills.map((skill, idx) => (
            <AnimatedDiv key={skill.slug} delay={0.05 * idx}>
              <SkillCard skill={skill} viewDetailsLabel={labels.viewDetails} />
            </AnimatedDiv>
          ))}
        </div>
      </AnimatedDiv>

      {/* Bottom CTA */}
      <AnimatedDiv delay={0.4} className="text-center py-12 border-t border-white/5">
        <h2 className="text-xl font-bold font-headline mb-3">{labels.interestedAreaTitle}</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          {labels.interestedAreaDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20">
            <Link href="/contact">
              {labels.contactBtn} <Rocket className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/skills">
              <ArrowLeft className="mr-2 w-4 h-4" /> {labels.allAreasBtn}
            </Link>
          </Button>
        </div>
      </AnimatedDiv>
    </div>
  );
}

// ── Individual skill detail view ──────────────────────────────────────────────

interface SkillLabels {
  backToCategory: string;
  specializedBadge: string;
  practicalAbilitiesTitle: string;
  implementationTitle: string;
  implementationDesc: string;
  performanceOpt: string;
  scalableArch: string;
  interestedTechTitle: string;
  interestedTechDesc: string;
  workTogether: string;
  exploreCategory: string;
}

const AbilityCard = ({ ability, index }: { ability: PracticalAbility; index: number }) => {
  const Icon = ability.icon;
  return (
    <AnimatedDiv delay={0.1 * (index + 1)}>
      <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
        <CardHeader className="flex-row items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className='w-6 h-6' />
          </div>
          <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary text-lg font-bold">
            {ability.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{ability.description}</p>
        </CardContent>
      </SpotlightCard>
    </AnimatedDiv>
  );
};

function SkillDetailPage({ skill, labels }: { skill: Skill; labels: SkillLabels }) {
  const SkillIcon = skill.icon;

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* Header / Hero Section */}
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
          <Link
            href={`/skills/${skill.category}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {labels.backToCategory}
          </Link>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-50" />
            <div className="relative bg-secondary/50 backdrop-blur-md text-primary p-6 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10">
              <SkillIcon className="h-16 w-16" />
            </div>
          </div>

          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-widest text-[10px] font-bold">
              {labels.specializedBadge}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl font-headline bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              {skill.name}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
              {skill.description}
            </p>
          </div>
        </div>
      </AnimatedDiv>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-12">
          <AnimatedDiv delay={0.2}>
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Zap className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-bold tracking-tight font-headline">{labels.practicalAbilitiesTitle}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {skill.practicalAbilities.map((ability, index) => (
                  <AbilityCard key={ability.title} ability={ability} index={index} />
                ))}
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv delay={0.4}>
            <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="text-primary w-5 h-5" />
                {labels.implementationTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {labels.implementationDesc}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Clean Code
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {labels.performanceOpt}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {labels.scalableArch}
                </div>
              </div>
            </div>
          </AnimatedDiv>
        </div>

        {/* Right Column: CTA */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <SpotlightCard className="p-8 bg-secondary/50 border-primary/20 space-y-6">
            <h3 className="text-xl font-bold font-headline">{labels.interestedTechTitle}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {labels.interestedTechDesc}
            </p>
            <Button asChild className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
              <Link href="/contact">
                {labels.workTogether} <Rocket className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </SpotlightCard>

          <div className="px-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expertise Level</h4>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[95%] shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
              <span>FUNDAMENTALS</span>
              <span className="text-primary">MASTER</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatedDiv delay={0.5} className="text-center mt-12 py-12 border-t border-white/5">
        <Button asChild variant="ghost" className="hover:bg-primary/5 hover:text-primary transition-all">
          <Link href={`/skills/${skill.category}`}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            {labels.exploreCategory}
          </Link>
        </Button>
      </AnimatedDiv>
    </div>
  );
}

// ── Page entry point ──────────────────────────────────────────────────────────

export default async function SkillsSlugPage({ params }: SlugPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('skills');

  // Check if slug matches a category
  const category = skillCategories.find(c => c.id === slug);
  if (category) {
    const catSkills = getSkillsByCategory(category.id);
    const categoryLabels: CategoryLabels = {
      backToAreas: t('back_to_areas'),
      skillsCount: t('skills_count', { count: catSkills.length }),
      viewDetails: t('view_details'),
      businessValueLabel: t('business_value_label'),
      interestedAreaTitle: t('interested_area_title'),
      interestedAreaDesc: t('interested_area_desc', { areaName: category.name.toLowerCase() }),
      contactBtn: t('contact_btn'),
      allAreasBtn: t('all_areas_btn'),
    };
    return <CategoryDetailPage category={category} labels={categoryLabels} />;
  }

  // Otherwise treat as an individual skill
  const skill = skills.find(s => s.slug === slug);
  if (!skill) {
    notFound();
  }

  const parentCategory = skillCategories.find(c => c.id === skill.category);
  const skillLabels: SkillLabels = {
    backToCategory: parentCategory
      ? t('back_to_category', { categoryName: parentCategory.name })
      : t('back_to_stack'),
    specializedBadge: t('specialized_badge', { category: skill.category }),
    practicalAbilitiesTitle: t('practical_abilities_title'),
    implementationTitle: t('implementation_title', { skillName: skill.name }),
    implementationDesc: t('implementation_desc', { skillName: skill.name }),
    performanceOpt: t('performance_opt'),
    scalableArch: t('scalable_arch'),
    interestedTechTitle: t('interested_tech_title'),
    interestedTechDesc: t('interested_tech_desc', { skillName: skill.name }),
    workTogether: t('work_together'),
    exploreCategory: parentCategory
      ? t('explore_category', { categoryName: parentCategory.name })
      : t('explore_all_tech'),
  };

  return <SkillDetailPage skill={skill} labels={skillLabels} />;
}
