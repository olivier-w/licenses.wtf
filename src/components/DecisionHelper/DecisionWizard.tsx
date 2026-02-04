import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionWrapper } from "../Layout/SectionWrapper";
import { decisionTree } from "../../data/decisionTree";
import { licenses } from "../../data/licenses";
import { CATEGORY_COLORS } from "../../lib/types";

export function DecisionWizard() {
  const [currentNodeId, setCurrentNodeId] = useState(decisionTree[0].id);
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<{
    licenseIds: string[];
    reasoning: string;
  } | null>(null);

  const currentNode = decisionTree.find((n) => n.id === currentNodeId);

  const handleOptionClick = useCallback(
    (nextNodeId: string | null, resultLicenses?: string[], resultReasoning?: string) => {
      if (nextNodeId) {
        setHistory((prev) => [...prev, currentNodeId]);
        setCurrentNodeId(nextNodeId);
      } else if (resultLicenses) {
        setResult({
          licenseIds: resultLicenses,
          reasoning: resultReasoning ?? "",
        });
      }
    },
    [currentNodeId]
  );

  const handleBack = useCallback(() => {
    if (result) {
      setResult(null);
      return;
    }
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setCurrentNodeId(prev);
    }
  }, [history, result]);

  const handleReset = useCallback(() => {
    setCurrentNodeId(decisionTree[0].id);
    setHistory([]);
    setResult(null);
  }, []);

  const stepNumber = history.length + 1;
  const totalSteps = decisionTree.length;

  return (
    <SectionWrapper id="decision">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Which license should I use?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Answer a few questions and we'll recommend the best license for your
          project.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        <div className="rounded-xl border border-border bg-bg-elevated p-8 shadow-sm">
          {/* Progress */}
          {!result ? (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-text-faint mb-2">
                <span>Step {stepNumber} of ~{totalSteps}</span>
                {history.length > 0 ? (
                  <button
                    onClick={handleBack}
                    className="text-accent hover:underline cursor-pointer bg-transparent border-none text-xs"
                  >
                    &larr; Back
                  </button>
                ) : null}
              </div>
              <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h3 className="font-display text-xl font-semibold text-text">
                  Our recommendation
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {result.reasoning}
                </p>

                <div className="mt-5 space-y-3">
                  {result.licenseIds.map((id) => {
                    const license = licenses.find((l) => l.id === id);
                    if (!license) return null;
                    const colors = CATEGORY_COLORS[license.category];
                    return (
                      <a
                        key={id}
                        href={`#license-${id}`}
                        className="block rounded-lg border border-border p-4 no-underline hover:border-accent/30 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${colors.dot}`} />
                          <span className="font-display font-semibold text-text">
                            {license.name}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                            {license.categoryLabel}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-text-muted">
                          {license.tldr}
                        </p>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleBack}
                    className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-surface transition-colors cursor-pointer bg-transparent min-h-[44px]"
                  >
                    &larr; Go back
                  </button>
                  <button
                    onClick={handleReset}
                    className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors cursor-pointer border-none min-h-[44px]"
                  >
                    Start over
                  </button>
                </div>
              </motion.div>
            ) : currentNode ? (
              <motion.div
                key={currentNode.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h3 className="font-display text-xl font-semibold text-text">
                  {currentNode.question}
                </h3>

                <div className="mt-5 space-y-2.5">
                  {currentNode.options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() =>
                        handleOptionClick(
                          option.nextNodeId,
                          option.resultLicenses,
                          option.resultReasoning
                        )
                      }
                      className="w-full rounded-lg border border-border bg-transparent p-4 text-left cursor-pointer hover:border-accent/40 hover:bg-accent-light/50 transition-colors group min-h-[44px]"
                    >
                      <span className="block text-sm font-medium text-text group-hover:text-accent transition-colors">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs text-text-muted">
                        {option.description}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
