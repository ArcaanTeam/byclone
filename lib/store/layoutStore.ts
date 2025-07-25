import { create } from "zustand";

interface layoutState {
  orderBookMaxRow: number;
  set: (v: number) => void;
  reset: () => void;
}

export const useLayoutStore = create<layoutState>()((set) => ({
  orderBookMaxRow: 4,
  set: (v: number) => set({ orderBookMaxRow: v }),
  reset: () => set({ orderBookMaxRow: 4 }),
}));
