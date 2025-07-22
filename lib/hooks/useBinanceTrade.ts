import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useMarketStore } from "@/lib/store/market.store";

interface BinanceAggTrade {
  e: "aggTrade"; // Event type
  E: number; // Event time
  s: string; // Symbol
  a: number; // Aggregate trade ID
  p: string; // Price
  q: string; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
}

const SOCKET_URL = "wss://fstream.binance.com/ws/btcusdt@trade";

export const useBinanceTrade = () => {
  const update = useMarketStore((s) => s.update);

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const { p, q, T } = lastJsonMessage as BinanceAggTrade;

      update({
        lastTrade: {
          price: p,
          qty: q,
          time: T,
        },
      });
    }
  }, [lastJsonMessage, update]);
};
