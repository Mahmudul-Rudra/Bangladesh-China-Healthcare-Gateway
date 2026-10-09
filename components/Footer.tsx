import Link from "next/link";
import { NAV, SITE, waLink } from "@/lib/site";
import { T } from "@/lib/i18n";
import { Logo } from "./Icons";
import Clock from "./Clock";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/">
              <Logo />
              <span className="brand-name">
                <b><T en="Healthcare Gateway" bn="হেলথকেয়ার গেটওয়ে" /></b>
                <span><T en="Bangladesh to China" bn="বাংলাদেশ থেকে চীন" /></span>
              </span>
            </Link>
            <p className="muted small">
              <T en="Modern treatment in China, with us beside you from the first report to the last follow-up at home." bn="চীনের আধুনিক চিকিৎসা, প্রথম রিপোর্ট থেকে দেশে ফিরে ফলো-আপ পর্যন্ত, পুরোটা পথ আপনার পাশে।" />
            </p>
            <div className="clocks">
              <div><small><T en="Now in Dhaka" bn="এখন ঢাকায়" /></small><b><Clock zone="Asia/Dhaka" /></b></div>
              <div><small><T en="Now in China" bn="এখন চীনে" /></small><b><Clock zone="Asia/Shanghai" /></b></div>
            </div>
          </div>
          <div>
            <h4><T en="Pages" bn="পাতা" /></h4>
            {NAV.map((n) => <Link key={n.href} href={n.href}><T en={n.en} bn={n.bn} /></Link>)}
          </div>
          <div>
            <h4><T en="Talk to us" bn="যোগাযোগ" /></h4>
            <a href={waLink()} target="_blank" rel="noopener">WhatsApp {SITE.whatsappDisplay}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span className="muted small"><T en="We reply in Bangla and English" bn="বাংলা ও ইংরেজিতে উত্তর দিই" /></span>
          </div>
        </div>
        <div className="disclaimer">
          <span><T en="We are a patient facilitation service, not a hospital. Diagnosis and treatment decisions are made by licensed doctors." bn="আমরা রোগী সহায়তা প্রতিষ্ঠান, হাসপাতাল নই। রোগ নির্ণয় ও চিকিৎসার সিদ্ধান্ত নেন নিবন্ধিত চিকিৎসকেরা।" /></span>
          <span>© 2026 {SITE.nameEn}</span>
        </div>
      </div>
    </footer>
  );
}
