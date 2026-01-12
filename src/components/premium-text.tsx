"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

interface PremiumTextProps {
    text: string;
    className?: string;
}

export const PremiumText = memo(function PremiumText({ text, className }: PremiumTextProps) {
    return (
        <div className={cn("relative inline-block overflow-hidden", className)}>
            <span
                className="relative z-10 block bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary animate-gradient-flow"
                style={{
                    textShadow: "0 0 30px rgba(13, 255, 0, 0.3)",
                    backgroundSize: "200% auto",
                }}
            >
                {text}
            </span>
        </div>
    );
});

