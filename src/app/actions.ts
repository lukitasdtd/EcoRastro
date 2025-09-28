'use server';

// TAREA 7: Implementación de Hooks y Fetch de datos

import { z } from 'zod';
import { summarizeReport } from '@/ai/flows/real-time-report-summarization';
import { matchUserToGarden } from '@/ai/flows/community-garden-matching';
// CORRECCIÓN: Se importa `gardenPoints` en lugar del inexistente `communityGardens`
import { gardenPoints } from '@/lib/data';

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
export type ReportState = {
  message?: string | null;
  summary?: string | null;
  location?: string | null;
  errors?: {
    reportText?: string[];
  }
}

// Server Action para procesar el reporte de una mascota.
export async function summarizePetReportAction(
  prevState: ReportState,
  formData: FormData
): Promise<ReportState> {
  // 1. Validar los datos del formulario.
  const validatedFields = reportSchema.safeParse({
    reportText: formData.get('reportText'),
  });

  // 2. Si la validación falla, devolver errores.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'La validación falló. Por favor, revisa los datos ingresados.',
    };
  }

  // 3. Si la validación es exitosa, ejecutar lógica asíncrona.
  try {
    const result = await summarizeReport({ reportText: validatedFields.data.reportText });
    return { 
      message: '¡Reporte resumido con éxito!', 
      summary: result.summary,
      location: result.locationDetails,
    };
  } catch (error) {
    // 4. Gestión de errores.
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
    // 1. Validar datos.
    const validatedFields = gardenSchema.safeParse({
        userInterests: formData.get('userInterests'),
        userLocation: formData.get('userLocation'),
    });

    // 2. Gestionar fallo de validación.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'La validación falló. Por favor, revisa los datos ingresados.',
        };
    }

    // 3. Ejecutar lógica asíncrona si la validación es exitosa.
    try {
        // CORRECCIÓN: Se usa `gardenPoints` y se adapta a su estructura (`title` y `desc`).
        const nearbyGardens = gardenPoints.map(g => `${g.title}: ${g.desc}`).join('\n');
        
        // Se llama al flujo de IA con los datos correctos.
        const result = await matchUserToGarden({ ...validatedFields.data, nearbyGardens });
        
        // Se devuelve un estado de éxito.
        return { 
            message: '¡Hemos encontrado algunas huertas para ti!',
            suggestedGardens: result.suggestedGardens,
        };
    } catch (error) {
        // 4. Gestión de errores.
        return { message: 'Ocurrió un error al buscar las huertas.' };
    }
}
