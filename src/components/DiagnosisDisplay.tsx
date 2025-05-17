
'use client';

import type { SymptomAnalyzerOutput } from '@/ai/types/symptom-analyzer.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Lightbulb, ListChecks } from 'lucide-react';

interface DiagnosisDisplayProps {
  analysis: SymptomAnalyzerOutput;
  onGetDiagnosis: () => Promise<void>;
  isLoading: boolean;
}

export function DiagnosisDisplay({ analysis, onGetDiagnosis, isLoading }: DiagnosisDisplayProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-primary" /> Initial Symptom Analysis
        </CardTitle>
        <CardDescription>Based on your input, here's an initial analysis. This is not a diagnosis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1 flex items-center">
            <ListChecks className="mr-2 h-5 w-5 text-primary" />
            Potential Conditions/Insights:
            </h3>
          <ScrollArea className="h-40 rounded-md border p-3 bg-accent/50">
            {Array.isArray(analysis.potentialConditions) && analysis.potentialConditions.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {analysis.potentialConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            ) : typeof analysis.potentialConditions === 'string' && analysis.potentialConditions ? (
                 <p className="text-sm whitespace-pre-wrap">{analysis.potentialConditions}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No specific potential conditions identified based on the input.</p>
            )}
          </ScrollArea>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1 flex items-center">
            <ListChecks className="mr-2 h-5 w-5 text-primary" />
            Recommendations for Next Steps:
          </h3>
          <ScrollArea className="h-40 rounded-md border p-3 bg-accent/50">
             {Array.isArray(analysis.recommendations) && analysis.recommendations.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            ) : typeof analysis.recommendations === 'string' && analysis.recommendations ? (
                 <p className="text-sm whitespace-pre-wrap">{analysis.recommendations}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No specific recommendations at this time. Consider consulting a healthcare professional for any concerns.</p>
            )}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onGetDiagnosis} disabled={isLoading} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <Brain className="mr-2 h-5 w-5" />
          {isLoading ? 'Suggesting Diagnosis...' : 'Suggest Possible Diagnoses'}
        </Button>
      </CardFooter>
    </Card>
  );
}

