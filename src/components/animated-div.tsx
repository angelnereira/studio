"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedDiv = memo(function AnimatedDiv({ children, className }: AnimatedDivProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
});
