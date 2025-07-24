"use client";

import { GridLayoutWrapper } from "@/lib/components/layout/GridLayoutWrapper";
import { FullTicker } from "@/lib/components/features/ticker/Tickers";
import { OrderBook } from "@/lib/components/features/order-book/OrderBook";
import { useBinanceDepth } from "@/lib/hooks/useBinanceDepthWebsocket";
import { useBinanceTrades } from "@/lib/hooks/useBinanceAggTradeWebsocket";
import { useBinanceOpenInterest } from "@/lib/hooks/useBinanceOpenInterest";
import { useBinanceTrade } from "@/lib/hooks/useBinanceTrade";
import { useBinanceMarkPrice } from "@/lib/hooks/useBinanceMarkPrice";
import { useBinanceAllTickers } from "@/lib/hooks/useBinanceAllTickers";
import { MarketTickerBar } from "@/lib/components/features/marke-ticker-bar/MarketTickerBar";
import { useBinanceTicker } from "@/lib/hooks/binanceWebsocketBaseUrl";
import { useBinanceCandles } from "@/lib/hooks/useBinanceCandles";
import { CandleChart } from "@/lib/components/features/chart/Chart";
import { TradesTable } from "@/lib/components/features/table-trade/table-trade";

export default function Page() {
  useBinanceDepth();
  useBinanceTrade();
  useBinanceMarkPrice();
  useBinanceAllTickers();
  useBinanceTicker();
  useBinanceTrades();
  useBinanceOpenInterest();
  useBinanceCandles("ETHUSDT");

  return (
    <main>
      <GridLayoutWrapper>
        <div key="asset-ticker" className="drag-handle rounded-lg">
          <MarketTickerBar />
        </div>
        <div key="ticker" className="z-10">
          <FullTicker />
        </div>
        <div key="chart" className="drag-handle">
          <CandleChart />
        </div>
        <div key="orderbook" className="drag-handle">
          <OrderBook />
        </div>
        <div key="trade-list" className="drag-handle">
          <TradesTable />
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
        <div className="bg-surface text-primary dark:text-text rounded mb-4">
          Test
        </div>
      </GridLayoutWrapper>
    </main>
  );
}
