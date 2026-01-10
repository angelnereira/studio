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

interface ProjectCompleteEmailProps {
    clientName?: string;
    projectName?: string;
    projectUrl?: string;
    completionDate?: string;
    deliverables?: string[];
    supportPlan?: string;
    previewText?: string;
}

const brandColors = {
    primary: "#DFFF00",
    background: "#080c0a",
    secondary: "#136D56",
    success: "#22C55E",
    border: "rgba(255,255,255,0.1)",
    textPrimary: "#ffffff",
    textSecondary: "#9ca3af",
    textMuted: "#6b7280",
};

export default function ProjectCompleteEmail({
    clientName = "Cliente",
    projectName = "Sitio Web Corporativo",
    projectUrl = "https://example.com",
    completionDate = "10 de Enero, 2026",
    deliverables = ["Sitio web responsivo", "Panel de administración", "Optimización SEO", "SSL configurado"],
    supportPlan = "Crecimiento Plus",
    previewText = "🎉 ¡Tu proyecto ha sido completado!",
}: ProjectCompleteEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind config={{ theme: { extend: { colors: { primary: brandColors.primary, background: brandColors.background, secondary: brandColors.secondary } } } }}>
                <Body style={{ backgroundColor: brandColors.background, color: brandColors.textPrimary, fontFamily: "sans-serif", margin: "0 auto", padding: "8px" }}>
                    <Container style={{ border: `1px solid ${brandColors.border}`, borderRadius: "12px", padding: "32px", margin: "32px auto", maxWidth: "520px", backgroundColor: "rgba(13, 20, 16, 0.5)" }}>
                        <Section style={{ textAlign: "center" as const, marginTop: "32px" }}>
                            <div style={{ width: "48px", height: "48px", backgroundColor: brandColors.primary, borderRadius: "8px", margin: "0 auto", color: "#000", fontWeight: "bold", fontSize: "20px" }}>AN</div>
                        </Section>

                        <Section style={{ textAlign: "center" as const, margin: "24px 0" }}>
                            <span style={{ backgroundColor: brandColors.success, color: "#fff", padding: "8px 20px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" }}>✓ Proyecto Completado</span>
                        </Section>

                        <Heading style={{ color: brandColors.textPrimary, fontSize: "26px", fontWeight: "bold", textAlign: "center" as const, margin: "24px 0" }}>¡Felicidades, {clientName}! 🎉</Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", textAlign: "center" as const }}>
                            Tu proyecto <strong style={{ color: brandColors.primary }}>{projectName}</strong> está listo.
                        </Text>

                        <Section style={{ background: `linear-gradient(135deg, ${brandColors.secondary}22, ${brandColors.primary}11)`, border: `2px solid ${brandColors.primary}`, borderRadius: "12px", padding: "24px", margin: "24px 0", textAlign: "center" as const }}>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "12px", margin: "0 0 8px 0" }}>En vivo:</Text>
                            <Link href={projectUrl} style={{ color: brandColors.primary, fontSize: "18px", fontWeight: "bold" }}>{projectUrl.replace("https://", "")}</Link>
                            <Text style={{ color: brandColors.textMuted, fontSize: "11px", margin: "12px 0 0 0" }}>Entrega: {completionDate}</Text>
                        </Section>

                        <Text style={{ color: brandColors.primary, fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" as const, margin: "24px 0 12px 0" }}>📦 Entregables</Text>
                        <Section style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${brandColors.border}`, borderRadius: "8px", padding: "16px", margin: "0 0 24px 0" }}>
                            {deliverables.map((item, i) => <Text key={i} style={{ color: brandColors.textSecondary, fontSize: "14px", margin: "8px 0" }}>✅ {item}</Text>)}
                        </Section>

                        <Section style={{ backgroundColor: "rgba(19, 109, 86, 0.15)", border: `1px solid ${brandColors.secondary}`, borderRadius: "8px", padding: "16px", margin: "24px 0" }}>
                            <Text style={{ color: brandColors.textPrimary, fontSize: "14px", fontWeight: "600", margin: "0 0 8px 0" }}>🛡️ Plan de Soporte: {supportPlan}</Text>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "13px", margin: "0" }}>Incluye monitoreo, backups y soporte prioritario.</Text>
                        </Section>

                        <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                            <Button href={projectUrl} style={{ backgroundColor: brandColors.primary, borderRadius: "6px", color: "#000", fontSize: "14px", fontWeight: "bold", padding: "14px 24px" }}>Ver Mi Proyecto</Button>
                        </Section>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px" }}>¡Éxito con tu nuevo proyecto!<br /><strong style={{ color: brandColors.textPrimary }}>— Ángel Nereira</strong></Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />
                        <Text style={{ color: brandColors.textMuted, fontSize: "12px", textAlign: "center" as const }}>Ángel Nereira · <Link href="https://angelnereira.com" style={{ color: brandColors.primary }}>angelnereira.com</Link></Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
