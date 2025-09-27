"use server";

import { generatePersonalizedCoverLetter as originalGeneratePersonalizedCoverLetter, GeneratePersonalizedCoverLetterInput, GeneratePersonalizedCoverLetterOutput } from "@/ai/flows/generate-personalized-cover-letters";
import { cache } from "react";
import { z } from "zod";

const formSchema = z.object({
  jobDescription: z.string().min(50, "Job description must be at least 50 characters."),
  userProfile: z.string().min(50, "User profile must be at least 50 characters."),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: GeneratePersonalizedCoverLetterOutput;
};

const generatePersonalizedCoverLetter = cache(originalGeneratePersonalizedCoverLetter);

export async function onGenerate(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      fields: Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value as string])
      ),
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const aiInput: GeneratePersonalizedCoverLetterInput = {
      jobDescription: parsed.data.jobDescription,
      userProfile: parsed.data.userProfile,
    };
    
    const result = await generatePersonalizedCoverLetter(aiInput);

    return {
      message: "Cover letter generated.",
      data: result,
    };
  } catch (error) {
    return {
      message: "An error occurred during generation.",
    };
  }
}