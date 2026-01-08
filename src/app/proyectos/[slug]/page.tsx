import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Monitor, Smartphone, Code2, Database, Zap, Shield, Target, Server, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedDiv } from "@/components/animated-div";
import { SpotlightCard } from "@/components/spotlight-card";
import { projectsData } from "@/lib/projects-and-testimonials";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData.find((p) => p.id === slug);

    if (!project) {
        return {
            title: "Proyecto no encontrado",
        };
    }

    return {
        title: `${project.title} | Caso de Estudio FinTech & PWA`,
        description: project.description,
    };
}

// Icon mapping
const highlightIcons: { [key: string]: React.ElementType } = {
    'Seguridad Nivel Bancario': Shield,
    'Base de Datos Multi-Tenant': Database,
    'Performance Extremo': Zap,
    'Gestión de Estado Optimizada': Code2,
    'Optimización de Media': Zap,
    'Migración de Base de Datos': Database,
};

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = projectsData.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="container px-4 py-12 md:py-20 lg:py-24 max-w-4xl mx-auto">
            <AnimatedDiv>
                <Link
                    href="/proyectos"
                    className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Proyectos
                </Link>
            </AnimatedDiv>

            <AnimatedDiv delay={0.1}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">{project.label}</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                        {project.liveUrl && (
                            <Button asChild size="lg" className="gap-2">
                                <Link href={project.liveUrl} target="_blank">
                                    <ExternalLink className="w-4 h-4" />
                                    Ver Demo
                                </Link>
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button asChild variant="outline" size="lg" className="gap-2">
                                <Link href={project.githubUrl} target="_blank">
                                    <Github className="w-4 h-4" />
                                    Código
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </AnimatedDiv>

            <div className="grid gap-12 mt-16">
                {/* Challenge Section */}
                <AnimatedDiv delay={0.2}>
                    <section className="p-8 bg-secondary/30 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target className="w-32 h-32" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-primary" />
                            El Desafío Técnico
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            {project.challenge}
                        </p>
                    </section>
                </AnimatedDiv>

                {/* Tech Highlights */}
                <AnimatedDiv delay={0.3}>
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-primary" />
                            Highlights Técnicos
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.techHighlights.map((highlight, index) => {
                                const Icon = highlightIcons[highlight.title] || Code2;
                                return (
                                    <SpotlightCard key={index} className="p-6 bg-secondary/20 border-white/5 h-full">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {highlight.description}
                                        </p>
                                    </SpotlightCard>
                                )
                            })}
                        </div>
                    </section>
                </AnimatedDiv>

                {/* Stack */}
                <AnimatedDiv delay={0.4}>
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Database className="w-6 h-6 text-primary" />
                            Stack Tecnológico
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="px-4 py-2 text-base font-normal bg-secondary/50 hover:bg-primary/20 transition-colors">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </section>
                </AnimatedDiv>
            </div>

            <AnimatedDiv delay={0.5} className="mt-20 pt-10 border-t border-white/10 text-center">
                <h3 className="text-2xl font-bold mb-4">¿Te interesa construir algo similar?</h3>
                <Button asChild size="lg" variant="default">
                    <Link href="/contact">
                        Agendar Consultoría Técnica <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </AnimatedDiv>
        </div>
    );
}
