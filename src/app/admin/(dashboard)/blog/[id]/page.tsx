import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"

const PostForm = dynamic(() => import("../post-form").then(mod => mod.PostForm), {
    ssr: false,
    loading: () => <div className="p-8 text-center text-muted-foreground">Loading editor...</div>
})

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: PageProps) {
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: { id },
    })

    if (!post) {
        notFound()
    }

    return <PostForm post={post} isEditing />
}
