"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageName } from "@/lib/images";
import { T } from "@/lib/i18n";
import { Logo } from "./Icons";
import Photo from "./Photo";

type Msg = { tagEn: string; tagBn: string; text: string; time: string; photo?: ImageName };

const MESSAGES: Msg[] = [
  { tagEn: "Admitted", tagBn: "ভর্তি", text: "আম্মা হাসপাতালে ভর্তি হয়েছেন। গাইড রাশেদ সঙ্গে আছেন।", time: "09:40 · Kunming 11:40" },
  { tagEn: "Meal", tagBn: "খাবার", text: "দুপুরের হালাল খাবার পৌঁছেছে, ডাক্তারের দেওয়া নরম খাবার।", time: "10:15 · Kunming 12:15", photo: "chat-meal" },
  { tagEn: "Surgery", tagBn: "অপারেশন", text: "অপারেশন সফলভাবে শেষ হয়েছে, রোগী এখন রিকভারি রুমে।", time: "14:05 · Kunming 16:05", photo: "chat-ward" },
];

/**
 * Example Bangla updates. When the phone scrolls into view, "typing..." appears,
 * then each message (two of them with photos) arrives in turn.
 */
export default function FamilyChat() {
  const ref = useRef<HTMLDivElement>(null);
  // Everything is visible before JavaScript runs; once mounted, messages are replayed in order.
  const [shown, setShown] = useState(MESSAGES.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    setShown(0);
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      let t = 300;
      MESSAGES.forEach((_, i) => {
        timers.push(setTimeout(() => setTyping(true), t));
        t += 1100;
        timers.push(setTimeout(() => { setTyping(false); setShown(i + 1); }, t));
        t += 700;
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="chat" ref={ref} aria-label="Example family updates">
      <div className="chat-top">
        <i><Logo ring="var(--on-teal)" /></i>
        <div>
          <b><T en="Gateway care team" bn="গেটওয়ে কেয়ার টিম" /></b>
          <small>{typing ? <><T en="typing" bn="লিখছেন" /><span className="typing" aria-hidden="true"><i /><i /><i /></span></> : <T en="Example updates" bn="উদাহরণ বার্তা" />}</small>
        </div>
      </div>
      <div className="chat-body">
        {MESSAGES.map((m, i) => (
          <div key={m.time} className={`msg${m.photo ? " msg-photo" : ""}${i < shown ? " on" : " dim"}`}>
            {m.photo && <div className="msg-img"><Photo name={m.photo} sizes="300px" /></div>}
            <span className="tag"><T en={m.tagEn} bn={m.tagBn} /></span>
            <br />
            {m.text}
            <time>{m.time}</time>
          </div>
        ))}
      </div>
    </div>
  );
}
