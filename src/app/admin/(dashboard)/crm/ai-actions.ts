"use server"

import { extractContactInfoFlow } from "@/ai/flows/extract-contact-info"

export async function extractContactWithAI(input: { text: string }) {
    try {
        const result = await extractContactInfoFlow(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("AI CRM Extraction Error:", error);
        return { success: false, message: "Falló la extracción de datos con IA." };
    }
}
