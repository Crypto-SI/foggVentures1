"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  motionStagger,
  motionDurations,
} from "@/lib/animation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealProps = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
};

export function FadeIn({ as = "div", children, delay = 0, className, once = true }: RevealProps) {
  const Component = motion[as as keyof typeof motion] as any;
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <Component
      ref={ref}
      variants={fadeIn(delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Component>
  );
}

export function FadeInUp({
  as = "div",
  children,
  delay = 0,
  distance = 24,
  className,
  once = true,
}: RevealProps) {
  const Component = motion[as as keyof typeof motion] as any;
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <Component
      ref={ref}
      variants={fadeInUp(distance, delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
};

/**
 * StaggerContainer:
 * Wraps multiple motion children and reveals them with a stagger when in view.
 * Children should define their own variants or rely on inherited ones.
 */
export function StaggerContainer({
  as = "div",
  children,
  className,
  delayChildren = motionDurations.micro,
  staggerChildren = motionStagger.normal,
  once = true,
}: StaggerProps) {
  const Component = motion[as as keyof typeof motion] as any;
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}