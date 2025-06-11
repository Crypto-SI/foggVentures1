
'use server';
/**
 * @fileOverview AI flow for suggesting blog topics related to Guyana business.
 *
 * - getBlogTopicSuggestions - A function that returns 3 blog topic ideas.
 */

import {ai} from '@/ai/genkit';
import { BlogTopicSuggestionInputSchema, type BlogTopicSuggestionInput, BlogTopicSuggestionOutputSchema, type BlogTopicSuggestionOutput } from '@/lib/ai-schemas';

export async function getBlogTopicSuggestions(input: BlogTopicSuggestionInput): Promise<BlogTopicSuggestionOutput> {
  const validatedInput = BlogTopicSuggestionInputSchema.parse(input); // Use parse for server-side validation or allow empty if truly optional
  return blogTopicSuggestionFlow(validatedInput);
}

const prompt = ai.definePrompt({
  name: 'blogTopicSuggestionPrompt',
  input: {schema: BlogTopicSuggestionInputSchema},
  output: {schema: BlogTopicSuggestionOutputSchema},
  prompt: `You are an AI assistant specializing in content strategy for businesses interested in Guyana.
Your task is to suggest three compelling blog post topics related to current business opportunities, trends, or challenges in Guyana.
For each topic, provide a catchy title and a brief one-sentence justification explaining its relevance.
Simulate awareness of recent (last 3-6 months) business news and developments in Guyana.
Ensure the topics are distinct and actionable for a business audience.
Desired language for topics: {{{language}}}

Example Output Format (though your actual output will be JSON as per schema):
Topic 1: [Title] - [Justification]
Topic 2: [Title] - [Justification]
Topic 3: [Title] - [Justification]
`,
});

const blogTopicSuggestionFlow = ai.defineFlow(
  {
    name: 'blogTopicSuggestionFlow',
    inputSchema: BlogTopicSuggestionInputSchema,
    outputSchema: BlogTopicSuggestionOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      if (!output || !output.suggestedTopics || output.suggestedTopics.length !== 3) {
        console.error('BlogTopicSuggestionFlow: AI did not return 3 valid topics.', output);
        // Fallback if AI fails to generate proper output
        return {
          suggestedTopics: [
            { title: "AI Fallback: Exploring Guyana's Tech Scene", justification: "General topic due to AI generation issue." },
            { title: "AI Fallback: Investment Opportunities in Guyana", justification: "General topic due to AI generation issue." },
            { title: "AI Fallback: Navigating Business Regulations", justification: "General topic due to AI generation issue." },
          ]
        };
      }
      return output;
    } catch (error) {
      console.error("Error in blogTopicSuggestionFlow:", error);
      // Provide a fallback in case of any error during the flow execution
      return {
        suggestedTopics: [
          { title: "Error: Could not generate topics at this time.", justification: "Please try again later." },
          { title: "Error: Topic generation failed.", justification: "Please try again later." },
          { title: "Error: Unable to fetch suggestions.", justification: "Please try again later." },
        ]
      };
    }
  }
);
