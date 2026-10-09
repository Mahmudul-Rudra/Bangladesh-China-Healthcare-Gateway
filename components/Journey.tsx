"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STOPS } from "@/lib/content";
import { T, useLang } from "@/lib/i18n";
import StopMedia from "./StopMedia";

/**
 * The signature gold line. It is drawn through every stop as the visitor scrolls.
 * Wide screens: a round viewer beside the stops opens each stop's photo like a camera iris,
 *   with a gold progress ring around it.
 * Phones: each stop carries its own photo that develops like a Polaroid when the line reaches it.
 */
export default function Journey({ detail = false }: { detail?: boolean }) {
  const { lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const inkRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const geo = useRef<{ len: number; nodeY: number[] }>({ len: 0, nodeY: [] });
  const [reached, setReached] = useState(-1);

  const update = useCallback(() => {
    const j = wrapRef.current, ink = inkRef.current;
    if (!j || !ink) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = j.getBoundingClientRect();
    const drawnTo = reduce ? Infinity : window.innerHeight * 0.62 - r.top;
    const { len, nodeY } = geo.current;
    const maxY = nodeY.length ? nodeY[nodeY.length - 1] : r.height;
    const p = Math.max(0, Math.min(1, (drawnTo + 30) / (maxY + 30)));
    ink.style.strokeDashoffset = String(len * (1 - p));
    let last = -1;
    nodeY.forEach((y, i) => { if (drawnTo >= y - 4) last = i; });
    setReached(last);
  }, []);

  const build = useCallback(() => {
    const j = wrapRef.current, svg = svgRef.current, track = trackRef.current, ink = inkRef.current;
    if (!j || !svg || !track || !ink) return;
    const jr = j.getBoundingClientRect();
    const pts = nodeRefs.current.filter(Boolean).map((n) => {
      const b = n!.getBoundingClientRect();
      return { x: b.left - jr.left + b.width / 2, y: b.top - jr.top + b.height / 2 };
    });
    if (!pts.length) return;
    let d = `M${pts[0].x},${pts[0].y - 30} L${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], dy = b.y - a.y, sway = (i % 2 ? 1 : -1) * Math.min(16, a.x - 4);
      d += ` C${a.x + sway},${a.y + dy * 0.35} ${b.x + sway},${b.y - dy * 0.35} ${b.x},${b.y}`;
    }
    track.setAttribute("d", d);
    ink.setAttribute("d", d);
    svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${j.clientHeight}`);
    svg.style.height = `${j.clientHeight}px`;
    const len = ink.getTotalLength();
    ink.style.strokeDasharray = String(len);
    geo.current = { len, nodeY: pts.map((p) => p.y) };
    update();
  }, [update]);

  useEffect(() => {
    build();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", build);
    document.fonts?.ready.then(build);
    // Images change the height of each stop on phones, so redraw once they load.
    const ro = new ResizeObserver(() => build());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", build);
      ro.disconnect();
    };
  }, [build, update]);

  useEffect(() => {
    const id = requestAnimationFrame(build);
    return () => cancelAnimationFrame(id);
  }, [lang, build]);

  const active = Math.max(0, reached);
  const cur = STOPS[active];
  const progress = 1 - (active + 1) / STOPS.length;

  return (
    <div className="jgrid">
      <div className="journey" ref={wrapRef}>
        <svg className="journey-svg" ref={svgRef} aria-hidden="true">
          <path className="track" ref={trackRef} />
          <path className="ink" ref={inkRef} />
        </svg>
        {STOPS.map((s, i) => (
          <div key={s.en} className={`stop${i <= reached ? " reached is-on" : ""}${detail ? " stop-detailed" : ""}`}>
            <span className="node" aria-hidden="true" ref={(el) => { nodeRefs.current[i] = el; }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="stop-body">
              <h3><T en={s.en} bn={s.bn} /></h3>
              <span className="where"><T en={s.whereEn} bn={s.whereBn} /></span>
              <p className="muted"><T en={s.lineEn} bn={s.lineBn} /></p>
              {detail && (
                <div className="stop-detail">
                  <div><b><T en="What you do" bn="আপনি যা করবেন" /></b><span><T en={s.youEn} bn={s.youBn} /></span></div>
                  <div><b><T en="What we do" bn="আমরা যা করি" /></b><span><T en={s.weEn} bn={s.weBn} /></span></div>
                </div>
              )}
            </div>
            <figure className="snap" style={{ ["--tilt" as string]: `${i % 2 ? 2.2 : -2.2}deg` }}>
              <StopMedia index={i} sizes="(max-width: 960px) 80vw, 1px" />
            </figure>
          </div>
        ))}
      </div>
      <aside className="jnow" aria-hidden="true">
        <small><T en="You are here" bn="আপনি এখন এখানে" /></small>
        <div className="viewer">
          <div className="viewer-stack">
            {STOPS.map((s, i) => (
              <div key={s.en} className={`vw-layer${i <= active ? " open" : ""}${i === active ? " is-on" : ""}`} style={{ zIndex: i + 1 }}>
                <StopMedia index={i} sizes="340px" />
              </div>
            ))}
          </div>
          <svg className="viewer-ring" viewBox="0 0 120 120">
            <circle className="jt" cx="60" cy="60" r="57" />
            <circle className="jp" cx="60" cy="60" r="57" pathLength={1} style={{ strokeDashoffset: progress }} />
          </svg>
          <span className="vw-num">{String(active + 1).padStart(2, "0")}</span>
        </div>
        <b className="jtitle"><T en={cur.en} bn={cur.bn} /></b>
        <span className="jwhere"><T en={cur.whereEn} bn={cur.whereBn} /></span>
      </aside>
    </div>
  );
}
