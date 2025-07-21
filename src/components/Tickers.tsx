import { useTickerStore } from "@/store/ticker.store";

export const Ticker = () => {
  const { lastPrice, changePercent, high24h, low24h, volumeBTC, volumeUSDT } =
    useTickerStore((s) => s);
  const changeClass = parseFloat(changePercent) >= 0 ? "positive" : "negative";

  return (
    <div className="ticker">
      <h3>Ticker</h3>
      <div className="ticker-row">
        <span className="label">Last Price:</span>
        <span className="value">{lastPrice}</span>
      </div>
      <div className="ticker-row">
        <span className="label">Change (24h):</span>
        <span className={`value ${changeClass}`}>{changePercent}%</span>
      </div>
      <div className="ticker-row">
        <span className="label">High (24h):</span>
        <span className="value">{high24h}</span>
      </div>
      <div className="ticker-row">
        <span className="label">Low (24h):</span>
        <span className="value">{low24h}</span>
      </div>
      <div className="ticker-row">
        <span className="label">Volume (BTC):</span>
        <span className="value">{volumeBTC}</span>
      </div>
      <div className="ticker-row">
        <span className="label">Volume (USDT):</span>
        <span className="value">{volumeUSDT}</span>
      </div>
    </div>
  );
};
