"use server"

import { generateEmailFlow } from "@/ai/flows/generate-email"

export async function generateEmailWithAI(input: {
    prompt: string;
    currentSubject?: string;
    currentBody?: string;
    action?: "generate" | "improve" | "shorten" | "professional";
}) {
    try {
        const actionVal = input.action || "generate";
        const result = await generateEmailFlow({
            prompt: input.prompt,
            currentSubject: input.currentSubject,
            currentBody: input.currentBody,
            action: actionVal,
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("AI Email Generation Error:", error);
        return { success: false, message: "Falló la generación de IA." };
    }
}
