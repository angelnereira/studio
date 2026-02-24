
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, XCircle, Server, Database, Cloud, Key, Shield } from "lucide-react"

export const metadata = {
    title: "System Config | Admin Studio",
}

interface HealthCheck {
    label: string;
    status: 'ok' | 'warning' | 'error';
    message: string;
    icon: React.ElementType;
}

async function getHealthChecks(): Promise<HealthCheck[]> {
    const checks: HealthCheck[] = []

    // 1. Database
    try {
        await prisma.$queryRawUnsafe('SELECT 1')
        checks.push({ icon: Database, label: "Neon Database (Postgres)", status: 'ok', message: "Connected" })
    } catch {
        checks.push({ icon: Database, label: "Neon Database (Postgres)", status: 'error', message: "Unreachable" })
    }

    // 2. Resend API
    if (process.env.RESEND_API_KEY) {
        checks.push({ icon: Cloud, label: "Resend Email API", status: 'ok', message: "Key configured" })
    } else {
        checks.push({ icon: Cloud, label: "Resend Email API", status: 'error', message: "RESEND_API_KEY missing" })
    }

    // 3. Auth Secret
    if (process.env.AUTH_SECRET) {
        checks.push({ icon: Key, label: "Auth Secret", status: 'ok', message: "Configured" })
    } else {
        checks.push({ icon: Key, label: "Auth Secret", status: 'error', message: "AUTH_SECRET missing" })
    }

    // 4. Cloudinary
    if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
        checks.push({ icon: Cloud, label: "Cloudinary Media", status: 'ok', message: "Connected" })
    } else {
        checks.push({ icon: Cloud, label: "Cloudinary Media", status: 'warning', message: "Not configured" })
    }

    // 5. Vercel (inferred)
    if (process.env.VERCEL) {
        checks.push({ icon: Server, label: "Vercel Deployment", status: 'ok', message: "Production" })
    } else {
        checks.push({ icon: Server, label: "Vercel Deployment", status: 'warning', message: "Local / Dev" })
    }

    return checks
}

const statusConfig = {
    ok: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
    warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
}

export default async function SettingsPage() {
    const session = await auth()
    const checks = await getHealthChecks()

    const okCount = checks.filter(c => c.status === 'ok').length
    const totalCount = checks.length
    const allGood = okCount === totalCount

    // Get real role
    const userRole = (session?.user as { role?: string })?.role || 'admin'
    const roleBadge = userRole === 'superadmin' ? 'Super Admin' : userRole.charAt(0).toUpperCase() + userRole.slice(1)

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
                <p className="text-muted-foreground">Real-time health monitoring and integration status.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Environment Status</CardTitle>
                                <CardDescription>Live health of connected services.</CardDescription>
                            </div>
                            <Badge
                                variant="outline"
                                className={allGood
                                    ? "border-green-500/50 text-green-400 bg-green-500/10"
                                    : "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                                }
                            >
                                {okCount}/{totalCount} Healthy
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {checks.map((check, i) => {
                            const cfg = statusConfig[check.status]
                            const StatusIcon = cfg.icon
                            const ServiceIcon = check.icon
                            return (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <ServiceIcon className="w-5 h-5 text-muted-foreground" />
                                        <span className="font-medium">{check.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StatusIcon className={`w-4 h-4 ${cfg.color}`} />
                                        <span className={`text-sm ${cfg.color}`}>{check.message}</span>
                                    </div>
                                </div>
                            )
                        })}
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
                                <Badge variant="outline" className="mt-2 border-primary/50 text-primary">
                                    <Shield className="w-3 h-3 mr-1" />
                                    {roleBadge}
                                </Badge>
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
