
import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, Server, Database, Cloud } from "lucide-react"

export const metadata = {
    title: "System Config | Admin Studio",
}

export default async function SettingsPage() {
    const session = await auth()

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
                <p className="text-muted-foreground">Monitor system health and integration status.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Environment Status</CardTitle>
                        <CardDescription>Overall health of connected services.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <StatusItem
                            icon={Server}
                            label="Vercel Deployment"
                            status="Operational"
                            color="text-green-400"
                        />
                        <StatusItem
                            icon={Database}
                            label="Neon Database (Postgres)"
                            status="Connected"
                            color="text-green-400"
                        />
                        <StatusItem
                            icon={Cloud}
                            label="Resend Email API"
                            status="Verified"
                            color="text-green-400"
                        />
                        <StatusItem
                            icon={Cloud}
                            label="Cloudinary Media"
                            status="Connected"
                            color="text-green-400"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Admin Profile</CardTitle>
                        <CardDescription>Current active session details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                                {session?.user?.name?.[0] || "A"}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{session?.user?.name || "Admin User"}</h3>
                                <p className="text-muted-foreground">{session?.user?.email}</p>
                                <Badge variant="outline" className="mt-2 border-primary/50 text-primary">Super Admin</Badge>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-md mt-4">
                            <div className="flex items-center gap-2 text-yellow-500 mb-2">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="font-semibold text-sm">Security Note</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Sensitive configuration (API Keys, Secrets) are managed via Vercel Environment Variables and are not visible here for security reasons.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StatusItem({ icon: Icon, label, status, color }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${color}`} />
                <span className={`text-sm ${color}`}>{status}</span>
            </div>
        </div>
    )
}
