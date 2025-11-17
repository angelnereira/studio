
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { services, Service } from "@/lib/services";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedDiv } from "@/components/animated-div";

export default function ServicesPage() {
  return (
    <>
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Soluciones Empresariales de Software</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              No solo programo, <strong>diseño soluciones completas</strong>. Desde arquitecturas SaaS multi-tenant hasta integraciones complejas con sistemas gubernamentales. Especializado en FinTech y GovTech.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Next.js · TypeScript</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">PostgreSQL · Oracle</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Google Cloud · Prisma</span>
            </div>
          </div>
        </div>
      </AnimatedDiv>
      <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
        {services.filter(s => s.published).map((service: Service, index) => {
          const startingPackage = service.packages[0];
          const startingPrice = startingPackage.price;
          const originalPrice = startingPackage.originalPrice;
          const priceSuffix = startingPackage.priceSuffix || '';

          return (
            <AnimatedDiv key={service.slug} delay={0.1 * (index + 1)}>
              <SpotlightCard className="group relative flex flex-col transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-headline transition-colors duration-300 ease-geist group-hover:text-primary">{service.title}</CardTitle>
                    <CardDescription className="text-sm">{service.shortDescription}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                      <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Planes desde</h4>
                       <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-primary">${startingPrice.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">{priceSuffix}</span></p>
                          {originalPrice && (
                            <p className="text-lg font-normal text-muted-foreground line-through">${originalPrice.toLocaleString()}</p>
                          )}
                      </div>
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
                <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/services/${service.slug}`}>
                       Ver Detalles
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href={`/calculator?service=${service.slug}`}>
                      <span className="hidden sm:inline">Cotización Rápida</span>
                      <span className="sm:hidden">Cotizar</span>
                      <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                  </Button>
                </CardFooter>
              </SpotlightCard>
            </AnimatedDiv>
          );
        })}
      </div>
        <AnimatedDiv delay={0.5} className="text-center mt-8 sm:mt-12 md:mt-16 p-6 sm:p-8 bg-secondary/50 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tighter font-headline">¿Tienes un Reto Único?</h2>
            <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
                Cada proyecto es un mundo. Si tu idea no encaja perfectamente en estas categorías, es una excelente señal. Me especializo en crear soluciones a medida para problemas complejos.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact?subject=Proyecto a Medida">Hablemos de tu Proyecto</Link>
            </Button>
        </AnimatedDiv>
    </>
  );
}
