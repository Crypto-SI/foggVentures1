
'use server';
/**
 * @fileOverview Provides preliminary assessment for FOGG Ventures clients.
 * Can ask for clarification if input is too vague.
 *
 * - getPreliminaryAssessment - A function that takes a user's description of their needs
 *   and returns potential assistance strategies or follow-up questions.
 */

import {ai} from '@/ai/genkit';
import { PreliminaryAssessmentInputSchema, type PreliminaryAssessmentInput, PreliminaryAssessmentOutputSchema, type PreliminaryAssessmentOutput } from '@/lib/ai-schemas';


export async function getPreliminaryAssessment(input: PreliminaryAssessmentInput): Promise<PreliminaryAssessmentOutput> {
  const validatedInput = PreliminaryAssessmentInputSchema.safeParse(input);
  if (!validatedInput.success) {
    console.error("Invalid input for preliminary assessment:", validatedInput.error);
    // Fallback if input is invalid based on server-side check
     return {
        type: 'assessment', // Or clarification_needed if that makes more sense for input error
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

Your role is to provide a PRELIMINARY assessment based on the user's described needs related to doing business or investing in Guyana, or based on their answers to previous clarification questions.

User's input: {{{userInput}}}

Based on this input:
1.  If the input (including any previous answers) is sufficiently detailed and clear for a preliminary assessment, provide 1 to 3 concise, actionable assistance strategies that FOGG Ventures might offer. For each strategy:
    a.  Clearly state the strategy (e.g., "Facilitating introductions to key government agencies").
    b.  Provide an estimated percentage chance of success (e.g., 75 for 75%). This should be a number between 0 and 100.
    c.  Provide a brief (1-2 sentences) reasoning for the strategy and its estimated success, considering FOGG Ventures' expertise.
    d.  Set the 'type' field in your response to 'assessment'.

2.  If the input is too vague, lacks specific details, or if previous answers are still insufficient for a meaningful assessment, DO NOT provide strategies. Instead, ask 1 to 3 specific, distinct follow-up questions that would help clarify the user's needs. These questions should aim to elicit actionable information.
    a.  Set the 'type' field in your response to 'clarification_needed'.
    b.  Provide the questions in the 'followUpQuestions' array.
    c.  Crucially, include the user's most recent 'userInput' (which you are currently processing) in the 'originalInput' field of your response. This is vital for context in the next turn.

IMPORTANT: Your response MUST be structured according to the output schema, including the 'type' field.
If providing strategies, ensure 'successChance' is a number.
If asking questions, ensure 'followUpQuestions' is an array of strings and 'originalInput' contains the current userInput.

Always include the following standard disclaimer as the 'disclaimer' field in your response, regardless of whether you provide an assessment or ask questions: "This is an automated preliminary assessment. The strategies and success chances are estimates provided by an AI and are not binding. For a formal consultation and detailed analysis, please consider reaching out to FOGG Ventures directly. No information shared with this AI assistant is saved or stored by FOGG Ventures."
`,
});

const preliminaryAssessmentFlow = ai.defineFlow(
  {
    name: 'preliminaryAssessmentFlow',
    inputSchema: PreliminaryAssessmentInputSchema,
    outputSchema: PreliminaryAssessmentOutputSchema,
  },
  async (input) => {
    const {output: rawOutput} = await prompt(input);
    
    const defaultDisclaimer = "This is an automated preliminary assessment. The strategies and success chances are estimates provided by an AI and are not binding. For a formal consultation and detailed analysis, please consider reaching out to FOGG Ventures directly. No information shared with this AI assistant is saved or stored by FOGG Ventures.";

    if (!rawOutput || !rawOutput.type) {
      // Fallback if LLM fails to produce structured output or type is missing
      return {
        type: 'clarification_needed',
        followUpQuestions: ["I need a bit more information to help you effectively. Could you please provide more details about your specific needs or objectives in Guyana?"],
        originalInput: input.userInput,
        disclaimer: defaultDisclaimer,
      };
    }

    if (rawOutput.type === 'assessment') {
      const suggestions = (rawOutput.suggestions && rawOutput.suggestions.length > 0)
        ? rawOutput.suggestions.map(s => ({
            strategy: s.strategy || "Strategy details unavailable.",
            successChance: typeof s.successChance === 'number' ? s.successChance : 0, // Ensure successChance is a number
            reasoning: s.reasoning || "Reasoning unavailable."
          }))
        : [{
            strategy: "Further consultation recommended.",
            successChance: 0,
            reasoning: "The AI was unable to generate specific strategies based on the provided input. A more detailed discussion might be necessary to identify how FOGG Ventures can best assist you."
          }];
      return {
        type: 'assessment',
        suggestions: suggestions,
        disclaimer: rawOutput.disclaimer || defaultDisclaimer,
      };
    } else { // type === 'clarification_needed'
      const questions = (rawOutput.followUpQuestions && rawOutput.followUpQuestions.length > 0)
        ? rawOutput.followUpQuestions
        : ["Could you please elaborate further on your request?"];
      return {
        type: 'clarification_needed',
        followUpQuestions: questions,
        originalInput: rawOutput.originalInput || input.userInput, // Prefer LLM's originalInput, fallback to current input
        disclaimer: rawOutput.disclaimer || defaultDisclaimer,
      };
    }
  }
);
