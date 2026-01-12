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

interface ServiceShowcaseEmailProps {
    clientName?: string;
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

const services = [
    { icon: "🚀", name: "Desarrollo Web", price: "Desde $720", slug: "web-development", desc: "Landing pages y apps empresariales" },
    { icon: "🛒", name: "E-commerce", price: "Desde $720", slug: "tienda-online-ecommerce", desc: "Tiendas online con pagos integrados" },
    { icon: "💼", name: "Gestión de Negocios", price: "Desde $1,500", slug: "gestion-de-negocios", desc: "Inventario, planilla y facturación" },
    { icon: "📱", name: "Apps Móviles", price: "Desde $3,200", slug: "aplicaciones-moviles", desc: "iOS y Android multiplataforma" },
    { icon: "🤖", name: "Soluciones con IA", price: "Desde $960", slug: "ai-solutions", desc: "Chatbots y análisis predictivo" },
    { icon: "📄", name: "Sistemas Fiscales DGI", price: "Desde $2,400", slug: "sistemas-fiscales-dgi", desc: "Facturación electrónica Panamá" },
];

export default function ServiceShowcaseEmail({
    clientName = "Cliente",
    previewText = "Conoce todos nuestros servicios de desarrollo de software",
}: ServiceShowcaseEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind config={{ theme: { extend: { colors: { primary: brandColors.primary, background: brandColors.background, secondary: brandColors.secondary } } } }}>
                <Body style={{ backgroundColor: brandColors.background, color: brandColors.textPrimary, fontFamily: "sans-serif", margin: "0 auto", padding: "0" }}>
                    <Container style={{ padding: "20px", margin: "0 auto", maxWidth: "600px", width: "100%" }}>
                        <Section style={{ textAlign: "center" as const, marginTop: "32px" }}>
                            <div style={{ width: "48px", height: "48px", backgroundColor: brandColors.primary, borderRadius: "8px", margin: "0 auto", color: "#000", fontWeight: "bold", fontSize: "20px" }}>AN</div>
                        </Section>

                        <Heading style={{ color: brandColors.textPrimary, fontSize: "24px", fontWeight: "bold", textAlign: "center" as const, margin: "30px 0" }}>Soluciones de Software Enterprise</Heading>

                        <Text style={{ color: brandColors.textSecondary, fontSize: "14px", lineHeight: "24px", textAlign: "center" as const }}>
                            Hola {clientName}, aquí tienes un resumen de todos los servicios que ofrezco para llevar tu negocio al siguiente nivel.
                        </Text>

                        <Hr style={{ borderColor: brandColors.border, margin: "24px 0" }} />

                        {services.map((service, index) => (
                            <Section key={index} style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${brandColors.border}`, borderRadius: "8px", padding: "16px", margin: "0 0 12px 0" }}>
                                <table style={{ width: "100%" }}>
                                    <tr>
                                        <td style={{ width: "40px", verticalAlign: "top" }}>
                                            <Text style={{ fontSize: "24px", margin: "0" }}>{service.icon}</Text>
                                        </td>
                                        <td style={{ verticalAlign: "top" }}>
                                            <Text style={{ color: brandColors.textPrimary, fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0" }}>{service.name}</Text>
                                            <Text style={{ color: brandColors.textSecondary, fontSize: "13px", margin: "0 0 4px 0" }}>{service.desc}</Text>
                                            <Text style={{ color: brandColors.primary, fontSize: "14px", fontWeight: "bold", margin: "0" }}>{service.price}</Text>
                                        </td>
                                        <td style={{ width: "80px", verticalAlign: "middle", textAlign: "right" as const }}>
                                            <Link href={`https://angelnereira.com/services/${service.slug}`} style={{ color: brandColors.primary, fontSize: "12px" }}>Ver →</Link>
                                        </td>
                                    </tr>
                                </table>
                            </Section>
                        ))}

                        <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                            <Button href="https://angelnereira.com/services" style={{ backgroundColor: brandColors.primary, borderRadius: "6px", color: "#000", fontSize: "14px", fontWeight: "bold", padding: "14px 24px" }}>Ver Todos los Servicios</Button>
                        </Section>

                        <Section style={{ backgroundColor: "rgba(19, 109, 86, 0.15)", border: `1px solid ${brandColors.secondary}`, borderRadius: "8px", padding: "16px", margin: "24px 0", textAlign: "center" as const }}>
                            <Text style={{ color: brandColors.textPrimary, fontSize: "14px", fontWeight: "600", margin: "0 0 8px 0" }}>💡 ¿Proyecto personalizado?</Text>
                            <Text style={{ color: brandColors.textSecondary, fontSize: "13px", margin: "0 0 12px 0" }}>Usa la calculadora de presupuestos para obtener una estimación instantánea.</Text>
                            <Link href="https://angelnereira.com/calculadora" style={{ color: brandColors.primary, fontSize: "13px", fontWeight: "bold" }}>Calcular Presupuesto →</Link>
                        </Section>

                        <Hr style={{ borderColor: brandColors.border, margin: "26px 0" }} />
                        <Text style={{ color: brandColors.textMuted, fontSize: "12px", textAlign: "center" as const }}>Ángel Nereira · Ingeniero de Software Full Stack<br />Especialista en FinTech, SaaS y PWA · Panamá</Text>
                        <Section style={{ textAlign: "center" as const, marginTop: "16px" }}>
                            <Link href="https://angelnereira.com" style={{ color: brandColors.primary, fontSize: "12px", marginRight: "16px" }}>Web</Link>
                            <Link href="https://github.com/angelnereira" style={{ color: brandColors.textSecondary, fontSize: "12px", marginRight: "16px" }}>GitHub</Link>
                            <Link href="https://linkedin.com/in/angelnereira" style={{ color: brandColors.textSecondary, fontSize: "12px" }}>LinkedIn</Link>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
