'use client';

// TAREA 7: Implementación de Hooks en React
// Este componente de formulario demuestra el uso de Hooks modernos de React para interactuar con Server Actions.
// Cumple con los siguientes requisitos del sprint:
// - Implementación correcta de `useActionState` (Punto 12): Maneja el estado del formulario (entradas, errores, respuesta del servidor)
//   de una manera diseñada específicamente para Server Actions.
// - Implementación de `useFormStatus` (Punto 14): Proporciona un indicador de carga visual mientras el formulario se está enviando.
// - Verificación de la gestión de errores (Punto 13): El estado `state` contiene los errores de validación que vienen del servidor
//   y se muestran en la UI para informar al usuario.

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { findGardensAction, type GardenState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Info, Sprout, LoaderCircle } from 'lucide-react';

// Estado inicial que se pasará al hook `useActionState`.
const initialState: GardenState = {
  message: null,
};

// Componente para el botón de envío.
// Utiliza el Hook `useFormStatus` para obtener el estado de envío del formulario padre.
function SubmitButton() {
  const { pending } = useFormStatus(); // `pending` es `true` mientras el formulario se está enviando.

  return (
    // Se deshabilita el botón y se muestra un ícono de carga mientras `pending` es true.
    // Esto es un indicador de carga para mejorar la experiencia del usuario (Punto 14).
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Buscando...
        </>
      ): (
        'Buscar Huertas'
      )}
    </Button>
  );
}

export function GardenFinder() {
  // Hook `useActionState`: maneja el estado del formulario asociado a una Server Action.
  // - `state`: el estado actual del formulario (contiene mensajes, errores, y los datos devueltos por la acción).
  // - `formAction`: la función que se pasa al atributo `action` del formulario.
  // - `initialState`: el estado con el que comienza el formulario.
  const [state, formAction] = useActionState(findGardensAction, initialState);

  return (
    <div className="space-y-6">
      {/* El atributo `action` del formulario se vincula con la Server Action gestionada por el hook. */}
      <form action={formAction}>
        <Card className="max-w-2xl mx-auto shadow-lg border-0">
          <CardHeader>
            <CardTitle>Encuentra tu Huerta Comunitaria</CardTitle>
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
              {/* TAREA 7: Gestión de errores (Punto 13) */}
              {/* Muestra los errores de validación si existen en el `state` devuelto por la Server Action. */}
              {state.errors?.userInterests && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.errors.userInterests}</p>
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
                  <p className="text-sm font-medium text-destructive mt-2">{state.errors.userLocation}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {/* El botón de envío es un componente separado que reacciona al estado del formulario. */}
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {/* Muestra una alerta con el mensaje de éxito o error después del envío. */}
      {state.message && (
        <Alert variant={state.errors || !state.suggestedGardens ? "destructive" : "default"} className="max-w-2xl mx-auto">
           {state.suggestedGardens ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          <AlertTitle>{state.errors || !state.suggestedGardens ? "Error en la Búsqueda" : "¡Huertas Encontradas!"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Si la búsqueda fue exitosa y hay sugerencias, se renderiza la tarjeta con los resultados. */}
      {state.suggestedGardens && (
        <Card className="max-w-2xl mx-auto animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              Huertas Sugeridas para Ti
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
