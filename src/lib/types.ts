export type LicenseCategory =
  | "permissive"
  | "weak-copyleft"
  | "strong-copyleft"
  | "network-copyleft"
  | "source-available"
  | "public-domain";

export type PermissionType =
  | "commercial-use"
  | "modification"
  | "distribution"
  | "private-use"
  | "patent-use";

export type ConditionType =
  | "include-copyright"
  | "no-endorsement"
  | "document-changes"
  | "disclose-source"
  | "network-use-disclose"
  | "same-license"
  | "same-license-file"
  | "same-license-library";

export type LimitationType =
  | "no-liability"
  | "no-warranty"
  | "no-trademark-use"
  | "no-patent-use";

export interface License {
  id: string;
  spdx: string;
  name: string;
  shortName: string;
  category: LicenseCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  permissions: PermissionType[];
  conditions: ConditionType[];
  limitations: LimitationType[];
  notableProjects: string[];
  spectrumPosition: number; // 0 (most permissive) to 100 (most restrictive)
  osiApproved: boolean;
  tldr: string;
}

export interface Misconception {
  id: string;
  myth: string;
  reality: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  options: DecisionOption[];
}

export interface DecisionOption {
  label: string;
  description: string;
  nextNodeId: string | null;
  resultLicenses?: string[];
  resultReasoning?: string;
}

export const PERMISSION_LABELS: Record<PermissionType, string> = {
  "commercial-use": "Commercial use",
  modification: "Modification",
  distribution: "Distribution",
  "private-use": "Private use",
  "patent-use": "Patent use",
};

export const CONDITION_LABELS: Record<ConditionType, string> = {
  "include-copyright": "License & copyright notice",
  "no-endorsement": "No endorsement",
  "document-changes": "State changes",
  "disclose-source": "Disclose source",
  "network-use-disclose": "Network use is distribution",
  "same-license": "Same license",
  "same-license-file": "Same license (file)",
  "same-license-library": "Same license (library)",
};

export const LIMITATION_LABELS: Record<LimitationType, string> = {
  "no-liability": "Liability",
  "no-warranty": "Warranty",
  "no-trademark-use": "Trademark use",
  "no-patent-use": "Patent use",
};

export const CATEGORY_COLORS: Record<LicenseCategory, { bg: string; text: string; dot: string }> = {
  permissive: { bg: "bg-permissive-light", text: "text-permissive", dot: "bg-permissive" },
  "weak-copyleft": { bg: "bg-copyleft-light", text: "text-copyleft", dot: "bg-copyleft" },
  "strong-copyleft": { bg: "bg-copyleft-light", text: "text-copyleft", dot: "bg-copyleft" },
  "network-copyleft": { bg: "bg-restrictive-light", text: "text-restrictive", dot: "bg-restrictive" },
  "source-available": { bg: "bg-source-available-light", text: "text-source-available", dot: "bg-source-available" },
  "public-domain": { bg: "bg-permissive-light", text: "text-permissive", dot: "bg-permissive" },
};

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "why", label: "Why It Matters" },
  { id: "spectrum", label: "The Spectrum" },
  { id: "licenses", label: "License Guide" },
  { id: "comparison", label: "Comparison" },
  { id: "compatibility", label: "Compatibility" },
  { id: "decision", label: "Which License?" },
  { id: "how-to-apply", label: "How to Apply" },
  { id: "misconceptions", label: "Myths" },
  { id: "glossary", label: "Glossary" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
