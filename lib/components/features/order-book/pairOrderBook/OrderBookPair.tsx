import { DataTable } from "@/lib/components/ui/data-table/DataTable";
import { TextVariant } from "@/lib/components/ui/text-variant";
import { ArrowDown, ArrowUp } from "lucide-react";
import { OrderRow } from "../types/order-row";
import { orderBookColumns } from "./orderBookPairColumn";
import { useState } from "react";

type OrderBookPairProps = {
  lastTrade: string;
  processedAsks: OrderRow[];
  processedBids: OrderRow[];
  maxRows?: number;
  scroll?: boolean;
  markPrice: string;
};

const OrderBookPairHeader = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  const gray = active ? "bg-gray-500" : "bg-gray-400";
  const red = active ? "bg-red-500" : "bg-red-400";
  const green = active ? "bg-green-500" : "bg-green-400";

  return (
    <div
      className={`flex items-center gap-[1px] ${
        active ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-[1px]">
        <div className={`w-[6px] h-[6px] ${red}`} />
        <div className={`w-[6px] h-[6px] ${green}`} />
      </div>
      <div className=" flex flex-col gap-[1px]">
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
      </div>
    </div>
  );
};

const OrderSingleDownHeader = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  const gray = active ? "bg-gray-500" : "bg-gray-400";
  const green = active ? "bg-green-500" : "bg-green-400";

  return (
    <div
      className={`flex items-center gap-[1px] ${
        active ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className={`w-[6px] h-[11.6px] ${green}`} />
      <div className=" flex flex-col gap-[1px]">
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
      </div>
    </div>
  );
};

const OrderSingleUpHeader = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  const gray = active ? "bg-gray-500" : "bg-gray-400";
  const red = active ? "bg-red-500" : "bg-red-400";

  return (
    <div className="flex items-center gap-[1px]" onClick={onClick}>
      <div className=" flex flex-col gap-[1px]">
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
        <div className={`w-[6px] h-[3.2px] ${gray}`} />
      </div>
      <div className={`w-[6px] h-[11.6px] ${red}`} />
    </div>
  );
};

export function OrderBookPair({
  processedAsks,
  processedBids,
  maxRows,
  markPrice,
  lastTrade,
  scroll,
}: OrderBookPairProps) {
  const diff = Number(markPrice) - Number(lastTrade);
  const up = diff > 0;

  const [active, setActive] = useState<"pair" | "single-down" | "single-up">(
    "pair"
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 ml-2 mt-2">
        <OrderBookPairHeader
          active={active === "pair"}
          onClick={() => setActive("pair")}
        />
        <OrderSingleDownHeader
          active={active === "single-down"}
          onClick={() => setActive("single-down")}
        />
        <OrderSingleUpHeader
          active={active === "single-up"}
          onClick={() => setActive("single-up")}
        />
      </div>
      {(active === "pair" || active === "single-up") && (
        <DataTable
          data={processedAsks}
          maxRows={active === "pair" ? maxRows : 8}
          scroll={active === "pair" ? scroll : true}
          columns={orderBookColumns}
          rowClassName={(row) =>
            row.side === "bid"
              ? "bg-[var(--color-orderbook-buy-bg)]/10"
              : undefined
          }
        />
      )}

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
          <pre></pre>
          {lastTrade}
        </TextVariant>

        <TextVariant
          className="text-xs hover:text-binance-gold"
          variant="neutral"
        >
          {markPrice}
        </TextVariant>
      </div>

      {(active === "pair" || active === "single-down") && (
        <DataTable
          data={processedBids}
          maxRows={active === "pair" ? maxRows : 8}
          scroll={true}
          showHeader={false}
          columns={orderBookColumns}
          rowClassName={(row) =>
            row.side === "bid"
              ? "bg-[var(--color-orderbook-buy-bg)]/10"
              : undefined
          }
        />
      )}
    </div>
  );
}
