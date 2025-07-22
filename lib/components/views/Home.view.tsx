import { GridLayoutWrapper } from "components/layout/GridLayoutWrapper";
import { FullTicker } from "components/features/ticker/Tickers";
import { OrderBook } from "components/features/order-book/OrderBook";
import { TradeList } from "components/features/trade-list/TradeList";

export default function HomeView() {
  return (
    <main>
      <GridLayoutWrapper>
        <div key="asset-ticker" className="drag-handle p-2">
          <FullTicker />
        </div>
        <div key="ticker" className="bg-red-500 drag-handle p-2">
          Ticker Component
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
