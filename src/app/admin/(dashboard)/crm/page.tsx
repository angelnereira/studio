import { prisma } from "@/lib/prisma"
import { CRMClient } from "./crm-client"
import { Users, AlertCircle, CheckCircle2, Clock, Mail } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { PageHeader } from "@/components/admin/page-header"
import { getAllTags } from "./actions"

export const metadata = {
    title: "CRM & Leads | Admin Studio",
}

export default async function CRMPage() {
    const [contacts, allTags] = await Promise.all([
        prisma.contact.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                campaignRecipients: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                    select: { status: true, createdAt: true },
                },
            },
        }),
        getAllTags(),
    ])

    // Calculate stats
    const total = contacts.length
    const newLeads = contacts.filter(c => c.status === "new").length
    const contacted = contacts.filter(c => c.status === "contacted").length
    const closed = contacts.filter(c => c.status === "closed").length
    const emailsSentToday = contacts.filter(c =>
        c.campaignRecipients.some(r => {
            const today = new Date()
            const recipientDate = new Date(r.createdAt)
            return recipientDate.toDateString() === today.toDateString()
        })
    ).length

    return (
        <div className="space-y-8">
            <PageHeader
                title="CRM & Leads"
                description="Manage incoming inquiries and business opportunities."
                icon={<Users className="h-5 w-5" />}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Total Leads" value={total} icon={Users} color="text-blue-400" />
                <StatCard title="New / Pending" value={newLeads} icon={Clock} color="text-yellow-400" />
                <StatCard title="Contacted" value={contacted} icon={AlertCircle} color="text-purple-400" />
                <StatCard title="Closed Deals" value={closed} icon={CheckCircle2} color="text-green-400" />
                <StatCard title="Emails Today" value={emailsSentToday} icon={Mail} color="text-cyan-400" />
            </div>

            <CRMClient initialContacts={JSON.parse(JSON.stringify(contacts))} availableTags={allTags} />
        </div>
    )
}

