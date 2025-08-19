'use server';

/**
 * @fileOverview An email sending AI agent.
 *
 * - sendEmail - A function that handles sending an email.
 */

import {ai} from '@/ai/genkit';
import { SendEmailInputSchema, SendEmailOutputSchema, type SendEmailInput, type SendEmailOutput } from '@/lib/types';

export async function sendEmail(input: SendEmailInput): Promise<SendEmailOutput> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async (input) => {
    console.log(`Sending email to ${input.to} with subject "${input.subject}"`);
    console.log(`Body: ${input.body}`);
    // In a real application, you would integrate with an email service like SendGrid or Mailgun here.
    // For this example, we'll just simulate a successful response.
    return { success: true };
  }
);
