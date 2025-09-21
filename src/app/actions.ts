'use server';

// TAREA 7: Implementación de Hooks y Fetch de datos
// Este archivo define las "Server Actions" de Next.js.
// Cumple con los siguientes requisitos del sprint:
// - Simula un "fetch" de datos, ya que estas funciones se ejecutan en el servidor de forma asíncrona.
// - Realiza la validación de datos del lado del servidor usando la librería Zod.
// - Contiene lógica para la gestión de errores (bloques try/catch). Si algo falla, se devuelve un estado de error.
// - Interactúa con una capa de IA (Genkit), demostrando cómo se pueden manejar operaciones asíncronas complejas.

import { z } from 'zod';
import { summarizeReport } from '@/ai/flows/real-time-report-summarization';
import { matchUserToGarden } from '@/ai/flows/community-garden-matching';
import { communityGardens } from '@/lib/data';

// Esquema de validación para el formulario de reporte de mascotas.
const reportSchema = z.object({
  reportText: z.string().min(10, { message: 'Por favor, proporciona más detalles en tu reporte.' }),
});

// Esquema de validación para el formulario de búsqueda de huertas.
const gardenSchema = z.object({
  userInterests: z.string().min(5, { message: 'Por favor, describe tus intereses.' }),
  userLocation: z.string().min(2, { message: 'Por favor, ingresa una ubicación válida.' }),
});

// Define la estructura del estado que devolverá la acción de reporte.
// Incluye mensajes, datos de éxito y errores de validación.
export type ReportState = {
  message?: string | null;
  summary?: string | null;
  location?: string | null;
  errors?: {
    reportText?: string[];
  }
}

// Server Action para procesar el reporte de una mascota.
// Es una función asíncrona que se ejecuta en el servidor.
export async function summarizePetReportAction(
  prevState: ReportState,
  formData: FormData
): Promise<ReportState> {
  // 1. Validar los datos del formulario.
  const validatedFields = reportSchema.safeParse({
    reportText: formData.get('reportText'),
  });

  // 2. Si la validación falla, devolver los errores.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'La validación falló. Por favor, revisa los datos ingresados.',
    };
  }

  // 3. Si la validación es exitosa, ejecutar la lógica asíncrona.
  try {
    // Llama al flujo de IA para resumir el reporte (simula un fetch a un servicio externo).
    const result = await summarizeReport({ reportText: validatedFields.data.reportText });
    // Devuelve un estado de éxito con los datos procesados.
    return { 
      message: '¡Reporte resumido con éxito!', 
      summary: result.summary,
      location: result.locationDetails,
    };
  } catch (error) {
    // 4. Gestión de errores: Si la llamada asíncrona falla, devuelve un mensaje de error.
    return { message: 'Ocurrió un error al resumir el reporte.' };
  }
}

// Define la estructura del estado para la búsqueda de huertas.
export type GardenState = {
    message?: string | null;
    suggestedGardens?: string | null;
    errors?: {
        userInterests?: string[];
        userLocation?: string[];
    }
}

// Server Action para encontrar huertas comunitarias.
export async function findGardensAction(
    prevState: GardenState,
    formData: FormData
): Promise<GardenState> {
    const validatedFields = gardenSchema.safeParse({
        userInterests: formData.get('userInterests'),
        userLocation: formData.get('userLocation'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'La validación falló. Por favor, revisa los datos ingresados.',
        };
    }

    try {
        const nearbyGardens = communityGardens.map(g => `${g.name} en ${g.location}: ${g.description}`).join('\n');
        const result = await matchUserToGarden({ ...validatedFields.data, nearbyGardens });
        return { 
            message: '¡Hemos encontrado algunas huertas para ti!',
            suggestedGardens: result.suggestedGardens,
        };
    } catch (error) {
        return { message: 'Ocurrió un error al buscar las huertas.' };
    }
}
