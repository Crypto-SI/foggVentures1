
'use client';

import { useState } from 'react';
import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, MessageCircle, ShieldCheck, Lightbulb, Percent, Loader2, AlertTriangle, Info } from 'lucide-react';
import { getPreliminaryAssessment } from '@/ai/flows/preliminary-assessment-flow';
import type { PreliminaryAssessmentInput, PreliminaryAssessmentOutput, StrategySuggestion } from '@/lib/ai-schemas';

export function AiAssistantSection() {
  const [userInput, setUserInput] = useState('');
  const [assessment, setAssessment] = useState<PreliminaryAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim().length < 10) {
        setError("Please provide a more detailed description of your needs (at least 10 characters).");
        return;
    }
    setIsLoading(true);
    setError(null);
    setAssessment(null);

    try {
      const input: PreliminaryAssessmentInput = { userInput };
      const result = await getPreliminaryAssessment(input);
      setAssessment(result);
    } catch (e) {
      console.error(e);
      setError('An unexpected error occurred while fetching your assessment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            AI-Powered Preliminary Assessment
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Get instant, confidential insights on how FOGG Ventures can assist you.
            Describe your challenge or objective below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 items-start">
          <Card className="bg-card shadow-md text-center flex flex-col items-center py-6">
            <CardHeader className="pt-0">
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <MessageCircle className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">1. Describe Your Needs</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                Simply type your challenge, objective, or area of interest in Guyana into the form below.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md text-center flex flex-col items-center py-6">
            <CardHeader className="pt-0">
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <BrainCircuit className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">2. Receive AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                Our AI will provide a short list of potential assistance strategies, along with an estimated percentage chance of success.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md text-center flex flex-col items-center py-6">
            <CardHeader className="pt-0">
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <ShieldCheck className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">3. Confidential & Secure</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                This is a preliminary, automated assessment. 
                <span className="font-semibold block mt-2">No information you share with the AI assistant is saved or stored by FOGG Ventures.</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-3xl mx-auto shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Your Preliminary Assessment</CardTitle>
            <CardDescription className="text-card-foreground/80">
              Enter your query below to get AI-driven suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="userInput" className="text-sm font-medium text-foreground">
                  Describe your situation or objective in Guyana:
                </Label>
                <Textarea
                  id="userInput"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., 'I want to understand the regulatory requirements for setting up a renewable energy project in Guyana.' or 'My company is looking to expand its distribution network into Guyana, what are the key considerations?'"
                  rows={5}
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Getting Assessment...
                  </>
                ) : (
                  'Get AI Assessment'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mt-8 max-w-3xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {assessment && !error && (
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-6 text-center">AI Assessment Results</h3>
            <div className="space-y-6">
              {assessment.suggestions.map((suggestion, index) => (
                <Card key={index} className="bg-card shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-primary flex items-center">
                            <Lightbulb className="h-6 w-6 mr-3 text-accent" />
                            Strategy: {suggestion.strategy}
                        </CardTitle>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center text-lg font-semibold text-accent">
                                <Percent className="h-5 w-5 mr-1" /> {suggestion.successChance}%
                            </div>
                            <p className="text-xs text-muted-foreground">Est. Success</p>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/90 mb-2"><strong>Reasoning:</strong> {suggestion.reasoning}</p>
                    {suggestion.successChance > 0 && suggestion.successChance <= 100 && (
                         <Progress value={suggestion.successChance} className="h-3 mt-3" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Alert className="mt-8 border-primary/30 bg-primary/5">
                <Info className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary font-semibold">Important Disclaimer</AlertTitle>
              <AlertDescription className="text-primary/80">
                {assessment.disclaimer}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </Container>
    </section>
  );
}
