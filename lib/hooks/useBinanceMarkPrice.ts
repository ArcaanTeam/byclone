import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useMarketStore } from "lib/store/market.store";

interface BinanceMarkPriceData {
  p: string;
  r: string;
  T: number;
  i?: string;
}

const symbol = "btcusdt";
const SOCKET_URL = `${process.env.NEXT_PUBLIC_BINANCE_TESTNET_WS_BASE_URL}/ws/${symbol}@markPrice@1s`;

export const useBinanceMarkPrice = () => {
  const update = useMarketStore((s) => s.update);
  const { lastJsonMessage } = useWebSocket<BinanceMarkPriceData>(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  useEffect(() => {
    if (!lastJsonMessage) return;
    const {
      p: markPrice,
      r: fundingRate,
      T: nextFundingTime,
      i: indexPrice,
    } = lastJsonMessage;
    update({
      markPrice,
      fundingRate,
      nextFundingTime,
      ...(indexPrice ? { indexPrice } : {}),
    });
  }, [lastJsonMessage, update]);
};
