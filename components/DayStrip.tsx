"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DAY } from "@/lib/content";
import { CITIES, hhmm, nowIn, prayerTimes, skyColor, type Times } from "@/lib/prayer";
import { T } from "@/lib/i18n";
import AnalogClock from "./AnalogClock";
import Photo from "./Photo";

const START = 7.6;
const END = 21.6;

// A typical Kunming day, used until the real one for today is calculated in the browser.
const TYPICAL: Times = { fajr: 5.8, sunrise: 7.05, dhuhr: 12.95, asr: 17.15, maghrib: 18.8, isha: 20.05 };

/** Deterministic pseudo-random numbers, so the skyline is the same for every visitor. */
const rand = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const BUILDINGS = Array.from({ length: 26 }, (_, i) => {
  const w = 30 + rand(i) * 34;
  const h = 50 + rand(i + 40) * 110 + (i % 7 === 3 ? 40 : 0);
  return { w, h };
});

/**
 * "Kunming, hour by hour": scroll moves the day forward. The sky changes colour with the real
 * Kunming sunrise and sunset, the sun crosses and the moon rises, windows light up at night,
 * and two clocks show the time in Kunming and at home in Dhaka. Photo cards glide past like a film strip.
 */
export default function DayStrip() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [t, setT] = useState(DAY[0].h);
  const [cardW, setCardW] = useState(380);
  const [vw, setVw] = useState(1200);
  const [times, setTimes] = useState<Times>(TYPICAL);

  useEffect(() => {
    const k = CITIES[0];
    const n = nowIn(k.zone);
    setTimes(prayerTimes(k, n.y, n.m, n.d));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      setVw(el.clientWidth);
      if (cardRef.current) setCardW(cardRef.current.offsetWidth);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -r.top / ((r.height - window.innerHeight) || 1)));
        setT(START + p * (END - START));
      });
    };
    const onResize = () => { measure(); onScroll(); };
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  // Which card is centred: a smooth fractional index between the activity hours.
  const hrs = DAY.map((d) => d.h);
  let fi = 0;
  if (t <= hrs[0]) fi = 0;
  else if (t >= hrs[hrs.length - 1]) fi = hrs.length - 1;
  else for (let i = 0; i < hrs.length - 1; i++) if (t >= hrs[i] && t <= hrs[i + 1]) {
    // Hold on each card for most of its hour, then glide to the next.
    const k = (t - hrs[i]) / (hrs[i + 1] - hrs[i]);
    const eased = k < 0.55 ? 0 : (k - 0.55) / 0.45;
    fi = i + eased * eased * (3 - 2 * eased);
  }
  const active = Math.round(fi);
  const gap = 28;
  const x = vw / 2 - (fi * (cardW + gap) + cardW / 2);

  const top = skyColor(t, times);
  const low = skyColor(t + 0.9, times);
  const night = Math.max(0, Math.min(1, (t - (times.maghrib - 0.2)) / 1.2));
  const sunK = (t - times.sunrise) / (times.maghrib - times.sunrise);
  const sunUp = sunK > -0.05 && sunK < 1.05;
  const moonK = Math.max(0, Math.min(1, (t - times.maghrib) / 6));

  const stars = useMemo(() => Array.from({ length: 70 }, (_, i) => ({ x: rand(i + 500) * 100, y: rand(i + 900) * 55, s: 1 + rand(i + 77) * 1.8, d: rand(i + 33) * 4 })), []);

  let bx = 0;
  return (
    <section className="ds" ref={ref} style={{ height: `calc(${DAY.length * 62}vh + 100vh)` }} aria-label="A day in Kunming">
      <div className="ds-sticky" style={{ background: `linear-gradient(180deg, ${top} 0%, ${low} 62%, ${low} 100%)`, ["--night" as string]: night.toFixed(3) }}>
        <div className="ds-stars" style={{ opacity: night }} aria-hidden="true">
          {stars.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
        </div>
        <div className="ds-sun" aria-hidden="true" style={{
          left: `${6 + Math.max(0, Math.min(1, sunK)) * 88}%`,
          top: `${44 - Math.sin(Math.PI * Math.max(0, Math.min(1, sunK))) * 32}%`,
          opacity: sunUp ? 1 : 0,
        }} />
        <div className="ds-moon" aria-hidden="true" style={{ left: `${10 + moonK * 60}%`, top: `${40 - Math.sin(Math.PI * moonK * 0.8) * 26}%`, opacity: night }} />

        <svg className="ds-city" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path className="ds-hills" d="M0 150 L120 110 L230 135 L360 80 L470 120 L590 92 L720 130 L850 86 L980 124 L1090 98 L1200 128 V240 H0Z" />
          {BUILDINGS.map((b, i) => {
            const bxi = bx; bx += b.w + 6;
            const cols = Math.max(1, Math.floor((b.w - 8) / 9));
            const rows = Math.floor((b.h - 12) / 12);
            return (
              <g key={i}>
                <rect className="ds-bld" x={bxi} y={240 - b.h} width={b.w} height={b.h} />
                {Array.from({ length: cols * rows }, (_, k) => {
                  const lit = rand(i * 97 + k) > 0.55;
                  return lit ? (
                    <rect key={k} className="ds-win" x={bxi + 5 + (k % cols) * 9} y={240 - b.h + 8 + Math.floor(k / cols) * 12} width="4" height="6"
                      style={{ opacity: night, transitionDelay: `${rand(k + i) * 0.8}s` }} />
                  ) : null;
                })}
              </g>
            );
          })}
        </svg>

        <div className="ds-top wrap">
          <div className="ds-clocks">
            <AnalogClock hours={t} label={<T en="Kunming" bn="কুনমিং" />} digital={hhmm(t)} />
            <AnalogClock hours={t - 2} label={<T en="Home, Dhaka" bn="বাড়ি, ঢাকা" />} digital={hhmm(t - 2)} />
          </div>
          <p className="ds-hint"><T en="Scroll to move through the day" bn="স্ক্রল করে দিনটা পার করুন" /></p>
        </div>

        <div className="ds-lane">
        <div className="ds-track" style={{ transform: `translate3d(${x}px, 0, 0)` }}>
          {DAY.map((d, i) => (
            <article key={d.time} ref={i === 0 ? cardRef : undefined} className={`ds-card${i === active ? " on" : ""}`}>
              <div className="ds-photo"><Photo name={d.img} sizes="(max-width: 700px) 80vw, 420px" /></div>
              <div className="ds-text">
                <time>{d.time}</time>
                <h3><T en={d.en} bn={d.bn} /></h3>
                <p><T en={d.subEn} bn={d.subBn} /></p>
              </div>
            </article>
          ))}
        </div>
        </div>

        <div className="ds-ruler wrap" aria-hidden="true">
          <div className="ds-rail">
            {Array.from({ length: 15 }, (_, i) => 8 + i).map((h) => (
              <span key={h} style={{ left: `${((h - START) / (END - START)) * 100}%` }}>{h % 2 === 0 ? String(h).padStart(2, "0") : ""}</span>
            ))}
            <i style={{ left: `${((t - START) / (END - START)) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
