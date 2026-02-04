import { cn } from "../../lib/cn";
import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md bg-surface text-text-muted text-xs font-mono",
        className,
      )}
    >
      {children}
    </span>
  );
}
