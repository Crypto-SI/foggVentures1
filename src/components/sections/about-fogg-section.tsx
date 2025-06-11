
import { Container } from '@/components/container';
import { Card, CardContent } from '@/components/ui/card';

export function AboutFoggSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            About FOGG Ventures: Driving Success in Guyana
          </h2>
        </div>
        <Card className="bg-card shadow-xl max-w-4xl mx-auto">
          <CardContent className="pt-8 text-lg text-card-foreground/90 space-y-6 leading-relaxed">
            <p>
              At FOGG Ventures, we're not just consultants; we're strategic partners dedicated to unlocking Guyana's vast potential for discerning investors and businesses. Led by former British diplomat Kirk Hollingsworth, we bring unparalleled on-the-ground expertise and a global perspective to navigate Guyana's unique commercial and governmental landscape. Our core mission is simple: to cut through complexity, connect you with the right opportunities, and deliver tangible results that accelerate your growth and ensure your ventures thrive in this dynamic market. We understand what it takes to succeed here, and we're committed to making your objectives a reality.
            </p>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
