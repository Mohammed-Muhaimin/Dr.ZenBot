
'use client';

import { useState, useEffect, useCallback } from 'react';
import { DrZenBotLogo } from '@/components/DrZenBotLogo';
import { SymptomAnalyzerForm } from '@/components/SymptomAnalyzerForm';
import { DiagnosisDisplay } from '@/components/DiagnosisDisplay';
import { LifestyleAdjustmentsDisplay } from '@/components/LifestyleAdjustmentsDisplay';
import { DoctorRecommendationsDisplay } from '@/components/DoctorRecommendationsDisplay';
import { PastAnalysesDisplay } from '@/components/PastAnalysesDisplay'; 
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Disclaimer } from '@/components/Disclaimer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Users, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { AuthButtons } from '@/components/AuthButtons'; // AUTH_DISABLED: This will render null
import { SettingsMenu } from '@/components/SettingsMenu';

import type { SymptomAnalyzerInput, SymptomAnalyzerOutput } from '@/ai/types/symptom-analyzer.types';
import type { SuggestDiagnosisInput, SuggestDiagnosisOutput } from '@/ai/types/diagnosis-suggestion.types';
import type { LifestyleAdjustmentsInput, LifestyleAdjustmentsOutput } from '@/ai/types/lifestyle-adjustments.types';
import type { RecommendDoctorsInput, RecommendDoctorsOutput } from '@/ai/types/recommend-doctors.types';

import { handleAnalyzeSymptoms, handleSuggestDiagnosis, handleGetLifestyleAdjustments, handleRecommendDoctors } from '@/lib/actions';

type AppStep = 'inputSymptoms' | 'showSymptomAnalysis' | 'showDiagnosisSuggestion' | 'showLifestyleAdjustments' | 'showDoctorRecommendations';

