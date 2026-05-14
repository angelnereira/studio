import type { ReactNode } from "react"

interface PageHeaderProps {
    title: string
    description?: string
    actions?: ReactNode
    icon?: ReactNode
}

export function PageHeader({ title, description, actions, icon }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/5 pb-6">
            <div className="flex items-start gap-3 min-w-0">
                {icon && (
                    <div className="shrink-0 mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                        {icon}
                    </div>
                )}
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {actions && (
                <div className="flex items-center gap-2 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    )
}
