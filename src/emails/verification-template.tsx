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

interface VerificationEmailProps {
    verificationLink?: string;
    previewText?: string;
}

const brandColors = {
    primary: "#DFFF00",
    background: "#080c0a",
    secondary: "#136D56",
    textPrimary: "#ffffff",
    textSecondary: "#9ca3af",
    border: "rgba(255,255,255,0.1)",
};

export default function VerificationEmail({
    verificationLink = "https://angelnereira.com/verify",
    previewText = "Verify your email to comment",
}: VerificationEmailProps) {
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
                <Body style={{ backgroundColor: brandColors.background, color: brandColors.textPrimary, fontFamily: "'Inter', 'Helvetica', sans-serif", margin: "0 auto", padding: "0" }}>
                    <Container style={{
                        padding: "20px",
                        margin: "0 auto",
                        maxWidth: "600px",
                        width: "100%",
                    }}>
                        <Section style={{ textAlign: "center" as const, marginTop: "32px" }}>
                            <div style={{ width: "48px", height: "48px", backgroundColor: brandColors.primary, borderRadius: "8px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: "20px" }}>
                                AN
                            </div>
                        </Section>

                        <Heading style={{ color: brandColors.textPrimary, fontSize: "24px", fontWeight: "bold", textAlign: "center" as const, margin: "30px 0" }}>
                            Verifica tu correo electrónico
                        </Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "16px", lineHeight: "24px", textAlign: "center" as const }}>
                            Para asegurar la calidad de la conversación en mi blog, por favor verifica que esta es tu dirección de correo electrónico.
                        </Text>

                        <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                            <Button
                                href={verificationLink}
                                style={{
                                    backgroundColor: brandColors.primary,
                                    borderRadius: "6px",
                                    color: "#000",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    padding: "12px 24px",
                                    display: "inline-block",
                                }}
                            >
                                Verificar Email
                            </Button>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", textAlign: "center" as const }}>
                            Si no intentaste comentar en mi blog, puedes ignorar este correo.
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />

                        <Text style={{ color: brandColors.textSecondary, fontSize: "12px", textAlign: "center" as const }}>
                            Ángel Nereira · Ingeniero de Software
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
