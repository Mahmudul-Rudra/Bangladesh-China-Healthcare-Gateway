import type { Metadata } from "next";
import { FAQ } from "@/lib/content";
import { T } from "@/lib/i18n";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "About & FAQ",
  description: "Who we are and answers to the questions families ask about treatment in China.",
};

export default function About() {
  return (
    <>
      <PageHead
        tabTitle={{ en: "About & FAQ | Healthcare Gateway", bn: "আমাদের কথা | হেলথকেয়ার গেটওয়ে" }}
        crumb={{ en: "About & FAQ", bn: "আমাদের কথা ও প্রশ্নোত্তর" }}
        kicker={{ en: "Who we are", bn: "আমরা কারা" }}
        title={{ en: "A bridge between two countries, built around one family at a time", bn: "দুই দেশের মাঝে একটি সেতু, প্রতিবার একটি পরিবারের জন্য" }}
        lede={{ en: "Bangladesh – China Healthcare Gateway helps Bangladeshi patients reach modern treatment in China, and makes sure they never face any part of it alone.", bn: "বাংলাদেশ – চীন হেলথকেয়ার গেটওয়ে বাংলাদেশি রোগীদের চীনের আধুনিক চিকিৎসা পেতে সাহায্য করে, আর নিশ্চিত করে কোনো ধাপেই যেন তাঁরা একা না থাকেন।" }}
        leg={85}
      />
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap split">
          <div><h2><T en="Why we do this" bn="আমরা কেন এটা করি" /></h2></div>
          <div>
            <p><T en="Treatment abroad is never only about the hospital. It is language, food, prayer, money, visas, and a family worrying at home. When all of this is scattered across phone calls and paper files, details get lost and patients wait." bn="বিদেশে চিকিৎসা মানে শুধু হাসপাতাল নয়। ভাষা, খাবার, নামাজ, টাকা, ভিসা, আর দেশে বসে থাকা পরিবারের দুশ্চিন্তা। এসব ফোন কল আর কাগজের ফাইলে ছড়িয়ে থাকলে তথ্য হারায়, রোগী অপেক্ষা করেন।" /></p>
            <p className="muted" style={{ marginTop: 14 }}><T en="We keep the whole road in one place and give every family one coordinator who knows the case from the first message to the last follow-up." bn="আমরা পুরো পথটি এক জায়গায় রাখি এবং প্রতিটি পরিবারের জন্য একজন সমন্বয়কারী রাখি, যিনি শুরু থেকে শেষ পর্যন্ত আপনার কেস জানেন।" /></p>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker"><T en="Questions families ask" bn="প্রশ্নোত্তর" /></span>
            <h2><T en="Answers before you ask" bn="আপনার প্রশ্নের উত্তর" /></h2>
          </div>
          <div className="faq">
            {FAQ.map((q) => (
              <details key={q.qEn}>
                <summary><T en={q.qEn} bn={q.qBn} /></summary>
                <p><T en={q.aEn} bn={q.aBn} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
