"use client";

import { CandleChart } from "@/lib/components/features/chart/Chart";
import { MarketTickerBar } from "@/lib/components/features/marke-ticker-bar/MarketTickerBar";
import { OrderBook } from "@/lib/components/features/order-book/OrderBook";
import { TradesTable } from "@/lib/components/features/table-trade/table-trade";
import { FullTicker } from "@/lib/components/features/ticker/Tickers";
import { TradePanel } from "@/lib/components/features/trade-panel/PlaceOrder";
import { GridLayoutWrapper } from "@/lib/components/layout/GridLayoutWrapper";
import { useBinanceTicker } from "@/lib/hooks/binanceWebsocketBaseUrl";
import { useBinanceTrades } from "@/lib/hooks/useBinanceAggTradeWebsocket";
import { useBinanceTickers } from "@/lib/hooks/useBinanceAllTickers";
import { useBinanceCandles } from "@/lib/hooks/useBinanceCandles";
import { useBinanceDepth } from "@/lib/hooks/useBinanceDepthWebsocket";
import { useBinanceMarkPrice } from "@/lib/hooks/useBinanceMarkPrice";
import { useBinanceOpenInterest } from "@/lib/hooks/useBinanceOpenInterest";
import { useRef } from "react";

export default function HomeView() {
  useBinanceDepth();
  useBinanceTrades();
  useBinanceMarkPrice();
  useBinanceTickers();
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
        <div key="orderbook">
          <OrderBook />
        </div>
        <div key="trade-list" className="drag-handle">
          <TradesTable />
        </div>
        <div key="tradeform" className="bg-surface">
          <TradePanel />
        </div>
      </GridLayoutWrapper>
    </main>
  );
}
