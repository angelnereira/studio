'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a professional CV.
 *
 * The flow takes a user's profile information (about, skills, projects, testimonials)
 * and generates a CV in Markdown format.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  impact: z.string(),
});

const TestimonialSchema = z.object({
  name: z.string(),
  title: z.string(),
  quote: z.string(),
});

const GenerateCvInputSchema = z.object({
  about: z.string().describe('A summary about the person.'),
  skills: z.array(SkillSchema).describe('A list of professional skills.'),
  projects: z.array(ProjectSchema).describe('A list of featured projects.'),
  testimonials: z.array(TestimonialSchema).describe('A list of testimonials from colleagues or clients.'),
});
export type GenerateCvInput = z.infer<typeof GenerateCvInputSchema>;

const GenerateCvOutputSchema = z.object({
  cvContent: z.string().describe('The full CV content in Markdown format.'),
});
export type GenerateCvOutput = z.infer<typeof GenerateCvOutputSchema>;

export async function generateCv(
  input: GenerateCvInput
): Promise<GenerateCvOutput> {
  return generateCvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCvPrompt',
  input: {schema: GenerateCvInputSchema},
  output: {schema: GenerateCvOutputSchema},
  prompt: `You are an expert career coach and resume writer. Generate a comprehensive and well-formatted CV in Markdown for "Ángel Nereira" using the provided information.

Include the following sections:
1.  **Contact Information**: Add placeholders for email, phone, and LinkedIn.
2.  **Summary**: A compelling professional summary based on the 'about' section.
3.  **Skills**: A bulleted list of key skills.
4.  **Professional Experience / Projects**: Detail the most relevant projects, including their impact and technologies.
5.  **Testimonials / Recommendations**: Include the provided testimonials.
6.  **Languages**: Mention "Español (Nativo)" and "English (Advanced)".

## About Me
{{{about}}}

## Skills
{{#each skills}}
- **{{name}}**: {{description}}
{{/each}}

## Projects
{{#each projects}}
- **{{title}}**: {{description}}
  - **Impact**: {{impact}}
  - **Technologies**: {{#each technologies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

## Testimonials
{{#each testimonials}}
- "{{quote}}" - **{{name}}**, {{title}}
{{/each}}
`,
});

const generateCvFlow = ai.defineFlow(
  {
    name: 'generateCvFlow',
    inputSchema: GenerateCvInputSchema,
    outputSchema: GenerateCvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
