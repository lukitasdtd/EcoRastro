'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { summarizePetReportAction, type ReportState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Info } from 'lucide-react';

const initialState: ReportState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Summarizing...' : 'Submit Report'}
    </Button>
  );
}

export function ReportForm() {
  const [state, formAction] = useFormState(summarizePetReportAction, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction}>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Submit a Report</CardTitle>
            <CardDescription>
              Provide details about the lost or found pet. Our AI will summarize it and extract the location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-2">
              <Label htmlFor="reportText">Report Details</Label>
              <Textarea
                id="reportText"
                name="reportText"
                placeholder="e.g., 'Found a small, brown terrier mix near the corner of Oak & Main St. It has a blue collar but no tags. Very friendly.'"
                rows={6}
                required
              />
               {state.errors?.reportText && (
                <p className="text-sm font-medium text-destructive">{state.errors.reportText}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
      
      {state.message && (
        <Alert variant={state.summary ? "default" : "destructive"} className="max-w-2xl mx-auto">
           {state.summary ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          <AlertTitle>{state.summary ? "Summary Complete" : "Error"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {state.summary && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>AI Generated Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Report Summary:</h3>
              <p className="text-foreground/80">{state.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location Details:</h3>
              <p className="text-foreground/80">{state.location}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
