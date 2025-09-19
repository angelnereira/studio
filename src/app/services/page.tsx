import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, Cloud, Code, GitMerge, Building, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Páginas Web para PYMES",
    description: "Soluciones web accesibles, optimizadas y modernas para pequeñas y medianas empresas que buscan una presencia digital de impacto.",
    technologies: ["Next.js", "React", "Vercel", "SEO"],
    deliverable: "Sitio web profesional, rápido y production-ready.",
    icon: <Code />
  },
  {
    title: "Soluciones Enterprise",
    description: "Desarrollo de aplicaciones escalables, integraciones en la nube y optimización de procesos con un enfoque DevOps para grandes empresas.",
    technologies: ["Google Cloud", "Firebase", "Docker", "CI/CD"],
    deliverable: "Arquitectura cloud robusta e implementación técnica.",
    icon: <Building />
  },
  {
    title: "Software a Medida",
    description: "Aplicaciones personalizadas y flujos de automatización diseñados para resolver necesidades específicas y optimizar operaciones.",
    technologies: ["Node.js", "Python", "APIs", "Cloud Functions"],
    deliverable: "Solución de software adaptada a tus requerimientos.",
    icon: <Puzzle />
  },
  {
    title: "Consultoría y Mentoría",
    description: "Guía estratégica en arquitectura cloud, DevOps y desarrollo profesional para equipos y personas que buscan crecer.",
    focus: ["Arquitectura de Software", "Mejores Prácticas", "Carrera en Tech"],
    deliverable: "Plan de desarrollo y acompañamiento técnico.",
    icon: <GitMerge />
  }
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Servicios y Soluciones</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ofreciendo soluciones técnicas, desde webs para PYMES hasta complejas arquitecturas empresariales, para transformar tus ideas en realidad.
          </p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                {React.cloneElement(service.icon, { className: "h-6 w-6" })}
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-headline">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Entregable Clave:</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>{service.deliverable}</span>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{service.technologies ? "Tecnologías:" : "Enfoque:"}</h4>
                <div className="flex flex-wrap gap-2">
                  {(service.technologies || service.focus)?.map((item) => (
                    <Badge key={item} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild className="w-full">
                  <Link href="/contact">Conversa conmigo</Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
