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
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setState("in"); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const cls = `${className}${state === "wait" ? " wait" : ""}${state === "in" ? " in" : ""}`;
  return <Tag ref={ref as never} className={cls} style={style}>{children}</Tag>;
}
