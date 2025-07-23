// components/TradesTable.tsx
import * as React from "react";
import { useTradeStore } from "@/lib/store/trades-list.store";
import { DataTable } from "@/lib/components/ui/DataTable/DataTable";
import { TradeRow } from "../order-book/types/trade-row";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "lucide-react";
import { NormalCard } from "../../ui/card/card";

export function TradesTable() {
  const trades = useTradeStore((s) => s.trades);

  const columns: ColumnDef<TradeRow>[] = React.useMemo(
    () => [
      {
        accessorKey: "price",
        header: "Price (USDT)",
        cell: ({ getValue, row }) => {
          const price = Number(getValue());
          const first = trades[0]?.price;
          const className =
            price >= Number(first) ? "text-green-400" : "text-red-400";
          return <span className={className}>{price.toFixed(2)}</span>;
        },
      },
      {
        accessorKey: "qty",
        header: "Amount",
        cell: ({ getValue }) => Number(getValue()).toFixed(3),
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: ({ getValue }) => {
          const d = new Date(getValue() as number);
          return d.toLocaleTimeString("en-GB", { hour12: false });
        },
      },
    ],
    [trades]
  );

  return (
    <NormalCard
      headerLeft="Trades"
      headerRight={<ArrowDown className="h-4 w-4 cursor-pointer" />}
      withDivider
    >
      <DataTable
        data={trades}
        columns={columns}
        maxRows={100}
        scroll={true}
        rowClassName={(row) =>
          row.side === "buy" ? "bg-green-900/10" : "bg-red-900/10"
        }
      />
    </NormalCard>
  );
}
