"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Adds the class "in" once the element scrolls into view, so CSS can play its entrance.
 * Content is fully visible before JavaScript runs and for visitors who prefer less motion.
 */
export default function InView({ children, className = "", style, threshold = 0.25, as: Tag = "div" }: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  as?: "div" | "article" | "section" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"rest" | "wait" | "in">("rest");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: play immediately.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
      setState("wait");
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setState("in")));
      return () => cancelAnimationFrame(id);
    }
    setState("wait");
    // Measured from the element's box, not its visible area: elements that start fully
    // masked (clip-path) have no visible area, so an IntersectionObserver would never fire.
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const seen = Math.min(b.bottom, vh) - Math.max(b.top, 0);
        if (seen > 0 && seen >= Math.min(b.height, vh) * threshold) { setState("in"); stop(); }
      });
    };
    const stop = () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => { cancelAnimationFrame(raf); stop(); };
  }, [threshold]);

  const cls = `${className}${state === "wait" ? " wait" : ""}${state === "in" ? " in" : ""}`;
  return <Tag ref={ref as never} className={cls} style={style}>{children}</Tag>;
}
