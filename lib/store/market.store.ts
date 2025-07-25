import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface MarketState {
  // ticker data
  lastPrice: string;
  changePercent: string;
  high24h: string;
  low24h: string;
  volumeBTC: string;
  volumeUSDT: string;

  // mark & funding
  markPrice: string;
  fundingRate: string;
  nextFundingTime: number;
  priceChange: string;

  // index price
  indexPrice: string;

  // open interest
  openInterest: string;

  // last trade
  lastTrade: {
    price: string;
    qty: string;
    time: number;
    priceChange: string;
  } | null;

  update: (data: Partial<MarketState>) => void;
}

export const useMarketStore = create<MarketState>()(
  immer((set) => ({
    lastPrice: "0",
    changePercent: "0",
    changePrice: "0",
    high24h: "0",
    low24h: "0",
    volumeBTC: "0",
    volumeUSDT: "0",
    markPrice: "0",
    fundingRate: "0",
    nextFundingTime: 0,
    indexPrice: "0",
    openInterest: "0",
    lastTrade: null,
    priceChange: "0",

    update: (data) =>
      set((state) => {
        Object.entries(data).forEach(([key, val]) => {
          (state as any)[key] = val;
        });
      }),
  }))
);
