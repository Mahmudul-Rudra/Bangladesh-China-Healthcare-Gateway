"use client";

import { useState } from "react";
import { imgSrc, type ImageName } from "@/lib/images";
import { T } from "@/lib/i18n";
import Photo from "./Photo";

const CITIES: Array<{ hz: string; en: string; img: ImageName; sEn: string; sBn: string }> = [
  { hz: "昆明", en: "Kunming", img: "city-kunming", sEn: "The closest major city to Dhaka, about 3 hours by air", sBn: "ঢাকার সবচেয়ে কাছের বড় শহর, প্রায় ৩ ঘণ্টার ফ্লাইট" },
  { hz: "广州", en: "Guangzhou", img: "city-guangzhou", sEn: "A major medical centre in southern China", sBn: "দক্ষিণ চীনের বড় চিকিৎসা কেন্দ্র" },
  { hz: "北京", en: "Beijing", img: "city-beijing", sEn: "Home to specialist national hospitals", sBn: "বিশেষায়িত জাতীয় হাসপাতালগুলোর শহর" },
  { hz: "上海", en: "Shanghai", img: "city-shanghai", sEn: "Hospitals well known to international patients", sBn: "আন্তর্জাতিক রোগীদের জন্য পরিচিত হাসপাতাল" },
];

/**
 * Each city's name in Chinese characters is filled with a photo of the city, drifting slowly.
 * Hover or tap opens the full photo from the centre of the characters, like a moon gate.
 */
export default function CityGlyphs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="glyphs">
      {CITIES.map((c, i) => (
        <button
          type="button"
          key={c.en}
          className={`glyph-card${open === i ? " open" : ""}`}
          onClick={() => setOpen(open === i ? null : i)}
          onMouseLeave={() => setOpen((o) => (o === i ? null : o))}
          aria-pressed={open === i}
        >
          <span className="glyph-photo" aria-hidden="true"><Photo name={c.img} sizes="(max-width: 860px) 50vw, 300px" decorative /></span>
          <span className="glyph" aria-hidden="true" style={{ ["--img" as string]: `url(${imgSrc(c.img, 800)})`, ["--d" as string]: `${i * -3}s` }}>{c.hz}</span>
          <span className="glyph-meta">
            <b>{c.en}</b>
            <span><T en={c.sEn} bn={c.sBn} /></span>
          </span>
        </button>
      ))}
    </div>
  );
}
