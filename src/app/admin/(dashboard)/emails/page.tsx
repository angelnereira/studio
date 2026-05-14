
import { EmailMarketingStudio } from "@/components/admin/emails/email-marketing-studio"
import { getSenderIdentities, getTemplates, getCampaigns, getContacts } from "./marketing-actions"
import { PageHeader } from "@/components/admin/page-header"
import { Mail } from "lucide-react"

export const metadata = {
    title: "Email Marketing Studio | Admin",
}

export default async function EmailsPage() {
    const [identities, templates, campaigns, contacts] = await Promise.all([
        getSenderIdentities(),
        getTemplates(),
        getCampaigns(),
        getContacts(),
    ])

    return (
        <div className="space-y-8">
            <PageHeader
                title="Email Marketing"
                description="Design campaigns, manage templates and segment your audience."
                icon={<Mail className="h-5 w-5" />}
            />

            <EmailMarketingStudio
                identities={JSON.parse(JSON.stringify(identities))}
                templates={JSON.parse(JSON.stringify(templates))}
                campaigns={JSON.parse(JSON.stringify(campaigns))}
                contacts={JSON.parse(JSON.stringify(contacts))}
            />
        </div>
    )
}
