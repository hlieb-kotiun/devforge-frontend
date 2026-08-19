import type { User } from "@/types/user1.js";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user: user, isAuthenticated: !!user }),

  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
