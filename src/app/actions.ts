'use server';

import { z } from 'zod';
import { summarizeReport } from '@/ai/flows/real-time-report-summarization';
import { matchUserToGarden } from '@/ai/flows/community-garden-matching';
import { communityGardens } from '@/lib/data';

const reportSchema = z.object({
  reportText: z.string().min(10, { message: 'Please provide more details in your report.' }),
});

const gardenSchema = z.object({
  userInterests: z.string().min(5, { message: 'Please describe your interests.' }),
  userLocation: z.string().min(2, { message: 'Please enter a valid location.' }),
});

export type ReportState = {
  message?: string | null;
  summary?: string | null;
  location?: string | null;
  errors?: {
    reportText?: string[];
  }
}

export async function summarizePetReportAction(
  prevState: ReportState,
  formData: FormData
): Promise<ReportState> {
  const validatedFields = reportSchema.safeParse({
    reportText: formData.get('reportText'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }

  try {
    const result = await summarizeReport({ reportText: validatedFields.data.reportText });
    return { 
      message: 'Report summarized successfully!', 
      summary: result.summary,
      location: result.locationDetails,
    };
  } catch (error) {
    return { message: 'An error occurred while summarizing the report.' };
  }
}

export type GardenState = {
    message?: string | null;
    suggestedGardens?: string | null;
    errors?: {
        userInterests?: string[];
        userLocation?: string[];
    }
}

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
            message: 'Validation failed. Please check your input.',
        };
    }

    try {
        const nearbyGardens = communityGardens.map(g => `${g.name} at ${g.location}: ${g.description}`).join('\n');
        const result = await matchUserToGarden({ ...validatedFields.data, nearbyGardens });
        return { 
            message: 'We found some gardens for you!',
            suggestedGardens: result.suggestedGardens,
        };
    } catch (error) {
        return { message: 'An error occurred while finding gardens.' };
    }
}