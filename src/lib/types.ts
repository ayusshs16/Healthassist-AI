import { z } from 'zod';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  availability: string[];
  bio: string;
  avatarUrl: string;
  rating: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  avatarUrl: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctor: Pick<Doctor, 'name' | 'specialization' | 'avatarUrl'>;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

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
