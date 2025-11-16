import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Practitioner } from '@shared/types';
export interface SessionOffering {
  title: string;
  duration: number; // in minutes
  price: number;
}
export interface BookedSession {
  id: string;
  practitioner: Practitioner;
  session: SessionOffering;
  date: Date;
}
interface BookingState {
  bookedSessions: BookedSession[];
  addBooking: (booking: Omit<BookedSession, 'id'>) => void;
}
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookedSessions: [],
      addBooking: (booking) =>
        set((state) => ({
          bookedSessions: [
            ...state.bookedSessions,
            { ...booking, id: crypto.randomUUID() },
          ],
        })),
    }),
    {
      name: 'booking-storage',
      // partialize: (state) => ({ bookedSessions: state.bookedSessions }),
    }
  )
);