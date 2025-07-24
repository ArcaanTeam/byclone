"use client";

import React, { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  // سری‌ها و تایپ‌ها را باید جداگانه ایمپورت کنید
  CandlestickSeries,
  HistogramSeries,
  type CandlestickData,
  type HistogramData,
  type SeriesDataItemTypeMap,
} from "lightweight-charts";
import { useCandlesStore } from "@/lib/store/candles.store";
import { NormalCard } from "../../ui/card/card";
import { ArrowDown } from "lucide-react";

export function CandleChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chart = useRef<IChartApi | null>(null);
  const candleSeries = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeries = useRef<ISeriesApi<"Histogram"> | null>(null);

  // داده‌هایی که در Zustand ذخیره کرده‌اید باید با تایپ‌های رسمی سازگار شوند
  const rawCandles = useCandlesStore((s) => s.candles);
  const rawVolume = useCandlesStore((s) => s.volume);

  const hasSetInitialData = useRef(false);

  // تبدیل داده خام به فرمت مورد انتظار کتابخانه
  const candles = rawCandles.map(
    (c): CandlestickData<UTCTimestamp> => ({
      time: c.time as UTCTimestamp, // مطمئن شوید time به ثانیه است نه میلی‌ثانیه
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    })
  );

  const volume = rawVolume.map(
    (v): HistogramData<UTCTimestamp> => ({
      time: v.time as UTCTimestamp,
      value: v.value,
      color: v.color, // اختیاری
    })
  );

  useEffect(() => {
    if (!chartRef.current) return;

    chart.current = createChart(chartRef.current, {
      layout: { background: { color: "#0F172A" }, textColor: "#CBD5E1" },
      grid: {
        vertLines: { color: "#1E293B" },
        horzLines: { color: "#1E293B" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    // در v5 باید از addSeries استفاده کنید و نوع سری را import نمایید
    candleSeries.current = chart.current.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    volumeSeries.current = chart.current.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "", // نمایش روی همان پنل
    });

    return () => {
      chart.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!candleSeries.current || !volumeSeries.current) return;

    if (!hasSetInitialData.current) {
      // بار اول: کل داده را ست می‌کنیم
      if (candles.length && volume.length) {
        candleSeries.current.setData(candles);
        volumeSeries.current.setData(volume);
        hasSetInitialData.current = true;
      }
    } else {
      // از بار دوم به بعد: فقط آخرین داده را آپدیت کن
      if (candles.length > 0) {
        const latestCandle = candles[candles.length - 1];
        candleSeries.current.update(
          latestCandle as SeriesDataItemTypeMap["Candlestick"]
        );
      }
      if (volume.length > 0) {
        const latestVolume = volume[volume.length - 1];
        volumeSeries.current.update(
          latestVolume as SeriesDataItemTypeMap["Histogram"]
        );
      }
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
