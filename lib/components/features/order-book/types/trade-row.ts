export interface TradeRow {
  id: number;
  price: string;
  qty: string;
  time: number;
  side: "buy" | "sell";
}
