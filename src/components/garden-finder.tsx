'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
      {pending ? 'Buscando huertas...' : 'Buscar Huertas'}
    </Button>
  );
}

export function GardenFinder() {
  const [state, formAction] = useActionState(findGardensAction, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction}>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Encuentra una Huerta Comunitaria</CardTitle>
            <CardDescription>
              Dinos qué te interesa y dónde estás, y te sugeriremos huertas ideales para ti.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="userInterests">Tus Intereses</Label>
              <Textarea
                id="userInterests"
                name="userInterests"
                placeholder="Ej: 'Me interesa cultivar verduras orgánicas, aprender de compostaje y conocer a otros hortelanos.'"
                rows={4}
                required
              />
              {state.errors?.userInterests && (
                  <p className="text-sm font-medium text-destructive">{state.errors.userInterests}</p>
              )}
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="userLocation">Tu Ubicación (Comuna/Barrio)</Label>
              <Input
                id="userLocation"
                name="userLocation"
                placeholder="Ej: 'Ñuñoa, Santiago'"
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
          <AlertTitle>{state.suggestedGardens ? "¡Huertas Encontradas!" : "Error"}</AlertTitle>
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
              Huertas Sugeridas
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
