import { useState } from "react";
import { motion } from "motion/react";
import { licenses } from "../../data/licenses";
import { CATEGORY_COLORS, type License } from "../../lib/types";

interface SpectrumBarProps {
  onLicenseClick?: (license: License) => void;
}

export function SpectrumBar({ onLicenseClick }: SpectrumBarProps) {
  const [hoveredLicense, setHoveredLicense] = useState<License | null>(null);

  return (
    <div className="relative">
      {/* Gradient bar */}
      <div className="relative h-4 rounded-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #059669 0%, #059669 25%, #D97706 40%, #D97706 55%, #DC2626 70%, #DC2626 80%, #7C3AED 90%, #7C3AED 100%)",
          }}
        />
      </div>

      {/* Labels */}
      <div className="mt-2 flex justify-between text-xs text-text-faint px-1">
        <span>Public Domain</span>
        <span>Permissive</span>
        <span>Weak Copyleft</span>
        <span>Strong Copyleft</span>
        <span>Source Available</span>
      </div>

      {/* License dots */}
      <div className="relative mt-6 h-10">
        {licenses.map((license, i) => {
          const colors = CATEGORY_COLORS[license.category];
          return (
            <motion.button
              key={license.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.1 + i * 0.05,
              }}
              className={`absolute -translate-x-1/2 flex items-center justify-center rounded-full border-2 border-bg-elevated shadow-sm cursor-pointer ${colors.dot}`}
              style={{
                left: `${license.spectrumPosition}%`,
                width: 28,
                height: 28,
                top: 0,
              }}
              onMouseEnter={() => setHoveredLicense(license)}
              onMouseLeave={() => setHoveredLicense(null)}
              onFocus={() => setHoveredLicense(license)}
              onBlur={() => setHoveredLicense(null)}
              onClick={() => onLicenseClick?.(license)}
              aria-label={`${license.shortName} - ${license.categoryLabel}`}
            >
              <span className="text-[9px] font-bold text-white leading-none">
                {license.shortName.slice(0, 3)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredLicense ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-bg-elevated px-4 py-3 shadow-lg z-10 w-72"
        >
          <p className="text-sm font-semibold text-text">{hoveredLicense.name}</p>
          <p className="mt-1 text-xs text-text-muted leading-relaxed">
            {hoveredLicense.summary}
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}
