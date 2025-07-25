"use client";

import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Slider } from "@/lib/components/ui/slider";
import { useState } from "react";

const units = ["BTC", "ETH", "BNB", "USDT"];

export default function OrderSizeInput() {
  const [selectedUnit, setSelectedUnit] = useState("BTC");
  const [sliderValue, setSliderValue] = useState([0]);

  return (
    <div className="w-full max-w-sm:w space-y-4 border-none shadow-none bg-transparent">
      {/* Size Slider Input */}
      <div className="space-y-2 flex flex-col gap-[24px]">
        <Label className="text-muted-foreground">Size</Label>
        <div className="relative rounded-sm">
          <Input
            className="pr-20 text-lg font-medium border-gray-500 hover:border-yellow-500/75 focus-visible:ring-0 focus-visible:border-yellow-500"
            value={`${sliderValue[0]}%`}
            readOnly
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent outline-non"
              >
                {selectedUnit}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {units.map((unit) => (
                <DropdownMenuItem
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                >
                  {unit}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Slider
          min={0}
          max={100}
          step={1}
          value={sliderValue}
          onValueChange={setSliderValue}
        />
      </div>
    </div>
  );
}
