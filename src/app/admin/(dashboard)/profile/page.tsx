import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, Award, Languages, Globe } from "lucide-react";
import type { WorkExperience, SkillCategory, LanguageEntry, ProjectEntry } from "@/types/profile";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    // Get active profile or create empty one
    let profile = await prisma.profileBase.findFirst({
        where: { isActive: true },
    });

    // Default profile structure for new users
    const defaultProfile = {
        id: "",
        name: "Ángel Nereira",
        email: "contact@angelnereira.com",
        phone: "",
        location: "Panama",
        summary: "",
        experience: [],
        skills: [],
        education: [],
        projects: [],
        languages: [
            { language: "Español", level: "Nativo" },
            { language: "English", level: "Advanced" },
        ],
        socialLinks: {
            linkedin: "https://linkedin.com/in/angelnereira",
            github: "https://github.com/angelnereira",
            portfolio: "https://angelnereira.com",
        },
        isActive: true,
    };

    return (
        <div className="space-y-8">
            <PageHeader
                title="Professional Profile"
                description="Data used to generate personalized CVs and cover letters."
                icon={<User className="h-5 w-5" />}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatCard
                    title="Profile"
                    value={profile ? "Active" : "Not set"}
                    icon={User}
                    color={profile ? "text-green-400" : "text-yellow-400"}
                />
                <StatCard
                    title="Experience"
                    value={(profile?.experience as unknown as WorkExperience[])?.length || 0}
                    icon={Briefcase}
                    color="text-blue-400"
                />
                <StatCard
                    title="Skills"
                    value={(profile?.skills as unknown as SkillCategory[])?.reduce((acc: number, s: SkillCategory) => acc + (s.items?.length || 0), 0) || 0}
                    icon={Award}
                    color="text-purple-400"
                />
                <StatCard
                    title="Languages"
                    value={(profile?.languages as unknown as LanguageEntry[])?.length || 0}
                    icon={Languages}
                    color="text-cyan-400"
                />
                <StatCard
                    title="Projects"
                    value={(profile?.projects as ProjectEntry[])?.length || 0}
                    icon={Globe}
                    color="text-orange-400"
                />
            </div>

            {/* Profile Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        This information will be used to generate personalized CVs and cover letters
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm profile={(profile || defaultProfile) as Parameters<typeof ProfileForm>[0]['profile']} />
                </CardContent>
            </Card>
        </div>
    );
}

