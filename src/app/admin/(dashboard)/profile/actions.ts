"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface ProfileData {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    documentId?: string;
    citizenship?: string;
    summary: string;
    experience: any[];
    skills: any[];
    education: any[];
    languages?: any[];
    socialLinks?: any;
    projects?: any[];
}

export async function saveProfile(data: ProfileData): Promise<{ success: boolean; message: string }> {
    try {
        if (data.id) {
            // Update existing profile
            await prisma.profileBase.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    location: data.location,
                    documentId: data.documentId,
                    citizenship: data.citizenship,
                    summary: data.summary,
                    experience: data.experience,
                    skills: data.skills,
                    education: data.education,
                    languages: data.languages,
                    socialLinks: data.socialLinks,
                    projects: data.projects,
                },
            });
        } else {
            // Create new profile
            await prisma.profileBase.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    location: data.location,
                    documentId: data.documentId,
                    citizenship: data.citizenship,
                    summary: data.summary,
                    experience: data.experience,
                    skills: data.skills,
                    education: data.education,
                    languages: data.languages,
                    socialLinks: data.socialLinks,
                    projects: data.projects,
                    isActive: true,
                },
            });
        }

        revalidatePath("/admin/profile");
        revalidatePath("/admin/applications");


        return { success: true, message: "Profile saved" };
    } catch (error) {
        console.error("Error saving profile:", error);
        return { success: false, message: error instanceof Error ? error.message : "Failed to save profile" };
    }
}

import { projectsData } from "@/lib/data/projects-data";
import { skillsData } from "@/lib/data/skills-data";
import { translations } from "@/lib/data/translations-data";

export async function importProfileFromWebsite(): Promise<{ success: boolean; message: string }> {
    try {
        const es = translations.es;

        // Construct profile data from website source of truth
        const newData = {
            name: es['hero.name'],
            email: "angel@angelnereira.com", // Hardcoded or extracted if available
            summary: es['about.description'] + "\n\n" + es['about.background.text'],

            // Map Projects as Experience (or Projects)
            experience: projectsData.map(p => ({
                company: p.title,
                position: p.label,
                period: "Current",
                responsibilities: [
                    p.description,
                    ...p.techHighlights.map(h => `${h.title}: ${h.description}`)
                ]
            })),

            // Map Skills
            skills: skillsData.map(s => ({
                category: s.category,
                items: [s.name] // Grouping will be handled by UI or we map individually?
                // Actually ProfileBase stores `skills` as Json. UI expects `[{ category: "Core", items: ["Next.js", ...] }]`
                // But skillsData is flat array. We need to group it.
            })),

            projects: projectsData, // Store raw projects data too

            // Defaults
            education: [],
            languages: [],
            socialLinks: {
                linkedin: "https://linkedin.com/in/angelnereira",
                github: "https://github.com/angelnereira",
                portfolio: "https://angelnereira.com"
            }
        };

        // Group skills by category for the Profile format
        const groupedSkills: { category: string, items: string[] }[] = [];
        const categories = { core: "Core", data: "Data", infrastructure: "Infrastructure" };

        skillsData.forEach(skill => {
            const catName = categories[skill.category];
            const existing = groupedSkills.find(g => g.category === catName);
            if (existing) {
                existing.items.push(skill.name);
            } else {
                groupedSkills.push({ category: catName, items: [skill.name] });
            }
        });

        newData.skills = groupedSkills;

        // Upsert logic
        // We need to find the existing profile to update, or create one.
        // For simplicity, we assume there's one active profile or we pick the first one.
        const existingProfile = await prisma.profileBase.findFirst();

        if (existingProfile) {
            await prisma.profileBase.update({
                where: { id: existingProfile.id },
                data: {
                    ...newData,
                    // Preserve existing manual fields if they exist and we don't have overrides
                    documentId: existingProfile.documentId || undefined,
                    citizenship: existingProfile.citizenship || undefined,
                    phone: existingProfile.phone || undefined,
                    location: existingProfile.location || undefined,
                }
            });
        } else {
            await prisma.profileBase.create({
                data: {
                    ...newData,
                    isActive: true
                }
            });
        }

        revalidatePath("/admin/profile");
        return { success: true, message: "Profile imported from website data" };

    } catch (error) {
        console.error("Error importing profile:", error);
        return { success: false, message: error instanceof Error ? error.message : "Failed to import profile" };
    }
}
