"use client";

import React, { useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/lib/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CustomCarousel({
  items,
}: {
  items: { component: React.ReactNode; name: string }[];
}) {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div>
      {items.length >= 5 ? (
        <div className="relative max-w-[60%]">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 p-1 rounded"
          >
            <ChevronLeft className="text-white h-4 w-4" />
          </button>

          <div className="overflow-x-hidden h-full flex items-center">
            <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {items.map((child) => (
                  <CarouselItem key={child.name} className="basis-1/7">
                    {child.component}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 p-1 rounded"
          >
            <ChevronRight className="text-white h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="relative min-w-full">
          <div className="h-full w-full flex items-center gap-4">
            {items.map((child) => (
              <div key={child.name}>{child.component}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
