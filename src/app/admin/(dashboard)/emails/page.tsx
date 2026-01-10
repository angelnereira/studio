
import { EmailMarketingStudio } from "@/components/admin/emails/email-marketing-studio"
import { getSenderIdentities, getTemplates, getCampaigns } from "./marketing-actions"

export const metadata = {
    title: "Email Marketing Studio | Admin",
}

export default async function EmailsPage() {
    const identities = await getSenderIdentities()
    const templates = await getTemplates() // Assuming this exists or returns []
    const campaigns = await getCampaigns()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Marketing Studio
                    </h2>
                    <p className="text-muted-foreground">Manage campaigns, templates, and audiences.</p>
                </div>
            </div>

            <EmailMarketingStudio
                identities={identities}
                templates={templates}
                campaigns={campaigns as any} // Cast safely as types align closely
            />
        </div>
    )
}
