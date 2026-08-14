import { create } from "zustand";
import { User } from "@/types/user.js";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;

}

const AuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default AuthStore;
