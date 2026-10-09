"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { TREATMENT_OPTIONS } from "@/lib/content";
import { SITE, waLink } from "@/lib/site";
import { T, useLang, useTr } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

type Form = { name: string; phone: string; email: string; city: string; treatment: string; relation: string; message: string; honey: string };
type Status = { kind: "" | "ok" | "err"; text: string };

const RELATIONS = [
  { value: "Patient", en: "The patient", bn: "রোগী নিজে" },
  { value: "Family member", en: "A family member", bn: "পরিবারের সদস্য" },
  { value: "Other", en: "Someone else", bn: "অন্য কেউ" },
];

/** The contact form, styled as a boarding pass. Sends on WhatsApp (pre-filled message) or by email (FormSubmit). */
export default function ContactPass() {
  const { lang } = useLang();
  const tr = useTr();
  const [f, setF] = useState<Form>({ name: "", phone: "", email: "", city: "", treatment: "", relation: "Patient", message: "", honey: "" });
  const [invalid, setInvalid] = useState<{ name?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<Status>({ kind: "", text: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [today, setToday] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()));
  }, []);

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const treatmentLabel = (() => {
    const o = TREATMENT_OPTIONS.find((x) => x.value === f.treatment && x.value);
    return o ? (lang === "bn" ? o.bn : o.en) : "";
  })();

  const message = useMemo(() => [
    "Assalamu alaikum. New enquiry from the website:",
    `Patient: ${f.name.trim()}`,
    `WhatsApp: ${f.phone.trim()}`,
    f.email.trim() && `Email: ${f.email.trim()}`,
    f.city.trim() && `City/district: ${f.city.trim()}`,
    f.treatment && `Treatment needed: ${f.treatment}`,
    `Contact is: ${f.relation}`,
    f.message.trim() && `About the condition: ${f.message.trim()}`,
  ].filter(Boolean).join("\n"), [f]);

  function check(): boolean {
    const bad = { name: !f.name.trim(), phone: f.phone.replace(/\D/g, "").length < 8 };
    setInvalid(bad);
    if (bad.name || bad.phone) {
      (bad.name ? nameRef : phoneRef).current?.focus();
      setStatus({ kind: "err", text: tr("Please add the patient's name and a WhatsApp number we can reach.", "রোগীর নাম আর যোগাযোগের হোয়াটসঅ্যাপ নম্বর লিখুন।") });
      return false;
    }
    setStatus({ kind: "", text: "" });
    return true;
  }

  function onWhatsApp(e: MouseEvent<HTMLAnchorElement>) {
    if (!check()) { e.preventDefault(); return; }
    setStatus({ kind: "ok", text: tr("WhatsApp is opening with your message. Press send there to reach us.", "হোয়াটসঅ্যাপ খুলছে। সেখানে সেন্ড চাপলেই বার্তা আমাদের কাছে পৌঁছাবে।") });
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    if (!check() || f.honey) return;
    setSending(true);
    setStatus({ kind: "", text: tr("Sending...", "পাঠানো হচ্ছে...") });
    const payload: Record<string, string> = {
      _subject: `New patient enquiry: ${f.name.trim()}`,
      _template: "table",
      _captcha: "false",
      "Patient name": f.name.trim(),
      WhatsApp: f.phone.trim(),
      Email: f.email.trim() || "-",
      "City or district": f.city.trim() || "-",
      "Treatment needed": f.treatment || "-",
      "Contact is": f.relation,
      "About the condition": f.message.trim() || "-",
      "Website language": lang,
    };
    if (f.email.trim()) payload._replyto = f.email.trim();
    try {
      const r = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || String(j.success) !== "true") throw new Error("failed");
      setSent(true);
      setStatus({ kind: "ok", text: tr("Sent. We will reply within one working day, in Bangla or English.", "পাঠানো হয়েছে। এক কর্মদিবসের মধ্যে বাংলা বা ইংরেজিতে উত্তর দেব।") });
    } catch {
      setStatus({ kind: "err", text: tr(`The email could not be sent from here. Please use the WhatsApp button, or write to ${SITE.email}.`, `এখান থেকে ইমেইল পাঠানো যায়নি। হোয়াটসঅ্যাপ বোতামটি ব্যবহার করুন, অথবা ${SITE.email} ঠিকানায় লিখুন।`) });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={`pass${sent ? " sent" : ""}`} noValidate onSubmit={onEmail}>
      <div className="pass-main">
        <div className="pass-top">
          <div className="route-code">
            <span>DAC<small><T en="Dhaka" bn="ঢাকা" /></small></span>
            <svg viewBox="0 0 64 18" aria-hidden="true"><path d="M2 14 C 20 2, 44 2, 62 14" strokeDasharray="3 4" /><path d="M56 9l6 5-7 1" /></svg>
            <span>CHN<small><T en="China" bn="চীন" /></small></span>
          </div>
          <div className="meta"><T en="Patient pass" bn="রোগীর পাস" /><br />{today}</div>
        </div>
        <div className="fields">
          <div className="field">
            <label htmlFor="f-name"><T en="Patient's name" bn="রোগীর নাম" /></label>
            <input id="f-name" ref={nameRef} name="name" autoComplete="name" required value={f.name} onChange={set("name")} aria-invalid={invalid.name ? "true" : "false"} placeholder={tr("e.g. Nasima Akter", "যেমন: নাসিমা আক্তার")} />
          </div>
          <div className="field">
            <label htmlFor="f-phone"><T en="Your WhatsApp number" bn="আপনার হোয়াটসঅ্যাপ নম্বর" /></label>
            <input id="f-phone" ref={phoneRef} name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={f.phone} onChange={set("phone")} aria-invalid={invalid.phone ? "true" : "false"} placeholder="+880 1XXX-XXXXXX" />
          </div>
          <div className="field">
            <label htmlFor="f-email"><T en="Email (optional)" bn="ইমেইল (ঐচ্ছিক)" /></label>
            <input id="f-email" name="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="f-city"><T en="City or district" bn="শহর বা জেলা" /></label>
            <input id="f-city" name="city" value={f.city} onChange={set("city")} placeholder={tr("e.g. Sylhet", "যেমন: সিলেট")} />
          </div>
          <div className="field">
            <label htmlFor="f-tx"><T en="Treatment needed" bn="কোন চিকিৎসা দরকার" /></label>
            <select id="f-tx" name="treatment" value={f.treatment} onChange={set("treatment")}>
              {TREATMENT_OPTIONS.map((o) => <option key={o.value || "none"} value={o.value}>{lang === "bn" ? o.bn : o.en}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-rel"><T en="You are" bn="আপনি কে" /></label>
            <select id="f-rel" name="relation" value={f.relation} onChange={set("relation")}>
              {RELATIONS.map((o) => <option key={o.value} value={o.value}>{lang === "bn" ? o.bn : o.en}</option>)}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="f-msg"><T en="A few words about the condition" bn="সংক্ষেপে রোগের কথা" /></label>
            <textarea id="f-msg" name="message" value={f.message} onChange={set("message")} placeholder={tr("Diagnosis, how long, which doctors you have seen...", "রোগ নির্ণয়, কতদিন ধরে, কোন ডাক্তার দেখিয়েছেন...")} />
          </div>
          <input className="hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.honey} onChange={set("honey")} />
        </div>
        <div className="send-row">
          <a className="btn btn-wa" href={waLink(message)} target="_blank" rel="noopener" onClick={onWhatsApp}>
            <WhatsAppIcon /><span><T en="Send on WhatsApp" bn="হোয়াটসঅ্যাপে পাঠান" /></span>
          </a>
          <button className="btn btn-teal" type="submit" disabled={sending}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>
            <span><T en="Send by email" bn="ইমেইলে পাঠান" /></span>
          </button>
        </div>
        <p className={`status ${status.kind}`} role="status" aria-live="polite">{status.text}</p>
      </div>
      <div className="pass-stub" aria-hidden="true">
        <div className="stub-row"><small><T en="Patient" bn="রোগী" /></small><b>{f.name.trim() || "......."}</b></div>
        <div className="stub-row"><small><T en="Treatment" bn="চিকিৎসা" /></small><b>{treatmentLabel || "......."}</b></div>
        <div className="stub-row"><small><T en="Gate" bn="গেট" /></small><b>01</b></div>
        <div className="barcode" />
      </div>
      <div className="stamp-ok" aria-hidden="true">
        <span>{lang === "bn" ? <>পেয়েছি<br />ধন্যবাদ</> : <>RECEIVED<br />THANK YOU</>}</span>
      </div>
    </form>
  );
}
