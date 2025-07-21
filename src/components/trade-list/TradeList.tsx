import useBinanceWebsocket from "@/hooks/useBinanceWebsocket";
import { type AggTradeData, type TradeListItem } from "@/types/binance";
import React, { useState } from "react";
import './trade-list.css';

interface TradeListProps {
    symbol: string;
    maxItems?: number;
}

const TradeList: React.FC<TradeListProps> = ({ symbol, maxItems }) => {
    const [trades, setTrades] = useState<TradeListItem[]>([]);

    const handleWebsocketMessages = (data: unknown) => {
        if (
            typeof data === "object" &&
            data !== null &&
            "e" in data &&
            data.e === "aggTrade"
        ) {
            const tradeData = data as AggTradeData;

            const newTrade: TradeListItem = {
                id: tradeData.a,
                price: parseFloat(tradeData.p),
                quantity: parseFloat(tradeData.q),
                quoteQty: parseFloat(tradeData.p) * parseFloat(tradeData.q),
                time: new Date(tradeData.T).toLocaleTimeString(),
                isBuyerMaker: tradeData.m,
                isBestMatch: false // Not available in WS data
            };

            setTrades(prev => {
                // Prevent duplicate trades (can happen during reconnections)
                if (prev.some(t => t.id === newTrade.id)) {
                    return prev;
                }

                const newTrades = [...prev, newTrade]
                return newTrades.slice(0, maxItems)
            })
        }
    }

    const { isConnected } = useBinanceWebsocket(symbol, handleWebsocketMessages);

    if (!isConnected)
        return <div className="trade-list-loading">Loading trades...</div>

    return (
        <div className="trade-list">
            <h3 className="trade-list-title">Recent Trades</h3>
            <div className="trade-list-header">
                <span>Price (USDT)</span>
                <span>Amount (BTC)</span>
                <span>Total (USDT)</span>
                <span>Time</span>
            </div>
            <div className="trade-list-items">
                {trades.map((trade) => (
                    <div
                        key={`trade-${trade.id}`}
                        className={`trade-item ${trade.isBuyerMaker ? 'sell' : 'buy'}`}
                    >
                        <span className="trade-price">{trade.price.toFixed(2)}</span>
                        <span className="trade-quantity">{trade.quantity.toFixed(6)}</span>
                        <span className="trade-total">{trade.quoteQty.toFixed(2)}</span>
                        <span className="trade-time">{trade.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TradeList;