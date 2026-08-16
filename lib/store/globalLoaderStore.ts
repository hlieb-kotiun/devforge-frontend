// import { create } from "zustand";

// interface LoaderState {
//   isLoading: boolean;
//   timer: NodeJS.Timeout | null;
//   showLoader: (delay?: number) => void;
//   hideLoader: () => void;
// }

// export const useLoaderStore = create<LoaderState>((set, get) => ({
//   isLoading: false,
//   timer: null,

//   showLoader: (delay = 300) => {
//     const { timer } = get();
//     // Якщо таймер вже йшов — скидаємо
//     if (timer) clearTimeout(timer);

//     // Запускаємо показ лоадера тільки якщо операція триває довше ніж delay (300мс)
//     const newTimer = setTimeout(() => {
//       set({ isLoading: true });
//     }, delay);

//     set({ timer: newTimer });
//   },

//   hideLoader: () => {
//     const { timer } = get();
//     // Якщо запит завершився швидше за 300мс — скасовуємо появу лоадера взагалі
//     if (timer) clearTimeout(timer);
//     set({ isLoading: false, timer: null });
//   },
// }));

import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  activeRequests: number;
  timer: NodeJS.Timeout | null;
  showLoader: (delay?: number) => void;
  hideLoader: () => void;
}

export const useLoaderStore = create<LoaderState>((set, get) => ({
  isLoading: false,
  activeRequests: 0,
  timer: null,

  showLoader: (delay = 300) => {
    const currentRequests = get().activeRequests + 1;
    set({ activeRequests: currentRequests });

    // Якщо лоадер вже показується на екрані, робити нічого не треба
    if (get().isLoading) return;

    // Якщо затримка 0 (миттєвий показ по кліку)
    if (delay === 0) {
      const { timer } = get();
      if (timer) clearTimeout(timer);
      set({ isLoading: true, timer: null });
      return;
    }

    // Якщо це перший запит і таймер ще НЕ запущено — запускаємо відлік 300мс
    if (currentRequests === 1 && !get().timer) {
      const newTimer = setTimeout(() => {
        set({ isLoading: true, timer: null });
      }, delay);

      set({ timer: newTimer });
    }
  },

  hideLoader: () => {
    const currentRequests = Math.max(0, get().activeRequests - 1);
    set({ activeRequests: currentRequests });

    // Якщо всі активні запити/дії завершилися (лічильник став 0)
    if (currentRequests === 0) {
      const { timer } = get();
      if (timer) clearTimeout(timer); // Очищаємо таймер, якщо запит завершився швидше за 300мс
      set({ isLoading: false, timer: null });
    }
  },
}));
