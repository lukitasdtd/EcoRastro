'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { summarizePetReportAction, type ReportState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Info, LoaderCircle } from 'lucide-react';

const initialState: ReportState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Resumiendo...
        </>
      ) : (
        'Enviar Reporte'
      )}
    </Button>
  );
}

export function ReportForm() {
  const [state, formAction] = useActionState(summarizePetReportAction, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction}>
        <Card className="max-w-2xl mx-auto shadow-lg border-0">
          <CardHeader>
            <CardTitle>Enviar un Reporte</CardTitle>
            <CardDescription>
              Entrega detalles sobre la mascota perdida o encontrada. Nuestra IA lo resumirá y extraerá la ubicación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-2">
              <Label htmlFor="reportText">Detalles del Reporte</Label>
              <Textarea
                id="reportText"
                name="reportText"
                placeholder="Ej: 'Encontré un quiltro chico, de color café, cerca de la esquina de Irarrazaval con Manuel Montt. Tiene un collar azul pero sin placa. Es muy amistoso.'"
                rows={6}
                required
              />
               {state.errors?.reportText && (
                <p className="text-sm font-medium text-destructive mt-2">{state.errors.reportText}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
      
      {state.message && (
        <Alert variant={state.errors || !state.summary ? "destructive" : "default"} className="max-w-2xl mx-auto">
           {state.summary ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          <AlertTitle>{state.errors || !state.summary ? "Error al Procesar" : "Resumen Completo"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {state.summary && (
        <Card className="max-w-2xl mx-auto animate-in fade-in-50">
          <CardHeader>
            <CardTitle>Resumen Generado por IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground/90">Resumen del Reporte:</h3>
              <p className="text-foreground/80">{state.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground/90">Detalles de Ubicación:</h3>
              <p className="text-foreground/80">{state.location}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
