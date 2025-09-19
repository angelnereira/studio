import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, Cloud, Code, GitMerge, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Desarrollo Web Moderno",
    description: "Aplicaciones Next.js, integraciones cloud, y arquitectura escalable para llevar tu idea a producción.",
    technologies: ["Next.js", "TypeScript", "Firebase", "Google Cloud"],
    deliverable: "Aplicaciones web production-ready con CI/CD",
    icon: <Code />
  },
  {
    title: "Consultoría en Cloud",
    description: "Diseño de arquitecturas, migración a la nube, y optimización de costos para una infraestructura eficiente.",
    technologies: ["Google Cloud", "Firebase", "Docker", "Serverless"],
    deliverable: "Estrategia cloud e implementación técnica",
    icon: <Cloud />
  },
  {
    title: "Automatización y DevOps",
    description: "Pipelines de CI/CD, containerización y automatización de despliegues para acelerar tu ciclo de desarrollo.",
    technologies: ["GitHub Actions", "Docker", "Git", "Cloud Functions"],
    deliverable: "Flujos automatizados e infrastructure as code",
    icon: <GitMerge />
  },
  {
    title: "Mentoría Técnica",
    description: "Guía personalizada en desarrollo web, mejores prácticas, y cómo avanzar en tu carrera tecnológica.",
    focus: ["Desarrollo profesional", "Transición a roles senior", "Tecnologías modernas"],
    deliverable: "Plan de desarrollo personalizado y mentoring 1:1",
    icon: <UserCheck />
  }
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Servicios Profesionales</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ofreciendo soluciones técnicas para transformar tus ideas en realidad digital.
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
