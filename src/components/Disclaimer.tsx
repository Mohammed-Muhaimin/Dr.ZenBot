
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Disclaimer() {
  return (
    <Alert variant="destructive" className="my-4 bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200">
      <AlertCircle className="h-4 w-4 !text-yellow-800 dark:!text-yellow-200" />
      <AlertTitle className="font-semibold">Important Disclaimer</AlertTitle>
      <AlertDescription>
        Dr.ZenBot is an AI-powered tool and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or received from Dr.ZenBot.
      </AlertDescription>
    </Alert>
  );
}
