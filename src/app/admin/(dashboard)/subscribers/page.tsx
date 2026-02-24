import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Mail, UserCheck, UserX, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata = {
    title: "Subscribers | Admin Studio",
}

export default async function SubscribersPage() {
    const contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            formType: true,
            createdAt: true,
            tags: true,
        },
    })

    const total = contacts.length
    const active = contacts.filter(c => c.status !== 'bounced' && c.status !== 'unsubscribed').length
    const bounced = contacts.filter(c => c.status === 'bounced').length
    const thisMonth = contacts.filter(c => {
        const d = new Date(c.createdAt)
        const now = new Date()
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length

    const typeBreakdown = {
        client: contacts.filter(c => c.formType === 'client').length,
        employer: contacts.filter(c => c.formType === 'employer').length,
        other: contacts.filter(c => c.formType !== 'client' && c.formType !== 'employer').length,
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Subscribers</h2>
                    <p className="text-muted-foreground">Email audience and subscriber health overview.</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/admin/crm"><Users className="mr-2 h-4 w-4" /> Full CRM</Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Contacts" value={total} icon={Users} color="text-blue-400" />
                <StatCard title="Active Subscribers" value={active} icon={UserCheck} color="text-green-400" />
                <StatCard title="Bounced" value={bounced} icon={UserX} color="text-red-400" />
                <StatCard title="New This Month" value={thisMonth} icon={TrendingUp} color="text-purple-400" />
            </div>

            {/* Audience Breakdown */}
            <Card className="bg-black/40 border-white/10">
                <CardHeader>
                    <CardTitle>Audience Breakdown</CardTitle>
                    <CardDescription>Contacts by form type</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-black/30 rounded-lg p-4 text-center border border-white/5">
                            <p className="text-2xl font-bold text-emerald-400">{typeBreakdown.client}</p>
                            <p className="text-xs text-muted-foreground mt-1">Clients</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4 text-center border border-white/5">
                            <p className="text-2xl font-bold text-blue-400">{typeBreakdown.employer}</p>
                            <p className="text-xs text-muted-foreground mt-1">Employers</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4 text-center border border-white/5">
                            <p className="text-2xl font-bold text-orange-400">{typeBreakdown.other}</p>
                            <p className="text-xs text-muted-foreground mt-1">Other / Manual</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Subscriber List */}
            <Card className="bg-black/40 border-white/10">
                <CardHeader>
                    <CardTitle>Recent Subscribers</CardTitle>
                    <CardDescription>Latest contacts across all channels</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-white/10 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/20">
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Contact</th>
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground hidden sm:table-cell">Type</th>
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Status</th>
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.slice(0, 25).map((contact) => (
                                    <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="p-4">
                                            <div>
                                                <p className="font-medium">{contact.name || "—"}</p>
                                                <p className="text-xs text-muted-foreground">{contact.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell">
                                            <Badge variant="outline" className="text-xs capitalize">{contact.formType || "unknown"}</Badge>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <StatusBadge status={contact.status} />
                                        </td>
                                        <td className="p-4 hidden md:table-cell text-muted-foreground text-xs">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {contacts.length > 25 && (
                        <div className="flex justify-center pt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/crm">View all {contacts.length} contacts →</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: React.ElementType; color: string }) {
    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}

function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, string> = {
        new: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
        contacted: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        closed: "bg-green-500/15 text-green-400 border-green-500/20",
        bounced: "bg-red-500/15 text-red-400 border-red-500/20",
    }
    return (
        <Badge variant="outline" className={`text-xs capitalize ${variants[status] || ''}`}>
            {status}
        </Badge>
    )
}
