'use server';

/**
 * @fileOverview AI flow for generating personalized application content.
 * 
 * Takes profile data and vacancy analysis to produce:
 * - Personalized CV content (reordered/emphasized for the role)
 * - Professional email body tailored to the vacancy
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ============================================
// Input/Output Schemas
// ============================================

const ProfileForApplicationSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    location: z.string().optional(),
    summary: z.string(),
    experience: z.array(z.object({
        company: z.string(),
        position: z.string(),
        period: z.string(),
        responsibilities: z.array(z.string()),
        achievements: z.array(z.string()).optional(),
    })),
    skills: z.array(z.object({
        category: z.string(),
        items: z.array(z.string()),
    })),
    education: z.array(z.object({
        institution: z.string(),
        degree: z.string(),
        year: z.string().optional(),
    })),
    languages: z.array(z.object({
        language: z.string(),
        level: z.string(),
    })).optional(),
    socialLinks: z.object({
        linkedin: z.string().optional(),
        github: z.string().optional(),
        portfolio: z.string().optional(),
    }).optional(),
});

const VacancyContextSchema = z.object({
    company: z.string().nullable(),
    position: z.string().nullable(),
    requirements: z.object({
        technical: z.array(z.string()),
        softSkills: z.array(z.string()),
    }),
    keywords: z.array(z.string()),
    industryDomain: z.string().nullable(),
    cultureFit: z.string().nullable(),
});

const GenerateApplicationContentInputSchema = z.object({
    profile: ProfileForApplicationSchema,
    vacancy: VacancyContextSchema,
    recipientName: z.string().optional().describe('Name of the recruiter/hiring manager'),
    language: z.enum(['en', 'es']).default('es').describe('Output language'),
    model: z.string().optional().describe('AI Model to use (gemini, claude, gpt4o)'),
});
export type GenerateApplicationContentInput = z.infer<typeof GenerateApplicationContentInputSchema>;

const PersonalizedCVSchema = z.object({
    summary: z.string().describe('Tailored professional summary for this role'),
    experience: z.array(z.object({
        company: z.string(),
        position: z.string(),
        period: z.string(),
        highlights: z.array(z.string()).describe('Rewritten bullet points emphasizing relevant achievements'),
        relevanceScore: z.number().min(0).max(100).describe('How relevant this experience is'),
    })),
    skillsHighlighted: z.array(z.string()).describe('Skills to emphasize, ordered by relevance'),
    keywordsIncorporated: z.array(z.string()).describe('Vacancy keywords naturally incorporated'),
});

const EmailContentSchema = z.object({
    subject: z.string().describe('Professional email subject line'),
    greeting: z.string(),
    opening: z.string().describe('Compelling opening that shows interest in the specific role'),
    body: z.string().describe('Main content highlighting fit and value proposition'),
    closing: z.string().describe('Professional closing with call to action'),
    signature: z.string(),
});

const GenerateApplicationContentOutputSchema = z.object({
    cv: PersonalizedCVSchema,
    email: EmailContentSchema,
    coverLetterSuggestion: z.string().optional().describe('Optional longer cover letter if needed'),
});
export type GenerateApplicationContentOutput = z.infer<typeof GenerateApplicationContentOutputSchema>;

// ============================================
// Prompt Definition
// ============================================

const generateApplicationContentPrompt = ai.definePrompt({
    name: 'generateApplicationContentPrompt',
    input: { schema: GenerateApplicationContentInputSchema },
    output: { schema: GenerateApplicationContentOutputSchema },
    prompt: `You are an expert career coach helping a software engineer create the perfect job application. Generate highly personalized content.

## Candidate Profile:
**Name:** {{profile.name}}
**Email:** {{profile.email}}
{{#if profile.phone}}**Phone:** {{profile.phone}}{{/if}}
{{#if profile.location}}**Location:** {{profile.location}}{{/if}}

**Summary:** {{profile.summary}}

### Experience:
{{#each profile.experience}}
**{{position}}** at {{company}} ({{period}})
{{#each responsibilities}}- {{this}}
{{/each}}
{{#if achievements}}Achievements: {{#each achievements}}- {{this}}{{/each}}{{/if}}
{{/each}}

### Skills:
{{#each profile.skills}}
**{{category}}:** {{#each items}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

### Education:
{{#each profile.education}}
- {{degree}} from {{institution}}{{#if year}} ({{year}}){{/if}}
{{/each}}

{{#if profile.languages}}
### Languages:
{{#each profile.languages}}- {{language}}: {{level}}
{{/each}}
{{/if}}

---

## Target Vacancy:
**Company:** {{vacancy.company}}
**Position:** {{vacancy.position}}
**Industry:** {{vacancy.industryDomain}}
{{#if vacancy.cultureFit}}**Culture:** {{vacancy.cultureFit}}{{/if}}

**Technical Requirements:** {{#each vacancy.requirements.technical}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
**Soft Skills:** {{#each vacancy.requirements.softSkills}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
**Keywords to Include:** {{#each vacancy.keywords}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

{{#if recipientName}}**Recipient:** {{recipientName}}{{/if}}

---

## Instructions:
Generate content in **{{language}}** (es = Spanish, en = English).

### For the CV:
1. Rewrite the professional summary to directly address this role
2. Reorder and rewrite experience highlights to emphasize relevant achievements
3. Prioritize skills matching the requirements
4. Naturally incorporate keywords from the vacancy

### For the Email:
1. Create a compelling subject line that stands out
2. Show you researched the company (use company name and industry)
3. Lead with your strongest relevant qualification
4. Be concise but show genuine interest
5. Include a clear call to action
6. {{#if recipientName}}Address {{recipientName}} directly{{else}}Use a professional generic greeting{{/if}}

### Tone:
- Professional but personable
- Confident without being arrogant
- Adapt to inferred company culture (startup vs corporate)

Return structured JSON with all fields.`,
});

// ============================================
// Flow Definition
// ============================================

const generateApplicationContentFlow = ai.defineFlow(
    {
        name: 'generateApplicationContentFlow',
        inputSchema: GenerateApplicationContentInputSchema,
        outputSchema: GenerateApplicationContentOutputSchema,
    },
    async (input) => {
        let modelName = 'googleai/gemini-2.5-flash';

        switch (input.model) {
            case 'claude':
                modelName = 'anthropic/claude-3-5-sonnet';
                break;
            case 'gpt4o':
                modelName = 'openai/gpt-4o';
                break;
            default:
                modelName = 'googleai/gemini-2.5-flash';
        }

        const { output } = await generateApplicationContentPrompt(input, {
            model: modelName
        });
        return output!;
    }
);

// ============================================
// Exported Function
// ============================================

export async function generateApplicationContent(
    input: GenerateApplicationContentInput
): Promise<GenerateApplicationContentOutput> {
    return generateApplicationContentFlow(input);
}
