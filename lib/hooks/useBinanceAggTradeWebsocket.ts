import { useTradeStore } from "lib/store/trades-list.store";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

const symbol = "btcusdt";
const SOCKET_URL = `${process.env.NEXT_PUBLIC_BINANCE_WS_BASE_URL}/ws/${symbol}@aggTrade`;

export const useBinanceTrades = () => {
  const pushTrade = useTradeStore((s) => s.pushTrade);

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const msg = lastJsonMessage as {
        a: number;
        p: string;
        q: string;
        m: boolean;
        T: number;
      };

      const trade = {
        id: msg.a,
        price: msg.p,
        qty: msg.q,
        time: msg.T,
        side: msg.m ? "sell" : ("buy" as "sell" | "buy"),
      };

      pushTrade(trade);
    }
  }, [lastJsonMessage, pushTrade]);
};
