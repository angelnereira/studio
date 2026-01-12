"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { verifySubscriber, submitComment } from "@/app/blog/actions"

const commentSchema = z.object({
    name: z.string().min(2, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    content: z.string().min(5, "El comentario debe tener al menos 5 caracteres"),
})

interface Comment {
    id: string
    authorName: string
    createdAt: string
    content: string
}

interface CommentsSectionProps {
    postId: string
    initialComments: Comment[]
}

export function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments)
    const [isVerificationSent, setIsVerificationSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            name: "",
            email: "",
            content: "",
        },
    })

    async function onSubmit(data: z.infer<typeof commentSchema>) {
        setIsLoading(true)
        try {
            // 1. Submit comment
            const result = await submitComment(postId, data)

            if (result.success) {
                setComments([result.comment, ...comments])
                form.reset()
                toast({ title: "Comentario publicado", description: "Tu comentario ha sido añadido." })
            } else if (result.error === "unverified_email") {
                // 2. Trigger verification if needed
                await verifySubscriber(data.email)
                setIsVerificationSent(true)
                toast({
                    title: "Verificación requerida",
                    description: "Te hemos enviado un correo para verificar tu email. Por favor revisa tu bandeja."
                })
            } else {
                toast({ title: "Error", description: result.error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "Ocurrió un error inesperado", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    if (isVerificationSent) {
        return (
            <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-xl text-center">
                <h3 className="text-xl font-bold mb-2">¡Casi listo!</h3>
                <p className="text-muted-foreground mb-4">
                    Hemos enviado un enlace de verificación a <strong>{form.getValues("email")}</strong>.
                    <br />
                    Haz clic en el enlace para verificar tu cuenta y publicar tu comentario.
                </p>
                <Button variant="outline" onClick={() => setIsVerificationSent(false)}>
                    Volver al formulario
                </Button>
            </div>
        )
    }

    return (
        <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 font-headline">Comentarios</h3>

            {/* Comment Form */}
            <div className="bg-card/50 border border-border/50 rounded-xl p-6 mb-12 shadow-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu nombre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="tu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comentario</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Comparte tu opinión..."
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publicando...</>
                                ) : (
                                    <><Send className="mr-2 h-4 w-4" /> Publicar Comentario</>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8 italic">Se el primero en comentar.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <Avatar className="w-10 h-10 border border-primary/20">
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                    {comment.authorName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-foreground">{comment.authorName}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
