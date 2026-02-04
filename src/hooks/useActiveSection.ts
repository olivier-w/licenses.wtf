import { useState, useEffect } from "react";
import type { SectionId } from "../lib/types";

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = [
      "hero",
      "why",
      "spectrum",
      "licenses",
      "comparison",
      "decision",
      "misconceptions",
      "glossary",
    ] as const;

    const visibleSections = new Map<string, number>();

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }
          }

          let maxRatio = 0;
          let topSection: SectionId = "hero";
          for (const [sectionId, ratio] of visibleSections) {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              topSection = sectionId as SectionId;
            }
          }
          if (visibleSections.size > 0) {
            setActiveSection(topSection);
          }
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.5], rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return activeSection;
}
