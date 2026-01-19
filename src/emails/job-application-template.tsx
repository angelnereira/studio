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
import { brandColors, tailwindConfig, Logo, EmailFooter } from "./base-template";

interface JobApplicationEmailProps {
    recipientName?: string;
    companyName?: string;
    positionTitle?: string;
    emailContent: {
        greeting: string;
        opening: string;
        body: string;
        closing: string;
    };
    applicantName: string;
    portfolioUrl?: string;
    linkedInUrl?: string;
    githubUrl?: string;
}

export default function JobApplicationEmail({
    recipientName,
    companyName = "your company",
    positionTitle = "the open position",
    emailContent,
    applicantName,
    portfolioUrl = "https://angelnereira.com",
    linkedInUrl = "https://linkedin.com/in/angelnereira",
    githubUrl = "https://github.com/angelnereira",
}: JobApplicationEmailProps) {
    const previewText = `Application for ${positionTitle} at ${companyName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind config={tailwindConfig}>
                <Body
                    style={{
                        backgroundColor: brandColors.background,
                        color: brandColors.textPrimary,
                        fontFamily: "'Inter', 'Helvetica', sans-serif",
                        margin: "0 auto",
                        padding: "0",
                    }}
                >
                    <Container
                        style={{
                            padding: "20px",
                            margin: "0 auto",
                            maxWidth: "600px",
                            width: "100%",
                        }}
                    >
                        <Logo />

                        {/* Main Content */}
                        <Section style={{ marginTop: "32px" }}>
                            {/* Greeting */}
                            <Text
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                    color: brandColors.textPrimary,
                                    marginBottom: "16px",
                                }}
                            >
                                {emailContent.greeting}
                            </Text>

                            {/* Opening */}
                            <Text
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                    color: brandColors.textPrimary,
                                    marginBottom: "16px",
                                }}
                            >
                                {emailContent.opening}
                            </Text>

                            {/* Body */}
                            <Text
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                    color: brandColors.textSecondary,
                                    marginBottom: "16px",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {emailContent.body}
                            </Text>

                            {/* Closing */}
                            <Text
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                    color: brandColors.textPrimary,
                                    marginBottom: "24px",
                                }}
                            >
                                {emailContent.closing}
                            </Text>

                            {/* Quick Links */}
                            <Section
                                style={{
                                    backgroundColor: brandColors.cardBg,
                                    borderRadius: "8px",
                                    padding: "20px",
                                    marginBottom: "24px",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: brandColors.primary,
                                        marginBottom: "12px",
                                        margin: "0 0 12px 0",
                                    }}
                                >
                                    Quick Links
                                </Text>
                                <table style={{ width: "100%" }}>
                                    <tr>
                                        <td style={{ paddingRight: "8px" }}>
                                            <Link
                                                href={portfolioUrl}
                                                style={{
                                                    display: "inline-block",
                                                    padding: "10px 16px",
                                                    backgroundColor: brandColors.primary,
                                                    color: "#000000",
                                                    textDecoration: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                View Portfolio
                                            </Link>
                                        </td>
                                        <td style={{ paddingRight: "8px" }}>
                                            <Link
                                                href={linkedInUrl}
                                                style={{
                                                    display: "inline-block",
                                                    padding: "10px 16px",
                                                    backgroundColor: "transparent",
                                                    color: brandColors.primary,
                                                    textDecoration: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    border: `1px solid ${brandColors.primary}`,
                                                }}
                                            >
                                                LinkedIn
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                href={githubUrl}
                                                style={{
                                                    display: "inline-block",
                                                    padding: "10px 16px",
                                                    backgroundColor: "transparent",
                                                    color: brandColors.textSecondary,
                                                    textDecoration: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    border: `1px solid ${brandColors.border}`,
                                                }}
                                            >
                                                GitHub
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                            </Section>

                            {/* Signature */}
                            <Text
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                    color: brandColors.textPrimary,
                                    marginBottom: "4px",
                                }}
                            >
                                Saludos cordiales,
                            </Text>
                            <Text
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: brandColors.primary,
                                    margin: "0",
                                }}
                            >
                                {applicantName}
                            </Text>
                        </Section>

                        <EmailFooter />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

// Default props for preview
JobApplicationEmail.PreviewProps = {
    recipientName: "María García",
    companyName: "Tech Startup",
    positionTitle: "Senior Full Stack Developer",
    emailContent: {
        greeting: "Estimada María,",
        opening:
            "Espero que este mensaje le encuentre bien. Le escribo para expresar mi interés en la posición de Senior Full Stack Developer en Tech Startup.",
        body: `Con más de 5 años de experiencia en desarrollo de software, he trabajado extensamente con tecnologías como React, Next.js, Node.js y PostgreSQL. En mi rol actual, he liderado proyectos que han aumentado la eficiencia operativa en un 40% mediante soluciones personalizadas.

Me atrae particularmente la visión de Tech Startup de innovar en el espacio fintech, y creo que mi experiencia en el desarrollo de aplicaciones escalables y seguras sería una contribución valiosa para su equipo.`,
        closing:
            "Adjunto mi CV para su revisión. Quedo a disposición para una conversación donde pueda compartir más sobre cómo podría contribuir al éxito de Tech Startup.",
    },
    applicantName: "Ángel Nereira",
} as JobApplicationEmailProps;
