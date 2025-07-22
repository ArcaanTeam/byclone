"use client";

import { useMarketStore } from "@/lib/store/market.store";

export const FullTicker = () => {
  const {
    lastPrice,
    changePercent,
    high24h,
    low24h,
    volumeBTC,
    volumeUSDT,
    markPrice,
    fundingRate,
    nextFundingTime,
    indexPrice,
    openInterest,
  } = useMarketStore((s) => s);

  const changeClass = parseFloat(changePercent) >= 0 ? "positive" : "negative";

  const formatCountdown = () => {
    const diff = nextFundingTime - Date.now();
    if (diff <= 0) return "00:00:00";
    const h = Math.floor(diff / 3600000)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((diff % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const s = Math.floor((diff % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="full-ticker">
      <h3>Market Data</h3>
      <div className="flex">
        <div className="row">
          <span className="label">Last Price:</span>
          <span className="value">{lastPrice}</span>
        </div>
        <div className="row">
          <span className="label">Change (24h):</span>
          <span className={`value ${changeClass}`}>{changePercent}%</span>
        </div>
        <div className="row">
          <span className="label">High / Low (24h):</span>
          <span className="value">
            {high24h} / {low24h}
          </span>
        </div>
        <div className="row">
          <span className="label">Volume (BTC / USDT):</span>
          <span className="value">
            {volumeBTC} / {volumeUSDT}
          </span>
        </div>
        <div className="row">
          <span className="label">Mark Price:</span>
          <span className="value">{markPrice}</span>
        </div>
        <div className="row">
          <span className="label">Index Price:</span>
          <span className="value">{indexPrice}</span>
        </div>
        <div className="row">
          <span className="label">Funding Rate:</span>
          <span className="value">{fundingRate}</span>
        </div>
        <div className="row">
          <span className="label">Countdown to Funding:</span>
          <span className="value">{formatCountdown()}</span>
        </div>
        <div className="row">
          <span className="label">Open Interest (USDT):</span>
          <span className="value">{openInterest}</span>
        </div>
      </div>
    </div>
  );
};
