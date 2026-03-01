
import { skills } from '@/lib/skills';
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
import { ArrowRight } from 'lucide-react';
import { AnimatedDiv } from '@/components/animated-div';

export default function SkillsPage() {
  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Habilidades y Stack Tecnológico
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Más que una lista de tecnologías, esta es mi caja de herramientas para resolver problemas complejos. Cada habilidad y herramienta se aplica con un propósito: construir soluciones eficientes, escalables y centradas en el usuario que generan un impacto real.
          </p>
        </div>
      </AnimatedDiv>

      <div className="grid gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <AnimatedDiv key={skill.slug} delay={0.1 * (index + 1)}>
              <Link
                href={`/skills/${skill.slug}`}
                className="group block h-full"
              >
                <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
                  <CardHeader className="flex-row items-center gap-4 p-5 pb-2">
                    <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary text-lg font-bold">
                        {skill.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-5 pt-2">
                    <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                      {skill.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold text-primary/80 group-hover:text-primary transition-colors duration-300"
                    >
                      Ver detalles <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </SpotlightCard>
              </Link>
            </AnimatedDiv>
          );
        })}
      </div>
    </>
  );
}
