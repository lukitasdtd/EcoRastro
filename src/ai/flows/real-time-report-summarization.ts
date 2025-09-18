'use server';
/**
 * @fileOverview Summarizes real-time reports of lost or found pets,
 * extracting key information and location details.
 *
 * - summarizeReport - A function that summarizes the report.
 * - RealTimeReportInput - The input type for the summarizeReport function.
 * - RealTimeReportOutput - The return type for the summarizeReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealTimeReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The real-time report text of a lost or found pet.'),
});
export type RealTimeReportInput = z.infer<typeof RealTimeReportInputSchema>;

const RealTimeReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the report.'),
  locationDetails: z
    .string()
    .describe('Extracted location details from the report.'),
});
export type RealTimeReportOutput = z.infer<typeof RealTimeReportOutputSchema>;

export async function summarizeReport(
  input: RealTimeReportInput
): Promise<RealTimeReportOutput> {
  return summarizeReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeReportSummarizationPrompt',
  input: {schema: RealTimeReportInputSchema},
  output: {schema: RealTimeReportOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing real-time reports of lost or found pets and extracting location details.

  Report: {{{reportText}}}

  Please provide a concise summary of the report and extract any location details mentioned in the report.
  Summary:
  Location Details:`,
});

const summarizeReportFlow = ai.defineFlow(
  {
    name: 'summarizeReportFlow',
    inputSchema: RealTimeReportInputSchema,
    outputSchema: RealTimeReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
