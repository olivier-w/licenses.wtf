import { cn } from "../../lib/cn";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-bg-elevated rounded-xl border border-border shadow-sm p-6",
        hover &&
          "hover:shadow-md hover:border-accent/20 transition-all duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
}
