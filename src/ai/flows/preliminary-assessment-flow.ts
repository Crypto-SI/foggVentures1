
'use server';
/**
 * @fileOverview Provides preliminary assessment for FOGG Ventures clients.
 *
 * - getPreliminaryAssessment - A function that takes a user's description of their needs
 *   and returns potential assistance strategies with estimated success chances.
 */

import {ai} from '@/ai/genkit';
import { PreliminaryAssessmentInputSchema, type PreliminaryAssessmentInput, PreliminaryAssessmentOutputSchema, type PreliminaryAssessmentOutput } from '@/lib/ai-schemas';


export async function getPreliminaryAssessment(input: PreliminaryAssessmentInput): Promise<PreliminaryAssessmentOutput> {
  // Validate input using Zod schema before calling the flow
  const validatedInput = PreliminaryAssessmentInputSchema.safeParse(input);
  if (!validatedInput.success) {
    // This case should ideally be caught by client-side validation first,
    // but it's good practice for server-side actions.
    // For this example, we'll proceed, but in a real app, you might throw an error
    // or return a specific error structure.
    console.error("Invalid input for preliminary assessment:", validatedInput.error);
    // Fallback or error return if input is invalid based on server-side check
     return {
        suggestions: [{
            strategy: "Input Error",
            successChance: 0,
            reasoning: "Your description was too short or invalid. Please provide more details."
        }],
        disclaimer: "Please ensure your input meets the required criteria for an effective assessment."
      };
  }
  return preliminaryAssessmentFlow(validatedInput.data);
}

const prompt = ai.definePrompt({
  name: 'preliminaryAssessmentPrompt',
  input: {schema: PreliminaryAssessmentInputSchema},
  output: {schema: PreliminaryAssessmentOutputSchema},
  prompt: `You are an AI assistant for FOGG Ventures, a high-level consultancy led by Kirk Hollingsworth, a former British diplomat, specializing in navigating Guyana's governmental and business landscape. Your tone should be professional, insightful, and helpful.

Your role is to provide a PRELIMINARY assessment based on the user's described needs related to doing business or investing in Guyana.

User's input: {{{userInput}}}

Based on this input, provide 1 to 3 concise, actionable assistance strategies that FOGG Ventures might offer. For each strategy:
1.  Clearly state the strategy (e.g., "Facilitating introductions to key government agencies").
2.  Provide an estimated percentage chance of success (e.g., 75 for 75%). This should be a number between 0 and 100.
3.  Provide a brief (1-2 sentences) reasoning for the strategy and its estimated success, considering FOGG Ventures' expertise.

IMPORTANT: Your response MUST be structured according to the output schema. Ensure the successChance is a number.

Include the following standard disclaimer as the 'disclaimer' field in your response: "This is an automated preliminary assessment. The strategies and success chances are estimates provided by an AI and are not binding. For a formal consultation and detailed analysis, please consider reaching out to FOGG Ventures directly. No information shared with this AI assistant is saved or stored by FOGG Ventures."
`,
});

const preliminaryAssessmentFlow = ai.defineFlow(
  {
    name: 'preliminaryAssessmentFlow',
    inputSchema: PreliminaryAssessmentInputSchema,
    outputSchema: PreliminaryAssessmentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    
    const defaultDisclaimer = "This is an automated preliminary assessment. The strategies and success chances are estimates provided by an AI and are not binding. For a formal consultation and detailed analysis, please consider reaching out to FOGG Ventures directly. No information shared with this AI assistant is saved or stored by FOGG Ventures.";

    if (!output || !output.suggestions || output.suggestions.length === 0) {
      return {
        suggestions: [{
            strategy: "Further consultation recommended.",
            successChance: 0,
            reasoning: "The AI was unable to generate specific strategies based on the provided input. A more detailed discussion might be necessary to identify how FOGG Ventures can best assist you."
        }],
        disclaimer: defaultDisclaimer
      };
    }
    
    return {
        ...output,
        suggestions: output.suggestions.map(s => ({
            strategy: s.strategy || "Strategy details unavailable.",
            successChance: typeof s.successChance === 'number' ? s.successChance : 0,
            reasoning: s.reasoning || "Reasoning unavailable."
        })),
        disclaimer: output.disclaimer || defaultDisclaimer
    };
  }
);
