"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarNav } from "@/components/admin/sidebar-nav"

interface MobileSidebarProps {
    userName?: string | null
    userEmail?: string | null
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

