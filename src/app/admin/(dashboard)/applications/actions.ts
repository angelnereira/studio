"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { analyzeVacancy, AnalyzeVacancyOutput } from "@/ai/flows/analyze-vacancy";
import { analyzeVacancyImage } from "@/ai/flows/analyze-vacancy-image";
import { generateApplicationContent, GenerateApplicationContentOutput } from "@/ai/flows/generate-application-content";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { load } from "cheerio";
import type { WorkExperience, SkillCategory, VacancyRequirements, VacancyAnalysis } from "@/types/profile";

// ============================================
// Schemas
// ============================================

const captureVacancySchema = z.object({
    sourceType: z.enum(["text", "screenshot", "url"]),
    content: z.string().min(10, "Content must be at least 10 characters"),
    imageBase64: z.string().optional(),
});

const generateApplicationSchema = z.object({
    vacancyId: z.string().min(1),
    profileId: z.string().min(1),
    language: z.string().optional(),
    model: z.string().optional(),
    recipientName: z.string().optional(),
    recipientEmail: z.string().email().optional(),
});

const sendApplicationSchema = z.object({
    applicationId: z.string(),
});

const updateStatusSchema = z.object({
    applicationId: z.string(),
    status: z.enum(["draft", "ready", "sent", "opened", "replied", "interview", "rejected", "accepted"]),
    notes: z.string().optional(),
});

// ============================================
// Types
// ============================================

export type CaptureVacancyState = {
    success: boolean;
    message: string;
    vacancyId?: string;
    analysis?: AnalyzeVacancyOutput;
};

export type GenerateApplicationState = {
    success: boolean;
    message: string;
    applicationId?: string;
    content?: GenerateApplicationContentOutput;
};

export type SendApplicationState = {
    success: boolean;
    message: string;
    resendId?: string;
};

// ============================================
// Actions
// ============================================

/**
 * Capture and analyze a job vacancy
 */
export async function captureVacancy(
    prevState: CaptureVacancyState,
    formData: FormData
): Promise<CaptureVacancyState> {
    try {
        const parsed = captureVacancySchema.safeParse({
            sourceType: formData.get("sourceType"),
            content: formData.get("content"),
            imageBase64: formData.get("imageBase64") || undefined,
        });

        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues.map((i) => i.message).join(", "),
            };
        }

        let { sourceType, content, imageBase64 } = parsed.data;

        // If screenshot, analyze image with Gemini Vision first
        if (sourceType === "screenshot" && imageBase64) {
            try {
                const imageResult = await analyzeVacancyImage({
                    imageBase64,
                    imageFormat: 'image/png',
                });

                // Use extracted text as content
                content = imageResult.extractedText;

                // If confidence is too low, warn user
                if (imageResult.confidence < 0.5) {
                    return {
                        success: false,
                        message: `Low extraction quality (${Math.round(imageResult.confidence * 100)}%). Please try a clearer screenshot or paste text directly.`,
                    };
                }
            } catch (visionError) {
                console.error("Vision extraction error:", visionError);
                return {
                    success: false,
                    message: "Failed to extract text from image. Please try again or use text input.",
                };
            }
        }

        // If URL, scrape content
        if (sourceType === "url") {
            try {
                // Basic validation
                new URL(content);

                const scrapedContent = await extractTextFromUrl(content);
                if (scrapedContent.length < 100) {
                    // If scraping failed or returned too little text, keep original URL but warn
                    console.warn("Scraped content too short, falling back to URL as context");
                } else {
                    content = scrapedContent;
                }
            } catch (error) {
                console.error("URL scraping error:", error);
                return {
                    success: false,
                    message: "Failed to scrape URL. Please check the link or paste the text manually.",
                };
            }
        }

        // Get user profile for compatibility analysis
        const profile = await prisma.profileBase.findFirst({
            where: { isActive: true },
        });

        // Prepare profile data for AI analysis
        const profileData = profile
            ? {
                name: profile.name,
                summary: profile.summary,
                skills: profile.skills as unknown as SkillCategory[],
                experience: profile.experience as unknown as WorkExperience[],
                yearsOfExperience: (profile.experience as unknown as WorkExperience[])?.length * 2 || 5,
            }
            : undefined;

        // Run AI analysis
        const analysis = await analyzeVacancy({
            vacancyContent: content,
            profileData,
        });

        // Save vacancy to database
        const vacancy = await prisma.jobVacancy.create({
            data: {
                sourceType,
                sourceContent: content,
                sourceImage: imageBase64,
                company: analysis.company,
                position: analysis.position,
                location: analysis.location,
                workMode: analysis.workMode === "unknown" ? null : analysis.workMode,
                salaryRange: analysis.salaryRange,
                analysis: JSON.parse(JSON.stringify(analysis)),
                requirements: JSON.parse(JSON.stringify(analysis.requirements)),
                keywords: analysis.keywords,
                compatibilityScore: analysis.compatibilityScore,
                suggestions: analysis.suggestions,
                status: "analyzed",
            },
        });

        revalidatePath("/admin/applications");

        return {
            success: true,
            message: "Vacancy analyzed successfully",
            vacancyId: vacancy.id,
            analysis,
        };
    } catch (error) {
        console.error("Error capturing vacancy:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to analyze vacancy",
        };
    }
}

