import { create } from "zustand";
import { persist } from "zustand/middleware";

type VisibleTickers = Record<string, boolean>; // { "24h-high": true, ... }

interface TickerFilterState {
  visible: VisibleTickers;
  toggle: (id: string) => void;
  set: (id: string, v: boolean) => void;
  reset: () => void;
}

const DEFAULT_VISIBLE: VisibleTickers = {
  "24h-high": true,
  "24h-low": true,
  "24h-volume-eth": true,
  "24h-volume-usdt": true,
  index: true,
  funding: true,
  "open-interest-usdt": true,
};

export const useTickerFilterStore = create<TickerFilterState>()(
  persist(
    (set, get) => ({
      visible: DEFAULT_VISIBLE,
      toggle: (id) =>
        set((s) => ({ visible: { ...s.visible, [id]: !s.visible[id] } })),
      set: (id, v) => set((s) => ({ visible: { ...s.visible, [id]: v } })),
      reset: () => set({ visible: DEFAULT_VISIBLE }),
    }),
    {
      name: "ticker-filters", // کلید localStorage
      version: 1,
    }
  )
);
