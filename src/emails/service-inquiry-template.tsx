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

interface ServiceInquiryEmailProps {
    clientName?: string;
    serviceName?: string;
    serviceSlug?: string;
    packageName?: string;
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

export default function ServiceInquiryEmail({
    clientName = "Cliente",
    serviceName = "Desarrollo Web",
    serviceSlug = "web-development",
    packageName = "Lanzamiento Digital",
    previewText = "Hemos recibido tu consulta sobre nuestros servicios",
}: ServiceInquiryEmailProps) {
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
                            ¡Gracias por tu interés, {clientName}!
                        </Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            He recibido tu consulta sobre el servicio de <strong style={{ color: brandColors.primary }}>{serviceName}</strong>.
                        </Text>

                        {/* Service Card */}
                        <Section style={{
                            backgroundColor: "rgba(19, 109, 86, 0.15)",
                            border: `1px solid ${brandColors.secondary}`,
                            borderRadius: "8px",
                            padding: "20px",
                            margin: "24px 0"
                        }}>
                            <Text style={{ color: brandColors.textPrimary, fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>
                                📋 Detalles de tu consulta
                            </Text>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "14px", margin: "0" }}>
                                <strong>Servicio:</strong> {serviceName}
                                <br />
                                <strong>Paquete de interés:</strong> {packageName}
                            </Text>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Estoy revisando los detalles de tu solicitud y me pondré en contacto contigo en las próximas <strong style={{ color: brandColors.textPrimary }}>24-48 horas</strong> para discutir:
                        </Text>

                        <ul style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "28px", paddingLeft: "20px" }}>
                            <li>Los objetivos específicos de tu proyecto</li>
                            <li>Cronograma y plazos</li>
                            <li>Presupuesto detallado y opciones de pago</li>
                        </ul>

                        <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                            <Button
                                href={`https://angelnereira.com/services/${serviceSlug}`}
                                style={{
                                    backgroundColor: brandColors.primary,
                                    borderRadius: "6px",
                                    color: "#000",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    padding: "12px 24px",
                                    display: "inline-block",
                                }}
                            >
                                Ver Detalles del Servicio
                            </Button>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>
                            Mientras tanto, puedes explorar mi <Link href="https://angelnereira.com/proyectos" style={{ color: brandColors.primary }}>portafolio de proyectos</Link> o usar la <Link href="https://angelnereira.com/calculadora" style={{ color: brandColors.primary }}>calculadora de presupuestos</Link> para tener una estimación.
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />

                        <Text style={{ color: brandColors.textMuted, fontSize: "12px", lineHeight: "24px", textAlign: "center" as const }}>
                            Ángel Nereira · Ingeniero de Software Full Stack
                            <br />
                            Especialista en FinTech, SaaS y PWA Offline-First · Panamá
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
