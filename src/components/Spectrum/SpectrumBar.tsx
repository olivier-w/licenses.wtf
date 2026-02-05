import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { licenses } from "../../data/licenses";
import { CATEGORY_COLORS, type License } from "../../lib/types";

const EASE_OUT = [0.32, 0.72, 0, 1] as const;
const BUBBLE_SIZE = 28;
const BUBBLE_GAP = 2;
const MIN_DISTANCE = BUBBLE_SIZE + BUBBLE_GAP; // 30px center-to-center

function resolveCollisions(
  sorted: License[],
  containerWidth: number,
): Map<string, number> {
  const result = new Map<string, number>();
  if (containerWidth <= 0 || sorted.length === 0) {
    for (const l of sorted) result.set(l.id, l.spectrumPosition);
    return result;
  }

  // Convert spectrum positions (0-100%) to pixel centers
  const centers = sorted.map((l) => (l.spectrumPosition / 100) * containerWidth);

  // Forward pass: push right to avoid overlaps
  for (let i = 1; i < centers.length; i++) {
    if (centers[i] - centers[i - 1] < MIN_DISTANCE) {
      centers[i] = centers[i - 1] + MIN_DISTANCE;
    }
  }

  // Backward pass: if rightmost exceeds container, pull left
  const maxCenter = containerWidth - BUBBLE_SIZE / 2;
  if (centers[centers.length - 1] > maxCenter) {
    centers[centers.length - 1] = maxCenter;
    for (let i = centers.length - 2; i >= 0; i--) {
      if (centers[i + 1] - centers[i] < MIN_DISTANCE) {
        centers[i] = centers[i + 1] - MIN_DISTANCE;
      }
    }
  }

  // Clamp to valid range and convert back to percentages
  const minCenter = BUBBLE_SIZE / 2;
  for (let i = 0; i < sorted.length; i++) {
    const clamped = Math.max(minCenter, Math.min(maxCenter, centers[i]));
    result.set(sorted[i].id, (clamped / containerWidth) * 100);
  }

  return result;
}

interface SpectrumBarProps {
  onLicenseClick?: (license: License) => void;
}

export function SpectrumBar({ onLicenseClick }: SpectrumBarProps) {
  const [hoveredLicense, setHoveredLicense] = useState<License | null>(null);
  const isTooltipOpen = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sortedLicenses = useMemo(
    () => [...licenses].sort((a, b) => a.spectrumPosition - b.spectrumPosition),
    [],
  );

  const resolvedPositions = useMemo(
    () => resolveCollisions(sortedLicenses, containerWidth),
    [sortedLicenses, containerWidth],
  );

  const handleMouseEnter = useCallback((license: License) => {
    setHoveredLicense(license);
    isTooltipOpen.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredLicense(null);
    isTooltipOpen.current = false;
  }, []);

  return (
    <div className="relative">
      {/* Gradient bar */}
      <div className="relative h-4 rounded-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-permissive) 0%, var(--color-permissive) 25%, var(--color-copyleft) 40%, var(--color-copyleft) 55%, var(--color-restrictive) 70%, var(--color-restrictive) 80%, var(--color-source-available) 90%, var(--color-source-available) 100%)",
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
      <div ref={containerRef} className="relative mt-6 h-10">
        {sortedLicenses.map((license, i) => {
          const colors = CATEGORY_COLORS[license.category];
          const resolvedLeft = resolvedPositions.get(license.id) ?? license.spectrumPosition;
          return (
            <motion.button
              key={license.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, left: `${resolvedLeft}%` }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                duration: 0.2,
                ease: EASE_OUT,
                delay: 0.1 + i * 0.05,
                left: { duration: 0.3, ease: EASE_OUT, delay: 0 },
              }}
              className={`absolute -translate-x-1/2 flex items-center justify-center rounded-full border-2 border-bg-elevated shadow-sm cursor-pointer ${colors.dot}`}
              style={{
                width: 28,
                height: 28,
                top: 0,
              }}
              onMouseEnter={() => handleMouseEnter(license)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleMouseEnter(license)}
              onBlur={handleMouseLeave}
              onClick={() => onLicenseClick?.(license)}
              aria-label={`${license.shortName} - ${license.categoryLabel}`}
            >
              <span className="text-[9px] font-bold text-white leading-none">
                {license.shortName.slice(0, 3)}
              </span>
            </motion.button>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredLicense ? (
            <motion.div
              key={hoveredLicense.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{
                duration: isTooltipOpen.current ? 0.12 : 0.2,
                ease: EASE_OUT,
              }}
              className="absolute rounded-xl border border-border bg-bg-elevated px-4 py-3 shadow-lg z-10 w-72 pointer-events-none"
              style={{
                top: 36,
                left: `clamp(0px, calc(${resolvedPositions.get(hoveredLicense.id) ?? hoveredLicense.spectrumPosition}% - 144px), calc(100% - 288px))`,
              }}
            >
              <p className="text-sm font-semibold text-text">
                {hoveredLicense.name}
              </p>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                {hoveredLicense.summary}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
