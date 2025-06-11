
'use client';

import type { SuggestedTopic } from '@/lib/ai-schemas';
import { getBlogTopicSuggestions } from '@/ai/flows/blogTopicSuggestionFlow';
import { getBlogKeyPoints } from '@/ai/flows/blogKeyPointsFlow';
import { generateBlogPostDraft } from '@/ai/flows/blogPostDraftFlow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, FileText, CheckCircle, Edit3, Lightbulb, AlertTriangle, PlusCircle, Trash2 } from 'lucide-react';
import React, { useState, type FormEvent } from 'react';

type FlowStep = 'initial' | 'selectTopic' | 'reviewPoints' | 'writePost' | 'error';

interface AiBlogPostGeneratorProps {
  onComplete?: () => void; // Callback when flow is finished or exited
}

export function AiBlogPostGenerator({ onComplete }: AiBlogPostGeneratorProps) {
  const [step, setStep] = useState<FlowStep>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestedTopics, setSuggestedTopics] = useState<SuggestedTopic[]>([]);
  const [selectedTopicValue, setSelectedTopicValue] = useState<string>(''); // Stores the title of the selected topic
  const [customTopic, setCustomTopic] = useState<string>('');

  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [userKeyPoints, setUserKeyPoints] = useState<string[]>(['']); // Start with one empty field for user point

  const [blogTitle, setBlogTitle] = useState<string>('');
  const [blogContent, setBlogContent] = useState<string>('');

  const handleFetchTopics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBlogTopicSuggestions({ language: 'English' });
      if (result.suggestedTopics && result.suggestedTopics.length > 0) {
        setSuggestedTopics(result.suggestedTopics);
        setStep('selectTopic');
      } else {
        setError('No topics were suggested. Please try again.');
        setStep('error');
      }
    } catch (e: any) {
      console.error("Error fetching topics:", e);
      setError(e.message || 'Failed to fetch blog topics.');
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopicAndFetchPoints = async () => {
    const finalTopic = customTopic.trim() || selectedTopicValue;
    if (!finalTopic) {
      setError('Please select or enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBlogKeyPoints({ topic: finalTopic });
      if (result.keyPoints && result.keyPoints.length > 0) {
        setKeyPoints(result.keyPoints);
        setUserKeyPoints(['']); // Reset user key points
        setStep('reviewPoints');
      } else {
        setError('No key points were generated for this topic. Try a different one.');
        setStep('error');
      }
    } catch (e: any) {
      console.error("Error fetching key points:", e);
      setError(e.message || 'Failed to fetch key points.');
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUserKeyPointChange = (index: number, value: string) => {
    const updatedPoints = [...userKeyPoints];
    updatedPoints[index] = value;
    setUserKeyPoints(updatedPoints);
  };

  const addUserKeyPointField = () => {
    setUserKeyPoints([...userKeyPoints, '']);
  };

  const removeUserKeyPointField = (index: number) => {
    if (userKeyPoints.length > 1) {
      setUserKeyPoints(userKeyPoints.filter((_, i) => i !== index));
    } else {
      setUserKeyPoints(['']); // Keep one empty field if it's the last one
    }
  };


  const handleGenerateDraft = async () => {
    const finalTopic = customTopic.trim() || selectedTopicValue;
    const allKeyPoints = [
      ...keyPoints,
      ...userKeyPoints.map(p => p.trim()).filter(p => p.length > 0)
    ];

    if (allKeyPoints.length === 0) {
      setError('Please ensure there are some key points before generating the draft.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateBlogPostDraft({ topic: finalTopic, keyPoints: allKeyPoints });
      setBlogTitle(result.title);
      setBlogContent(result.content);
      setStep('writePost');
    } catch (e: any) {
      console.error("Error generating blog draft:", e);
      setError(e.message || 'Failed to generate blog draft.');
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setStep('initial');
    setIsLoading(false);
    setError(null);
    setSuggestedTopics([]);
    setSelectedTopicValue('');
    setCustomTopic('');
    setKeyPoints([]);
    setUserKeyPoints(['']);
    setBlogTitle('');
    setBlogContent('');
    if (onComplete) onComplete();
  };


  const renderStepContent = () => {
    switch (step) {
      case 'initial':
        return (
          <div className="text-center">
            <Button onClick={handleFetchTopics} disabled={isLoading} size="lg" className="bg-primary hover:bg-primary/90">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
              Start New AI Blog Post
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Let AI help you find topics and draft your next blog post.</p>
          </div>
        );
      case 'selectTopic':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent" /> Select a Blog Topic</CardTitle>
              <CardDescription>Choose one of the AI-suggested topics or provide your own.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={selectedTopicValue} onValueChange={setSelectedTopicValue} disabled={isLoading || !!customTopic.trim()}>
                {suggestedTopics.map((topic, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={topic.title} id={`topic-${index}`} />
                    <Label htmlFor={`topic-${index}`} className="flex flex-col">
                      <span className="font-semibold text-foreground">{topic.title}</span>
                      <span className="text-sm text-muted-foreground">{topic.justification}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div>
                <Label htmlFor="customTopic">Enter Your Own Topic</Label>
                <Input
                  id="customTopic"
                  value={customTopic}
                  onChange={(e) => {
                    setCustomTopic(e.target.value);
                    if (e.target.value.trim()) setSelectedTopicValue(''); // Clear radio selection if typing custom
                  }}
                  placeholder="e.g., 'The Future of Renewable Energy in Guyana'"
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleReset} disabled={isLoading}>Cancel</Button>
              <Button onClick={handleSelectTopicAndFetchPoints} disabled={isLoading || (!selectedTopicValue && !customTopic.trim())}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Next: Key Points'}
              </Button>
            </CardFooter>
          </Card>
        );
      case 'reviewPoints':
        const currentTopic = customTopic.trim() || selectedTopicValue;
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent" />Review Key Talking Points</CardTitle>
              <CardDescription>AI has generated these points for your topic: <strong className="text-foreground">{currentTopic}</strong>. Review, edit, or add your own.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>AI-Suggested Key Points (Editable):</Label>
              {keyPoints.map((point, index) => (
                <Textarea
                  key={`ai-point-${index}`}
                  value={point}
                  onChange={(e) => {
                    const updated = [...keyPoints];
                    updated[index] = e.target.value;
                    setKeyPoints(updated);
                  }}
                  rows={2}
                  className="bg-muted/30"
                  disabled={isLoading}
                />
              ))}
              <Label>Your Key Points:</Label>
              {userKeyPoints.map((point, index) => (
                <div key={`user-point-${index}`} className="flex items-center gap-2">
                  <Textarea
                    value={point}
                    onChange={(e) => handleUserKeyPointChange(index, e.target.value)}
                    placeholder={`Your additional point ${index + 1}...`}
                    rows={2}
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeUserKeyPointField(index)} disabled={isLoading || userKeyPoints.length <=1 && userKeyPoints[0] === ''} aria-label="Remove point">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addUserKeyPointField} disabled={isLoading}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Another Point
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('selectTopic')} disabled={isLoading}>Back to Topics</Button>
              <Button onClick={handleGenerateDraft} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Next: Generate Draft'}
              </Button>
            </CardFooter>
          </Card>
        );
      case 'writePost':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5 text-accent" /> AI-Generated Blog Post Draft</CardTitle>
              <CardDescription>Review and edit the AI-generated title and content. You can make any changes you need.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="blogTitle">Blog Title</Label>
                <Input
                  id="blogTitle"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="mt-1 text-lg font-semibold"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="blogContent">Blog Content (Markdown supported)</Label>
                <Textarea
                  id="blogContent"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  rows={15}
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('reviewPoints')} disabled={isLoading}>Back to Key Points</Button>
              <div className="space-x-2">
                <Button variant="outline" disabled={isLoading} onClick={() => alert("Save Draft: Functionality not implemented yet.")}>
                    <Edit3 className="mr-2 h-4 w-4"/> Save Draft
                </Button>
                <Button className="bg-primary hover:bg-primary/90" disabled={isLoading} onClick={() => alert("Publish Post: Functionality not implemented yet.")}>
                    <CheckCircle className="mr-2 h-4 w-4"/> Publish Post
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      case 'error':
        return (
           <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>
              {error || "Something went wrong. Please try again."}
              <Button onClick={handleReset} variant="link" className="p-0 h-auto ml-2 text-destructive hover:underline">Start Over</Button>
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="my-6">
      {renderStepContent()}
      {step !== 'initial' && step !== 'error' && !isLoading && (
         <Button 
            variant="ghost" 
            onClick={handleReset} 
            className="mt-4 text-sm text-muted-foreground hover:text-primary mx-auto block"
          >
            Cancel AI Blog Post Generation
          </Button>
      )}
    </div>
  );
}
