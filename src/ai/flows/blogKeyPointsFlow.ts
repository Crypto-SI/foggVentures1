
'use server';
/**
 * @fileOverview AI flow for generating key talking points for a given blog topic.
 *
 * - getBlogKeyPoints - A function that returns 5 key talking points.
 */

import {ai} from '@/ai/genkit';
import { BlogKeyPointsInputSchema, type BlogKeyPointsInput, BlogKeyPointsOutputSchema, type BlogKeyPointsOutput } from '@/lib/ai-schemas';

export async function getBlogKeyPoints(input: BlogKeyPointsInput): Promise<BlogKeyPointsOutput> {
  const validatedInput = BlogKeyPointsInputSchema.parse(input);
  return blogKeyPointsFlow(validatedInput);
}

const prompt = ai.definePrompt({
  name: 'blogKeyPointsPrompt',
  input: {schema: BlogKeyPointsInputSchema},
  output: {schema: BlogKeyPointsOutputSchema},
  prompt: `You are an AI assistant helping to outline a blog post.
For the given blog topic: "{{topic}}" (related to business in Guyana), generate exactly 5 distinct key talking points.
These points should form the core structure of an informative and engaging blog post.
Each point should be concise and actionable.
`,
});

const blogKeyPointsFlow = ai.defineFlow(
  {
    name: 'blogKeyPointsFlow',
    inputSchema: BlogKeyPointsInputSchema,
    outputSchema: BlogKeyPointsOutputSchema,
  },
  async (input) => {
     try {
      const {output} = await prompt(input);
      if (!output || !output.keyPoints || output.keyPoints.length !== 5) {
        console.error('BlogKeyPointsFlow: AI did not return 5 valid key points.', output);
        // Fallback if AI fails to generate proper output
        return {
          keyPoints: [
            "AI Fallback: Introduction to the topic.",
            "AI Fallback: Main challenge or opportunity.",
            "AI Fallback: Potential solution or strategy.",
            "AI Fallback: Example or case study.",
            "AI Fallback: Conclusion and call to action."
          ]
        };
      }
      return output;
    } catch (error) {
      console.error(`Error in blogKeyPointsFlow for topic "${input.topic}":`, error);
      return {
         keyPoints: [
            "Error: Could not generate key points for this topic.",
            "Please try a different topic or rephrase.",
            "Ensure the topic is specific enough.",
            "Contact support if the issue persists.",
            "Thank you for your understanding."
          ]
      };
    }
  }
);
