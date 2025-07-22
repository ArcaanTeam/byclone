"use client";

import { useTradeStore } from "lib/store/trades-list.store";
import "./trade-list.css";

export const TradeList = () => {
  const allTrades = useTradeStore((s) => s.trades); // limit to 40 shown
  const trades = allTrades.slice(0, 40);

  return (
    <div className="trade-list">
      <h3>Recent Trades</h3>
      <div className="trade-rows">
        {trades.map((t) => (
          <div key={t.id} className={`trade-row ${t.side}`}>
            <span className="price">{t.price}</span>
            <span className="qty">{t.qty}</span>
            <span className="time">
              {new Date(t.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
