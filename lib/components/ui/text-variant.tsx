import { cn } from "@/lib/utils";
import React from "react";

type Variant =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "neutral"
  | "accent"
  | "muted";

const variantClassMap: Record<Variant, string> = {
  primary: "text-yellow-500",
  success: "text-emerald-500",
  danger: "text-red-500",
  warning: "text-orange-500",
  neutral: "text-white",
  accent: "text-orange-400",
  muted: "text-muted-foreground",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
};

export const TextVariant = ({
  children,
  variant = "neutral",
  className,
  iconBefore,
  iconAfter,
}: Props) => {
  return (
    <span
      className={cn(
        "flex items-center gap-1",
        variantClassMap[variant],
        className
      )}
    >
      {iconBefore && <span className="shrink-0">{iconBefore}</span>}
      <span>{children}</span>
      {iconAfter && <span className="shrink-0">{iconAfter}</span>}
    </span>
  );
};
