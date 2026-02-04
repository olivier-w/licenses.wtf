import { cn } from "../../lib/cn";
import type { LicenseCategory } from "../../lib/types";
import { CATEGORY_COLORS } from "../../lib/types";

const CATEGORY_LABELS: Record<LicenseCategory, string> = {
  permissive: "Permissive",
  "weak-copyleft": "Weak Copyleft",
  "strong-copyleft": "Strong Copyleft",
  "network-copyleft": "Network Copyleft",
  "source-available": "Source Available",
  "public-domain": "Public Domain",
};

interface BadgeProps {
  category: LicenseCategory;
  label?: string;
  className?: string;
}

export function Badge({ category, label, className }: BadgeProps) {
  const colors = CATEGORY_COLORS[category];
  const displayLabel = label ?? CATEGORY_LABELS[category];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        colors.bg,
        colors.text,
        className,
      )}
    >
      {displayLabel}
    </span>
  );
}
