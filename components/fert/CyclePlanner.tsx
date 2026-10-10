"use client";

import { useEffect, useMemo, useState } from "react";
import { privateMessage } from "@/lib/fertility";
import { waLink } from "@/lib/site";
import { T, useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "../Icons";

const DAY = 86400000;
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const add = (d: Date, n: number) => new Date(d.getTime() + n * DAY);

type Phase = "travel" | "inject" | "collect" | "lab" | "transfer" | "home" | "wait" | "test";

/**
 * Cycle planner: from the first day of the last period, sketch an approximate IVF timeline
 * (when to fly, injections, egg collection, transfer, flying home, the blood test),
 * drawn as a calendar ribbon that fills day by day. Always an estimate the doctor confirms.
 */
export default function CyclePlanner() {
  const { lang } = useLang();
  const [last, setLast] = useState("");
  const [len, setLen] = useState(28);
  const [example, setExample] = useState(true);

  // Start with an example date (10 days ago), clearly labelled as an example.
  useEffect(() => { setLast(iso(add(new Date(), -10))); }, []);

  const plan = useMemo(() => {
    if (!last) return null;
    const L = new Date(`${last}T00:00:00`);
    if (isNaN(L.getTime())) return null;
    const next = add(L, len);
    const fly = add(next, -2);
    const inject = add(next, 1);
    const collect = add(inject, 11);
    const transfer = add(collect, 5);
    const home = add(transfer, 2);
    const test = add(transfer, 11);
    const start = add(fly, -1), end = add(test, 1);
    const days: Array<{ d: Date; phase: Phase | "" }> = [];
    for (let t = start.getTime(); t <= end.getTime(); t += DAY) {
      const d = new Date(t);
      let phase: Phase | "" = "";
      if (+d === +fly) phase = "travel";
      else if (d > fly && d < inject) phase = "travel";
      else if (d >= inject && d < collect) phase = "inject";
      else if (+d === +collect) phase = "collect";
      else if (d > collect && d < transfer) phase = "lab";
      else if (+d === +transfer) phase = "transfer";
      else if (d > transfer && d < home) phase = "lab";
      else if (+d === +home) phase = "home";
      else if (d > home && d < test) phase = "wait";
      else if (+d === +test) phase = "test";
      days.push({ d, phase });
    }
    const stay = Math.round((home.getTime() - fly.getTime()) / DAY);
    return { fly, inject, collect, transfer, home, test, days, stay };
  }, [last, len]);

  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) =>
    new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", opts).format(d);
  const bn = (s: string) => (lang === "bn" ? s.replace(/\d/g, (x) => "০১২৩৪৫৬৭৮৯"[Number(x)]) : s);

  const rows: Array<{ k: Phase; en: string; bnT: string; d?: Date }> = plan ? [
    { k: "travel", en: "Fly to China", bnT: "চীনে যাত্রা", d: plan.fly },
    { k: "inject", en: "Injections begin", bnT: "ইনজেকশন শুরু", d: plan.inject },
    { k: "collect", en: "Egg collection", bnT: "ডিম্বাণু সংগ্রহ", d: plan.collect },
    { k: "transfer", en: "Embryo transfer", bnT: "ভ্রূণ স্থাপন", d: plan.transfer },
    { k: "home", en: "Fly home", bnT: "দেশে ফেরা", d: plan.home },
    { k: "test", en: "Blood test in Dhaka", bnT: "ঢাকায় রক্তপরীক্ষা", d: plan.test },
  ] : [];

  const message = plan ? privateMessage("either", lang, lang === "bn"
    ? `সম্ভাব্য যাত্রা: ${fmt(plan.fly)}, ফেরা: ${fmt(plan.home)}।`
    : `Possible travel: ${fmt(plan.fly)}, return: ${fmt(plan.home)}.`) : "";

  return (
    <div className="cp">
      <div className="cp-inputs">
        <div className="field">
          <label htmlFor="cp-last"><T en="First day of her last period" bn="শেষ মাসিকের প্রথম দিন" /></label>
          <input id="cp-last" type="date" value={last} onChange={(e) => { setLast(e.target.value); setExample(false); }} />
        </div>
        <div className="field">
          <label htmlFor="cp-len"><T en="Usual cycle length" bn="সাধারণ চক্রের দৈর্ঘ্য" /></label>
          <select id="cp-len" value={len} onChange={(e) => { setLen(Number(e.target.value)); setExample(false); }}>
            {Array.from({ length: 12 }, (_, i) => 24 + i).map((n) => <option key={n} value={n}>{bn(`${n}`)} {lang === "bn" ? "দিন" : "days"}</option>)}
          </select>
        </div>
        {example && <span className="cp-example"><T en="Example dates. Enter yours." bn="উদাহরণ তারিখ। আপনার তারিখ দিন।" /></span>}
      </div>

      {plan && (
        <>
          <div className="cp-ribbon" key={`${last}-${len}`} aria-hidden="true">
            {plan.days.map((x, i) => (
              <span key={i} className={`cp-day ${x.phase}`} style={{ ["--i" as string]: i }}>
                <small>{bn(String(x.d.getDate()))}</small>
              </span>
            ))}
          </div>
          <div className="cp-legend" aria-hidden="true">
            <span><i className="travel" /><T en="Travel" bn="যাত্রা" /></span>
            <span><i className="inject" /><T en="Injections" bn="ইনজেকশন" /></span>
            <span><i className="lab" /><T en="Lab and rest" bn="ল্যাব ও বিশ্রাম" /></span>
            <span><i className="wait" /><T en="Waiting at home" bn="বাড়িতে অপেক্ষা" /></span>
          </div>
          <ol className="cp-list">
            {rows.map((r, i) => (
              <li key={r.k} className={r.k} style={{ ["--i" as string]: i }}>
                <b>{r.d ? fmt(r.d, { weekday: "short", day: "numeric", month: "long" }) : ""}</b>
                <span>{lang === "bn" ? r.bnT : r.en}</span>
              </li>
            ))}
          </ol>
          <div className="cp-summary">
            <span className="cp-stay">{bn(lang === "bn" ? `চীনে প্রায় ${plan.stay} দিন` : `About ${plan.stay} days in China`)}</span>
            <a className="btn btn-wa" href={waLink(message)} target="_blank" rel="noopener"><WhatsAppIcon /><span><T en="Send this plan privately" bn="পরিকল্পনাটি গোপনে পাঠান" /></span></a>
          </div>
          <p className="small muted cp-note">
            <T
              en="An estimate only; your doctor sets the real dates. Many hospitals in China freeze the embryos and transfer them in a later cycle. Then you fly home after egg collection and return for a short second trip."
              bn="এটি শুধু একটি আনুমানিক হিসাব; আসল তারিখ ঠিক করেন ডাক্তার। চীনের অনেক হাসপাতাল ভ্রূণ সংরক্ষণ করে পরের চক্রে স্থাপন করে। সেক্ষেত্রে ডিম্বাণু সংগ্রহের পর দেশে ফিরে, পরে আরেকটি ছোট যাত্রা করতে হয়।"
            />
          </p>
        </>
      )}
    </div>
  );
}
