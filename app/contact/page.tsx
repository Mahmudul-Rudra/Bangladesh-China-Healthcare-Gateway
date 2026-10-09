import type { Metadata } from "next";
import { SITE, waLink } from "@/lib/site";
import { T } from "@/lib/i18n";
import Clock from "@/components/Clock";
import ContactPass from "@/components/ContactPass";
import CopyButton from "@/components/CopyButton";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us on WhatsApp or email about treatment in China.",
};

export default function Contact() {
  return (
    <>
      <PageHead
        tabTitle={{ en: "Contact | Healthcare Gateway", bn: "যোগাযোগ | হেলথকেয়ার গেটওয়ে" }}
        crumb={{ en: "Contact", bn: "যোগাযোগ" }}
        kicker={{ en: "Your boarding pass to care", bn: "চিকিৎসার পথে আপনার বোর্ডিং পাস" }}
        title={{ en: "Tell us about the patient. We reply in Bangla.", bn: "রোগীর কথা জানান। আমরা বাংলায় উত্তর দিই।" }}
        lede={{ en: "Send this form on WhatsApp or by email, whichever you prefer. You can also simply send photos of your reports on WhatsApp.", bn: "ফর্মটি হোয়াটসঅ্যাপে বা ইমেইলে, যেভাবে সুবিধা পাঠান। চাইলে সরাসরি হোয়াটসঅ্যাপে রিপোর্টের ছবিও পাঠাতে পারেন।" }}
        leg={100}
      />
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap contact-grid">
          <ContactPass />
          <aside className="direct">
            <div className="direct-item">
              <small>WhatsApp</small>
              <div className="val"><a href={waLink()} target="_blank" rel="noopener">{SITE.whatsappDisplay}</a><CopyButton text={SITE.whatsappDisplay} /></div>
            </div>
            <div className="direct-item">
              <small><T en="Email" bn="ইমেইল" /></small>
              <div className="val"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><CopyButton text={SITE.email} /></div>
            </div>
            <div className="direct-item">
              <small><T en="When we reply" bn="যোগাযোগের সময়" /></small>
              <p><T en="Every day, Bangladesh time. For patients already in China, at any hour in an emergency." bn="প্রতিদিন, বাংলাদেশ সময়। জরুরি অবস্থায় চীনে থাকা রোগীদের জন্য যেকোনো সময়।" /></p>
              <div className="clocks" style={{ marginTop: 6 }}>
                <div><small><T en="Dhaka" bn="ঢাকা" /></small><b><Clock zone="Asia/Dhaka" /></b></div>
                <div><small><T en="China" bn="চীন" /></small><b><Clock zone="Asia/Shanghai" /></b></div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
