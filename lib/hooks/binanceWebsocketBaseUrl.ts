import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useMarketStore } from "lib/store/market.store";

interface BinanceTickerStreamData {
  e: string; // event type
  E: number; // event time (timestamp)
  s: string; // symbol, example: "BTCUSDT"
  p: string; // price change
  P: string; // price change percent
  w: string; // weighted average price
  c: string; // last price
  Q: string; // last quantity
  o: string; // open price
  h: string; // high price
  l: string; // low price
  v: string; // total traded base asset volume
  q: string; // total traded quote asset volume
  O: number; // stats open time
  C: number; // stats close time
  F: number; // first trade ID
  L: number; // last trade ID
  n: number; // total number of trades
}

const binanceWebsocketBaseUrl =
  process.env.NEXT_PUBLIC_BINANCE_TESTNET_WS_BASE_URL;
const symbol = "btcusdt";
const SOCKET_URL = `${binanceWebsocketBaseUrl}/ws/${symbol}@ticker`;

export const useBinanceTicker = () => {
  const update = useMarketStore((s) => s.update);

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const {
        c: lastPrice,
        P: changePercent,
        h: high24h,
        l: low24h,
        v: volumeBTC,
        q: volumeUSDT,
      } = lastJsonMessage as BinanceTickerStreamData;

      update({
        lastPrice,
        changePercent,
        high24h,
        low24h,
        volumeBTC,
        volumeUSDT,
      });
    }
  }, [lastJsonMessage, update]);
};
