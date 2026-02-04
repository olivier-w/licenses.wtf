import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 md:py-24",
        !fullWidth && "mx-auto max-w-4xl px-6",
        className
      )}
    >
      {children}
    </section>
  );
}
