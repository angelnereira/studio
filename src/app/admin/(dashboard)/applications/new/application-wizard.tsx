"use client";

import { useState, useActionState, startTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { captureVacancy, generateApplication, CaptureVacancyState, GenerateApplicationState } from "../actions";
import { generateCVPDF } from "@/lib/cv-pdf-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Upload,
    FileText,
    Link2,
    Loader2,
    Building2,
    MapPin,
    Briefcase,
    Target,
    Sparkles,
    Download,
    Image as ImageIcon,
    X,
} from "lucide-react";
import Link from "next/link";

// Steps configuration
const steps = [
    { id: 1, name: "Capture", description: "Input job vacancy" },
    { id: 2, name: "Analysis", description: "Review AI analysis" },
    { id: 3, name: "Generate", description: "Create application" },
    { id: 4, name: "Preview", description: "Review & send" },
];

type SourceType = "text" | "screenshot" | "url";

export default function NewApplicationWizard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    // State
    const [currentStep, setCurrentStep] = useState(1);
    const [sourceType, setSourceType] = useState<SourceType>("text");
    const [language, setLanguage] = useState("English");
    const [model, setModel] = useState("gemini");
    const [vacancyId, setVacancyId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form states
    const [captureState, captureAction] = useActionState<CaptureVacancyState, FormData>(captureVacancy, {
        success: false,
        message: "",
    });

    const [generateState, generateAction] = useActionState<GenerateApplicationState, FormData>(generateApplication, {
        success: false,
        message: "",
    });

    // Handle initial vacancy from URL param
    const initialVacancyId = searchParams.get("vacancyId");

    useEffect(() => {
        if (initialVacancyId) {
            // Skip to step 3 if we have a vacancy
            setCurrentStep(3);
        }
    }, [initialVacancyId]);

    // Handle capture success
    useEffect(() => {
        if (captureState.success && captureState.analysis) {
            setCurrentStep(2);
            toast({ title: "✅ Vacancy analyzed successfully" });
        } else if (captureState.message && !captureState.success && captureState.message !== "") {
            toast({ variant: "destructive", title: "Error", description: captureState.message });
        }
    }, [captureState, toast]);

    // Handle generate success
    useEffect(() => {
        if (generateState.success && generateState.content) {
            setCurrentStep(4);
            toast({ title: "✅ Application generated successfully" });
        } else if (generateState.message && !generateState.success && generateState.message !== "") {
            toast({ variant: "destructive", title: "Error", description: generateState.message });
        }
    }, [generateState, toast]);

    const handleCaptureSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.set("sourceType", sourceType);
        startTransition(() => {
            captureAction(formData);
            setIsSubmitting(false);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/applications">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">New Application</h1>
                    <p className="text-muted-foreground">Create a personalized job application</p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep > step.id
                                        ? "bg-primary text-primary-foreground"
                                        : currentStep === step.id
                                            ? "bg-primary/20 text-primary border-2 border-primary"
                                            : "bg-secondary text-muted-foreground"
                                    }
                `}
                            >
                                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                            </div>
                            <span className="mt-2 text-xs text-muted-foreground hidden sm:block">{step.name}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-16 sm:w-24 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-secondary"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <Card className="border-white/10">
                {/* Step 1: Capture Vacancy */}
                {currentStep === 1 && (
                    <>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Input Job Vacancy
                            </CardTitle>
                            <CardDescription>
                                Paste the job description, upload a screenshot, or provide a URL
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCaptureSubmit} className="space-y-6">
                                {/* Source Type Selection */}
                                <RadioGroup
                                    value={sourceType}
                                    onValueChange={(v) => setSourceType(v as SourceType)}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="text" id="text" />
                                        <Label htmlFor="text" className="flex items-center gap-2 cursor-pointer">
                                            <FileText className="h-4 w-4" /> Text
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="screenshot" id="screenshot" />
                                        <Label htmlFor="screenshot" className="flex items-center gap-2 cursor-pointer">
                                            <Upload className="h-4 w-4" /> Screenshot
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="url" id="url" />
                                        <Label htmlFor="url" className="flex items-center gap-2 cursor-pointer">
                                            <Link2 className="h-4 w-4" /> URL
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {/* Text Input */}
                                {sourceType === "text" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="content">Job Description</Label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            placeholder="Paste the complete job description here..."
                                            className="min-h-[300px] font-mono text-sm"
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Include all details: requirements, responsibilities, company info, etc.
                                        </p>
                                    </div>
                                )}

                                {/* URL Input */}
                                {sourceType === "url" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="url-input">Job Vacancy URL</Label>
                                        <Input
                                            id="url-input"
                                            name="content"
                                            type="url"
                                            placeholder="https://linkedin.com/jobs/view/..."
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Enter the full URL of the job posting. We'll attempt to extract the details.
                                        </p>
                                    </div>
                                )}

                                {/* Screenshot Upload */}
                                {sourceType === "screenshot" && (
                                    <div className="space-y-2">
                                        <Label>Upload Screenshot</Label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setSelectedImage(reader.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        {!selectedImage ? (
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                            >
                                                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                                <p className="font-medium">Click to upload screenshot</p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Supports PNG, JPG, WebP
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <img
                                                    src={selectedImage}
                                                    alt="Vacancy screenshot"
                                                    className="w-full rounded-lg border border-white/10"
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="destructive"
                                                    className="absolute top-2 right-2"
                                                    onClick={() => {
                                                        setSelectedImage(null);
                                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                                    }}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                        <input type="hidden" name="imageBase64" value={selectedImage || ''} />
                                        <input
                                            type="hidden"
                                            name="content"
                                            value="Image uploaded for analysis"
                                        />
                                    </div>
                                )}

                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Vacancy
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </>
                )}

                {/* Step 2: Review Analysis */}
                {currentStep === 2 && captureState.analysis && (
                    <>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-primary" />
                                Vacancy Analysis
                            </CardTitle>
                            <CardDescription>Review the AI-extracted information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Company & Position */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-secondary/50">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Building2 className="h-4 w-4" /> Company
                                    </div>
                                    <p className="font-medium">{captureState.analysis.company || "Not detected"}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-secondary/50">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Briefcase className="h-4 w-4" /> Position
                                    </div>
                                    <p className="font-medium">{captureState.analysis.position || "Not detected"}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-secondary/50">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <MapPin className="h-4 w-4" /> Location
                                    </div>
                                    <p className="font-medium">
                                        {captureState.analysis.location || "Not specified"}{" "}
                                        {captureState.analysis.workMode !== "unknown" && (
                                            <Badge variant="outline" className="ml-2">
                                                {captureState.analysis.workMode}
                                            </Badge>
                                        )}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-secondary/50">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Target className="h-4 w-4" /> Compatibility
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Progress value={captureState.analysis.compatibilityScore || 0} className="flex-1" />
                                        <span className="font-bold text-primary">
                                            {captureState.analysis.compatibilityScore || 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Keywords */}
                            {captureState.analysis.keywords.length > 0 && (
                                <div>
                                    <Label className="mb-2 block">Key Skills & Keywords</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {captureState.analysis.keywords.map((keyword, i) => (
                                            <Badge key={i} variant="secondary">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggestions */}
                            {captureState.analysis.suggestions && (
                                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-2 text-primary mb-2">
                                        <Sparkles className="h-4 w-4" />
                                        <span className="font-medium">AI Suggestions</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{captureState.analysis.suggestions}</p>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                <Button className="flex-1" onClick={() => setCurrentStep(3)}>
                                    Generate Application
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </>
                )}

                {/* Step 3: Generate Application */}
                {currentStep === 3 && (
                    <>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Generate Application
                            </CardTitle>
                            <CardDescription>Configure and generate your personalized CV and email</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setIsSubmitting(true);
                                    const formData = new FormData(e.currentTarget);
                                    formData.set("vacancyId", captureState.vacancyId || initialVacancyId || "");
                                    startTransition(() => {
                                        generateAction(formData);
                                        setIsSubmitting(false);
                                    });
                                }}
                                className="space-y-6"
                            >
                                <input type="hidden" name="vacancyId" value={captureState.vacancyId || initialVacancyId || ""} />

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="profileId">Profile</Label>
                                        <Input
                                            id="profileId"
                                            name="profileId"
                                            placeholder="Profile ID (will auto-select first)"
                                            className="font-mono text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">Leave empty to use default profile</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select value={language} onValueChange={setLanguage}>
                                            <SelectTrigger id="language" className="w-[180px]">
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="English">English</SelectItem>
                                                <SelectItem value="Spanish">Spanish</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="model">AI Model</Label>
                                        <Select value={model} onValueChange={setModel}>
                                            <SelectTrigger id="model" className="w-[200px]">
                                                <SelectValue placeholder="Select Model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="gemini">Gemini 2.5 Flash</SelectItem>
                                                <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                                                <SelectItem value="gpt4o">GPT-4o</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="recipientName">Recipient Name (optional)</Label>
                                        <Input
                                            id="recipientName"
                                            name="recipientName"
                                            placeholder="e.g., John Smith"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="recipientEmail">Recipient Email (optional)</Label>
                                        <Input
                                            id="recipientEmail"
                                            name="recipientEmail"
                                            type="email"
                                            placeholder="hr@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                Generate Content
                                                <Sparkles className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </>
                )}

                {/* Step 4: Preview & Send */}
                {currentStep === 4 && generateState.content && (
                    <>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                Review & Send
                            </CardTitle>
                            <CardDescription>Preview your generated application before sending</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Email Preview */}
                            <div>
                                <Label className="mb-2 block">Email Preview</Label>
                                <div className="p-4 rounded-lg bg-secondary/50 space-y-3">
                                    <p className="font-medium">Subject: {generateState.content.email.subject}</p>
                                    <hr className="border-white/10" />
                                    <div className="text-sm space-y-2 whitespace-pre-wrap">
                                        <p>{generateState.content.email.greeting}</p>
                                        <p>{generateState.content.email.opening}</p>
                                        <p>{generateState.content.email.body}</p>
                                        <p>{generateState.content.email.closing}</p>
                                        <p className="text-muted-foreground">{generateState.content.email.signature}</p>
                                    </div>
                                </div>
                            </div>

                            {/* CV Summary */}
                            <div>
                                <Label className="mb-2 block">CV Summary</Label>
                                <div className="p-4 rounded-lg bg-secondary/50">
                                    <p className="text-sm">{generateState.content.cv.summary}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {generateState.content.cv.skillsHighlighted.slice(0, 8).map((skill, i) => (
                                            <Badge key={i} variant="outline">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (!generateState.content) return;

                                        try {
                                            // Prepare CV data for PDF generation
                                            const cvData = {
                                                name: generateState.content.cv.experience[0]?.company || "Ángel Nereira",
                                                email: "contact@angelnereira.com",
                                                location: "Panama",
                                                summary: generateState.content.cv.summary,
                                                experience: generateState.content.cv.experience.map(exp => ({
                                                    ...exp,
                                                    relevanceScore: exp.relevanceScore || 100,
                                                })),
                                                skillsHighlighted: generateState.content.cv.skillsHighlighted,
                                                education: [],
                                                languages: [
                                                    { language: "Español", level: "Nativo" },
                                                    { language: "English", level: "Advanced" },
                                                ],
                                                socialLinks: {
                                                    linkedin: "https://linkedin.com/in/angelnereira",
                                                    github: "https://github.com/angelnereira",
                                                    portfolio: "https://angelnereira.com",
                                                },
                                            };

                                            generateCVPDF(cvData, {
                                                companyName: captureState.analysis?.company || undefined,
                                                positionTitle: captureState.analysis?.position || undefined,
                                            });

                                            toast({ title: "✅ CV Downloaded!" });
                                        } catch (error) {
                                            console.error("PDF generation error:", error);
                                            toast({
                                                variant: "destructive",
                                                title: "Error",
                                                description: "Failed to generate PDF"
                                            });
                                        }
                                    }}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CV (PDF)
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={() => {
                                        router.push("/admin/applications");
                                        toast({ title: "✅ Application saved as draft" });
                                    }}
                                >
                                    Save Application
                                    <Check className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
}
