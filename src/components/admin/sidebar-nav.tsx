"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard, FileText, Mail, Users, Settings,
    Briefcase, User, FileSignature, Search
} from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_SECTIONS = [
    {
        label: null, // No header for main section
        items: [
            { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
        ],
    },
    {
        label: "Content",
        items: [
            { href: "/admin/blog", icon: FileText, label: "Blog & CMS" },
        ],
    },
    {
        label: "Outreach",
        items: [
            { href: "/admin/emails", icon: Mail, label: "Email Marketing" },
            { href: "/admin/crm", icon: Users, label: "CRM & Leads" },
        ],
    },
    {
        label: "Career",
        items: [
            { href: "/admin/applications", icon: Briefcase, label: "Applications" },
            { href: "/admin/profile", icon: User, label: "Profile" },
            { href: "/admin/cover-letter", icon: FileSignature, label: "Cover Letters" },
            { href: "/admin/job-analysis", icon: Search, label: "Job Analysis" },
        ],
    },
    {
        label: "System",
        items: [
            { href: "/admin/settings", icon: Settings, label: "Settings" },
        ],
    },
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

export function SidebarNav({ onClick }: { onClick?: () => void }) {
    return (
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {NAV_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-1">
                    {section.label && (
                        <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1">
                            {section.label}
                        </p>
                    )}
                    {section.items.map((item) => (
                        <NavLink key={item.href} {...item} onClick={onClick} />
                    ))}
                </div>
            ))}
        </nav>
    )
}
