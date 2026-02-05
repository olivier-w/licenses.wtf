import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn";
import { SECTIONS, type SectionId } from "../../lib/types";
import { ThemeToggle } from "../UI/ThemeToggle";

interface MobileNavProps {
  activeSection: SectionId;
}

export function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 right-0 top-0 z-40 lg:hidden">
      <div className="flex items-center justify-between border-b border-border bg-bg-elevated/95 px-4 py-3 backdrop-blur-sm">
        <a href="#hero" className="font-display text-lg font-bold text-text no-underline">
          licenses<span className="text-accent">.wtf</span>
        </a>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-muted hover:bg-surface"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Page sections"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-b border-border bg-bg-elevated/95 px-4 py-3 backdrop-blur-sm"
          >
            <ul className="list-none space-y-1 p-0 m-0">
              {SECTIONS.map((section) => (
                <li key={section.id} className="m-0 p-0">
                  <a
                    href={`#${section.id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm no-underline transition-colors",
                      activeSection === section.id
                        ? "bg-accent-light text-accent font-medium"
                        : "text-text-muted hover:bg-surface hover:text-text"
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
