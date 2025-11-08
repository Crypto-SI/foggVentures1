
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInUp } from "./reveal";

export function AboutFoggSection() {
  return (
    <section
      id="about"
      className="relative py-14 sm:py-16 md:py-24 bg-secondary overflow-hidden"
    >
      {/* Subtle depth / parallax background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.16),_transparent_65%)] opacity-70"
      />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-3">
          <FadeInUp
            as="h2"
            distance={18}
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
          >
            Guyana is Open for Business
          </FadeInUp>
        </div>

        <FadeInUp
          as="div"
          distance={26}
          delay={0.06}
          className="max-w-4xl mx-auto px-3"
        >
          <Card className="bg-card/95 backdrop-blur-sm shadow-xl">
            <CardContent className="pt-6 sm:pt-8 text-base sm:text-lg text-card-foreground/90 space-y-4 sm:space-y-6 leading-relaxed">
              <p className="relative">
                <span className="relative z-10">
                  The message is clear: Guyana is booming, and the opportunities are
                  immense across multiple sectors. From energy and natural resources to
                  infrastructure, agriculture, and tourism, this nation is on an
                  unprecedented growth trajectory. But navigating new frontiers requires
                  local insight and strategic connections. That's where FOGG
                  Ventures steps in. We provide the critical intelligence, high-level
                  access, and on-the-ground support your business needs to not just enter,
                  but to truly capitalize on Guyana's dynamic market. We cut through
                  the noise, identify the real opportunities, and help you make the moves
                  that matter for success.
                </span>
                {/* Underline sweep for emphasis on key phrase */}
                <span className="pointer-events-none absolute left-0 bottom-2 h-[5px] w-24 bg-accent/40 rounded-full blur-[2px]" />
              </p>
            </CardContent>
          </Card>
        </FadeInUp>
      </Container>
    </section>
  );
}
