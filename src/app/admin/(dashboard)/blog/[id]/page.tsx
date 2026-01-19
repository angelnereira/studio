"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const PostForm = dynamic(() => import("../post-form").then(mod => mod.PostForm), {
    ssr: false,
    loading: () => <div className="p-8 text-center text-muted-foreground">Loading editor...</div>
});

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string | null;
    authorId: string;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export default function EditPostPage() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${params.id}`);
                if (!response.ok) {
                    throw new Error("Post not found");
                }
                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading post...</div>;
    }

    if (error || !post) {
        return (
            <div className="p-8 text-center text-red-400">
                {error || "Post not found"}
            </div>
        );
    }

    return <PostForm post={post} isEditing />;
}
