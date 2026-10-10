import type { Metadata } from "next";
import { HALAL, PROMISES, privateMessage } from "@/lib/fertility";
import { waLink } from "@/lib/site";
import { PageTitle, T } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/Icons";
import InView from "@/components/InView";
import Photo from "@/components/Photo";
import CyclePlanner from "@/components/fert/CyclePlanner";
import PrivacyPanel from "@/components/fert/PrivacyPanel";
import TwoPaths from "@/components/fert/TwoPaths";
import { AgeHonest, ShaplaBloom, TestChecklist, WaitCompanion } from "@/components/fert/Interactive";

// The tab title is deliberately neutral, so the page is safe to open on a shared family phone.
export const metadata: Metadata = {
  title: { absolute: "Family Care Consultation | Healthcare Gateway" },
  description: "Private fertility and IVF care in China for Bangladeshi couples: a woman-led team for the wife, private care for the husband, halal-conscious treatment and honest costs.",
};

const STAR = "M50 4 L61 25 L85 15 L75 39 L96 50 L75 61 L85 85 L61 75 L50 96 L39 75 L15 85 L25 61 L4 50 L25 39 L15 15 L39 25 Z";

export default function FamilyCare() {
  const quiet = waLink(privateMessage("either", "en"));
  return (
    <div className="fc">
      <PageTitle en="Family Care Consultation | Healthcare Gateway" bn="ফ্যামিলি কেয়ার পরামর্শ | হেলথকেয়ার গেটওয়ে" />

      {/* ---------- Hero ---------- */}
      <section className="fc-hero">
        <div className="wrap fc-hero-grid">
          <div className="fc-hero-copy">
            <span className="fc-kicker"><span className="hz">শাপলা</span> <T en="The Shapla program" bn="শাপলা প্রোগ্রাম" /></span>
            <h1><T en="Two hearts, one hope." bn="দুই হৃদয়, এক আশা।" /></h1>
            <p className="lede"><T en="Fertility care and IVF in China for couples from Bangladesh. Privately, within your faith, and with both of you cared for, side by side." bn="বাংলাদেশের দম্পতিদের জন্য চীনে ফার্টিলিটি চিকিৎসা ও আইভিএফ। নিভৃতে, আপনাদের বিশ্বাসের মধ্যে থেকে, দুজনকেই পাশাপাশি যত্নে।" /></p>
            <div className="btn-row">
              <a className="btn btn-wa" href={quiet} target="_blank" rel="noopener"><WhatsAppIcon /><span><T en="Talk to us privately" bn="গোপনে কথা বলুন" /></span></a>
              <a className="btn btn-ghost" href="#planner"><T en="Plan your cycle" bn="চক্রের পরিকল্পনা করুন" /></a>
            </div>
            <ul className="fc-chips">
              <li><T en="Neutral page title" bn="নিরপেক্ষ পাতার নাম" /></li>
              <li><T en="Neutral WhatsApp message" bn="নিরপেক্ষ হোয়াটসঅ্যাপ বার্তা" /></li>
              <li><T en="Women-only team for her" bn="স্ত্রীর জন্য শুধু নারী দল" /></li>
            </ul>
          </div>
          <div className="fc-hero-art">
            <div className="fc-arch"><Photo name="fert-hero" priority sizes="(max-width: 860px) 92vw, 520px" /></div>
          </div>
        </div>
        <svg className="fc-braid" viewBox="0 0 1200 150" preserveAspectRatio="none" aria-hidden="true">
          <path className="her" pathLength={1} d="M0 30 C 220 30, 330 120, 520 90 S 600 40, 600 75 S 590 120, 606 150" />
          <path className="him" pathLength={1} d="M1200 30 C 980 30, 870 120, 680 90 S 600 40, 600 75 S 610 120, 594 150" />
        </svg>
      </section>

      {/* ---------- Privacy ---------- */}
      <section className="section fc-privacy">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Your privacy, built in" bn="আপনার গোপনীয়তা, শুরু থেকেই" /></span>
            <h2><T en="No one needs to know until you are ready." bn="আপনি প্রস্তুত না হওয়া পর্যন্ত কারও জানার দরকার নেই।" /></h2>
            <p className="muted"><T en="Many couples keep this to themselves. So privacy is designed into every step, starting with this page." bn="অনেক দম্পতি বিষয়টি নিজেদের মধ্যেই রাখেন। তাই প্রতিটি ধাপে গোপনীয়তা রাখা হয়েছে, এই পাতা থেকেই।" /></p>
          </div>
          <PrivacyPanel />
        </div>
      </section>

      {/* ---------- It takes two ---------- */}
      <section className="section band fc-two">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="It takes two" bn="দুজনের পথ" /></span>
            <h2><T en="Care for both of you, side by side." bn="দুজনেরই যত্ন, পাশাপাশি।" /></h2>
            <p className="muted"><T en="The cause can be found in the wife, the husband, or both. So both of you are looked after, each with privacy and dignity, until your paths meet." bn="কারণ থাকতে পারে স্ত্রীর, স্বামীর, বা দুজনেরই। তাই দুজনেরই যত্ন নেওয়া হয়, গোপনীয়তা ও সম্মানের সঙ্গে, যতক্ষণ না দুটি পথ এক হয়।" /></p>
          </div>
          <TwoPaths />
        </div>
      </section>

      {/* ---------- Cycle planner ---------- */}
      <section className="section fc-plan" id="planner">
        <div className="wrap fc-plan-grid">
          <div className="fc-plan-head">
            <span className="kicker"><T en="Cycle planner" bn="চক্র পরিকল্পনা" /></span>
            <h2><T en="Plan the trip around her cycle." bn="তাঁর চক্র অনুযায়ী যাত্রার পরিকল্পনা।" /></h2>
            <p className="muted"><T en="IVF follows the body, not the calendar. Enter one date and see roughly when to fly, how long to stay, and when the result comes." bn="আইভিএফ ক্যালেন্ডার নয়, শরীরের নিয়মে চলে। একটি তারিখ দিন, দেখুন আনুমানিক কখন যাবেন, কতদিন থাকবেন, ফল কবে জানবেন।" /></p>
            <InView className="fc-plan-photo" threshold={0.3}><Photo name="fert-planning" sizes="(max-width: 860px) 92vw, 460px" /></InView>
          </div>
          <CyclePlanner />
        </div>
      </section>

      {/* ---------- Is this halal? ---------- */}
      <section className="section band fc-halal">
        <div className="wrap fc-halal-grid">
          <InView className="fc-dua" threshold={0.3}><Photo name="fert-dua" sizes="(max-width: 860px) 92vw, 420px" /></InView>
          <div>
            <span className="kicker"><T en="Faith" bn="বিশ্বাস" /></span>
            <h2><T en="Is IVF halal?" bn="আইভিএফ কি হালাল?" /></h2>
            <p className="muted"><T en="Most Islamic scholars and major fatwa bodies permit IVF when four conditions are kept. Our program is built on them." bn="বেশিরভাগ ইসলামি আলেম ও প্রধান ফতোয়া প্রতিষ্ঠান চারটি শর্ত মানলে আইভিএফ বৈধ বলেন। আমাদের প্রোগ্রাম এই শর্তগুলোর ওপরই গড়া।" /></p>
            <div className="halal">
              {HALAL.map((h, i) => (
                <InView as="div" key={h.en} className="halal-item" threshold={0.4} style={{ ["--i" as string]: i }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true"><path d={STAR} pathLength={1} /></svg>
                  <div><h3><T en={h.en} bn={h.bn} /></h3><p><T en={h.sEn} bn={h.sBn} /></p></div>
                </InView>
              ))}
            </div>
            <p className="small muted"><T en="Every family is different. Please confirm with a scholar you trust; we are happy to speak with them too." bn="প্রতিটি পরিবার আলাদা। আপনার ভরসার আলেমের সঙ্গে মিলিয়ে নিন; আমরাও তাঁর সঙ্গে কথা বলতে প্রস্তুত।" /></p>
          </div>
        </div>
      </section>

      {/* ---------- Honest numbers ---------- */}
      <section className="section fc-honest">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Honest numbers" bn="সৎ হিসাব" /></span>
            <h2><T en="Hope, without false promises." bn="আশা, মিথ্যা প্রতিশ্রুতি ছাড়া।" /></h2>
          </div>
          <div className="fc-honest-grid">
            <AgeHonest />
            <ul className="promise-list">
              {PROMISES.map((p) => <li key={p.en}><h3><T en={p.en} bn={p.bn} /></h3><p><T en={p.sEn} bn={p.sBn} /></p></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Before you fly ---------- */}
      <section className="section band fc-check">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Before you fly" bn="যাত্রার আগে" /></span>
            <h2><T en="Tests you can finish in Dhaka." bn="যেসব পরীক্ষা ঢাকাতেই সেরে নিতে পারেন।" /></h2>
            <p className="muted"><T en="Doing these first can save money and sometimes a wasted trip. Your doctor in China confirms the final list." bn="আগে করে নিলে খরচ বাঁচে, অনেক সময় একটি অপ্রয়োজনীয় যাত্রাও। চূড়ান্ত তালিকা দেন চীনের ডাক্তার।" /></p>
          </div>
          <TestChecklist />
        </div>
      </section>

      {/* ---------- Two-week wait ---------- */}
      <section className="section fc-wait">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="The two-week wait" bn="দুই সপ্তাহের অপেক্ষা" /></span>
            <h2><T en="The hardest fourteen days. You won't wait alone." bn="সবচেয়ে কঠিন চৌদ্দ দিন। একা অপেক্ষা করতে হবে না।" /></h2>
          </div>
          <WaitCompanion />
        </div>
      </section>

      {/* ---------- Bloom ---------- */}
      <ShaplaBloom />

      {/* ---------- Hope ---------- */}
      <section className="section fc-hope">
        <div className="wrap fc-hope-grid">
          <InView className="hope-a" threshold={0.3}><Photo name="fert-expecting" sizes="(max-width: 860px) 60vw, 360px" /></InView>
          <InView className="hope-b" threshold={0.3}><Photo name="fert-hope" sizes="(max-width: 860px) 92vw, 620px" /></InView>
          <div className="hope-copy">
            <h2><T en="When hope arrives, we are still there." bn="আশা যখন আসে, আমরা তখনও পাশে।" /></h2>
            <p className="muted"><T en="After a positive result, we help you continue care with your own doctor in Bangladesh, with every record in English." bn="ফল ইতিবাচক হলে, দেশে আপনার নিজের ডাক্তারের কাছে চিকিৎসা চালিয়ে যেতে সাহায্য করি, সব রেকর্ড ইংরেজিতে দিয়ে।" /></p>
            <a className="btn btn-wa" href={quiet} target="_blank" rel="noopener"><WhatsAppIcon /><span><T en="Start with a private conversation" bn="একটি নিভৃত আলাপ দিয়ে শুরু করুন" /></span></a>
            <p className="small muted fc-disclaimer"><T en="Photos are illustrations, not patients. Treatment decisions are made by licensed doctors, and success can never be guaranteed." bn="ছবিগুলো প্রতীকী, রোগীর নয়। চিকিৎসার সিদ্ধান্ত নেন নিবন্ধিত চিকিৎসক, আর সাফল্যের নিশ্চয়তা কখনো দেওয়া যায় না।" /></p>
          </div>
        </div>
      </section>
    </div>
  );
}
