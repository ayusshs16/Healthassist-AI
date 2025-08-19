'use server';

/**
 * @fileOverview An email sending AI agent.
 *
 * - sendEmail - A function that handles sending an email.
 * - SendEmailInput - The input type for the sendEmail function.
 * - SendEmailOutput - The return type for the sendEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SendEmailInputSchema = z.object({
  to: z.string().describe('The email address of the recipient.'),
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The body of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export const SendEmailOutputSchema = z.object({
  success: z.boolean().describe('Whether the email was sent successfully.'),
});
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>;

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
