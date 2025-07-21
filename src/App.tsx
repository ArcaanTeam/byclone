import { Ticker } from "@/components/Tickers";
import { useBinanceTicker } from "./hooks/binanceWebsocketBaseUrl";
import { useBinanceDepth } from "./hooks/useBinanceDepthWebsocket";
import { OrderBook } from "@/components/order-book/OrderBook";
import { useBinanceTrades } from "@/hooks/useBinanceAggTradeWebsocket";
import { TradeList } from "./components/trade-list/TradeList";
import type { PropsWithChildren } from "react";

function Section({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <div style={{ padding: 20 }}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function App() {
  // start WebSocket
  useBinanceDepth();
  useBinanceTrades();
  useBinanceTicker();

  return (
    <div style={{ display: "flex", gap: "20pxs" }}>
      <Section title="Order Book">
        <OrderBook />
      </Section>

      <Section title="Trade List">
        <TradeList />
      </Section>

      <Section title="Ticker">
        <Ticker />
      </Section>
    </div>
  );
}

export default App;
