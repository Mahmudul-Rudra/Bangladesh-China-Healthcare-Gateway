import Link from "next/link";
import { CHAIN } from "@/lib/content";
import { waLink } from "@/lib/site";
import { SITE } from "@/lib/site";
import { PageTitle, T } from "@/lib/i18n";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import Greeting from "@/components/Greeting";
import HeroMap from "@/components/HeroMap";
import Journey from "@/components/Journey";
import FamilyChat from "@/components/FamilyChat";
import GatePassage from "@/components/GatePassage";
import Photo from "@/components/Photo";

export default function Home() {
  return (
    <>
      <PageTitle en="Healthcare Gateway: Treatment in China" bn="হেলথকেয়ার গেটওয়ে: চীনে চিকিৎসা" />

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Greeting />
            <h1><T en="Treatment in China, with someone from home beside you." bn="চীনে চিকিৎসা, পাশে থাকবে দেশের মানুষ।" /></h1>
            <p className="lede">
              <T
                en="From the first medical report to the last follow-up at home, we walk the whole road with your family. A Bangla-speaking guide, halal meals, a Muslim-friendly stay, and a clear cost written down before you travel."
                bn="প্রথম মেডিকেল রিপোর্ট থেকে দেশে ফিরে শেষ ফলো-আপ পর্যন্ত, পুরো পথটা আমরা আপনার পরিবারের সঙ্গে হাঁটি। বাংলাভাষী গাইড, হালাল খাবার, মুসলিম-বান্ধব থাকা, আর আগেই লেখা স্পষ্ট খরচ।"
              />
            </p>
            <div className="btn-row">
              <a className="btn btn-wa" href={waLink("Assalamu alaikum, I would like to send my medical reports.")} target="_blank" rel="noopener">
                <WhatsAppIcon /><span><T en="Send reports on WhatsApp" bn="হোয়াটসঅ্যাপে রিপোর্ট পাঠান" /></span>
              </a>
              <Link className="btn btn-ghost" href="/journey/"><T en="See how the journey works" bn="যাত্রাপথটা দেখুন" /></Link>
            </div>
            <div className="facts">
              <span><T en="China is 2 hours ahead of Dhaka" bn="চীন বাংলাদেশের চেয়ে ২ ঘণ্টা এগিয়ে" /></span>
              <span><T en="Kunming is about 3 hours from Dhaka by air" bn="ঢাকা থেকে কুনমিং বিমানে প্রায় ৩ ঘণ্টা" /></span>
            </div>
          </div>
          <HeroMap />
        </div>
      </section>

      <GatePassage />

      <section className="section band" id="chain">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="One long road, held in one hand" bn="একটি লম্বা পথ, এক হাতে ধরা" /></span>
            <h2><T en="Every step of treatment in China, taken care of" bn="চীনে চিকিৎসার প্রতিটি ধাপ, আমরা সামলাই" /></h2>
            <p className="muted"><T en="When these steps live in phone calls, WhatsApp threads and paper files, details get lost and families wait. We keep everything in one place, so you never have to chase anything." bn="ফোন কল, হোয়াটসঅ্যাপ আর কাগজের ফাইলে এই কাজগুলো হারিয়ে যায়। আমরা সবকিছু এক জায়গায় রাখি, যাতে আপনাকে কিছু মনে রাখতে না হয়।" /></p>
          </div>
          <ul className="chain">
            {CHAIN.map((c) => (
              <li key={c.en}>
                <Icon name={c.icon} />
                <div><b><T en={c.en} bn={c.bn} /></b><span><T en={c.subEn} bn={c.subBn} /></span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Dhaka to China, and home again" bn="ঢাকা থেকে চীন, আবার ঘরে" /></span>
            <h2><T en="The journey in twelve stops" bn="বারোটি ধাপের যাত্রা" /></h2>
            <p className="muted"><T en="Scroll down. The gold line is your route." bn="নিচে স্ক্রল করুন। সোনালি রেখাটি আপনার যাত্রাপথ।" /></p>
          </div>
          <Journey />
          <div className="btn-row" style={{ marginTop: 40 }}>
            <Link className="btn btn-ghost" href="/journey/"><T en="See every stop in detail" bn="প্রতিটি ধাপ বিস্তারিত দেখুন" /></Link>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Care that feels like home" bn="ঘরের মতো যত্ন" /></span>
            <h2><T en="What matters most, far from home" bn="বিদেশে যা সবচেয়ে বেশি দরকার" /></h2>
          </div>
          <div className="comforts">
            <div className="arch">
              <div className="arch-photo"><Photo name="arch-guide" sizes="(max-width: 860px) 90vw, 380px" /></div>
              <div className="arch-text"><h3><T en="A Bangla-speaking guide" bn="বাংলাভাষী গাইড" /></h3><p><T en="Beside you every day, from the airport to the ward." bn="বিমানবন্দর থেকে ওয়ার্ড, প্রতিদিন আপনার পাশে।" /></p></div>
            </div>
            <div className="arch">
              <div className="arch-photo"><Photo name="arch-stay" sizes="(max-width: 860px) 90vw, 380px" /></div>
              <div className="arch-text"><h3><T en="A Muslim-friendly stay" bn="মুসলিম-বান্ধব থাকা" /></h3><p><T en="Near the hospital, with space to pray. Inspected by us." bn="হাসপাতালের কাছে, নামাজের জায়গাসহ। আমরা নিজে দেখে আসি।" /></p></div>
            </div>
            <div className="arch">
              <div className="arch-photo"><Photo name="arch-halal" sizes="(max-width: 860px) 90vw, 380px" /></div>
              <div className="arch-text"><h3><T en="Halal meals, to the doctor's diet" bn="ডাক্তারের ডায়েটে হালাল খাবার" /></h3><p><T en="Delivered to the ward every day." bn="প্রতিদিন ওয়ার্ডে পৌঁছে দিই।" /></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap family">
          <div className="section-head" style={{ margin: 0 }}>
            <span className="kicker"><T en="For the family at home" bn="দেশে থাকা পরিবারের জন্য" /></span>
            <h2><T en="Every moment, even from far away" bn="দূরে থেকেও প্রতিটি মুহূর্তের খবর" /></h2>
            <p className="muted"><T en="In Dhaka, Sylhet or Riyadh, the whole family receives updates in Bangla: the surgery is over, lunch arrived, what the doctor said. Elderly relatives can get them as Bangla voice messages." bn="ঢাকায়, সিলেটে বা রিয়াদে, পরিবারের সবাই বাংলায় খবর পান। অপারেশন শেষ হলো, খাবার পৌঁছাল, ডাক্তার কী বললেন। বয়স্কদের জন্য বাংলায় ভয়েস মেসেজও।" /></p>
          </div>
          <FamilyChat />
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="What we promise" bn="আমাদের প্রতিশ্রুতি" /></span>
            <h2><T en="Trust comes from clarity" bn="ভরসা আসে স্পষ্টতা থেকে" /></h2>
          </div>
          <div className="promises">
            <div><h3><T en="Every cost written before you travel" bn="যাত্রার আগেই সব খরচ লেখা" /></h3><p><T en="Treatment, travel, stay, meals, guide and our fee are listed separately. If the final bill contains something unexpected, we take it up with the hospital." bn="চিকিৎসা, যাতায়াত, থাকা, খাবার, গাইড আর আমাদের ফি আলাদা করে লেখা থাকে। চূড়ান্ত বিলে অপ্রত্যাশিত কিছু থাকলে আমরা হাসপাতালের সঙ্গে কথা বলি।" /></p></div>
            <div><h3><T en="Nothing shared without your consent" bn="আপনার সম্মতি ছাড়া কিছু নয়" /></h3><p><T en="Your reports go to hospitals without your name. Only the hospital you choose ever learns who you are." bn="আপনার রিপোর্ট হাসপাতালে যায় নাম-পরিচয় ছাড়া। আপনি যে হাসপাতাল বেছে নেন, শুধু তারাই জানে আপনি কে।" /></p></div>
            <div><h3><T en="Doctors decide treatment, never us" bn="চিকিৎসার সিদ্ধান্ত ডাক্তারের" /></h3><p><T en="We do not sell hospitals. Doctors decide the treatment, you choose the hospital, and we take care of everything else." bn="আমরা হাসপাতাল বিক্রি করি না। চিকিৎসকেরা চিকিৎসা ঠিক করেন, আপনি হাসপাতাল বেছে নেন, আর আমরা বাকি সব সামলাই।" /></p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta">
            <h2><T en="Send your reports today. The first advice comes to your home." bn="আজই রিপোর্ট পাঠান, ঘরে বসেই প্রথম পরামর্শ" /></h2>
            <p><T en="Send photos of your reports on WhatsApp. We reply in Bangla and explain the next step." bn="হোয়াটসঅ্যাপে রিপোর্টের ছবি পাঠান। আমরা বাংলায় উত্তর দিই এবং পরের ধাপ বুঝিয়ে বলি।" /></p>
            <div className="btn-row">
              <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener"><WhatsAppIcon /><span>WhatsApp {SITE.whatsappDisplay}</span></a>
              <Link className="btn btn-ghost btn-on-teal" href="/contact/"><T en="Fill in the form" bn="ফর্ম পূরণ করুন" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
