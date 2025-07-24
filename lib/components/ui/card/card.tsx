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
import clsx from "clsx";

type CardProps = {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  withDivider?: boolean;
  className?: string;
  notDraggable?: boolean;
  children: React.ReactNode;
};

export function NormalCard({
  headerLeft,
  headerRight,
  className,
  children,
  notDraggable,
}: CardProps) {
  return (
    <Card
      className={cn(
        "flex bg-slate-800 h-full w-full flex-col overflow-hidden border-0 px-2 py-2",
        className
      )}
    >
      <CardHeader
        className={clsx(
          "flex flex-row items-center justify-between py-2 px-3 space-y-0 border-b-[.25px]",
          !notDraggable && "drag-handle"
        )}
      >
        <div className="flex items-center gap-2 text-sm font-medium ">
          {headerLeft}
        </div>

        <div className="flex items-center gap-2">{headerRight ?? null}</div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        {children}
      </CardContent>
    </Card>
  );
}
