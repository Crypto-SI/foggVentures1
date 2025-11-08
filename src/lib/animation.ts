import { MotionProps, Transition } from "framer-motion";

/**
 * Centralized motion tokens for the site.
 * These values should be the single source of truth for timings and easings.
 */

export const motionDurations = {
  microFast: 0.16, // ultra-brief feedback
  micro: 0.2, // standard micro-interaction (hover, tap)
  quick: 0.28, // small element transitions
  base: 0.32, // default for most UI transitions
  reveal: 0.6, // section / hero reveals
  revealSlow: 0.8, // large hero / background elements
} as const;

export const motionDelays = {
  none: 0,
  xxs: 0.04,
  xs: 0.08,
  sm: 0.12,
  md: 0.18,
} as const;

export const motionStagger = {
  tight: 0.04,
  normal: 0.06,
  relaxed: 0.08,
} as const;

export const motionEasings = {
  standard: [0.22, 0.61, 0.36, 1],
  entrance: [0.19, 1, 0.22, 1],
  exit: [0.4, 0, 1, 1],
  softSpring: [0.16, 1, 0.3, 1],
} as const;

/**
 * Common transition presets
 */

export const transitions = {
  micro: {
    duration: motionDurations.micro,
    ease: motionEasings.standard,
  } as Transition,
  microSoft: {
    duration: motionDurations.micro,
    ease: motionEasings.softSpring,
  } as Transition,
  reveal: {
    duration: motionDurations.reveal,
    ease: motionEasings.entrance,
  } as Transition,
  revealSlow: {
    duration: motionDurations.revealSlow,
    ease: motionEasings.entrance,
  } as Transition,
};

/**
 * Variants
 * Keep these generic; section-specific variants can compose/extend them.
 */

export const fadeInUp = (
  distance: number = 16,
  delay: number = motionDelays.none,
  duration: number = motionDurations.reveal,
): MotionProps["variants"] => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.reveal,
      duration,
      delay,
    },
  },
});

export const fadeIn = (
  delay: number = motionDelays.none,
  duration: number = motionDurations.reveal,
): MotionProps["variants"] => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ...transitions.reveal,
      duration,
      delay,
    },
  },
});

export const scaleIn = (
  delay: number = motionDelays.none,
  duration: number = motionDurations.reveal,
  from: number = 0.96,
): MotionProps["variants"] => ({
  hidden: { opacity: 0, scale: from },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...transitions.reveal,
      duration,
      delay,
    },
  },
});

/**
 * Reduced motion helpers
 */

export const isBrowser = typeof window !== "undefined";

export const prefersReducedMotion = (): boolean => {
  if (!isBrowser) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

/**
 * Conditionally return motion props based on reduced motion preference.
 * Usage: spread this into a `motion.*` component.
 */
export const withReducedMotion = (
  enabledProps: MotionProps,
  fallbackProps: MotionProps = {},
): MotionProps => {
  if (prefersReducedMotion()) {
    return {
      ...fallbackProps,
      transition: {
        duration: 0,
      },
    };
  }
  return enabledProps;
};