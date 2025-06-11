
import { z } from 'zod';

export const PreliminaryAssessmentInputSchema = z.object({
  userInput: z.string().min(10, { message: "Please describe your needs in at least 10 characters."}).describe('A description of the user\'s challenge, objective, or area of interest in Guyana.'),
});
export type PreliminaryAssessmentInput = z.infer<typeof PreliminaryAssessmentInputSchema>;

export const StrategySuggestionSchema = z.object({
  strategy: z.string().describe('A potential assistance strategy FOGG Ventures could offer.'),
  successChance: z.number().min(0).max(100).describe('An estimated percentage chance of success for this strategy (0-100).'),
  reasoning: z.string().describe('A brief explanation for the suggested strategy and its success chance.'),
});
export type StrategySuggestion = z.infer<typeof StrategySuggestionSchema>;

export const PreliminaryAssessmentOutputSchema = z.object({
  suggestions: z.array(StrategySuggestionSchema).min(1).max(3).describe('A list of 1 to 3 potential assistance strategies.'),
  disclaimer: z.string().describe('A standard disclaimer that this is an AI assessment and not a formal consultation.'),
});
export type PreliminaryAssessmentOutput = z.infer<typeof PreliminaryAssessmentOutputSchema>;
