'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized cover letters using Gemini.
 *
 * The flow takes job requirements and a user profile as input and generates a tailored cover letter.
 * It exports the `generatePersonalizedCoverLetter` function, the `GeneratePersonalizedCoverLetterInput` type, and the `GeneratePersonalizedCoverLetterOutput` type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedCoverLetterInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The description of the job, including requirements.'),
  userProfile: z.string().describe('The user profile, including skills and experience.'),
});
export type GeneratePersonalizedCoverLetterInput = z.infer<
  typeof GeneratePersonalizedCoverLetterInputSchema
>;

const GeneratePersonalizedCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The personalized cover letter.'),
});
export type GeneratePersonalizedCoverLetterOutput = z.infer<
  typeof GeneratePersonalizedCoverLetterOutputSchema
>;

export async function generatePersonalizedCoverLetter(
  input: GeneratePersonalizedCoverLetterInput
): Promise<GeneratePersonalizedCoverLetterOutput> {
  return generatePersonalizedCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedCoverLetterPrompt',
  input: {schema: GeneratePersonalizedCoverLetterInputSchema},
  output: {schema: GeneratePersonalizedCoverLetterOutputSchema},
  prompt: `You are an expert resume and cover letter writer.

  Given the following job description and user profile, write a personalized cover letter.

  Job Description: {{{jobDescription}}}
  User Profile: {{{userProfile}}}

  Cover Letter:`,
});

const generatePersonalizedCoverLetterFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedCoverLetterFlow',
    inputSchema: GeneratePersonalizedCoverLetterInputSchema,
    outputSchema: GeneratePersonalizedCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
