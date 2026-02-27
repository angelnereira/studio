import { z } from "zod";
import { ai } from "../genkit";

export const generateEmailFlow = ai.defineFlow(
    {
        name: "generateEmail",
        inputSchema: z.object({
            prompt: z.string().describe("Instrucciones para generar el correo."),
            currentSubject: z.string().optional().describe("Asunto actual si es que se quiere mejorar"),
            currentBody: z.string().optional().describe("Cuerpo HTML actual si es que se quiere mejorar"),
            action: z.enum(["generate", "improve", "shorten", "professional"]).default("generate").describe("Acción a realizar"),
        }),
        outputSchema: z.object({
            subject: z.string(),
            htmlBody: z.string(),
        }),
    },
    async (input) => {
        let systemPrompt = `Eres un asistente experto en redacción de correos electrónicos profesionales y marketing.
Tu objetivo es ayudar al usuario a redactar o mejorar un correo.
Debes devolver SIEMPRE tu salida estructurada de acuerdo al esquema esperado.
El cuerpo HTML debe ser contenido limpio, listo para ser insertado. No uses etiquetas <html>, <head> o <body>, solo el contenido interior como <div>, <p>, <h1>, etc. Usa estilos en línea básicos si es necesario para darle formato profesional.`;

        let userPrompt = `Acción solicitada: ${input.action}\n`;
        if (input.action === "generate") {
            userPrompt += `Instrucciones del usuario: ${input.prompt}\n`;
        } else {
            systemPrompt += `\nEl usuario proporciona un correo existente. Debes realizar la acción "${input.action}" sobre él.`;
            if (input.action === "improve") systemPrompt += " Mejora la redacción, corrige ortografía y hazlo más persuasivo manteniendo HTML valido.";
            if (input.action === "shorten") systemPrompt += " Resume el contenido sin perder el mensaje principal.";
            if (input.action === "professional") systemPrompt += " Cambia el tono a uno más formal y corporativo.";

            userPrompt += `Instrucciones adicionales del usuario: ${input.prompt}\n`;
            userPrompt += `Asunto original: ${input.currentSubject || 'N/A'}\n`;
            userPrompt += `Cuerpo HTML original:\n${input.currentBody || 'N/A'}\n`;
        }

        const { output } = await ai.generate({
            system: systemPrompt,
            prompt: userPrompt,
            output: {
                schema: z.object({
                    subject: z.string(),
                    htmlBody: z.string(),
                })
            }
        });

        if (!output) {
            throw new Error("No output generated from AI");
        }

        return output;
    }
);
