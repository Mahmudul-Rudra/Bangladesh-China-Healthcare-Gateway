"use client";

import type { ImageName } from "@/lib/images";
import Photo from "./Photo";
import { IlloOptions, IlloPassport, IlloPhone, IlloReceipt, IlloWindow } from "./Illustrations";

/** What each of the 12 journey stops shows: a photo, or a hand-drawn illustration. */
export const STOP_MEDIA: Array<{ photo: ImageName } | { illo: "options" | "receipt" | "passport" | "window" | "phone" }> = [
  { photo: "stage-before" },
  { photo: "stage-home" },
  { illo: "options" },
  { illo: "receipt" },
  { illo: "passport" },
  { illo: "window" },
  { photo: "day-0830" },
  { photo: "arch-stay" },
  { photo: "stage-china" },
  { photo: "arch-halal" },
  { photo: "stage-journey" },
  { illo: "phone" },
];

const ILLOS = { options: IlloOptions, receipt: IlloReceipt, passport: IlloPassport, window: IlloWindow, phone: IlloPhone };

export default function StopMedia({ index, sizes }: { index: number; sizes?: string }) {
  const m = STOP_MEDIA[index];
  if ("photo" in m) return <Photo name={m.photo} sizes={sizes ?? "(max-width: 960px) 90vw, 340px"} />;
  const Illo = ILLOS[m.illo];
  return <Illo />;
}
