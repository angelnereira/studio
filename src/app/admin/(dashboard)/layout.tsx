
import Link from "next/link"
import { LogOut, ExternalLink } from "lucide-react"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb"
import { MobileBottomNav } from "@/components/admin/mobile-bottom-nav"
import { SidebarNav } from "@/components/admin/sidebar-nav"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/admin/login")
    }

    const handleSignOut = async () => {
        "use server"
        await signOut()
    }

    return (
        <div className="flex h-screen bg-black text-foreground overflow-hidden font-sans">
            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="w-64 border-r border-white/10 bg-background/50 backdrop-blur-xl hidden md:flex flex-col">
                <div className="flex flex-col h-full bg-background/95 backdrop-blur-xl text-foreground">
                    <div className="p-6 border-b border-white/10">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform">
                                AN
                            </div>
                            <span className="font-bold tracking-tight group-hover:text-primary transition-colors">Studio Admin</span>
                        </Link>
                    </div>

                    <SidebarNav />

                    <div className="p-4 border-t border-white/10 space-y-2">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600" />
                            <div className="text-xs">
                                <p className="font-medium truncate max-w-[120px]">{session.user?.name || "Admin User"}</p>
                                <p className="text-muted-foreground truncate max-w-[120px]">{session.user?.email}</p>
                            </div>
                        </div>
                        <form action={handleSignOut}>
                            <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                                <LogOut className="mr-2 h-4 w-4" /> Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative flex flex-col">
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                <header className="h-14 md:h-16 border-b border-white/5 flex items-center justify-between px-3 md:px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        {/* Mobile brand */}
                        <Link href="/admin" className="flex items-center gap-2 md:hidden">
                            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                AN
                            </div>
                            <span className="font-bold text-sm">Admin</span>
                        </Link>
                        <div className="hidden sm:block min-w-0 truncate"><AdminBreadcrumb /></div>
                    </div>

                    <Button variant="outline" size="sm" asChild className="shrink-0">
                        <Link href="/" target="_blank">
                            <ExternalLink className="md:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Live Site</span>
                        </Link>
                    </Button>
                </header>
                {/* pb-20 on mobile leaves space for the fixed bottom nav */}
                <div className="p-3 sm:p-4 md:p-8 w-full mx-auto pb-24 md:pb-8">
                    {children}
                </div>
            </main>

            {/* Mobile bottom navigation — replaces the hamburger sidebar */}
            <MobileBottomNav
                userName={session.user?.name}
                userEmail={session.user?.email}
                onSignOut={handleSignOut}
            />
        </div>
    )
}
