"use client";

import { useMarketStore } from "@/lib/store/market.store";
import { ChevronDown, Star, Check } from "lucide-react";
import { HorizontalFadeScroll } from "@/lib/components/ui/horizontal-fade-scroll/HorizontalFadeScroll";
import { TextVariant } from "@/lib/components/ui/text-variant";
import { formatNumber } from "@/lib/utils";
import { FakeCheckbox } from "@/lib/components/ui/fakeCheckBox";
import { useEffect, useRef } from "react";
import { ActionItem, ActionMenu } from "../../ui/action-menu/ActionMenu";
import { useTickerFilterStore } from "@/lib/store/filtertickerStore";

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

  const setVisible = useTickerFilterStore((s) => s.set);
  const visible = useTickerFilterStore((s) => s.visible);

  const tickerMenu: ActionItem[] = [
    {
      id: "24h-high",
      component: (
        <FakeCheckbox
          label="24h High"
          checkedClassName="text-slate-900"
          /* کنترل‌شده */
          defaultChecked={visible["24h-high"]}
          onChange={(v) => setVisible("24h-high", v)}
        />
      ),
    },
    {
      id: "24h-low",
      component: (
        <FakeCheckbox
          label="24h Low"
          checkedClassName="text-slate-900"
          defaultChecked={visible["24h-low"]}
          onChange={(v) => setVisible("24h-low", v)}
        />
      ),
    },
    {
      id: "24h-volume-eth",
      component: (
        <FakeCheckbox
          label="24h Volume(ETH)"
          checkedClassName="text-slate-900"
          defaultChecked={visible["24h-volume-eth"]}
          onChange={(v) => setVisible("24h-volume-eth", v)}
        />
      ),
    },
    {
      id: "24h-volume-usdt",
      component: (
        <FakeCheckbox
          label="24h Volume(USDT)"
          checkedClassName="text-slate-900"
          defaultChecked={visible["24h-volume-usdt"]}
          onChange={(v) => setVisible("24h-volume-usdt", v)}
        />
      ),
    },
    {
      id: "open-interest-usdt",
      component: (
        <FakeCheckbox
          label="Open Interest(USDT)"
          checkedClassName="text-slate-900"
          defaultChecked={visible["open-interest-usdt"]}
          onChange={(v) => setVisible("open-interest-usdt", v)}
        />
      ),
    },
  ];

  /* سپس در JSX: */
  <ActionMenu className="ml-auto" contentClassName="w-50" items={tickerMenu} />;

  const tickers = [
    {
      name: "24h High",
      id: "24h-high",
      component: (
        <div className="text-[10px] flex flex-col gap-1 min-w-[30px] max-w-[30px]">
          <span className="text-slate-500">24h High</span>
          <span className="text-white">
            {formatNumber(high24h, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
    {
      name: "24h Low",
      id: "24h-low",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h Low</span>
          <span className="text-white">
            {formatNumber(low24h, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
    {
      name: "24h Volume(ETH)",
      id: "24h-volume-eth",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h Volume(ETH)</span>
          <span className="text-white">
            {formatNumber(volumeBTC, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
    {
      name: "24h Volume(USDT)",
      id: "24h-volume-usdt",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">24h Volume(USDT)</span>
          <span className="text-white">
            {formatNumber(volumeUSDT, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
    {
      name: "Index",
      id: "index",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">Index</span>
          <span className="text-white">
            {formatNumber(indexPrice, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
    {
      name: "Funding / Countdown",
      id: "funding",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">Funding / Countdown</span>
          <span className="text-white">
            {formatNumber(fundingRate, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
    {
      name: "Open Interest(USDT)",
      id: "open-interest-usdt",
      component: (
        <div className="text-[10px] flex flex-col gap-1">
          <span className="text-slate-500">Open Interest(USDT)</span>
          <span className="text-white">
            {formatNumber(openInterest, { maxDecimals: 2 })}
          </span>
        </div>
      ),
    },
  ];
  const filtered = tickers.filter((t) => visible[t.id]);

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
      <div className="flex flex-col items-center  gap-1 mr-4 drag-handle max-w-[100px] min-w-[100px] ml-2 ">
        <TextVariant className="text-lg" variant={up ? "success" : "danger"}>
          {formatNumber(lastPrice, { maxDecimals: 2 })}
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
      <HorizontalFadeScroll
        items={filtered}
        renderItem={(item) => item.component}
        itemClassName="max-w-fit min-w-fit"
        className="max-w-[300px]"
      />
      <ActionMenu
        className=" ml-auto"
        contentClassName="w-50"
        items={tickerMenu}
      />
    </div>
  );
};
