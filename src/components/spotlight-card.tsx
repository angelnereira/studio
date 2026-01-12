"use client";

import { useRef, useState, MouseEvent, useCallback, memo } from 'react';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends CardProps {
  as?: React.ElementType;
}

export const SpotlightCard = memo(function SpotlightCard({ className, children, as: Comp = 'div', ...props }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    // Throttle with requestAnimationFrame for better performance
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return;

      const div = divRef.current;
      const rect = div.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafRef.current = null;
    });
  }, [isFocused]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setOpacity(1);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setOpacity(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <Comp
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full overflow-hidden rounded-[var(--radius)]", Comp === 'div' && 'card-spotlight', className)}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, hsla(var(--primary) / 0.08), transparent 60%)`,
          willChange: opacity > 0 ? 'opacity' : 'auto',
        }}
      />
      {Comp === 'div' ? (
        <Card className={cn("h-full w-full rounded-[var(--radius)] border-white/5", props.className)} {...props}>
          {children}
        </Card>
      ) : (
        children
      )}
    </Comp>
  );
});