/**
 * Generate personalized CV and email content
 */
export async function generateApplication(
    prevState: GenerateApplicationState,
    formData: FormData
): Promise<GenerateApplicationState> {
    try {
        const parsed = generateApplicationSchema.safeParse({
            profileId: formData.get("profileId"),
            language: formData.get("language") || "es",
            model: formData.get("model") || "gemini",
            recipientName: formData.get("recipientName") || undefined,
            recipientEmail: formData.get("recipientEmail") || undefined,
        });

        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues.map((i) => i.message).join(", "),
            };
        }

        const { vacancyId, profileId, language, model, recipientName, recipientEmail } = parsed.data;

        // Fetch vacancy and profile
        const [vacancy, profile] = await Promise.all([
            prisma.jobVacancy.findUnique({ where: { id: vacancyId } }),
            prisma.profileBase.findUnique({ where: { id: profileId } }),
        ]);

        if (!vacancy || !profile) {
            return {
                success: false,
                message: "Vacancy or profile not found",
            };
        }

        // Generate personalized content
        const content = await generateApplicationContent({
            profile: {
                name: profile.name,
                email: profile.email,
                phone: profile.phone || undefined,
                location: profile.location || undefined,
                summary: profile.summary,
                experience: profile.experience as unknown as WorkExperience[],
                skills: profile.skills as unknown as SkillCategory[],
                education: (profile.education as unknown as Array<{ institution: string; degree: string; year?: string }>),
                languages: (profile.languages as unknown as Array<{ language: string; level: string }>) || undefined,
                socialLinks: profile.socialLinks as Record<string, string> || undefined,
            },
            vacancy: {
                company: vacancy.company,
                position: vacancy.position,
                requirements: {
                    technical: (vacancy.requirements as VacancyRequirements)?.technical?.map((r) => r.skill) || [],
                    softSkills: (vacancy.requirements as VacancyRequirements)?.softSkills || [],
                },
                keywords: vacancy.keywords,
                industryDomain: (vacancy.analysis as VacancyAnalysis)?.industryDomain || null,
                cultureFit: (vacancy.analysis as VacancyAnalysis)?.cultureFit || null,
            },
            recipientName,
            language: (language === 'es' ? 'es' : 'en') as 'en' | 'es',
        });

        // Create application record
        const application = await prisma.application.create({
            data: {
                vacancyId,
                profileId,
                cvContent: JSON.parse(JSON.stringify(content.cv)),
                emailSubject: content.email.subject,
                emailHtml: `${content.email.greeting}\n\n${content.email.opening}\n\n${content.email.body}\n\n${content.email.closing}\n\n${content.email.signature}`,
                emailText: `${content.email.greeting}\n\n${content.email.opening}\n\n${content.email.body}\n\n${content.email.closing}\n\n${content.email.signature}`,
                recipientEmail,
                recipientName,
                status: "ready",
            },
        });

        revalidatePath("/admin/applications");

        return {
            success: true,
            message: "Application generated successfully",
            applicationId: application.id,
            content,
        };
    } catch (error) {
        console.error("Error generating application:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to generate application",
        };
    }
}

/**
 * Send application via email with CV attachment
 */
