
/**
 * @fileOverview Provides personalized lifestyle adjustments based on diagnosis suggestions.
 *
 * - getLifestyleAdjustments - A function that suggests lifestyle adjustments.
 */

import {ai} from '@/ai/genkit';
import type { LifestyleAdjustmentsInput, LifestyleAdjustmentsOutput } from '@/ai/types/lifestyle-adjustments.types';
import { LifestyleAdjustmentsInputSchema, LifestyleAdjustmentsOutputSchema } from '@/ai/types/lifestyle-adjustments.types';

export async function getLifestyleAdjustments(input: LifestyleAdjustmentsInput): Promise<LifestyleAdjustmentsOutput> {
  return lifestyleAdjustmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lifestyleAdjustmentsPrompt',
  input: {schema: LifestyleAdjustmentsInputSchema},
  output: {schema: LifestyleAdjustmentsOutputSchema},
  prompt: `Based on the diagnosis: {{{diagnosis}}}, suggest personalized lifestyle adjustments that may help improve mental and physical health. Return a list of adjustments as clear, easy-to-understand points.`,
});

const lifestyleAdjustmentsFlow = ai.defineFlow(
  {
    name: 'lifestyleAdjustmentsFlow',
    inputSchema: LifestyleAdjustmentsInputSchema,
    outputSchema: LifestyleAdjustmentsOutputSchema,
  },
  async (input: LifestyleAdjustmentsInput): Promise<LifestyleAdjustmentsOutput> => {
    const {output} = await prompt(input);
    return output!;
  }
);
