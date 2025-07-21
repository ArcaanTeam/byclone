import { useState, useEffect, useRef, useCallback } from "react";
const websocketBaseUrl = import.meta.env.VITE_BINANCE_TESTNET_WS_BASE_URL;

const useBinanceWebsocket = (
  symbol: string,
  callback: (data: unknown) => void,
  streams: string[] = ["aggTrade", "depth"]
) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    const streamParams = streams
      .map((stream) => `${symbol.toLowerCase()}@${stream}`)
      .join("/");
    const wsUrl = `${websocketBaseUrl}/stream?streams=${streamParams}`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      console.log("Websocket connected");
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log("Websocket disconnected");
    };

    if (reconnectAttempts.current < maxReconnectAttempts) {
      const delay = Math.min(
        1000 * Math.pow(2, reconnectAttempts.current),
        30000
      );
      reconnectAttempts.current += 1;
      setTimeout(() => connect(), delay);
    }

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.data) {
          callback(parsed.data);
        }
      } catch (error) {
        console.error("Error parsing Websocket message:", error);
      }
    };

    ws.current.onerror = (error: Event) => {
      console.error("Websocket error:", error);
    };
  }, [callback, streams, symbol]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((message: unknown) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, send };
};

export default useBinanceWebsocket;
