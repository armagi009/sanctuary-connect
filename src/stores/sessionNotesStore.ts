import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SessionNote } from '@shared/types';
const INITIAL_NOTES: SessionNote[] = [
  {
    id: 'note1',
    sessionId: 'mockSession1', // This would correspond to a real session ID
    practitionerId: '1',
    seekerId: 'user1',
    title: 'Post-Session Reflections: Mindfulness Foundations',
    content: 'It was wonderful connecting with you today. As we discussed, focus on the "leaves on a stream" meditation for 10 minutes each morning. This will help in observing thoughts without judgment. I\'ve also attached a link to a guided body scan meditation we talked about. Remember to be gentle with yourself. Looking forward to our next session!',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
];
export type NewSessionNote = Omit<SessionNote, 'id' | 'createdAt'>;
interface SessionNoteState {
  notes: SessionNote[];
  addNote: (note: NewSessionNote) => void;
}
export const useSessionNotesStore = create<SessionNoteState>()(
  persist(
    (set) => ({
      notes: INITIAL_NOTES,
      addNote: (newNote) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              ...newNote,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
    }),
    {
      name: 'session-notes-storage',
    }
  )
);