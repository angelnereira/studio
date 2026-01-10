import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface BaseEmailProps {
    previewText: string;
    children: React.ReactNode;
}

// Brand Colors
export const brandColors = {
    primary: "#DFFF00", // Acid Lime
    background: "#080c0a", // Deep Forest
    secondary: "#136D56", // Muted Teal
    cardBg: "#0d1410",
    border: "rgba(255,255,255,0.1)",
    textPrimary: "#ffffff",
    textSecondary: "#9ca3af",
    textMuted: "#6b7280",
};

export const tailwindConfig = {
    theme: {
        extend: {
            colors: {
                primary: brandColors.primary,
                background: brandColors.background,
                secondary: brandColors.secondary,
            },
        },
    },
};

export function Logo() {
    return (
        <Section className="mt-8 text-center">
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: brandColors.primary,
                    borderRadius: "8px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                }}
            >
                AN
            </div>
        </Section>
    );
}

export function EmailFooter() {
    return (
        <>
            <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />
            <Text style={{ color: brandColors.textMuted, fontSize: "12px", lineHeight: "24px", textAlign: "center" as const }}>
                Ángel Nereira · Ingeniero de Software Full Stack
                <br />
                Especialista en FinTech, SaaS y PWA Offline-First
                <br />
                Panamá
            </Text>
            <Section style={{ textAlign: "center" as const, marginTop: "16px" }}>
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
                © {new Date().getFullYear()} Ángel Nereira. Todos los derechos reservados.
            </Text>
        </>
    );
}

export default function BaseEmail({ previewText, children }: BaseEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind config={tailwindConfig}>
                <Body style={{ backgroundColor: brandColors.background, color: brandColors.textPrimary, fontFamily: "'Inter', 'Helvetica', sans-serif", margin: "0 auto", padding: "8px" }}>
                    <Container style={{
                        border: `1px solid ${brandColors.border}`,
                        borderRadius: "12px",
                        padding: "32px",
                        margin: "32px auto",
                        maxWidth: "500px",
                        backgroundColor: "rgba(13, 20, 16, 0.5)",
                        backdropFilter: "blur(8px)",
                    }}>
                        <Logo />
                        {children}
                        <EmailFooter />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
