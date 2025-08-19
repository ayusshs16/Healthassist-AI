import type { Doctor, Appointment } from './types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 15,
    consultationFee: 250,
    availability: ['Monday 9am-12pm', 'Wednesday 2pm-5pm', 'Friday 9am-12pm'],
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She is a fellow of the American College of Cardiology.',
    avatarUrl: 'https://placehold.co/128x128.png',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Dr. Michael Lee',
    specialization: 'Dermatologist',
    experience: 10,
    consultationFee: 180,
    availability: ['Tuesday 10am-1pm', 'Thursday 1pm-4pm'],
    bio: 'Dr. Michael Lee specializes in medical and cosmetic dermatology. He is known for his patient-centric approach and expertise in treating rare skin disorders.',
    avatarUrl: 'https://placehold.co/128x128.png',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Dr. Emily Carter',
    specialization: 'Pediatrician',
    experience: 12,
    consultationFee: 150,
    availability: ['Monday 1pm-5pm', 'Tuesday 9am-12pm', 'Thursday 9am-12pm'],
    bio: 'Dr. Emily Carter is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
    avatarUrl: 'https://placehold.co/128x128.png',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Dr. James Smith',
    specialization: 'Neurologist',
    experience: 20,
    consultationFee: 300,
    availability: ['Wednesday 9am-1pm', 'Friday 1pm-5pm'],
    bio: 'Dr. James Smith is a leading neurologist with extensive experience in diagnosing and treating complex neurological conditions such as epilepsy and Parkinson\'s disease.',
    avatarUrl: 'https://placehold.co/128x128.png',
    rating: 4.7,
  },
];

export const mockPatientAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientName: 'John Doe',
    doctor: { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', avatarUrl: 'https://placehold.co/40x40.png' },
    date: '2024-08-15',
    time: '10:00 AM',
    status: 'upcoming',
  },
  {
    id: 'apt2',
    patientName: 'John Doe',
    doctor: { name: 'Dr. Michael Lee', specialization: 'Dermatologist', avatarUrl: 'https://placehold.co/40x40.png' },
    date: '2024-07-20',
    time: '02:30 PM',
    status: 'completed',
  },
  {
    id: 'apt3',
    patientName: 'John Doe',
    doctor: { name: 'Dr. Emily Carter', specialization: 'Pediatrician', avatarUrl: 'https://placehold.co/40x40.png' },
    date: '2024-07-10',
    time: '11:00 AM',
    status: 'cancelled',
  },
];

export const mockDoctorAppointments: Appointment[] = [
    {
      id: 'doc_apt1',
      patientName: 'Alice Williams',
      doctor: { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', avatarUrl: 'https://placehold.co/40x40.png' },
      date: '2024-08-15',
      time: '10:00 AM',
      status: 'upcoming',
      notes: "Patient reports mild chest pain after exertion."
    },
    {
      id: 'doc_apt2',
      patientName: 'Bob Brown',
      doctor: { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', avatarUrl: 'https://placehold.co/40x40.png' },
      date: '2024-08-15',
      time: '11:00 AM',
      status: 'upcoming',
      notes: "Follow-up for hypertension management."
    },
    {
      id: 'doc_apt3',
      patientName: 'Charlie Davis',
      doctor: { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', avatarUrl: 'https://placehold.co/40x40.png' },
      date: '2024-07-22',
      time: '09:00 AM',
      status: 'completed',
      notes: "Annual check-up. EKG normal."
    },
  ];
