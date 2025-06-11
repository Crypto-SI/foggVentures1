
import { z } from 'zod';

export const PreliminaryAssessmentInputSchema = z.object({
  userInput: z.string().min(10, { message: "Please describe your needs in at least 10 characters."}).describe('A description of the user\'s challenge, objective, or area of interest in Guyana, or answers to follow-up questions.'),
});
export type PreliminaryAssessmentInput = z.infer<typeof PreliminaryAssessmentInputSchema>;

export const StrategySuggestionSchema = z.object({
  strategy: z.string().describe('A potential assistance strategy FOGG Ventures could offer.'),
  successChance: z.number().min(0).max(100).describe('An estimated percentage chance of success for this strategy (0-100).'),
  reasoning: z.string().describe('A brief explanation for the suggested strategy and its success chance.'),
});
export type StrategySuggestion = z.infer<typeof StrategySuggestionSchema>;

// Discriminated union for the output
export const PreliminaryAssessmentOutputSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.enum(["assessment"]).describe("Indicates this is an assessment response."),
    suggestions: z.array(StrategySuggestionSchema).min(1).max(3).describe('A list of 1 to 3 potential assistance strategies.'),
    disclaimer: z.string().describe('A standard disclaimer that this is an AI assessment and not a formal consultation.'),
  }),
  z.object({
    type: z.enum(["clarification_needed"]).describe("Indicates the AI needs more information."),
    followUpQuestions: z.array(z.string().min(1)).min(1).max(3).describe('A list of 1 to 3 follow-up questions to clarify user needs.'),
    originalInput: z.string().describe('The user\'s original input that led to these clarification questions.'),
    disclaimer: z.string().describe('A standard disclaimer.'),
  })
]);
export type PreliminaryAssessmentOutput = z.infer<typeof PreliminaryAssessmentOutputSchema>;


// Schemas for AI Blog Post Generation
export const BlogTopicSuggestionInputSchema = z.object({
  // Potentially add context like existing categories or keywords later
  language: z.string().default('English').describe('The desired language for the blog topics.')
});
export type BlogTopicSuggestionInput = z.infer<typeof BlogTopicSuggestionInputSchema>;

export const SuggestedTopicSchema = z.object({
  title: z.string().describe('A compelling blog post title.'),
  justification: z.string().describe('A brief (1-sentence) justification for why this topic is relevant for Guyana business news.')
});
export type SuggestedTopic = z.infer<typeof SuggestedTopicSchema>;

export const BlogTopicSuggestionOutputSchema = z.object({
  suggestedTopics: z.array(SuggestedTopicSchema).length(3).describe('An array of 3 suggested blog topics with justifications.')
});
export type BlogTopicSuggestionOutput = z.infer<typeof BlogTopicSuggestionOutputSchema>;


export const BlogKeyPointsInputSchema = z.object({
  topic: z.string().min(5, {message: "Topic must be at least 5 characters."}).describe('The selected blog topic.')
});
export type BlogKeyPointsInput = z.infer<typeof BlogKeyPointsInputSchema>;

export const BlogKeyPointsOutputSchema = z.object({
  keyPoints: z.array(z.string()).length(5).describe('An array of 5 key talking points for the blog post.')
});
export type BlogKeyPointsOutput = z.infer<typeof BlogKeyPointsOutputSchema>;


export const BlogPostDraftInputSchema = z.object({
  topic: z.string().describe('The main topic of the blog post.'),
  keyPoints: z.array(z.string()).min(1).describe('A list of key talking points to cover in the blog post.')
});
export type BlogPostDraftInput = z.infer<typeof BlogPostDraftInputSchema>;

export const BlogPostDraftOutputSchema = z.object({
  title: z.string().describe('A suitable title for the blog post.'),
  content: z.string().describe('The generated content for the blog post, in markdown format.')
});
export type BlogPostDraftOutput = z.infer<typeof BlogPostDraftOutputSchema>;
