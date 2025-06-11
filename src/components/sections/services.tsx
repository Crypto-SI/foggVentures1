import { Container } from '@/components/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Briefcase, Users, ShieldCheck, Handshake, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const servicesList: Service[] = [
  {
    icon: Scale,
    title: 'Regulatory Guidance',
    description: 'Navigate Guyana\'s complex regulatory landscape with expert advice and strategic compliance planning.',
  },
  {
    icon: Briefcase,
    title: 'Market Entry Strategy',
    description: 'Develop and implement effective market entry strategies tailored to Guyana\'s unique business environment.',
  },
  {
    icon: Users,
    title: 'Government Relations',
    description: 'Build and maintain constructive relationships with key government stakeholders and agencies.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment & Mitigation',
    description: 'Identify potential risks and develop robust mitigation strategies to protect your investments.',
  },
  {
    icon: Handshake,
    title: 'Stakeholder Engagement',
    description: 'Foster positive engagement with local communities, industry partners, and other key stakeholders.',
  },
  {
    icon: ArrowRight, // Using ArrowRight as a generic "more" icon.
    title: 'Custom Solutions',
    description: 'Tailored consultancy services to address your specific challenges and opportunities in Guyana.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Our Consultancy Services
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            Leveraging deep diplomatic experience and local expertise to provide strategic guidance for success in Guyana.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <Card key={service.title} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex-row items-center gap-4 pb-4">
                <service.icon className="h-10 w-10 text-accent" />
                <CardTitle className="text-xl font-semibold text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-card-foreground/90">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button variant="link" asChild className="text-accent p-0 h-auto hover:text-accent/80">
                    <Link href="#contact">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                 </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
