import Image from 'next/image';
import { Container } from '@/components/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BioSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <Container>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 relative h-96 md:h-[30rem] w-full rounded-lg overflow-hidden shadow-xl group">
             <Image
                src="https://placehold.co/400x500.png"
                alt="Arthur Kingsley - Diplomat Profile"
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="diplomat profile formal"
              />
          </div>
          <div className="md:col-span-3">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-6">
              About Arthur Kingsley
            </h2>
            <Card className="bg-card shadow-lg">
              <CardContent className="pt-6">
                <p className="text-lg text-card-foreground/90 mb-4">
                  Arthur Kingsley is a distinguished former British diplomat with extensive experience fostering international relations and navigating complex governmental structures. His career has been marked by significant achievements in facilitating dialogue and cooperation across diverse cultures and political landscapes.
                </p>
                <p className="text-lg text-card-foreground/90 mb-4">
                  With a deep understanding of Guyana&apos;s unique political and economic environment, Arthur offers unparalleled expertise in bridging the gap between international business objectives and local regulatory frameworks. His insights are invaluable for organizations seeking to establish or expand their presence in Guyana.
                </p>
                <p className="text-lg text-card-foreground/90">
                  Arthur&apos;s approach is built on a foundation of trust, discretion, and strategic foresight, ensuring clients receive tailored guidance to achieve sustainable success in the Guyanese market.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
