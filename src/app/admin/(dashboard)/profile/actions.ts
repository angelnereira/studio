"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { WorkExperience, SkillCategory, Education, LanguageEntry, SocialLinks, ProjectEntry } from "@/types/profile";

interface ProfileData {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    documentId?: string;
    citizenship?: string;
    summary: string;
    experience: WorkExperience[];
    skills: SkillCategory[];
    education: Education[];
    languages?: LanguageEntry[];
    socialLinks?: SocialLinks;
    projects?: ProjectEntry[];
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
                    experience: JSON.parse(JSON.stringify(data.experience)),
                    skills: JSON.parse(JSON.stringify(data.skills)),
                    education: JSON.parse(JSON.stringify(data.education)),
                    languages: data.languages ? JSON.parse(JSON.stringify(data.languages)) : undefined,
                    socialLinks: data.socialLinks,
                    projects: data.projects ? JSON.parse(JSON.stringify(data.projects)) : undefined,
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
                    experience: JSON.parse(JSON.stringify(data.experience)),
                    skills: JSON.parse(JSON.stringify(data.skills)),
                    education: JSON.parse(JSON.stringify(data.education)),
                    languages: data.languages ? JSON.parse(JSON.stringify(data.languages)) : undefined,
                    socialLinks: data.socialLinks,
                    projects: data.projects ? JSON.parse(JSON.stringify(data.projects)) : undefined,
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

        // Group skills by category for the Profile format
        const _groupedSkills: { category: 'core' | 'data' | 'infrastructure'; items: string[] }[] = [];
        const categoryKeys = ['core', 'data', 'infrastructure'] as const;
        const categories = { core: "Core" as const, data: "Data" as const, infrastructure: "Infrastructure" as const };

        skillsData.forEach(skill => {
            const catKey = skill.category as 'core' | 'data' | 'infrastructure';
            const existing = _groupedSkills.find(g => g.category === catKey);
            if (existing) {
                existing.items.push(skill.name);
            } else {
                _groupedSkills.push({ category: catKey, items: [skill.name] });
            }
        });

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

            // Grouped skills
            skills: _groupedSkills as unknown as SkillCategory[],

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

        // Upsert logic
        // We need to find the existing profile to update, or create one.
        // For simplicity, we assume there's one active profile or we pick the first one.
        const existingProfile = await prisma.profileBase.findFirst();

        if (existingProfile) {
            await prisma.profileBase.update({
                where: { id: existingProfile.id },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: {
                    ...(newData as any),
                    // Preserve existing manual fields if they exist and we don't have overrides
                    documentId: existingProfile.documentId || undefined,
                    citizenship: existingProfile.citizenship || undefined,
                    phone: existingProfile.phone || undefined,
                    location: existingProfile.location || undefined,
                }
            });
        } else {
            await prisma.profileBase.create({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: {
                    ...(newData as any),
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
