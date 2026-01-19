"use client";

import dynamic from "next/dynamic"

const PostForm = dynamic(() => import("../post-form").then(mod => mod.PostForm), {
    ssr: false,
    loading: () => <div className="p-8 text-center text-muted-foreground">Loading editor...</div>
})

export default function CreatePostPage() {
    return <PostForm />
}
