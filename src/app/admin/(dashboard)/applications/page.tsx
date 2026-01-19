import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Briefcase, Building2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const statusLabels: Record<string, string> = {
    draft: "Borrador",
    ready: "Listo",
    sent: "Enviado",
    opened: "Abierto",
    replied: "Respondido",
    interview: "Entrevista",
    rejected: "Rechazado",
    accepted: "Aceptado",
};

export default async function ApplicationsPage() {
    // Get applications with vacancy info
    const applications = await prisma.application.findMany({
        include: {
            vacancy: true,
        },
        orderBy: { createdAt: "desc" },
        take: 50,
    });

    // Get pending vacancies (analyzed but not yet applied)
    const pendingVacancies = await prisma.jobVacancy.findMany({
        where: { status: "analyzed" },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    // Stats
    const stats = {
        total: applications.length,
        sent: applications.filter((a) => a.status === "sent").length,
        interviews: applications.filter((a) => a.status === "interview").length,
        pending: pendingVacancies.length,
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your job applications with AI-powered CV and email generation
                    </p>
                </div>
                <Button asChild className="gap-2">
                    <Link href="/admin/applications/new">
                        <Plus className="h-4 w-4" />
                        New Application
                    </Link>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard label="Total Applications" value={stats.total} />
                <StatsCard label="Sent" value={stats.sent} />
                <StatsCard label="Interviews" value={stats.interviews} />
                <StatsCard label="Pending Analysis" value={stats.pending} />
            </div>

            {/* Pending Vacancies */}
            {pendingVacancies.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Vacancies Ready for Application
                        </CardTitle>
                        <CardDescription>
                            These vacancies have been analyzed. Generate applications for them.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {pendingVacancies.map((vacancy) => (
                                <div
                                    key={vacancy.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Building2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{vacancy.position || "Untitled Position"}</p>
                                            <p className="text-sm text-muted-foreground">{vacancy.company || "Company Unknown"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {vacancy.compatibilityScore && (
                                            <Badge variant="outline" className="hidden sm:inline-flex">
                                                {vacancy.compatibilityScore}% match
                                            </Badge>
                                        )}
                                        <Button size="sm" variant="ghost" asChild>
                                            <Link href={`/admin/applications/new?vacancyId=${vacancy.id}`}>
                                                Apply <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Applications List */}
            <Card>
                <CardHeader>
                    <CardTitle>Application History</CardTitle>
                    <CardDescription>Track all your job applications and their status</CardDescription>
                </CardHeader>
                <CardContent>
                    {applications.length === 0 ? (
                        <div className="text-center py-12">
                            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="font-medium text-lg">No applications yet</h3>
                            <p className="text-muted-foreground mt-1">
                                Start by analyzing a job vacancy and generating your first application
                            </p>
                            <Button className="mt-4" asChild>
                                <Link href="/admin/applications/new">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create First Application
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                            <Building2 className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{app.vacancy.position || "Unknown Position"}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{app.vacancy.company || "Unknown Company"}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDistanceToNow(app.createdAt, { addSuffix: true, locale: es })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className={statusColors[app.status] || "bg-gray-500/20"}>
                                            {statusLabels[app.status] || app.status}
                                        </Badge>
                                        <Button size="sm" variant="ghost" asChild>
                                            <Link href={`/admin/applications/${app.id}`}>
                                                View
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function StatsCard({ label, value }: { label: string; value: number }) {
    return (
        <Card>
            <CardContent className="pt-6">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
        </Card>
    );
}
