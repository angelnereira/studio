import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { services, Service } from "@/lib/services";
import { SpotlightCard } from "@/components/spotlight-card";

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Soluciones a la Medida de tu Negocio</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Desde MVPs para startups hasta sistemas empresariales con IA. Transformamos tus ideas en software robusto y escalable que genera resultados.
          </p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {services.filter(s => s.published).map((service: Service) => {
          const startingPrice = service.packages[0].price;
          const priceSuffix = service.packages[0].priceSuffix || '';

          return (
            <SpotlightCard key={service.slug} className="group relative flex flex-col transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                  {React.cloneElement(service.icon, { className: "h-6 w-6" })}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-headline transition-colors duration-300 ease-geist group-hover:text-primary">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.shortDescription}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Planes desde</h4>
                    <p className="text-2xl font-bold text-primary">${startingPrice.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">{priceSuffix}</span></p>
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Ideal para</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link href={`/services/${service.slug}`}>
                     Ver Detalles
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/calculator?service=${service.slug}`}>
                    Cotización Rápida <ArrowRight className="ml-2"/>
                  </Link>
                </Button>
              </CardFooter>
            </SpotlightCard>
          );
        })}
      </div>
        <div className="text-center mt-16 p-8 bg-secondary/50 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tighter font-headline">¿Tienes un Reto Único?</h2>
            <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
                Cada proyecto es un mundo. Si tu idea no encaja perfectamente en estas categorías, es una excelente señal. Me especializo en crear soluciones a medida para problemas complejos.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact?subject=Proyecto a Medida">Hablemos de tu Proyecto</Link>
            </Button>
        </div>
    </div>
  );
}
