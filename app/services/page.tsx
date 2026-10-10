import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_STAGES, TREATMENTS } from "@/lib/content";
import type { ImageName } from "@/lib/images";
import { T } from "@/lib/i18n";
import { Check } from "@/components/Icons";
import InView from "@/components/InView";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "Services",
  description: "Medical report review, online doctor advice, cost estimates, visa, flights, guides, halal food and follow-up care.",
};

const STAGE_PHOTOS: ImageName[] = ["stage-before", "stage-journey", "stage-china", "stage-home"];

/** Keeps the first sentence only, so each service reads in one line. */
const first = (s: string) => {
  const m = s.match(/^.+?[.।](\s|$)/);
  return (m ? m[0] : s).trim();
};

export default function Services() {
  return (
    <>
      <PageHead
        tabTitle={{ en: "Services | Healthcare Gateway", bn: "সেবাসমূহ | হেলথকেয়ার গেটওয়ে" }}
        crumb={{ en: "Services", bn: "সেবাসমূহ" }}
        kicker={{ en: "What we take care of", bn: "আমরা যা সামলাই" }}
        title={{ en: "Everything between the first report and recovery at home", bn: "প্রথম রিপোর্ট থেকে দেশে সুস্থ হয়ে ওঠা পর্যন্ত সবকিছু" }}
        lede={{ en: "Four stages, one passport. Every service is explained in Bangla and every cost is written down in advance.", bn: "চারটি ধাপ, একটি পাসপোর্ট। প্রতিটি সেবা বাংলায় বোঝানো হয়, প্রতিটি খরচ আগেই লেখা থাকে।" }}
        leg={20}
      />
      <section className="wrap passport">
        {SERVICE_STAGES.map((st, i) => (
          <InView as="article" className={`pp${i % 2 ? " pp-flip" : ""}`} key={st.en} threshold={0.2}>
            <div className="pp-page">
              <div className="pp-photo">
                <Photo name={STAGE_PHOTOS[i]} sizes="(max-width: 860px) 92vw, 640px" />
              </div>
              <div className="stamp pp-stamp" aria-hidden="true">
                <div><b><T en={st.en} bn={st.bn} /></b><small>{st.code}</small></div>
              </div>
              <span className="pp-no" aria-hidden="true">{String(i + 1).padStart(2, "0")} / 04</span>
            </div>
            <div className="pp-text">
              <h2><T en={st.en} bn={st.bn} /></h2>
              <ul className="pp-list">
                {st.items.map((it, k) => (
                  <li key={it.en} style={{ ["--k" as string]: k }}>
                    <h3><T en={it.en} bn={it.bn} /></h3>
                    <p><T en={first(it.pEn)} bn={first(it.pBn)} /></p>
                  </li>
                ))}
              </ul>
            </div>
          </InView>
        ))}
      </section>
      <section className="wrap" style={{ paddingBottom: "clamp(48px, 7vw, 96px)" }}>
        <Link className="fc-teaser" href="/family-care/">
          <div className="fc-teaser-photo"><Photo name="fert-consult" sizes="(max-width: 760px) 70vw, 360px" /></div>
          <div className="fc-teaser-copy">
            <span className="kicker"><T en="A dedicated program" bn="বিশেষ প্রোগ্রাম" /></span>
            <h2><T en="Fertility care and IVF" bn="ফার্টিলিটি চিকিৎসা ও আইভিএফ" /></h2>
            <p className="muted"><T en="A women-only team for the wife, private care for the husband, a cycle planner and honest numbers." bn="স্ত্রীর জন্য শুধু নারী দল, স্বামীর জন্য একান্ত যত্ন, চক্র পরিকল্পনা ও সৎ হিসাব।" /></p>
            <span className="btn btn-teal"><T en="Open the Shapla program" bn="শাপলা প্রোগ্রাম দেখুন" /></span>
          </div>
        </Link>
      </section>
      <section className="section band">
        <div className="wrap split">
          <div>
            <span className="kicker"><T en="Treatments families ask us about" bn="যেসব চিকিৎসার জন্য পরিবারগুলো যোগাযোগ করে" /></span>
            <h2><T en="Tell us about your condition" bn="আপনার রোগের কথা লিখে জানান" /></h2>
            <p className="muted"><T en="This is not a complete list. Which treatment is right for you is decided by doctors, never by us." bn="এটি সম্পূর্ণ তালিকা নয়। কোন চিকিৎসা আপনার জন্য উপযুক্ত, তা ঠিক করেন চিকিৎসকেরা, আমরা নই।" /></p>
            <div className="btn-row"><Link className="btn btn-teal" href="/contact/"><T en="Tell us about your case" bn="আপনার কেস জানান" /></Link></div>
          </div>
          <div>
            <ul className="checklist">
              {TREATMENTS.map((t) => <li key={t.en}><Check /><span><T en={t.en} bn={t.bn} /></span></li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
