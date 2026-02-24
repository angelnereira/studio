"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
    LayoutDashboard, FileText, Mail, Users, Settings, LogOut, ExternalLink,
    Menu, Briefcase, User, FileSignature, Search, Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileSidebarProps {
    userName?: string | null
    userEmail?: string | null
}

const NAV_ITEMS = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/admin/applications", icon: Briefcase, label: "Applications" },
    { href: "/admin/profile", icon: User, label: "Profile" },
    { href: "/admin/blog", icon: FileText, label: "Blog & CMS" },
    { href: "/admin/cover-letter", icon: FileSignature, label: "Cover Letters" },
    { href: "/admin/job-analysis", icon: Search, label: "Job Analysis" },
    { href: "/admin/emails", icon: Mail, label: "Email Marketing" },
    { href: "/admin/crm", icon: Users, label: "CRM & Leads" },
    { href: "/admin/subscribers", icon: Bell, label: "Subscribers" },
    { href: "/admin/settings", icon: Settings, label: "System Config" },
]

function NavLink({ href, icon: Icon, label, exact, onClick }: {
    href: string
    icon: React.ElementType
    label: string
    exact?: boolean
    onClick?: () => void
}) {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname.startsWith(href)

    return (
        <Button
            variant="ghost"
            asChild
            className={`w-full justify-start transition-all ${isActive
                ? "text-primary bg-primary/10 hover:bg-primary/15"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
            onClick={onClick}
        >
            <Link href={href}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
            </Link>
        </Button>
    )
}

function SidebarNav({ onClick }: { onClick?: () => void }) {
    return (
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} {...item} onClick={onClick} />
            ))}
        </nav>
    )
}

export function MobileSidebar({ userName, userEmail }: MobileSidebarProps) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    // Auto-close on navigation
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-white/10 w-64 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform">
                            AN
                        </div>
                        <span className="font-bold tracking-tight group-hover:text-primary transition-colors">Studio Admin</span>
                    </Link>
                </div>
                <SidebarNav onClick={() => setOpen(false)} />
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 shrink-0" />
                        <div className="text-xs min-w-0">
                            <p className="font-medium truncate">{userName || "Admin User"}</p>
                            <p className="text-muted-foreground truncate">{userEmail}</p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
