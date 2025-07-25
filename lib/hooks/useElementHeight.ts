import { useEffect, useState, useRef } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height)
    );
    obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return { ref, height };
}
