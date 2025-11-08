"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe hook for respecting user reduced motion preferences.
 * Prefer this over direct matchMedia checks in components.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    try {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      const update = () => setReduced(mediaQuery.matches);
      update();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", update);
      } else if (typeof mediaQuery.addListener === "function") {
        // Safari / older browsers fallback
        mediaQuery.addListener(update);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", update);
        } else if (typeof mediaQuery.removeListener === "function") {
          mediaQuery.removeListener(update);
        }
      };
    } catch {
      setReduced(false);
    }
  }, []);

  return reduced;
}