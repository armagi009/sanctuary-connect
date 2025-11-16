import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  signUp: (user: Omit<User, 'id'>) => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      signUp: (userData) => {
        const newUser = { ...userData, id: crypto.randomUUID() };
        set({ user: newUser, isLoggedIn: true });
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);