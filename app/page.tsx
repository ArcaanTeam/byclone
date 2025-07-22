"use client";

import { GridLayoutWrapper } from "@/lib/components/layout/GridLayoutWrapper";
import { FullTicker } from "@/lib/components/features/ticker/Tickers";
import { OrderBook } from "@/lib/components/features/order-book/OrderBook";
import { TradeList } from "@/lib/components/features/trade-list/TradeList";
import { useBinanceDepth } from "@/lib/hooks/useBinanceDepthWebsocket";
import { useBinanceTrades } from "@/lib/hooks/useBinanceAggTradeWebsocket";
import { useBinanceOpenInterest } from "@/lib/hooks/useBinanceOpenInterest";

export default function Page() {
  useBinanceDepth();
  useBinanceTrades();
  useBinanceOpenInterest();

  return (
    <main>
      <GridLayoutWrapper>
        <div key="asset-ticker" className="drag-handle p-2">
          Asset Ticker Component
        </div>
        <div key="ticker" className="bg-red-500 drag-handle p-2">
          <FullTicker />
        </div>
        <div key="chart" className="bg-blue-500 drag-handle p-2">
          Chart Component
        </div>
        <div key="orderbook" className="bg-green-500 drag-handle p-2">
          <OrderBook />
        </div>
        <div key="trade-list" className="bg-surface drag-handle p-2">
          <TradeList />
        </div>
        <div key="tradeform" className="bg-surface drag-handle p-2">
          Trade Form Component
        </div>

        <div key="user-trade-tabs" className="bg-surface drag-handle p-2">
          User Trade Tabs Component
        </div>

        <div key="account" className="bg-surface drag-handle p-2">
          Account Component
        </div>
        <div className="bg-surface text-primary dark:text-text p-4 rounded mb-4">
          Test
        </div>
      </GridLayoutWrapper>
    </main>
  );
}
