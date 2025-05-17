
/**
 * @fileOverview Suggests possible diagnoses based on the user's input from the symptom questionnaire.
 *
 * - suggestDiagnosis - A function that suggests possible diagnoses.
 */

import {ai} from '@/ai/genkit';
import type { SuggestDiagnosisInput, SuggestDiagnosisOutput } from '@/ai/types/diagnosis-suggestion.types';
import { SuggestDiagnosisInputSchema, SuggestDiagnosisOutputSchema } from '@/ai/types/diagnosis-suggestion.types';


export async function suggestDiagnosis(input: SuggestDiagnosisInput): Promise<SuggestDiagnosisOutput> {
  return suggestDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDiagnosisPrompt',
  input: {schema: SuggestDiagnosisInputSchema},
  output: {schema: SuggestDiagnosisOutputSchema},
  prompt: `You are an AI medical assistant that suggests possible diagnoses based on symptoms.

  Based on the symptom description and medical history provided, suggest possible diagnoses.
  Also, provide a confidence level (0 to 1) for each diagnosis and reasoning behind the diagnoses.
  Present the possibleDiagnoses as a list of clear, easy-to-understand points.

  Symptom Description: {{{symptoms}}}
  Medical History: {{{medicalHistory}}}
  `, 
});

const suggestDiagnosisFlow = ai.defineFlow(
  {
    name: 'suggestDiagnosisFlow',
    inputSchema: SuggestDiagnosisInputSchema,
    outputSchema: SuggestDiagnosisOutputSchema,
  },
  async (input: SuggestDiagnosisInput): Promise<SuggestDiagnosisOutput> => {
    const {output} = await prompt(input);
    return output!;
  }
);
