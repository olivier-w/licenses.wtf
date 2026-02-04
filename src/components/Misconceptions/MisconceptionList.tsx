import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionWrapper } from "../Layout/SectionWrapper";
import { misconceptions } from "../../data/misconceptions";

function MisconceptionCard({ myth, reality, id }: { myth: string; reality: string; id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-bg-elevated shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`misconception-${id}`}
        className="w-full cursor-pointer p-5 text-left bg-transparent border-none flex items-start justify-between gap-4 min-h-[44px]"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${
              isOpen
                ? "bg-permissive-light text-permissive"
                : "bg-restrictive-light text-restrictive"
            } transition-colors`}
          >
            {isOpen ? "FACT" : "MYTH"}
          </span>
          <span className="text-sm font-medium text-text">{myth}</span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`flex-shrink-0 text-text-faint transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id={`misconception-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border bg-permissive-light/50 px-5 py-4">
              <p className="text-sm text-text-muted leading-relaxed m-0 pl-9">
                {reality}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function MisconceptionList() {
  return (
    <SectionWrapper id="misconceptions">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
          Common misconceptions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Even experienced developers get these wrong. Click each myth to reveal
          the reality.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {misconceptions.map((item) => (
          <MisconceptionCard
            key={item.id}
            id={item.id}
            myth={item.myth}
            reality={item.reality}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
