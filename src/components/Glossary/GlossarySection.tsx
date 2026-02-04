import { SectionWrapper } from "../Layout/SectionWrapper";
import { glossaryTerms } from "../../data/glossary";

export function GlossarySection() {
  const sorted = [...glossaryTerms].sort((a, b) =>
    a.term.localeCompare(b.term)
  );

  return (
    <SectionWrapper id="glossary">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Glossary
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Key terms you'll encounter when working with open source licenses.
        </p>
      </div>

      <div className="mt-10">
        <dl className="grid gap-4 md:grid-cols-2">
          {sorted.map((term) => (
            <div
              key={term.id}
              className="rounded-xl border border-border bg-bg-elevated p-5 shadow-sm"
            >
              <dt className="font-display text-sm font-semibold text-text">
                {term.term}
              </dt>
              <dd className="mt-2 text-sm text-text-muted leading-relaxed m-0">
                {term.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionWrapper>
  );
}
