import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type VolumeBar = {
  time: number;
  value: number;
  color: string;
};

interface CandlesState {
  interval: string;
  candles: Candle[];
  volume: VolumeBar[];
  setInterval: (interval: string) => void;
  setCandles: (candles: Candle[]) => void;
  setVolume: (volume: VolumeBar[]) => void;
  updateLatest: (candle: Candle, volume: VolumeBar) => void;
}

export const useCandlesStore = create<CandlesState>()(
  immer((set) => ({
    interval: "1m",
    candles: [],
    volume: [],
    setInterval: (interval) =>
      set((state) => {
        state.interval = interval;
      }),
    setCandles: (candles) =>
      set((state) => {
        state.candles = candles;
      }),
    setVolume: (volume) =>
      set((state) => {
        state.volume = volume;
      }),
    updateLatest: (candle, volume) =>
      set((state) => {
        const last = state.candles[state.candles.length - 1];
        if (last?.time === candle.time) {
          state.candles[state.candles.length - 1] = candle;
          state.volume[state.volume.length - 1] = volume;
        } else {
          state.candles.push(candle);
          state.volume.push(volume);
        }
      }),
  }))
);
