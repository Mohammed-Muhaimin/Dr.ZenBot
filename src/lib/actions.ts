
'use server';

import { analyzeSymptoms } from '@/ai/flows/symptom-analyzer';
import type { SymptomAnalyzerInput, SymptomAnalyzerOutput } from '@/ai/types/symptom-analyzer.types';

import { suggestDiagnosis } from '@/ai/flows/diagnosis-suggestion';
import type { SuggestDiagnosisInput, SuggestDiagnosisOutput } from '@/ai/types/diagnosis-suggestion.types';

import { getLifestyleAdjustments } from '@/ai/flows/lifestyle-adjustments';
import type { LifestyleAdjustmentsInput, LifestyleAdjustmentsOutput } from '@/ai/types/lifestyle-adjustments.types';

import { recommendDoctors } from '@/ai/flows/recommend-doctors-flow';
import type { RecommendDoctorsInput, RecommendDoctorsOutput } from '@/ai/types/recommend-doctors.types';

import { analyzeMedicalReportImage } from '@/ai/flows/medical-report-analyzer';
import type { MedicalReportAnalyzerInput, MedicalReportAnalyzerOutput } from '@/ai/types/medical-report-analyzer.types';

import { 
  saveSymptomAnalysis as saveSymptomAnalysisToDb, 
  getUserSymptomHistory as getUserSymptomHistoryFromDb, 
  deleteUserSymptomHistory as deleteUserSymptomHistoryFromDb, // Import new service function
  type SymptomHistoryEntry 
} from '@/services/user-service';

export async function handleAnalyzeSymptoms(input: SymptomAnalyzerInput, userId?: string): Promise<SymptomAnalyzerOutput | { error: string }> {
  try {
    const result = await analyzeSymptoms(input);
    if (userId && !('error' in result)) {
      await saveSymptomAnalysisToDb(userId, input, result);
    }
    return result;
  } catch (error) {
    console.error("Error in handleAnalyzeSymptoms:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred during symptom analysis." };
  }
}

export async function handleSuggestDiagnosis(input: SuggestDiagnosisInput): Promise<SuggestDiagnosisOutput | { error: string }> {
  try {
    const result = await suggestDiagnosis(input);
    return result;
  } catch (error) {
    console.error("Error in handleSuggestDiagnosis:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred during diagnosis suggestion." };
  }
}

export async function handleGetLifestyleAdjustments(input: LifestyleAdjustmentsInput): Promise<LifestyleAdjustmentsOutput | { error: string }> {
  try {
    const result = await getLifestyleAdjustments(input);
    return result;
  } catch (error) {
    console.error("Error in handleGetLifestyleAdjustments:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred while fetching lifestyle adjustments." };
  }
}

export async function handleRecommendDoctors(input: RecommendDoctorsInput): Promise<RecommendDoctorsOutput | { error: string }> {
  try {
    const result = await recommendDoctors(input);
    return result;
  } catch (error) {
    console.error("Error in handleRecommendDoctors:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred while fetching doctor recommendations." };
  }
}

export async function handleGetUserSymptomHistory(userId: string): Promise<SymptomHistoryEntry[] | { error: string }> {
  try {
    const history = await getUserSymptomHistoryFromDb(userId);
    return history;
  } catch (error) {
    console.error("Error in handleGetUserSymptomHistory:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred while fetching symptom history." };
  }
}

export async function handleAnalyzeMedicalReportImage(input: MedicalReportAnalyzerInput): Promise<MedicalReportAnalyzerOutput | { error: string }> {
  try {
    const result = await analyzeMedicalReportImage(input);
    return result;
  } catch (error) {
    console.error("Error in handleAnalyzeMedicalReportImage:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred during medical report analysis." };
  }
}

export async function handleDeleteUserSymptomHistory(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId) {
      return { success: false, error: "User not authenticated." };
    }
    await deleteUserSymptomHistoryFromDb(userId);
    return { success: true };
  } catch (error) {
    console.error("Error in handleDeleteUserSymptomHistory:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred while deleting history." };
  }
}
