// src/store/ticker.store.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TickerState {
  lastPrice: string;
  changePercent: string;
  high24h: string;
  low24h: string;
  volumeBTC: string;
  volumeUSDT: string;
  updateTicker: (data: Partial<TickerState>) => void;
}

export const useTickerStore = create<TickerState>()(
  immer((set) => ({
    lastPrice: "0",
    changePercent: "0",
    high24h: "0",
    low24h: "0",
    volumeBTC: "0",
    volumeUSDT: "0",

    updateTicker: (data) =>
      set((state) => {
        if (data.lastPrice !== undefined) state.lastPrice = data.lastPrice;
        if (data.changePercent !== undefined)
          state.changePercent = data.changePercent;
        if (data.high24h !== undefined) state.high24h = data.high24h;
        if (data.low24h !== undefined) state.low24h = data.low24h;
        if (data.volumeBTC !== undefined) state.volumeBTC = data.volumeBTC;
        if (data.volumeUSDT !== undefined) state.volumeUSDT = data.volumeUSDT;
      }),
  }))
);
