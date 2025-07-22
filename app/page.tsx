"use client";

import { useBinanceTicker } from "@/lib/hooks/binanceWebsocketBaseUrl";
import { useBinanceTrades } from "@/lib/hooks/useBinanceAggTradeWebsocket";
import { useBinanceDepth } from "@/lib/hooks/useBinanceDepthWebsocket";
import { useBinanceMarkPrice } from "@/lib/hooks/useBinanceMarkPrice";
import { useBinanceOpenInterest } from "@/lib/hooks/useBinanceOpenInterest";
import HomeView from "components/views/Home.view";

export default function Page() {
  useBinanceTicker();
  useBinanceDepth();
  useBinanceTrades();
  useBinanceOpenInterest();
  useBinanceMarkPrice();

  return <HomeView />;
}
