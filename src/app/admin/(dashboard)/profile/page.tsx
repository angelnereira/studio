import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, Award, Languages, Globe } from "lucide-react";

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
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Professional Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your professional information used for job applications
                </p>
            </div>

            {/* Profile Status */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatCard
                    icon={User}
                    label="Profile"
                    value={profile ? "Active" : "Not Set"}
                    className={profile ? "text-green-400" : "text-yellow-400"}
                />
                <StatCard
                    icon={Briefcase}
                    label="Experience"
                    value={(profile?.experience as any[])?.length || 0}
                />
                <StatCard
                    icon={Award}
                    label="Skills"
                    value={(profile?.skills as any[])?.reduce((acc: number, s: any) => acc + (s.items?.length || 0), 0) || 0}
                />
                <StatCard
                    icon={Languages}
                    label="Languages"
                    value={(profile?.languages as any[])?.length || 0}
                />
                <StatCard
                    icon={Globe}
                    label="Projects"
                    value={(profile?.projects as any[])?.length || 0}
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
                    <ProfileForm profile={profile || defaultProfile as any} />
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    className = "",
}: {
    icon: any;
    label: string;
    value: string | number;
    className?: string;
}) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${className || "text-muted-foreground"}`} />
                    <div>
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
