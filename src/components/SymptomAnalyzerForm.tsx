'use client';

import { useEffect, useState, useRef } from 'react'; // AUTH_DISABLED: useEffect for initialMedicalHistory will be simplified
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { SymptomAnalyzerInput } from '@/ai/types/symptom-analyzer.types';
import { handleAnalyzeMedicalReportImage } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import { FileScan } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
  medicalHistory: z.string().optional(),
});

type SymptomFormValues = z.infer<typeof formSchema>;

interface SymptomAnalyzerFormProps {
  onSubmit: (data: SymptomAnalyzerInput) => Promise<void>;
  isLoading: boolean;
  initialMedicalHistory?: string; // AUTH_DISABLED: This prop will always be undefined when auth is off
}

export function SymptomAnalyzerForm({ onSubmit, isLoading, initialMedicalHistory }: SymptomAnalyzerFormProps) {
  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      // AUTH_DISABLED: medicalHistory defaults to '', initialMedicalHistory prop is effectively ignored when auth is off
      medicalHistory: initialMedicalHistory || '', 
    },
  });
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzingReport, setIsAnalyzingReport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AUTH_DISABLED: The useEffect relying on initialMedicalHistory from userProfile is removed
  // as userProfile will be null. The default value is set above.
  // useEffect(() => {
  //   if (initialMedicalHistory !== undefined) {
  //     form.reset({ symptoms: form.getValues('symptoms'), medicalHistory: initialMedicalHistory });
  //   }
  // }, [initialMedicalHistory, form]);


  const handleSubmit: SubmitHandler<SymptomFormValues> = async (data) => {
    await onSubmit({ symptoms: data.symptoms, medicalHistory: data.medicalHistory });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleAnalyzeReport = async () => {
    if (!selectedFile) {
      toast({ title: "No File Selected", description: "Please select a medical report image to analyze.", variant: "destructive" });
      return;
    }

    setIsAnalyzingReport(true);
    toast({ title: "Analyzing Report", description: "Please wait while the report is being analyzed..." });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const result = await handleAnalyzeMedicalReportImage({ reportImageUri: base64data });

        if ('error' in result) {
          toast({ title: "Analysis Failed", description: result.error, variant: "destructive" });
        } else {
          const currentMedicalHistory = form.getValues('medicalHistory') || '';
          const newMedicalHistory = currentMedicalHistory 
            ? `${currentMedicalHistory}\n\n--- Extracted from report (${selectedFile.name}) ---\n${result.extractedMedicalProblems}`
            : `--- Extracted from report (${selectedFile.name}) ---\n${result.extractedMedicalProblems}`;
          form.setValue('medicalHistory', newMedicalHistory);
          toast({ title: "Analysis Complete", description: "Medical history updated with extracted information." });
          setSelectedFile(null); 
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
          }
        }
        setIsAnalyzingReport(false);
      };
      reader.onerror = () => {
        toast({ title: "File Read Error", description: "Could not read the selected file.", variant: "destructive" });
        setIsAnalyzingReport(false);
      };
    } catch (error) {
      console.error("Error analyzing report:", error);
      toast({ title: "Analysis Error", description: "An unexpected error occurred during report analysis.", variant: "destructive" });
      setIsAnalyzingReport(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Symptom Analyzer</CardTitle>
        <CardDescription>Describe your symptoms and relevant medical history. Our AI will provide potential insights.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="symptoms" className="font-medium">Current Symptoms</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      id="symptoms"
                      placeholder="e.g., persistent headache for 3 days, mild fever, fatigue..."
                      {...field}
                      rows={6}
                      className="resize-none"
                      aria-describedby="symptoms-help"
                    />
                  </FormControl>
                  <p id="symptoms-help" className="text-xs text-muted-foreground">
                    Please be as detailed as possible. Include onset, duration, severity, and any triggers.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="medicalHistory" className="font-medium">Medical History (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      id="medicalHistory"
                      placeholder="e.g., diagnosed with asthma, allergic to penicillin, currently taking vitamin D supplements..."
                      {...field}
                      rows={4}
                      className="resize-none"
                      aria-describedby="medical-history-help"
                    />
                  </FormControl>
                   <p id="medical-history-help" className="text-xs text-muted-foreground">
                    {/* AUTH_DISABLED: Modified help text for when auth is off */}
                    Include any pre-existing conditions, medications, allergies, or other relevant factors. You can also upload a medical report below to extract information.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="medical-report-upload">Upload Medical Report (Image)</Label>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <Input 
                  id="medical-report-upload" 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="flex-grow"
                  aria-describedby="report-upload-help"
                  disabled={isLoading || isAnalyzingReport}
                />
                <Button 
                  type="button" 
                  onClick={handleAnalyzeReport} 
                  disabled={isLoading || isAnalyzingReport || !selectedFile}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
                >
                  <FileScan className="mr-2 h-4 w-4" /> 
                  {isAnalyzingReport ? 'Analyzing...' : 'Analyze Report'}
                </Button>
              </div>
              <p id="report-upload-help" className="text-xs text-muted-foreground">
                Upload an image of your medical report (e.g., PNG, JPG). The AI will attempt to extract key medical problems and append them to your medical history above.
              </p>
              {selectedFile && <p className="text-xs text-muted-foreground">Selected: {selectedFile.name}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || isAnalyzingReport} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
