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

interface QuoteFollowupEmailProps {
    clientName?: string;
    serviceName?: string;
    packageName?: string;
    estimatedPrice?: string;
    daysSinceQuote?: number;
    quoteId?: string;
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

export default function QuoteFollowupEmail({
    clientName = "Cliente",
    serviceName = "Desarrollo Web",
    packageName = "Lanzamiento Digital",
    estimatedPrice = "$720",
    daysSinceQuote = 7,
    quoteId = "QT-2026-001",
    previewText = "Seguimiento de tu cotización - ¿Cómo puedo ayudarte?",
}: QuoteFollowupEmailProps) {
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

                        <Heading style={{ color: brandColors.textPrimary, fontSize: "24px", fontWeight: "bold", textAlign: "center" as const, margin: "30px 0" }}>
                            Hola {clientName} 👋
                        </Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Hace {daysSinceQuote} días me contactaste interesado/a en nuestro servicio de <strong style={{ color: brandColors.primary }}>{serviceName}</strong>. Quería darle seguimiento y ver cómo puedo ayudarte a dar el siguiente paso.
                        </Text>

                        {/* Quote Summary Card */}
                        <Section style={{
                            backgroundColor: "rgba(19, 109, 86, 0.1)",
                            border: `1px solid ${brandColors.secondary}`,
                            borderRadius: "8px",
                            padding: "20px",
                            margin: "24px 0"
                        }}>
                            <Text style={{ color: brandColors.textMuted, fontSize: "12px", margin: "0 0 12px 0" }}>
                                Ref: {quoteId}
                            </Text>
                            <Text style={{ color: brandColors.textPrimary, fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>
                                📋 Resumen de tu cotización
                            </Text>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tr>
                                    <td style={{ color: brandColors.textSecondary, fontSize: "14px", padding: "4px 0" }}>Servicio:</td>
                                    <td style={{ color: brandColors.textPrimary, fontSize: "14px", padding: "4px 0", textAlign: "right" as const }}>{serviceName}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: brandColors.textSecondary, fontSize: "14px", padding: "4px 0" }}>Paquete:</td>
                                    <td style={{ color: brandColors.textPrimary, fontSize: "14px", padding: "4px 0", textAlign: "right" as const }}>{packageName}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: brandColors.textSecondary, fontSize: "14px", padding: "8px 0", borderTop: `1px solid ${brandColors.border}` }}>Inversión estimada:</td>
                                    <td style={{ color: brandColors.primary, fontSize: "18px", fontWeight: "bold", padding: "8px 0", textAlign: "right" as const, borderTop: `1px solid ${brandColors.border}` }}>{estimatedPrice}</td>
                                </tr>
                            </table>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Entiendo que tomar una decisión requiere tiempo. Si tienes alguna duda o necesitas información adicional, estoy aquí para ayudarte.
                        </Text>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", fontWeight: "600" }}>
                            Algunas preguntas que podrían ayudarte:
                        </Text>

                        <ul style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "28px", paddingLeft: "20px" }}>
                            <li>¿El alcance del proyecto cubre tus necesidades?</li>
                            <li>¿El presupuesto se ajusta a tu inversión planeada?</li>
                            <li>¿Tienes una fecha límite para lanzar?</li>
                        </ul>

                        <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                            <Button
                                href="https://angelnereira.com/contact?subject=Seguimiento Cotización"
                                style={{
                                    backgroundColor: brandColors.primary,
                                    borderRadius: "6px",
                                    color: "#000",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    padding: "14px 24px",
                                    display: "inline-block",
                                    marginRight: "8px",
                                }}
                            >
                                Agendar Llamada
                            </Button>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", textAlign: "center" as const }}>
                            O simplemente responde a este correo con tus preguntas.
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />

                        <Text style={{ color: brandColors.textMuted, fontSize: "12px", lineHeight: "24px", textAlign: "center" as const }}>
                            Ángel Nereira · Ingeniero de Software Full Stack
                            <br />
                            Especialista en FinTech, SaaS y PWA Offline-First
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
