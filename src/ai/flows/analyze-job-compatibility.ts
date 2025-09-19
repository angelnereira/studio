'use server';

/**
 * @fileOverview A job compatibility analysis AI agent.
 *
 * - analyzeJobCompatibility - A function that handles the job compatibility analysis process.
 * - AnalyzeJobCompatibilityInput - The input type for the analyzeJobCompatibility function.
 * - AnalyzeJobCompatibilityOutput - The return type for the analyzeJobCompatibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJobCompatibilityInputSchema = z.object({
  jobDescription: z.string().describe('The full text of the job description.'),
  userProfile: z.string().describe('The user profile, including skills and experience.'),
});
export type AnalyzeJobCompatibilityInput = z.infer<
  typeof AnalyzeJobCompatibilityInputSchema
>;

const AnalyzeJobCompatibilityOutputSchema = z.object({
  compatibilityScore: z
    .number()
    .describe('A score between 0 and 1 representing the compatibility.'),
  analysis: z
    .string()
    .describe('A detailed analysis of the compatibility between the job description and the user profile.'),
  suggestions: z
    .string()
    .describe('Suggestions for improving the profile based on the job description.'),
});
export type AnalyzeJobCompatibilityOutput = z.infer<
  typeof AnalyzeJobCompatibilityOutputSchema
>;

export async function analyzeJobCompatibility(
  input: AnalyzeJobCompatibilityInput
): Promise<AnalyzeJobCompatibilityOutput> {
  return analyzeJobCompatibilityFlow(input);
}

const analyzeJobCompatibilityPrompt = ai.definePrompt({
  name: 'analyzeJobCompatibilityPrompt',
  input: {schema: AnalyzeJobCompatibilityInputSchema},
  output: {schema: AnalyzeJobCompatibilityOutputSchema},
  prompt: `You are an expert career advisor. You will analyze a job description and a user profile to determine the compatibility between them.\n\nJob Description: {{{jobDescription}}}\n\nUser Profile: {{{userProfile}}}\n\nProvide a compatibility score between 0 and 1, a detailed analysis of the compatibility, and suggestions for improving the profile.\n\nFormat your response as a JSON object that conforms to the following schema:\n${JSON.stringify(AnalyzeJobCompatibilityOutputSchema)}`,
});

const analyzeJobCompatibilityFlow = ai.defineFlow(
  {
    name: 'analyzeJobCompatibilityFlow',
    inputSchema: AnalyzeJobCompatibilityInputSchema,
    outputSchema: AnalyzeJobCompatibilityOutputSchema,
  },
  async input => {
    const {output} = await analyzeJobCompatibilityPrompt(input);
    return output!;
  }
);

