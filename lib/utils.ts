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

export function formatNumber(
  value: number | string,
  opts: {
    maxDecimals?: number; // پیش‌فرض 3
    minDecimals?: number; // پیش‌فرض 0
    locale?: string; // پیش‌فرض "en-US"
  } = {}
): string {
  const { maxDecimals = 3, minDecimals = 0, locale = "en-US" } = opts;

  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) return String(value);

  return num.toLocaleString(locale, {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
}

export function roundHalfUp(n: number) {
  return Math.floor(n + 0.5);
}
