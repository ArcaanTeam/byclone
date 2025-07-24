import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useAllTickersStore } from "@/lib/store/all-tickers.store";
import { useMarketStore } from "@/lib/store/market.store";

// Symbols مورد نظر برای دریافت ticker
const symbolsToShow = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
// Symbol اصلی صفحه (مثلاً ETHUSDT که کاربر انتخاب کرده)
const mainSymbol = "ETHUSDT";

// ساخت استریم ترکیبی
const streamsParam = symbolsToShow
  .map((s) => s.toLowerCase() + "@ticker")
  .join("/");
const SOCKET_URL = `wss://fstream.binance.com/stream?streams=${streamsParam}`;

// تعریف نوع داده دریافتی ticker طبق Binance API
interface BinanceTickerData {
  e: string; // event type: "24hrTicker"
  E: number; // event time
  s: string; // symbol, e.g. "ETHUSDT"
  p: string; // price change in 24h (absolute)
  P: string; // price change in 24h (percent)
  w: string; // weighted avg price
  c: string; // last price
  Q: string; // last quantity
  o: string; // open price 24h ago
  h: string; // high price 24h
  l: string; // low price 24h
  v: string; // volume of base asset (e.g., ETH)
  q: string; // volume of quote asset (e.g., USDT)
  // ... (fields F, L, n for trade counts can وجود داشته باشند که اینجا نیاز نداریم)
}

export const useBinanceTickers = () => {
  const updateTickers = useAllTickersStore((s) => s.updateTickers);
  const updateMarket = useMarketStore((s) => s.update);

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    // تنظیمات reconnect مثل قبل
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (!lastJsonMessage) return;
    // پیام‌های استریم ترکیبی دارای ساختار { stream: "...@ticker", data: { ... } } هستند
    const combinedMsg = lastJsonMessage as {
      stream: string;
      data: BinanceTickerData;
    };
    const data = combinedMsg.data;
    if (!data || !data.s) return;
    const symbol = data.s.toUpperCase();

    // 1. به‌روزرسانی store همه tickerها:
    updateTickers([
      {
        symbol: symbol,
        lastPrice: data.c,
        changePercent: data.P,
      },
    ]);

    // 2. در صورتی که این پیام مربوط به symbol اصلی باشد، MarketStore را به‌روزرسانی کنیم
    if (symbol === mainSymbol) {
      updateMarket({
        lastPrice: data.c,
        priceChange: data.p,
        changePercent: data.P,
        high24h: data.h,
        low24h: data.l,
        volumeBTC: data.v, // *توجه*: اگر mainSymbol = ETHUSDT باشد، این حجم ETH در 24h است
        volumeUSDT: data.q, // حجم quote (USDT) در 24h
      });
    }
  }, [lastJsonMessage, updateTickers, updateMarket]);
};
