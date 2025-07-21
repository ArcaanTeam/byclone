import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useOrderBookStore } from "@/store/order-book.store";

const binanceWebsocketBaseUrl = import.meta.env
  .VITE_BINANCE_TESTNET_WS_BASE_URL;
const symbol = "btcusdt";
const SOCKET_URL = `${binanceWebsocketBaseUrl}/ws/${symbol}@depth20@100ms`;

export const useBinanceDepth = () => {
  const updateBook = useOrderBookStore((s) => s.updateBook);

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const { a: asks, b: bids } = lastJsonMessage as {
        a: [string, string][];
        b: [string, string][];
      };
      updateBook({ asks, bids });
    }
  }, [lastJsonMessage, updateBook]);
};
