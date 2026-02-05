import { useCallback, useMemo, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const mediaQuery = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia(query) : null),
    [query],
  );

  const subscribe = useCallback(
    (callback: () => void) => {
      mediaQuery?.addEventListener("change", callback);
      return () => mediaQuery?.removeEventListener("change", callback);
    },
    [mediaQuery],
  );

  const getSnapshot = useCallback(() => mediaQuery?.matches ?? false, [mediaQuery]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
