import Link from "next/link";
import { T, PageTitle } from "@/lib/i18n";
import type { Bi } from "@/lib/site";

type Props = {
  crumb: Bi;
  kicker: Bi;
  title: Bi;
  lede: Bi;
  /** How far along the journey this page sits, 0 to 100 (fills the small gold line). */
  leg: number;
  tabTitle: Bi;
};

export default function PageHead({ crumb, kicker, title, lede, leg, tabTitle }: Props) {
  return (
    <section className="wrap page-head">
      <PageTitle {...tabTitle} />
      <div className="crumbs">
        <Link href="/"><T en="Home" bn="হোম" /></Link>
        <span aria-hidden="true">/</span>
        <span><T {...crumb} /></span>
      </div>
      <span className="leg" style={{ ["--p" as string]: `${leg}%` }}><i /><span><T {...kicker} /></span></span>
      <h1><T {...title} /></h1>
      <p className="lede"><T {...lede} /></p>
    </section>
  );
}
