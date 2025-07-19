'use server';

/**
 * @fileOverview Provides personalized gig suggestions based on a student's skills and interests.
 *
 * - getGigSuggestions - A function to generate gig suggestions for a student.
 * - GigSuggestionsInput - The input type for the getGigSuggestions function.
 * - GigSuggestionsOutput - The output type for the getGigSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GigSuggestionsInputSchema = z.object({
  studentSkills: z.array(z.string()).describe('List of skills possessed by the student.'),
  studentInterests: z.array(z.string()).describe('List of interests of the student.'),
  desiredGigType: z.string().describe('The type of gig the student is looking for (e.g., part-time, freelance).'),
});
export type GigSuggestionsInput = z.infer<typeof GigSuggestionsInputSchema>;

const GigSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of personalized gig suggestions based on the student\u0027s skills and interests.'),
});
export type GigSuggestionsOutput = z.infer<typeof GigSuggestionsOutputSchema>;

export async function getGigSuggestions(input: GigSuggestionsInput): Promise<GigSuggestionsOutput> {
  return gigSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gigSuggestionsPrompt',
  input: {schema: GigSuggestionsInputSchema},
  output: {schema: GigSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized gig suggestions to students based on their skills, interests, and desired gig type.\n\nGiven the following information about a student, generate a list of relevant gig suggestions:\n\nSkills: {{#each studentSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nInterests: {{#each studentInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nDesired Gig Type: {{{desiredGigType}}}\n\nSuggestions:`,
});

const gigSuggestionsFlow = ai.defineFlow(
  {
    name: 'gigSuggestionsFlow',
    inputSchema: GigSuggestionsInputSchema,
    outputSchema: GigSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
