
import { Container } from '@/components/container';
import { Card, CardContent } from '@/components/ui/card';

export function AboutFoggSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Guyana is Open for Business
          </h2>
        </div>
        <Card className="bg-card shadow-xl max-w-4xl mx-auto">
          <CardContent className="pt-8 text-lg text-card-foreground/90 space-y-6 leading-relaxed">
            <p>
              The message is clear: Guyana is booming, and the opportunities are immense across multiple sectors. From energy and natural resources to infrastructure, agriculture, and tourism, this nation is on an unprecedented growth trajectory. But navigating new frontiers requires local insight and strategic connections. That's where FOGG Ventures steps in. We provide the critical intelligence, high-level access, and on-the-ground support your business needs to not just enter, but to truly capitalize on Guyana's dynamic market. We cut through the noise, identify the real opportunities, and help you make the moves that matter for success.
            </p>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
