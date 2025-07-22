import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithUnit(
  value: number,
  digits: number = 2
): string {
  if (value === 0) return "0";
  const units = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier === 0) return value.toFixed(digits);

  const suffix = units[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  return scaled.toFixed(digits) + suffix;
}
