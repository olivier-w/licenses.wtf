export interface CompatibilityEntry {
  from: string;
  to: string;
  compatible: boolean;
  note?: string;
}

export const LICENSE_IDS_FOR_COMPAT = [
  "mit",
  "bsd-2-clause",
  "bsd-3-clause",
  "apache-2.0",
  "mpl-2.0",
  "lgpl-3.0",
  "gpl-2.0",
  "gpl-3.0",
  "agpl-3.0",
] as const;

export const LICENSE_SHORT_NAMES: Record<string, string> = {
  mit: "MIT",
  "bsd-2-clause": "BSD 2",
  "bsd-3-clause": "BSD 3",
  "apache-2.0": "Apache 2.0",
  "mpl-2.0": "MPL 2.0",
  "lgpl-3.0": "LGPL v3",
  "gpl-2.0": "GPL v2",
  "gpl-3.0": "GPL v3",
  "agpl-3.0": "AGPL v3",
};

// "from" code can be included in a "to" project
// compatible = true means code under "from" can flow into a project under "to"
export const compatibilityData: CompatibilityEntry[] = [
  // MIT can flow into anything
  { from: "mit", to: "mit", compatible: true },
  { from: "mit", to: "bsd-2-clause", compatible: true, note: "MIT code retains its original license terms" },
  { from: "mit", to: "bsd-3-clause", compatible: true, note: "MIT code retains its original license terms" },
  { from: "mit", to: "apache-2.0", compatible: true, note: "MIT code retains its original license terms" },
  { from: "mit", to: "mpl-2.0", compatible: true },
  { from: "mit", to: "lgpl-3.0", compatible: true },
  { from: "mit", to: "gpl-2.0", compatible: true },
  { from: "mit", to: "gpl-3.0", compatible: true },
  { from: "mit", to: "agpl-3.0", compatible: true },

  // BSD 2-Clause can flow into anything
  { from: "bsd-2-clause", to: "mit", compatible: true, note: "BSD 2-Clause code retains its original license terms" },
  { from: "bsd-2-clause", to: "bsd-2-clause", compatible: true },
  { from: "bsd-2-clause", to: "bsd-3-clause", compatible: true, note: "BSD 2-Clause code retains its original license terms" },
  { from: "bsd-2-clause", to: "apache-2.0", compatible: true, note: "BSD 2-Clause code retains its original license terms" },
  { from: "bsd-2-clause", to: "mpl-2.0", compatible: true },
  { from: "bsd-2-clause", to: "lgpl-3.0", compatible: true },
  { from: "bsd-2-clause", to: "gpl-2.0", compatible: true },
  { from: "bsd-2-clause", to: "gpl-3.0", compatible: true },
  { from: "bsd-2-clause", to: "agpl-3.0", compatible: true },

  // BSD 3-Clause can flow into anything
  { from: "bsd-3-clause", to: "mit", compatible: true, note: "BSD 3-Clause code retains its terms including the non-endorsement clause" },
  { from: "bsd-3-clause", to: "bsd-2-clause", compatible: true, note: "BSD 3-Clause code retains its terms including the non-endorsement clause" },
  { from: "bsd-3-clause", to: "bsd-3-clause", compatible: true },
  { from: "bsd-3-clause", to: "apache-2.0", compatible: true, note: "BSD 3-Clause code retains its terms including the non-endorsement clause" },
  { from: "bsd-3-clause", to: "mpl-2.0", compatible: true },
  { from: "bsd-3-clause", to: "lgpl-3.0", compatible: true },
  { from: "bsd-3-clause", to: "gpl-2.0", compatible: true },
  { from: "bsd-3-clause", to: "gpl-3.0", compatible: true },
  { from: "bsd-3-clause", to: "agpl-3.0", compatible: true },

  // Apache 2.0 can flow into most, but NOT GPL v2 (patent clause conflict)
  { from: "apache-2.0", to: "mit", compatible: true, note: "Apache 2.0 code retains its terms including patent grant and NOTICE requirements" },
  { from: "apache-2.0", to: "bsd-2-clause", compatible: true, note: "Apache 2.0 code retains its terms including patent grant and NOTICE requirements" },
  { from: "apache-2.0", to: "bsd-3-clause", compatible: true, note: "Apache 2.0 code retains its terms including patent grant and NOTICE requirements" },
  { from: "apache-2.0", to: "apache-2.0", compatible: true },
  { from: "apache-2.0", to: "mpl-2.0", compatible: true },
  { from: "apache-2.0", to: "lgpl-3.0", compatible: true },
  { from: "apache-2.0", to: "gpl-2.0", compatible: false, note: "Patent clause conflict" },
  { from: "apache-2.0", to: "gpl-3.0", compatible: true, note: "Resolved in GPL v3" },
  { from: "apache-2.0", to: "agpl-3.0", compatible: true },

  // MPL 2.0 - has explicit GPL compatibility (Section 3.3)
  { from: "mpl-2.0", to: "mit", compatible: false },
  { from: "mpl-2.0", to: "bsd-2-clause", compatible: false },
  { from: "mpl-2.0", to: "bsd-3-clause", compatible: false },
  { from: "mpl-2.0", to: "apache-2.0", compatible: false },
  { from: "mpl-2.0", to: "mpl-2.0", compatible: true },
  { from: "mpl-2.0", to: "lgpl-3.0", compatible: true, note: "MPL 2.0 Section 3.3" },
  { from: "mpl-2.0", to: "gpl-2.0", compatible: true, note: "MPL 2.0 Section 3.3" },
  { from: "mpl-2.0", to: "gpl-3.0", compatible: true, note: "MPL 2.0 Section 3.3" },
  { from: "mpl-2.0", to: "agpl-3.0", compatible: true, note: "MPL 2.0 Section 3.3" },

  // LGPL v3 - can flow into GPL v3+ but not permissive or GPL v2
  { from: "lgpl-3.0", to: "mit", compatible: false },
  { from: "lgpl-3.0", to: "bsd-2-clause", compatible: false },
  { from: "lgpl-3.0", to: "bsd-3-clause", compatible: false },
  { from: "lgpl-3.0", to: "apache-2.0", compatible: false },
  { from: "lgpl-3.0", to: "mpl-2.0", compatible: false },
  { from: "lgpl-3.0", to: "lgpl-3.0", compatible: true },
  { from: "lgpl-3.0", to: "gpl-2.0", compatible: false },
  { from: "lgpl-3.0", to: "gpl-3.0", compatible: true },
  { from: "lgpl-3.0", to: "agpl-3.0", compatible: true },

  // GPL v2 - cannot flow into permissive or GPL v3 (unless "or later")
  { from: "gpl-2.0", to: "mit", compatible: false },
  { from: "gpl-2.0", to: "bsd-2-clause", compatible: false },
  { from: "gpl-2.0", to: "bsd-3-clause", compatible: false },
  { from: "gpl-2.0", to: "apache-2.0", compatible: false },
  { from: "gpl-2.0", to: "mpl-2.0", compatible: false },
  { from: "gpl-2.0", to: "lgpl-3.0", compatible: false },
  { from: "gpl-2.0", to: "gpl-2.0", compatible: true },
  { from: "gpl-2.0", to: "gpl-3.0", compatible: false, note: "Unless 'or later' clause" },
  { from: "gpl-2.0", to: "agpl-3.0", compatible: false, note: "Unless 'or later' clause" },

  // GPL v3 - can flow into AGPL v3 but not anything less restrictive
  { from: "gpl-3.0", to: "mit", compatible: false },
  { from: "gpl-3.0", to: "bsd-2-clause", compatible: false },
  { from: "gpl-3.0", to: "bsd-3-clause", compatible: false },
  { from: "gpl-3.0", to: "apache-2.0", compatible: false },
  { from: "gpl-3.0", to: "mpl-2.0", compatible: false },
  { from: "gpl-3.0", to: "lgpl-3.0", compatible: false },
  { from: "gpl-3.0", to: "gpl-2.0", compatible: false },
  { from: "gpl-3.0", to: "gpl-3.0", compatible: true },
  { from: "gpl-3.0", to: "agpl-3.0", compatible: true },

  // AGPL v3 - cannot flow into anything less restrictive
  { from: "agpl-3.0", to: "mit", compatible: false },
  { from: "agpl-3.0", to: "bsd-2-clause", compatible: false },
  { from: "agpl-3.0", to: "bsd-3-clause", compatible: false },
  { from: "agpl-3.0", to: "apache-2.0", compatible: false },
  { from: "agpl-3.0", to: "mpl-2.0", compatible: false },
  { from: "agpl-3.0", to: "lgpl-3.0", compatible: false },
  { from: "agpl-3.0", to: "gpl-2.0", compatible: false },
  { from: "agpl-3.0", to: "gpl-3.0", compatible: false },
  { from: "agpl-3.0", to: "agpl-3.0", compatible: true },
];

export const compatibilityNotes = [
  "Permissive licenses (MIT, BSD, Apache) can generally flow into copyleft projects, but not the other way around.",
  "GPL v2 is incompatible with Apache 2.0 due to a patent clause conflict. GPL v3 resolved this.",
  "MPL 2.0 has explicit GPL compatibility via Section 3.3, allowing MPL-licensed code to be combined with GPL code.",
  "GPL v2-only code cannot be upgraded to GPL v3 unless the author included an \"or later version\" clause.",
  "Code included from another license retains its original terms. \"Compatible\" means the licenses can coexist in one project, not that code is relicensed.",
];
