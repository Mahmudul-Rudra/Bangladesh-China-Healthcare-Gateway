"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { T } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

/** Floating WhatsApp button. Its label slides out once on a visitor's first visit. */
export default function WhatsAppFloat() {
  const [hello, setHello] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (localStorage.getItem("gw-hello")) return;
      localStorage.setItem("gw-hello", "1");
    } catch {}
    const a = setTimeout(() => setHello(true), 3500);
    const b = setTimeout(() => setHello(false), 8000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  return (
    <a className={`wa-float${hello ? " hello" : ""}`} href={waLink("Assalamu alaikum, I would like to know about treatment in China.")} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
      <span className="label"><T en="Chat on WhatsApp" bn="হোয়াটসঅ্যাপে কথা বলুন" /></span>
      <span className="bubble"><WhatsAppIcon /></span>
    </a>
  );
}
