"use client";

import { useEffect, useState } from "react";

const WORDS = ["স্বাগতম", "欢迎", "Welcome", "আসসালামু আলাইকুম"];

/** Splits text into visible characters, so Bangla conjuncts are never cut in half. */
function graphemes(word: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: new (l?: string, o?: { granularity: string }) => { segment(s: string): Iterable<{ segment: string }> } }).Segmenter;
  return Seg ? Array.from(new Seg(undefined, { granularity: "grapheme" }).segment(word), (s) => s.segment) : Array.from(word);
}

/** Types and erases a welcome in Bangla, Chinese and English. */
export default function Greeting() {
  const [text, setText] = useState(WORDS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let wi = 0;
    let chars = graphemes(WORDS[0]);
    let ci = chars.length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (deleting) {
        ci--;
        setText(chars.slice(0, ci).join(""));
        if (ci <= 0) {
          deleting = false;
          wi = (wi + 1) % WORDS.length;
          chars = graphemes(WORDS[wi]);
        }
        timer = setTimeout(step, 55);
      } else {
        ci++;
        setText(chars.slice(0, ci).join(""));
        if (ci >= chars.length) {
          deleting = true;
          timer = setTimeout(step, 2400);
        } else timer = setTimeout(step, 110);
      }
    };
    timer = setTimeout(step, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="greet" aria-hidden="true">
      <span>{text}</span>
      <i className="caret" />
    </div>
  );
}
