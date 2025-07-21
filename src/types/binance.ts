export interface AggTradeData {
  e: "aggTrade"; // Event type
  E: number; // Event time
  s: string; // Symbol
  a: number; // Aggregate trade ID
  p: string; // Price
  q: string; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Trade time
  m: boolean; // Is buyer the market maker?
}

export interface TradeListItem {
  id: number;
  price: number;
  quantity: number;
  quoteQty: number;
  time: string;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}
