'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { findGardensAction, type GardenState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Info, Sprout } from 'lucide-react';

const initialState: GardenState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Finding Gardens...' : 'Find Gardens'}
    </Button>
  );
}

export function GardenFinder() {
  const [state, formAction] = useFormState(findGardensAction, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction}>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Find a Community Garden</CardTitle>
            <CardDescription>
              Tell us your interests and location, and we'll suggest gardens that are a great fit for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="userInterests">Your Interests</Label>
              <Textarea
                id="userInterests"
                name="userInterests"
                placeholder="e.g., 'I'm interested in growing organic vegetables, learning about composting, and meeting other local gardeners.'"
                rows={4}
                required
              />
              {state.errors?.userInterests && (
                  <p className="text-sm font-medium text-destructive">{state.errors.userInterests}</p>
              )}
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="userLocation">Your Location (City/Neighborhood)</Label>
              <Input
                id="userLocation"
                name="userLocation"
                placeholder="e.g., 'Downtown Cityville'"
                required
              />
              {state.errors?.userLocation && (
                  <p className="text-sm font-medium text-destructive">{state.errors.userLocation}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.message && (
        <Alert variant={state.suggestedGardens ? "default" : "destructive"} className="max-w-2xl mx-auto">
           {state.suggestedGardens ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          <AlertTitle>{state.suggestedGardens ? "Gardens Found!" : "Error"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {state.suggestedGardens && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              Suggested Gardens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 whitespace-pre-wrap">{state.suggestedGardens}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
