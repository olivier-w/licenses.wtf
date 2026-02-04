import { SectionWrapper } from "./Layout/SectionWrapper";

const REASONS = [
  {
    title: "No license = all rights reserved",
    description:
      "Without a license, default copyright law applies. Nobody can copy, modify, or distribute your code — even if it's public on GitHub.",
  },
  {
    title: "Protect yourself from liability",
    description:
      "Every major open source license includes liability and warranty disclaimers. Without one, you could theoretically be held responsible for bugs.",
  },
  {
    title: "Set clear expectations",
    description:
      "A license tells contributors and users exactly what they can and can't do. No ambiguity, no awkward conversations.",
  },
  {
    title: "Enable collaboration",
    description:
      "Companies and developers often can't legally use unlicensed code. A clear license removes friction and invites contribution.",
  },
];

export function WhyLicenses() {
  return (
    <SectionWrapper id="why">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Why licenses matter
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          "I'll just put it on GitHub" isn't a licensing strategy. Here's why
          choosing the right license is one of the most important decisions you'll
          make for your project.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="rounded-xl border border-border bg-bg-elevated p-6 shadow-sm"
          >
            <h3 className="font-display text-lg font-semibold text-text">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-copyleft/30 bg-copyleft-light p-5">
        <p className="text-sm text-copyleft">
          <span className="font-semibold">Real-world example:</span> In 2023,
          HashiCorp changed Terraform's license from the open-source MPL 2.0 to
          the source-available BSL 1.1. Because the MPL license allowed it, the
          community legally forked the project as OpenTofu. Understanding your
          license choice means understanding what happens when the rules change.
        </p>
      </div>
    </SectionWrapper>
  );
}
