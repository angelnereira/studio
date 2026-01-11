"use client";

import { cn } from "@/lib/utils";

interface GradientFlowTextProps {
    text: string;
    className?: string;
}

export function GradientFlowText({ text, className }: GradientFlowTextProps) {
    return (
        <span
            className={cn(
                "inline-block text-transparent bg-clip-text bg-[length:200%_auto] animate-shimmer",
                "bg-gradient-to-r from-primary via-white to-primary dark:via-white dark:from-primary dark:to-primary",
                className
            )}
        >
            {text}
        </span>
    );
}
