/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BINANCE_TESTNET_REST_BASE_URL: string;
  readonly VITE_BINANCE_TESTNET_WS_BASE_URL: string;
  readonly VITE_BINANCE_GENERAL_REST_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
