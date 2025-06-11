
import Image from 'next/image';
import { Container } from '@/components/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BioSection() {
  return (
    <section id="about-kirk-hollingsworth" className="py-16 md:py-24 bg-background">
      <Container>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 relative h-96 md:h-[30rem] w-full rounded-lg overflow-hidden shadow-xl group">
             <Image
                src="/images/kirk.jpg"
                alt="Kirk Hollingsworth"
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="diplomat portrait"
              />
          </div>
          <div className="md:col-span-3">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-6">
              Concerning Mr. Kirk Hollingsworth
            </h2>
            <Card className="bg-card shadow-lg">
              <CardContent className="pt-6">
                <p className="text-lg text-card-foreground/90 mb-4">
                  Mr. Kirk Hollingsworth is a most distinguished former British diplomat, whose career has been marked by extensive experience in fostering international relations and navigating complex governmental structures with notable sagacity. His tenure is replete with significant achievements in facilitating dialogue and cooperation across diverse cultures and political landscapes.
                </p>
                <p className="text-lg text-card-foreground/90 mb-4">
                  Possessing a profound and granular understanding of Guyana&apos;s unique political and economic environment, Mr. Hollingsworth offers unparalleled expertise in bridging the divide between international business objectives and local regulatory frameworks. His discerning insights are demonstrably invaluable for organisations seeking to establish or indeed expand their presence within the jurisdiction of Guyana.
                </p>
                <p className="text-lg text-card-foreground/90">
                  Mr. Hollingsworth&apos;s professional conduct is built upon an unimpeachable foundation of trust, utmost discretion, and strategic foresight. This ensures that esteemed clients receive meticulously tailored guidance, designed to achieve sustainable and meritorious success within the Guyanese market.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
