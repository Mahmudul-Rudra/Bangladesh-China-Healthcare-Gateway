"use client";

/**
 * Hand-built illustrations for journey stops that have no photo.
 * Each one animates when its parent has the class "is-on" (the stop is in view or active).
 * All colours come from the site's tokens, so they work in light and dark mode.
 */
import { useId } from "react";
import { useLang } from "@/lib/i18n";

const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg className="illo" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <rect width="400" height="400" fill="var(--paper-2)" />
    <circle cx="330" cy="70" r="120" fill="var(--paper-3)" opacity=".6" />
    {children}
  </svg>
);

/** Three hospital proposals fan out side by side; one gets the gold tick. */
export function IlloOptions() {
  const { lang } = useLang();
  const cards = [
    { x: 40, price: 70, days: 3, label: "A" },
    { x: 145, price: 52, days: 2, label: "B" },
    { x: 250, price: 84, days: 5, label: "C" },
  ];
  return (
    <Frame label={lang === "bn" ? "তিনটি হাসপাতালের প্রস্তাব পাশাপাশি" : "Three hospital proposals side by side"}>
      {cards.map((c, i) => (
        <g key={c.label} className="io-card" style={{ ["--i" as string]: i }}>
          <rect x={c.x} y="110" width="110" height="190" rx="12" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
          <path d={`M${c.x + 30} 170 v-24 h50 v24 M${c.x + 44} 170 v-12 h22 v12 M${c.x + 55} 138 v-14 M${c.x + 48} 131 h14`} fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" />
          <text x={c.x + 55} y="200" textAnchor="middle" fontFamily="var(--display)" fontSize="22" fill="var(--ink)">{c.label}</text>
          <rect x={c.x + 16} y="218" width="78" height="8" rx="4" fill="var(--paper-3)" />
          <rect className="io-bar" x={c.x + 16} y="218" width={c.price} height="8" rx="4" fill="var(--gold)" />
          {Array.from({ length: c.days }, (_, d) => <circle key={d} cx={c.x + 22 + d * 12} cy="246" r="3.5" fill="var(--jade)" />)}
          <rect x={c.x + 16} y="264" width="60" height="6" rx="3" fill="var(--paper-3)" />
        </g>
      ))}
      <g className="io-tick">
        <circle cx="200" cy="300" r="22" fill="var(--gold)" />
        <path d="M189 300l8 8 15-16" fill="none" stroke="var(--paper)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

/** A receipt in Taka unrolls line by line, ending on a gold total. */
export function IlloReceipt() {
  const { lang } = useLang();
  const rows = lang === "bn"
    ? ["চিকিৎসা", "ফ্লাইট", "থাকা", "হালাল খাবার", "গাইড", "সেবা ফি"]
    : ["Treatment", "Flights", "Stay", "Halal meals", "Guide", "Service fee"];
  return (
    <Frame label={lang === "bn" ? "টাকায় লেখা খরচের হিসাব" : "A cost estimate written in Taka"}>
      <g className="ir-paper">
        <path d="M110 60 h180 v270 l-15 10 -15 -10 -15 10 -15 -10 -15 10 -15 -10 -15 10 -15 -10 -15 10 -15 -10 -15 10 -15 -10 z" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="200" y="92" textAnchor="middle" fontFamily="var(--display)" fontSize="20" fill="var(--teal)">৳</text>
        <line x1="130" y1="104" x2="270" y2="104" stroke="var(--line)" strokeDasharray="4 4" />
        {rows.map((r, i) => (
          <g key={r} className="ir-row" style={{ ["--i" as string]: i }}>
            <text x="132" y={130 + i * 28} fontFamily="var(--body)" fontSize="13" fill="var(--ink-soft)">{r}</text>
            <rect x={232} y={121 + i * 28} width={36} height="8" rx="4" fill="var(--paper-3)" />
          </g>
        ))}
        <line x1="130" y1="298" x2="270" y2="298" stroke="var(--ink)" strokeWidth="1.5" />
        <g className="ir-total">
          <text x="132" y="320" fontFamily="var(--body)" fontWeight="700" fontSize="14" fill="var(--ink)">{lang === "bn" ? "মোট" : "Total"}</text>
          <rect x="214" y="310" width="54" height="11" rx="5" fill="var(--gold)" />
        </g>
      </g>
    </Frame>
  );
}

/** An open passport; the visa stamp lands with a thud. */
export function IlloPassport() {
  const { lang } = useLang();
  return (
    <Frame label={lang === "bn" ? "পাসপোর্টে ভিসার সিল" : "A visa stamp landing in a passport"}>
      <g transform="rotate(-6 200 220)">
        <rect x="70" y="110" width="260" height="190" rx="14" fill="var(--teal)" />
        <rect x="80" y="118" width="118" height="174" rx="8" fill="var(--paper)" />
        <rect x="202" y="118" width="118" height="174" rx="8" fill="var(--paper)" />
        <rect x="96" y="138" width="44" height="54" rx="4" fill="var(--paper-3)" />
        <circle cx="118" cy="158" r="10" fill="var(--ink-soft)" opacity=".5" />
        <path d="M102 188 q16 -18 32 0" fill="var(--ink-soft)" opacity=".5" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x="96" y={206 + i * 16} width={i % 2 ? 60 : 84} height="6" rx="3" fill="var(--paper-3)" />)}
        <g className="ip-stamp">
          <circle cx="262" cy="200" r="44" fill="none" stroke="var(--gold)" strokeWidth="3" />
          <circle cx="262" cy="200" r="36" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="262" y="196" textAnchor="middle" fontFamily="var(--hanzi)" fontSize="18" fill="var(--gold-ink)">中国</text>
          <text x="262" y="216" textAnchor="middle" fontFamily="var(--body)" fontWeight="700" fontSize="11" letterSpacing="2" fill="var(--gold-ink)">VISA</text>
        </g>
      </g>
      <circle className="ip-ring" cx="262" cy="214" r="46" fill="none" stroke="var(--gold)" strokeWidth="2" />
    </Frame>
  );
}

