
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Patient } from '@/lib/types';
import { mockPatient } from '@/lib/mock-data';

interface PatientContextType {
  patient: Patient | null;
  updatePatient: (patient: Patient) => void;
  isLoading: boolean;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load patient data from localStorage
    const storedPatient = localStorage.getItem('patient');
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    } else {
      // Fallback to mock data if nothing is in localStorage
      setPatient(mockPatient);
    }
    setIsLoading(false);
  }, []);

  const updatePatient = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
    // Persist patient data to localStorage
    localStorage.setItem('patient', JSON.stringify(updatedPatient));
  };

  return (
    <PatientContext.Provider value={{ patient, updatePatient, isLoading }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
