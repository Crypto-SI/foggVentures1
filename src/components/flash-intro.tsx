"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motionDurations, motionEasings } from "@/lib/animation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * FlashIntro
 *
 * A full-screen, one-time intro animation for the FOGG Ventures site.
 *
 * Design goals:
 * - Luxurious, confident "flash" that feels like a brand reveal, not a cheap splash screen.
 * - Uses navy + gold palette with a subtle light sweep and logo lockup.
 * - Runs only on the first load per tab (sessionStorage flag).
 * - Respects prefers-reduced-motion (instant fade, no intense flash).
 * - Fully covers underlying site with a rich gradient so content is not visible until intro completes.
 * - Non-blocking for layout hydration and logic: underlying app mounts, but visually hidden behind the overlay.
 *
 * Usage:
 * - Imported and rendered in RootLayout so it wraps all pages.
 */

const INTRO_SESSION_KEY = "fogg_intro_shown";

export function FlashIntro() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user preference: disable if reduced motion is requested.
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    // Only show once per tab session.
    const alreadyShown = window.sessionStorage.getItem(INTRO_SESSION_KEY);
    if (alreadyShown) {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    setVisible(true);
  }, [reducedMotion]);

  const duration = 3.6; // extended for a slower, more premium reveal
  const easing = motionEasings.entrance;

  const handleComplete = () => {
    setVisible(false);
  };

  // Render synchronously when `visible` is true so the site is never shown before the intro.
  // While `visible` is true, the overlay is fully opaque and sits above all content.
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // Full-screen branded gradient; completely hides site until animation finishes
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#ffffff22,_transparent),linear-gradient(to_bottom_right,_#020817,_#041425,_#0b2540)] text-primary-foreground"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: motionEasings.exit,
            delay: duration - 0.5,
          }}
          onAnimationComplete={handleComplete}
        >
          {/* Gold flash background pulse */}
          <motion.div
            className="absolute inset-[-15%] bg-[radial-gradient(circle_at_center,_#d4af3733,_transparent)] mix-blend-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 0.35], scale: [0.9, 1.03, 1] }}
            transition={{
              duration,
              ease: easing,
            }}
          />

          {/* Vertical light sweep */}
          <motion.div
            className="absolute top-0 bottom-0 w-[18%] bg-gradient-to-r from-transparent via-[#ffffffdd] to-transparent blur-3xl"
            initial={{ x: "-40%", opacity: 0 }}
            animate={{ x: ["-40%", "35%", "85%"], opacity: [0, 1, 0] }}
            transition={{
              duration,
              ease: "easeInOut",
            }}
          />

          {/* Central logo / wordmark lockup */}
          <div className="relative flex flex-col items-center gap-2">
            <motion.div
              className="flex items-center gap-3"
              initial={{
                opacity: 0,
                letterSpacing: "0.4em",
                y: 10,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                letterSpacing: "0.18em",
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: motionDurations.revealSlow,
                ease: easing,
              }}
            >
              {/* Replace with official logo mark if available */}
              <motion.div
                className="h-8 w-8 rounded-full border border-[#d4af37] flex items-center justify-center text-[0.6rem] tracking-[0.16em] text-[#d4af37]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.38, ease: easing }}
              >
                FV
              </motion.div>
              <span className="text-[0.75rem] uppercase tracking-[0.26em] text-[#e5e7eb]">
                FOGG VENTURES
              </span>
            </motion.div>

            <motion.div
              className="h-px w-28 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 0.42,
                ease: easing,
                delay: 0.12,
              }}
            />

            <motion.div
              className="relative text-[0.55rem] tracking-[0.18em] uppercase text-[#e5e7eb]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: 0.16,
              }}
            >
              <span className="relative inline-block">
                STRATEGIC ADVISORY · GUYANA
                {/* Shimmer overlay */}
                <motion.span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#facc15cc] to-transparent"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{
                    x: ["-120%", "40%", "120%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.8,
                  }}
                />
              </span>
            </motion.div>
          </div>

          {/* Dark vignette to keep content hidden at edges */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_#020817f0)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}