"use client";

import { useState, useTransition } from "react";
import { ProfileBase } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { saveProfile } from "./actions";

interface Experience {
    company: string;
    position: string;
    period: string;
    responsibilities: string[];
    achievements?: string[];
}

interface SkillCategory {
    category: string;
    items: string[];
}

interface Education {
    institution: string;
    degree: string;
    year?: string;
}

interface ProfileFormProps {
    profile: ProfileBase & {
        experience: Experience[];
        skills: SkillCategory[];
        education: Education[];
        languages?: { language: string; level: string }[];
        socialLinks?: { linkedin?: string; github?: string; portfolio?: string };
    };
}

export function ProfileForm({ profile }: ProfileFormProps) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    // Form state
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone || "");
    const [location, setLocation] = useState(profile.location || "");
    const [documentId, setDocumentId] = useState(profile.documentId || "");
    const [citizenship, setCitizenship] = useState(profile.citizenship || "");
    const [socialLinks, setSocialLinks] = useState(profile.socialLinks as any || {});
    const [summary, setSummary] = useState(profile.summary);
    const [experience, setExperience] = useState<Experience[]>(profile.experience as any || []);
    const [skills, setSkills] = useState<SkillCategory[]>(profile.skills as any || []);
    const [education, setEducation] = useState<Education[]>(profile.education as any || []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await saveProfile({
                id: profile.id || undefined,
                name,
                email,
                phone: phone || undefined,
                location: location || undefined,
                documentId: documentId || undefined,
                citizenship: citizenship || undefined,
                socialLinks: socialLinks,
                summary,
                experience,
                skills,
                education,
                languages: profile.languages, // Keep existing if not edited
            });

            if (result.success) {
                toast({ title: "✅ Profile saved successfully" });
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
        });
    };

    // Add new experience
    const addExperience = () => {
        setExperience([
            ...experience,
            { company: "", position: "", period: "", responsibilities: [""], achievements: [] },
        ]);
    };

    // Remove experience
    const removeExperience = (index: number) => {
        setExperience(experience.filter((_, i) => i !== index));
    };

    // Add skill category
    const addSkillCategory = () => {
        setSkills([...skills, { category: "", items: [""] }]);
    };

    // Remove skill category
    const removeSkillCategory = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="documentId">ID / Cédula</Label>
                    <Input
                        id="documentId"
                        placeholder="8-888-888"
                        value={documentId}
                        onChange={(e) => setDocumentId(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="citizenship">Citizenship</Label>
                    <Input
                        id="citizenship"
                        placeholder="Panamanian"
                        value={citizenship}
                        onChange={(e) => setCitizenship(e.target.value)}
                    />
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
                <Label>Social Links</Label>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="linkedin" className="text-xs text-muted-foreground">LinkedIn URL</Label>
                        <Input
                            id="linkedin"
                            placeholder="linkedin.com/in/..."
                            value={socialLinks.linkedin || ""}
                            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="github" className="text-xs text-muted-foreground">GitHub URL</Label>
                        <Input
                            id="github"
                            placeholder="github.com/..."
                            value={socialLinks.github || ""}
                            onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="portfolio" className="text-xs text-muted-foreground">Portfolio URL</Label>
                        <Input
                            id="portfolio"
                            placeholder="yourwebsite.com"
                            value={socialLinks.portfolio || ""}
                            onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                    id="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief overview of your professional background and expertise..."
                    className="min-h-[120px]"
                    required
                />
            </div>

            {/* Experience */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Work Experience</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                        <Plus className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                </div>
                {experience.map((exp, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/30 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="grid sm:grid-cols-3 gap-3 flex-1">
                                <Input
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => {
                                        const updated = [...experience];
                                        updated[index].company = e.target.value;
                                        setExperience(updated);
                                    }}
                                />
                                <Input
                                    placeholder="Position"
                                    value={exp.position}
                                    onChange={(e) => {
                                        const updated = [...experience];
                                        updated[index].position = e.target.value;
                                        setExperience(updated);
                                    }}
                                />
                                <Input
                                    placeholder="Period (e.g., 2022 - Present)"
                                    value={exp.period}
                                    onChange={(e) => {
                                        const updated = [...experience];
                                        updated[index].period = e.target.value;
                                        setExperience(updated);
                                    }}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => removeExperience(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <Textarea
                            placeholder="Key responsibilities (one per line)"
                            value={exp.responsibilities.join("\n")}
                            onChange={(e) => {
                                const updated = [...experience];
                                updated[index].responsibilities = e.target.value.split("\n").filter(Boolean);
                                setExperience(updated);
                            }}
                            className="min-h-[80px]"
                        />
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Skills</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addSkillCategory}>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </div>
                {skills.map((skillCat, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/30 space-y-3">
                        <div className="flex gap-3">
                            <Input
                                placeholder="Category (e.g., Frontend, Backend)"
                                value={skillCat.category}
                                onChange={(e) => {
                                    const updated = [...skills];
                                    updated[index].category = e.target.value;
                                    setSkills(updated);
                                }}
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => removeSkillCategory(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <Input
                            placeholder="Skills (comma-separated, e.g., React, Next.js, TypeScript)"
                            value={skillCat.items.join(", ")}
                            onChange={(e) => {
                                const updated = [...skills];
                                updated[index].items = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                                setSkills(updated);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                    </>
                )}
            </Button>
        </form>
    );
}
