import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/tabs";

export function ChartPanel() {
  return (
    <div className="bg-card rounded p-4 flex flex-col">
      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="data">Trading Data</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="h-80 bg-background rounded-sm">
          {/* کانال نمودار میله‌ای */}
          <div className="h-full flex items-center justify-center text-foreground">
            Chart Placeholder
          </div>
        </TabsContent>
        <TabsContent value="info">
          <div className="text-foreground">Market Info...</div>
        </TabsContent>
        <TabsContent value="data">
          <div className="text-foreground">Data...</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
