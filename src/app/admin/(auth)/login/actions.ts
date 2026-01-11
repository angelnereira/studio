"use server"

import { signIn } from "@/auth"

export async function loginAction(formData: FormData) {
    try {
        await signIn("resend", formData, { redirectTo: "/admin" })
    } catch (error) {
        throw error
    }
}
