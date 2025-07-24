import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useCandlesStore } from "../store/candles.store";

interface BinanceKlineMessage {
  e: string;
  k: {
    t: number; // open time
    o: string;
    h: string;
    l: string;
    c: string;
    v: string;
  };
}

export const useBinanceCandles = (symbol: string) => {
  const interval = useCandlesStore((s) => s.interval);
  const updateLatest = useCandlesStore((s) => s.updateLatest);
  const setCandles = useCandlesStore((s) => s.setCandles);
  const setVolume = useCandlesStore((s) => s.setVolume);

  // ✅ Fetch historical data from REST API
  useEffect(() => {
    const fetchHistorical = async () => {
      try {
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=500`;
        const response = await fetch(url);
        const data = await response.json();

        const candles = data.map((k: any) => ({
          time: k[0] / 1000,
          open: parseFloat(k[1]),
          high: parseFloat(k[2]),
          low: parseFloat(k[3]),
          close: parseFloat(k[4]),
        }));

        const volume = data.map((k: any) => ({
          time: k[0] / 1000,
          value: parseFloat(k[5]),
          color: parseFloat(k[4]) >= parseFloat(k[1]) ? "#26a69a" : "#ef5350",
        }));

        setCandles(candles);
        setVolume(volume);
      } catch (err) {
        console.error("Error fetching historical candles:", err);
      }
    };

    fetchHistorical();
  }, [symbol, interval, setCandles, setVolume]);

  // ✅ Live data via WebSocket
  const SOCKET_URL = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;

  const { lastJsonMessage } = useWebSocket<BinanceKlineMessage>(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage.e !== "kline") return;

    const k = lastJsonMessage.k;

    const newCandle = {
      time: k.t / 1000,
      open: parseFloat(k.o),
      high: parseFloat(k.h),
      low: parseFloat(k.l),
      close: parseFloat(k.c),
    };

    const newVolume = {
      time: k.t / 1000,
      value: parseFloat(k.v),
      color: parseFloat(k.c) >= parseFloat(k.o) ? "#26a69a" : "#ef5350",
    };

    updateLatest(newCandle, newVolume);
  }, [lastJsonMessage, updateLatest]);
};
