"use client";

import { useEffect, useState } from "react";
import { privateMessage } from "@/lib/fertility";
import { waLink } from "@/lib/site";
import { T, useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "../Icons";

type Who = "wife" | "husband" | "either";

/**
 * Privacy, shown rather than promised: a browser tab that only says "Family Care",
 * the exact WhatsApp message that will be sent (it never says infertility),
 * and a choice of who we contact.
 */
export default function PrivacyPanel() {
  const { lang } = useLang();
  const [who, setWho] = useState<Who>("either");
  const [typed, setTyped] = useState("Family Care Consultation");
  const msg = privateMessage(who, lang);

  // The tab title types itself once, to draw the eye to what a family member would see.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = "Family Care Consultation";
    let i = 0;
    setTyped("");
    const id = setInterval(() => { i++; setTyped(full.slice(0, i)); if (i >= full.length) clearInterval(id); }, 55);
    return () => clearInterval(id);
  }, []);

  const opts: Array<{ v: Who; en: string; bn: string }> = [
    { v: "wife", en: "The wife", bn: "স্ত্রী" },
    { v: "husband", en: "The husband", bn: "স্বামী" },
    { v: "either", en: "Either of us", bn: "যেকোনো একজন" },
  ];

  return (
    <div className="pv">
      <div className="pv-browser" aria-hidden="true">
        <div className="pv-tabs">
          <span className="pv-tab"><i className="pv-fav" />{typed}<b className="pv-caret" /></span>
          <span className="pv-tab ghost" />
        </div>
        <div className="pv-url">…/family-care</div>
        <div className="pv-body">
          <span><T en="What a family member sees on your phone" bn="আপনার ফোনে পরিবারের কেউ যা দেখবেন" /></span>
        </div>
      </div>

      <div className="pv-wa">
        <div className="pv-label"><T en="Who should we contact?" bn="কার সঙ্গে যোগাযোগ করব?" /></div>
        <div className="pv-who" role="group" aria-label="Who should we contact">
          {opts.map((o) => (
            <button key={o.v} type="button" aria-pressed={who === o.v} onClick={() => setWho(o.v)}>
              {lang === "bn" ? o.bn : o.en}
            </button>
          ))}
        </div>
        <div className="pv-label"><T en="The exact message that will be sent" bn="হুবহু যে বার্তা যাবে" /></div>
        <div className="pv-bubble" key={`${who}-${lang}`}>
          {msg.split("\n").map((l) => <span key={l}>{l}</span>)}
          <time>✓✓</time>
        </div>
        <a className="btn btn-wa" href={waLink(msg)} target="_blank" rel="noopener">
          <WhatsAppIcon /><span><T en="Message us privately" bn="গোপনে বার্তা পাঠান" /></span>
        </a>
        <p className="small muted"><T en="The word infertility never appears in your chat history." bn="আপনার চ্যাটে কোথাও বন্ধ্যাত্ব শব্দটি থাকবে না।" /></p>
      </div>
    </div>
  );
}
