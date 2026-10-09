/**
 * Prayer times and qibla direction, calculated in the browser (no outside service).
 * Method: University of Islamic Sciences, Karachi (Fajr 18°, Isha 18°), the method commonly used in Bangladesh.
 * Asr: Hanafi (shadow factor 2, common in Bangladesh) or Shafi'i (factor 1).
 * Algorithm follows the widely used PrayTimes.org formulas.
 */

export type City = { id: string; en: string; bn: string; hz?: string; lat: number; lng: number; tz: number; zone: string };

export const CITIES: City[] = [
  { id: "kunming", en: "Kunming", bn: "কুনমিং", hz: "昆明", lat: 25.0389, lng: 102.7183, tz: 8, zone: "Asia/Shanghai" },
  { id: "guangzhou", en: "Guangzhou", bn: "গুয়াংজু", hz: "广州", lat: 23.1291, lng: 113.2644, tz: 8, zone: "Asia/Shanghai" },
  { id: "beijing", en: "Beijing", bn: "বেইজিং", hz: "北京", lat: 39.9042, lng: 116.4074, tz: 8, zone: "Asia/Shanghai" },
  { id: "shanghai", en: "Shanghai", bn: "সাংহাই", hz: "上海", lat: 31.2304, lng: 121.4737, tz: 8, zone: "Asia/Shanghai" },
];
export const DHAKA: City = { id: "dhaka", en: "Dhaka", bn: "ঢাকা", lat: 23.8103, lng: 90.4125, tz: 6, zone: "Asia/Dhaka" };

export type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export const PRAYERS: Array<{ key: PrayerKey; en: string; bn: string; ar: string }> = [
  { key: "fajr", en: "Fajr", bn: "ফজর", ar: "الفجر" },
  { key: "dhuhr", en: "Dhuhr", bn: "যোহর", ar: "الظهر" },
  { key: "asr", en: "Asr", bn: "আসর", ar: "العصر" },
  { key: "maghrib", en: "Maghrib", bn: "মাগরিব", ar: "المغرب" },
  { key: "isha", en: "Isha", bn: "এশা", ar: "العشاء" },
];

export type Times = Record<PrayerKey | "sunrise", number>; // hours in the city's local time, e.g. 13.25 = 13:15

const D2R = Math.PI / 180;
const sin = (d: number) => Math.sin(d * D2R);
const cos = (d: number) => Math.cos(d * D2R);
const tan = (d: number) => Math.tan(d * D2R);
const asin = (x: number) => Math.asin(x) / D2R;
const acos = (x: number) => Math.acos(Math.max(-1, Math.min(1, x))) / D2R;
const atan2 = (y: number, x: number) => Math.atan2(y, x) / D2R;
const acot = (x: number) => Math.atan(1 / x) / D2R;
const fix = (a: number, b: number) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };

function julian(y: number, m: number, d: number) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fix(357.529 + 0.98560028 * D, 360);
  const q = fix(280.459 + 0.98564736 * D, 360);
  const L = fix(q + 1.915 * sin(g) + 0.020 * sin(2 * g), 360);
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  return { declination: asin(sin(e) * sin(L)), equation: q / 15 - fix(RA, 24) };
}

