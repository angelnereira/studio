
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
    <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24 lg:py-32">
      <AnimatedDiv>
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
      </AnimatedDiv>

      <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <AnimatedDiv key={skill.slug} delay={0.1 * (index + 1)}>
            <Link
              href={`/skills/${skill.slug}`}
              className="group block h-full"
            >
              <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    {React.cloneElement(skill.icon as React.ReactElement, {
                      className: 'w-6 h-6',
                    })}
                  </div>
                  <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary text-lg">
                    {skill.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-4">
                    {skill.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    className="p-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
                  >
                    Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </SpotlightCard>
            </Link>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
