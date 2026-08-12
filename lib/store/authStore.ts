import { create } from "zustand";
import { User } from "@/types/user.js";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  toggleSaveArticle?: (articleId: string) => void;
}

const AuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  toggleSaveArticle: (articleId: string) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            savedArticles: state.user.savedArticles.includes(articleId)
              ? state.user.savedArticles.filter((id) => id !== articleId)
              : [...state.user.savedArticles, articleId],
          }
        : null,
      isAuthenticated: !!state.user,
    })),
}));

export default AuthStore;
