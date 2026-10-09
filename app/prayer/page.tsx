import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle, T } from "@/lib/i18n";
import { Check } from "@/components/Icons";
import InView from "@/components/InView";
import Photo from "@/components/Photo";
import PrayerLive from "@/components/PrayerLive";

export const metadata: Metadata = {
  title: "Prayer in China",
  description: "Live prayer times and qibla direction for Kunming, Guangzhou, Beijing and Shanghai, beside your family's times in Dhaka.",
};

const MOSQUES = [
  { hz: "南城清真寺", en: "Nancheng Mosque", city: "Kunming", cityBn: "কুনমিং", sEn: "One of Kunming's oldest mosques, in the heart of the city.", sBn: "কুনমিংয়ের প্রাচীনতম মসজিদগুলোর একটি, শহরের কেন্দ্রে।" },
  { hz: "怀圣寺", en: "Huaisheng Mosque", city: "Guangzhou", cityBn: "গুয়াংজু", sEn: "Among the oldest mosques in China, known for its tall lighthouse minaret.", sBn: "চীনের প্রাচীনতম মসজিদগুলোর একটি, উঁচু বাতিঘর-মিনারের জন্য পরিচিত।" },
  { hz: "牛街礼拜寺", en: "Niujie Mosque", city: "Beijing", cityBn: "বেইজিং", sEn: "Beijing's best-known historic mosque, in the Hui quarter of Niujie.", sBn: "বেইজিংয়ের সবচেয়ে পরিচিত ঐতিহাসিক মসজিদ, নিউজিয়ে হুই এলাকায়।" },
  { hz: "小桃园清真寺", en: "Xiaotaoyuan Mosque", city: "Shanghai", cityBn: "সাংহাই", sEn: "A well-known mosque in Shanghai's old city.", sBn: "সাংহাইয়ের পুরোনো শহরের একটি পরিচিত মসজিদ।" },
];

const ROOM = [
  { en: "Qibla direction marked in your room", bn: "আপনার ঘরে কিবলার দিক চিহ্নিত" },
  { en: "A prayer mat waiting for you", bn: "আপনার জন্য জায়নামাজ রাখা" },
  { en: "A water jug for wudu", bn: "অজুর জন্য পানির পাত্র" },
  { en: "Prayer times sent to your phone in Bangla", bn: "বাংলায় নামাজের সময় আপনার ফোনে" },
];

export default function PrayerPage() {
  return (
    <>
      <PageTitle en="Prayer in China | Healthcare Gateway" bn="চীনে নামাজ | হেলথকেয়ার গেটওয়ে" />
      <PrayerLive />

      <section className="section band">
        <div className="wrap split split-media">
          <InView className="tilt-photo" threshold={0.3}>
            <Photo name="day-0530" sizes="(max-width: 860px) 92vw, 460px" />
          </InView>
          <div>
            <span className="kicker"><T en="Your room" bn="আপনার ঘর" /></span>
            <h2><T en="Ready for salah before you arrive" bn="পৌঁছানোর আগেই নামাজের প্রস্তুতি" /></h2>
            <ul className="checklist checklist-1">
              {ROOM.map((r) => <li key={r.en}><Check /><span><T en={r.en} bn={r.bn} /></span></li>)}
            </ul>
            <div className="ramadan">
              <b><T en="In Ramadan" bn="রমজানে" /></b>
              <p><T en="Suhoor and iftar meals arrive on time, and we ask your doctor how to take your medicines while fasting." bn="সেহরি ও ইফতার সময়মতো পৌঁছায়, আর রোজায় কীভাবে ওষুধ খাবেন তা আমরা ডাক্তারের কাছ থেকে জেনে নিই।" /></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Mosques" bn="মসজিদ" /></span>
            <h2><T en="Historic mosques in each city" bn="প্রতিটি শহরের ঐতিহাসিক মসজিদ" /></h2>
            <p className="muted"><T en="Islam reached China more than a thousand years ago. When your doctor allows, your guide can take you to Jumu'ah." bn="হাজার বছরেরও আগে ইসলাম চীনে পৌঁছেছে। ডাক্তার অনুমতি দিলে গাইড আপনাকে জুমায় নিয়ে যেতে পারেন।" /></p>
          </div>
          <div className="mosques">
            {MOSQUES.map((m, i) => (
              <InView key={m.en} className="mosque" threshold={0.3} style={{ ["--i" as string]: i }}>
                <svg className="mosque-arch" viewBox="0 -24 120 174" aria-hidden="true">
                  <path d="M10 150 V70 Q10 18 60 6 Q110 18 110 70 V150" />
                  <path d="M60 6 V-6" />
                  <path className="crescent" d="M56 -18 a8 8 0 1 0 10 10 a6 6 0 1 1 -10 -10z" />
                </svg>
                <span className="mosque-hz">{m.hz}</span>
                <b>{m.en}</b>
                <span className="mosque-city"><T en={m.city} bn={m.cityBn} /></span>
                <p><T en={m.sEn} bn={m.sBn} /></p>
              </InView>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 40 }}>
            <Link className="btn btn-ghost" href="/life-in-china/"><T en="See a treatment day in Kunming" bn="কুনমিংয়ে চিকিৎসার একটি দিন দেখুন" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
