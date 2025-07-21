import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useMarketStore } from "@/store/market.store";

interface BinanceOpenInterestData {
  o: string;
}

const SOCKET_URL = `${
  import.meta.env.VITE_BINANCE_TESTNET_WS_BASE_URL
}/ws/btcusdt@openInterest@1s`;

export const useBinanceOpenInterest = () => {
  const update = useMarketStore((s) => s.update);
  const { lastJsonMessage } = useWebSocket<BinanceOpenInterestData>(
    SOCKET_URL,
    {
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 2000,
    }
  );

  useEffect(() => {
    if (!lastJsonMessage) return;
    const { o: openInterest } = lastJsonMessage;
    update({ openInterest });
  }, [lastJsonMessage, update]);
};
