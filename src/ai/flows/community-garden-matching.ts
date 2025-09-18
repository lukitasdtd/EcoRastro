'use server';

/**
 * @fileOverview AI flow for matching users with nearby community gardens based on their interests and location.
 *
 * - matchUserToGarden - A function that takes user interests and location to suggest nearby community gardens.
 * - MatchUserToGardenInput - The input type for the matchUserToGarden function.
 * - MatchUserToGardenOutput - The return type for the matchUserToGarden function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchUserToGardenInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A description of the users gardening interests.'),
  userLocation: z.string().describe('The location of the user.'),
  nearbyGardens: z
    .string()
    .describe('A list of community gardens near the user.'),
});
export type MatchUserToGardenInput = z.infer<typeof MatchUserToGardenInputSchema>;

const MatchUserToGardenOutputSchema = z.object({
  suggestedGardens: z
    .string()
    .describe(
      'A list of community gardens that match the users interests and location.'
    ),
});
export type MatchUserToGardenOutput = z.infer<typeof MatchUserToGardenOutputSchema>;

export async function matchUserToGarden(input: MatchUserToGardenInput): Promise<MatchUserToGardenOutput> {
  return matchUserToGardenFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchUserToGardenPrompt',
  input: {schema: MatchUserToGardenInputSchema},
  output: {schema: MatchUserToGardenOutputSchema},
  prompt: `You are a community garden expert. A user is interested in joining a community garden, and you will suggest some gardens for them.

  Consider the user's interests, their location, and the available nearby gardens. Return only gardens that the user would be interested in.

  User Interests: {{{userInterests}}}
  User Location: {{{userLocation}}}
  Nearby Gardens: {{{nearbyGardens}}}`,
});

const matchUserToGardenFlow = ai.defineFlow(
  {
    name: 'matchUserToGardenFlow',
    inputSchema: MatchUserToGardenInputSchema,
    outputSchema: MatchUserToGardenOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
