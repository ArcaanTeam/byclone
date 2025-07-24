import { MoreHorizontal, PercentCircle } from "lucide-react";

export default function AvailableBar() {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <div>
        <span className="font-medium">Avbl</span> - <span>USDT</span>
      </div>
      <div className="flex items-center gap-2">
        <PercentCircle className="w-4 h-4" />
        <MoreHorizontal className="w-4 h-4" />
      </div>
    </div>
  );
}
