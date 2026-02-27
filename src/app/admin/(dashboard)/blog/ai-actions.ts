"use server"

import { generateBlogContentFlow } from "@/ai/flows/generate-blog-content"

export async function generateBlogWithAI(input: { prompt: string }) {
    try {
        const result = await generateBlogContentFlow(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("AI Blog Generation Error:", error);
        return { success: false, message: "Falló la generación de IA." };
    }
}
