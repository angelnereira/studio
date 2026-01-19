import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Calendar, Mail, FileText, Download, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = 'force-dynamic';

const statusColors: Record<string, string> = {
    draft: "bg-gray-500/20 text-gray-400",
    ready: "bg-blue-500/20 text-blue-400",
    sent: "bg-green-500/20 text-green-400",
    opened: "bg-purple-500/20 text-purple-400",
    replied: "bg-cyan-500/20 text-cyan-400",
    interview: "bg-yellow-500/20 text-yellow-400",
    rejected: "bg-red-500/20 text-red-400",
    accepted: "bg-emerald-500/20 text-emerald-400",
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
    const { id } = await params;

    const application = await prisma.application.findUnique({
        where: { id },
        include: {
            vacancy: true,
            profile: true,
        },
    });

    if (!application) {
        notFound();
    }

    const cvContent = application.cvContent as any;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/applications">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{application.vacancy.position || "Application"}</h1>
                    <p className="text-muted-foreground">{application.vacancy.company}</p>
                </div>
                <Badge className={statusColors[application.status]}>
                    {application.status.toUpperCase()}
                </Badge>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download CV
                </Button>
                {application.status === "ready" && (
                    <Button className="gap-2">
                        <Send className="h-4 w-4" />
                        Send Application
                    </Button>
                )}
                {application.cvPdfUrl && (
                    <Button variant="ghost" className="gap-2" asChild>
                        <a href={application.cvPdfUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            View PDF
                        </a>
                    </Button>
                )}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column: Vacancy & Email */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Vacancy Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                Vacancy Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <InfoItem icon={Building2} label="Company" value={application.vacancy.company || "Not specified"} />
                                <InfoItem icon={MapPin} label="Location" value={application.vacancy.location || "Remote"} />
                                <InfoItem icon={FileText} label="Position" value={application.vacancy.position || "N/A"} />
                                <InfoItem
                                    icon={Calendar}
                                    label="Captured"
                                    value={formatDistanceToNow(application.vacancy.createdAt, { addSuffix: true, locale: es })}
                                />
                            </div>

                            {application.vacancy.salaryRange && (
                                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                    <p className="text-sm text-muted-foreground">Salary Range</p>
                                    <p className="font-medium">{application.vacancy.salaryRange}</p>
                                </div>
                            )}

                            {application.vacancy.keywords && application.vacancy.keywords.length > 0 && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Keywords</p>
                                    <div className="flex flex-wrap gap-2">
                                        {application.vacancy.keywords.map((keyword, i) => (
                                            <Badge key={i} variant="secondary">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Email Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                Email Preview
                            </CardTitle>
                            <CardDescription>Generated personalized email</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Subject</p>
                                    <p className="font-medium">{application.emailSubject}</p>
                                </div>
                                <Separator />
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap text-sm">{application.emailText}</div>
                                </div>

                                {application.recipientEmail && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">To: {application.recipientEmail}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: CV & Timeline */}
                <div className="space-y-6">
                    {/* CV Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">CV Highlights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cvContent?.summary && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Summary</p>
                                    <p className="text-sm">{cvContent.summary}</p>
                                </div>
                            )}

                            {cvContent?.skillsHighlighted && cvContent.skillsHighlighted.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Top Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cvContent.skillsHighlighted.slice(0, 10).map((skill: string, i: number) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {cvContent?.experience && cvContent.experience.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Experience Highlighted</p>
                                    <div className="space-y-2">
                                        {cvContent.experience.slice(0, 3).map((exp: any, i: number) => (
                                            <div key={i} className="text-xs">
                                                <p className="font-medium">{exp.position}</p>
                                                <p className="text-muted-foreground">{exp.company}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <TimelineItem
                                label="Created"
                                date={application.createdAt}
                                icon={FileText}
                            />
                            {application.sentAt && (
                                <TimelineItem
                                    label="Sent"
                                    date={application.sentAt}
                                    icon={Send}
                                    highlight
                                />
                            )}
                            {application.responseAt && (
                                <TimelineItem
                                    label="Response"
                                    date={application.responseAt}
                                    icon={Mail}
                                    highlight
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    {application.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{application.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-start gap-2">
            <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}

function TimelineItem({
    label,
    date,
    icon: Icon,
    highlight,
}: {
    label: string;
    date: Date;
    icon: any;
    highlight?: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highlight ? 'bg-primary/20' : 'bg-secondary'}`}>
                <Icon className={`h-4 w-4 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(date, { addSuffix: true, locale: es })}
                </p>
            </div>
        </div>
    );
}
