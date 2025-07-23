import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TickerLevel = {
  symbol: string;
  lastPrice: string;
  changePercent: string;
};

interface AllTickersState {
  tickers: Record<string, TickerLevel>;
  updateTickers: (tickers: TickerLevel[]) => void;
}

export const useAllTickersStore = create<AllTickersState>()(
  immer((set) => ({
    tickers: {},
    updateTickers: (newTickers) =>
      set((state) => {
        newTickers.forEach((t) => {
          state.tickers[t.symbol] = t;
        });
      }),
  }))
);
