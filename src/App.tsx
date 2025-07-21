// src/App.tsx
// import { useBinanceDepth } from "@/hooks/useBinanceDepthWebsocket";
// import { OrderBook } from "@/components/OrderBook";
import { Ticker } from "@/components/Tickers";
import { useBinanceTicker } from "./hooks/binanceWebsocketBaseUrl";

function App() {
  useBinanceTicker(); // start WebSocket

  return (
    <div style={{ padding: 20 }}>
      <h1>BTC/USDT Order Book</h1>
      <Ticker />
    </div>
  );
}

export default App;
