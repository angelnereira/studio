"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedDiv } from "@/components/animated-div";
import { SpotlightCard } from "@/components/spotlight-card";
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Shield, Zap, WifiOff, Globe, Server, Code2, Database, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SagoOneCaseStudy() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Navigation */}
            <div className="container px-4 py-8">
                <Button asChild variant="ghost" className="hover:bg-primary/10">
                    <Link href="/proyectos">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Proyectos
                    </Link>
                </Button>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-10 pb-20">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
                <div className="container px-4 text-center">
                    <AnimatedDiv>
                        <Badge className="mb-6 bg-primary/20 text-primary border-primary/20 backdrop-blur-sm px-4 py-1 text-sm">
                            Flagship Project
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Sago One
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                            Plataforma de Facturación Electrónica PWA Offline-First
                            <span className="block text-primary mt-2">Tecnología Enterprise para el Mercado Panameño</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            <Button asChild size="lg" className="rounded-full px-8 text-base">
                                <Link href="https://sagoone.com" target="_blank">
                                    Visitar Website
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                                <Link href="https://github.com/angelnereira/sago-factu-V0.2" target="_blank">
                                    <Github className="mr-2 h-5 w-5" />
                                    Ver Código Fuente
                                </Link>
                            </Button>
                        </div>

                        {/* Mockup - Real Image */}
                        <div className="relative mx-auto max-w-5xl aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-secondary/50 backdrop-blur-sm group">
                            <Image
                                src="/projects/sago-one/dashboard.png"
                                alt="Dashboard Sago One"
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                    </AnimatedDiv>
                </div>
            </section>

            {/* Key Features Grid */}
            <section className="py-20 bg-secondary/5 border-y border-white/5">
                <div className="container px-4">
                    <AnimatedDiv>
                        <h2 className="text-3xl font-bold text-center mb-16 font-headline">Innovación Técnica</h2>
                    </AnimatedDiv>

                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedDiv delay={0.1}>
                            <SpotlightCard className="h-full p-8 bg-background/50 border border-white/5">
                                <WifiOff className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-3">Offline-First PWA</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Arquitectura robusta que permite operar sin conexión a internet. Los datos se almacenan localmente en IndexedDB y se sincronizan automáticamente con el servidor (BullMQ) cuando se restablece la conexión.
                                </p>
                            </SpotlightCard>
                        </AnimatedDiv>

                        <AnimatedDiv delay={0.2}>
                            <SpotlightCard className="h-full p-8 bg-background/50 border border-white/5">
                                <Shield className="w-12 h-12 text-purple-500 mb-6" />
                                <h3 className="text-xl font-bold mb-3">Seguridad AES-256</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Cifrado de grado militar para proteger credenciales fiscales y datos sensibles de clientes. Implementación de protocolos estrictos para el manejo de certificados digitales PKCS#12.
                                </p>
                            </SpotlightCard>
                        </AnimatedDiv>

                        <AnimatedDiv delay={0.3}>
                            <SpotlightCard className="h-full p-8 bg-background/50 border border-white/5">
                                <Zap className="w-12 h-12 text-amber-500 mb-6" />
                                <h3 className="text-xl font-bold mb-3">Rendimiento Extremo</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Optimizado con Next.js 15 y Vercel Edge Network. Tiempos de carga sub-segundo y navegación instantánea gracias al prefetching y optimización de assets.
                                </p>
                            </SpotlightCard>
                        </AnimatedDiv>
                    </div>
                </div>
            </section>

            {/* Deep Dive & Architecture */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedDiv>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">El Desafío</h2>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    El sistema fiscal panameño exige una integración compleja y segura para la facturación electrónica.
                                    Las soluciones existentes eran, en su mayoría, adaptaciones de software antiguo, lentas y atadas a servidores locales.
                                </p>
                                <p>
                                    El reto fue construir una plataforma <strong>nativa de la nube</strong> que pudiera manejar la complejidad de:
                                </p>
                                <ul className="space-y-3 mt-4">
                                    {[
                                        "Firmado digital de documentos XML (XMLDSig)",
                                        "Comunicación SOAP/REST con proveedores PAC",
                                        "Validación de esquemas tributarios estrictos",
                                        "Generación de códigos QR y CUFE en tiempo real"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                            <span className="text-foreground/90">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv delay={0.2}>
                            <div className="bg-secondary/20 p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Server className="w-5 h-5 text-primary" />
                                    Stack Tecnológico Moderno
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-background/50 rounded-lg border border-white/5 flex items-center gap-4">
                                        <div className="p-2 bg-black/20 rounded-md"><Code2 className="w-6 h-6" /></div>
                                        <div>
                                            <div className="font-bold">Frontend & App PWA</div>
                                            <div className="text-sm text-muted-foreground">Next.js 15, React, TypeScript, Tailwind</div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background/50 rounded-lg border border-white/5 flex items-center gap-4">
                                        <div className="p-2 bg-blue-500/10 rounded-md"><Database className="w-6 h-6 text-blue-500" /></div>
                                        <div>
                                            <div className="font-bold">Base de Datos & ORM</div>
                                            <div className="text-sm text-muted-foreground">Neon (Serverless Postgres), Prisma ORM</div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background/50 rounded-lg border border-white/5 flex items-center gap-4">
                                        <div className="p-2 bg-orange-500/10 rounded-md"><Globe className="w-6 h-6 text-orange-500" /></div>
                                        <div>
                                            <div className="font-bold">Infraestructura & CI/CD</div>
                                            <div className="text-sm text-muted-foreground">Vercel, GitHub Actions</div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background/50 rounded-lg border border-white/5 flex items-center gap-4">
                                        <div className="p-2 bg-red-500/10 rounded-md"><Zap className="w-6 h-6 text-red-500" /></div>
                                        <div>
                                            <div className="font-bold">Colas & Procesamiento</div>
                                            <div className="text-sm text-muted-foreground">Redis, BullMQ (para envíos asíncronos a DGI)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedDiv>
                    </div>
                </div>
            </section>


            {/* Interface Gallery */}
            <section className="py-20 bg-secondary/5">
                <div className="container px-4">
                    <AnimatedDiv>
                        <h2 className="text-3xl font-bold text-center mb-16 font-headline">Interfaz Intuitiva</h2>
                    </AnimatedDiv>

                    <div className="grid md:grid-cols-2 gap-8">
                        <AnimatedDiv delay={0.1} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-lg group">
                            <Image
                                src="/projects/sago-one/new-invoice.png"
                                alt="Creación de Factura Optimizada"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium">Facturación Rápida Offline</p>
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv delay={0.2} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-lg group">
                            <Image
                                src="/projects/sago-one/metrics.png"
                                alt="Métricas Financieras"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium">Métricas en Tiempo Real</p>
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv delay={0.3} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-lg group">
                            <Image
                                src="/projects/sago-one/inventory.png"
                                alt="Gestión de Inventario"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium">Control de Inventario</p>
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv delay={0.4} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-lg group">
                            <Image
                                src="/projects/sago-one/invoice-detail.png"
                                alt="Detalle de Factura"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium">Detalle Fiscal y Firma Digital</p>
                            </div>
                        </AnimatedDiv>
                    </div>
                </div>
            </section>

            {/* Results CTA */}
            <section className="py-20 text-center">
                <div className="container px-4">
                    <AnimatedDiv>
                        <div className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-12 rounded-3xl border border-primary/20 max-w-4xl mx-auto backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-6 font-headline">Resultados que Impactan</h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Sago One ha transformado la operación de múltiples negocios, reduciendo la carga administrativa en más de un 90% y eliminando el riesgo de multas por incumplimiento fiscal.
                            </p>
                            <Button asChild size="lg" className="px-10 h-14 text-lg shadow-xl shadow-primary/20">
                                <Link href="/contact">
                                    Contratar para Desarrollo Similar
                                </Link>
                            </Button>
                        </div>
                    </AnimatedDiv>
                </div>
            </section>
        </div>
    );
}
