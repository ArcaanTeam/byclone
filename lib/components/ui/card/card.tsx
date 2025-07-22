"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/lib/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type CardProps = {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  withDivider?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function NormalCard({
  headerLeft,
  headerRight,
  withDivider = true,
  className,
  children,
}: CardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col mt-4 bg-red-800 border border-[var(--color-border)] rounded-[var(--border-radius-sm)] overflow-hidden",
        className
      )}
    >
      <CardHeader className="drag-handle flex flex-row items-center justify-between py-2 px-3 space-y-0">
        {/* سمت چپ هدر */}
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
          {headerLeft}
        </div>

        {/* سمت راست هدر */}
        <div className="flex items-center gap-2">
          {headerRight ?? <DefaultMenu />}
        </div>
      </CardHeader>

      {withDivider && <Separator className="bg-[var(--color-border)]" />}

      <CardContent className="flex-1 overflow-hidden p-0">
        {children}
      </CardContent>
    </Card>
  );
}

function DefaultMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-1 rounded hover:bg-[var(--color-border)]/20 transition-colors"
          aria-label="more"
        >
          <MoreHorizontal className="w-4 h-4 text-[var(--color-muted)]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-36">
        <DropdownMenuItem>Pop out</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Reset size</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
