import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useAllTickersStore } from "../store/all-tickers.store";

interface BinanceArrTicker {
  s: string; // symbol
  c: string; // last price
  P: string; // change percent
}

export const useBinanceAllTickers = () => {
  const updateTickers = useAllTickersStore((s) => s.updateTickers);

  const SOCKET_URL = `${process.env.NEXT_PUBLIC_BINANCE_TESTNET_WS_BASE_URL}/ws/!ticker@arr`;

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (Array.isArray(lastJsonMessage)) {
      const tickers = (lastJsonMessage as BinanceArrTicker[]).map((t) => ({
        symbol: t.s,
        lastPrice: t.c,
        changePercent: t.P,
      }));
      updateTickers(tickers);
    }
  }, [lastJsonMessage, updateTickers]);
};
