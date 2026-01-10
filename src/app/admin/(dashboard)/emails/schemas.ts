import { z } from "zod"

// --- Schemas ---

export const SenderIdentitySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
})

export const TemplateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    subject: z.string().min(1, "Subject is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().optional(),
})

export const CampaignSchema = z.object({
    name: z.string().min(2, "Internal name is required"),
    subject: z.string().min(1, "Subject is required"),
    content: z.string().min(1, "Content is required"),
    senderId: z.string().min(1, "Sender Identity is required"),
    templateId: z.string().optional(),
    audienceFilter: z.record(z.any()).optional(), // { formType: 'client', ... }
    scheduledAt: z.date().optional(),
    attachments: z.array(z.object({
        filename: z.string(),
        content: z.string(), // Base64
    })).optional()
})

// Export types for use in other files
export type SenderIdentityInput = z.infer<typeof SenderIdentitySchema>
export type TemplateInput = z.infer<typeof TemplateSchema>
export type CampaignInput = z.infer<typeof CampaignSchema>
