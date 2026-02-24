"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const routeLabels: Record<string, string> = {
    admin: "Dashboard",
    applications: "Applications",
    profile: "Profile",
    blog: "Blog & CMS",
    create: "New Post",
    emails: "Email Marketing",
    crm: "CRM & Leads",
    subscribers: "Subscribers",
    settings: "System Config",
    "cover-letter": "Cover Letters",
    "job-analysis": "Job Analysis",
    new: "Create New",
}

export function AdminBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean) // e.g. ['admin', 'emails']

    // Build breadcrumb items
    const crumbs = segments.map((seg, i) => ({
        label: routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
        href: "/" + segments.slice(0, i + 1).join("/"),
        isLast: i === segments.length - 1,
    }))

    // Remove duplicate "Dashboard" for /admin root
    if (crumbs.length === 1 && crumbs[0].label === "Dashboard") {
        return <span className="font-semibold text-lg">Dashboard</span>
    }

    return (
        <nav className="flex items-center gap-1 text-sm">
            {crumbs.map((crumb, i) => (
                <div key={crumb.href} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                    {crumb.isLast ? (
                        <span className="font-semibold text-white">{crumb.label}</span>
                    ) : (
                        <Link href={crumb.href} className="text-muted-foreground hover:text-white transition-colors">
                            {i === 0 ? <Home className="w-3.5 h-3.5" /> : crumb.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    )
}
