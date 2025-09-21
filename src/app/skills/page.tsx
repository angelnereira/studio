import { skills } from '@/lib/skills';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import * as React from 'react';
import Link from 'next/link';
import { SpotlightCard } from '@/components/spotlight-card';
import { Card } from '@/components/ui/card';

export default function SkillsPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
          Stack Tecnológico
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Un conjunto de herramientas versátil y moderno para construir
          soluciones de software robustas, escalables y de alto rendimiento,
          desde el desarrollo web hasta la infraestructura en la nube y la IA.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <TooltipProvider>
          {skills.map(skill => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <Link href={`/skills/${skill.slug}`} className="group block h-full">
                   <SpotlightCard className="flex flex-col items-center justify-center space-y-3 rounded-lg bg-secondary p-6 shadow-sm transition-all duration-300 hover:bg-secondary/80 hover:-translate-y-1.5 hover:shadow-primary/10 h-full">
                      <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                        {React.cloneElement(skill.icon as React.ReactElement, {
                          className: 'h-12 w-12',
                        })}
                      </div>
                      <span className="font-semibold text-center text-sm">
                        {skill.name}
                      </span>
                   </SpotlightCard>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-center bg-secondary border-primary/30 text-foreground">
                <p className="font-bold mb-2">{skill.name}</p>
                <p className="text-xs text-muted-foreground">
                  {skill.description}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
