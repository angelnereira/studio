import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { VerifyRequestClient } from "./verify-request-client"

export const dynamic = "force-dynamic"

export default async function VerifyRequestPage() {
    const session = await auth()

    if (session?.user) {
        redirect("/admin")
    }

    return <VerifyRequestClient />
}
