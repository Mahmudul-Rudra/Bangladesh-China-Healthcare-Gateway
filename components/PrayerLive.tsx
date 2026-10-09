"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CITIES, DHAKA, PRAYERS, compassPoint, hhmm, nowIn, prayerTimes, qibla, skyColor, type PrayerKey } from "@/lib/prayer";
import { T, useLang } from "@/lib/i18n";

const C = 280; // dial centre in a 560 x 560 drawing
const R_OUT = 202, R_IN = 160;
const ang = (h: number) => h * 15 + 180; // midnight at the bottom, noon at the top
const pt = (r: number, a: number): [number, number] => [C + r * Math.sin((a * Math.PI) / 180), C - r * Math.cos((a * Math.PI) / 180)];
const arc = (r: number, a0: number, a1: number) => {
  const [x0, y0] = pt(r, a0), [x1, y1] = pt(r, a1);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};
const bnDigits = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
const lum = (rgb: string) => { const [r, g, b] = rgb.match(/\d+/g)!.map(Number); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
const rand = (i: number) => { const x = Math.sin(i * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); };

/**
 * Live prayer experience for a city in China:
 * the page shows the real sky there right now, a 24-hour dial with two rings
 * (the patient in China outside, the family in Dhaka inside, on the same clock),
 * a countdown to the next prayer, and a qibla compass that can follow the phone.
 */
export default function PrayerLive() {
  const { lang } = useLang();
  const tx = (en: string, bn: string) => (lang === "bn" ? bnDigits(bn) : en);
  const [cityId, setCityId] = useState(CITIES[0].id);
  const [asr, setAsr] = useState<"hanafi" | "shafii">("hanafi");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const city = CITIES.find((c) => c.id === cityId)!;
  const offset = city.tz - DHAKA.tz; // China is 2 hours ahead of Dhaka
  const local = now ? nowIn(city.zone, now) : { y: 2026, m: 1, d: 1, hours: 12 };
  const home = now ? nowIn(DHAKA.zone, now) : { y: 2026, m: 1, d: 1, hours: 10 };
  const times = useMemo(() => prayerTimes(city, local.y, local.m, local.d, asr), [city, local.y, local.m, local.d, asr]);
  const dTimes = useMemo(() => prayerTimes(DHAKA, home.y, home.m, home.d, asr), [home.y, home.m, home.d, asr]);
  const h = local.hours;

  // Next prayer and countdown.
  const list = PRAYERS.map((p) => ({ ...p, at: times[p.key] }));
  const current = [...list].reverse().find((p) => h >= p.at && h - p.at < 0.25);
  const next = list.find((p) => p.at > h) ?? { ...list[0], at: list[0].at + 24 };
  const left = Math.max(0, next.at - h);
  const lh = Math.floor(left), lm = Math.floor((left - lh) * 60), ls = Math.floor(((left - lh) * 60 - lm) * 60);

  // How much later the sun sets for the family at home.
  const sunsetGap = Math.round((dTimes.maghrib + offset - times.maghrib) * 60);

  const sky = skyColor(h, times);
  const sky2 = skyColor(h + 1.2, times);
  const dark = lum(sky) < 0.42;
  const isNight = h < times.sunrise || h > times.maghrib;

  const segs = useMemo(() => Array.from({ length: 96 }, (_, i) => {
    const h0 = i / 4, h1 = (i + 1) / 4;
    return { i, d: arc(R_OUT, ang(h0) - 0.2, ang(h1) + 0.2), dIn: arc(R_IN, ang(h0) - 0.2, ang(h1) + 0.2), cOut: skyColor(h0 + 0.125, times), cIn: skyColor(h0 + 0.125 - offset, dTimes) };
  }), [times, dTimes, offset]);

  const stars = useMemo(() => Array.from({ length: 90 }, (_, i) => ({ x: rand(i) * 100, y: rand(i + 300) * 100, s: 1 + rand(i + 600) * 2, d: rand(i + 900) * 5 })), []);

  return (
    <>
      <section className={`pl-hero${dark ? " is-dark" : ""}`} style={{ background: `linear-gradient(180deg, ${sky}, ${sky2})` }}>
        <div className="pl-stars" style={{ opacity: isNight ? 1 : 0 }} aria-hidden="true">
          {stars.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
        </div>
        <div className="wrap pl-grid">
          <div className="pl-copy">
            <span className="pl-kicker"><T en={`The sky over ${city.en}, right now`} bn={`এই মুহূর্তে ${city.bn}-এর আকাশ`} /></span>
            <h1><T en="Five prayers, far from home" bn="দূরদেশে পাঁচ ওয়াক্ত" /></h1>
            <p className="pl-lede"><T en="Live prayer times for the city you are treated in, beside your family's times in Dhaka, and the direction of the qibla." bn="যে শহরে চিকিৎসা নিচ্ছেন সেখানকার নামাজের সময়, পাশে ঢাকায় পরিবারের সময়, আর কিবলার দিক।" /></p>
            <div className="pl-cities" role="group" aria-label="City">
              {CITIES.map((c) => (
                <button key={c.id} type="button" aria-pressed={c.id === cityId} onClick={() => setCityId(c.id)}>
                  <span className="hz">{c.hz}</span>{lang === "bn" ? c.bn : c.en}
                </button>
              ))}
            </div>
            <div className="pl-asr" role="group" aria-label="Asr calculation">
              <span><T en="Asr" bn="আসর" /></span>
              <button type="button" aria-pressed={asr === "hanafi"} onClick={() => setAsr("hanafi")}><T en="Hanafi" bn="হানাফি" /></button>
              <button type="button" aria-pressed={asr === "shafii"} onClick={() => setAsr("shafii")}><T en="Shafi'i" bn="শাফেয়ি" /></button>
            </div>
          </div>

          <div className="pl-dial-wrap">
            <svg className="pl-dial" viewBox="-70 -10 700 580" role="img" aria-label={`Prayer times in ${city.en} and Dhaka on a 24-hour clock`} key={`${cityId}-${asr}`}>
              <circle cx={C} cy={C} r={R_OUT + 34} className="pl-bezel" />
              <circle cx={C} cy={C} r="128" className="pl-face" />
              <g className="pl-ring">
                {segs.map((s) => <path key={`o${s.i}`} d={s.d} stroke={s.cOut} className="pl-seg" style={{ animationDelay: `${s.i * 7}ms` }} />)}
                {segs.map((s) => <path key={`i${s.i}`} d={s.dIn} stroke={s.cIn} className="pl-seg pl-seg-in" style={{ animationDelay: `${300 + s.i * 7}ms` }} />)}
              </g>
              {[0, 6, 12, 18].map((hh) => {
                const [x, y] = pt(R_IN - 21, ang(hh));
                return <text key={hh} x={x} y={y + 4} className="pl-hour">{String(hh).padStart(2, "0")}</text>;
              })}
              {[times.sunrise].map((sr) => {
                const [x, y] = pt(R_OUT, ang(sr));
                return <circle key="sr" cx={x} cy={y} r="4" className="pl-sunrise" />;
              })}
              {PRAYERS.map((p) => {
                const at = times[p.key];
                const [x, y] = pt(R_OUT, ang(at));
                const isNext = p.key === next.key;
                const [lx, ly] = pt(R_OUT + 52, ang(at));
                const [ix, iy] = pt(R_IN, ang(dTimes[p.key] + offset));
                const side = Math.sin((ang(at) * Math.PI) / 180);
                return (
                  <g key={p.key} className={`pl-mark${isNext ? " next" : ""}`}>
                    <circle cx={ix} cy={iy} r="5" className="pl-dot-in" />
                    {isNext && <><circle cx={x} cy={y} r="12" className="pl-ripple" /><circle cx={x} cy={y} r="12" className="pl-ripple r2" /></>}
                    <circle cx={x} cy={y} r="10" className="pl-dot" />
                    <text x={lx} y={ly - 2} textAnchor={side > 0.25 ? "start" : side < -0.25 ? "end" : "middle"} className="pl-name">{lang === "bn" ? p.bn : p.en}</text>
                    <text x={lx} y={ly + 14} textAnchor={side > 0.25 ? "start" : side < -0.25 ? "end" : "middle"} className="pl-time">{hhmm(at)}</text>
                  </g>
                );
              })}
              {now && (
                <g className="pl-hand" style={{ transform: `rotate(${ang(h)}deg)` }}>
                  <line x1={C} y1={C - 46} x2={C} y2={C - R_OUT - 18} />
                  {isNight
                    ? <path className="pl-moon" d={`M${C - 9} ${C - R_OUT - 30} a11 11 0 1 0 15 -9 a8 8 0 1 1 -15 9z`} />
                    : <circle className="pl-sun" cx={C} cy={C - R_OUT - 30} r="9" />}
                </g>
              )}

            </svg>
            <div className="pl-centre" aria-live="polite">
              {now ? (
                <>
                  <small>{current ? <T en="It is time for" bn="এখন সময়" /> : <T en="Next prayer" bn="পরের নামাজ" />}</small>
                  <b className="pl-next">{lang === "bn" ? (current ?? next).bn : (current ?? next).en}</b>
                  <span className="pl-ar" lang="ar">{(current ?? next).ar}</span>
                  {!current && <span className="pl-count">{tx(`in ${lh} h ${String(lm).padStart(2, "0")} min ${String(ls).padStart(2, "0")} s`, `${lh} ঘ ${String(lm).padStart(2, "0")} মি ${String(ls).padStart(2, "0")} সে বাকি`)}</span>}
                  <span className="pl-now">{city.en} {hhmm(h)} · {lang === "bn" ? "ঢাকা" : "Dhaka"} {hhmm(home.hours)}</span>
                </>
              ) : <small>…</small>}
            </div>
            <div className="pl-legend">
              <span><i className="lg-out" /><T en={`Outer ring: you, in ${city.en}`} bn={`বাইরের বৃত্ত: আপনি, ${city.bn}-এ`} /></span>
              <span><i className="lg-in" /><T en="Inner ring: your family, in Dhaka" bn="ভেতরের বৃত্ত: আপনার পরিবার, ঢাকায়" /></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap pl-split">
          <div className="pl-table-wrap">
            <span className="kicker"><T en="Today's times" bn="আজকের সময়সূচি" /></span>
            <h2><T en={`${city.en} and Dhaka, side by side`} bn={`${city.bn} ও ঢাকা, পাশাপাশি`} /></h2>
            <p className="muted">{tx(
              `When the sun sets for Maghrib in ${city.en}, your family in Dhaka still has ${sunsetGap} minutes of daylight. Their time is shown in Dhaka time.`,
              `${city.bn}-এ মাগরিবের সময় সূর্য ডুবলে, ঢাকায় আপনার পরিবারের কাছে তখনও ${sunsetGap} মিনিটের আলো বাকি থাকে। তাঁদের সময় ঢাকার সময়ে দেখানো হয়েছে।`,
            )}</p>
            <table className="pl-table">
              <thead><tr><th scope="col"><T en="Prayer" bn="নামাজ" /></th><th scope="col">{lang === "bn" ? city.bn : city.en}</th><th scope="col"><T en="Dhaka" bn="ঢাকা" /></th></tr></thead>
              <tbody>
                {PRAYERS.map((p) => (
                  <tr key={p.key} className={p.key === next.key ? "next" : undefined}>
                    <th scope="row">{lang === "bn" ? p.bn : p.en} <span lang="ar">{p.ar}</span></th>
                    <td>{hhmm(times[p.key as PrayerKey])}</td>
                    <td>{hhmm(dTimes[p.key as PrayerKey])}</td>
                  </tr>
                ))}
                <tr className="muted-row"><th scope="row"><T en="Sunrise" bn="সূর্যোদয়" /></th><td>{hhmm(times.sunrise)}</td><td>{hhmm(dTimes.sunrise)}</td></tr>
              </tbody>
            </table>
            <p className="small muted"><T en="Calculated with the Karachi method used in Bangladesh (Fajr and Isha at 18°). Please confirm with the local mosque." bn="বাংলাদেশে প্রচলিত করাচি পদ্ধতিতে হিসাব করা (ফজর ও এশা ১৮°)। স্থানীয় মসজিদে মিলিয়ে নিন।" /></p>
          </div>
          <Qibla bearing={qibla(city)} cityEn={city.en} cityBn={city.bn} />
        </div>
      </section>
    </>
  );
}

/** Qibla compass. The needle spins to the qibla for the city; on phones it can follow the real compass. */
function Qibla({ bearing, cityEn, cityBn }: { bearing: number; cityEn: string; cityBn: string }) {
  const { lang } = useLang();
  const [angle, setAngle] = useState(0);
  const [heading, setHeading] = useState<number | null>(null);
  const [status, setStatus] = useState<"" | "live" | "denied" | "nodata">("");
  const turns = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  // Spin to the bearing with at least one full turn, each time the city changes.
  useEffect(() => {
    const el = ref.current;
    const go = () => { turns.current += 1; setAngle(bearing + 360 * turns.current); };
    if (!el || !("IntersectionObserver" in window)) { go(); return; }
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [bearing]);

  async function startCompass() {
    type DOE = { requestPermission?: () => Promise<string> };
    const D = (window as unknown as { DeviceOrientationEvent?: DOE }).DeviceOrientationEvent;
    if (!D) { setStatus("nodata"); return; }
    if (typeof D.requestPermission === "function") {
      try { if ((await D.requestPermission()) !== "granted") { setStatus("denied"); return; } } catch { setStatus("denied"); return; }
    }
    let got = false;
    const onOrient = (e: Event) => {
      const ev = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
      const hd = typeof ev.webkitCompassHeading === "number" ? ev.webkitCompassHeading : ev.absolute && ev.alpha != null ? 360 - ev.alpha : null;
      if (hd == null) return;
      got = true;
      setHeading(hd);
      setStatus("live");
    };
    window.addEventListener("deviceorientationabsolute", onOrient);
    window.addEventListener("deviceorientation", onOrient);
    setTimeout(() => { if (!got) setStatus("nodata"); }, 2500);
  }

  const roseRot = heading == null ? 0 : -heading;
  const facing = heading != null && Math.abs(((bearing - heading + 540) % 360) - 180) < 6;
  useEffect(() => { if (facing && navigator.vibrate) navigator.vibrate(30); }, [facing]);

  return (
    <div className={`qibla${facing ? " facing" : ""}`} ref={ref}>
      <span className="kicker"><T en="Qibla" bn="কিবলা" /></span>
      <h2><T en={`Facing Makkah from ${cityEn}`} bn={`${cityBn} থেকে মক্কার দিকে`} /></h2>
      <div className="q-dial">
        <svg viewBox="0 0 320 320" aria-hidden="true">
          <g className="q-rose" style={{ transform: `rotate(${roseRot}deg)` }}>
            <circle cx="160" cy="160" r="150" className="q-face" />
            {Array.from({ length: 72 }, (_, i) => (
              <line key={i} x1="160" y1={i % 9 === 0 ? 16 : 20} x2="160" y2={i % 2 ? 26 : 30} className={i % 18 === 0 ? "q-tick major" : "q-tick"} transform={`rotate(${i * 5} 160 160)`} />
            ))}
            {[["N", 0], ["E", 90], ["S", 180], ["W", 270]].map(([l, a]) => {
              const [x, y] = [160 + 112 * Math.sin((Number(a) * Math.PI) / 180), 160 - 112 * Math.cos((Number(a) * Math.PI) / 180)];
              return <text key={String(l)} x={x} y={y + 6} className={l === "N" ? "q-card n" : "q-card"}>{l}</text>;
            })}
            <g className="q-needle" style={{ transform: `rotate(${angle}deg)` }}>
              <path d="M160 40 L171 160 L160 172 L149 160 Z" className="q-arrow" />
              <path d="M160 280 L168 160 L152 160 Z" className="q-tail" />
              <g transform="translate(148 14)">
                <rect width="24" height="24" rx="2" className="q-kaaba" />
                <rect y="6" width="24" height="4" className="q-kiswa" />
              </g>
            </g>
            <circle cx="160" cy="160" r="9" className="q-pin" />
          </g>
          {heading != null && <path d="M160 2 L168 14 L152 14 Z" className="q-you" />}
        </svg>
      </div>
      <p className="q-read">
        <b>{lang === "bn" ? bnDigits(`${Math.round(bearing)}°`) : `${Math.round(bearing)}°`}</b>
        <span>{lang === "bn" ? `${compassPoint(bearing, "bn")} দিকে` : `towards the ${compassPoint(bearing, "en")}`}</span>
      </p>
      <button type="button" className="btn btn-ghost q-btn" onClick={startCompass}>
        <T en="Point with my phone's compass" bn="ফোনের কম্পাস দিয়ে দেখান" />
      </button>
      <p className="small muted q-status" aria-live="polite">
        {status === "live" && (facing ? <T en="You are facing the qibla." bn="আপনি কিবলার দিকে মুখ করে আছেন।" /> : <T en="Turn slowly until the gold needle points to the top." bn="ধীরে ঘুরুন, যতক্ষণ না সোনালি কাঁটা ওপরের দিকে আসে।" />)}
        {status === "denied" && <T en="Compass access was not allowed. The direction above still applies." bn="কম্পাসের অনুমতি দেওয়া হয়নি। ওপরের দিক অনুযায়ী নামাজ পড়তে পারেন।" />}
        {status === "nodata" && <T en="This device has no compass. Use the direction above." bn="এই ডিভাইসে কম্পাস নেই। ওপরের দিকটি ব্যবহার করুন।" />}
      </p>
    </div>
  );
}
