"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HER, HIS, TOGETHER, type Step } from "@/lib/fertility";
import { T, useLang } from "@/lib/i18n";
import Photo from "../Photo";

type Geo = { len: number; samples: Array<{ y: number; l: number }> };

/** Finds how much of a path is drawn when the "pen" has reached a given height. */
function lengthAt(g: Geo, y: number) {
  if (!g.samples.length) return 0;
  let l = 0;
  for (const s of g.samples) { if (s.y <= y) l = s.l; else break; }
  return Math.min(g.len, l);
}

/**
 * "It takes two": the wife's path (apricot) and the husband's path (jade) run side by side,
 * meet at the first consultation together, and continue down the page as one braid.
 * Both lines draw themselves as the visitor scrolls.
 */
export default function TwoPaths() {
  const { lang } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const herPath = useRef<SVGPathElement>(null);
  const hisPath = useRef<SVGPathElement>(null);
  const herTrack = useRef<SVGPathElement>(null);
  const hisTrack = useRef<SVGPathElement>(null);
  const herNodes = useRef<Array<HTMLSpanElement | null>>([]);
  const hisNodes = useRef<Array<HTMLSpanElement | null>>([]);
  const togNodes = useRef<Array<HTMLSpanElement | null>>([]);
  const geo = useRef<{ her: Geo; his: Geo; ys: { her: number[]; his: number[]; tog: number[] } }>({
    her: { len: 0, samples: [] }, his: { len: 0, samples: [] }, ys: { her: [], his: [], tog: [] },
  });
  const [drawn, setDrawn] = useState(-1e9);

  const update = useCallback(() => {
    const el = wrap.current;
    if (!el || !herPath.current || !hisPath.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = reduce ? 1e9 : window.innerHeight * 0.62 - el.getBoundingClientRect().top;
    const { her, his } = geo.current;
    herPath.current.style.strokeDashoffset = String(her.len - lengthAt(her, y));
    hisPath.current.style.strokeDashoffset = String(his.len - lengthAt(his, y));
    setDrawn(y);
  }, []);

  const build = useCallback(() => {
    const el = wrap.current, s = svg.current;
    if (!el || !s || !herPath.current || !hisPath.current || !herTrack.current || !hisTrack.current) return;
    const box = el.getBoundingClientRect();
    const pos = (n: HTMLSpanElement | null) => {
      const r = n!.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    };
    const H = herNodes.current.filter(Boolean).map(pos);
    const M = hisNodes.current.filter(Boolean).map(pos);
    const G = togNodes.current.filter(Boolean).map(pos);
    if (!H.length || !M.length || !G.length) return;

    const column = (pts: Array<{ x: number; y: number }>) => {
      let d = `M${pts[0].x},${pts[0].y - 70} L${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], dy = b.y - a.y;
        d += ` C${a.x},${a.y + dy * 0.45} ${b.x},${b.y - dy * 0.45} ${b.x},${b.y}`;
      }
      return d;
    };
    // After the last own step, sweep into the first "together" step, then braid around the shared line.
    const braid = (start: { x: number; y: number }, sign: 1 | -1) => {
      const t0 = G[0], tEnd = G[G.length - 1].y + 60;
      const drop = start.y + 50;
      let d = ` C${start.x},${drop + (t0.y - drop) * 0.6} ${t0.x},${t0.y - (t0.y - drop) * 0.5} ${t0.x},${t0.y}`;
      for (let y = t0.y + 6; y <= tEnd; y += 6) {
        const amp = Math.min(9, (y - t0.y) / 6);
        d += ` L${(t0.x + sign * amp * Math.sin((y - t0.y) / 36)).toFixed(1)},${y.toFixed(1)}`;
      }
      return d;
    };
    const herD = column(H) + braid(H[H.length - 1], 1);
    const hisD = column(M) + braid(M[M.length - 1], -1);
    [herPath.current, herTrack.current].forEach((p) => p.setAttribute("d", herD));
    [hisPath.current, hisTrack.current].forEach((p) => p.setAttribute("d", hisD));
    s.setAttribute("viewBox", `0 0 ${el.clientWidth} ${el.clientHeight}`);

    const measure = (p: SVGPathElement): Geo => {
      const len = p.getTotalLength();
      const samples = Array.from({ length: 241 }, (_, i) => { const l = (len * i) / 240; return { l, y: p.getPointAtLength(l).y }; });
      // keep the sample list monotonic in y so a height always maps forward along the path
      let maxY = -1e9;
      const mono = samples.map((sm) => { maxY = Math.max(maxY, sm.y); return { l: sm.l, y: maxY }; });
      p.style.strokeDasharray = String(len);
      return { len, samples: mono };
    };
    geo.current = { her: measure(herPath.current), his: measure(hisPath.current), ys: { her: H.map((p) => p.y), his: M.map((p) => p.y), tog: G.map((p) => p.y) } };
    update();
  }, [update]);

  useEffect(() => {
    build();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", build);
    document.fonts?.ready.then(build);
    const ro = new ResizeObserver(() => build());
    if (wrap.current) ro.observe(wrap.current);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", build); ro.disconnect(); };
  }, [build, update]);

  useEffect(() => { const id = requestAnimationFrame(build); return () => cancelAnimationFrame(id); }, [lang, build]);

  const reached = (y: number | undefined) => y !== undefined && drawn >= y - 4;
  const { ys } = geo.current;

  const stepBody = (s: Step) => (
    <>
      <h3><T en={s.en} bn={s.bn} /></h3>
      <p><T en={s.sEn} bn={s.sBn} /></p>
    </>
  );

  return (
    <div className="tp" ref={wrap}>
      <svg className="tp-svg" ref={svg} aria-hidden="true">
        <path className="tp-track" ref={herTrack} />
        <path className="tp-track" ref={hisTrack} />
        <path className="tp-line her" ref={herPath} />
        <path className="tp-line him" ref={hisPath} />
      </svg>

      <div className="tp-cols">
        <div className="tp-col her">
          <figure className="tp-head" style={{ order: 0 }}>
            <div className="tp-photo"><Photo name="fert-her" sizes="(max-width: 860px) 46vw, 420px" /></div>
            <figcaption><span className="dot her" /><T en="Her path" bn="স্ত্রীর পথ" /></figcaption>
          </figure>
          {HER.map((s, i) => (
            <div key={s.en} className={`tp-step her${reached(ys.her[i]) ? " on" : ""}`} style={{ order: 2 + i * 2 }}>
              <span className="tp-node her" ref={(el) => { herNodes.current[i] = el; }} aria-hidden="true" />
              <span className="tp-tag her"><T en="Her" bn="স্ত্রী" /></span>
              {stepBody(s)}
            </div>
          ))}
        </div>
        <div className="tp-col him">
          <figure className="tp-head" style={{ order: 1 }}>
            <div className="tp-photo"><Photo name="fert-him" sizes="(max-width: 860px) 46vw, 420px" /></div>
            <figcaption><span className="dot him" /><T en="His path" bn="স্বামীর পথ" /></figcaption>
          </figure>
          {HIS.map((s, i) => (
            <div key={s.en} className={`tp-step him${reached(ys.his[i]) ? " on" : ""}`} style={{ order: 3 + i * 2 }}>
              <span className="tp-node him" ref={(el) => { hisNodes.current[i] = el; }} aria-hidden="true" />
              <span className="tp-tag him"><T en="Him" bn="স্বামী" /></span>
              {stepBody(s)}
            </div>
          ))}
        </div>
      </div>

      <p className="tp-meet"><T en="Here, the two paths become one." bn="এখানে দুটি পথ এক হয়ে যায়।" /></p>

      <ol className="tp-together">
        {TOGETHER.map((s, i) => (
          <li key={s.en} className={`tp-tstep${i % 2 ? " right" : " left"}${reached(ys.tog[i]) ? " on" : ""}`}>
            <span className="tp-node both" ref={(el) => { togNodes.current[i] = el; }} aria-hidden="true">{i + 1}</span>
            <div className="tp-card">
              {s.img && <div className="tp-cimg"><Photo name={s.img} sizes="(max-width: 860px) 80vw, 460px" /></div>}
              <span className="tp-tag both"><T en="Together" bn="একসঙ্গে" /></span>
              {stepBody(s)}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
