// src/components/order-book/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { OrderRow } from "../types/order-row";
import { TextVariant } from "@/lib/components/ui/text-variant";

export const orderBookColumns: ColumnDef<OrderRow>[] = [
  {
    accessorKey: "price",
    id: "price",
    header: () => <span>Price (USDT)</span>,
    cell: ({ getValue, row }) => {
      const val = Number(getValue());
      const variant = row.original.side === "bid" ? "success" : "danger";
      return (
        <TextVariant variant={variant}>
          {val.toLocaleString("en-US")}
        </TextVariant>
      );
    },
  },
  {
    accessorKey: "size",
    header: () => <span>Size (FUN)</span>,
    cell: ({ getValue }) => `${Number(getValue()).toFixed(3)}k`,
  },
  {
    accessorKey: "sum",
    header: () => <span>Sum (FUN)</span>,
    cell: ({ getValue }) => `${Number(getValue()).toFixed(3)}k`,
  },
];
