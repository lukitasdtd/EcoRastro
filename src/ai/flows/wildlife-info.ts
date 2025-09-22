'use server';
/**
 * @fileOverview Provides information about Chilean wildlife using an AI model.
 *
 * - getWildlifeInfo - A function that takes a user query and returns information about Chilean wildlife.
 * - WildlifeInfoState - The state type for the getWildlifeInfo Server Action.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Zod schema for input validation
const WildlifeInfoInputSchema = z.object({
  wildlifeQuery: z.string().min(5, { message: 'Por favor, escribe una pregunta más detallada.' }),
});

const WildlifeInfoOutputSchema = z.object({ response: z.string() });


// Define the structure for the action's state
export type WildlifeInfoState = {
  message: string | null;
  wildlifeInfo?: string | null;
  errors?: {
    wildlifeQuery?: string[];
  };
};

// Define the Genkit prompt
const wildlifePrompt = ai.definePrompt({
  name: 'wildlifeExpertPrompt',
  input: { schema: WildlifeInfoInputSchema },
  output: { schema: WildlifeInfoOutputSchema },
  prompt: `Eres un experto en fauna silvestre y ecosistemas de Chile. Tu misión es proporcionar información educativa, clara y precisa. Un usuario tiene la siguiente pregunta:

  "{{{wildlifeQuery}}}"

  Responde de manera amigable y completa, pero concisa. Enfócate en aspectos como el hábitat, alimentación, comportamiento, estado de conservación y cómo las personas pueden ayudar a proteger a la especie. Si la pregunta es sobre una situación, da consejos prácticos y seguros, siempre recomendando contactar a la autoridad competente (SAG en Chile) si es necesario.`,
});


/**
 * Server Action to get information about Chilean wildlife.
 * @param prevState - The previous state of the action.
 * @param formData - The form data submitted by the user.
 * @returns The new state of the action.
 */
export async function getWildlifeInfo(
  prevState: WildlifeInfoState,
  formData: FormData
): Promise<WildlifeInfoState> {
  // 1. Validate form data
  const validatedFields = WildlifeInfoInputSchema.safeParse({
    wildlifeQuery: formData.get('wildlifeQuery'),
  });

  // 2. If validation fails, return errors
  if (!validatedFields.success) {
    return {
      message: 'La validación falló. Por favor, revisa tu pregunta.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. If validation is successful, call the Genkit prompt directly
  try {
    const { output } = await wildlifePrompt(validatedFields.data);

    if (!output) {
      throw new Error("La IA no generó una respuesta.");
    }

    return {
      message: '¡Respuesta generada!',
      wildlifeInfo: output.response,
    };
  } catch (error) {
    console.error('Error in wildlifePrompt:', error);
    return {
      message: 'Ocurrió un error al consultar a nuestro experto de IA. Por favor, intenta de nuevo.',
    };
  }
}
