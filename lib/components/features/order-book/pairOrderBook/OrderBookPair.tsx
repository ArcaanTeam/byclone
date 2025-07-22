// src/components/order-book/order-book-table.tsx
// src/components/order-book/order-book-table.tsx
import { DataTable } from "@/lib/components/ui/DataTable/DataTable";
import { orderBookColumns } from "./orderBookPairColumn";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TextVariant } from "@/lib/components/ui/text-variant";
import { OrderRow } from "../types/order-row";
import { usePrevious } from "@/lib/utilsHooks/usePrevious";

type OrderBookPairProps = {
  lastTrade: {
    price: string;
    qty: string;
    time: number;
  } | null;
  processedAsks: OrderRow[];
  processedBids: OrderRow[];
  maxRows?: number;
  scroll?: boolean;
  markPrice: string;
};

export function OrderBookPair({
  processedAsks,
  processedBids,
  maxRows,
  markPrice,
  lastTrade,
  scroll,
}: OrderBookPairProps) {
  const diff = Number(markPrice) - Number(lastTrade?.price);
  const up = diff > 0;
  return (
    <div className="flex flex-col gap-2">
      <DataTable
        data={processedAsks}
        maxRows={maxRows}
        scroll={scroll}
        columns={orderBookColumns}
        rowClassName={(row) =>
          row.side === "bid"
            ? "bg-[var(--color-orderbook-buy-bg)]/10"
            : undefined
        }
      />

      <div className="flex items-center gap-2 ml-2">
        <TextVariant
          className="text-lg"
          variant={up ? "success" : "danger"}
          iconAfter={
            up ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )
          }
        >
          {lastTrade?.price}
        </TextVariant>

        <TextVariant
          className="text-xs  hover:text-binance-gold"
          variant="neutral"
        >
          {markPrice}
        </TextVariant>
      </div>

      <DataTable
        data={processedBids}
        maxRows={maxRows}
        scroll={scroll}
        showHeader={false}
        columns={orderBookColumns}
        rowClassName={(row) =>
          row.side === "bid"
            ? "bg-[var(--color-orderbook-buy-bg)]/10"
            : undefined
        }
      />
    </div>
  );
}
