import { skills, PracticalAbility } from "@/lib/skills";
import { notFound } from "next/navigation";
import * as React from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Zap, Rocket, Star } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

interface SkillPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);

  if (!skill) {
    return {
      title: 'Habilidad no encontrada',
    };
  }

  return {
    title: `Dominio Técnico en ${skill.name} | Ingeniero de Software Ángel Nereira`,
    description: skill.description,
  };
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


export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);

  if (!skill) {
    notFound();
  }

  const SkillIcon = skill.icon;

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* Header / Hero Section for Skill */}
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
          <Link
            href="/skills"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Stack Tecnológico
          </Link>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-50" />
            <div className="relative bg-secondary/50 backdrop-blur-md text-primary p-6 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10">
              <SkillIcon className="h-16 w-16" />
            </div>
          </div>

          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-widest text-[10px] font-bold">
              {skill.category} specialized
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Practical Implementation */}
        <div className="lg:col-span-8 space-y-12">
          <AnimatedDiv delay={0.2}>
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Zap className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-bold tracking-tight font-headline">Capacidades Prácticas & Aplicación</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {skill.practicalAbilities.map((ability, index) => (
                  <AbilityCard key={ability.title} ability={ability} index={index} />
                ))}
              </div>
            </div>
          </AnimatedDiv>

          {/* Implementation section */}
          <AnimatedDiv delay={0.4}>
            <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="text-primary w-5 h-5" />
                ¿Cómo implemento {skill.name}?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Utilizo {skill.name} como pieza fundamental en el desarrollo de <strong>Sago One</strong> y <strong>Plenty Market</strong>.
                Mi enfoque no es solo el uso básico, sino la optimización de recursos, seguridad y escalabilidad, asegurando que
                cada línea de código aporte valor real al negocio y una experiencia superior al usuario final.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Clean Code
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Optimización de Performance
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Arquitectura Escalable
                </div>
              </div>
            </div>
          </AnimatedDiv>
        </div>

        {/* Right Column: CTA & Context */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <SpotlightCard className="p-8 bg-secondary/50 border-primary/20 space-y-6">
            <h3 className="text-xl font-bold font-headline">¿Interesado en esta tecnología?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Si estás buscando un experto que domine {skill.name} para llevar tu proyecto al siguiente nivel de ingeniería, estoy disponible para consultoría técnica.
            </p>
            <Button asChild className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
              <Link href="/contact">
                Work Together <Rocket className="ml-2 w-5 h-5" />
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
          <Link href="/skills">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Explorar todas las tecnologías
          </Link>
        </Button>
      </AnimatedDiv>
    </div>
  );
}
