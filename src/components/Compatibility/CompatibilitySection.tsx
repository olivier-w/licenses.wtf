import { useState } from "react";
import { SectionWrapper } from "../Layout/SectionWrapper";
import {
  compatibilityData,
  compatibilityNotes,
  LICENSE_IDS_FOR_COMPAT,
  LICENSE_SHORT_NAMES,
} from "../../data/compatibility";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mx-auto text-permissive">
      <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mx-auto text-restrictive">
      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CompatibilitySection() {
  const [hoveredCell, setHoveredCell] = useState<{ from: string; to: string } | null>(null);

  const getEntry = (from: string, to: string) =>
    compatibilityData.find((e) => e.from === from && e.to === to);

  const hoveredEntry = hoveredCell ? getEntry(hoveredCell.from, hoveredCell.to) : null;

  return (
    <SectionWrapper id="compatibility" className="max-w-6xl">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          License compatibility
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Can you combine code from different licenses in one project? This
          matrix shows whether code under the row license can be included in a
          project under the column license.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-bg-elevated shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="sticky left-0 z-10 bg-surface px-3 py-2 text-left text-[10px] font-medium text-text-faint uppercase tracking-wider min-w-[100px]">
                <span className="block text-text-faint">From ↓ / Into →</span>
              </th>
              {LICENSE_IDS_FOR_COMPAT.map((id) => (
                <th
                  key={id}
                  className="px-2 py-2 text-center font-medium text-text whitespace-nowrap"
                >
                  {LICENSE_SHORT_NAMES[id]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LICENSE_IDS_FOR_COMPAT.map((fromId, i) => (
              <tr
                key={fromId}
                className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "" : "bg-surface/30"}`}
              >
                <td className="sticky left-0 z-10 bg-bg-elevated px-3 py-2 font-medium text-text whitespace-nowrap">
                  {LICENSE_SHORT_NAMES[fromId]}
                </td>
                {LICENSE_IDS_FOR_COMPAT.map((toId) => {
                  const entry = getEntry(fromId, toId);
                  const isHovered =
                    hoveredCell?.from === fromId && hoveredCell?.to === toId;
                  return (
                    <td
                      key={toId}
                      className={`px-2 py-2 text-center ${
                        fromId === toId
                          ? "bg-surface/50"
                          : isHovered
                            ? "bg-accent-light"
                            : ""
                      } ${entry?.note ? "cursor-help" : ""}`}
                      onMouseEnter={() => setHoveredCell({ from: fromId, to: toId })}
                      onMouseLeave={() => setHoveredCell(null)}
                      title={entry?.note}
                    >
                      {entry?.compatible ? <Check /> : <XMark />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hoveredEntry?.note ? (
        <div className="mt-3 rounded-lg border border-accent/20 bg-accent-light px-4 py-2.5 text-xs text-accent">
          <span className="font-medium">
            {LICENSE_SHORT_NAMES[hoveredEntry.from]} → {LICENSE_SHORT_NAMES[hoveredEntry.to]}:
          </span>{" "}
          {hoveredEntry.note}
        </div>
      ) : null}

      <div className="mt-6 space-y-2">
        {compatibilityNotes.map((note, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
            <span className="mt-0.5 flex-shrink-0 text-text-faint">•</span>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
