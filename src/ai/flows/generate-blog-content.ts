import { z } from "zod";
import { ai } from "../genkit";

export const generateBlogContentFlow = ai.defineFlow(
    {
        name: "generateBlogContent",
        inputSchema: z.object({
            prompt: z.string().describe("Tema del artículo de blog."),
        }),
        outputSchema: z.object({
            title: z.string(),
            content: z.string(),
            excerpt: z.string(),
            seoTitle: z.string(),
            seoDescription: z.string(),
            slug: z.string(),
            keywords: z.string(),
        }),
    },
    async (input) => {
        let systemPrompt = `Eres un copywriter experto en redacción de artículos de blog de tecnología y negocios, especializado en SEO.
Tu objetivo es escribir un artículo de blog completo basado en las instrucciones del usuario.
Debes devolver la salida estructurada de acuerdo al esquema esperado que contiene todas las partes de un post completo.
El "content" debe ser el artículo completo en código HTML semántico, listo para ser insertado en Tiptap. Usa etiquetas <h2>, <h3>, <p>, <ul>, <li>, <strong>, etc. ¡Haz que sea al menos de 4 párrafos e incluye una conclusión!`;

        let userPrompt = `Genera un post de blog optimizado para SEO sobre: ${input.prompt}`;

        const { output } = await ai.generate({
            system: systemPrompt,
            prompt: userPrompt,
            output: {
                schema: z.object({
                    title: z.string(),
                    content: z.string(),
                    excerpt: z.string(),
                    seoTitle: z.string(),
                    seoDescription: z.string(),
                    slug: z.string(),
                    keywords: z.string(),
                })
            }
        });

        if (!output) {
            throw new Error("No output generated from AI");
        }

        return output;
    }
);
