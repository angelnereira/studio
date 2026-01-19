'use server';

/**
 * @fileOverview AI flow for analyzing job vacancies.
 * 
 * Takes vacancy content (text or extracted from image) and produces:
 * - Structured extraction of company, position, requirements
 * - Compatibility analysis with user profile
 * - Keywords and suggestions for application
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ============================================
// Input/Output Schemas
// ============================================

const ProfileDataSchema = z.object({
    name: z.string(),
    summary: z.string(),
    skills: z.array(z.object({
        category: z.string(),
        items: z.array(z.string()),
    })),
    experience: z.array(z.object({
        company: z.string(),
        position: z.string(),
        period: z.string(),
        responsibilities: z.array(z.string()),
        achievements: z.array(z.string()).optional(),
    })),
    yearsOfExperience: z.number().optional(),
});

const AnalyzeVacancyInputSchema = z.object({
    vacancyContent: z.string().describe('The raw text of the job vacancy'),
    profileData: ProfileDataSchema.optional().describe('User profile for compatibility analysis'),
});
export type AnalyzeVacancyInput = z.infer<typeof AnalyzeVacancyInputSchema>;

const RequirementSchema = z.object({
    skill: z.string(),
    level: z.enum(['required', 'preferred', 'nice-to-have']),
    yearsNeeded: z.number().optional(),
});

const AnalyzeVacancyOutputSchema = z.object({
    // Extracted company/job info
    company: z.string().nullable().describe('Company name'),
    position: z.string().nullable().describe('Job title'),
    location: z.string().nullable().describe('Job location'),
    workMode: z.enum(['remote', 'hybrid', 'onsite', 'unknown']).describe('Work arrangement'),
    salaryRange: z.string().nullable().describe('Salary range if mentioned'),

    // Requirements analysis
    requirements: z.object({
        technical: z.array(RequirementSchema),
        softSkills: z.array(z.string()),
        experience: z.object({
            minYears: z.number().nullable(),
            maxYears: z.number().nullable(),
            seniorityLevel: z.enum(['junior', 'mid', 'senior', 'lead', 'manager', 'unknown']),
        }),
        education: z.array(z.string()).optional(),
    }),

    // Keywords for optimization
    keywords: z.array(z.string()).describe('Important keywords from the vacancy'),
    industryDomain: z.string().nullable().describe('Industry or business domain'),

    // Compatibility (only if profile provided)
    compatibilityScore: z.number().min(0).max(100).nullable().describe('Match score 0-100'),
    matchingSkills: z.array(z.string()).describe('Skills that match'),
    missingSkills: z.array(z.string()).describe('Skills to highlight or gaps'),

    // Suggestions
    suggestions: z.string().describe('Tailored suggestions for the application'),
    cultureFit: z.string().nullable().describe('Inferred company culture/values'),
});
export type AnalyzeVacancyOutput = z.infer<typeof AnalyzeVacancyOutputSchema>;

// ============================================
// Prompt Definition
// ============================================

const analyzeVacancyPrompt = ai.definePrompt({
    name: 'analyzeVacancyPrompt',
    input: { schema: AnalyzeVacancyInputSchema },
    output: { schema: AnalyzeVacancyOutputSchema },
    prompt: `You are an expert career advisor and recruiter analyst. Analyze the following job vacancy and extract structured information.

## Job Vacancy Content:
{{{vacancyContent}}}

{{#if profileData}}
## Candidate Profile:
Name: {{profileData.name}}
Summary: {{profileData.summary}}
Years of Experience: {{profileData.yearsOfExperience}}

### Skills:
{{#each profileData.skills}}
**{{category}}**: {{#each items}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

### Experience:
{{#each profileData.experience}}
- **{{position}}** at {{company}} ({{period}})
{{/each}}
{{/if}}

## Instructions:
1. Extract all company, position, location, and salary information from the vacancy
2. Categorize requirements as "required", "preferred", or "nice-to-have"
3. Identify the seniority level expected
4. Extract important keywords that should appear in CV/cover letter
5. {{#if profileData}}Calculate a compatibility score (0-100) based on skill match. Be realistic - a 70+ means strong match.{{/if}}
6. Provide specific, actionable suggestions for tailoring the application
7. Infer the company culture based on language and requirements

Return structured JSON with all fields populated. Use null for unknown values.`,
});

// ============================================
// Flow Definition
// ============================================

const analyzeVacancyFlow = ai.defineFlow(
    {
        name: 'analyzeVacancyFlow',
        inputSchema: AnalyzeVacancyInputSchema,
        outputSchema: AnalyzeVacancyOutputSchema,
    },
    async (input) => {
        const { output } = await analyzeVacancyPrompt(input);
        return output!;
    }
);

// ============================================
// Exported Function
// ============================================

export async function analyzeVacancy(
    input: AnalyzeVacancyInput
): Promise<AnalyzeVacancyOutput> {
    return analyzeVacancyFlow(input);
}
