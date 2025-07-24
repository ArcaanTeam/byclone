import { NormalCard } from "@/lib/components/ui/card/card";
import { TradePanelContextProvider } from "./PlaceOrder.context";
import AuthButtons from "./auth-buttons";
import { PlaceOrderTabs } from "./place-order-tabs";

export function TradePanel() {
  return (
    <TradePanelContextProvider>
      <NormalCard headerLeft="Place Order" notDraggable>
        <PlaceOrderTabs />
        <div className="mb-10" />
        <AuthButtons />
      </NormalCard>
    </TradePanelContextProvider>
  );
}
