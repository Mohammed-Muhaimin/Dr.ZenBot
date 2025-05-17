
/**
 * @fileOverview Analyzes an image of a medical report to extract key medical problems.
 *
 * - analyzeMedicalReportImage - A function that processes the medical report image.
 */

import {ai} from '@/ai/genkit';
import type { MedicalReportAnalyzerInput, MedicalReportAnalyzerOutput } from '@/ai/types/medical-report-analyzer.types';
import { MedicalReportAnalyzerInputSchema, MedicalReportAnalyzerOutputSchema } from '@/ai/types/medical-report-analyzer.types';

export async function analyzeMedicalReportImage(input: MedicalReportAnalyzerInput): Promise<MedicalReportAnalyzerOutput> {
  return medicalReportAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalReportAnalyzerPrompt',
  input: {schema: MedicalReportAnalyzerInputSchema},
  output: {schema: MedicalReportAnalyzerOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing medical reports.
You will be provided with an image of a medical report.
Analyze the image and extract a concise summary of the key medical problems, diagnoses, or significant findings.
Focus on medical conditions, and present them as a clear, bulleted list if multiple items are found, or a single string if one item is found. If no specific problems are clearly identifiable, state that.

Medical Report Image: {{media url=reportImageUri}}

Return the extracted information in the 'extractedMedicalProblems' field.
Example output:
- Hypertension
- Type 2 Diabetes
- Mild cognitive impairment
`,
  config: {
    // Adjust safety settings if needed, though default should be fine for text extraction.
    // Potentially increase temperature slightly if extraction is too rigid, but start with default.
  }
});

const medicalReportAnalyzerFlow = ai.defineFlow(
  {
    name: 'medicalReportAnalyzerFlow',
    inputSchema: MedicalReportAnalyzerInputSchema,
    outputSchema: MedicalReportAnalyzerOutputSchema,
  },
  async (input: MedicalReportAnalyzerInput): Promise<MedicalReportAnalyzerOutput> => {
    const {output} = await prompt(input);
    return output!;
  }
);
