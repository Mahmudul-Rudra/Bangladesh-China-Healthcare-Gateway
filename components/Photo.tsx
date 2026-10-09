"use client";

import type { CSSProperties } from "react";
import { IMAGES, imgSrc, type ImageName } from "@/lib/images";
import { useTr } from "@/lib/i18n";

type Props = {
  name: ImageName;
  /** CSS sizes hint, so phones download the small file. */
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  decorative?: boolean;
};

/** A responsive WebP photo (800px and 1600px versions) with a bilingual description. */
export default function Photo({ name, sizes = "(max-width: 800px) 100vw, 50vw", className, style, priority, decorative }: Props) {
  const tr = useTr();
  const alt = decorative ? "" : tr(IMAGES[name].en, IMAGES[name].bn);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc(name, 1600)}
      srcSet={`${imgSrc(name, 800)} 800w, ${imgSrc(name, 1600)} 1600w`}
      sizes={sizes}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
}
