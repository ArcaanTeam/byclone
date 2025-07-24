"use client";

import { useMarketStore } from "@/lib/store/market.store";
import { useOrderBookStore } from "@/lib/store/order-book.store";
import { ActionMenu } from "@/lib/components/ui/action-menu/ActionMenu";
import { NormalCard } from "@/lib/components/ui/card/card";
import { OrderBookPair } from "./pairOrderBook/OrderBookPair";

export const OrderBook = () => {
  const bids = useOrderBookStore((s) => s.bids);
  const asks = useOrderBookStore((s) => s.asks);
  const { lastTrade, markPrice } = useMarketStore((s) => s);

  let askSum = 0;
  const processedAsks = [...asks]
    // @ts-ignore
    .sort((a, b) => b[0] - a[0])
    .map(([price, size]) => {
      const p = Number(price);
      const s = Number(size);
      askSum += s;
      return {
        price: p,
        size: s,
        sum: Number(askSum.toFixed(3)),
        side: "ask" as const,
      };
    });

  let bidSum = 0;
  const processedBids = [...bids]

    // @ts-ignore
    .sort((a, b) => b[0] - a[0])
    .map(([price, size]) => {
      const p = Number(price);
      const s = Number(size);
      bidSum += s;
      return {
        price: p,
        size: s,
        sum: Number(bidSum.toFixed(3)),
        side: "bid" as const,
      };
    });

  return (
    <NormalCard
      headerRight={<ActionMenu items={exampleItems} />}
      withDivider
      headerLeft="Order Book"
    >
      <OrderBookPair
        processedAsks={processedAsks}
        processedBids={processedBids}
        lastTrade={lastTrade}
        markPrice={markPrice}
        maxRows={4}
        scroll={false}
      />
    </NormalCard>
  );
};

const exampleItems = [
  {
    id: "view",
    name: "View D",
    onClick: () => alert("Viewing details..."),
  },
  {
    id: "duplicate",
    name: "Duplicate",
    onClick: () => alert("Duplicated!"),
  },
  {
    id: "custom-jsx",
    name: "Delete",
    onClick: () => alert("Deleted!"),
  },
  {
    id: "copy",
    show: true,
    name: "Copy",
    onClick: () => navigator.clipboard.writeText("Copied content!"),
  },
  {
    id: "hidden-item",
    name: "This won't show",
    show: false,
  },
];