/** Prayer times for one city on one calendar date (in that city's time zone). */
export function prayerTimes(city: City, y: number, m: number, d: number, asr: "hanafi" | "shafii" = "hanafi"): Times {
  const jDate = julian(y, m, d) - city.lng / (15 * 24);
  const lat = city.lat;
  const midDay = (t: number) => fix(12 - sunPosition(jDate + t).equation, 24);
  const angleTime = (angle: number, t: number, ccw = false) => {
    const decl = sunPosition(jDate + t).declination;
    const T = acos((-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / 15;
    return midDay(t) + (ccw ? -T : T);
  };
  const asrTime = (factor: number, t: number) => {
    const decl = sunPosition(jDate + t).declination;
    return angleTime(-acot(factor + tan(Math.abs(lat - decl))), t);
  };
  // Two passes: first with rough guesses, then refined with the first results.
  let est = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, maghrib: 18, isha: 18 };
  for (let pass = 0; pass < 2; pass++) {
    const p = (h: number) => h / 24;
    est = {
      fajr: angleTime(18, p(est.fajr), true),
      sunrise: angleTime(0.833, p(est.sunrise), true),
      dhuhr: midDay(p(est.dhuhr)),
      asr: asrTime(asr === "hanafi" ? 2 : 1, p(est.asr)),
      maghrib: angleTime(0.833, p(est.maghrib)),
      isha: angleTime(18, p(est.isha)),
    };
  }
  const shift = city.tz - city.lng / 15;
  return {
    fajr: est.fajr + shift,
    sunrise: est.sunrise + shift,
    dhuhr: est.dhuhr + shift + 1 / 60, // Dhuhr a minute after the sun passes its highest point
    asr: est.asr + shift,
    maghrib: est.maghrib + shift + 1 / 60,
    isha: est.isha + shift,
  };
}

/** Direction of the Kaaba from a city, in degrees clockwise from true north. */
export function qibla(city: City) {
  const kLat = 21.4225, kLng = 39.8262;
  return fix(atan2(sin(kLng - city.lng), cos(city.lat) * tan(kLat) - sin(city.lat) * cos(kLng - city.lng)), 360);
}

const POINTS_EN = ["north", "north-northeast", "northeast", "east-northeast", "east", "east-southeast", "southeast", "south-southeast", "south", "south-southwest", "southwest", "west-southwest", "west", "west-northwest", "northwest", "north-northwest"];
const POINTS_BN = ["উত্তর", "উত্তর-উত্তর-পূর্ব", "উত্তর-পূর্ব", "পূর্ব-উত্তর-পূর্ব", "পূর্ব", "পূর্ব-দক্ষিণ-পূর্ব", "দক্ষিণ-পূর্ব", "দক্ষিণ-দক্ষিণ-পূর্ব", "দক্ষিণ", "দক্ষিণ-দক্ষিণ-পশ্চিম", "দক্ষিণ-পশ্চিম", "পশ্চিম-দক্ষিণ-পশ্চিম", "পশ্চিম", "পশ্চিম-উত্তর-পশ্চিম", "উত্তর-পশ্চিম", "উত্তর-উত্তর-পশ্চিম"];
export const compassPoint = (deg: number, lang: "en" | "bn") => (lang === "bn" ? POINTS_BN : POINTS_EN)[Math.round(fix(deg, 360) / 22.5) % 16];

/** "13:05" from 13.083 hours. */
export function hhmm(h: number) {
  const total = Math.round(fix(h, 24) * 60) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Today's date and the current time (in hours) in a given time zone. */
export function nowIn(zone: string, at = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: zone, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false })
      .formatToParts(at).map((p) => [p.type, p.value]),
  );
  const h = Number(parts.hour) % 24;
  return { y: Number(parts.year), m: Number(parts.month), d: Number(parts.day), hours: h + Number(parts.minute) / 60 + Number(parts.second) / 3600 };
}

/** Sky colour for a time of day, shaped by that day's real dawn and sunset. */
export function skyColor(h: number, t: Times): string {
  const stops: Array<[number, [number, number, number]]> = [
    [0, [12, 22, 44]],
    [t.fajr - 0.2, [16, 28, 56]],
    [t.fajr + 0.5, [70, 72, 120]],
    [t.sunrise, [231, 154, 132]],
    [t.sunrise + 1, [214, 226, 222]],
    [t.dhuhr, [196, 222, 232]],
    [t.asr + 0.5, [210, 220, 214]],
    [t.maghrib - 0.6, [240, 182, 110]],
    [t.maghrib, [214, 110, 104]],
    [t.maghrib + 0.5, [110, 76, 120]],
    [t.isha, [38, 40, 78]],
    [t.isha + 1, [16, 26, 52]],
    [24, [12, 22, 44]],
  ];
  const x = fix(h, 24);
  for (let i = 1; i < stops.length; i++) {
    if (x <= stops[i][0]) {
      const [h0, c0] = stops[i - 1], [h1, c1] = stops[i];
      const k = h1 === h0 ? 0 : (x - h0) / (h1 - h0);
      const c = c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }
  return "rgb(12, 22, 44)";
}
