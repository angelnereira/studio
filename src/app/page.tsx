

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, BotMessageSquare, Languages, Mic, Music, FunctionSquare, Download, Code2, Clipboard, ClipboardCheck, FileText, Github } from "lucide-react";
import * as React from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SpotlightCard } from "@/components/spotlight-card";
import { ServicesCarousel } from "@/components/services-carousel";
import { generateCv, GenerateCvInput } from "@/ai/flows/generate-cv";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedDiv } from "@/components/animated-div";
import dynamic from "next/dynamic";
import { projects, testimonials } from "@/lib/projects-and-testimonials";
import { skills } from "@/lib/skills";

const DynamicSkillsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.SkillsSection), { ssr: false });
const DynamicProjectsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.ProjectsSection), { ssr: false });
const DynamicTestimonialsSection = dynamic(() => import('@/components/home-sections').then(mod => mod.TestimonialsSection), { ssr: false });


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
    <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
        {/* Hero Section */}
        <section>
          <div className="container px-4 md:px-6 text-center py-20 md:py-32 lg:py-40">
             <AnimatedDiv>
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
                  <Link href="/contact">Hablemos</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">Ver Proyectos</Link>
                </Button>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full bg-background/50">
           <AnimatedDiv>
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
          </AnimatedDiv>
        </section>

        {/* Skills Section */}
        <DynamicSkillsSection />
        
        {/* Services Carousel Section */}
        <section id="services" className="w-full">
          <div className="container px-4 md:px-6">
            <AnimatedDiv>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Mis Servicios</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Soluciones de software a la medida para potenciar tu negocio. Desde aplicaciones web hasta inteligencia artificial.
                  </p>
                </div>
              </div>
            </AnimatedDiv>
            <AnimatedDiv delay={0.2}>
              <div className="py-12">
                 <ServicesCarousel />
              </div>
            </AnimatedDiv>
             <AnimatedDiv delay={0.4} className="text-center">
                <Button asChild variant="outline">
                    <Link href="/services">
                        Ver todos los servicios <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </AnimatedDiv>
          </div>
        </section>

        {/* Projects Section */}
        <DynamicProjectsSection />

        {/* Testimonials Section */}
        <DynamicTestimonialsSection />


        {/* CTA Section */}
        <section className="w-full bg-background/50">
          <AnimatedDiv>
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
          </AnimatedDiv>
        </section>
    </div>
  );
}

    

    

    