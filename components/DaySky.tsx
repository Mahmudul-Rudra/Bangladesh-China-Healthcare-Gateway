"use client";

import { useEffect, useRef, useState } from "react";
import { DAY } from "@/lib/content";
import type { ImageName } from "@/lib/images";
import { T } from "@/lib/i18n";
import Photo from "./Photo";

/**
 * A treatment day in Kunming. The arch-shaped frame shows the photo for the hour in focus;
 * photos cross-fade with a slow drift, the sun travels its arc across the top of the frame,
 * and the light tint follows the time of day.
 */
export default function DaySky() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // The hour in focus is the last one whose top has passed the middle of the screen.
  useEffect(() => {
    let raf = 0;
    const pick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.55;
        let idx = 0;
        itemRefs.current.forEach((li, i) => { if (li && li.getBoundingClientRect().top < mid) idx = i; });
        setActive(idx);
      });
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", pick); window.removeEventListener("resize", pick); };
  }, []);

  const item = DAY[active];
  const t = Math.max(0, Math.min(1, (item.h - 5) / 17));
  const ang = Math.PI * (1 - t);
  const cx = 200 + 160 * Math.cos(ang);
  const cy = item.h >= 20.5 ? 215 : 190 - 150 * Math.sin(ang);
  const night = item.h >= 19 || item.h < 6;
  const tint = night ? "rgba(10, 30, 52, .38)" : item.h >= 16 ? "rgba(200, 120, 40, .18)" : "rgba(255, 236, 200, .06)";

  return (
    <div className="day">
      <div className="sky" aria-hidden="true">
        {DAY.map((d, i) => (
          <div key={d.time} className={`sky-photo${i === active ? " on" : ""}`}>
            <Photo name={`day-${d.time.replace(":", "")}` as ImageName} sizes="(max-width: 860px) 92vw, 560px" decorative />
          </div>
        ))}
        <div className="sky-tint" style={{ background: tint }} />
        <svg className="sky-arc" viewBox="0 0 400 320" preserveAspectRatio="xMidYMin meet">
          <path className="arc" d="M40,190 A160,150 0 0 1 360,190" />
          <circle className="halo" cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="26" />
          <circle className={`sun${night ? " moon" : ""}`} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="11" />
        </svg>
        <div className="sky-clock">
          <b>{item.time}</b>
          <span><T en="Kunming time" bn="কুনমিংয়ের সময়" /></span>
        </div>
      </div>
      <ol className="timeline">
        {DAY.map((d, i) => (
          <li
            key={d.time}
            data-i={i}
            tabIndex={0}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={i === active ? "active" : undefined}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <time>{d.time}</time>
            <div><b><T en={d.en} bn={d.bn} /></b><span><T en={d.subEn} bn={d.subBn} /></span></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
