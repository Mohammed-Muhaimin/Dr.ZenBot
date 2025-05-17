
import { z } from 'zod';

export const DoctorInfoSchema = z.object({
  id: z.string(),
  name: z.string().describe('Name of the doctor or clinic.'),
  specialty: z.string().describe('Medical specialty of the doctor.'),
  address: z.string().describe('Full address of the clinic.'),
  phone: z.string().describe('Contact phone number.'),
  area: z.string().describe('General area or city of practice.'),
  conditionsTreated: z.array(z.string()).describe('List of conditions or keywords they handle.'),
  imageUrl: z.string().optional().describe('URL of an image for the doctor or clinic.'),
});
export type DoctorInfo = z.infer<typeof DoctorInfoSchema>;

export const RecommendDoctorsInputSchema = z.object({
  diagnoses: z.array(z.string()).min(1, "At least one diagnosis is required.").describe('A list of suggested diagnoses or conditions.'),
  area: z.string().optional().describe('The desired area or city for the doctor search (e.g., "Springfield").'),
});
export type RecommendDoctorsInput = z.infer<typeof RecommendDoctorsInputSchema>;

export const RecommendDoctorsOutputSchema = z.object({
  doctors: z.array(DoctorInfoSchema).describe('A list of recommended doctors.'),
});
export type RecommendDoctorsOutput = z.infer<typeof RecommendDoctorsOutputSchema>;
