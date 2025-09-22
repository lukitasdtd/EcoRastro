'use server';
/**
 * @fileOverview Provides information about gardening using an AI model.
 *
 * - getGardeningInfo - A function that takes a user query and returns information about gardening.
 * - GardeningInfoState - The state type for the getGardeningInfo Server Action.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Zod schema for input validation
const GardeningInfoInputSchema = z.object({
  gardeningQuery: z.string().min(5, { message: 'Por favor, escribe una pregunta más detallada.' }),
});

// Define the structure for the action's state, including potential errors and the final data.
export type GardeningInfoState = {
  message: string | null;
  gardeningInfo?: string | null;
  errors?: {
    gardeningQuery?: string[];
  };
};

/**
 * Server Action to get information about gardening.
 * @param prevState - The previous state of the action.
 * @param formData - The form data submitted by the user.
 * @returns The new state of the action.
 */
export async function getGardeningInfo(
  prevState: GardeningInfoState,
  formData: FormData
): Promise<GardeningInfoState> {
  // 1. Validate form data
  const validatedFields = GardeningInfoInputSchema.safeParse({
    gardeningQuery: formData.get('gardeningQuery'),
  });

  // 2. If validation fails, return errors
  if (!validatedFields.success) {
    return {
      message: 'La validación falló. Por favor, revisa tu pregunta.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. If validation is successful, call the Genkit flow
  try {
    const info = await gardeningInfoFlow({ query: validatedFields.data.gardeningQuery });
    return {
      message: '¡Respuesta generada!',
      gardeningInfo: info.response,
    };
  } catch (error) {
    console.error('Error in gardeningInfoFlow:', error);
    return {
      message: 'Ocurrió un error al consultar a nuestro experto de IA. Por favor, intenta de nuevo.',
    };
  }
}

// Define the Genkit prompt
const gardeningPrompt = ai.definePrompt({
  name: 'gardeningExpertPrompt',
  input: { schema: z.object({ query: z.string() }) },
  output: { schema: z.object({ response: z.string() }) },
  prompt: `Eres un experto en horticultura y agricultura urbana sostenible en Chile. Tu misión es proporcionar consejos prácticos, claros y amigables para principiantes. Un usuario tiene la siguiente pregunta:

  "{{{query}}}"

  Responde de manera completa pero concisa. Enfócate en soluciones que se puedan aplicar en un entorno doméstico o comunitario (balcones, patios, etc.). Si la pregunta es sobre plagas o enfermedades, recomienda primero soluciones orgánicas y caseras. Proporciona la información en pasos si es aplicable.`,
});

// Define the Genkit flow
const gardeningInfoFlow = ai.defineFlow(
  {
    name: 'gardeningInfoFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({ response: z.string() }),
  },
  async (input) => {
    const { output } = await gardeningPrompt(input);
    return output!;
  }
);