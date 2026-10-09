"use client";

import { useEffect, useState } from "react";

/** Live hh:mm in a time zone, e.g. Asia/Dhaka or Asia/Shanghai. */
export default function Clock({ zone }: { zone: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: zone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [zone]);
  return <>{time}</>;
}
