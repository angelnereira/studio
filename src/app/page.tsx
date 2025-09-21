
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, Code, GitBranch, Github, Linkedin, Server, Terminal, Twitter, BrainCircuit, BotMessageSquare, Languages, Mic, Music, FunctionSquare, Gitlab, Download, Code2, Clipboard, ClipboardCheck, FileText } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SpotlightCard } from "@/components/spotlight-card";
import { ServicesCarousel } from "@/components/services-carousel";
import { generateCv, GenerateCvInput } from "@/ai/flows/generate-cv";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { skills } from "@/lib/skills";

const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

const projects = [
  {
    title: "App Web de Control de Acceso",
    id: "access-control",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 4.5V3M19.5 19.5l-1.06-1.06M4.5 19.5l1.06-1.06M12 19.5V21M4.5 4.5l1.06 1.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    description: "Plataforma web desplegada en Vercel para la gestión de acceso de personal en tiempo real. Permite registrar entradas y salidas, generar reportes y administrar perfiles de empleados de forma segura.",
    technologies: ["Next.js", "TypeScript", "Firebase Auth", "Firestore", "Vercel"],
    problem: "Digitalizar y automatizar el control de asistencia de empleados, eliminando procesos manuales y mejorando la seguridad.",
    impact: "Reducción del tiempo administrativo en un 40% y generación de reportes de asistencia precisos al instante.",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Dashboard de Ventas en Tiempo Real",
    id: "sales-dashboard",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Dashboard interactivo que visualiza métricas de ventas en tiempo real, conectándose directamente a la base de datos de producción. Permite a los gerentes tomar decisiones basadas en datos actualizados al segundo.",
    technologies: ["Next.js", "Recharts", "PostgreSQL", "Node.js", "Vercel"],
    problem: "La gerencia carecía de visibilidad inmediata sobre el rendimiento de las ventas, basándose en reportes diarios o semanales.",
    impact: "Mejora en la capacidad de reacción a tendencias del mercado y optimización de estrategias de venta con un ciclo de feedback inmediato.",
    liveUrl: "#",
  },
  {
    title: "Gestión de Planilla con Cálculos en Tiempo Real",
    id: "payroll-management",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
       <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 17h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    description: "Aplicación web para la administración de planillas que realiza cálculos de salarios, deducciones e impuestos en tiempo real a medida que se ingresan los datos. Simplifica un proceso complejo y propenso a errores.",
    technologies: ["React", "Node.js", "TypeScript", "Docker", "Google Cloud"],
    problem: "El cálculo manual de la planilla era lento, ineficiente y generaba errores costosos para la empresa.",
    impact: "Automatización completa del cálculo de planillas, garantizando precisión y cumplimiento, y liberando horas de trabajo del personal de RRHH.",
    githubUrl: "#",
  },
   {
    title: "Pipeline de Despliegue Automatizado (CI/CD)",
    id: "ci-cd-pipeline",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
       <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18a6 6 0 0 1-6-6h12a6 6 0 0 1-6 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Implementación de un pipeline de CI/CD para una aplicación de microservicios, automatizando las pruebas, construcción de imágenes Docker y despliegue en un clúster de Kubernetes.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Google Cloud Build"],
    problem: "Los despliegues manuales eran lentos, propensos a errores y requerían una ventana de mantenimiento significativa.",
    impact: "Reducción del tiempo de despliegue de horas a minutos. Aumento de la frecuencia de despliegues en un 500% con una tasa de error cercana a cero.",
    githubUrl: "#",
  },
  {
    title: "Chatbot de Servicio al Cliente con IA",
    id: "ai-chatbot",
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7v.01M9 11h.01M15 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Desarrollo de un chatbot inteligente para automatizar la atención al cliente. Integrado con una base de conocimientos y opcionalmente con WhatsApp para resolver preguntas frecuentes y escalar casos complejos a agentes humanos.",
    technologies: ["Genkit", "Dialogflow", "Node.js", "Firebase", "WhatsApp API"],
    problem: "El equipo de soporte estaba sobrecargado con consultas repetitivas, resultando en altos tiempos de espera para los clientes.",
    impact: "Automatización del 70% de las consultas de primer nivel, reduciendo el tiempo de respuesta promedio en un 90% y mejorando la satisfacción del cliente.",
    liveUrl: "#",
  },
];

