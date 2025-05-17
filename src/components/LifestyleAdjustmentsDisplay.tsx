
'use client';

import type { SuggestDiagnosisOutput } from '@/ai/types/diagnosis-suggestion.types';
import type { LifestyleAdjustmentsOutput } from '@/ai/types/lifestyle-adjustments.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Apple, Sparkles, ThumbsUp, Info } from 'lucide-react';

interface LifestyleAdjustmentsDisplayProps {
  diagnosisSuggestion: SuggestDiagnosisOutput;
  lifestyleAdjustments: LifestyleAdjustmentsOutput | null;
  onGetLifestyleAdjustments: (diagnosis: string) => Promise<void>;
  isLoadingDiagnosis: boolean;
  isLoadingLifestyle: boolean;
}

export function LifestyleAdjustmentsDisplay({
  diagnosisSuggestion,
  lifestyleAdjustments,
  onGetLifestyleAdjustments,
  isLoadingDiagnosis,
  isLoadingLifestyle,
}: LifestyleAdjustmentsDisplayProps) {
  const primaryDiagnosis = diagnosisSuggestion.possibleDiagnoses[0] || "General Wellness";

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-primary" /> AI-Powered Insights
        </CardTitle>
        <CardDescription>
          Here are potential diagnoses based on the symptom analysis. These are suggestions, not medical facts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Possible Diagnoses:</h3>
          {isLoadingDiagnosis ? (
            <p className="text-muted-foreground">Loading diagnosis suggestions...</p>
          ) : diagnosisSuggestion.possibleDiagnoses && diagnosisSuggestion.possibleDiagnoses.length > 0 ? (
            <ScrollArea className="h-48 rounded-md border p-3 bg-accent/50">
              <ul className="space-y-2">
                {diagnosisSuggestion.possibleDiagnoses.map((diag, index) => (
                  <li key={index} className="p-2 rounded-md bg-background shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{diag}</span>
                      <Badge variant="secondary" className="text-xs">
                        Confidence: {(diagnosisSuggestion.confidenceLevels[index] * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground">No specific diagnoses suggested.</p>
          )}
        </div>

        {diagnosisSuggestion.reasoning && !isLoadingDiagnosis && (
           <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-500" />
              Reasoning:
            </h3>
             <ScrollArea className="h-32 rounded-md border p-3 bg-accent/50">
                <p className="text-sm whitespace-pre-wrap">{diagnosisSuggestion.reasoning}</p>
             </ScrollArea>
          </div>
        )}

        {lifestyleAdjustments && !isLoadingLifestyle && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Apple className="mr-2 h-5 w-5 text-green-500" /> Personalized Lifestyle Adjustments:
            </h3>
             <ScrollArea className="h-48 rounded-md border p-3 bg-secondary/30">
              {lifestyleAdjustments.adjustments.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {lifestyleAdjustments.adjustments.map((adj, index) => (
                    <li key={index} className="flex items-start py-1">
                      <ThumbsUp className="h-4 w-4 mr-2 mt-0.5 text-primary shrink-0" />
                      <span>{adj}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific lifestyle adjustments available for this suggestion.</p>
              )}
            </ScrollArea>
          </div>
        )}
      </CardContent>
      {!lifestyleAdjustments && !isLoadingDiagnosis && diagnosisSuggestion.possibleDiagnoses.length > 0 && (
        <CardFooter>
          <Button
            onClick={() => onGetLifestyleAdjustments(primaryDiagnosis)}
            disabled={isLoadingLifestyle}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Activity className="mr-2 h-5 w-5" />
            {isLoadingLifestyle ? 'Fetching Adjustments...' : `Get Lifestyle Adjustments for "${primaryDiagnosis}"`}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

