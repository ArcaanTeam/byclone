import { useOrderBookStore } from '@/store/order-book.store';

const LevelRow = ({ level, type }: { level: [string, string]; type: 'bid' | 'ask' }) => {
    const [price, qty] = level;
    return (
        <div className={`level-row ${type}`}>
            <span className="price">{price}</span>
            <span className="qty">{qty}</span>
        </div>
    );
};

export const OrderBook = () => {
    const bids = useOrderBookStore((s) => s.bids);
    const asks = useOrderBookStore((s) => s.asks);

    return (
        <div className="order-book">
            <div className="column">
                <h3>Bids</h3>
                {bids.map((bid, idx) => (
                    <LevelRow key={idx} level={bid} type="bid" />
                ))}
            </div>
            <div className="column">
                <h3>Asks</h3>
                {asks.map((ask, idx) => (
                    <LevelRow key={idx} level={ask} type="ask" />
                ))}
            </div>
        </div>
    );
};
