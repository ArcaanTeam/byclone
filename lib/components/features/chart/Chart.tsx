import React, { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  CandlestickSeriesOptions,
  HistogramSeriesOptions,
  SeriesDefinition,
  CandlestickSeries,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  Time,
  UTCTimestamp,
} from "lightweight-charts";
import { useCandlesStore } from "@/lib/store/candles.store";
import { NormalCard } from "../../ui/card/card";
import { ArrowDown, Circle, Diamond, Square } from "lucide-react";

type Candle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

type VolumeBar = {
  time: UTCTimestamp;
  value: number;
  color?: string;
};

export function CandleChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chart = useRef<IChartApi>(null);
  const candleSeries = useRef<ISeriesApi<"Candlestick">>(null);
  const volumeSeries = useRef<ISeriesApi<"Histogram">>(null);

  const candles = useCandlesStore((s) => s.candles) as Candle[];
  const volume = useCandlesStore((s) => s.volume) as VolumeBar[];

  useEffect(() => {
    if (!chartRef.current) return;

    chart.current = createChart(chartRef.current, {
      layout: {
        background: { color: "#0F172A" },
        textColor: "#CBD5E1",
      },
      grid: {
        vertLines: { color: "#1E293B" },
        horzLines: { color: "#1E293B" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    candleSeries.current = chart.current.addSeries(
      CandlestickSeries as SeriesDefinition<"Candlestick">,
      {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      } as CandlestickSeriesOptions
    );

    volumeSeries.current = chart.current.addSeries(
      HistogramSeries as SeriesDefinition<"Histogram">,
      {
        color: "#26a69a",
        priceFormat: { type: "volume" },
        priceScaleId: "", // overlay
      } as HistogramSeriesOptions
    );

    return () => chart.current?.remove();
  }, []);

  useEffect(() => {
    if (candleSeries.current && candles.length) {
      candleSeries.current.setData(candles);
    }
    if (volumeSeries.current && volume.length) {
      volumeSeries.current.setData(volume);
    }
  }, [candles, volume]);

  return (
    <NormalCard
      headerLeft="Chart"
      headerRight={<ArrowDown className="h-4 w-4 cursor-pointer" />}
      withDivider
    >
      <div ref={chartRef} className="w-full h-full mt-2" />
    </NormalCard>
  );
}
