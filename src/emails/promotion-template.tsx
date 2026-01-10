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

interface PromotionEmailProps {
    clientName?: string;
    promotionTitle?: string;
    discountPercentage?: number;
    originalPrice?: number;
    discountedPrice?: number;
    serviceName?: string;
    serviceSlug?: string;
    expirationDate?: string;
    promoCode?: string;
    previewText?: string;
}

const brandColors = {
    primary: "#DFFF00",
    background: "#080c0a",
    secondary: "#136D56",
    accent: "#FF6B35",
    border: "rgba(255,255,255,0.1)",
    textPrimary: "#ffffff",
    textSecondary: "#9ca3af",
    textMuted: "#6b7280",
};

export default function PromotionEmail({
    clientName = "Cliente",
    promotionTitle = "🚀 Oferta Especial de Lanzamiento",
    discountPercentage = 40,
    originalPrice = 1200,
    discountedPrice = 720,
    serviceName = "Desarrollo Web - Lanzamiento Digital",
    serviceSlug = "web-development",
    expirationDate = "31 de Enero, 2026",
    promoCode = "LANZAMIENTO2026",
    previewText = "Oferta exclusiva: Ahorra hasta 40% en tu próximo proyecto",
}: PromotionEmailProps) {
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
                        maxWidth: "500px",
                        backgroundColor: "rgba(13, 20, 16, 0.5)",
                    }}>
                        {/* Logo */}
                        <Section style={{ textAlign: "center" as const, marginTop: "32px" }}>
                            <div style={{ width: "48px", height: "48px", backgroundColor: brandColors.primary, borderRadius: "8px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: "20px" }}>
                                AN
                            </div>
                        </Section>

                        {/* Promotion Badge */}
                        <Section style={{ textAlign: "center" as const, margin: "24px 0 16px 0" }}>
                            <span style={{
                                backgroundColor: brandColors.accent,
                                color: "#fff",
                                padding: "6px 16px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                textTransform: "uppercase" as const,
                            }}>
                                Oferta Limitada
                            </span>
                        </Section>

                        <Heading style={{ color: brandColors.textPrimary, fontSize: "26px", fontWeight: "bold", textAlign: "center" as const, margin: "16px 0" }}>
                            {promotionTitle}
                        </Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", textAlign: "center" as const }}>
                            Hola {clientName}, tengo una oferta especial para ti.
                        </Text>

                        {/* Discount Card */}
                        <Section style={{
                            background: `linear-gradient(135deg, ${brandColors.secondary}22, ${brandColors.primary}11)`,
                            border: `2px solid ${brandColors.primary}`,
                            borderRadius: "12px",
                            padding: "24px",
                            margin: "24px 0",
                            textAlign: "center" as const,
                        }}>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "14px", margin: "0 0 8px 0" }}>
                                {serviceName}
                            </Text>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                                <Text style={{
                                    color: brandColors.textMuted,
                                    fontSize: "24px",
                                    textDecoration: "line-through",
                                    margin: "0"
                                }}>
                                    ${originalPrice}
                                </Text>
                                <Text style={{
                                    color: brandColors.primary,
                                    fontSize: "36px",
                                    fontWeight: "bold",
                                    margin: "0"
                                }}>
                                    ${discountedPrice}
                                </Text>
                            </div>
                            <Text style={{
                                color: brandColors.accent,
                                fontSize: "16px",
                                fontWeight: "bold",
                                margin: "8px 0 0 0"
                            }}>
                                ¡Ahorras {discountPercentage}%!
                            </Text>
                        </Section>

                        {/* Promo Code */}
                        <Section style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: `1px dashed ${brandColors.textMuted}`,
                            borderRadius: "8px",
                            padding: "16px",
                            margin: "24px 0",
                            textAlign: "center" as const,
                        }}>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "12px", margin: "0 0 8px 0" }}>
                                Usa este código al contactar:
                            </Text>
                            <Text style={{
                                color: brandColors.primary,
                                fontSize: "20px",
                                fontWeight: "bold",
                                fontFamily: "monospace",
                                letterSpacing: "2px",
                                margin: "0"
                            }}>
                                {promoCode}
                            </Text>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Esta promoción incluye:
                        </Text>

                        <ul style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "28px", paddingLeft: "20px" }}>
                            <li>✅ Landing page responsiva</li>
                            <li>✅ Optimización SEO básica</li>
                            <li>✅ Formulario de contacto</li>
                            <li>✅ Hosting por 1 año incluido</li>
                            <li>✅ Entrega en 2-3 semanas</li>
                        </ul>

                        <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                            <Button
                                href={`https://angelnereira.com/services/${serviceSlug}?promo=${promoCode}`}
                                style={{
                                    backgroundColor: brandColors.primary,
                                    borderRadius: "6px",
                                    color: "#000",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    padding: "14px 28px",
                                    display: "inline-block",
                                }}
                            >
                                Aprovechar Oferta Ahora
                            </Button>
                        </Section>

                        {/* Urgency */}
                        <Section style={{
                            backgroundColor: "rgba(255, 107, 53, 0.1)",
                            border: `1px solid ${brandColors.accent}`,
                            borderRadius: "8px",
                            padding: "12px 16px",
                            margin: "24px 0",
                            textAlign: "center" as const,
                        }}>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "13px", margin: "0" }}>
                                ⏰ Oferta válida hasta <strong style={{ color: brandColors.accent }}>{expirationDate}</strong>
                            </Text>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", textAlign: "center" as const }}>
                            ¿Tienes preguntas? Responde directamente a este correo.
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />

                        <Text style={{ color: brandColors.textMuted, fontSize: "12px", lineHeight: "24px", textAlign: "center" as const }}>
                            Ángel Nereira · Ingeniero de Software Full Stack
                            <br />
                            <Link href="https://angelnereira.com" style={{ color: brandColors.primary, fontSize: "12px" }}>
                                angelnereira.com
                            </Link>
                        </Text>

                        <Text style={{ color: brandColors.textMuted, fontSize: "10px", textAlign: "center" as const, marginTop: "16px" }}>
                            Recibiste este correo porque expresaste interés en nuestros servicios.
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
