
import {z} from 'zod';

export const SymptomAnalyzerInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A detailed description of the symptoms experienced by the user. Include information about the onset, duration, severity, and any other relevant details.'
    ),
  medicalHistory: z
    .string()
    .optional()
    .describe(
      'Optional: Additional medical history or relevant information about the user. Include any pre-existing conditions, medications, allergies, or other factors that may be relevant to the symptom analysis.'
    ),
});
export type SymptomAnalyzerInput = z.infer<typeof SymptomAnalyzerInputSchema>;

export const SymptomAnalyzerOutputSchema = z.object({
  potentialConditions: z
    .array(z.string())
    .describe(
      'A list of potential medical conditions or root causes that may be related to the reported symptoms. Each item in the list should be a clear, concise point.'
    ),
  recommendations: z
    .array(z.string())
    .describe(
      'A list of recommendations for next steps, such as consulting with a healthcare professional, undergoing specific tests, or making lifestyle adjustments. Each item should be an actionable point.'
    ),
});
export type SymptomAnalyzerOutput = z.infer<typeof SymptomAnalyzerOutputSchema>;

