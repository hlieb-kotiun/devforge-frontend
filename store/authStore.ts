import { create } from "zustand";

interface AuthStore {
  isAuthorized: boolean;
  setAuthorized: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthorized: false,

  setAuthorized: (value) =>
    set({
      isAuthorized: value,
    }),
}));
