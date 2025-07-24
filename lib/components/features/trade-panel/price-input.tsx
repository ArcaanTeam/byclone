"use client";

import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { useState } from "react";

export default function PriceInput() {
  const [price, setPrice] = useState(118669.1);

  const formatPrice = (val: number) =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

  return (
    <div className="w-full max-w-sm border-none shadow-none p-0">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Price</Label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={formatPrice(price)}
              readOnly
              className="pr-20 text-lg font-semibold border-yellow-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
              USDT
            </span>
          </div>
          <Button variant="outline" size="sm" className="font-semibold">
            BBO
          </Button>
        </div>
      </div>
    </div>
  );
}
