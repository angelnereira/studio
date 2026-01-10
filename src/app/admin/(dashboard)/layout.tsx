
import Link from "next/link"
import { LayoutDashboard, FileText, Mail, Users, Settings, LogOut, ExternalLink } from "lucide-react"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/admin/login")
    }

    return (
        <div className="flex h-screen bg-black/95 text-foreground overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-background/50 backdrop-blur-xl hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform">
                            AN
                        </div>
                        <span className="font-bold tracking-tight group-hover:text-primary transition-colors">Studio Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarItem href="/admin/blog" icon={FileText} label="Blog & CMS" />
                    <SidebarItem href="/admin/emails" icon={Mail} label="Email Marketing" />
                    <SidebarItem href="/admin/crm" icon={Users} label="CRM & Leads" />
                    <SidebarItem href="/admin/settings" icon={Settings} label="System Config" />
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600" />
                        <div className="text-xs">
                            <p className="font-medium truncate max-w-[120px]">{session.user?.name || "Admin User"}</p>
                            <p className="text-muted-foreground truncate max-w-[120px]">{session.user?.email}</p>
                        </div>
                    </div>
                    <form action={async () => {
                        "use server"
                        await signOut()
                    }}>
                        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                    <h1 className="font-semibold text-lg">Command Center</h1>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/" target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                        </Link>
                    </Button>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

function SidebarItem({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <Button variant="ghost" asChild className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5">
            <Link href={href}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
            </Link>
        </Button>
    )
}
