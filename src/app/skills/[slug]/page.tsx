import { skills, Skill, PracticalAbility } from "@/lib/skills";
import { notFound } from "next/navigation";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const skill = skills.find((s) => s.slug === params.slug);

  if (!skill) {
    return {
      title: 'Habilidad no encontrada',
    };
  }

  return {
    title: `Habilidad en ${skill.name} | Ángel Nereira`,
    description: skill.description,
  };
}

const AbilityCard = ({ ability }: { ability: PracticalAbility }) => (
    <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
        <CardHeader className="flex-row items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            {React.cloneElement(ability.icon, { className: 'w-6 h-6' })}
        </div>
        <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary text-lg">
            {ability.title}
        </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">{ability.description}</p>
        </CardContent>
    </SpotlightCard>
);


export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = skills.find((s) => s.slug === params.slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-24 lg:py-32">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
        <div className="bg-primary/10 text-primary p-4 rounded-full">
            {React.cloneElement(skill.icon, { className: "h-10 w-10" })}
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Dominio en {skill.name}</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {skill.description}
        </p>
      </div>

      {/* Practical Abilities */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-3xl font-headline mb-8">Capacidades Prácticas</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skill.practicalAbilities.map((ability) => (
                <AbilityCard key={ability.title} ability={ability} />
            ))}
        </div>
      </div>
      
       <div className="text-center mt-16">
            <Button asChild variant="outline">
                <Link href="/skills">
                    <ArrowLeft className="mr-2" />
                    Volver a todas las Habilidades
                </Link>
            </Button>
        </div>

    </div>
  );
}
