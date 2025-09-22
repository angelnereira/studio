
import { services, Service, ServicePackage } from "@/lib/services";
import { notFound } from "next/navigation";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedDiv } from "@/components/animated-div";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateStaticParams() {
  return services.filter(s => s.published).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((p) => p.slug === params.slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  return {
    title: `${service.title} | Ángel Nereira`,
    description: service.shortDescription,
  };
}

const PackageCard = ({ pkg, serviceSlug }: { pkg: ServicePackage, serviceSlug: string }) => (
    <SpotlightCard className={`group relative flex flex-col transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl ${pkg.name === 'Profesional' ? 'border-primary shadow-primary/20 shadow-lg' : ''}`}>
        <CardHeader>
        <CardTitle className={pkg.name === 'Profesional' ? 'text-primary' : ''}>{pkg.name}</CardTitle>
        <CardDescription>{pkg.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-6">
        <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">
            ${pkg.price.toLocaleString()}
            {pkg.priceSuffix && <span className="text-sm font-normal text-muted-foreground">{pkg.priceSuffix}</span>}
            </p>
            {pkg.originalPrice && (
                <p className="text-xl font-normal text-muted-foreground line-through">${pkg.originalPrice.toLocaleString()}</p>
            )}
        </div>
        <ul className="space-y-3 text-sm">
            {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
            </li>
            ))}
        </ul>
        </CardContent>
        <CardFooter>
        <Button asChild className="w-full" variant={pkg.name === 'Profesional' ? 'default' : 'outline'}>
            <Link href={`/calculator?service=${serviceSlug}&plan=${pkg.name.toLowerCase()}`}>
                {pkg.cta} <ArrowRight className="ml-2" />
            </Link>
        </Button>
        </CardFooter>
  </SpotlightCard>
);

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug && s.published);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <AnimatedDiv>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="bg-primary/10 text-primary p-4 rounded-full">
              <service.icon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{service.title}</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {service.fullDescription}
          </p>
           <div className="flex flex-wrap gap-2 justify-center">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
        </div>
      </AnimatedDiv>

      {/* Packages */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {service.packages.map((pkg, index) => (
          <AnimatedDiv key={pkg.name} delay={0.1 * (index + 1)}>
            <PackageCard pkg={pkg} serviceSlug={service.slug} />
          </AnimatedDiv>
        ))}
      </div>
      
      {/* Add-ons */}
      {service.addOns && service.addOns.length > 0 && (
         <AnimatedDiv delay={0.3}>
           <div className="mt-16">
              <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tighter font-headline">Complementos Opcionales</h2>
                  <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
                      Añade funcionalidades extra a tu proyecto para un mayor impacto.
                  </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                  {service.addOns.map((addOn) => (
                      <SpotlightCard key={addOn.name} className="p-4 flex justify-between items-center bg-secondary/50 border border-white/10 hover:border-primary/50">
                          <div>
                              <h3 className="font-semibold">{addOn.name}</h3>
                              <p className="text-sm text-muted-foreground">{addOn.description}</p>
                          </div>
                          <div className="text-right flex items-baseline gap-2">
                             <p className="font-bold text-primary">
                               +${addOn.price.toLocaleString()}
                               {addOn.priceSuffix && <span className="text-sm font-normal text-muted-foreground">{addOn.priceSuffix}</span>}
                              </p>
                              {addOn.originalPrice && (
                                  <p className="text-sm font-normal text-muted-foreground line-through">
                                      +${addOn.originalPrice.toLocaleString()}
                                  </p>
                              )}
                          </div>
                      </SpotlightCard>
                  ))}
              </div>
           </div>
         </AnimatedDiv>
      )}

       <AnimatedDiv delay={0.5} className="text-center mt-16 p-8 bg-secondary/50 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tighter font-headline">¿No encuentras lo que buscas?</h2>
            <p className="max-w-[600px] mx-auto mt-2 text-muted-foreground">
                Estos paquetes son puntos de partida. Cada proyecto es único. Contáctame para crear una solución 100% a tu medida.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/contact?subject=Proyecto a Medida">Crear Plan Personalizado</Link>
            </Button>
        </AnimatedDiv>

    </>
  );
}
