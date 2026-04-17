import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import { markEmailRead } from "../actions";
import { InboxDetailActions } from "../inbox-detail-client";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function InboxDetailPage({ params }: PageProps) {
    const { id } = await params;

    const email = await prisma.inboundEmail.findUnique({
        where: { id },
        include: {
            contact: {
                select: { id: true, name: true, email: true, formType: true },
            },
        },
    });

    if (!email) notFound();

    if (!email.read) {
        await markEmailRead(email.id, true);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/inbox">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold truncate">{email.subject}</h1>
                    <p className="text-sm text-muted-foreground">
                        {format(email.receivedAt, "PPPp", { locale: es })} ·{" "}
                        {formatDistanceToNow(email.receivedAt, { addSuffix: true, locale: es })}
                    </p>
                </div>
                {email.archived && <Badge variant="secondary">Archived</Badge>}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <CardTitle className="text-base truncate">
                                    {email.fromName || email.fromEmail}
                                </CardTitle>
                                {email.contact && (
                                    <Link
                                        href={`/admin/crm`}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        {email.contact.formType} · view in CRM
                                    </Link>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                From: {email.fromEmail}
                            </p>
                            <p className="text-xs text-muted-foreground">To: {email.toEmail}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {email.html ? (
                        <iframe
                            srcDoc={email.html}
                            sandbox=""
                            className="w-full min-h-[400px] rounded border border-border bg-white"
                            title="Email content"
                        />
                    ) : (
                        <pre className="whitespace-pre-wrap font-sans text-sm">{email.text || "(empty)"}</pre>
                    )}
                </CardContent>
            </Card>

            <InboxDetailActions
                inboundId={email.id}
                archived={email.archived}
                defaultReplySubject={
                    email.subject.toLowerCase().startsWith("re:")
                        ? email.subject
                        : `Re: ${email.subject}`
                }
            />
        </div>
    );
}
