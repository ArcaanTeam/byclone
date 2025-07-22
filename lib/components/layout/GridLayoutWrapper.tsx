"use client";

import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Fix for missing type declarations for 'react-grid-layout'

const ResponsiveGrid = WidthProvider(Responsive);

const layouts = {
  lg: [
    { i: "asset-ticker", x: 0, y: 0, w: 12, h: 1 },
    { i: "ticker", x: 0, y: 0, w: 12, h: 2 },
    { i: "chart", x: 0, y: 0, w: 7, h: 14 },
    { i: "orderbook", x: 7, y: 0, w: 2, h: 8 },
    { i: "trade-list", x: 7, y: 0, w: 2, h: 6 },
    { i: "tradeform", x: 9, y: 0, w: 3, h: 14 },
    { i: "account", x: 9, y: 0, w: 3, h: 8 },
    { i: "user-trade-tabs", x: 0, y: 0, w: 7, h: 8 },
  ],
};

export const GridLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode[];
}) => (
  <ResponsiveGrid
    className="layout bg-binance-backgroundDark gap-2 p-2"
    layouts={layouts}
    breakpoints={{ lg: 1200, sm: 768 }}
    cols={{ lg: 12, sm: 1 }}
    rowHeight={30}
    draggableHandle=".drag-handle"
  >
    {children}
  </ResponsiveGrid>
);
