import type { Metadata } from "next";
import { waLink } from "@/lib/site";
import { T } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/Icons";
import Journey from "@/components/Journey";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "The Journey",
  description: "Twelve stops from Dhaka to treatment in China and home again.",
};

export default function JourneyPage() {
  return (
    <>
      <PageHead
        tabTitle={{ en: "The Journey | Healthcare Gateway", bn: "যাত্রাপথ | হেলথকেয়ার গেটওয়ে" }}
        crumb={{ en: "The journey", bn: "যাত্রাপথ" }}
        kicker={{ en: "Twelve stops, one line", bn: "বারোটি ধাপ, একটি রেখা" }}
        title={{ en: "Your road from Dhaka to China, and home again", bn: "ঢাকা থেকে চীন, আবার ঘরে ফেরার পথ" }}
        lede={{ en: "Each stop shows what you do and what we do. Most of the early steps happen from home, before you decide anything.", bn: "প্রতিটি ধাপে দেখুন আপনি কী করবেন আর আমরা কী করি। প্রথম দিকের বেশিরভাগ কাজ ঘরে বসেই হয়, কোনো সিদ্ধান্তের আগেই।" }}
        leg={45}
      />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap"><Journey detail /></div>
      </section>
      <section className="wrap">
        <div className="cta">
          <h2><T en="Take the first step today" bn="প্রথম ধাপটা আজই নিন" /></h2>
          <p><T en="Sending photos of your reports starts the journey. There is no obligation." bn="রিপোর্টের ছবি পাঠালেই যাত্রা শুরু। কোনো বাধ্যবাধকতা নেই।" /></p>
          <div className="btn-row">
            <a className="btn btn-wa" href={waLink("Assalamu alaikum, I would like to send my medical reports.")} target="_blank" rel="noopener">
              <WhatsAppIcon /><span><T en="Send reports on WhatsApp" bn="হোয়াটসঅ্যাপে রিপোর্ট পাঠান" /></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
