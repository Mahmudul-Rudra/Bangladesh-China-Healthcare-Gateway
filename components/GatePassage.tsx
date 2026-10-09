"use client";

import { useEffect, useRef } from "react";
import { T } from "@/lib/i18n";
import Photo from "./Photo";

/**
 * "Walking through the gate": as the visitor scrolls, a small round window
 * (the moon gate) widens until Kunming fills the whole screen, then the words arrive.
 */
export default function GatePassage() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        const p = Math.max(0, Math.min(1, -r.top / (travel || 1)));
        el.style.setProperty("--p", p.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="passage" ref={ref} aria-label="Kunming">
      <div className="passage-sticky">
        <div className="passage-photo">
          <Photo name="hero-kunming" sizes="100vw" />
        </div>
        <div className="passage-ring" aria-hidden="true" />
        <div className="passage-hint" aria-hidden="true"><T en="Step through the gate" bn="দরজা পেরিয়ে আসুন" /></div>
        <div className="passage-copy">
          <span className="passage-hz hz">昆明</span>
          <h2><T en="Kunming. Three hours from Dhaka." bn="কুনমিং। ঢাকা থেকে তিন ঘণ্টা।" /></h2>
          <p><T en="Closer than most families think, and someone from home is waiting when you land." bn="অনেকে যত দূর ভাবেন, তার চেয়ে কাছে। নামার পরই দেশের একজন মানুষ অপেক্ষায় থাকেন।" /></p>
        </div>
      </div>
    </section>
  );
}
