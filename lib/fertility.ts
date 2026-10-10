/* Content for the Shapla fertility program, in English and Bangla. Edit text here. */
import type { ImageName } from "./images";

export type Step = { en: string; bn: string; sEn: string; sBn: string; img?: ImageName };

/** The wife's path (apricot line) */
export const HER: Step[] = [
  { en: "Her tests, close to home", bn: "স্ত্রীর পরীক্ষা, বাড়ির কাছেই", sEn: "Hormone blood tests and an ultrasound in Dhaka, before you travel.", sBn: "যাত্রার আগে ঢাকায় হরমোন রক্তপরীক্ষা ও আল্ট্রাসাউন্ড।" },
  { en: "A woman specialist, by video", bn: "ভিডিওতে নারী বিশেষজ্ঞ", sEn: "Her first consultation is with a female doctor and a female interpreter.", sBn: "প্রথম পরামর্শ নারী ডাক্তারের সঙ্গে, নারী দোভাষীসহ।" },
  { en: "Only women around her", bn: "পাশে শুধু নারীরা", sEn: "In China, her doctor, interpreter and guide are all women.", sBn: "চীনে তাঁর ডাক্তার, দোভাষী ও গাইড সবাই নারী।" },
];

/** The husband's path (jade line) */
export const HIS: Step[] = [
  { en: "His test, done privately", bn: "স্বামীর পরীক্ষা, নিভৃতে", sEn: "A semen analysis at a lab near home, with no one else involved.", sBn: "বাড়ির কাছের ল্যাবে সিমেন অ্যানালাইসিস, আর কেউ জানবে না।" },
  { en: "A one-to-one consultation", bn: "একান্ত পরামর্শ", sEn: "He speaks with a male specialist, just the two of them and an interpreter.", sBn: "পুরুষ বিশেষজ্ঞের সঙ্গে একান্তে কথা, শুধু দোভাষী থাকেন।" },
  { en: "Quiet appointments", bn: "নিভৃত অ্যাপয়েন্টমেন্ট", sEn: "His visits in China are scheduled discreetly, with a male guide if he prefers.", sBn: "চীনে তাঁর অ্যাপয়েন্টমেন্ট নিভৃতে, চাইলে পুরুষ গাইডসহ।" },
];

/** Where the two lines meet and continue as one */
export const TOGETHER: Step[] = [
  { en: "Together with the doctor", bn: "ডাক্তারের সঙ্গে একসঙ্গে", sEn: "Your first meeting in China, as a couple, with an interpreter beside you.", sBn: "চীনে প্রথম সাক্ষাৎ, দুজন একসঙ্গে, পাশে দোভাষী।", img: "fert-consult" },
  { en: "Treatment begins", bn: "চিকিৎসা শুরু", sEn: "Usually about ten to twelve days of injections, checked by ultrasound.", sBn: "সাধারণত দশ থেকে বারো দিন ইনজেকশন, আল্ট্রাসাউন্ডে নজরদারি।" },
  { en: "In the lab, only yours", bn: "ল্যাবে, শুধুই আপনাদের", sEn: "Every dish carries your names and is checked by two embryologists.", sBn: "প্রতিটি ডিশে আপনাদের নাম, দুজন এমব্রায়োলজিস্ট মিলিয়ে দেখেন।", img: "fert-lab" },
  { en: "Embryo transfer", bn: "ভ্রূণ স্থাপন", sEn: "A short, gentle procedure. Extra embryos can be frozen for later.", sBn: "ছোট ও আলতো একটি প্রক্রিয়া। বাড়তি ভ্রূণ পরে ব্যবহারের জন্য সংরক্ষণ করা যায়।" },
  { en: "The two-week wait", bn: "দুই সপ্তাহের অপেক্ষা", sEn: "You can wait at home in Dhaka. We stay with you every day.", sBn: "ঢাকায় বাড়িতে অপেক্ষা করতে পারেন। প্রতিদিন আমরা পাশে থাকি।" },
];

export const HALAL = [
  { en: "Within your marriage", bn: "আপনাদের বিবাহের মধ্যেই", sEn: "Only the husband's sperm and the wife's eggs are used.", sBn: "শুধু স্বামীর শুক্রাণু ও স্ত্রীর ডিম্বাণু ব্যবহার করা হয়।" },
  { en: "No donors, no surrogacy", bn: "কোনো দাতা নয়, সারোগেসি নয়", sEn: "We never use donated eggs, sperm or embryos. Surrogacy is also illegal in China.", sBn: "দাতার ডিম্বাণু, শুক্রাণু বা ভ্রূণ কখনো নয়। চীনে সারোগেসিও নিষিদ্ধ।" },
  { en: "Only while the marriage continues", bn: "শুধু বিবাহ বহাল থাকাকালে", sEn: "Embryos are transferred only to the wife, during the marriage.", sBn: "ভ্রূণ শুধু স্ত্রীর গর্ভেই, বিবাহ বহাল থাকাকালে স্থাপন করা হয়।" },
  { en: "Proof of marriage", bn: "বিবাহের প্রমাণ", sEn: "Hospitals in China usually ask for your marriage certificate. We help translate it.", sBn: "চীনের হাসপাতাল সাধারণত বিবাহের সনদ চায়। আমরা অনুবাদে সাহায্য করি।" },
];

