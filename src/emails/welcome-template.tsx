
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    name?: string;
    previewText?: string;
}

export default function WelcomeEmail({
    name = "Client",
    previewText = "Welcome to Angel Nereira Studio",
}: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#DFFF00", // Acid Lime
                                background: "#080c0a", // Deep Forest
                                secondary: "#136D56", // Muted Teal
                            },
                        },
                    },
                }}
            >
                <Body className="bg-background text-white font-sans antialiased my-auto mx-auto px-2">
                    <Container className="border border-white/10 rounded-lg p-8 my-8 mx-auto max-w-[465px] bg-zinc-950/50 backdrop-blur-sm shadow-2xl">
                        <Section className="mt-8">
                            {/* Logo Placeholder - You would replace this with your actual logo URL */}
                            <div className="w-12 h-12 bg-primary rounded-lg mx-auto flex items-center justify-center text-black font-bold text-xl">
                                AN
                            </div>
                        </Section>
                        <Heading className="text-white text-[24px] font-bold text-center p-0 my-[30px] mx-0">
                            Bienvenido, {name}
                        </Heading>
                        <Text className="text-gray-300 text-[14px] leading-[24px]">
                            Gracias por conectar. Soy Ángel Nereira, Ingeniero de Software Full Stack.
                        </Text>
                        <Text className="text-gray-300 text-[14px] leading-[24px]">
                            He recibido tu solicitud y estoy revisando los detalles de tu proyecto. Este es el inicio de la construcción de algo escalable.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-primary rounded text-black text-[12px] font-bold no-underline text-center px-5 py-3"
                                href="https://angelnereira.com"
                            >
                                Ver Portafolio
                            </Button>
                        </Section>
                        <Hr className="border border-white/10 my-[26px] mx-0 w-full" />
                        <Text className="text-gray-500 text-[12px] leading-[24px]">
                            Especialista en FinTech, SaaS y PWA Offline-First.
                            <br />
                            Panamá
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
