
/**
 * @fileOverview Recommends doctors based on diagnoses and area.
 *
 * - recommendDoctors - A function that recommends doctors.
 */

import { ai } from '@/ai/genkit';
import { getDoctorsByConditionsAndArea as fetchDoctorsService, type DoctorInfo as ServiceDoctorInfo } from '@/services/doctor-service';
import type { RecommendDoctorsInput, RecommendDoctorsOutput, DoctorInfo } from '@/ai/types/recommend-doctors.types';
import { RecommendDoctorsInputSchema, RecommendDoctorsOutputSchema } from '@/ai/types/recommend-doctors.types';

export async function recommendDoctors(input: RecommendDoctorsInput): Promise<RecommendDoctorsOutput> {
  return recommendDoctorsFlow(input);
}

const recommendDoctorsFlow = ai.defineFlow(
  {
    name: 'recommendDoctorsFlow',
    inputSchema: RecommendDoctorsInputSchema,
    outputSchema: RecommendDoctorsOutputSchema,
    description: 'Retrieves a list of doctors based on diagnoses and an optional location.',
  },
  async (input: RecommendDoctorsInput): Promise<RecommendDoctorsOutput> => {
    const doctorsFromService: ServiceDoctorInfo[] = await fetchDoctorsService(input.diagnoses, input.area);
    
    const mappedDoctors: DoctorInfo[] = doctorsFromService.map(doc => ({
        id: doc.id,
        name: doc.name,
        specialty: doc.specialty,
        address: doc.address,
        phone: doc.phone,
        area: doc.area,
        conditionsTreated: doc.conditionsTreated,
        imageUrl: doc.imageUrl,
    }));
    
    return { doctors: mappedDoctors };
  }
);

// Export types if they are intended to be used by other modules importing from this flow file.
// However, it's cleaner if other modules import types directly from the dedicated types file.
export type { RecommendDoctorsInput, RecommendDoctorsOutput, DoctorInfo };
