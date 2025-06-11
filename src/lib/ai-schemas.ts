
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
    type: z.literal("assessment"),
    suggestions: z.array(StrategySuggestionSchema).min(1).max(3).describe('A list of 1 to 3 potential assistance strategies.'),
    disclaimer: z.string().describe('A standard disclaimer that this is an AI assessment and not a formal consultation.'),
  }),
  z.object({
    type: z.literal("clarification_needed"),
    followUpQuestions: z.array(z.string().min(1)).min(1).max(3).describe('A list of 1 to 3 follow-up questions to clarify user needs.'),
    originalInput: z.string().describe('The user\'s original input that led to these clarification questions.'),
    disclaimer: z.string().describe('A standard disclaimer.'),
  })
]);
export type PreliminaryAssessmentOutput = z.infer<typeof PreliminaryAssessmentOutputSchema>;