/** The view from a plane window: clouds drift past, the hills of Yunnan appear below. */
export function IlloWindow() {
  const { lang } = useLang();
  // Unique IDs: this drawing appears twice on the page (round viewer and phone Polaroid).
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `pw-clip-${uid}`, sky = `pw-sky-${uid}`;
  return (
    <svg className="illo illo-window" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={lang === "bn" ? "বিমানের জানালা দিয়ে মেঘ ও পাহাড়" : "Clouds and hills seen from a plane window"}>
      <defs>
        <clipPath id={clip}><rect x="105" y="60" width="190" height="270" rx="95" /></clipPath>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FB4C9" />
          <stop offset=".6" stopColor="#E9D3A6" />
          <stop offset="1" stopColor="#E7B76E" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#E4E8E2" />
      <rect x="80" y="36" width="240" height="318" rx="120" fill="#F3F4EF" stroke="#CDD3CC" strokeWidth="2" />
      <g clipPath={`url(#${clip})`}>
        <rect x="100" y="55" width="200" height="280" fill={`url(#${sky})`} />
        <g className="pw-land">
          <path d="M100 290 l40 -30 30 18 40 -40 40 30 30 -16 20 12 v80 h-200z" fill="#5F8F7C" />
          <path d="M100 312 l50 -18 40 10 50 -22 60 20 v50 h-200z" fill="#3C6E5F" />
          {[130, 150, 168, 214, 232].map((x, i) => <rect key={x} x={x} y={300 - (i % 3) * 8} width="8" height={20 + (i % 3) * 8} fill="#2E5149" opacity=".8" />)}
        </g>
        <g className="pw-clouds">
          <ellipse cx="150" cy="140" rx="46" ry="16" fill="#fff" opacity=".9" />
          <ellipse cx="250" cy="200" rx="60" ry="18" fill="#fff" opacity=".85" />
          <ellipse cx="170" cy="250" rx="40" ry="12" fill="#fff" opacity=".8" />
          <ellipse cx="150" cy="440" rx="46" ry="16" fill="#fff" opacity=".9" />
          <ellipse cx="250" cy="500" rx="60" ry="18" fill="#fff" opacity=".85" />
          <ellipse cx="170" cy="550" rx="40" ry="12" fill="#fff" opacity=".8" />
        </g>
        <path d="M300 220 L190 300 L300 300 Z" fill="#DCE1DD" opacity=".95" />
      </g>
      <rect x="105" y="60" width="190" height="270" rx="95" fill="none" stroke="#D7DCD5" strokeWidth="10" />
      <rect x="170" y="44" width="60" height="10" rx="5" fill="#C9CFC7" />
    </svg>
  );
}

/** A phone receives a medicine reminder in Bangla. */
export function IlloPhone() {
  const { lang } = useLang();
  return (
    <Frame label={lang === "bn" ? "ফোনে ওষুধের রিমাইন্ডার" : "A medicine reminder on a phone"}>
      <rect x="128" y="50" width="144" height="290" rx="26" fill="var(--ink)" />
      <rect x="136" y="58" width="128" height="274" rx="20" fill="var(--paper)" />
      <rect x="180" y="66" width="40" height="8" rx="4" fill="var(--ink)" />
      <text x="200" y="128" textAnchor="middle" fontFamily="var(--display)" fontSize="34" fill="var(--ink)">08:00</text>
      <g className="ph-note">
        <rect x="144" y="150" width="112" height="70" rx="12" fill="var(--paper-2)" stroke="var(--line)" />
        <rect x="154" y="162" width="22" height="22" rx="6" fill="var(--wa)" />
        <path d="M160 173 h10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <text x="182" y="178" fontFamily="var(--body)" fontWeight="700" fontSize="11" fill="var(--ink)">{lang === "bn" ? "ওষুধের সময়" : "Medicine time"}</text>
        <rect x="154" y="194" width="88" height="6" rx="3" fill="var(--paper-3)" />
        <rect x="154" y="205" width="60" height="6" rx="3" fill="var(--paper-3)" />
      </g>
      <g className="ph-pill">
        <rect x="174" y="246" width="52" height="22" rx="11" fill="var(--gold)" />
        <rect x="200" y="246" width="26" height="22" rx="0" fill="var(--paper)" opacity=".55" />
      </g>
      <g className="ph-check">
        <circle cx="200" cy="300" r="14" fill="var(--jade)" />
        <path d="M193 300l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}
