import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen, Inbox as InboxIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
    const [emails, total, unread] = await Promise.all([
        prisma.inboundEmail.findMany({
            where: { archived: false },
            orderBy: { receivedAt: "desc" },
            take: 50,
            include: {
                contact: {
                    select: { id: true, name: true, formType: true },
                },
            },
        }),
        prisma.inboundEmail.count({ where: { archived: false } }),
        prisma.inboundEmail.count({ where: { read: false, archived: false } }),
    ]);

    const lastReceived = emails[0]?.receivedAt ?? null;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Inbox"
                description="Incoming messages received via Resend Inbound."
                icon={<InboxIcon className="h-5 w-5" />}
            />

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="Total" value={total} icon={Mail} color="text-blue-400" />
                <StatCard title="Unread" value={unread} icon={Mail} color="text-primary" change={unread > 0 ? "Needs attention" : "All caught up"} />
                <StatCard
                    title="Last received"
                    value={lastReceived ? formatDistanceToNow(lastReceived, { addSuffix: true, locale: es }) : "Never"}
                    icon={MailOpen}
                    color="text-emerald-400"
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent messages</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {emails.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground">
                            <Mail className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p>No inbound emails yet.</p>
                            <p className="text-xs mt-2">
                                Configure the Resend Inbound webhook to <code>/api/webhooks/resend/inbound</code>.
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-border">
                            {emails.map((email) => (
                                <li key={email.id}>
                                    <Link
                                        href={`/admin/inbox/${email.id}`}
                                        className="flex items-start gap-3 p-4 hover:bg-accent/30 transition-colors"
                                    >
                                        <div className="mt-1">
                                            {email.read ? (
                                                <MailOpen className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Mail className="h-4 w-4 text-primary" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline gap-3 mb-1">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span
                                                        className={`text-sm truncate ${email.read ? "text-muted-foreground" : "font-medium"}`}
                                                    >
                                                        {email.fromName || email.fromEmail}
                                                    </span>
                                                    {!email.read && (
                                                        <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                                            NEW
                                                        </Badge>
                                                    )}
                                                    {email.contact && (
                                                        <Badge variant="outline" className="text-[10px]">
                                                            {email.contact.formType}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {formatDistanceToNow(email.receivedAt, { addSuffix: true, locale: es })}
                                                </span>
                                            </div>
                                            <p className={`text-sm truncate ${email.read ? "text-muted-foreground" : ""}`}>
                                                {email.subject}
                                            </p>
                                            {email.text && (
                                                <p className="text-xs text-muted-foreground truncate mt-1">
                                                    {email.text.slice(0, 160)}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
