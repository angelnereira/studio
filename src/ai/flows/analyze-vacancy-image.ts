'use server';

/**
 * @fileOverview AI flow for analyzing job vacancy screenshots using Gemini Vision.
 * 
 * Takes a base64 image and extracts job vacancy text using multimodal AI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ============================================
// Input/Output Schemas
// ============================================

const AnalyzeVacancyImageInputSchema = z.object({
    imageBase64: z.string().describe('Base64 encoded image of the job vacancy'),
    imageFormat: z.enum(['image/png', 'image/jpeg', 'image/webp']).optional().default('image/png'),
});
export type AnalyzeVacancyImageInput = z.infer<typeof AnalyzeVacancyImageInputSchema>;

const AnalyzeVacancyImageOutputSchema = z.object({
    extractedText: z.string().describe('The full text extracted from the image'),
    confidence: z.number().min(0).max(1).describe('Confidence of the extraction (0-1)'),
    detectedLanguage: z.enum(['en', 'es', 'unknown']).describe('Detected language of the text'),
    structuredData: z.object({
        company: z.string().nullable(),
        position: z.string().nullable(),
        location: z.string().nullable(),
        requirements: z.array(z.string()).describe('Key requirements found'),
    }).optional(),
});
export type AnalyzeVacancyImageOutput = z.infer<typeof AnalyzeVacancyImageOutputSchema>;

// ============================================
// Prompt Definition
// ============================================

const analyzeVacancyImagePrompt = ai.definePrompt({
    name: 'analyzeVacancyImagePrompt',
    input: { schema: AnalyzeVacancyImageInputSchema },
    output: { schema: AnalyzeVacancyImageOutputSchema },
    model: 'googleai/gemini-2.0-flash-exp',
    config: {
        temperature: 0.3, // Lower temperature for more accurate extraction
    },
    prompt: `You are an expert at extracting text from job vacancy screenshots. Your task is to analyze the provided image and extract all visible job posting information.

## Instructions:
1. **Extract ALL Text**: Carefully read and extract all visible text from the image, including:
   - Company name and logo text
   - Job title/position
   - Location and work mode (remote/hybrid/onsite)
   - Job description and responsibilities
   - Requirements (technical skills, experience, education)
   - Benefits and compensation (if visible)
   - Application instructions and contact information

2. **Preserve Formatting**: Maintain line breaks and structure where logical.

3. **Detect Language**: Identify if the text is in English or Spanish.

4. **Extract Structured Data**: Identify key elements (company, position, location, main requirements).

5. **Confidence Rating**: Rate your confidence in the extraction quality (0.0 to 1.0):
   - 1.0 = Perfect clarity, all text clearly readable
   - 0.7-0.9 = Most text readable, some minor blur
   - 0.4-0.6 = Partial readability, some sections unclear
   - <0.4 = Poor quality, significant text missing

## Image Data:
The image is provided in base64 format.

Return structured JSON with all extracted information.`,
});

// ============================================
// Flow Definition
// ============================================

const analyzeVacancyImageFlow = ai.defineFlow(
    {
        name: 'analyzeVacancyImageFlow',
        inputSchema: AnalyzeVacancyImageInputSchema,
        outputSchema: AnalyzeVacancyImageOutputSchema,
    },
    async (input) => {
        const { output } = await analyzeVacancyImagePrompt(input);
        return output!;
    }
);

// ============================================
// Exported Function
// ============================================

export async function analyzeVacancyImage(
    input: AnalyzeVacancyImageInput
): Promise<AnalyzeVacancyImageOutput> {
    return analyzeVacancyImageFlow(input);
}
