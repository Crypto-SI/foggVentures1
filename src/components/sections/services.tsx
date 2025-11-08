
import { Container } from '@/components/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Briefcase, Users, ShieldCheck, Handshake, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../ui/dialog';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const servicesList: (Service & { details: string })[] = [
  {
    icon: Scale,
    title: 'Regulatory Guidance',
    description:
      "Navigate Guyana's complex regulatory landscape with expert advice and strategic compliance planning.",
    details:
      'We provide end-to-end regulatory support, including licensing, permits, sector-specific approvals, environmental and local content compliance, and alignment with evolving policies and legislative frameworks. Our team monitors regulatory changes and engages proactively with authorities to help you avoid delays, manage obligations, and maintain full compliance throughout the lifecycle of your operations.',
  },
  {
    icon: Briefcase,
    title: 'Market Entry Strategy',
    description:
      "Develop and implement effective market entry strategies tailored to Guyana's unique business environment.",
    details:
      'We design data-driven market entry strategies that reflect Guyana’s political, economic, and social realities. Services include opportunity mapping, competitor and partner analysis, entry models (JV, PPP, local partnerships), localization strategy, and execution roadmaps to ensure a confident and well-structured launch in the Guyanese market.',
  },
  {
    icon: Users,
    title: 'Government Relations',
    description:
      'Build and maintain constructive relationships with key government stakeholders and agencies.',
    details:
      'We help you engage effectively with ministries, regulators, and state agencies through informed, transparent, and culturally attuned interaction. From stakeholder mapping and engagement strategies to briefing materials and meeting preparation, we position your organization as a credible, constructive partner to the Government of Guyana.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment & Mitigation',
    description:
      'Identify potential risks and develop robust mitigation strategies to protect your investments.',
    details:
      'Our team conducts political, regulatory, operational, and reputational risk assessments tailored to your sector. We identify vulnerabilities and develop mitigation frameworks, contingency plans, and monitoring mechanisms, enabling you to make informed decisions and safeguard your investments in a fast-evolving landscape.',
  },
  {
    icon: Handshake,
    title: 'Stakeholder Engagement',
    description:
      'Foster positive engagement with local communities, industry partners, and other key stakeholders.',
    details:
      'We support inclusive and sustainable stakeholder engagement, including local communities, private sector partners, industry associations, and civil society. Our approach emphasizes transparency, cultural understanding, and long-term relationship building to maintain goodwill and social license to operate.',
  },
  {
    icon: ArrowRight,
    title: 'Custom Solutions',
    description:
      'Tailored consultancy services to address your specific challenges and opportunities in Guyana.',
    details:
      'We design bespoke advisory solutions aligned with your strategic objectives—whether you require discreet diplomatic support, strategic communications, conflict resolution, partnership structuring, ESG alignment, or on-the-ground representation in Guyana. Each engagement is customized for precision, discretion, and impact.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-14 sm:py-16 md:py-24 bg-secondary">
     <Container>
       <div className="text-center mb-8 sm:mb-12">
         <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
           Our Consultancy Services
         </h2>
         <p className="mt-3 sm:mt-4 text-base sm:text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
           Leveraging deep diplomatic experience and local expertise to provide strategic guidance for success in Guyana.
         </p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service) => (
            <Card
              key={service.title}
              className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <CardHeader className="flex-row items-center gap-4 pb-4">
                <service.icon className="h-10 w-10 text-accent" />
                <CardTitle className="text-xl font-semibold text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-card-foreground/90">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-accent p-0 h-auto hover:text-accent/80 inline-flex items-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-border">
                    <DialogHeader>
                      <DialogTitle className="text-primary">
                        {service.title}
                      </DialogTitle>
                      <DialogDescription className="text-secondary-foreground">
                        {service.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 text-sm text-foreground/90 leading-relaxed">
                      {service.details}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
