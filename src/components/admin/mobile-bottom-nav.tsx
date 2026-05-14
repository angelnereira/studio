"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    LayoutDashboard, Mail, Inbox, Users, MoreHorizontal,
    FileText, Briefcase, User, FileSignature, Search, Settings, X, LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { signOutAction } from "@/app/admin/(dashboard)/_actions/auth"

// Five primary destinations live on the bar; everything else lives behind "More".
const PRIMARY_ITEMS = [
    { href: "/admin", icon: LayoutDashboard, label: "Home", exact: true },
    { href: "/admin/inbox", icon: Inbox, label: "Inbox" },
    { href: "/admin/emails", icon: Mail, label: "Emails" },
    { href: "/admin/crm", icon: Users, label: "CRM" },
]

const MORE_ITEMS = [
    { href: "/admin/blog", icon: FileText, label: "Blog & CMS" },
    { href: "/admin/applications", icon: Briefcase, label: "Applications" },
    { href: "/admin/profile", icon: User, label: "Profile" },
    { href: "/admin/cv-assets", icon: FileText, label: "CV Assets" },
    { href: "/admin/cover-letter", icon: FileSignature, label: "Cover Letters" },
    { href: "/admin/job-analysis", icon: Search, label: "Job Analysis" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
]

interface MobileBottomNavProps {
    userName?: string | null
    userEmail?: string | null
}

export function MobileBottomNav({ userName, userEmail }: MobileBottomNavProps) {
    const pathname = usePathname()
    const [showMore, setShowMore] = useState(false)

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")

    const moreActive = MORE_ITEMS.some(i => isActive(i.href))

    return (
        <>
            <nav
                className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                <ul className="grid grid-cols-5 h-16">
                    {PRIMARY_ITEMS.map(item => {
                        const active = isActive(item.href, item.exact)
                        const Icon = item.icon
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center h-full gap-0.5 text-[10px] transition-colors",
                                        active
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-white"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_6px_rgba(223,255,0,0.5)]")} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li>
                        <button
                            type="button"
                            onClick={() => setShowMore(true)}
                            className={cn(
                                "flex flex-col items-center justify-center h-full w-full gap-0.5 text-[10px] transition-colors",
                                moreActive ? "text-primary" : "text-muted-foreground hover:text-white"
                            )}
                            aria-label="More options"
                        >
                            <MoreHorizontal className={cn("h-5 w-5", moreActive && "drop-shadow-[0_0_6px_rgba(223,255,0,0.5)]")} />
                            <span className="font-medium">More</span>
                        </button>
                    </li>
                </ul>
            </nav>

            <Sheet open={showMore} onOpenChange={setShowMore}>
                <SheetContent side="bottom" className="rounded-t-2xl border-white/10 bg-background/95 backdrop-blur-xl p-0 max-h-[85vh]">
                    <SheetHeader className="px-4 pt-4 pb-2 flex flex-row items-center justify-between">
                        <SheetTitle className="text-base">More</SheetTitle>
                        <button onClick={() => setShowMore(false)} className="text-muted-foreground hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                    </SheetHeader>

                    <div className="px-4 pb-4 space-y-3 overflow-y-auto">
                        {(userName || userEmail) && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-600 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{userName || "Admin User"}</p>
                                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                            {MORE_ITEMS.map(item => {
                                const active = isActive(item.href)
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setShowMore(false)}
                                        className={cn(
                                            "flex items-center gap-2 p-3 rounded-lg border transition-colors",
                                            active
                                                ? "border-primary/40 bg-primary/10 text-primary"
                                                : "border-white/10 bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span className="text-sm truncate">{item.label}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Server Action wired straight to the form — no client wrapper. */}
                        <form action={signOutAction}>
                            <Button
                                type="submit"
                                variant="ghost"
                                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                                <LogOut className="mr-2 h-4 w-4" /> Sign Out
                            </Button>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
