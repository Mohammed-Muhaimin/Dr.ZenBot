
import {z} from 'zod';

export const SuggestDiagnosisInputSchema = z.object({
  symptoms: z
    .string()
    .describe("A detailed description of the user's symptoms."),
  medicalHistory: z.string().optional().describe("The user's medical history."),
});
export type SuggestDiagnosisInput = z.infer<typeof SuggestDiagnosisInputSchema>;

export const SuggestDiagnosisOutputSchema = z.object({
  possibleDiagnoses: z
    .array(z.string())
    .describe('An array of possible diagnoses based on the symptoms.'),
  confidenceLevels: z
    .array(z.number())
    .describe('An array of confidence levels for each diagnosis, ranging from 0 to 1.'),
  reasoning: z.string().describe('The reasoning behind the suggested diagnoses.'),
});
export type SuggestDiagnosisOutput = z.infer<typeof SuggestDiagnosisOutputSchema>;
