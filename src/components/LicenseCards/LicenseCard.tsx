import { motion } from "motion/react";
import { CATEGORY_COLORS, type License } from "../../lib/types";
import { PermissionList } from "./PermissionList";

interface LicenseCardProps {
  license: License;
  isExpanded: boolean;
  onToggle: () => void;
}

export function LicenseCard({ license, isExpanded, onToggle }: LicenseCardProps) {
  const colors = CATEGORY_COLORS[license.category];

  return (
    <motion.div
      id={`license-${license.id}`}
      layout
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-xl border border-border bg-bg-elevated shadow-sm overflow-hidden"
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`license-detail-${license.id}`}
        className="w-full cursor-pointer p-6 text-left bg-transparent border-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-display text-lg font-semibold text-text m-0">
                {license.name}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                {license.categoryLabel}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-text-faint">{license.spdx}</p>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">{license.summary}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {license.notableProjects.map((project) => (
                <span
                  key={project}
                  className="inline-flex items-center rounded-md bg-surface px-2 py-0.5 text-xs font-mono text-text-muted"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`flex-shrink-0 text-text-faint transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {isExpanded ? (
        <motion.div
          id={`license-detail-${license.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border px-6 py-5"
        >
          <p className="text-sm text-text-muted leading-relaxed">{license.description}</p>

          <div className="mt-4 rounded-lg bg-surface p-4">
            <p className="text-xs font-medium text-text-faint uppercase tracking-wider mb-1">
              TL;DR
            </p>
            <p className="text-sm font-medium text-text">{license.tldr}</p>
          </div>

          <div className="mt-5">
            <PermissionList
              permissions={license.permissions}
              conditions={license.conditions}
              limitations={license.limitations}
            />
          </div>

          {license.osiApproved ? (
            <p className="mt-4 text-xs text-permissive">
              &#10003; OSI Approved
            </p>
          ) : (
            <p className="mt-4 text-xs text-text-faint">
              Not OSI Approved
            </p>
          )}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
