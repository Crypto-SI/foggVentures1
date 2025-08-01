
'use client';

import { useState, type FormEvent } from 'react';
import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BrainCircuit, MessageCircle, ShieldCheck, Lightbulb, Percent, Loader2, AlertTriangle, Info, HelpCircle, MessageSquareQuote, Mail } from 'lucide-react';
import { getPreliminaryAssessment } from '@/ai/flows/preliminary-assessment-flow';
import type { PreliminaryAssessmentInput, PreliminaryAssessmentOutput, StrategySuggestion } from '@/lib/ai-schemas';

interface ActiveConversation {
  originalQuery: string;
  questions: string[];
  answers: string[];
}

export function AiAssistantSection() {
  const [userInput, setUserInput] = useState('');
  const [assessment, setAssessment] = useState<PreliminaryAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHumanConfirmed, setIsHumanConfirmed] = useState(false);
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | null>(null);

  const [capturedEmail, setCapturedEmail] = useState('');
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
  const [areDetailsUnlocked, setAreDetailsUnlocked] = useState(false);
  const [emailCaptureError, setEmailCaptureError] = useState<string | null>(null);

  const handleAnswerChange = (index: number, value: string) => {
    if (activeConversation) {
      const newAnswers = [...activeConversation.answers];
      newAnswers[index] = value;
      setActiveConversation({ ...activeConversation, answers: newAnswers });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isHumanConfirmed) {
      setError("Please confirm you are not a bot before submitting.");
      return;
    }

    let submissionInput: PreliminaryAssessmentInput;

    if (activeConversation) {
      if (activeConversation.answers.some(ans => ans.trim().length < 3)) {
        setError("Please provide a brief answer to all follow-up questions (at least 3 characters per answer).");
        return;
      }
      const combinedInput = `Original query was: "${activeConversation.originalQuery}"\n\nFollow-up questions and my answers are:\n${activeConversation.questions.map((q, i) => `Question: ${q}\nMy Answer: ${activeConversation.answers[i] || "No answer provided."}`).join('\n\n')}`;
      submissionInput = { userInput: combinedInput };
    } else {
      if (userInput.trim().length < 10) {
        setError("Please provide a more detailed description of your needs (at least 10 characters).");
        return;
      }
      submissionInput = { userInput };
    }

    setIsLoading(true);
    setError(null);
    setAreDetailsUnlocked(false);
    setIsEmailFormVisible(false);
    setCapturedEmail('');
    setEmailCaptureError(null);

    try {
      const result = await getPreliminaryAssessment(submissionInput);
      setAssessment(result);

      if (result.type === 'clarification_needed') {
        setActiveConversation({
          originalQuery: result.originalInput,
          questions: result.followUpQuestions,
          answers: Array(result.followUpQuestions.length).fill(''),
        });
        setUserInput('');
      } else if (result.type === 'assessment') {
        setActiveConversation(null);
        setIsEmailFormVisible(true);
      }
    } catch (e) {
      console.error(e);
      setError('An unexpected error occurred. Please try again later.');
      setAssessment(null);
      setActiveConversation(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCaptureSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailCaptureError(null);
    if (!capturedEmail || !capturedEmail.includes('@') || capturedEmail.trim().length < 5) {
      setEmailCaptureError("Please enter a valid email address.");
      return;
    }
    console.log("Email captured for unlocking details:", capturedEmail);
    setAreDetailsUnlocked(true);
    setIsEmailFormVisible(false);
  };
  
  const handleEmailReport = () => {
    // Placeholder function for emailing the report
    console.log(`Email report requested for: ${capturedEmail || 'user (email not captured for report yet)'}`);
    // In a real app, you'd trigger an API call here
    alert("This feature is not yet implemented, but your report would be emailed here.");
  };


  const startNewQuery = () => {
    setUserInput('');
    setAssessment(null);
    setActiveConversation(null);
    setError(null);
    setCapturedEmail('');
    setIsEmailFormVisible(false);
    setAreDetailsUnlocked(false);
    setEmailCaptureError(null);
  };

  return (
    <section id="ai-assistant" className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            FOGG Ventures Preliminary Assessment
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Describe your challenge or objective. The system may ask follow-up questions to provide a more accurate assessment.
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
                 <MessageSquareQuote className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">2. Answer Questions (If Any)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                If your initial query is unclear, the system may ask a few follow-up questions to better understand your situation.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-md text-center flex flex-col items-center py-6">
            <CardHeader className="pt-0">
              <div className="mx-auto bg-accent/10 p-3 rounded-full mb-2">
                <BrainCircuit className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary">3. Receive Insights</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-card-foreground/90">
                Our system will provide potential strategies. Enter your email to unlock detailed reasoning and success chances. This is a preliminary, non-binding assessment. <span className="font-semibold block mt-2">No information is saved by FOGG Ventures without your consent.</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-3xl mx-auto shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">
              {activeConversation ? "Clarification Needed" : "Your Preliminary Assessment"}
            </CardTitle>
            <CardDescription className="text-card-foreground/80">
              {activeConversation 
                ? "Please answer the questions below to help refine the assessment." 
                : "Enter your query below. The system may ask for more details if needed."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!activeConversation && (
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
              )}

              {activeConversation && (
                <div className="space-y-4">
                  <Alert variant="default" className="bg-muted/50">
                    <HelpCircle className="h-5 w-5" />
                    <AlertTitle>Follow-up Questions</AlertTitle>
                    <AlertDescription>
                      Your original query: <em className="text-foreground">"{activeConversation.originalQuery}"</em>
                      <br />
                      Please answer the following to help provide a better assessment:
                    </AlertDescription>
                  </Alert>
                  {activeConversation.questions.map((question, index) => (
                    <div key={index}>
                      <Label htmlFor={`answer-${index}`} className="text-sm font-medium text-foreground">
                        {index + 1}. {question}
                      </Label>
                      <Textarea
                        id={`answer-${index}`}
                        value={activeConversation.answers[index]}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        rows={3}
                        className="mt-1"
                        disabled={isLoading}
                        placeholder={`Your answer to question ${index + 1}...`}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="humanConfirm"
                    checked={isHumanConfirmed}
                    onCheckedChange={(checked) => setIsHumanConfirmed(checked === true)}
                    disabled={isLoading}
                    aria-label="Confirm you are not a bot"
                  />
                  <Label
                    htmlFor="humanConfirm"
                    className="text-sm font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I confirm I am not a bot.
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" 
                disabled={isLoading || !isHumanConfirmed}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Getting Assessment...
                  </>
                ) : (
                  activeConversation ? 'Submit Answers & Get Assessment' : 'Get Assessment'
                )}
              </Button>
              {(assessment || activeConversation || error || isEmailFormVisible) && !isLoading && (
                 <Button 
                    type="button" 
                    variant="outline"
                    className="w-full text-sm py-2" 
                    onClick={startNewQuery}
                  >
                    Start New Query
                  </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {error && !isLoading && (
          <Alert variant="destructive" className="mt-8 max-w-3xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {assessment && assessment.type === 'assessment' && !error && !activeConversation && (
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-2 text-center">
              {areDetailsUnlocked ? "Assessment Results" : "Preliminary Strategies"}
            </h3>
             {!areDetailsUnlocked && isEmailFormVisible && (
                <p className="text-center text-muted-foreground mb-6">Key strategies identified. Enter your email below to unlock detailed reasoning and success probabilities.</p>
            )}
            
            <div className="space-y-6">
              {assessment.suggestions.map((suggestion, index) => (
                <Card key={index} className="bg-card shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-primary flex items-center">
                            <Lightbulb className="h-6 w-6 mr-3 text-accent" />
                            Strategy: {suggestion.strategy}
                        </CardTitle>
                        {areDetailsUnlocked && (
                            <div className="flex flex-col items-end">
                                <div className="flex items-center text-lg font-semibold text-accent">
                                    <Percent className="h-5 w-5 mr-1" /> {suggestion.successChance}%
                                </div>
                                <p className="text-xs text-muted-foreground">Est. Success</p>
                            </div>
                        )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {areDetailsUnlocked ? (
                        <p className="text-card-foreground/90 mb-2"><strong>Reasoning:</strong> {suggestion.reasoning}</p>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">Enter your email to view detailed reasoning and success chance.</p>
                    )}
                    {areDetailsUnlocked && suggestion.successChance > 0 && suggestion.successChance <= 100 && (
                         <Progress value={suggestion.successChance} className="h-3 mt-3" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {isEmailFormVisible && !areDetailsUnlocked && (
              <Card className="mt-8 bg-secondary shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-accent" />
                    Unlock Full Details
                  </CardTitle>
                  <CardDescription className="text-secondary-foreground/90">
                    Provide your email address to view the complete assessment, including detailed reasoning and estimated success chances for each strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailCaptureSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="capturedEmail" className="text-sm font-medium text-foreground">
                        Your Email Address
                      </Label>
                      <Input
                        id="capturedEmail"
                        type="email"
                        value={capturedEmail}
                        onChange={(e) => setCapturedEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1"
                        disabled={isLoading}
                      />
                      {emailCaptureError && <p className="mt-1 text-sm text-destructive">{emailCaptureError}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Unlock Full Assessment"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {areDetailsUnlocked && (
              <div className="mt-8 text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" onClick={handleEmailReport} className="text-primary border-primary/50 hover:bg-primary/5 hover:text-primary">
                        <Mail className="mr-2 h-4 w-4" />
                        Email This Assessment To Myself
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This will email the report to you for future browsing.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            <Alert className="mt-8 border-primary/30 bg-primary/5">
                <Info className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary font-semibold">Important Disclaimer</AlertTitle>
              <AlertDescription className="text-primary/80">
                {assessment.disclaimer}
              </AlertDescription>
            </Alert>
          </div>
        )}
         {assessment && assessment.type === 'clarification_needed' && !error && (
           <Alert className="mt-8 max-w-3xl mx-auto border-primary/30 bg-primary/5">
                <Info className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary font-semibold">Important Disclaimer</AlertTitle>
              <AlertDescription className="text-primary/80">
                {assessment.disclaimer}
              </AlertDescription>
            </Alert>
        )}
      </Container>
    </section>
  );
}
