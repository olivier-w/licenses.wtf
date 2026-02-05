import { SectionWrapper } from "../Layout/SectionWrapper";
import { SpectrumBar } from "./SpectrumBar";
import type { License } from "../../lib/types";

export function SpectrumSection() {
  const handleLicenseClick = (license: License) => {
    const element = document.getElementById(`license-${license.id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <SectionWrapper id="spectrum">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          The license spectrum
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Licenses exist on a spectrum from maximally permissive (do almost
          anything) to strongly protective (share your changes). Hover over each
          dot to learn more, or click to jump to the full details.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-bg-elevated p-8 shadow-sm">
        <SpectrumBar onLicenseClick={handleLicenseClick} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {[
          {
            color: "bg-permissive",
            label: "Public Domain",
            desc: "No copyright. Use for any purpose with no conditions.",
          },
          {
            color: "bg-permissive",
            label: "Permissive",
            desc: "Use it however you want. Just keep the copyright notice.",
          },
          {
            color: "bg-copyleft",
            label: "Copyleft",
            desc: "Share modifications under the same license terms.",
          },
          {
            color: "bg-restrictive",
            label: "Strong Copyleft",
            desc: "Entire derivative works must use the same license.",
          },
          {
            color: "bg-source-available",
            label: "Source Available",
            desc: "Source is visible but usage may be restricted.",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${item.color}`} />
            <div>
              <p className="text-sm font-medium text-text">{item.label}</p>
              <p className="mt-0.5 text-xs text-text-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-text-faint leading-relaxed text-center max-w-2xl mx-auto">
        Note: This spectrum simplifies a complex landscape. Copyleft licenses
        restrict how you distribute code, while source-available licenses
        restrict what you can do with it. These are different kinds of
        requirements.
      </p>
    </SectionWrapper>
  );
}
