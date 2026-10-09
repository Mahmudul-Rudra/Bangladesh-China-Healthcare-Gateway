"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "bn";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {} });
const KEY = "gw-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the visitor's last choice (storage can be blocked, so it is optional).
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "bn") setLangState("bn");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const main = document.getElementById("main");
    if (main && !reduce && main.animate) {
      main.animate([{ opacity: 0.35, filter: "blur(3px)" }, { opacity: 1, filter: "blur(0)" }], { duration: 420, easing: "ease-out" });
    }
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Returns a picker: tr("English", "বাংলা") gives the text for the current language. */
export function useTr() {
  const { lang } = useLang();
  return (en: string, bn: string) => (lang === "bn" ? bn : en);
}

/** Inline bilingual text. English is rendered on the server, Bangla swaps in on the client. */
export function T({ en, bn }: { en: string; bn: string }) {
  const { lang } = useLang();
  return <>{lang === "bn" ? bn : en}</>;
}

/** Keeps the browser tab title in the chosen language. */
export function PageTitle({ en, bn }: { en: string; bn: string }) {
  const { lang } = useLang();
  useEffect(() => {
    document.title = lang === "bn" ? bn : en;
  }, [lang, en, bn]);
  return null;
}
