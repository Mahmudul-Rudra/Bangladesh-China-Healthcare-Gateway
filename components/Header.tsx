"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { T, useLang } from "@/lib/i18n";
import { Logo } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  // Close the phone menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className={`site-head${scrolled ? " scrolled" : ""}`}>
      <div className="wrap head-row">
        <Link className="brand" href="/" aria-label={`${SITE.nameEn}, home`}>
          <Logo />
          <span className="brand-name">
            <b><T en="Healthcare Gateway" bn="হেলথকেয়ার গেটওয়ে" /></b>
            <span><T en="Bangladesh to China" bn="বাংলাদেশ থেকে চীন" /></span>
          </span>
        </Link>
        <nav className="nav" id="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined}>
              <T en={n.en} bn={n.bn} />
            </Link>
          ))}
        </nav>
        <div className="lang" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === "en"} onClick={() => lang !== "en" && setLang("en")}>EN</button>
          <button type="button" aria-pressed={lang === "bn"} onClick={() => lang !== "bn" && setLang("bn")}>বাংলা</button>
        </div>
        <button className="menu-btn" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
          <span />
        </button>
      </div>
    </header>
  );
}
