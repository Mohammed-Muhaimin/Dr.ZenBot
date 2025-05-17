
import {z} from 'zod';

export const MedicalReportAnalyzerInputSchema = z.object({
  reportImageUri: z
    .string()
    .describe(
      "An image of a medical report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MedicalReportAnalyzerInput = z.infer<typeof MedicalReportAnalyzerInputSchema>;

export const MedicalReportAnalyzerOutputSchema = z.object({
  extractedMedicalProblems: z
    .string()
    .describe('A summary of key medical problems or diagnoses extracted from the report image. If no clear problems are found, this may be an empty string or a statement indicating that.'),
});
export type MedicalReportAnalyzerOutput = z.infer<typeof MedicalReportAnalyzerOutputSchema>;
