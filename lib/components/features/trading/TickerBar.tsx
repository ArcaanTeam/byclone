export default function TickerBar() {
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-background border-b">
      <span className="font-bold">BTCUSDT</span>
      <span>Price: --</span>
      <span>Change: --</span>
    </div>
  );
}
