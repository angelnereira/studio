"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface ShareButtonsProps {
    title: string
    slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const url = `https://angelnereira.com/blog/${slug}`
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        toast({ title: "Enlace copiado", description: "El enlace ha sido copiado al portapapeles." })
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center gap-2 mt-8 py-6 border-t border-b border-primary/10">
            <span className="text-sm font-semibold text-muted-foreground mr-2">Compartir:</span>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#0A66C2]" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')}>
                <Linkedin className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#1DA1F2]" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}>
                <Twitter className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#1877F2]" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}>
                <Facebook className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary ml-auto" onClick={handleCopy}>
                {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
            </Button>
        </div>
    )
}
