
'use server';
/**
 * @fileOverview AI flow for drafting a blog post from a topic and key points.
 *
 * - generateBlogPostDraft - A function that returns a blog title and content.
 */

import {ai} from '@/ai/genkit';
import { BlogPostDraftInputSchema, type BlogPostDraftInput, BlogPostDraftOutputSchema, type BlogPostDraftOutput } from '@/lib/ai-schemas';

export async function generateBlogPostDraft(input: BlogPostDraftInput): Promise<BlogPostDraftOutput> {
  const validatedInput = BlogPostDraftInputSchema.parse(input);
  return blogPostDraftFlow(validatedInput);
}

const prompt = ai.definePrompt({
  name: 'blogPostDraftPrompt',
  input: {schema: BlogPostDraftInputSchema},
  output: {schema: BlogPostDraftOutputSchema},
  prompt: `You are an expert blog writer for a consultancy firm specializing in Guyana.
Your task is to write a compelling and informative blog post.

Blog Post Topic: "{{topic}}"

Key Talking Points to Cover:
{{#each keyPoints}}
- {{{this}}}
{{/each}}

Based on the topic and key points, generate:
1.  A suitable and engaging title for the blog post.
2.  The full content of the blog post (approximately 300-500 words). The content should be well-structured, insightful, and written in a professional yet engaging tone. Use markdown for formatting (e.g., headings, lists, bold text).

Ensure the blog post flows logically and provides value to readers interested in business or investment in Guyana.
`,
});

const blogPostDraftFlow = ai.defineFlow(
  {
    name: 'blogPostDraftFlow',
    inputSchema: BlogPostDraftInputSchema,
    outputSchema: BlogPostDraftOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      if (!output || !output.title || !output.content) {
         console.error('BlogPostDraftFlow: AI did not return a valid title and content.', output);
        return {
          title: `Draft: ${input.topic}`,
          content: `Error: AI failed to generate content. Please refine key points or topic.\n\nKey Points Received:\n${input.keyPoints.map(p => `- ${p}`).join('\n')}`
        };
      }
      return output;
    } catch (error) {
      console.error(`Error in blogPostDraftFlow for topic "${input.topic}":`, error);
       return {
          title: `Draft: ${input.topic}`,
          content: `An unexpected error occurred while generating the blog post draft. Please try again.\n\nKey Points Received:\n${input.keyPoints.map(p => `- ${p}`).join('\n')}`
        };
    }
  }
);
