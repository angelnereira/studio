
import { auth } from "@/auth"
import Link from "next/link"
import { LayoutDashboard, FileEdit, LogOut } from "lucide-react"

export async function AdminBar() {
    const session = await auth()

    // Only show for authorized users (adjust logic if you have roles like 'admin')
    if (!session?.user) return null

    // Check strict email list if not using roles yet
    const allowedEmails = ["angel.nereira@gmail.com", "contact@angelnereira.com", "angel@angelnereira.com"]
    if (session.user.email && !allowedEmails.includes(session.user.email)) return null

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 p-2 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-5">
            <Link href="/admin" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white" title="Go to Dashboard">
                <LayoutDashboard className="w-5 h-5" />
            </Link>

            {/* Dynamic Edit Button - could be enhanced to detect current page */}
            <Link href="/admin/blog/create" className="p-2 rounded-full hover:bg-white/10 transition-colors text-primary" title="Write New Post">
                <FileEdit className="w-5 h-5" />
            </Link>

            <div className="w-px h-4 bg-white/10 mx-1" />

            <form action={async () => {
                "use server"
                const { signOut } = await import("@/auth")
                await signOut()
            }}>
                <button type="submit" className="p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors" title="Sign Out">
                    <LogOut className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}
