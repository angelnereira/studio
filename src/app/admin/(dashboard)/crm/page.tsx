
import { prisma } from "@/lib/prisma"
import { CRMClient } from "./crm-client"
import { Users, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
    title: "CRM & Leads | Admin Studio",
}

export default async function CRMPage() {
    const contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
    })

    // Calculate stats
    const total = contacts.length
    const newLeads = contacts.filter(c => c.status === "new").length
    const contacted = contacts.filter(c => c.status === "contacted").length
    const closed = contacts.filter(c => c.status === "closed").length

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">CRM & Leads</h2>
                <p className="text-muted-foreground">Manage incoming inquiries and business opportunities.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Leads" value={total} icon={Users} color="text-blue-400" />
                <StatCard title="New / Pending" value={newLeads} icon={Clock} color="text-yellow-400" />
                <StatCard title="Contacted" value={contacted} icon={AlertCircle} color="text-purple-400" />
                <StatCard title="Closed Deals" value={closed} icon={CheckCircle2} color="text-green-400" />
            </div>

            <CRMClient initialContacts={contacts} />
        </div>
    )
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
