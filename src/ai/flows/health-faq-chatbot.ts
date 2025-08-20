
'use server';

/**
 * @fileOverview A health FAQ chatbot.
 *
 * - healthFAQChatbot - A function that answers general health questions.
 * - HealthFAQChatbotInput - The input type for the healthFAQChatbot function.
 * - HealthFAQChatbotOutput - The return type for the healthFAQChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthFAQChatbotInputSchema = z.object({
  query: z.string().describe('The user query about health.'),
});
export type HealthFAQChatbotInput = z.infer<typeof HealthFAQChatbotInputSchema>;

const HealthFAQChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type HealthFAQChatbotOutput = z.infer<typeof HealthFAQChatbotOutputSchema>;

export async function healthFAQChatbot(input: HealthFAQChatbotInput): Promise<HealthFAQChatbotOutput> {
  return healthFAQChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthFAQChatbotPrompt',
  input: {schema: HealthFAQChatbotInputSchema},
  output: {schema: HealthFAQChatbotOutputSchema},
  prompt: `You are an AI health assistant. Your goal is to provide helpful, informative, and safe responses to general health questions.

When a user asks about a specific symptom or problem (like "fever", "headache", "sore throat"), structure your answer to be as helpful as possible. Include:
1.  A general overview of the symptom.
2.  Common potential causes (without making a diagnosis).
3.  General self-care or at-home recommendations.
4.  Clear guidance on when it is important to see a doctor.

Always include the following disclaimer at the end of your answer: "Disclaimer: I am an AI assistant and not a medical professional. This information is for educational purposes only. Please consult with a healthcare provider for any medical advice, diagnosis, or treatment."

User query: {{{query}}}
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const healthFAQChatbotFlow = ai.defineFlow(
  {
    name: 'healthFAQChatbotFlow',
    inputSchema: HealthFAQChatbotInputSchema,
    outputSchema: HealthFAQChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
