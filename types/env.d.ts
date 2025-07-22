namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_BINANCE_TESTNET_REST_BASE_URL: string;
    NEXT_PUBLIC_BINANCE_GENERAL_REST_BASE_URL: string;
    NEXT_PUBLIC_BINANCE_TESTNET_WS_BASE_URL: string;
    NEXT_PUBLIC_BINANCE_WS_BASE_URL: string;
  }
}
