import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import { TradePanelTabs, useTradePanelContext } from "./PlaceOrder.context";
import PriceInput from "./price-input";
import OrderSizeInput from "./order-size-input";
import AvailableBar from "./available-bar";

export function PlaceOrderTabs() {
  const { tab, setTab } = useTradePanelContext();

  return (
    <Tabs
      defaultValue="Limit"
      value={tab}
      onValueChange={(value) => setTab(value as TradePanelTabs)}
      className="w-full px-1"
    >
      <TabsList className="w-full border-b border-gray-200 rounded-none justify-start bg-transparent">
        <TabsTrigger
          value="Limit"
          className={`relative max-w-fit px-3 py-2 text-sm text-gray-500 dark:text-gray-500 font-medium transition-colors border-none
            data-[state=active]:text-white
            data-[state=active]:font-bold
            data-[state=active]:bg-transparent
            data-[state=active]:border-none
            data-[state=inactive]:border-none
            data-[state=hover]:border-none
            data-[state=active]:after:absolute
            data-[state=active]:after:content-['']
            data-[state=active]:after:left-1/2
            data-[state=active]:after:-translate-x-1/2
            data-[state=active]:after:bottom-[-4px]
            data-[state=active]:after:h-[3px]
            data-[state=active]:after:w-4
            data-[state=active]:after:bg-yellow-400
          `}
        >
          Limit
        </TabsTrigger>
        <TabsTrigger
          value="Market"
          className={`relative max-w-fit px-3 py-2 text-sm font-medium dark:text-gray-500 text-gray-500 transition-color border-none
            data-[state=active]:text-white
            data-[state=active]:font-bold
            data-[state=active]:border-none
            data-[state=active]:bg-transparent
            data-[state=active]:after:absolute
            data-[state=active]:after:content-['']
            data-[state=active]:after:left-1/2
            data-[state=active]:after:-translate-x-1/2
            data-[state=active]:after:bottom-[-4px]
            data-[state=active]:after:h-[3px]
            data-[state=active]:after:w-4
            data-[state=active]:after:bg-yellow-400
          `}
        >
          Market
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Limit">
        <div className="flex flex-col gap-[16px]">
          <AvailableBar />
          <PriceInput />
          <OrderSizeInput />
        </div>
      </TabsContent>
      <TabsContent value="Market">
        <div className="flex flex-col gap-[16px]">
          <AvailableBar />
          <OrderSizeInput />
        </div>
      </TabsContent>
    </Tabs>
  );
}
