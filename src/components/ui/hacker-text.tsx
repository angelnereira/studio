"use client";

import { useEffect, useState, useRef } from 'react';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

interface HackerTextProps {
    text: string;
    className?: string;
}

export function HackerText({ text, className }: HackerTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;

        clearInterval(intervalRef.current!);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current!);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        // Initial scramble on mount
        scramble();
        return () => clearInterval(intervalRef.current!);
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        scramble();
    };

    return (
        <span
            className={`font-mono cursor-default inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
        </span>
    );
}
