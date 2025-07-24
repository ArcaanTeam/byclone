import { throttle } from "lodash";
import { useTradeStore } from "lib/store/trades-list.store";
import { useMarketStore } from "lib/store/market.store";
import { useEffect, useMemo } from "react";
import useWebSocket from "react-use-websocket";

const symbol = "btcusdt";
const SOCKET_URL = `${process.env.NEXT_PUBLIC_BINANCE_WS_BASE_URL}/ws/${symbol}@aggTrade`;

export const useBinanceTrades = () => {
  const pushTrade = useTradeStore((s) => s.pushTrade);
  const updateMarket = useMarketStore((s) => s.update);

  const throttledPush = useMemo(
    () =>
      throttle((trade) => {
        pushTrade(trade);
        updateMarket({ lastTrade: trade });
      }, 200),
    [pushTrade, updateMarket]
  );

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (!lastJsonMessage) return;
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
      side: msg.m ? "sell" : "buy",
    };
    throttledPush(trade);
  }, [lastJsonMessage, throttledPush]);
};
