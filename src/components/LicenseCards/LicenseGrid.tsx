import { useState, useMemo } from "react";
import { SectionWrapper } from "../Layout/SectionWrapper";
import { LicenseFilters, type FilterValue } from "./LicenseFilters";
import { LicenseCard } from "./LicenseCard";
import { licenses } from "../../data/licenses";

export function LicenseGrid() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return licenses;
    if (filter === "permissive") {
      return licenses.filter(
        (l) => l.category === "permissive" || l.category === "public-domain"
      );
    }
    if (filter === "copyleft") {
      return licenses.filter(
        (l) =>
          l.category === "weak-copyleft" ||
          l.category === "strong-copyleft" ||
          l.category === "network-copyleft"
      );
    }
    if (filter === "source-available") {
      return licenses.filter((l) => l.category === "source-available");
    }
    return licenses;
  }, [filter]);

  return (
    <SectionWrapper id="licenses">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          License deep dives
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Everything you need to know about each license — permissions,
          conditions, limitations, and which major projects use them.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <LicenseFilters active={filter} onChange={setFilter} />
      </div>

      <div className="mt-8 grid gap-4">
        {filtered.map((license) => (
          <LicenseCard
            key={license.id}
            license={license}
            isExpanded={expandedId === license.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === license.id ? null : license.id))
            }
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-text-muted">
          No licenses match this filter.
        </p>
      ) : null}
    </SectionWrapper>
  );
}