export const AGES = [
  { en: "Under 35", bn: "৩৫-এর নিচে", tEn: "This is when IVF works best. Chances are at their highest, and starting soon keeps them there.", tBn: "এই বয়সে আইভিএফ সবচেয়ে ভালো কাজ করে। সম্ভাবনা সবচেয়ে বেশি, দ্রুত শুরু করলে তা ধরে রাখা যায়।", level: 4 },
  { en: "35 to 37", bn: "৩৫ থেকে ৩৭", tEn: "Chances are still good, and timing starts to matter. Starting sooner helps.", tBn: "সম্ভাবনা এখনো ভালো, তবে সময় গুরুত্বপূর্ণ হতে শুরু করে। আগে শুরু করা ভালো।", level: 3 },
  { en: "38 to 40", bn: "৩৮ থেকে ৪০", tEn: "Chances are lower and more than one cycle may be needed. Doctors often suggest freezing embryos.", tBn: "সম্ভাবনা কম, একাধিক চক্র লাগতে পারে। ডাক্তাররা প্রায়ই ভ্রূণ সংরক্ষণের পরামর্শ দেন।", level: 2 },
  { en: "41 and over", bn: "৪১ ও তার বেশি", tEn: "Chances with your own eggs are much lower. We will tell you honestly before you spend anything. Donor eggs are not part of our program.", tBn: "নিজের ডিম্বাণুতে সম্ভাবনা অনেক কম। কিছু খরচের আগেই আমরা সৎভাবে জানাব। দাতার ডিম্বাণু আমাদের প্রোগ্রামে নেই।", level: 1 },
];

export const PROMISES = [
  { en: "We never promise a baby", bn: "আমরা কখনো সন্তানের প্রতিশ্রুতি দিই না", sEn: "Anyone who guarantees success is not being honest with you.", sBn: "যে কেউ নিশ্চয়তা দেয়, সে আপনার সঙ্গে সৎ নয়।" },
  { en: "The hospital's own numbers, for your age", bn: "হাসপাতালের নিজস্ব হিসাব, আপনার বয়সে", sEn: "Before you decide, we show you the partner hospital's published success rates for your age group.", sBn: "সিদ্ধান্তের আগে সহযোগী হাসপাতালের প্রকাশিত সাফল্যের হার আপনার বয়স অনুযায়ী দেখাই।" },
  { en: "Cost per cycle, in writing", bn: "প্রতি চক্রের খরচ, লিখিতভাবে", sEn: "Treatment, medicines, lab, stay and our fee, written down in Taka.", sBn: "চিকিৎসা, ওষুধ, ল্যাব, থাকা ও আমাদের ফি, টাকায় লেখা।" },
  { en: "If the first cycle does not work", bn: "প্রথম চক্রে না হলে", sEn: "Frozen embryos can often be used without repeating the injections. We explain every option and its cost.", sBn: "সংরক্ষিত ভ্রূণ প্রায়ই আবার ইনজেকশন ছাড়াই ব্যবহার করা যায়। প্রতিটি পথ ও খরচ বুঝিয়ে বলি।" },
];

export const TESTS = {
  her: [
    { en: "AMH blood test", bn: "এএমএইচ রক্তপরীক্ষা" },
    { en: "FSH, LH and estradiol (day 2 or 3 of the cycle)", bn: "এফএসএইচ, এলএইচ ও ইস্ট্রাডিওল (চক্রের ২য় বা ৩য় দিনে)" },
    { en: "Thyroid (TSH) and prolactin", bn: "থাইরয়েড (টিএসএইচ) ও প্রোল্যাকটিন" },
    { en: "Pelvic ultrasound", bn: "পেলভিক আল্ট্রাসাউন্ড" },
  ],
  him: [
    { en: "Semen analysis", bn: "সিমেন অ্যানালাইসিস" },
  ],
  both: [
    { en: "Blood group", bn: "রক্তের গ্রুপ" },
    { en: "Infection screening (hepatitis B and C, HIV, syphilis)", bn: "সংক্রমণ পরীক্ষা (হেপাটাইটিস বি ও সি, এইচআইভি, সিফিলিস)" },
    { en: "Passports and marriage certificate", bn: "পাসপোর্ট ও বিবাহের সনদ" },
  ],
};

export const WAIT_MESSAGES = [
  { day: 1, text: "আজ বিশ্রাম নিন। যেকোনো প্রশ্নে আমরা আছি।", en: "Rest today. We are here for any question." },
  { day: 6, text: "কেমন লাগছে? কোনো দুশ্চিন্তা হলে লিখুন, আমাদের দল উত্তর দেবে।", en: "How are you feeling? Write to us with any worry." },
  { day: 12, text: "আর মাত্র দুদিন। রক্তপরীক্ষার জন্য ঢাকার ল্যাব ঠিক করে রেখেছি।", en: "Just two more days. We have booked your blood test in Dhaka." },
];

/** Neutral WhatsApp message: the word infertility never appears in the chat. */
export function privateMessage(contact: "wife" | "husband" | "either", lang: "en" | "bn", extra?: string) {
  const who = {
    en: { wife: "the wife", husband: "the husband", either: "either of us" },
    bn: { wife: "স্ত্রীর সঙ্গে", husband: "স্বামীর সঙ্গে", either: "যেকোনো একজনের সঙ্গে" },
  };
  const base = lang === "bn"
    ? `আসসালামু আলাইকুম। আমি একটি গোপনীয় ফ্যামিলি কেয়ার পরামর্শ চাই। যোগাযোগ করবেন: ${who.bn[contact]}।`
    : `Assalamu alaikum. I would like a private Family Care consultation. Please contact ${who.en[contact]}.`;
  return `${base}${extra ? `\n${extra}` : ""}\nRef: FC`;
}
