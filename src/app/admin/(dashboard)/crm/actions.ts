'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const StatusSchema = z.enum(["new", "contacted", "closed", "spam"])

export async function updateContactStatus(id: string, newStatus: string) {
    const session = await auth()
    if (!session?.user) return { message: "Unauthorized" }

    const parsed = StatusSchema.safeParse(newStatus)
    if (!parsed.success) return { message: "Invalid status" }

    try {
        await prisma.contact.update({
            where: { id },
            data: { status: newStatus },
        })
        revalidatePath("/admin/crm")
        return { message: "Status updated" }
    } catch (error) {
        return { message: "Failed to update status" }
    }
}

export async function deleteContact(id: string) {
    const session = await auth()
    if (!session?.user) return { message: "Unauthorized" }

    try {
        await prisma.contact.delete({
            where: { id },
        })
        revalidatePath("/admin/crm")
        return { message: "Contact deleted" }
    } catch (error) {
        return { message: "Failed to delete contact" }
    }
}
