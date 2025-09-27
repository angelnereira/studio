"use server";

import { analyzeJobCompatibility as originalAnalyzeJobCompatibility, AnalyzeJobCompatibilityInput, AnalyzeJobCompatibilityOutput } from "@/ai/flows/analyze-job-compatibility";
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
  data?: AnalyzeJobCompatibilityOutput;
};

const analyzeJobCompatibility = cache(originalAnalyzeJobCompatibility);

export async function onAnalyze(
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
    const aiInput: AnalyzeJobCompatibilityInput = {
      jobDescription: parsed.data.jobDescription,
      userProfile: parsed.data.userProfile,
    };
    
    const result = await analyzeJobCompatibility(aiInput);

    return {
      message: "Analysis complete.",
      data: result,
    };
  } catch (error) {
    return {
      message: "An error occurred during analysis.",
    };
  }
}