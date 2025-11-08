"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { FadeInUp, StaggerContainer } from "./reveal";
import { transitions } from "@/lib/animation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const heroParticles = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  delay: i * 0.6,
}));

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden"
    >
      {/* Animated gradient / noise background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
      >
        <div className="absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),_transparent_55%)] animate-[gradientShift_18s_ease-in-out_infinite]" />
      </div>

      {/* Soft accent particles */}
      {!reduced &&
        heroParticles.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden="true"
            className="pointer-events-none absolute w-2 h-2 rounded-full bg-accent/40 shadow-[0_0_18px_rgba(56,189,248,0.65)]"
            style={{
              top: `${10 + p.id * 8}%`,
              left: `${20 + (p.id % 4) * 15}%`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: [0.1, 0.6, 0.15],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6 + p.id,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      <Container className="relative z-10">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Headline and copy */}
          <div className="text-center md:text-left space-y-2">
            <StaggerContainer
              as="div"
              className="space-y-4"
              delayChildren={0.08}
              staggerChildren={0.06}
            >
              <FadeInUp
                as="h1"
                className="font-headline text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              >
                FOGG Ventures
              </FadeInUp>
              <FadeInUp
                as="p"
                delay={0.08}
                className="mt-2 text-base sm:text-xl lg:text-2xl text-primary-foreground/80"
              >
                Expert Navigation in Guyana's Governmental and Business
                Landscape.
              </FadeInUp>
            </StaggerContainer>

            {/* CTAs: reveal after text, hover/press motion */}
            <FadeInUp
              as="div"
              delay={0.18}
              className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <motion.div
                whileHover={
                  !reduced ? { y: -2, scale: 1.03 } : {}
                }
                whileTap={
                  !reduced ? { scale: 0.97 } : {}
                }
                transition={transitions.micro}
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                >
                  <Link href="/#services">Our Services</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={
                  !reduced ? { y: -2, scale: 1.03 } : {}
                }
                whileTap={
                  !reduced ? { scale: 0.97 } : {}
                }
                transition={transitions.micro}
              >
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-accent text-accent hover:bg-accent/10 shadow-lg"
                >
                  <Link href="/ai-assistant">Try AI Assistant</Link>
                </Button>
              </motion.div>
            </FadeInUp>
          </div>

          {/* Right: Portrait / logo block */}
          <div className="relative flex items-center justify-center">
            {/* Rotating accent ring */}
            {!reduced && (
              <motion.div
                aria-hidden="true"
                className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-accent/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.9, scale: 1, rotate: 360 }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            {/* Floating logo card */}
            <motion.div
              className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto md:ml-auto rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-accent/25 bg-primary-foreground/5 backdrop-blur-sm"
              initial={
                reduced
                  ? undefined
                  : { opacity: 0, y: 24, scale: 0.96 }
              }
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: 1,
                      y: [0, -6, 0],
                      scale: 1,
                    }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 0.7,
                      ease: "easeOut",
                      y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              whileHover={
                reduced
                  ? undefined
                  : {
                      boxShadow:
                        "0 18px 55px rgba(56,189,248,0.23)",
                      borderColor: "rgba(56,189,248,0.55)",
                    }
              }
            >
              <Image
                src="/images/fogg.png"
                alt="FOGG Ventures Logo"
                fill
                className="p-4 object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs text-primary-foreground/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transitions.reveal}
        >
          <span className="mb-1 tracking-[0.18em] uppercase text-[0.62rem]">
            Scroll to explore
          </span>
          <motion.div
            className="w-[1px] h-6 bg-primary-foreground/30 overflow-hidden relative"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="absolute inset-x-0 top-0 h-2 bg-accent"
              animate={{ y: ["0%", "120%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
