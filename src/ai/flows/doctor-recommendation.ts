'use server';

/**
 * @fileOverview Doctor recommendation AI agent.
 *
 * - recommendDoctor - A function that handles the doctor recommendation process.
 * - RecommendDoctorInput - The input type for the recommendDoctor function.
 * - RecommendDoctorOutput - The return type for the recommendDoctor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendDoctorInputSchema = z.object({
  symptoms: z
    .string()
    .describe('The symptoms the patient is experiencing.'),
  needs: z.string().describe('The specific needs of the patient.'),
});
export type RecommendDoctorInput = z.infer<typeof RecommendDoctorInputSchema>;

const RecommendDoctorOutputSchema = z.object({
  recommendation: z.string().describe('The recommended doctor specialization.'),
  reason: z.string().describe('The reason for the recommendation.'),
});
export type RecommendDoctorOutput = z.infer<typeof RecommendDoctorOutputSchema>;

export async function recommendDoctor(input: RecommendDoctorInput): Promise<RecommendDoctorOutput> {
  return recommendDoctorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendDoctorPrompt',
  input: {schema: RecommendDoctorInputSchema},
  output: {schema: RecommendDoctorOutputSchema},
  prompt: `You are an AI assistant designed to recommend the most appropriate doctor specialization based on the patient's described symptoms and needs.

Symptoms: {{{symptoms}}}
Needs: {{{needs}}}

Based on the symptoms and needs, provide a doctor specialization recommendation and explain why that specialization is appropriate for the patient.
`,
});

const recommendDoctorFlow = ai.defineFlow(
  {
    name: 'recommendDoctorFlow',
    inputSchema: RecommendDoctorInputSchema,
    outputSchema: RecommendDoctorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
