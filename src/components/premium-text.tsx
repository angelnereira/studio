"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PremiumTextProps {
    text: string;
    className?: string;
}

export function PremiumText({ text, className }: PremiumTextProps) {
    return (
        <div className={cn("relative inline-block overflow-hidden", className)}>
            <motion.span
                className="relative z-10 block bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto]"
                animate={{
                    backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    textShadow: "0 0 30px rgba(13, 255, 0, 0.3)"
                }}
            >
                {text}
            </motion.span>
        </div>
    );
}
