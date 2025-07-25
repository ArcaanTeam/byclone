"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { ScrollArea } from "../scroll-area";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../table";
import { cn } from "@/lib/utils";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  toolbar?: React.ReactNode;
  className?: string;
  rowClassName?: (row: TData, index: number) => string | undefined;
  maxRows?: number;
  scroll?: boolean; // default: true
  showHeader?: boolean; // default: true
};

export function DataTable<TData>({
  data,
  columns,
  toolbar,
  className,
  rowClassName,
  maxRows,
  scroll = true,
  showHeader = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;
  const visibleRows = typeof maxRows === "number" ? rows.slice(-maxRows) : rows;

  const Wrapper = scroll ? ScrollArea : React.Fragment;
  const wrapperProps = scroll ? { className: "flex-1" } : {};

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      {toolbar && <div className="px-3 py-2">{toolbar}</div>}

      <Wrapper {...wrapperProps}>
        <Table className="w-full text-xs leading-5">
          {showHeader && (
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="!border-0">
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border-0 text-muted-foreground font-medium text-left cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          )}

          <TableBody>
            {visibleRows.map((row, idx) => (
              <TableRow
                key={row.id}
                className={cn("!border-0", rowClassName?.(row.original, idx))}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="border-0 px-2 py-1 text-left tabular-nums"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    </div>
  );
}
