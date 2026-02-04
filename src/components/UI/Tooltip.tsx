import { useState, useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn";
import type { ReactNode } from "react";

interface TooltipProps {
  term: string;
  definition: string;
  children: ReactNode;
}

export function Tooltip({ term, definition, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();
  const tooltipId = `tooltip-${id}`;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span
        className={cn(
          "border-b border-dotted border-text-faint cursor-help",
        )}
        aria-describedby={isVisible ? tooltipId : undefined}
        tabIndex={0}
      >
        {children}
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
              "bg-text text-bg rounded-lg px-3 py-2 text-xs max-w-[280px] shadow-lg",
              "pointer-events-none whitespace-normal text-center",
            )}
          >
            <span className="font-medium">{term}: </span>
            {definition}
            {/* Arrow pointing down */}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
