
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/container';

export function HeroSection() {
  return (
    <section id="hero" className="relative py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <Container className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              FOGG Ventures
            </h1>
            <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-primary-foreground/80">
              Expert Navigation in Guyana&apos;s Governmental and Business Landscape.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform hover:scale-105">
                <Link href="/#services">Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 shadow-lg transition-transform hover:scale-105">
                <Link href="/ai-assistant">Try AI Assistant</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto md:ml-auto md-mr-0 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center border-2 border-accent/20 bg-primary-foreground/5">
            <Image
              src="/images/fogg.png"
              alt="FOGG Ventures Logo"
              layout="fill"
              objectFit="contain"
              className="p-3"
            />
          </div>
        </div>
      </Container>
      {/* Optional: Subtle background pattern or element */}
      <div aria-hidden="true" className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Could be an SVG pattern or a very faint image */}
      </div>
    </section>
  );
}
