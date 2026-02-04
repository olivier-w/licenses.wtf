import { SectionWrapper } from "./Layout/SectionWrapper";

const STEPS = [
  {
    title: "Add a LICENSE file",
    description:
      "Place the full license text in a file named LICENSE (or LICENSE.txt, LICENSE.md) at the root of your repository. This is the standard location that tools, registries, and developers look for.",
    example: "my-project/\n├── LICENSE\n├── README.md\n├── package.json\n└── src/",
  },
  {
    title: "Use SPDX identifiers in package manifests",
    description:
      'Set the license field in your package manifest using the standard SPDX identifier. This enables automated license scanning and compliance tools.',
    example:
      '// package.json\n{ "license": "MIT" }\n\n# Cargo.toml\n[package]\nlicense = "Apache-2.0"\n\n# pyproject.toml\n[project]\nlicense = "GPL-3.0-only"',
  },
  {
    title: "Add per-file headers (if required)",
    description:
      "Some licenses require or recommend a copyright and license notice at the top of each source file. Apache 2.0, GPL, and MPL 2.0 all recommend per-file headers. MIT and BSD do not require them.",
    example:
      '// SPDX-License-Identifier: Apache-2.0\n// Copyright 2024 Your Name\n//\n// Licensed under the Apache License, Version 2.0',
  },
  {
    title: 'Understand the "or later" convention',
    description:
      'GPL licenses can be applied as "GPL-2.0-only" (exactly version 2) or "GPL-2.0-or-later" (version 2 or any later version). This distinction matters: "or later" allows downstream users to upgrade to GPL v3, while "only" restricts them to the exact version you chose.',
    example:
      "GPL-2.0-only    → Must stay GPL v2\nGPL-2.0-or-later → Can use GPL v2, v3, or future versions",
  },
  {
    title: "Audit your dependencies' licenses",
    description:
      "Before releasing your project, check what licenses your dependencies use. Incompatible licenses in your dependency tree can create legal risk. Use automated tools to scan your project and flag potential conflicts.",
    example:
      "# JavaScript/Node.js\nnpx license-checker --summary\n\n# Rust\ncargo deny check licenses\n\n# Multi-language / Enterprise\n# FOSSA, Snyk, or OSS Review Toolkit",
  },
  {
    title: "Understand when obligations trigger",
    description:
      "Most open source license obligations only apply when you distribute the software — sharing copies, publishing downloads, or shipping products. Internal use within your organization generally doesn't trigger copyleft requirements. The major exception is the AGPL, which treats providing software over a network as distribution. Know whether you're distributing, and you'll know which obligations apply.",
    example:
      "Internal use only      → Most obligations don't apply\nDistributing binaries   → Must comply with license terms\nOffering as a service   → AGPL obligations apply\nUsing as a dependency   → Check if you're distributing",
  },
];

export function HowToApply() {
  return (
    <SectionWrapper id="how-to-apply">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          How to apply a license
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Choosing a license is step one. Here's how to correctly apply it to your project.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-border bg-bg-elevated p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-surface p-3 text-xs text-text-muted font-mono leading-relaxed">
                  {step.example}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
