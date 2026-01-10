
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Globe, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { deletePost } from "./actions"

export const metadata = {
    title: "Blog CMS | Admin Studio",
}

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blog CMS</h2>
                    <p className="text-muted-foreground">Manage your articles, tutorials, and news.</p>
                </div>
                <Link href="/admin/blog/create">
                    <Button className="font-bold">
                        <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {posts.length === 0 ? (
                    <Card className="border-dashed bg-black/20">
                        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="rounded-full bg-primary/10 p-4 mb-4">
                                <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">No posts yet</h3>
                            <p className="text-muted-foreground mb-4 max-w-sm">
                                Start writing your first article looking professional and share your knowledge properly.
                            </p>
                            <Link href="/admin/blog/create">
                                <Button variant="outline">Create Post</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="rounded-md border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b [&_tr]:border-white/10">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Title</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground hidden md:table-cell">Author</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground hidden md:table-cell">Date</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="border-b border-white/5 transition-colors hover:bg-white/5 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-[200px] md:max-w-[400px]">{post.title}</span>
                                                    <span className="text-xs text-muted-foreground font-mono">{post.slug}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {post.published ? (
                                                    <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20">Published</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">Draft</Badge>
                                                )}
                                            </td>
                                            <td className="p-4 align-middle hidden md:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                                        {post.author.name?.[0] || "A"}
                                                    </div>
                                                    <span>{post.author.name || "Admin"}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle hidden md:table-cell text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/blog/${post.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>

                                                    <form action={async () => {
                                                        "use server"
                                                        await deletePost(post.id)
                                                    }}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/60 hover:text-red-500 hover:bg-red-500/10">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