const testimonials = [
  {
    name: "Líder Técnico",
    title: "Global Tech Company",
    quote: "Ángel tiene una capacidad única para entender arquitecturas complejas y proponer soluciones eficientes. Su curiosidad y empuje son un gran activo para cualquier equipo.",
    avatar: testimonialImages.test1,
  },
  {
    name: "Gerente de Producto",
    title: "Startup Innovadora",
    quote: "La mentalidad de Ángel orientada al producto y su enfoque en las mejores prácticas de desarrollo fueron clave para entregar una solución robusta a tiempo. Su profesionalismo es excepcional.",
    avatar: testimonialImages.test2,
  },
];

const aboutMe = `Soy un ingeniero de software panameño con una visión clara: impulsar la transformación tecnológica en Panamá y más allá, creando soluciones innovadoras, eficientes y de alto impacto. Mi trayectoria es una fusión poco común entre la ingeniería de sonido y la ingeniería de software. Esta dualidad me ha enseñado a abordar los problemas con la precisión técnica de un ingeniero y la creatividad de un artista. Mi filosofía es simple: "Solucionar problemas para disfrutar la vida". Aplico esta mentalidad para desarrollar software robusto, escalable y seguro que genera valor real. Mi objetivo es ser un pionero en la innovación tecnológica de Panamá, con un enfoque en software, ciencia de datos e inteligencia artificial, siempre con una proyección global. Apuesto por la inclusión y el empoderamiento de las personas a través de la tecnología.`;


