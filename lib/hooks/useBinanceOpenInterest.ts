import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useMarketStore } from "lib/store/market.store";

interface BinanceOpenInterestData {
  o: string;
}

const symbol = "btcusdt";
const SOCKET_URL = `${process.env.NEXT_PUBLIC_BINANCE_WS_BASE_URL}/ws/${symbol}@openInterest@1s`;

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
