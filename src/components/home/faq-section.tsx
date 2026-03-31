"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export function FAQSection() {
    const t = useTranslations('faq');
    const faqs = t.raw('items') as { question: string, answer: string }[];

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
                        {t('badge')}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        {t('title')}
                    </h2>
                    <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t('subtitle')}
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
