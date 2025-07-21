// src/App.tsx
import { OrderBook } from '@/components/OrderBook';
import { useBinanceTrades } from '@/hooks/useBinanceAggTradeWebsocket';
import { useBinanceDepth } from '@/hooks/useBinanceDepthWebsocket';
import { TradeList } from './components/trade-list/TradeList';

function App() {
  useBinanceDepth(); // start WebSocket
  useBinanceTrades();

  return (
    <div style={{ display: 'flex', gap: '20pxs' }}>
      <div style={{ padding: 20 }}>
        <h1>BTC/USDT Order Book</h1>
        <OrderBook />
      </div>

      <div style={{ padding: 20 }}>
        <h1>BTC/USDT Trade List</h1>
        <TradeList />
      </div>
    </div>
  );
}

export default App;
