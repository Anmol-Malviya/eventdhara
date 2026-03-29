'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { OccasionId, City } from '@/lib/constants';

interface BookingDraft {
  occasion?: OccasionId;
  city?: City;
  eventDate?: string;
  guestCount?: number;
  budget?: number;
  specialRequirements?: string;
  selectedServiceId?: string;
  selectedPackageId?: string;
}

interface BookContextType {
  draft: BookingDraft;
  updateDraft: (partial: Partial<BookingDraft>) => void;
  clearDraft: () => void;
  step: number;
  setStep: (step: number) => void;
}

const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>({});
  const [step, setStep] = useState(1);

  const updateDraft = (partial: Partial<BookingDraft>) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  };

  const clearDraft = () => {
    setDraft({});
    setStep(1);
  };

  const value = useMemo<BookContextType>(
    () => ({ draft, updateDraft, clearDraft, step, setStep }),
    [draft, step]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook(): BookContextType {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBook must be used inside <BookProvider>');
  return ctx;
}
