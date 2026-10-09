"use client";

import { useState } from "react";
import { T } from "@/lib/i18n";

export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    const finish = () => { setDone(true); setTimeout(() => setDone(false), 1600); };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(finish, finish);
    else finish();
  };
  return (
    <button className="copy" type="button" onClick={copy}>
      {done ? <T en="Copied" bn="কপি হয়েছে" /> : <T en="Copy" bn="কপি" />}
    </button>
  );
}