export default function AssistantPage() {
  const { currentUser, userProfile, loading: authLoading } = useAuth(); // AUTH_DISABLED: currentUser, userProfile will be null, authLoading false
  const [currentStep, setCurrentStep] = useState<AppStep>('inputSymptoms');
  const [symptomInput, setSymptomInput] = useState<SymptomAnalyzerInput | null>(null);
  const [symptomAnalysisResult, setSymptomAnalysisResult] = useState<SymptomAnalyzerOutput | null>(null);
  const [diagnosisSuggestionResult, setDiagnosisSuggestionResult] = useState<SuggestDiagnosisOutput | null>(null);
  const [lifestyleAdjustmentsResult, setLifestyleAdjustmentsResult] = useState<LifestyleAdjustmentsOutput | null>(null);
  const [doctorRecommendations, setDoctorRecommendations] = useState<RecommendDoctorsOutput | null>(null);
  const [searchArea, setSearchArea] = useState('');
  
  const [isLoadingSymptomAnalysis, setIsLoadingSymptomAnalysis] = useState(false);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);
  const [isLoadingLifestyle, setIsLoadingLifestyle] = useState(false);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [initialMedicalHistory, setInitialMedicalHistory] = useState<string | undefined>(undefined); // AUTH_DISABLED: Will remain undefined
  const [historyClearedTimestamp, setHistoryClearedTimestamp] = useState<number>(0);
  const [isPageMounted, setIsPageMounted] = useState(false);

  useEffect(() => {
    setIsPageMounted(true);
  }, []);


  useEffect(() => {
    // AUTH_DISABLED: This effect will result in initialMedicalHistory being undefined
    if (currentUser && userProfile) {
      // setInitialMedicalHistory(userProfile.medicalHistory || '');
    } else {
      setInitialMedicalHistory(undefined);
    }
  }, [currentUser, userProfile]);

  const resetFlow = () => {
    setCurrentStep('inputSymptoms');
    setSymptomInput(null);
    setSymptomAnalysisResult(null);
    setDiagnosisSuggestionResult(null);
    setLifestyleAdjustmentsResult(null);
    setDoctorRecommendations(null);
    setSearchArea('');
    setError(null);
  };

  const onSymptomSubmit = async (data: SymptomAnalyzerInput) => {
    // AUTH_DISABLED: currentUser is null, so no toast about login for features
    // if (!currentUser && currentStep !== 'inputSymptoms') { 
    //     toast({ title: "Login Required", description: "Please login or sign up to save your analysis and use all features.", variant: "default" });
    // }

    setIsLoadingSymptomAnalysis(true);
    setError(null);
    setSymptomInput(data);
    try {
      // AUTH_DISABLED: currentUser?.uid will be undefined, handleAnalyzeSymptoms will not save history
      const result = await handleAnalyzeSymptoms(data, currentUser?.uid); 
      if ('error' in result) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else {
        setSymptomAnalysisResult(result);
        setCurrentStep('showSymptomAnalysis');
        toast({ title: "Analysis Complete", description: "Initial symptom analysis is ready." });
        // AUTH_DISABLED: History saving related timestamp update removed
        // if (currentUser) { 
        //   setHistoryClearedTimestamp(Date.now()); 
        // }
      }
    } catch (e) {
      console.error("Symptom analysis submission critical error:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred during symptom analysis.";
      setError(errorMessage);
      toast({ title: "Critical Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingSymptomAnalysis(false);
    }
  };

  const onGetDiagnosis = async () => {
    if (!symptomInput || !symptomInput.symptoms) {
      setError("Symptom data is missing.");
      toast({ title: "Error", description: "Symptom data is missing.", variant: "destructive" });
      return;
    }
    setIsLoadingDiagnosis(true);
    setError(null);
    try {
      const diagnosisInput: SuggestDiagnosisInput = {
        symptoms: symptomInput.symptoms,
        medicalHistory: symptomInput.medicalHistory,
      };
      const result = await handleSuggestDiagnosis(diagnosisInput);
      if ('error' in result) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else {
        setDiagnosisSuggestionResult(result);
        setCurrentStep('showDiagnosisSuggestion');
        toast({ title: "Diagnosis Suggested", description: "Potential diagnoses are now available." });
      }
    } catch (e) {
      console.error("Get diagnosis critical error:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred while suggesting diagnosis.";
      setError(errorMessage);
      toast({ title: "Critical Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  const onGetLifestyleAdjustments = async (diagnosis: string) => {
    setIsLoadingLifestyle(true);
    setError(null);
    try {
      const lifestyleInput: LifestyleAdjustmentsInput = { diagnosis };
      const result = await handleGetLifestyleAdjustments(lifestyleInput);
      if ('error' in result) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else {
        setLifestyleAdjustmentsResult(result);
        toast({ title: "Adjustments Ready", description: "Lifestyle suggestions are available." });
      }
    } catch (e) {
      console.error("Get lifestyle adjustments critical error:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred while fetching lifestyle adjustments.";
      setError(errorMessage);
      toast({ title: "Critical Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingLifestyle(false);
    }
  };

  const onFindDoctors = async () => {
    if (!diagnosisSuggestionResult || diagnosisSuggestionResult.possibleDiagnoses.length === 0) {
      setError("No diagnoses available to find doctors.");
      toast({ title: "Error", description: "No diagnoses available.", variant: "destructive" });
      return;
    }
    setIsLoadingDoctors(true);
    setError(null);
    const doctorsInput: RecommendDoctorsInput = {
      diagnoses: diagnosisSuggestionResult.possibleDiagnoses,
      area: searchArea.trim() || undefined,
    };
    try {
      const result = await handleRecommendDoctors(doctorsInput);
      if ('error' in result) {
        setError(result.error);
        setDoctorRecommendations({ doctors: [] }); 
        toast({ title: "Doctor Search Error", description: result.error, variant: "destructive" });
      } else {
        setDoctorRecommendations(result);
        toast({ title: "Doctors Found", description: "Recommended doctors are now available." });
      }
      setCurrentStep('showDoctorRecommendations'); 
    } catch (e) {
        console.error("Critical error in onFindDoctors:", e);
        const errorMessage = e instanceof Error ? e.message : "An unexpected critical error occurred.";
        setError(errorMessage);
        setDoctorRecommendations({ doctors: [] }); 
        toast({ title: "Critical Error", description: `Failed to process doctor search: ${errorMessage}`, variant: "destructive" });
        setCurrentStep('showDoctorRecommendations');
    } finally {
      setIsLoadingDoctors(false);
    }
  };

  const handleSearchAnotherArea = () => {
    setDoctorRecommendations(null);
    setSearchArea('');
    setCurrentStep('showDiagnosisSuggestion');
    setError(null);
    toast({ title: "New Search", description: "Enter a new area to find doctors."});
  };
  
  const [activeTab, setActiveTab] = useState("analyzer");

  const handleHistoryCleared = useCallback(() => {
    // AUTH_DISABLED: This callback is for SettingsMenu, but history clearing is tied to currentUser.
    setHistoryClearedTimestamp(Date.now()); 
  }, []);


  if (authLoading) { // AUTH_DISABLED: authLoading should be false quickly due to AuthContext changes
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <DrZenBotLogo />
        <LoadingSpinner />
        <p className="text-muted-foreground mt-2">Loading your session...</p>
      </div>
    );
  }

  const shouldShowDoctorSearchCard = currentStep === 'showDiagnosisSuggestion' && diagnosisSuggestionResult && !doctorRecommendations;
  const shouldShowDoctorResults = currentStep === 'showDoctorRecommendations' && doctorRecommendations;

  return (
    <div className={`flex flex-col min-h-screen bg-background ${isPageMounted ? 'animate-in fade-in-0 duration-300' : 'opacity-0'}`}>
      <header className="p-4 border-b shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <DrZenBotLogo />
          <div className="flex items-center space-x-2">
            <AuthButtons /> {/* AUTH_DISABLED: This will render null */}
            {/* AUTH_DISABLED: SettingsMenu will hide "Clear History" as currentUser is null */}
            <SettingsMenu onHistoryCleared={handleHistoryCleared} /> 
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6 rounded-lg">
            <TabsTrigger value="analyzer" className="text-sm md:text-base px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Health Assistant</TabsTrigger>
            <TabsTrigger value="progress" className="text-sm md:text-base px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer">
            <Disclaimer />
            {error && currentStep !== 'inputSymptoms' && ( 
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>An Error Occurred</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {currentStep !== 'inputSymptoms' && (
              <Button onClick={resetFlow} variant="secondary" className="mb-6 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-white">
                <RefreshCw className="mr-2 h-4 w-4" /> Start Over
              </Button>
            )}

            {currentStep === 'inputSymptoms' && (
              <SymptomAnalyzerForm 
                onSubmit={onSymptomSubmit} 
                isLoading={isLoadingSymptomAnalysis} 
                initialMedicalHistory={initialMedicalHistory} // AUTH_DISABLED: will be undefined
              />
            )}
            {isLoadingSymptomAnalysis && currentStep === 'inputSymptoms' && <LoadingSpinner />}

            {currentStep >= 'showSymptomAnalysis' && currentStep !== 'inputSymptoms' && symptomAnalysisResult && (
              <DiagnosisDisplay
                analysis={symptomAnalysisResult}
                onGetDiagnosis={onGetDiagnosis}
                isLoading={isLoadingDiagnosis}
              />
            )}
            {isLoadingDiagnosis && currentStep === 'showSymptomAnalysis' && <LoadingSpinner />}
            
            {(currentStep >= 'showDiagnosisSuggestion') && diagnosisSuggestionResult && (
              <div className="mt-6 space-y-6">
                 <LifestyleAdjustmentsDisplay
                    diagnosisSuggestion={diagnosisSuggestionResult}
                    lifestyleAdjustments={lifestyleAdjustmentsResult}
                    onGetLifestyleAdjustments={onGetLifestyleAdjustments}
                    isLoadingDiagnosis={isLoadingDiagnosis} 
                    isLoadingLifestyle={isLoadingLifestyle}
                  />
                  {isLoadingLifestyle && currentStep !== 'showDoctorRecommendations' && <LoadingSpinner />}

                {shouldShowDoctorSearchCard && !isLoadingDoctors && (
                  <Card className="mt-6 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center">
                        <Users className="mr-2 h-6 w-6 text-primary" /> Find a Doctor
                      </CardTitle>
                      <CardDescription>
                        Based on your suggested diagnoses, find local specialists.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2 text-sm text-muted-foreground">
                          Optionally, enter your area (e.g., city or zip code) to narrow down the search.
                        </p>
                        <Input 
                          placeholder="Enter your area (e.g., Springfield)" 
                          value={searchArea} 
                          onChange={(e) => setSearchArea(e.target.value)}
                          className="mb-4"
                          aria-label="Search area for doctors"
                        />
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={onFindDoctors} 
                        disabled={isLoadingDoctors || !diagnosisSuggestionResult?.possibleDiagnoses.length} 
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Search className="mr-2 h-5 w-5" />
                        {isLoadingDoctors ? 'Finding Doctors...' : 'Find Doctors'}
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {shouldShowDoctorResults && !isLoadingDoctors && (
                  <DoctorRecommendationsDisplay 
                    recommendations={doctorRecommendations!} 
                    onSearchAnotherArea={handleSearchAnotherArea} 
                  />
                )}
                {isLoadingDoctors && currentStep !== 'inputSymptoms' && <LoadingSpinner />}
              </div>
            )}
          </TabsContent>
          <TabsContent value="progress">
            {/* AUTH_DISABLED: PastAnalysesDisplay will show its "login required" message */}
            <PastAnalysesDisplay key={historyClearedTimestamp} /> 
          </TabsContent>
        </Tabs>
      </main>

      <footer className="p-4 border-t mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dr.ZenBot. All rights reserved. For informational purposes only.
          <br />
          Created by "The Hacktivists" for Hackfinity.
        </div>
      </footer>
    </div>
  );
}
