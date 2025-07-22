import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "lib/components/ui/table";
import { useOrderBookStore } from "lib/store/order-book.store";

export function OrderBook() {
  const asks = useOrderBookStore((s) => s.asks);
  const bids = useOrderBookStore((s) => s.bids);

  return (
    <div className="bg-card rounded p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="text-red-500">Price</TableCell>
            <TableCell>Qty</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...asks].reverse().map(([p, q], i) => (
            <TableRow key={`ask-${i}`}>
              <TableCell className="text-red-500">{p}</TableCell>
              <TableCell>{q}</TableCell>
            </TableRow>
          ))}
          {[...bids].map(([p, q], i) => (
            <TableRow key={`bid-${i}`}>
              <TableCell className="text-green-500">{p}</TableCell>
              <TableCell>{q}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
