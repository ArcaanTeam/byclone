"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/lib/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import React from "react";
export type ActionItem = {
  id: string;
  name?: string;
  show?: boolean;
  component?: React.ReactNode;
  onClick?: () => void;
  permission?: string[];
};

type ActionMenuProps = {
  items: ActionItem[];
  className?: string;
  icon?: React.ReactNode;
  contentClassName?: string;
};

export const ActionMenu = React.memo(function ActionMenu({
  items,
  className,
  icon = <MoreHorizontal className="w-4 h-4" />,
  contentClassName = "w-36",
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("p-1 rounded", className)} aria-label="actions">
          {icon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className={`${contentClassName} bg-slate-900 border-0 rounded`}
      >
        {items
          .filter((item) => item.show !== false)
          .map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={item.onClick}
              className="cursor-pointer"
            >
              {item.name ?? item.component}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
