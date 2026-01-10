"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';

export function GlobalEasterEggs() {
    const { setTheme } = useTheme();
    const { toast } = useToast();
    const [konamiIndex, setKonamiIndex] = useState(0);

    // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    useEffect(() => {
        // Easter Egg 1: Console Art
        console.log(
            `%c
      
    ____  ______      __   _______ ____  ____  ______
   / __ \\/ ____/     / /  / ____/ __ \\/ __ \\/ ____/
  / / / / __/       / /  / /   / / / / / / / __/   
 / /_/ / /___      / /__/ /___/ /_/ / /_/ / /___   
/_____/_____/     /_____/____/\\____/_____/_____/   
                                                   
    %c SYSTEM READY // ACCESS GRANTED
    `,
            'color: #DFFF00; font-weight: bold; font-size: 20px;',
            'color: #2C5E55; font-size: 12px;'
        );

        const handleKeyDown = (e: KeyboardEvent) => {
            // Easter Egg 2: Konami Code Listener
            if (e.key === konamiCode[konamiIndex]) {
                const nextIndex = konamiIndex + 1;
                setKonamiIndex(nextIndex);

                if (nextIndex === konamiCode.length) {
                    activateGodMode();
                    setKonamiIndex(0);
                }
            } else {
                setKonamiIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiIndex]);

    const activateGodMode = () => {
        toast({
            title: "⚡ GOD MODE ACTIVATED ⚡",
            description: "System restrictions lifted. Enjoy the ride.",
            duration: 5000,
            className: "border-primary bg-black text-primary font-mono",
        });

        // Inject matrix style override
        document.documentElement.style.setProperty('--primary', '120 100% 50%'); // Matrix Green
        document.documentElement.style.setProperty('--background', '0 0% 0%'); // Pure Black

        // Play sound if possible (optional, skipping to avoid audio issues)
    };

    return null;
}
