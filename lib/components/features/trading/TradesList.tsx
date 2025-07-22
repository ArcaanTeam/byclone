export function TradesList() {
  const dummy = [
    { price: "118000", amount: "0.01", time: "12:01:23" },
    { price: "118020", amount: "0.005", time: "12:01:27" },
  ];

  return (
    <div className="bg-card rounded p-4 overflow-auto">
      <h4 className="mb-2 text-foreground">Recent Trades</h4>
      <ul className="text-sm">
        {dummy.map((t, i) => (
          <li key={i} className="flex justify-between py-1">
            <span className="text-green-500">{t.price}</span>
            <span>{t.amount}</span>
            <span className="text-foreground">{t.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
