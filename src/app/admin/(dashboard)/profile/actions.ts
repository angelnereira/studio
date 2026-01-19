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
