"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User } from "lucide-react"

interface ModernPostLayoutProps {
    title: string
    excerpt?: string
    date: string
    readingTime?: string
    author: string
    tags: string[]
    coverImage?: string
    children: React.ReactNode
}

export function ModernPostLayout({
    title,
    excerpt,
    date,
    readingTime,
    author,
    tags,
    coverImage,
    children
}: ModernPostLayoutProps) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[400px] flex items-end justify-center overflow-hidden">
                {coverImage && (
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-0"
                    >
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    </motion.div>
                )}

                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center gap-2 flex-wrap">
                            {tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-none">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            {title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} />
                                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                                <span>{author}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <time dateTime={date}>
                                    {new Date(date).toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </div>
                            {readingTime && (
                                <>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{readingTime}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                {excerpt && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 border-l-4 border-primary pl-6 py-2 italic"
                    >
                        {excerpt}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    )
}
