import { cn } from "../../lib/cn";
import { SECTIONS, type SectionId } from "../../lib/types";

interface SidebarProps {
  activeSection: SectionId;
}

export function Sidebar({ activeSection }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-56 border-r border-border bg-bg-elevated lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-5 py-5">
          <a href="#hero" className="font-display text-lg font-bold text-text no-underline">
            licenses<span className="text-accent">.wtf</span>
          </a>
        </div>

        <nav role="navigation" aria-label="Page sections" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="list-none space-y-1 p-0 m-0">
            {SECTIONS.map((section) => (
              <li key={section.id} className="m-0 p-0">
                <a
                  href={`#${section.id}`}
                  aria-current={activeSection === section.id ? "true" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm no-underline transition-colors duration-150",
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
        </nav>

        <div className="border-t border-border px-5 py-4">
          <p className="m-0 text-xs text-text-faint">
            Not legal advice.
          </p>
        </div>
      </div>
    </aside>
  );
}
