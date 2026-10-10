"use client";

import { useEffect, useRef, useState } from "react";
import { AGES, TESTS, WAIT_MESSAGES, privateMessage } from "@/lib/fertility";
import { waLink } from "@/lib/site";
import { T, useLang } from "@/lib/i18n";
import Photo from "../Photo";

const bnDigits = (s: string) => s.replace(/\d/g, (x) => "০১২৩৪৫৬৭৮৯"[Number(x)]);

/** Petal shape used by the age meter and the bloom. */
const PETAL = "M0 0 C -11 -22, -9 -52, 0 -66 C 9 -52, 11 -22, 0 0 Z";

/** "Your age and your chances": honest words instead of invented numbers. Four petals show the outlook. */
export function AgeHonest() {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const a = AGES[i];
  return (
    <div className="age">
      <div className="age-pick" role="group" aria-label="Age of the wife">
        {AGES.map((x, k) => (
          <button key={x.en} type="button" aria-pressed={k === i} onClick={() => setI(k)}>{lang === "bn" ? x.bn : x.en}</button>
        ))}
      </div>
      <div className="age-out">
        <svg className="age-petals" viewBox="-80 -80 160 90" aria-hidden="true">
          {[-48, -16, 16, 48].map((rot, k) => (
            <path key={rot} d={PETAL} transform={`rotate(${rot})`} className={k < a.level ? "on" : ""} style={{ transitionDelay: `${k * 90}ms` }} />
          ))}
        </svg>
        <p key={i} className="age-text"><T en={a.tEn} bn={a.tBn} /></p>
        <a className="age-ask" href={waLink(privateMessage("either", lang, lang === "bn" ? `স্ত্রীর বয়স: ${a.bn}। হাসপাতালের সাফল্যের হার জানতে চাই।` : `Wife's age: ${a.en}. Please share the hospital's success rates.`))} target="_blank" rel="noopener">
          <T en="Ask for the hospital's exact numbers for this age" bn="এই বয়সের জন্য হাসপাতালের সঠিক হিসাব জানতে চান" />
        </a>
      </div>
    </div>
  );
}

/** "Before you fly" checklist: tick tests as you finish them; a ring shows how ready you are. Saved on this device only. */
export function TestChecklist() {
  const { lang } = useLang();
  const all = [...TESTS.her.map((t) => ({ ...t, g: "her" })), ...TESTS.him.map((t) => ({ ...t, g: "him" })), ...TESTS.both.map((t) => ({ ...t, g: "both" }))];
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem("gw-fc-tests") || "{}")); } catch {} }, []);
  const toggle = (k: string) => setDone((d) => {
    const n = { ...d, [k]: !d[k] };
    try { localStorage.setItem("gw-fc-tests", JSON.stringify(n)); } catch {}
    return n;
  });
  const count = all.filter((t) => done[t.en]).length;
  const pct = count / all.length;
  const group = (g: "her" | "him" | "both", en: string, bn: string) => (
    <div className={`ck-group ${g}`}>
      <h3><T en={en} bn={bn} /></h3>
      <ul>
        {all.filter((t) => t.g === g).map((t) => (
          <li key={t.en}>
            <label className={done[t.en] ? "done" : ""}>
              <input type="checkbox" checked={!!done[t.en]} onChange={() => toggle(t.en)} />
              <span className="ck-box" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
              <span>{lang === "bn" ? t.bn : t.en}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="ck">
      <div className="ck-ring" aria-live="polite">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="ck-track" />
          <circle cx="60" cy="60" r="52" className="ck-fill" pathLength={1} style={{ strokeDashoffset: 1 - pct }} />
        </svg>
        <div><b>{lang === "bn" ? bnDigits(`${count}/${all.length}`) : `${count}/${all.length}`}</b><small><T en="ready" bn="প্রস্তুত" /></small></div>
      </div>
      <div className="ck-groups">
        {group("her", "For her", "স্ত্রীর জন্য")}
        {group("him", "For him", "স্বামীর জন্য")}
        {group("both", "For both of you", "দুজনের জন্য")}
      </div>
    </div>
  );
}

/** The two-week wait: fourteen beads fill one by one, and gentle Bangla messages arrive on days 1, 6 and 12. */
export function WaitCompanion() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState(14);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      let d = 0;
      setDay(0);
      timer = setInterval(() => { d++; setDay(d); if (d >= 14 && timer) clearInterval(timer); }, 420);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearInterval(timer); };
  }, []);
  return (
    <div className="wt" ref={ref}>
      <div className="wt-photo">
        <Photo name="fert-wait" sizes="(max-width: 860px) 92vw, 560px" />
        <div className="wt-beads" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
            return <i key={i} className={i < day ? "on" : ""} style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }} />;
          })}
          <span className="wt-day">
            <small><T en="Day" bn="দিন" /></small>
            <b>{lang === "bn" ? bnDigits(String(Math.max(1, day))) : Math.max(1, day)}</b>
            <small><T en="of 14" bn="১৪-এর মধ্যে" /></small>
          </span>
        </div>
      </div>
      <div className="wt-chat">
        {WAIT_MESSAGES.map((m) => (
          <div key={m.day} className={`wt-msg${day >= m.day ? " on" : ""}`}>
            <span className="tag"><T en={`Day ${m.day}`} bn={`দিন ${bnDigits(String(m.day))}`} /></span>
            <span lang="bn">{m.text}</span>
            <small>{m.en}</small>
          </div>
        ))}
        <p className="small muted"><T en="Counselling in Bangla is available throughout the wait, if you want it." bn="অপেক্ষার পুরো সময় চাইলে বাংলায় কাউন্সেলিং নিতে পারেন।" /></p>
      </div>
    </div>
  );
}

