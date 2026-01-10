"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function BackgroundAnimation() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <AnimatePresence>
                {/* Floating geometric shapes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            scale: 0.5 + Math.random() * 0.5,
                            rotate: 0,
                        }}
                        animate={{
                            opacity: [0.03, 0.08, 0.03],
                            x: [
                                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                            ],
                            y: [
                                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
                            ],
                            rotate: [0, 180],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className={`absolute rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen
              ${i % 3 === 0 ? 'bg-primary w-64 h-64' :
                                i % 3 === 1 ? 'bg-secondary w-96 h-96' :
                                    'bg-accent w-48 h-48'}`}
                    />
                ))}

                {/* Geometric Grid Overlay - Subtle movement */}
                <motion.div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(${theme === 'dark' ? '#DFFF00' : '#136D56'} 1px, transparent 1px), 
                             linear-gradient(to right, ${theme === 'dark' ? '#DFFF00' : '#136D56'} 1px, transparent 1px)`,
                        backgroundSize: '100px 100px',
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '100px 100px'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </AnimatePresence>
        </div>
    );
}
