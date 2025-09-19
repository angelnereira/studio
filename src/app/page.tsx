import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, Code, GitBranch, Github, Linkedin, Server, Terminal, Twitter, BrainCircuit, BotMessageSquare, Languages } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";

const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');
const projectImages = {
  proj1: PlaceHolderImages.find(p => p.id === 'project-1'),
  proj2: PlaceHolderImages.find(p => p.id === 'project-2'),
  proj3: PlaceHolderImages.find(p => p.id === 'project-3'),
};
const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
};

const skills = [
  { name: "Python", icon: <Code /> },
  { name: "TypeScript", icon: <Code /> },
  { name: "Next.js", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-nextjs"><path d="M9 15V9l7.7 10.6A9 9 0 1 1 8.3 4.2"/></svg> },
  { name: "Node.js", icon: <Server /> },
  { name: "Google Cloud", icon: <Cloud /> },
  { name: "Firebase", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-firebase"><path d="M4.62 16.22c-.12.48-.12.96.02 1.42.23.73.66 1.35 1.28 1.83.6.46 1.3.74 2.06.82a5.57 5.57 0 0 0 2.22-.44l.2-.08.14-.06.13-.05c.4-.2.8-.43 1.15-.71l.1-.08c.17-.15.33-.3.48-.47L19.5 8.5 14.5 3.5 4.62 16.22Z"/><path d="m19.5 8.5-1-1-3-3-1.42-1.42c-.2-.2-.45-.36-.72-.48a4.99 4.99 0 0 0-2.2-0l-.16.03-.18.04-.18.05s-.1.03-.14.05L3.5 8.5l6 12 5-5-1.5-1.5-3.5 3.5-3-3L12.5 10l7-1.5Z"/></svg> },
  { name: "Docker", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-docker"><path d="M22 12.5c0-2.2-2-3.5-4-3.5-1.2 0-2.7.9-3.5 2.1-.8-1.2-2.3-2.1-3.5-2.1-2 0-4 1.3-4 3.5 0 .9.3 2.1 1.2 3.1-1.1.4-2.2 1.5-2.2 3.4 0 2.2 2 4 4 4h8c2 0 4-1.8 4-4 0-1.9-1.1-3-2.2-3.4.9-1 1.2-2.2 1.2-3.1Z" /><path d="M5 12.5H3" /><path d="M6 15.5H3" /><path d="M6 9.5H3" /><path d="M8 6.5H6" /><path d="M9 3.5H7" /></svg> },
  { name: "Git", icon: <GitBranch /> },
  { name: "Data Science", icon: <BrainCircuit /> },
  { name: "AI/ML", icon: <BotMessageSquare /> },
  { name: "CI/CD", icon: <Terminal /> },
  { name: "APIs", icon: <Code /> },
];

const projects = [
  {
    title: "Plataforma SaaS con Enfoque Cloud",
    description: "Una plataforma SaaS multi-tenant con facturación, diseñada con arquitectura serverless en Google Cloud y Firebase.",
    technologies: ["Next.js", "Firebase", "Google Cloud", "Stripe"],
    image: projectImages.proj1,
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Dashboard de Analítica con IA",
    description: "Un panel de control que ofrece insights profundos mediante el análisis de datos con IA, procesando información en tiempo real.",
    technologies: ["React", "Node.js", "Google Cloud", "AI Platform"],
    image: projectImages.proj2,
    liveUrl: "#",
  },
  {
    title: "Pipeline de Automatización y CI/CD",
    description: "Implementación de un pipeline de CI/CD para automatizar el despliegue de aplicaciones web en Vercel y Google Cloud.",
    technologies: ["GitHub Actions", "Docker", "Git", "Terraform"],
    image: projectImages.proj3,
    githubUrl: "#",
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-sm">Software Engineer & Aspiring Data Scientist | Panamá 🇵🇦</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
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
                    <Link href="/services">Ver Servicios</Link>
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
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full lg:order-last"
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
                    Soy un desarrollador panameño apasionado por la tecnología, en transición para convertirme en un ingeniero de software y científico de datos de alto impacto.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl pt-8 text-lg text-center text-foreground/80 space-y-4">
                <p>
                    Mi carrera es una transición consciente desde el desarrollo web moderno hacia la ingeniería de software y la ciencia de datos. Combino experiencia práctica en tecnologías de vanguardia con un pensamiento crítico y analítico para resolver problemas complejos.
                </p>
                <p>
                    Mi visión es clara: contribuir en proyectos de escala global que transformen la forma en que interactuamos con los datos, la nube y la inteligencia artificial, diseñando siempre soluciones escalables, seguras y eficientes.
                </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Stack Tecnológico</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un conjunto de herramientas versátil para el desarrollo de soluciones modernas, desde la web hasta la nube y la IA.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-card p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-lg">
                  <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
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
                  Proyectos donde aplico mi conocimiento técnico para crear soluciones con impacto.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 py-12">
              {projects.map((project) => (
                <Card key={project.title} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                  {project.image && (
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      data-ai-hint={project.image.imageHint}
                      width={600}
                      height={400}
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {project.liveUrl && <Button asChild><Link href={project.liveUrl}>Ver Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
                    {project.githubUrl && <Button variant="ghost" asChild><Link href={project.githubUrl}><Github className="mr-2 h-4 w-4" /> Código</Link></Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Lo que dicen otros</h2>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
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
                ¿Buscas talento panameño para tu equipo global?
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
