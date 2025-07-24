"use client";

import { useAllTickersStore } from "@/lib/store/all-tickers.store";
import { TextVariant } from "../../ui/text-variant";

const symbolsToShow = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

export const MarketTickerBar = () => {
  const tickers = useAllTickersStore((s) => s.tickers);

  return (
    <div className="flex h-full rounded-[10px] gap-6 px-4 py-4 bg-slate-800 text-sm items-center justify-start">
      {symbolsToShow.map((symbol) => {
        const ticker = tickers[symbol];
        if (!ticker) return null;

        const percent = parseFloat(ticker.changePercent);
        const variant =
          percent > 0 ? "success" : percent < 0 ? "danger" : "neutral";

        return (
          <div key={symbol} className="flex items-center gap-1">
            <TextVariant variant="neutral" className="text-white font-semibold">
              {symbol}
            </TextVariant>
            <TextVariant variant={variant}>
              {(percent > 0 ? "+" : "") + percent.toFixed(2)}%
            </TextVariant>
          </div>
        );
      })}
    </div>
  );
};
