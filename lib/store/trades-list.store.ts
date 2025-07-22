import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Trade {
  id: number;
  price: string;
  qty: string;
  side: "buy" | "sell";
  time: number;
}

interface TradeState {
  trades: Trade[];
  pushTrade: (trade: Trade) => void;
}

export const useTradeStore = create<TradeState>()(
  immer((set) => ({
    trades: [],
    pushTrade: (trade) =>
      set((state) => {
        state.trades.unshift(trade); // add to top
        if (state.trades.length > 100) state.trades.pop(); // limit size
      }),
  }))
);
