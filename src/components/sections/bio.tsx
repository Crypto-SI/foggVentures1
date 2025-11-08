"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInUp, StaggerContainer } from "./reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BioSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about-kirk-hollingsworth"
      className="py-16 md:py-24 bg-background"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Profile photo with subtle float for consistency with hero */}
          <div className="md:col-span-2 relative order-1">
            <FadeInUp
              as="div"
              distance={26}
              className="relative h-96 md:h-[30rem] w-full rounded-2xl overflow-hidden shadow-xl group"
            >
              {!reduced && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl border border-accent/25 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
              <motion.div
                className="relative h-full w-full"
                initial={
                  reduced ? undefined : { opacity: 0, y: 18 }
                }
                animate={
                  reduced
                    ? undefined
                    : {
                        opacity: 1,
                        y: [0, -4, 0],
                      }
                }
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: 0.7,
                        ease: "easeOut",
                        y: {
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
              >
                <Image
                  src="/images/kirk.jpg"
                  alt="Kirk Hollingsworth"
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="diplomat portrait"
                />
              </motion.div>
            </FadeInUp>
          </div>

          {/* Bio copy with staggered paragraphs */}
          <div className="md:col-span-3 order-2">
            <StaggerContainer
              as="div"
              className="space-y-4"
              delayChildren={0.06}
              staggerChildren={0.05}
            >
              <FadeInUp
                as="h2"
                distance={18}
                className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-2"
              >
                Meet Our Founder
              </FadeInUp>

              <Card className="bg-card shadow-lg">
                <CardContent className="pt-6 space-y-4">
                  <FadeInUp
                    as="p"
                    distance={18}
                    className="text-lg text-card-foreground/90"
                  >
                    Mr. Kirk Hollingsworth is a most distinguished former British
                    diplomat, whose career has been marked by extensive experience in
                    fostering international relations and navigating complex governmental
                    structures with notable sagacity. His tenure is replete with
                    significant achievements in facilitating dialogue and cooperation
                    across diverse cultures and political landscapes.
                  </FadeInUp>
                  <FadeInUp
                    as="p"
                    distance={18}
                    delay={0.04}
                    className="text-lg text-card-foreground/90"
                  >
                    Possessing a profound and granular understanding of Guyana's
                    unique political and economic environment, Mr. Hollingsworth offers
                    unparalleled expertise in bridging the divide between international
                    business objectives and local regulatory frameworks. His discerning
                    insights are demonstrably invaluable for organisations seeking to
                    establish or indeed expand their presence within the jurisdiction of
                    Guyana.
                  </FadeInUp>
                  <FadeInUp
                    as="p"
                    distance={18}
                    delay={0.08}
                    className="text-lg text-card-foreground/90"
                  >
                    Mr. Hollingsworth's professional conduct is built upon an
                    unimpeachable foundation of trust, utmost discretion, and strategic
                    foresight. This ensures that esteemed clients receive meticulously
                    tailored guidance, designed to achieve sustainable and meritorious
                    success within the Guyanese market.
                  </FadeInUp>
                </CardContent>
              </Card>
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