function CvGeneratorButton() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [cvContent, setCvContent] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCvContent("");
    try {
      const cvInput: GenerateCvInput = {
        about: aboutMe,
        skills: skills.map(({ name, description }) => ({ name, description })),
        projects: projects.map(({ title, description, technologies, impact }) => ({ title, description, technologies, impact })),
        testimonials: testimonials.map(({ name, title, quote }) => ({ name, title, quote })),
      };
      const result = await generateCv(cvInput);
      setCvContent(result.cvContent);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar el CV. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopy = () => {
    if (cvContent) {
      navigator.clipboard.writeText(cvContent);
      setCopied(true);
      toast({ title: "Copiado al portapapeles!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" onClick={handleGenerate}>
          <Download className="mr-2" />
          Generar CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl h-5/6 flex flex-col">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle>CV Generado por IA</DialogTitle>
          {cvContent && (
             <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              <span className="sr-only">Copiar</span>
            </Button>
          )}
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4 -mr-4">
          {isGenerating && !cvContent && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2">
                <BrainCircuit className="h-8 w-8 animate-pulse text-primary" />
                <p className="text-muted-foreground">Generando CV dinámico...</p>
              </div>
            </div>
          )}
          {cvContent ? (
             <div className="prose prose-sm dark:prose-invert max-w-none">
               <p style={{ whiteSpace: 'pre-wrap' }}>{cvContent}</p>
             </div>
          ) : !isGenerating && (
             <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>Listo para generar</AlertTitle>
              <AlertDescription>
                El CV se generará aquí.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-secondary/50 overflow-hidden">
          <div className="container px-4 md:px-6 text-center">
             <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                <span className="block mb-2">Angel Nereira</span>
                <div className="relative w-full overflow-hidden">
                  <div className="flex animate-marquee whitespace-nowrap">
                    <span className="block text-primary mx-4">Ingeniero de Software y DevOps</span>
                    <span className="block text-primary mx-4">Ingeniero de Software y DevOps</span>
                    <span className="block text-primary mx-4">Ingeniero de Software y DevOps</span>
                    <span className="block text-primary mx-4">Ingeniero de Software y DevOps</span>
                  </div>
                </div>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6">
                De la Idea a la Solución Tecnológica
            </p>
            <p className="mt-4 font-semibold text-lg text-primary/80">"Solucionar problemas para disfrutar la vida."</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/services">Explorar Servicios</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">Ver Proyectos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Carousel Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Mis Servicios</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Soluciones de software a la medida para potenciar tu negocio. Desde aplicaciones web hasta inteligencia artificial.
                </p>
              </div>
            </div>
            <div className="py-12">
               <ServicesCarousel />
            </div>
             <div className="text-center">
                <Button asChild variant="outline">
                    <Link href="/services">
                        Ver todos los servicios <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Sobre Mí</h2>
                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Soy un ingeniero de software panameño con una visión clara: impulsar la transformación tecnológica en Panamá y más allá, creando soluciones innovadoras, eficientes y de alto impacto.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl pt-8 text-lg text-center text-foreground/80 space-y-4">
                <p>
                    Mi trayectoria es una fusión poco común entre la ingeniería de sonido y la ingeniería de software. Esta dualidad me ha enseñado a abordar los problemas con la precisión técnica de un ingeniero y la creatividad de un artista. Mi filosofía es simple: "Solucionar problemas para disfrutar la vida". Aplico esta mentalidad para desarrollar software robusto, escalable y seguro que genera valor real.
                </p>
                <p>
                    Mi objetivo es ser un pionero en la innovación tecnológica de Panamá, con un enfoque en software, ciencia de datos e inteligencia artificial, siempre con una proyección global. Apuesto por la inclusión y el empoderamiento de las personas a través de la tecnología.
                </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Stack Tecnológico</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un conjunto de herramientas versátil para resolver problemas reales, desde el desarrollo web hasta la infraestructura en la nube.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <TooltipProvider>
              {skills.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-secondary p-6 shadow-sm transition-all duration-300 hover:bg-secondary/80 hover:-translate-y-1">
                      <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                      <span className="font-medium text-center">{skill.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-center bg-secondary border-primary/30 text-foreground">
                    <p className="font-bold mb-2">{skill.name}</p>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Proyectos Destacados</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Una selección de proyectos que demuestran mi enfoque en la resolución de problemas y la aplicación de tecnología.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl justify-center gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <SpotlightCard className="group relative flex flex-col overflow-hidden transition-all duration-600 ease-geist w-full bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl cursor-pointer">
                        <CardHeader className="flex-row items-center gap-4">
                          {project.logo && (
                            <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                               <project.logo className="w-6 h-6" />
                            </div>
                          )}
                          <CardTitle className="transition-colors duration-300 ease-geist group-hover:text-primary">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto">
                           <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                              ))}
                              {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
                          </div>
                        </CardFooter>
                    </SpotlightCard>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                         {project.logo && (
                            <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                               <project.logo className="w-8 h-8" />
                            </div>
                          )}
                          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                      </div>
                      <DialogDescription>{project.description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Problema Resuelto</h4>
                          <p className="text-sm text-muted-foreground">{project.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Impacto Generado</h4>
                          <p className="text-sm text-muted-foreground">{project.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Tecnologías Utilizadas</h4>
                           <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                              ))}
                          </div>
                        </div>
                    </div>
                     <div className="flex justify-end gap-2 mt-4">
                        {project.githubUrl && <Button variant="ghost" size="sm" asChild><Link href={project.githubUrl}><Github className="mr-2 h-4 w-4" /> Código Fuente</Link></Button>}
                        {project.liveUrl && <Button asChild size="sm"><Link href={project.liveUrl}>Ver Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <SpotlightCard key={testimonial.name} className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <Avatar>
                        <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardFooter>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                ¿Buscas un desarrollador panameño para tu equipo global?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Colaboremos en soluciones que escalen globalmente. Estoy disponible para nuevos desafíos y oportunidades.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <SpotlightCard className="group relative rounded-md p-0 overflow-hidden bg-transparent border-none shadow-none">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Conversemos sobre tu proyecto</Link>
                  </Button>
               </SpotlightCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    

    

    
