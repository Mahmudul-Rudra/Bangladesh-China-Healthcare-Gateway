import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { LangProvider, T } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

// Fonts are self-hosted (no Google requests), so the site also loads for families inside China.
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-opsz-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-latin-opsz-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});
const figtree = localFont({ src: "./fonts/figtree-latin-wght-normal.woff2", weight: "300 900", variable: "--font-figtree", display: "swap" });
const bnSerif = localFont({ src: "./fonts/noto-serif-bengali-bengali-wght-normal.woff2", weight: "100 900", variable: "--font-bn-serif", display: "swap", adjustFontFallback: false, preload: false });
const bnSans = localFont({
  src: [
    { path: "./fonts/hind-siliguri-bengali-400-normal.woff2", weight: "400" },
    { path: "./fonts/hind-siliguri-bengali-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-bn-sans",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const glyphs = localFont({ src: "./fonts/city-glyphs.woff2", weight: "900", variable: "--font-glyphs", display: "block", adjustFontFallback: false, preload: false });

export const metadata: Metadata = {
  title: { default: "Healthcare Gateway: Treatment in China", template: "%s | Healthcare Gateway" },
  description: "Modern treatment in China for Bangladeshi patients, with a Bangla-speaking guide, halal meals, Muslim-friendly stays and clear costs.",
  openGraph: { type: "website", title: "Bangladesh – China Healthcare Gateway" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0F4743" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (WOT, launchers, password managers) add attributes
    // to <html> and <body> before React loads. This ignores those attribute differences on these two tags only.
    <html lang="en" className={`${newsreader.variable} ${figtree.variable} ${bnSerif.variable} ${bnSans.variable} ${glyphs.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the visitor's saved theme before the page paints, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("gw-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body suppressHydrationWarning>
        <LangProvider>
          <a className="skip" href="#main"><T en="Skip to content" bn="মূল অংশে যান" /></a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LangProvider>
      </body>
    </html>
  );
}
