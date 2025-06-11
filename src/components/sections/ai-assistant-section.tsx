
import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button'; // Button no longer used here
// import Link from 'next/link'; // Link no longer used here
import { BrainCircuit, MessageCircle, ShieldCheck } from 'lucide-react';

export function AiAssistantSection() {
  return (
    <section id="ai-assistant" className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            AI-Powered Preliminary Assessment
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Get instant, confidential insights on how FOGG Ventures can assist you.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card className="bg-card shadow-lg text-center flex flex-col items-center">
            <CardHeader>
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <MessageCircle className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">1. Describe Your Needs</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                Simply speak or type your challenge, objective, or area of interest in Guyana to our AI assistant.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg text-center flex flex-col items-center">
            <CardHeader>
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <BrainCircuit className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">2. Receive AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                The AI will provide a short list of potential assistance strategies, along with an estimated percentage chance of success for each.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg text-center flex flex-col items-center">
            <CardHeader>
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <ShieldCheck className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">3. Decide & Connect (Privately)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                Based on this preliminary, automated assessment, you can decide if you wish to make formal contact. 
                <span className="font-semibold block mt-2">Rest assured, no information you share with the AI assistant is saved or stored by FOGG Ventures.</span>
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-12">
            <p className="text-lg text-foreground/80 mb-4">
                This AI tool is currently under development. Check back soon to try it out!
            </p>
          {/* Removed "Contact Us Directly" button
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#contact">Contact Us Directly</Link>
          </Button> 
          */}
        </div>
      </Container>
    </section>
  );
}
