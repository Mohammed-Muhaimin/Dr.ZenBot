
/**
 * @fileOverview An AI agent that analyzes user-reported symptoms to suggest potential conditions or root causes.
 *
 * - analyzeSymptoms - A function that analyzes the symptoms provided by the user.
 */

import {ai} from '@/ai/genkit';
import type { SymptomAnalyzerInput, SymptomAnalyzerOutput } from '@/ai/types/symptom-analyzer.types';
import { SymptomAnalyzerInputSchema, SymptomAnalyzerOutputSchema } from '@/ai/types/symptom-analyzer.types';


export async function analyzeSymptoms(input: SymptomAnalyzerInput): Promise<SymptomAnalyzerOutput> {
  return symptomAnalyzerFlow(input);
}

const symptomAnalyzerPrompt = ai.definePrompt({
  name: 'symptomAnalyzerPrompt',
  input: {schema: SymptomAnalyzerInputSchema},
  output: {schema: SymptomAnalyzerOutputSchema},
  prompt: `You are an AI-powered medical assistant that analyzes user-reported symptoms to suggest potential conditions or root causes.

  Based on the symptoms and medical history provided, suggest potential medical conditions and recommendations for next steps.
  Present both potentialConditions and recommendations as lists of clear, easy-to-understand points.

  Symptoms: {{{symptoms}}}
  Medical History: {{{medicalHistory}}}

  Return the output in the specified JSON format with 'potentialConditions' as an array of strings and 'recommendations' as an array of strings.
  For example:
  {
    "potentialConditions": ["Condition A: Explanation", "Condition B: Explanation"],
    "recommendations": ["See a doctor.", "Try X lifestyle change."]
  }
  `,
});

const symptomAnalyzerFlow = ai.defineFlow(
  {
    name: 'symptomAnalyzerFlow',
    inputSchema: SymptomAnalyzerInputSchema,
    outputSchema: SymptomAnalyzerOutputSchema,
  },
  async (input: SymptomAnalyzerInput): Promise<SymptomAnalyzerOutput> => {
    const {output} = await symptomAnalyzerPrompt(input);
    return output!;
  }
);
