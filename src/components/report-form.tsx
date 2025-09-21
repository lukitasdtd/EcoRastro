'use client';

// TAREA 7: Implementación de Hooks en React
// Este componente demuestra el uso de Hooks para manejar un formulario complejo.
// Cumple con los siguientes requisitos del sprint:
// - Implementación de `useActionState` para gestionar el ciclo de vida del estado del formulario.
// - Implementación de `useFormStatus` para mostrar un indicador de carga mientras se procesa la solicitud.
// - Gestión de errores y respuestas no exitosas, mostrando mensajes al usuario según la respuesta del servidor.

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { summarizePetReportAction, type ReportState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Info, LoaderCircle } from 'lucide-react';

// Define el estado inicial para el formulario.
const initialState: ReportState = {
  message: null,
};

// Componente del botón de envío que utiliza el Hook `useFormStatus`.
function SubmitButton() {
  const { pending } = useFormStatus(); // `pending` será `true` cuando el formulario se esté enviando.

  return (
    // El botón se deshabilita y muestra un spinner de carga (indicador de espera) cuando `pending` es `true`.
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
  // Hook `useActionState` para conectar el estado del componente con una Server Action.
  // - `state`: contiene la respuesta del servidor (éxito, error, datos).
  // - `formAction`: la función que se ejecutará en el servidor al enviar el formulario.
  // - `initialState`: el estado inicial del formulario.
  const [state, formAction] = useActionState(summarizePetReportAction, initialState);

  return (
    <div className="space-y-6">
      {/* El `action` del formulario apunta a la Server Action gestionada por el Hook. */}
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
               {/* Gestión de errores: Muestra los errores de validación que vienen en el objeto `state`. */}
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
      
      {/* Renderizado condicional basado en la respuesta del servidor. */}
      {/* Muestra una alerta con el resultado de la operación. */}
      {state.message && (
        <Alert variant={state.errors || !state.summary ? "destructive" : "default"} className="max-w-2xl mx-auto">
           {state.summary ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          <AlertTitle>{state.errors || !state.summary ? "Error al Procesar" : "Resumen Completo"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Si la operación fue exitosa (`state.summary` existe), muestra los resultados. */}
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
