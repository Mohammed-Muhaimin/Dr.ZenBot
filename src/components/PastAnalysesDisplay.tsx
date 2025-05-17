
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { handleGetUserSymptomHistory } from '@/lib/actions';
import type { SymptomHistoryEntry } from '@/services/user-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ListChecks, ShieldAlert, CalendarDays } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { LoadingSpinner } from './LoadingSpinner';
import Link from 'next/link';
import { Button } from './ui/button';

interface PastAnalysesDisplayProps {
  // The key prop from parent will trigger re-mounts and thus re-fetch
}

export function PastAnalysesDisplay(props: PastAnalysesDisplayProps) {
  const { currentUser, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<SymptomHistoryEntry[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (currentUser) {
      setIsLoadingHistory(true);
      setError(null);
      handleGetUserSymptomHistory(currentUser.uid)
        .then((result) => {
          if ('error' in result) {
            setError(result.error);
            setHistory([]); // Clear history on error
          } else {
            setHistory(result);
          }
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch history.');
          setHistory([]); // Clear history on error
        })
        .finally(() => {
          setIsLoadingHistory(false);
        });
    } else {
      setIsLoadingHistory(false);
      setHistory([]); // Clear history if no user
    }
  }, [currentUser, authLoading, props]); // Added props to dependencies to react to key changes

  if (authLoading || isLoadingHistory) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
             <ShieldAlert className="mr-2 h-6 w-6 text-primary" /> Access Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Please log in to view your past symptom analyses and track your health journey.</p>
          <div className="flex gap-2">
            <Button asChild><Link href="/login">Login</Link></Button>
            <Button variant="outline" asChild><Link href="/signup">Sign Up</Link></Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading History</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Past Analyses</CardTitle>
          <CardDescription>Your symptom analysis history will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You haven&apos;t analyzed any symptoms yet, or your history has been cleared. Go to the AI Health Assistant to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Symptom Analysis History</CardTitle>
        <CardDescription>Review your past symptom analyses and insights.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh]">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {history.map((entry) => (
              <AccordionItem value={entry.id || ''} key={entry.id} className="border bg-card rounded-md px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {entry.timestamp ? format(entry.timestamp.toDate(), 'MMMM d, yyyy - h:mm a') : 'Date unknown'}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground truncate max-w-[200px] hidden md:block" title={entry.symptoms}>
                      {entry.symptoms.substring(0,30)}{entry.symptoms.length > 30 ? '...' : ''}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Symptoms Reported:</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-accent/30 p-2 rounded-md">{entry.symptoms}</p>
                  </div>
                  {entry.medicalHistoryAtTimeOfAnalysis && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Medical History (at time of analysis):</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-accent/30 p-2 rounded-md">{entry.medicalHistoryAtTimeOfAnalysis}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-sm mb-1 flex items-center">
                      <ListChecks className="mr-2 h-4 w-4 text-primary" />
                      Potential Conditions/Insights:
                    </h4>
                    {Array.isArray(entry.potentialConditions) && entry.potentialConditions.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {entry.potentialConditions.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No specific potential conditions were identified.</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 flex items-center">
                      <ListChecks className="mr-2 h-4 w-4 text-primary" />
                      Recommendations:
                    </h4>
                    {Array.isArray(entry.recommendations) && entry.recommendations.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {entry.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No specific recommendations were provided.</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
