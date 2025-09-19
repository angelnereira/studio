import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check, Building, Puzzle, Code2, Bot, Database, KeyRound, Briefcase, ShoppingCart, Receipt, BrainCircuit, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/services";

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Servicios y Soluciones</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Soluciones de software confiables y adaptadas a la era digital, desde sitios web para PYMES hasta sistemas enterprise integrados con IA en la nube.
          </p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col hover:shadow-xl transition-shadow bg-card">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                {React.cloneElement(service.icon, { className: "h-6 w-6" })}
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
                <CardDescription className="text-sm">{service.shortDescription}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Stack Principal</h4>
                <div className="flex flex-wrap gap-2">
                  {service.architecture.recommendedStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
               <div>
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Entregables Clave</h4>
                <ul className="space-y-1">
                 {service.deliverables.slice(0, 2).map((item) => (
                    <li key={item} className="text-sm text-foreground flex items-start gap-2">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 pt-4">
              <div className="w-full">
                <p className="text-xs text-muted-foreground">Desde</p>
                <p className="text-2xl font-bold text-primary">${service.pricing.startingPrice.toLocaleString()}<span className="text-sm font-normal text-muted-foreground"> USD</span></p>
              </div>
              <Button asChild className="w-full">
                <Link href={`/contact?service=${service.slug}`}>Solicitar cotización</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        <div className="text-center mt-16">
            <h2 className="text-2xl font-bold tracking-tighter font-headline">¿No encuentras lo que buscas?</h2>
            <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
                Cada proyecto es único. Si tienes una idea o un problema que no encaja en estas categorías, contáctame. Me especializo en crear soluciones a medida.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact">Hablemos de tu proyecto</Link>
            </Button>
        </div>
    </div>
  );
}
