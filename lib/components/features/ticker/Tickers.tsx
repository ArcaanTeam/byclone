"use client";

import { useMarketStore } from "@/lib/store/market.store";
import { ChevronDown, Star } from "lucide-react";
import { TextVariant } from "../../ui/text-variant";
import { CustomCarousel } from "../../ui/CustomCarousel/CustomCarousel";

export const FullTicker = () => {
  const lastPrice = useMarketStore((s) => s.lastPrice);
  const changePercent = useMarketStore((s) => s.changePercent);
  const lastTrade = useMarketStore((s) => s.lastTrade);
  const high24h = useMarketStore((s) => s.high24h);
  const low24h = useMarketStore((s) => s.low24h);
  const volumeBTC = useMarketStore((s) => s.volumeBTC);
  const volumeUSDT = useMarketStore((s) => s.volumeUSDT);
  const markPrice = useMarketStore((s) => s.markPrice);
  const fundingRate = useMarketStore((s) => s.fundingRate);
  const indexPrice = useMarketStore((s) => s.indexPrice);
  const openInterest = useMarketStore((s) => s.openInterest);
  const priceChange = useMarketStore((s) => s.priceChange);

  const tickers = [
    {
      name: "24h High",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h High</span>
          <span className="text-white">{high24h}</span>
        </div>
      ),
    },
    {
      name: "24h Low",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h Low</span>
          <span className="text-white">{low24h}</span>
        </div>
      ),
    },
    {
      name: "24h Volume(ETH)",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h Volume(ETH)</span>
          <span className="text-white">{volumeBTC}</span>
        </div>
      ),
    },
    {
      name: "24h Volume(USDT)",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h Volume(USDT)</span>
          <span className="text-white">{volumeUSDT}</span>
        </div>
      ),
    },
    {
      name: "Index",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">Index</span>
          <span className="text-white">{indexPrice}</span>
        </div>
      ),
    },
    {
      name: "Funding / Countdown",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">Funding / Countdown</span>
          <span className="text-white">{fundingRate}</span>
        </div>
      ),
    },
    {
      name: "Open Interest(USDT)",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">Open Interest(USDT)</span>
          <span className="text-white">{openInterest}</span>
        </div>
      ),
    },
  ];

  const diff = Number(markPrice) - Number(lastTrade);
  const up = diff > 0;

  return (
    <div className="w-full h-full flex items-center rounded-[10px] bg-slate-800 px-4 py-1">
      <div className="flex items-center gap-2">
        <span className="border-[1px] border-stone-400 w-6 h-6 flex items-center justify-center rounded-[5px]">
          <Star
            className="w-4 h-4 fill-binance-gold text-binance-gold"
            fill="currentColor"
          />
        </span>
        <TextVariant variant="neutral">ETHUSDT</TextVariant>
        <span className="flex items-center gap-1 text-white cursor-pointer text-[12px]">
          <span className="bg-slate-600 rounded-[2px] px-[1px] text-[11px]">
            Perp
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </span>
      </div>
      <div className="flex flex-col gap-1 mr-4 drag-handle">
        <TextVariant className="text-lg" variant={up ? "success" : "danger"}>
          {lastPrice}
        </TextVariant>
        <div className="flex items-center gap-1">
          <TextVariant
            className="text-[10px]"
            variant={changePercent.includes("-") ? "danger" : "success"}
          >
            {changePercent}%
          </TextVariant>
          <TextVariant
            className="text-[11px]"
            variant={priceChange.includes("-") ? "danger" : "success"}
          >
            {priceChange}
          </TextVariant>
        </div>
      </div>
      <CustomCarousel items={tickers} />
    </div>
  );
};
