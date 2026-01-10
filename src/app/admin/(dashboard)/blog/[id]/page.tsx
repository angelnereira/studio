
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PostForm } from "../post-form"

interface PageProps {
    params: { id: string }
}

export default async function EditPostPage({ params }: PageProps) {
    const post = await prisma.post.findUnique({
        where: { id: params.id },
    })

    if (!post) {
        notFound()
    }

    return <PostForm post={post} isEditing />
}
