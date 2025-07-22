import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Level = [string, string]; // [price, quantity]

interface OrderBookState {
  bids: Level[];
  asks: Level[];
  updateBook: (data: { bids: Level[]; asks: Level[] }) => void;
}

export const useOrderBookStore = create<OrderBookState>()(
  immer((set) => ({
    bids: [],
    asks: [],
    updateBook: ({ bids, asks }) =>
      set((state) => {
        state.bids = bids;
        state.asks = asks;
      }),
  }))
);
