import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionWrapper } from "../Layout/SectionWrapper";
import { misconceptions } from "../../data/misconceptions";
import { CheckIcon, XIcon } from "../UI/Icon";
import { cn } from "../../lib/cn";
import type { Misconception } from "../../lib/types";

const EASE = [0.32, 0.72, 0, 1] as const;

function QuizCard({
  item,
  index,
  answer,
  onAnswer,
}: {
  item: Misconception;
  index: number;
  answer: boolean | undefined;
  onAnswer: (id: string, userSaidTrue: boolean) => void;
}) {
  const answered = answer !== undefined;
  const correct = answered && answer === item.isTrue;

  return (
    <div
      className={cn(
        "rounded-xl border bg-bg-elevated shadow-sm overflow-hidden transition-colors duration-200",
        answered
          ? correct
            ? "border-permissive/40"
            : "border-restrictive/40"
          : "border-border"
      )}
    >
      <div className="p-5">
        {/* Number + Statement */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-text-faint font-mono">
            #{index + 1}
          </span>
          <p className="text-sm font-medium text-text m-0">{item.myth}</p>
        </div>

        {/* Buttons / Result */}
        <div className="mt-4 pl-9">
          <AnimatePresence mode="wait">
            {!answered ? (
              <motion.div
                key="buttons"
                className="flex gap-3"
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 4,
                  transition: { duration: 0.15, ease: EASE },
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAnswer(item.id, true)}
                  className="min-h-[44px] flex-1 cursor-pointer rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-colors hover:border-permissive/50 hover:bg-permissive-light"
                >
                  True
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAnswer(item.id, false)}
                  className="min-h-[44px] flex-1 cursor-pointer rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-colors hover:border-restrictive/50 hover:bg-restrictive-light"
                >
                  False
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE, delay: 0.1 }}
              >
                <div className="flex items-center gap-2" role="status">
                  {correct ? (
                    <>
                      <CheckIcon size={18} />
                      <span className="text-sm font-semibold text-permissive">
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <XIcon size={18} />
                      <span className="text-sm font-semibold text-restrictive">
                        Not quite
                      </span>
                    </>
                  )}
                  <span
                    className={cn(
                      "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                      item.isTrue
                        ? "bg-permissive-light text-permissive"
                        : "bg-restrictive-light text-restrictive"
                    )}
                  >
                    {item.isTrue ? "TRUE" : "FALSE"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "border-t px-5 py-4",
                correct
                  ? "border-permissive/20 bg-permissive-light/50"
                  : "border-restrictive/20 bg-restrictive-light/50"
              )}
            >
              <p className="text-sm text-text-muted leading-relaxed m-0 pl-9">
                {item.reality}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function MisconceptionList() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = useMemo(
    () =>
      misconceptions.filter(
        (m) => answers[m.id] !== undefined && answers[m.id] === m.isTrue
      ).length,
    [answers]
  );
  const allAnswered = totalAnswered === misconceptions.length;

  const handleAnswer = (id: string, userSaidTrue: boolean) => {
    setAnswers((prev) => {
      if (prev[id] !== undefined) return prev;
      return { ...prev, [id]: userSaidTrue };
    });
  };

  const handleReset = () => {
    setAnswers({});
  };

  const scoreMessage =
    totalCorrect === misconceptions.length
      ? "Perfect score! You really know your licensing."
      : totalCorrect >= misconceptions.length * 0.75
        ? "Great job! You know more than most developers."
        : totalCorrect >= misconceptions.length * 0.5
          ? "Not bad! But there are some common traps to watch for."
          : "Lots of these are tricky — now you know the real answers.";

  return (
    <SectionWrapper id="misconceptions">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Common misconceptions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Think you know your licensing facts? Test yourself — decide if each
          statement is true or false.
        </p>
      </div>

      {/* Score Bar */}
      <AnimatePresence>
        {totalAnswered > 0 ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-border bg-bg-elevated p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-text-faint mb-2">
                <span className="font-medium">
                  {totalCorrect}/{totalAnswered} correct
                </span>
                <span>
                  {totalAnswered} of {misconceptions.length} answered
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(totalAnswered / misconceptions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </div>
            </div>
            {/* Screen reader announcement */}
            <div className="sr-only" aria-live="polite">
              {totalCorrect} out of {totalAnswered} correct. {totalAnswered} of{" "}
              {misconceptions.length} questions answered.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Quiz Cards */}
      <div className="mt-10 space-y-3">
        {misconceptions.map((item, i) => (
          <QuizCard
            key={item.id}
            item={item}
            index={i}
            answer={answers[item.id]}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      {/* Summary */}
      <AnimatePresence>
        {allAnswered ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.15 }}
            className="mx-auto mt-8 max-w-2xl rounded-xl border border-accent/30 bg-accent-light p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-display font-bold text-text m-0">
              {totalCorrect}/{misconceptions.length}
            </p>
            <p className="mt-2 text-sm text-text-muted m-0">{scoreMessage}</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleReset}
              className="mt-4 cursor-pointer rounded-lg border border-accent/30 bg-transparent px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10 min-h-[44px]"
            >
              Try again
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  );
}
