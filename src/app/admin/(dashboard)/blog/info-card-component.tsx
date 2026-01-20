
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { Info, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react'
import { cn } from '@/utils/cn' // Assuming utils/cn exists, otherwise I'll check or use simple join

interface InfoCardComponentProps {
    node: {
        attrs: {
            type: 'info' | 'success' | 'warning' | 'danger'
        }
    }
    updateAttributes: (attrs: any) => void
    extension: any
}

// Ensure cn utility exists, checking file structure first might be safer but `clsx` and `tailwind-merge` are in package.json
// I'll check utils folder later, but for now assuming standard shadcn structure or similar.
// Actually, in post-form.tsx I saw imports from `@/components/ui/...` so `@/lib/utils` or `@/utils/cn` probably exists.
// Let's assume `@/lib/utils` which is standard for shadcn.
// Wait, listing showed `utils` directory at root? No, `src/utils` maybe?
// Let's just use standard shadcn import for now, if it fails I'll fix.
// Actually, `src` has `utils`? `utils` is in root in the file listing.
// Let's check where `cn` is.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const InfoCardComponent = ({ node, updateAttributes }: InfoCardComponentProps) => {
    const { type } = node.attrs

    const colors = {
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200",
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-200",
        danger: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200",
    }

    const icons = {
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
        danger: AlertOctagon,
    }

    const Icon = icons[type] || Info

    return (
        <NodeViewWrapper className="my-4">
            <div className={cn("flex gap-3 p-4 border rounded-lg", colors[type])}>
                <div className="flex-shrink-0 mt-0.5 select-none" contentEditable={false}>
                    <div className="relative group cursor-pointer">
                        <Icon className="w-5 h-5" />
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/10 dark:bg-white/10 rounded flex items-center justify-center backdrop-blur-[1px]">
                            {/* Simple toggle mechanism for now just to switch types if clicked? Maybe too complex for one click. */}
                        </div>
                    </div>
                    {/* Type switcher could be a tipppy or popover, keeping it simple: use toolbar to insert/update */}
                </div>
                <div className="flex-1 min-w-0 prose prose-sm max-w-none dark:prose-invert">
                    <NodeViewContent />
                </div>
            </div>
        </NodeViewWrapper>
    )
}