/**
 * The closing bloom: a drawn shapla bud opens as you scroll, and once it is fully open
 * the real photograph of a shapla at dawn grows out of it.
 */
export function ShaplaBloom() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--b", "1"); return; }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        el.style.setProperty("--b", Math.max(0, Math.min(1, -r.top / (travel || 1))).toFixed(4));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const outer = [-3, -2, -1, 0, 1, 2, 3];
  const inner = [-2, -1, 0, 1, 2];
  return (
    <section className="bloom" ref={ref} aria-label="Shapla">
      <div className="bloom-sticky">
        <div className="bloom-photo"><Photo name="fert-shapla" sizes="100vw" /></div>
        <svg className="bloom-svg" viewBox="-200 -230 400 300" aria-hidden="true">
          <defs>
            <linearGradient id="petal-g" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F1A9BC" />
            </linearGradient>
          </defs>
          <ellipse className="bloom-pad" cx="-95" cy="30" rx="95" ry="16" />
          <ellipse className="bloom-pad" cx="105" cy="34" rx="80" ry="13" />
          <g className="bloom-flower">
            {outer.map((k) => (
              <path key={`o${k}`} d="M0 0 C -26 -40, -22 -110, 0 -138 C 22 -110, 26 -40, 0 0 Z" className="petal outer" style={{ ["--k" as string]: k }} />
            ))}
            {inner.map((k) => (
              <path key={`i${k}`} d="M0 0 C -20 -34, -16 -92, 0 -112 C 16 -92, 20 -34, 0 0 Z" className="petal inner" style={{ ["--k" as string]: k }} />
            ))}
            <circle className="bloom-heart" cx="0" cy="-30" r="12" />
          </g>
          <line className="bloom-water" x1="-200" y1="22" x2="200" y2="22" />
        </svg>
        <div className="bloom-copy">
          <span className="hz" aria-hidden="true">শাপলা</span>
          <h2><T en="Every journey starts with one quiet conversation." bn="প্রতিটি যাত্রা শুরু হয় একটি নিভৃত আলাপ দিয়ে।" /></h2>
        </div>
      </div>
    </section>
  );
}

export { PETAL };
