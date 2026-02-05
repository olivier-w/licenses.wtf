import { motion } from "motion/react";
import { SectionWrapper } from "./Layout/SectionWrapper";

const SPECTRUM_SEGMENTS = [
  { color: "bg-permissive", label: "Permissive", width: "30%" },
  { color: "bg-copyleft", label: "Copyleft", width: "35%" },
  { color: "bg-restrictive", label: "Restrictive", width: "20%" },
  { color: "bg-source-available", label: "Source Available", width: "15%" },
];

export function Hero() {
  return (
    <SectionWrapper id="hero" className="flex min-h-[85vh] flex-col items-center justify-center text-center lg:min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="font-display text-4xl font-bold leading-tight text-text md:text-6xl lg:text-7xl">
          Open source licenses,
          <br />
          <span className="text-accent">actually explained.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted md:text-xl">
          Stop guessing what MIT, GPL, and Apache mean for your code.
          Understand the spectrum from permissive to copyleft in plain language.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        className="mt-12 w-full max-w-lg"
      >
        <div className="flex h-3 overflow-hidden rounded-full">
          {SPECTRUM_SEGMENTS.map((seg, i) => (
            <motion.div
              key={seg.label}
              className={seg.color}
              style={{ width: seg.width }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.3 + i * 0.08,
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-xs text-text-faint">
          <span>Permissive</span>
          <span>Copyleft</span>
          <span>Restrictive</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-12"
      >
        <a
          href="#licenses"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-accent/90"
        >
          Explore licenses
          <span aria-hidden="true">&darr;</span>
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
