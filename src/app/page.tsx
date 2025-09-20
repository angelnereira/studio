import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, Code, GitBranch, Github, Linkedin, Server, Terminal, Twitter, BrainCircuit, BotMessageSquare, Languages, Mic, Music, FunctionSquare, Gitlab, Download } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');
const projectImages = {
  proj1: PlaceHolderImages.find(p => p.id === 'project-1'),
  proj2: PlaceHolderImages.find(p => p.id === 'project-2'),
  proj3: PlaceHolderImages.find(p => p.id === 'project-3'),
  proj4: PlaceHolderImages.find(p => p.id === 'project-4'),
  proj5: PlaceHolderImages.find(p => p.id === 'project-5'),
};
const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

const skills = [
  { name: "Python", icon: <Code />, description: "Versátil y potente, ideal para backend, análisis de datos y scripts de automatización. Su sintaxis limpia permite un desarrollo rápido y mantenible." },
  { name: "TypeScript", icon: <Code />, description: "Añade seguridad de tipos a JavaScript, lo que reduce errores en tiempo de ejecución y mejora la colaboración en proyectos grandes. Imprescindible para aplicaciones robustas." },
  { name: "Next.js", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-nextjs"><path d="M9 15V9l7.7 10.6A9 9 0 1 1 8.3 4.2"/></svg>, description: "Framework de React para producción. Permite crear aplicaciones web ultrarrápidas con renderizado en el servidor (SSR) y generación de sitios estáticos (SSG), mejorando el SEO y la performance." },
  { name: "Node.js", icon: <Server />, description: "Entorno de ejecución para JavaScript en el backend. Su modelo asíncrono es perfecto para construir APIs rápidas y escalables que manejan múltiples conexiones simultáneamente." },
  { name: "Google Cloud", icon: <Cloud />, description: "Plataforma en la nube con un ecosistema completo de servicios (Compute Engine, Cloud Functions, AI Platform) que permiten construir y desplegar aplicaciones escalables y seguras." },
  { name: "Firebase", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-firebase"><path d="M4.62 16.22c-.12.48-.12.96.02 1.42.23.73.66 1.35 1.28 1.83.6.46 1.3.74 2.06.82a5.57 5.57 0 0 0 2.22-.44l.2-.08.14-.06.13-.05c.4-.2.8-.43 1.15-.71l.1-.08c.17-.15.33-.3.48-.47L19.5 8.5 14.5 3.5 4.62 16.22Z"/><path d="m19.5 8.5-1-1-3-3-1.42-1.42c-.2-.2-.45-.36-.72-.48a4.99 4.99 0 0 0-2.2-0l-.16.03-.18.04-.18.05s-.1.03-.14.05L3.5 8.5l6 12 5-5-1.5-1.5-3.5 3.5-3-3L12.5 10l7-1.5Z"/></svg>, description: "Backend-como-Servicio que acelera el desarrollo. Ofrece autenticación, bases de datos en tiempo real (Firestore) y hosting, todo integrado para un despliegue rápido de MVPs." },
  { name: "Docker", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-docker"><path d="M22 12.5c0-2.2-2-3.5-4-3.5-1.2 0-2.7.9-3.5 2.1-.8-1.2-2.3-2.1-3.5-2.1-2 0-4 1.3-4 3.5 0 .9.3 2.1 1.2 3.1-1.1.4-2.2 1.5-2.2 3.4 0 2.2 2 4 4 4h8c2 0 4-1.8 4-4 0-1.9-1.1-3-2.2-3.4.9-1 1.2-2.2 1.2-3.1Z" /><path d="M5 12.5H3" /><path d="M6 15.5H3" /><path d="M6 9.5H3" /><path d="M8 6.5H6" /><path d="M9 3.5H7" /></svg>, description: "Plataforma de contenedores que empaqueta las aplicaciones y sus dependencias. Garantiza que el software se ejecute de la misma manera en cualquier entorno, eliminando el 'en mi máquina funciona'." },
  { name: "Git", icon: <GitBranch />, description: "Sistema de control de versiones distribuido. Es la herramienta fundamental para el trabajo en equipo, permitiendo gestionar cambios, experimentar en ramas y mantener un historial completo del proyecto." },
  { name: "GitHub/GitLab", icon: <Gitlab />, description: "Plataformas de hospedaje para repositorios Git que facilitan la colaboración, la revisión de código (Pull Requests) y la integración con pipelines de CI/CD." },
  { name: "CI/CD", icon: <Terminal />, description: "Prácticas de Integración y Entrega Continuas. Automatizan las pruebas y el despliegue del software, permitiendo entregas más rápidas, frecuentes y fiables." },
  { name: "Linux", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linux"><path d="M13.8 17.5c-1.2 1.2-3 2-4.8 2s-3.6-.8-4.8-2c-1.2-1.2-2-3-2-4.8s.8-3.6 2-4.8c1.2-1.2 3-2 4.8-2l7.1 7.1c.3-.2.5-.3.7-.5 1.2-1.2 2-3 2-4.8s-.8-3.6-2-4.8c-1.2-1.2-3-2-4.8-2s-3.6.8-4.8 2-2 3-2 4.8c0 1.3.4 2.6 1 3.8"/><path d="M12.5 12.5a3.5 3.5 0 1 0-5 0 3.5 3.5 0 0 0 5 0Z"/><path d="M18.8 15.2c1.2 1.2 2 3 2 4.8s-.8 3.6-2 4.8-3 2-4.8 2-3.6-.8-4.8-2c-.3-.3-.6-.6-.8-1"/></svg>, description: "Sistema operativo de código abierto, robusto y seguro. Es el estándar de facto para servidores y entornos de despliegue en la nube por su estabilidad y flexibilidad." },
  { name: "Music Production", icon: <Music />, description: "Mi lado creativo. La producción musical me ha enseñado sobre ingeniería de sonido, mezcla y masterización, habilidades que aplico para crear experiencias de usuario inmersivas y de alta calidad." },
];

const projects = [
  {
    title: "App Web de Control de Acceso",
    description: "Plataforma web desplegada en Vercel para la gestión de acceso de personal en tiempo real. Permite registrar entradas y salidas, generar reportes y administrar perfiles de empleados de forma segura.",
    technologies: ["Next.js", "TypeScript", "Firebase Auth", "Firestore", "Vercel"],
    problem: "Digitalizar y automatizar el control de asistencia de empleados, eliminando procesos manuales y mejorando la seguridad.",
    impact: "Reducción del tiempo administrativo en un 40% y generación de reportes de asistencia precisos al instante.",
    image: projectImages.proj1,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Dashboard de Ventas en Tiempo Real",
    description: "Dashboard interactivo que visualiza métricas de ventas en tiempo real, conectándose directamente a la base de datos de producción. Permite a los gerentes tomar decisiones basadas en datos actualizados al segundo.",
    technologies: ["Next.js", "Recharts", "PostgreSQL", "Node.js", "Vercel"],
    problem: "La gerencia carecía de visibilidad inmediata sobre el rendimiento de las ventas, basándose en reportes diarios o semanales.",
    impact: "Mejora en la capacidad de reacción a tendencias del mercado y optimización de estrategias de venta con un ciclo de feedback inmediato.",
    image: projectImages.proj2,
    liveUrl: "#",
  },
  {
    title: "Gestión de Planilla con Cálculos en Tiempo Real",
    description: "Aplicación web para la administración de planillas que realiza cálculos de salarios, deducciones e impuestos en tiempo real a medida que se ingresan los datos. Simplifica un proceso complejo y propenso a errores.",
    technologies: ["React", "Node.js", "TypeScript", "Docker", "Google Cloud"],
    problem: "El cálculo manual de la planilla era lento, ineficiente y generaba errores costosos para la empresa.",
    impact: "Automatización completa del cálculo de planillas, garantizando precisión y cumplimiento, y liberando horas de trabajo del personal de RRHH.",
    image: projectImages.proj3,
    githubUrl: "#",
  },
   {
    title: "Pipeline de Despliegue Automatizado (CI/CD)",
    description: "Implementación de un pipeline de CI/CD para una aplicación de microservicios, automatizando las pruebas, construcción de imágenes Docker y despliegue en un clúster de Kubernetes.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Google Cloud Build"],
    problem: "Los despliegues manuales eran lentos, propensos a errores y requerían una ventana de mantenimiento significativa.",
    impact: "Reducción del tiempo de despliegue de horas a minutos. Aumento de la frecuencia de despliegues en un 500% con una tasa de error cercana a cero.",
    image: projectImages.proj4,
    githubUrl: "#",
  },
  {
    title: "Chatbot de Servicio al Cliente con IA",
    description: "Desarrollo de un chatbot inteligente para automatizar la atención al cliente. Integrado con una base de conocimientos y opcionalmente con WhatsApp para resolver preguntas frecuentes y escalar casos complejos a agentes humanos.",
    technologies: ["Genkit", "Dialogflow", "Node.js", "Firebase", "WhatsApp API"],
    problem: "El equipo de soporte estaba sobrecargado con consultas repetitivas, resultando en altos tiempos de espera para los clientes.",
    impact: "Automatización del 70% de las consultas de primer nivel, reduciendo el tiempo de respuesta promedio en un 90% y mejorando la satisfacción del cliente.",
    image: projectImages.proj5,
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-sm bg-transparent border-primary/50 text-primary">Software Engineer | Panamá 🇵🇦</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Ángel Nereira
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Construyendo soluciones escalables que transforman datos en impacto global.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">¿Hablamos?</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a href="/Angel_Nereira_CV.pdf" download>
                      <Download className="mr-2" />
                      Descargar CV
                    </a>
                  </Button>
                </div>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                  <Languages className="h-5 w-5" />
                  <span>Español (Nativo)</span>
                  <span>|</span>
                  <span>English (Advanced)</span>
                </div>
              </div>
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt="Ángel Nereira"
                  data-ai-hint="professional headshot"
                  width={400}
                  height={400}
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full lg:order-last border-4 border-secondary"
                />
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
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
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
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
                    <div className="group relative flex flex-col items-center justify-center space-y-2 rounded-lg bg-secondary/70 p-6 shadow-sm transition-all duration-300 ease-geist backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                      <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                      <span className="font-medium text-center text-foreground">{skill.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-center bg-secondary border-primary/30 text-foreground">
                    <p className="font-bold mb-2">{skill.name}</p>
                    <p>{skill.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Proyectos Destacados</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Una selección de proyectos que demuestran mi enfoque en la resolución de problemas y la aplicación de tecnología.
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-1 py-12">
              {projects.map((project) => (
                <Card key={project.title} className="group relative flex flex-col md:flex-row overflow-hidden transition-all duration-600 ease-geist w-full bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                  {project.image && (
                    <div className="w-full md:w-1/3 aspect-video overflow-hidden">
                      <Image
                        src={project.image.imageUrl}
                        alt={project.image.description}
                        data-ai-hint={project.image.imageHint}
                        width={450}
                        height={250}
                        className="w-full h-full object-cover transition-transform duration-600 ease-geist group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between p-6 w-full md:w-2/3">
                    <div>
                      <CardTitle className="mb-2 transition-colors duration-300 ease-geist group-hover:text-primary">{project.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <CardDescription className="mb-4">{project.description}</CardDescription>
                      <div>
                        <h4 className="font-semibold text-sm">Problema Resuelto</h4>
                        <p className="text-sm text-muted-foreground mb-2">{project.problem}</p>
                        <h4 className="font-semibold text-sm">Impacto</h4>
                        <p className="text-sm text-muted-foreground">{project.impact}</p>
                      </div>
                    </div>
                    <CardFooter className="flex justify-start p-0 pt-4 mt-auto">
                      {project.liveUrl && <Button asChild size="sm"><Link href={project.liveUrl}>Ver Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
                      {project.githubUrl && <Button variant="ghost" size="sm" asChild><Link href={project.githubUrl}><Github className="mr-2 h-4 w-4" /> Código Fuente</Link></Button>}
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="relative transition-all duration-600 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
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
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
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
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">Conversemos sobre tu proyecto</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
