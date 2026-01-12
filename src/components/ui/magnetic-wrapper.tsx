"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useCallback, memo } from "react";

export const MagneticWrapper = memo(function MagneticWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Reduced stiffness for smoother, less CPU-intensive animation
    const mouseX = useSpring(x, { stiffness: 100, damping: 20, mass: 0.2 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.2 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        // Throttle with requestAnimationFrame
        if (rafRef.current !== null) return;

        rafRef.current = requestAnimationFrame(() => {
            if (!ref.current) return;

            const { clientX, clientY } = e;
            const { height, width, left, top } = ref.current.getBoundingClientRect();
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            x.set(middleX * 0.3); // Reduced sensitivity for smoother effect
            y.set(middleY * 0.3);
            rafRef.current = null;
        });
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
            style={{ x: mouseX, y: mouseY }}
            className={className}
        >
            {children}
        </motion.div>
    );
});

