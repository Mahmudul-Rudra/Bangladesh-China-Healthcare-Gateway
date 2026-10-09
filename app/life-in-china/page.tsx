import type { Metadata } from "next";
import { STAY_CHECKS } from "@/lib/content";
import { T } from "@/lib/i18n";
import { Check } from "@/components/Icons";
import CityGlyphs from "@/components/CityGlyphs";
import DayStrip from "@/components/DayStrip";
import Link from "next/link";
import InView from "@/components/InView";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "Life in China",
  description: "Prayer, halal food, verified stays and staying connected during treatment in China.",
};

export default function LifeInChina() {
  return (
    <>
      <PageHead
        tabTitle={{ en: "Life in China | Healthcare Gateway", bn: "চীনে থাকা | হেলথকেয়ার গেটওয়ে" }}
        crumb={{ en: "Life in China", bn: "চীনে থাকা" }}
        kicker={{ en: "Far from home, never alone", bn: "দূরে, তবু একা নয়" }}
        title={{ en: "What a day in China feels like with us", bn: "আমাদের সঙ্গে চীনে একটি দিন কেমন কাটে" }}
        lede={{ en: "An ordinary treatment day in Kunming, hour by hour. Scroll and watch the day pass, with the time at home in Dhaka beside it.", bn: "কুনমিংয়ে চিকিৎসার একটি সাধারণ দিন, ঘণ্টায় ঘণ্টায়। স্ক্রল করে দেখুন দিন কীভাবে কাটে, পাশে ঢাকার সময়।" }}
        leg={70}
      />
      <DayStrip />

      <section className="wrap">
        <Link className="prayer-link" href="/prayer/">
          <span className="hz" aria-hidden="true">☾</span>
          <span><b><T en="Five prayers, far from home" bn="দূরদেশে পাঁচ ওয়াক্ত" /></b><small><T en="Live prayer times and the qibla for each city in China" bn="চীনের প্রতিটি শহরের নামাজের সময় ও কিবলা" /></small></span>
        </Link>
      </section>

      <section className="section band">
        <div className="wrap split split-media">
          <InView className="tilt-photo" threshold={0.3}>
            <Photo name="arch-stay" sizes="(max-width: 860px) 92vw, 520px" />
          </InView>
          <div>
            <span className="kicker"><T en="Where you stay" bn="থাকার জায়গা" /></span>
            <h2><T en="We inspect every place ourselves" bn="প্রতিটি জায়গা আমরা নিজে দেখে আসি" /></h2>
            <ul className="checklist">
              {STAY_CHECKS.map((s) => <li key={s.en}><Check /><span><T en={s.en} bn={s.bn} /></span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap duo">
          <InView className="duo-card" threshold={0.25}>
            <div className="duo-photo"><Photo name="day-1230" sizes="(max-width: 860px) 92vw, 560px" /></div>
            <span className="kicker"><T en="Food" bn="খাবার" /></span>
            <h2><T en="Halal, and the way the doctor ordered" bn="হালাল, এবং ডাক্তার যেমন বলেছেন" /></h2>
            <p className="muted"><T en="Cooked by trusted Muslim cooks near the hospital. When the doctor changes the diet, the meals change that day." bn="হাসপাতালের কাছের বিশ্বস্ত মুসলিম রাঁধুনির রান্না। ডাক্তার ডায়েট বদলালে সেদিনই খাবার বদলায়।" /></p>
          </InView>
          <InView className="duo-card" threshold={0.25}>
            <div className="duo-photo"><Photo name="day-1700" sizes="(max-width: 860px) 92vw, 560px" /></div>
            <span className="kicker"><T en="Phone and money" bn="যোগাযোগ ও টাকা" /></span>
            <h2><T en="WhatsApp keeps working in China" bn="চীনে পৌঁছেও হোয়াটসঅ্যাপ চালু" /></h2>
            <p className="muted"><T en="WhatsApp and Google are blocked in China, so we set up a data plan before you fly. Your guide handles cash, with a receipt for every expense." bn="চীনে হোয়াটসঅ্যাপ ও গুগল বন্ধ, তাই যাত্রার আগেই ডেটা প্ল্যান ঠিক করে দিই। নগদ টাকা গাইড সামলান, প্রতিটি খরচের রসিদসহ।" /></p>
          </InView>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="The cities" bn="শহরগুলো" /></span>
            <h2><T en="Where patients usually go" bn="যেসব শহরে রোগীরা সাধারণত যান" /></h2>
            <p className="muted"><T en="Tap a city to step inside." bn="শহরে ট্যাপ করে ভেতরে ঢুকুন।" /></p>
          </div>
          <CityGlyphs />
        </div>
      </section>
    </>
  );
}
