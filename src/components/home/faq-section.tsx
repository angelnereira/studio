"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "¿Qué servicios de desarrollo ofrece Ángel Nereira?",
        answer: "Me especializo en el desarrollo de aplicaciones web Full Stack de alto rendimiento, plataformas SaaS (Software as a Service) para FinTech, integración de sistemas de facturación electrónica y desarrollo de PWAs (Progressive Web Apps) Offline-First."
    },
    {
        question: "¿Trabajas con empresas internacionales?",
        answer: "Sí, ofrezco servicios de consultoría y desarrollo de software para clientes globales, con experiencia trabajando con equipos en Estados Unidos, Europa y Latinoamérica."
    },
    {
        question: "¿Cuál es tu stack tecnológico principal?",
        answer: "Mi stack principal se centra en el ecosistema de React y Next.js, utilizando TypeScript para seguridad de tipos, Tailwind CSS para diseño, y PostgreSQL (con Prisma/Neon) para bases de datos escalables."
    },
    {
        question: "¿Ofreces servicios de integración de IA?",
        answer: "Sí, desarrollo soluciones que integran modelos de Inteligencia Artificial (LLMs como GPT-4, Claude, Gemini) en flujos de trabajo empresariales para automatización y análisis de datos."
    }
];

export function FAQSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Schema.org for FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-mono">
                        FAQ
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        Preguntas Frecuentes
                    </h2>
                    <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Respuestas a las dudas más comunes sobre mis servicios y metodología.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                                <AccordionTrigger className="text-left text-zinc-200 hover:text-primary transition-colors hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
