"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTr } from "@/lib/i18n";

type Theme = "light" | "dark";
const KEY = "gw-theme";

/**
 * The theme switch: a tiny horizon with two hills (Dhaka and Kunming).
 * Pressing it sets the sun behind the hills and raises the moon (or the reverse),
 * while the whole page changes theme in a circle that spreads out from the button.
 */
export default function ThemeDial() {
  const tr = useTr();
  const btn = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<Theme>("light");

  // Start from the saved choice, otherwise the device setting.
  useEffect(() => {
    const set = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(set === "dark" || set === "light" ? set : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch {}
      setTheme(next);
    };
    type VT = { ready: Promise<void> };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => VT };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce || !btn.current) { apply(); return; }

    const r = btn.current.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(() => flushSync(apply));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 1000, easing: "cubic-bezier(.65,0,.25,1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {});
  }

  const dark = theme === "dark";
  const label = dark ? tr("Switch to the dawn (light) theme", "ভোরের (লাইট) থিমে যান") : tr("Switch to the night (dark) theme", "রাতের (ডার্ক) থিমে যান");

  return (
    <button ref={btn} type="button" className={`horizon${dark ? " is-dark" : ""}`} onClick={toggle} aria-label={label} title={label}>
      <svg viewBox="0 0 58 38" aria-hidden="true">
        <defs>
          <clipPath id="hz-arch"><path d="M1 37 V22 A28 21 0 0 1 57 22 V37 Z" /></clipPath>
          <linearGradient id="hz-dawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B9A7D6" />
            <stop offset=".55" stopColor="#F4C29A" />
            <stop offset="1" stopColor="#F9E3C8" />
          </linearGradient>
          <linearGradient id="hz-dusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B1630" />
            <stop offset="1" stopColor="#24305A" />
          </linearGradient>
          <radialGradient id="hz-glow"><stop offset="0" stopColor="#FFE2B8" stopOpacity=".9" /><stop offset="1" stopColor="#FFE2B8" stopOpacity="0" /></radialGradient>
        </defs>
        <g clipPath="url(#hz-arch)">
          <rect className="hz-day" width="58" height="38" fill="url(#hz-dawn)" />
          <rect className="hz-night" width="58" height="38" fill="url(#hz-dusk)" />
          <g className="hz-stars" fill="#fff">
            <circle cx="12" cy="12" r=".9" /><circle cx="44" cy="9" r=".8" /><circle cx="36" cy="18" r=".7" />
          </g>
          <circle className="hz-sun-glow" cx="29" cy="14" r="11" fill="url(#hz-glow)" />
          {/* sun on top, moon underneath: the wheel turns half a circle */}
          <g className="hz-wheel">
            <circle cx="29" cy="14" r="5.2" fill="#F2A65A" />
            <g transform="rotate(180 29 34)">
              <path d="M27 9.5 a5.2 5.2 0 1 0 6.4 7 a4.2 4.2 0 1 1 -6.4 -7z" fill="#EEF1EA" />
            </g>
          </g>
          <path className="hz-hill-l" d="M0 38 V29 Q9 21 19 27 Q24 30 30 38 Z" />
          <path className="hz-hill-r" d="M58 38 V27 Q49 20 39 26 Q32 30 26 38 Z" />
        </g>
        <path className="hz-frame" d="M1 37 V22 A28 21 0 0 1 57 22 V37 Z" />
      </svg>
    </button>
  );
}
