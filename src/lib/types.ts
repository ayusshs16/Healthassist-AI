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
