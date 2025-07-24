import { createContext, useContext, useState } from "react";

export type TradePanelTabs = "Limit" | "Market";

const TradePanelContext = createContext<TradePanelContextType>({
  tab: "Limit",
  setTab: () => {},
});

export const TradePanelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tab, setTab] = useState<TradePanelTabs>("Limit");
  return (
    <TradePanelContext.Provider value={{ tab, setTab }}>
      {children}
    </TradePanelContext.Provider>
  );
};

export const useTradePanelContext = () => {
  const context = useContext(TradePanelContext);
  if (!context) {
    throw new Error(
      "useTradePanelContext must be used within a TradePanelProvider"
    );
  }
  return context;
};

export type TradePanelContextType = {
  tab: TradePanelTabs;
  setTab: (tab: TradePanelTabs) => void;
};
