import { useEffect, useMemo } from "react";
import useWebSocket from "react-use-websocket";
import { useMarketStore } from "lib/store/market.store";
import throttle from "lodash/throttle";

interface BinanceTickerStreamData {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  c: string;
  Q: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
}

const binanceWebsocketBaseUrl =
  process.env.NEXT_PUBLIC_BINANCE_TESTNET_WS_BASE_URL;
const symbol = "btcusdt";
const SOCKET_URL = `${binanceWebsocketBaseUrl}/ws/${symbol}@ticker`;

export const useBinanceTicker = () => {
  const update = useMarketStore((s) => s.update);

  const throttledUpdate = useMemo(
    () =>
      throttle((msg: BinanceTickerStreamData) => {
        const {
          c: lastPrice,
          P: changePercent,
          h: high24h,
          p: priceChange,
          l: low24h,
          v: volumeBTC,
          q: volumeUSDT,
        } = msg;

        update({
          lastPrice,
          changePercent,
          high24h,
          low24h,
          volumeBTC,
          volumeUSDT,
          priceChange,
        });
      }, 500),
    [update]
  );

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      throttledUpdate(lastJsonMessage as BinanceTickerStreamData);
    }
  }, [lastJsonMessage, throttledUpdate]);
};
