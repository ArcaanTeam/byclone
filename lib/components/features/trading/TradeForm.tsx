import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "lib/components/ui/tabs";
import { Input } from "lib/components/ui/input";
import { Button } from "lib/components/ui/button";

export function TradeForm() {
  return (
    <div className="bg-card rounded p-4 flex flex-col gap-4">
      <Tabs defaultValue="limit">
        <TabsList>
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="stopLimit">Stop Limit</TabsTrigger>
        </TabsList>

        <TabsContent value="limit">
          <Input placeholder="Price" className="mb-2" />
          <Input placeholder="Size" className="mb-4" />
          <Button className="w-full bg-binance-gold">Buy / Sell</Button>
        </TabsContent>
        <TabsContent value="market">
          <Input placeholder="Size" className="mb-4" />
          <Button className="w-full bg-binance-gold">Market</Button>
        </TabsContent>
        <TabsContent value="stopLimit">
          <Input placeholder="Stop Price" className="mb-2" />
          <Input placeholder="Limit Price" className="mb-2" />
          <Input placeholder="Size" className="mb-4" />
          <Button className="w-full bg-binance-gold">Stop</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
