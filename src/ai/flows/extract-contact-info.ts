import { z } from "zod";
import { ai } from "../genkit";

export const extractContactInfoFlow = ai.defineFlow(
    {
        name: "extractContactInfo",
        inputSchema: z.object({
            text: z.string().describe("Texto libre pegado por el usuario (ej. firma de correo, mensaje de WhatsApp)."),
        }),
        outputSchema: z.object({
            name: z.string().describe("Nombre de la persona, o vacío si no se encuentra"),
            email: z.string().describe("Correo electrónico, o vacío si no se encuentra"),
            phone: z.string().describe("Número de teléfono, o vacío si no se encuentra"),
            company: z.string().describe("Nombre de la empresa, o vacío si no se encuentra"),
        }),
    },
    async (input) => {
        const systemPrompt = `Eres un asistente experto en extracción de datos.
Se te dará un texto libre que puede ser una firma de correo, un mensaje o un bloque de notas.
Tu objetivo es extraer el nombre de la persona, correo electrónico, teléfono y empresa.
Devuelve SIEMPRE la salida estructurada solicitada. Si no encuentras algún dato, envíalo como string vacío o deja que Genkit lo omita en el JSON según el esquema.
Intenta limpiar caracteres extraños. Convierte el email a minúsculas.`;

        const userPrompt = `Texto a analizar:\n${input.text}`;

        const { output } = await ai.generate({
            system: systemPrompt,
            prompt: userPrompt,
            output: {
                schema: z.object({
                    name: z.string().default(""),
                    email: z.string().default(""),
                    phone: z.string().default(""),
                    company: z.string().default(""),
                })
            }
        });

        if (!output) {
            throw new Error("No output generated from AI");
        }

        return output;
    }
);
