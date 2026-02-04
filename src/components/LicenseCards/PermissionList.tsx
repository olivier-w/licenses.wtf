import {
  PERMISSION_LABELS,
  CONDITION_LABELS,
  LIMITATION_LABELS,
  type PermissionType,
  type ConditionType,
  type LimitationType,
} from "../../lib/types";

interface PermissionListProps {
  permissions: PermissionType[];
  conditions: ConditionType[];
  limitations: LimitationType[];
  compact?: boolean;
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-permissive flex-shrink-0">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConditionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-copyleft flex-shrink-0">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LimitationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-restrictive flex-shrink-0">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PermissionList({
  permissions,
  conditions,
  limitations,
  compact = false,
}: PermissionListProps) {
  const textSize = compact ? "text-xs" : "text-sm";

  return (
    <div className={compact ? "grid gap-4 md:grid-cols-3" : "grid gap-6 md:grid-cols-3"}>
      <div>
        <p className={`font-medium text-permissive ${compact ? "text-xs" : "text-sm"} mb-2`}>
          Permissions
        </p>
        <ul className="list-none space-y-1.5 p-0 m-0">
          {permissions.map((p) => (
            <li key={p} className={`flex items-center gap-2 ${textSize} text-text-muted m-0 p-0`}>
              <CheckIcon />
              {PERMISSION_LABELS[p]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={`font-medium text-copyleft ${compact ? "text-xs" : "text-sm"} mb-2`}>
          Conditions
        </p>
        <ul className="list-none space-y-1.5 p-0 m-0">
          {conditions.map((c) => (
            <li key={c} className={`flex items-center gap-2 ${textSize} text-text-muted m-0 p-0`}>
              <ConditionIcon />
              {CONDITION_LABELS[c]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={`font-medium text-restrictive ${compact ? "text-xs" : "text-sm"} mb-2`}>
          Limitations
        </p>
        <ul className="list-none space-y-1.5 p-0 m-0">
          {limitations.map((l) => (
            <li key={l} className={`flex items-center gap-2 ${textSize} text-text-muted m-0 p-0`}>
              <LimitationIcon />
              {LIMITATION_LABELS[l]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
