"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Settings, Globe } from "lucide-react";
import { useTheme } from "next-themes";

export const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="w-full bg-surface px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <a href="#" className="text-binance-gold font-bold">
          🪙 Binance Futures
        </a>
        <div className="hidden md:flex gap-4 text-foreground">
          <a href="#">Futures</a>
          <a href="#">Options</a>
          <a href="#">Trading Bots</a>
          <a href="#">Copy Trading</a>
          <a href="#">More</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <button
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        <Globe size={20} />
        <Settings size={20} />
        <button className="bg-binance-gold text-black px-4 py-1 rounded">
          Sign Up
        </button>
      </div>
    </nav>
  );
};
