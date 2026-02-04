import { SectionWrapper } from "../Layout/SectionWrapper";
import { licenses } from "../../data/licenses";
import {
  PERMISSION_LABELS,
  CONDITION_LABELS,
  LIMITATION_LABELS,
  type PermissionType,
  type ConditionType,
  type LimitationType,
  CATEGORY_COLORS,
} from "../../lib/types";

const ALL_PERMISSIONS: PermissionType[] = [
  "commercial-use",
  "modification",
  "distribution",
  "private-use",
  "patent-use",
];

const ALL_CONDITIONS: ConditionType[] = [
  "include-copyright",
  "no-endorsement",
  "document-changes",
  "disclose-source",
  "network-use-disclose",
  "same-license",
  "same-license-file",
  "same-license-library",
];

const ALL_LIMITATIONS: LimitationType[] = [
  "no-liability",
  "no-warranty",
  "no-trademark-use",
  "no-patent-use",
];

const GPL_COMPATIBLE: Record<string, boolean | null> = {
  mit: true,
  "apache-2.0": true, // Compatible with GPL v3, not GPL v2 — mark as yes since v3 is current
  "bsd-2-clause": true,
  "bsd-3-clause": true,
  isc: true,
  "mpl-2.0": true,
  "lgpl-3.0": true,
  "gpl-2.0": true,
  "gpl-3.0": true,
  "agpl-3.0": true,
  "bsl-1.1": false,
  "cc0-1.0": true,
  unlicense: true,
};

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto text-permissive">
      <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function X() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto text-text-faint">
      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ComparisonTable() {
  return (
    <SectionWrapper id="comparison" className="max-w-6xl">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Side-by-side comparison
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          A comprehensive matrix of what each license permits, requires, and
          restricts. Scroll horizontally on mobile.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-bg-elevated shadow-sm">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-xs font-medium text-text-faint uppercase tracking-wider min-w-[140px]">
                License
              </th>
              <th
                colSpan={ALL_PERMISSIONS.length}
                className="px-2 py-3 text-center text-xs font-medium text-permissive uppercase tracking-wider border-l border-border"
              >
                Permissions
              </th>
              <th
                colSpan={ALL_CONDITIONS.length}
                className="px-2 py-3 text-center text-xs font-medium text-copyleft uppercase tracking-wider border-l border-border"
              >
                Conditions
              </th>
              <th
                colSpan={ALL_LIMITATIONS.length}
                className="px-2 py-3 text-center text-xs font-medium text-restrictive uppercase tracking-wider border-l border-border"
              >
                Limitations
              </th>
              <th
                className="px-2 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider border-l border-border"
              >
                Compat.
              </th>
            </tr>
            <tr className="border-b border-border text-[11px] text-text-faint">
              <th className="sticky left-0 z-10 bg-bg-elevated px-4 py-2" />
              {ALL_PERMISSIONS.map((p) => (
                <th key={p} className="px-2 py-2 text-center font-normal first:border-l first:border-border">
                  {PERMISSION_LABELS[p]}
                </th>
              ))}
              {ALL_CONDITIONS.map((c) => (
                <th key={c} className="px-2 py-2 text-center font-normal first:border-l first:border-border">
                  {CONDITION_LABELS[c]}
                </th>
              ))}
              {ALL_LIMITATIONS.map((l) => (
                <th key={l} className="px-2 py-2 text-center font-normal first:border-l first:border-border">
                  {LIMITATION_LABELS[l]}
                </th>
              ))}
              <th className="px-2 py-2 text-center font-normal border-l border-border">
                GPL compatible?
              </th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license, i) => {
              const colors = CATEGORY_COLORS[license.category];
              const gplCompat = GPL_COMPATIBLE[license.id];
              return (
                <tr
                  key={license.id}
                  className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "" : "bg-surface/30"}`}
                >
                  <td className="sticky left-0 z-10 bg-bg-elevated px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${colors.dot}`} />
                      <span className="font-medium text-text whitespace-nowrap">
                        {license.shortName}
                      </span>
                    </div>
                  </td>
                  {ALL_PERMISSIONS.map((p) => (
                    <td key={p} className="px-2 py-3 text-center">
                      {license.permissions.includes(p) ? <Check /> : <X />}
                    </td>
                  ))}
                  {ALL_CONDITIONS.map((c) => (
                    <td key={c} className="px-2 py-3 text-center">
                      {license.conditions.includes(c) ? <Check /> : <X />}
                    </td>
                  ))}
                  {ALL_LIMITATIONS.map((l) => (
                    <td key={l} className="px-2 py-3 text-center">
                      {license.limitations.includes(l) ? <Check /> : <X />}
                    </td>
                  ))}
                  <td className="px-2 py-3 text-center border-l border-border">
                    {gplCompat === true ? <Check /> : gplCompat === false ? <X /> : <span className="text-text-faint">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
