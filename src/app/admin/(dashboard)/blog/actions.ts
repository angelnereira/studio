'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

// Schema validattion for Posts
const PostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required")
        .transform(val => val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    coverImage: z.string().url().optional().or(z.literal('')),
    published: z.coerce.boolean(),
    featured: z.coerce.boolean(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keywords: z.string().optional(),
})

export type PostState = {
    message?: string | null
    errors?: {
        [K in keyof z.infer<typeof PostSchema>]?: string[]
    }
}

export async function createPost(prevState: PostState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        return { message: "Unauthorized" }
    }

    // Extract basic fields
    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        excerpt: formData.get("excerpt"),
        coverImage: formData.get("coverImage"),
        published: formData.get("published") === "on",
        featured: formData.get("featured") === "on",
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
        keywords: formData.get("keywords"),
    }

    const validatedFields = PostSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Post.",
        }
    }

    const { slug } = validatedFields.data

    // Check if slug exists
    const existingPost = await prisma.post.findUnique({
        where: { slug }
    })

    if (existingPost) {
        return {
            errors: { slug: ["This slug is already taken."] },
            message: "Slug Error",
        }
    }

    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                authorId: session.user.id,
                publishedAt: validatedFields.data.published ? new Date() : null,
            },
        })
    } catch (error) {
        console.error("Database Error:", error)
        return { message: "Database Error: Failed to Create Post." }
    }

    revalidatePath("/admin/blog")
    redirect("/admin/blog")
}

export async function updatePost(id: string, prevState: PostState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { message: "Unauthorized" }

    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        excerpt: formData.get("excerpt"),
        coverImage: formData.get("coverImage"),
        published: formData.get("published") === "on",
        featured: formData.get("featured") === "on",
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
        keywords: formData.get("keywords"),
    }

    const validatedFields = PostSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Post.",
        }
    }

    try {
        await prisma.post.update({
            where: { id },
            data: {
                ...validatedFields.data,
                publishedAt: validatedFields.data.published ? new Date() : null, // Reset date on publish? Optional logic
            },
        })
    } catch (error) {
        return { message: "Database Error: Failed to Update Post." }
    }

    revalidatePath("/admin/blog")
    revalidatePath(`/admin/blog/${id}`)
    redirect("/admin/blog")
}

export async function deletePost(id: string) {
    const session = await auth()
    if (!session?.user?.id) return { message: "Unauthorized" }

    try {
        await prisma.post.delete({
            where: { id },
        })
        revalidatePath("/admin/blog")
        return { message: "Deleted Post" }
    } catch (error) {
        return { message: "Database Error: Failed to Delete Post." }
    }
}
