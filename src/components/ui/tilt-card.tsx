"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    rotationIntensity?: number; // How much it rotates
}

export function TiltCard({ children, className = "", rotationIntensity = 20 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]);

    const scale = useSpring(1, { stiffness: 150, damping: 20 });
    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const [isHoverable, setIsHoverable] = useState(false);

    React.useEffect(() => {
        // Only enable tilt on devices that support hover (desktop/mouse)
        const checkHover = () => {
            setIsHoverable(window.matchMedia('(hover: hover)').matches);
        };

        checkHover();
        window.addEventListener('resize', checkHover);
        return () => window.removeEventListener('resize', checkHover);
    }, []);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!isHoverable) return;

        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
        // Minimal scale for desktop to avoid blurriness
        scale.set(1.02);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        scale.set(1);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={isHoverable ? handleMouseMove : undefined}
            onMouseLeave={isHoverable ? handleMouseLeave : undefined}
            whileTap={{ scale: 0.98 }}
            style={{
                rotateX: isHoverable ? springRotateX : 0,
                rotateY: isHoverable ? springRotateY : 0,
                scale: scale,
                transformStyle: "preserve-3d",
            }}
            // Force hardware acceleration
            className={`relative transition-colors duration-200 ease-out will-change-transform ${className}`}
        >
            <div style={{ transform: isHoverable ? "translateZ(30px)" : "none", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}
