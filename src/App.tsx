// src/App.tsx
import { useBinanceDepth } from '@/hooks/useBinanceDepthWebsocket';
import { OrderBook } from '@/components/OrderBook';
import TradeList from '@/components/trade-list/TradeList';

function App() {
  useBinanceDepth(); // start WebSocket

  return (
    <div style={{ display: 'flex', gap: '20pxs' }}>
      <div style={{ padding: 20 }}>
        <h1>BTC/USDT Order Book</h1>
        <OrderBook />
      </div>

      <div style={{ padding: 20 }}>
        <h1>BTC/USDT Trade List</h1>
        <TradeList symbol='BTCUSDT' maxItems={25} />
      </div>
    </div>
  );
}

export default App;
