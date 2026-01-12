"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"
import ImageExtension from "@tiptap/extension-image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CldUploadWidget } from 'next-cloudinary';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { createPost, updatePost } from "./actions"
import { Loader2, Save, ArrowLeft, Image as ImageIcon, Trash2 } from "lucide-react"
import dynamic from "next/dynamic"

const EditorToolbar = dynamic(() => import("./editor-toolbar").then((mod) => mod.EditorToolbar), { ssr: false })
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const PostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required")
        .transform(val => val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keywords: z.string().optional(),
})

type PostFormValues = z.infer<typeof PostSchema>

interface PostFormProps {
    post?: any // Type strictly with Prisma type later
    isEditing?: boolean
}

export function PostForm({ post, isEditing = false }: PostFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isPending, setIsPending] = useState(false)

    // Initialize Form
    const form = useForm<PostFormValues>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            excerpt: post?.excerpt || "",
            coverImage: post?.coverImage || "",
            published: post?.published || false,
            featured: post?.featured || false,
            seoTitle: post?.seoTitle || "",
            seoDescription: post?.seoDescription || "",
            keywords: post?.keywords || "",
        },
    })

    // Initialize Tiptap
    const editor = useEditor({
        extensions: [
            StarterKit,
            LinkExtension.configure({
                openOnClick: false,
            }),
            ImageExtension,
        ],
        content: post?.content || "",
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            form.setValue("content", editor.getHTML())
        },
    })

    // Auto-generate slug from title
    const watchTitle = form.watch("title")
    useEffect(() => {
        if (!isEditing && watchTitle) {
            const slug = watchTitle
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
            form.setValue("slug", slug)
        }
    }, [watchTitle, isEditing, form])

    const onSubmit = async (data: PostFormValues) => {
        setIsPending(true)
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value))
        })

        try {
            if (isEditing && post?.id) {
                await updatePost(post.id, {} as any, formData)
                toast({ title: "Post updated", description: "Changes saved successfully." })
            } else {
                await createPost({} as any, formData)
                toast({ title: "Post created", description: "New article published." })
            }

        } catch (error) {
            toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                        <h1 className="text-2xl font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            <Save className="w-4 h-4 mr-2" />
                            {isEditing ? "Update Post" : "Create Post"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter post title..." {...field} className="text-lg font-semibold" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <FormLabel>Content</FormLabel>
                            <div className="border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                                <EditorToolbar editor={editor} />
                                <EditorContent editor={editor} />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Excerpt (Short summary)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief description for SEO and previews..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Publishing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="published"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Published</FormLabel>
                                                <FormDescription>Visible on the public site</FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Featured</FormLabel>
                                                <FormDescription>Pin to top or homepage</FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Metadata & SEO</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>URL-friendly name</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="coverImage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <CldUploadWidget
                                                        uploadPreset="studio_preset"
                                                        onSuccess={(result: any) => {
                                                            console.log("Upload Result:", result);
                                                            if (result?.info?.secure_url) {
                                                                field.onChange(result.info.secure_url)
                                                            }
                                                        }}
                                                        // Added options to ensure better UX
                                                        options={{
                                                            sources: ['local', 'url'],
                                                            multiple: false,
                                                            maxFiles: 1
                                                        }}
                                                    >
                                                        {({ open }) => (
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                className="w-full"
                                                                onClick={() => open()}
                                                            >
                                                                <ImageIcon className="w-4 h-4 mr-2" />
                                                                Upload Image
                                                            </Button>
                                                        )}
                                                    </CldUploadWidget>

                                                    {/* Fallback Manual Input */}
                                                    <Input
                                                        placeholder="Or paste image URL..."
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="text-xs bg-black/20"
                                                    />
                                                </div>
                                            </FormControl>
                                            {field.value && (
                                                <div className="mt-2 rounded-md overflow-hidden aspect-video relative border border-white/10 group">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={field.value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => field.onChange("")}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="seoTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SEO Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Optional override" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
