"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/lib/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface PerpPopoverProps {
  label: string;
  children: React.ReactNode;
}

export function PerpPopover({ label, children }: PerpPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="flex items-center gap-1 text-white cursor-pointer text-[12px]">
          {label} <ChevronDown className="w-4 h-4 text-slate-500" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="w-36 p-2 border-0 rounded bg-slate-900"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
