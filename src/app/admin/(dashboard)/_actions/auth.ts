"use server"

import { signOut } from "@/auth"

// Module-level Server Action. Defining it here (not inline inside the layout
// component) gives Next.js a stable action ID and avoids the "Server
// Components render" error that happens when an inline arrow-function
// `"use server"` action is recreated on every layout re-render.
export async function signOutAction() {
    await signOut({ redirectTo: "/admin/login" })
}
