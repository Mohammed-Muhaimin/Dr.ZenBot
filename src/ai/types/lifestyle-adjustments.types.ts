
import {z} from 'zod';

export const LifestyleAdjustmentsInputSchema = z.object({
  diagnosis: z
    .string()
    .describe('The diagnosis or suggested condition to provide lifestyle adjustments for.'),
});
export type LifestyleAdjustmentsInput = z.infer<typeof LifestyleAdjustmentsInputSchema>;

export const LifestyleAdjustmentsOutputSchema = z.object({
  adjustments: z
    .array(z.string())
    .describe('A list of personalized lifestyle adjustments to improve health.'),
});
export type LifestyleAdjustmentsOutput = z.infer<typeof LifestyleAdjustmentsOutputSchema>;