export async function sendApplication(
    applicationId: string
): Promise<SendApplicationState> {
    try {
        const application = await prisma.application.findUnique({
            where: { id: applicationId },
            include: { vacancy: true, profile: true },
        });

        if (!application) {
            return { success: false, message: "Application not found" };
        }

        if (!application.recipientEmail) {
            return { success: false, message: "No recipient email set" };
        }

        if (!process.env.RESEND_API_KEY) {
            return { success: false, message: "Email service not configured" };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Generate PDF attachment from CV content
        let attachments: { filename: string; content: Buffer }[] = [];
        try {
            const cvContent = application.cvContent as Record<string, unknown>;
            if (cvContent) {
                const { default: jsPDF } = await import('jspdf');
                const doc = new jsPDF();
                const profile = application.profile;
                const vacancy = application.vacancy;

                // Simple but professional CV PDF
                const pageWidth = doc.internal.pageSize.getWidth();
                const margin = 20;
                const contentWidth = pageWidth - 2 * margin;
                let y = 20;

                // Header
                doc.setFillColor(223, 255, 0);
                doc.rect(0, 0, pageWidth, 50, 'F');
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(24);
                doc.setFont('helvetica', 'bold');
                doc.text(profile.name, margin, y + 12);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text([profile.email, profile.phone, profile.location].filter(Boolean).join(' · '), margin, y + 22);

                y = 60;
                doc.setTextColor(255, 255, 255);

                // Target position
                if (vacancy.position && vacancy.company) {
                    doc.setFillColor(30, 30, 30);
                    doc.roundedRect(margin, y, contentWidth, 12, 3, 3, 'F');
                    doc.setFontSize(9);
                    doc.setTextColor(223, 255, 0);
                    doc.text(`Application for: ${vacancy.position} at ${vacancy.company}`, margin + 5, y + 8);
                    y += 20;
                }

                // Summary
                const summary = (cvContent.summary as string) || profile.summary;
                if (summary) {
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(223, 255, 0);
                    doc.text('Professional Summary', margin, y);
                    y += 7;
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(180, 180, 180);
                    const lines = doc.splitTextToSize(summary, contentWidth);
                    lines.forEach((line: string) => { doc.text(line, margin, y); y += 4.5; });
                    y += 5;
                }

                // Skills
                const skills = (cvContent.skillsHighlighted as string[]) || [];
                if (skills.length > 0) {
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(223, 255, 0);
                    doc.text('Key Skills', margin, y);
                    y += 7;
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(255, 255, 255);
                    doc.text(skills.slice(0, 15).join(' · '), margin, y);
                    y += 10;
                }

                // Experience
                const experience = (cvContent.experience as Record<string, unknown>[]) || [];
                if (experience.length > 0) {
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(223, 255, 0);
                    doc.text('Professional Experience', margin, y);
                    y += 7;
                    experience.slice(0, 5).forEach((exp) => {
                        if (y > 270) { doc.addPage(); y = 20; }
                        doc.setFontSize(10);
                        doc.setFont('helvetica', 'bold');
                        doc.setTextColor(255, 255, 255);
                        doc.text(String(exp.position || ''), margin, y);
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(156, 163, 175);
                        doc.text(`${exp.company || ''} · ${exp.period || ''}`, margin, y + 5);
                        y += 12;
                        const highlights = (exp.highlights as string[]) || [];
                        highlights.slice(0, 3).forEach((h: string) => {
                            const hLines = doc.splitTextToSize(`• ${h}`, contentWidth - 5);
                            hLines.forEach((line: string) => { doc.text(line, margin + 3, y); y += 4; });
                        });
                        y += 3;
                    });
                }

                // Generate buffer
                const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
                const safeName = profile.name.replace(/\s+/g, '_');
                const safeCompany = (vacancy.company || 'General').replace(/\s+/g, '_');
                attachments = [{
                    filename: `${safeName}_CV_${safeCompany}.pdf`,
                    content: pdfBuffer,
                }];
            }
        } catch (pdfError) {
            console.error('PDF generation failed, sending without attachment:', pdfError);
            // Continue without attachment
        }

        const result = await resend.emails.send({
            from: `${application.profile.name} <contact@angelnereira.com>`,
            to: [application.recipientEmail],
            subject: application.emailSubject,
            html: application.emailHtml,
            text: application.emailText,
            replyTo: application.profile.email,
            ...(attachments.length > 0 && { attachments }),
        });

        if (result.error) {
            return { success: false, message: result.error.message };
        }

        // Update application status
        await prisma.application.update({
            where: { id: applicationId },
            data: {
                status: "sent",
                sentAt: new Date(),
                resendId: result.data?.id,
            },
        });

        // Update vacancy status
        await prisma.jobVacancy.update({
            where: { id: application.vacancyId },
            data: { status: "applied" },
        });

        revalidatePath("/admin/applications");

        return {
            success: true,
            message: "Application sent successfully",
            resendId: result.data?.id,
        };
    } catch (error) {
        console.error("Error sending application:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to send application",
        };
    }
}

/**
 * Update application status and notes
 */
export async function updateApplicationStatus(
    prevState: { success: boolean; message: string },
    formData: FormData
): Promise<{ success: boolean; message: string }> {
    try {
        const parsed = updateStatusSchema.safeParse({
            applicationId: formData.get("applicationId"),
            status: formData.get("status"),
            notes: formData.get("notes") || undefined,
        });

        if (!parsed.success) {
            return { success: false, message: "Invalid data" };
        }

        await prisma.application.update({
            where: { id: parsed.data.applicationId },
            data: {
                status: parsed.data.status,
                notes: parsed.data.notes,
                responseAt: ["replied", "interview", "rejected", "accepted"].includes(parsed.data.status)
                    ? new Date()
                    : undefined,
            },
        });

        revalidatePath("/admin/applications");

        return { success: true, message: "Status updated" };
    } catch (error) {
        return { success: false, message: "Failed to update status" };
    }
}


/**
 * Helper to extract text from a URL using cheerio
 */
async function extractTextFromUrl(url: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        const $ = load(html);

        // Remove unwanted elements
        $("script, style, iframe, noscript, nav, footer, header, svg, button, input, form, meta, link").remove();

        // Try to find main content area
        let mainContent = $("main, article, [role='main'], #main-content, .job-description, .description").first();

        // If no specific main content found, use body
        if (mainContent.length === 0) {
            mainContent = $("body");
        }

        // Extract text with clean whitespace
        let text = mainContent.text();

        // Clean up excessive whitespace
        text = text.replace(/\s+/g, " ").trim();

        return text.substring(0, 20000); // Limit to ~20k chars
    } finally {
        clearTimeout(timeoutId);
    }
}
