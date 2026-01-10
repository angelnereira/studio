
import { EmailForm } from "./email-form"
import { Send, MailCheck, ShieldCheck } from "lucide-react"

export const metadata = {
    title: "Email Marketing | Admin Studio",
}

export default function EmailsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Email Marketing</h2>
                <p className="text-muted-foreground">Engage with your audience directly from your dashboard.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                        <Send className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="text-xl font-bold">Resend API</p>
                    </div>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full text-green-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Domain Status</p>
                        <p className="text-xl font-bold">Verified</p>
                    </div>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-full text-purple-400">
                        <MailCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Daily Limit</p>
                        <p className="text-xl font-bold">3,000 / day</p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <EmailForm />
            </div>
        </div>
    )
}
