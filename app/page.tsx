import HomeView from "@/lib/components/views/Home.view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Byclone",
  description: "Binance clone",
};

export default function Page() {
  return <HomeView />;
}
