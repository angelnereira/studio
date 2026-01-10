import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface NewsletterArticle {
    title: string;
    excerpt: string;
    url: string;
    category: string;
}

interface NewsletterEmailProps {
    subscriberName?: string;
    edition?: string;
    headline?: string;
    introText?: string;
    articles?: NewsletterArticle[];
    featuredService?: {
        name: string;
        description: string;
        price: string;
        url: string;
    };
    previewText?: string;
}

const brandColors = {
    primary: "#DFFF00",
    background: "#080c0a",
    secondary: "#136D56",
    border: "rgba(255,255,255,0.1)",
    textPrimary: "#ffffff",
    textSecondary: "#9ca3af",
    textMuted: "#6b7280",
};

const defaultArticles: NewsletterArticle[] = [
    {
        title: "Cómo elegir la arquitectura correcta para tu SaaS",
        excerpt: "Microservicios vs Monolito: cuándo usar cada uno y por qué la mayoría de startups deberían empezar con un monolito bien estructurado.",
        url: "https://angelnereira.com/blog/arquitectura-saas",
        category: "Arquitectura",
    },
    {
        title: "PWA vs App Nativa: Guía para 2026",
        excerpt: "Las PWAs han evolucionado significativamente. Analizamos cuándo tiene sentido cada opción para tu negocio.",
        url: "https://angelnereira.com/blog/pwa-vs-nativa",
        category: "Móvil",
    },
];

export default function NewsletterEmail({
    subscriberName = "Suscriptor",
    edition = "Enero 2026",
    headline = "🚀 Novedades en Desarrollo de Software",
    introText = "Este mes exploramos las últimas tendencias en desarrollo web, mejores prácticas en FinTech, y te comparto un proyecto reciente que podría inspirarte.",
    articles = defaultArticles,
    featuredService = {
        name: "Desarrollo Web - Lanzamiento Digital",
        description: "Lanza tu presencia digital con una landing page profesional optimizada para conversiones.",
        price: "Desde $720",
        url: "https://angelnereira.com/services/web-development",
    },
    previewText = "Newsletter Angel Nereira - Novedades en desarrollo de software",
}: NewsletterEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: brandColors.primary,
                                background: brandColors.background,
                                secondary: brandColors.secondary,
                            },
                        },
                    },
                }}
            >
                <Body style={{ backgroundColor: brandColors.background, color: brandColors.textPrimary, fontFamily: "'Inter', 'Helvetica', sans-serif", margin: "0 auto", padding: "8px" }}>
                    <Container style={{
                        border: `1px solid ${brandColors.border}`,
                        borderRadius: "12px",
                        padding: "32px",
                        margin: "32px auto",
                        maxWidth: "560px",
                        backgroundColor: "rgba(13, 20, 16, 0.5)",
                    }}>
                        {/* Header */}
                        <Section style={{ textAlign: "center" as const, marginTop: "16px" }}>
                            <div style={{ width: "48px", height: "48px", backgroundColor: brandColors.primary, borderRadius: "8px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: "20px" }}>
                                AN
                            </div>
                            <Text style={{ color: brandColors.textMuted, fontSize: "12px", margin: "16px 0 0 0" }}>
                                Edición: {edition}
                            </Text>
                        </Section>

                        <Heading style={{ color: brandColors.textPrimary, fontSize: "26px", fontWeight: "bold", textAlign: "center" as const, margin: "24px 0" }}>
                            {headline}
                        </Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Hola {subscriberName},
                        </Text>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            {introText}
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "24px 0" }} />

                        {/* Articles Section */}
                        <Text style={{ color: brandColors.primary, fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "1px", margin: "0 0 16px 0" }}>
                            📰 Artículos Destacados
                        </Text>

                        {articles.map((article, index) => (
                            <Section key={index} style={{
                                backgroundColor: "rgba(255,255,255,0.03)",
                                border: `1px solid ${brandColors.border}`,
                                borderRadius: "8px",
                                padding: "16px",
                                margin: "0 0 12px 0"
                            }}>
                                <Text style={{ color: brandColors.secondary, fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, margin: "0 0 8px 0" }}>
                                    {article.category}
                                </Text>
                                <Link href={article.url} style={{ textDecoration: "none" }}>
                                    <Text style={{ color: brandColors.textPrimary, fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>
                                        {article.title}
                                    </Text>
                                </Link>
                                <Text style={{ color: brandColors.textSecondary, fontSize: "13px", lineHeight: "20px", margin: "0 0 8px 0" }}>
                                    {article.excerpt}
                                </Text>
                                <Link href={article.url} style={{ color: brandColors.primary, fontSize: "13px", fontWeight: "500" }}>
                                    Leer más →
                                </Link>
                            </Section>
                        ))}

                        <Hr style={{ borderColor: brandColors.border, margin: "24px 0" }} />

                        {/* Featured Service */}
                        <Text style={{ color: brandColors.primary, fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "1px", margin: "0 0 16px 0" }}>
                            💼 Servicio Destacado
                        </Text>

                        <Section style={{
                            background: `linear-gradient(135deg, ${brandColors.secondary}22, ${brandColors.primary}11)`,
                            border: `1px solid ${brandColors.secondary}`,
                            borderRadius: "8px",
                            padding: "20px",
                            margin: "0 0 24px 0"
                        }}>
                            <Text style={{ color: brandColors.textPrimary, fontSize: "18px", fontWeight: "600", margin: "0 0 8px 0" }}>
                                {featuredService.name}
                            </Text>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "22px", margin: "0 0 12px 0" }}>
                                {featuredService.description}
                            </Text>
                            <Text style={{ color: brandColors.primary, fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0" }}>
                                {featuredService.price}
                            </Text>
                            <Button
                                href={featuredService.url}
                                style={{
                                    backgroundColor: brandColors.primary,
                                    borderRadius: "6px",
                                    color: "#000",
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    padding: "10px 20px",
                                    display: "inline-block",
                                }}
                            >
                                Ver Servicio
                            </Button>
                        </Section>

                        {/* Closing */}
                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Gracias por ser parte de esta comunidad. Si tienes algún proyecto en mente o simplemente quieres conversar sobre tecnología, responde a este correo.
                        </Text>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            ¡Hasta la próxima edición!
                            <br />
                            <strong style={{ color: brandColors.textPrimary }}>— Ángel</strong>
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />

                        {/* Footer */}
                        <Section style={{ textAlign: "center" as const }}>
                            <Link href="https://angelnereira.com" style={{ color: brandColors.primary, fontSize: "12px", marginRight: "16px" }}>
                                Sitio Web
                            </Link>
                            <Link href="https://github.com/angelnereira" style={{ color: brandColors.textSecondary, fontSize: "12px", marginRight: "16px" }}>
                                GitHub
                            </Link>
                            <Link href="https://linkedin.com/in/angelnereira" style={{ color: brandColors.textSecondary, fontSize: "12px" }}>
                                LinkedIn
                            </Link>
                        </Section>

                        <Text style={{ color: brandColors.textMuted, fontSize: "10px", textAlign: "center" as const, marginTop: "16px" }}>
                            Recibiste este correo porque te suscribiste a mi newsletter.
                            <br />
                            <Link href="https://angelnereira.com/unsubscribe" style={{ color: brandColors.textMuted }}>
                                Desuscribirse
                            </Link>
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
