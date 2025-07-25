import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, UIEventHandler, useEffect, useRef, useState } from "react";

type HorizontalFadeScrollProps<T> = {
  items: T[];
  renderItem?: (item: T, idx: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  gradientWidth?: number;
  backgroundClass?: string;
};

export function HorizontalFadeScroll<T>({
  items,
  renderItem,
  className = "",
  itemClassName = "",
  gradientWidth = 32,
  backgroundClass = "",
}: HorizontalFadeScrollProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  /** وضع نمایش دکمه‌ها و گرادیان را بر اساس اسکرول آپدیت می‌کند */
  const checkScroll: UIEventHandler<HTMLDivElement> | (() => void) = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  /** مقدار تقریبی عرض یک آیتم (برای اسکرول با دکمه‌ها) */
  const getItemWidth = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const firstChild = el.querySelector<HTMLElement>(".scroll-item");
    if (!firstChild) return 0;
    // gap‑6 ⇒ 1.5rem ⇒ +24px
    return firstChild.offsetWidth + 24;
  };

  /** اسکرول نرم به چپ/راست */
  const scrollByDir = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = getItemWidth() || el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // @ts-ignore
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    // @ts-ignore
    el.addEventListener("scroll", checkScroll, { passive: true });
    // @ts-ignore
    window.addEventListener("resize", checkScroll);
    return () => {
      // @ts-ignore
      el.removeEventListener("scroll", checkScroll);
      // @ts-ignore
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div
      className={`relative w-full scrollbar-hide ${backgroundClass} ${className}`}
    >
      {showLeft && items.length > 2 && (
        <button
          onClick={() => scrollByDir("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 p-1 rounded"
        >
          <ChevronLeft className="text-white h-4 w-4" />
        </button>
      )}

      {showRight && items.length > 2 && (
        <button
          onClick={() => scrollByDir("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 p-1 rounded"
        >
          <ChevronRight className="text-white h-4 w-4" />
        </button>
      )}

      {showLeft && items.length > 2 && (
        <div
          className="pointer-events-none absolute  inset-y-0 left-0 z-10"
          style={{
            width: gradientWidth,
            background:
              "linear-gradient(to right,var(--tw-gradient-from),transparent)",
          }}
        >
          <div className="h-full w-full from-white dark:from-gray-800"></div>
        </div>
      )}

      {showRight && items.length > 2 && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: gradientWidth,
            background:
              "linear-gradient(to left,var(--tw-gradient-from),transparent)",
          }}
        >
          <div className="h-full w-full from-white dark:from-gray-800"></div>
        </div>
      )}

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
      >
        <div className="inline-flex gap-6 px-2 py-2 scrollbar-hide">
          {items.map((item, idx) => (
            <div key={idx} className={`scroll-item shrink-0 ${itemClassName}`}>
              {renderItem ? renderItem(item, idx) : String(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
