import { cn } from "../../lib/cn";

export type FilterValue = "all" | "permissive" | "copyleft" | "source-available";

interface LicenseFiltersProps {
  active: FilterValue;
  onChange: (filter: FilterValue) => void;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "permissive", label: "Permissive" },
  { value: "copyleft", label: "Copyleft" },
  { value: "source-available", label: "Source Available" },
];

export function LicenseFilters({ active, onChange }: LicenseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter licenses by category">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          role="radio"
          aria-checked={active === filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer min-h-[44px]",
            active === filter.value
              ? "bg-accent text-white"
              : "bg-surface text-text-muted hover:bg-border/50 hover:text-text"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
