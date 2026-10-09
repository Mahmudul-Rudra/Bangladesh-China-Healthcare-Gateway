import { T } from "@/lib/i18n";
import Clock from "./Clock";
import Photo from "./Photo";

// Equirectangular projection onto a 500 x 500 chart: x = 40 + (lon - 84) * 10.5, y = 60 + (44 - lat) * 13.57
const CITIES = [
  { en: "Dhaka", local: "ঢাকা", x: 107.2, y: 334.1, home: true, anchor: "end", dx: -10, dy: 4 },
  { en: "Kunming", local: "昆明", x: 236.4, y: 317.8, home: false, anchor: "middle", dx: 0, dy: 24 },
  { en: "Guangzhou", local: "广州", x: 347.7, y: 343.6, home: false, anchor: "middle", dx: 0, dy: 24 },
  { en: "Beijing", local: "北京", x: 380.2, y: 115.6, home: false, anchor: "start", dx: 10, dy: 4 },
  { en: "Shanghai", local: "上海", x: 433.8, y: 233.7, home: false, anchor: "end", dx: -10, dy: 4 },
] as const;

const meridians = Array.from({ length: 9 }, (_, k) => 40 + k * 52.5);
const parallels = Array.from({ length: 7 }, (_, k) => 60 + k * 67.85);

/** The moon-gate chart: routes from Dhaka draw themselves, then Kunming appears inside the gate beneath the map. */
export default function HeroMap() {
  return (
    <div className="gate" role="img" aria-label="Map: routes from Dhaka to Kunming, Guangzhou, Beijing and Shanghai">
      <div className="gate-ring" />
      <div className="gate-photo"><Photo name="hero-kunming" priority sizes="(max-width: 860px) 90vw, 540px" /></div>
      <svg className="chart" viewBox="0 0 500 500" aria-hidden="true">
        <defs>
          <clipPath id="moon"><circle cx="250" cy="250" r="235" /></clipPath>
        </defs>
        <g clipPath="url(#moon)">
          {meridians.map((x) => <path key={`m${x}`} className="grat" d={`M${x},-10 Q${(x + (x - 250) * 0.18).toFixed(1)},250 ${x},510`} />)}
          {parallels.map((y) => <path key={`p${y}`} className="grat" d={`M-10,${y.toFixed(1)} Q250,${(y - 18).toFixed(1)} 510,${y.toFixed(1)}`} />)}
          <text className="bay" x="128" y="410" fontFamily="var(--display)" fontStyle="italic" fontSize="13" fill="var(--ink-soft)">
            <T en="Bay of Bengal" bn="বঙ্গোপসাগর" />
          </text>
          <path id="r1" className="route" pathLength={1} d="M107.2,334.1 Q170,250 236.4,317.8" />
          <path className="route r2" pathLength={1} d="M107.2,334.1 Q228,190 347.7,343.6" />
          <path className="route r3" pathLength={1} d="M236.4,317.8 Q262,170 380.2,115.6" />
          <path className="route r4" pathLength={1} d="M347.7,343.6 Q420,300 433.8,233.7" />
          <circle className="pulse" cx="107.2" cy="334.1" r="8" />
          {CITIES.map((c) => (
            <g key={c.en} className={c.home ? "city home" : "city"}>
              <circle cx={c.x} cy={c.y} r="5" />
              <text x={c.x + c.dx} y={c.y + c.dy} textAnchor={c.anchor}>{c.en}</text>
              <text className={c.home ? undefined : "hz"} x={c.x + c.dx} y={c.y + c.dy + 13} textAnchor={c.anchor}>{c.local}</text>
            </g>
          ))}
          <circle className="traveller" r="4.5">
            <animateMotion dur="5.5s" begin="2.9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".6 0 .3 1">
              <mpath href="#r1" />
            </animateMotion>
          </circle>
        </g>
      </svg>
      <div className="gate-caption">
        <T en="Now in Kunming" bn="কুনমিংয়ে এখন" /> <b><Clock zone="Asia/Shanghai" /></b>
      </div>
    </div>
  );
}
