import { create } from "zustand";

interface BurgerStore {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useBurgerStore = create<BurgerStore>((set) => ({
  isOpen: false,

  openMenu: () => set({ isOpen: true }),

  closeMenu: () => set({ isOpen: false }),

  toggleMenu: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));
