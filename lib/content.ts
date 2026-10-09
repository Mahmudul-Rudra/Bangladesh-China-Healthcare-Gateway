import type { Bi } from "./site";
import type { IconName } from "@/components/Icons";
import type { ImageName } from "./images";

export type Stop = { en: string; bn: string; whereEn: string; whereBn: string; lineEn: string; lineBn: string; youEn: string; youBn: string; weEn: string; weBn: string };
export type ChainItem = { icon: IconName; en: string; bn: string; subEn: string; subBn: string };
export type ServiceStage = Bi & { code: string; items: Array<Bi & { pEn: string; pBn: string }> };
export type DayItem = { h: number; time: string; img: ImageName; en: string; bn: string; subEn: string; subBn: string };
export type FaqItem = { qEn: string; qBn: string; aEn: string; aBn: string };
export type Option = Bi & { value: string };

/* Site content in English and Bangla. Edit text here; pages read from these lists. */

export const STOPS: Stop[] = [
  {
    "en": "Send your reports",
    "bn": "রিপোর্ট পাঠান",
    "whereEn": "From home, on WhatsApp",
    "whereBn": "ঘরে বসে, হোয়াটসঅ্যাপে",
    "lineEn": "Photos of prescriptions, test results and scans are enough to begin.",
    "lineBn": "প্রেসক্রিপশন, পরীক্ষার রিপোর্ট আর স্ক্যানের ছবি পাঠালেই শুরু।",
    "youEn": "Send clear photos or PDFs of every report you have, old and new.",
    "youBn": "পুরোনো ও নতুন সব রিপোর্টের পরিষ্কার ছবি বা পিডিএফ পাঠান।",
    "weEn": "We organise them, check what hospitals will need, and tell you if anything is missing.",
    "weBn": "আমরা গুছিয়ে নিই, হাসপাতালের কী লাগবে মিলিয়ে দেখি, কিছু বাদ থাকলে জানাই।"
  },
  {
    "en": "A doctor's first opinion",
    "bn": "ডাক্তারের প্রাথমিক মতামত",
    "whereEn": "Online",
    "whereBn": "অনলাইনে",
    "lineEn": "Speak with a specialist in China by video before deciding anything.",
    "lineBn": "কোনো সিদ্ধান্তের আগে ভিডিও কলে চীনের বিশেষজ্ঞের সঙ্গে কথা বলুন।",
    "youEn": "Join the call from home with your family and ask everything you want to ask.",
    "youBn": "পরিবারসহ ঘরে বসেই কলে যুক্ত হন, যা জানতে চান জিজ্ঞেস করুন।",
    "weEn": "We book the specialist, arrange an interpreter, and send you a Bangla summary afterwards.",
    "weBn": "বিশেষজ্ঞের সময় নিই, দোভাষী রাখি, পরে বাংলায় সারসংক্ষেপ পাঠাই।"
  },
  {
    "en": "Treatment options",
    "bn": "চিকিৎসার সম্ভাব্য পথ",
    "whereEn": "Online",
    "whereBn": "অনলাইনে",
    "lineEn": "Hospitals propose the probable procedures. You see them side by side, in Bangla.",
    "lineBn": "হাসপাতালগুলো সম্ভাব্য চিকিৎসা প্রস্তাব করে। আপনি বাংলায় পাশাপাশি দেখেন।",
    "youEn": "Compare the options calmly and choose the hospital you trust.",
    "youBn": "শান্তভাবে তুলনা করুন, যে হাসপাতালে ভরসা পান সেটি বেছে নিন।",
    "weEn": "We share your case with suitable hospitals, only with your consent, and explain every answer.",
    "weBn": "আপনার সম্মতিতেই উপযুক্ত হাসপাতালে কেস পাঠাই এবং প্রতিটি উত্তর বুঝিয়ে বলি।"
  },
  {
    "en": "A clear cost estimate",
    "bn": "স্পষ্ট খরচের হিসাব",
    "whereEn": "Before you decide",
    "whereBn": "সিদ্ধান্তের আগেই",
    "lineEn": "Treatment, travel, stay, meals, guide and our fee, written down before you travel.",
    "lineBn": "চিকিৎসা, যাতায়াত, থাকা, খাবার, গাইড ও আমাদের ফি, সব লেখা থাকে যাত্রার আগেই।",
    "youEn": "Read the estimate, ask questions, and confirm only when it makes sense to you.",
    "youBn": "হিসাবটি পড়ুন, প্রশ্ন করুন, মনে ঠিক হলে তবেই নিশ্চিত করুন।",
    "weEn": "We list every cost line by line, in Taka, with nothing hidden.",
    "weBn": "প্রতিটি খরচ আলাদা লাইনে, টাকায় লিখে দিই। কিছুই লুকানো থাকে না।"
  },
  {
    "en": "Visa support",
    "bn": "ভিসা সহায়তা",
    "whereEn": "Dhaka",
    "whereBn": "ঢাকা",
    "lineEn": "Invitation letter, checklist and appointment, for the patient and companions.",
    "lineBn": "রোগী ও সঙ্গীদের জন্য আমন্ত্রণপত্র, চেকলিস্ট ও অ্যাপয়েন্টমেন্ট।",
    "youEn": "Prepare your passport and the documents on your personal checklist.",
    "youBn": "পাসপোর্ট আর আপনার চেকলিস্টের কাগজপত্র তৈরি রাখুন।",
    "weEn": "We get the hospital's invitation letter and check every name and date before you apply.",
    "weBn": "হাসপাতালের আমন্ত্রণপত্র আনি, আবেদনের আগে প্রতিটি নাম ও তারিখ মিলিয়ে দেখি।"
  },
  {
    "en": "Flights",
    "bn": "ফ্লাইট",
    "whereEn": "Dhaka to China",
    "whereBn": "ঢাকা থেকে চীন",
    "lineEn": "The right route and dates for your admission, with wheelchair help if needed.",
    "lineBn": "ভর্তির তারিখ মিলিয়ে সঠিক রুট, দরকার হলে হুইলচেয়ার সহায়তা।",
    "youEn": "Pack with our checklist and set up the mobile data plan we recommend.",
    "youBn": "আমাদের চেকলিস্ট মেনে গোছান, আমাদের বলা মোবাইল ডেটা প্ল্যান চালু করুন।",
    "weEn": "We arrange tickets through our travel partner and share a bilingual itinerary.",
    "weBn": "ট্রাভেল পার্টনারের মাধ্যমে টিকিট করি, দুই ভাষায় ভ্রমণসূচি দিই।"
  },
  {
    "en": "Arrival",
    "bn": "পৌঁছানো",
    "whereEn": "China",
    "whereBn": "চীন",
    "lineEn": "A Bangla-speaking guide meets you at the airport.",
    "lineBn": "বিমানবন্দরে বাংলাভাষী গাইড আপনাকে নিতে আসেন।",
    "youEn": "Look for your guide's name and photo, already sent to your phone.",
    "youBn": "আপনার ফোনে আগেই পাঠানো গাইডের নাম ও ছবি দেখে চিনে নিন।",
    "weEn": "Your guide takes you to your accommodation and walks you through the first day.",
    "weBn": "গাইড আপনাকে থাকার জায়গায় নিয়ে যান, প্রথম দিনটা সঙ্গে থেকে বুঝিয়ে দেন।"
  },
  {
    "en": "A Muslim-friendly stay",
    "bn": "মুসলিম-বান্ধব থাকা",
    "whereEn": "Near the hospital",
    "whereBn": "হাসপাতালের কাছেই",
    "lineEn": "Verified rooms close to the hospital, with space to pray and a kitchen.",
    "lineBn": "হাসপাতালের কাছে যাচাই করা ঘর, নামাজের জায়গা ও রান্নাঘরসহ।",
    "youEn": "Choose from the options we have inspected, with photos.",
    "youBn": "আমাদের দেখে আসা জায়গাগুলো ছবিসহ দেখে বেছে নিন।",
    "weEn": "Our team checks each place in person: distance, qibla, mosque nearby, cleanliness.",
    "weBn": "আমাদের দল নিজে গিয়ে দেখে: দূরত্ব, কিবলা, কাছের মসজিদ, পরিচ্ছন্নতা।"
  },
  {
    "en": "Treatment",
    "bn": "চিকিৎসা",
    "whereEn": "Hospital",
    "whereBn": "হাসপাতাল",
    "lineEn": "Your guide stays with you through admission, rounds and procedures.",
    "lineBn": "ভর্তি, রাউন্ড ও চিকিৎসার সময় গাইড আপনার পাশে থাকেন।",
    "youEn": "Focus on getting better. Ask your guide whenever something is unclear.",
    "youBn": "সুস্থ হওয়ায় মন দিন। কিছু অস্পষ্ট লাগলেই গাইডকে বলুন।",
    "weEn": "We coordinate with the hospital, arrange interpreters, and update your family at home.",
    "weBn": "হাসপাতালের সঙ্গে সমন্বয় করি, দোভাষী রাখি, দেশে পরিবারকে খবর দিই।"
  },
  {
    "en": "Halal meals every day",
    "bn": "প্রতিদিন হালাল খাবার",
    "whereEn": "To the ward",
    "whereBn": "ওয়ার্ডে পৌঁছে",
    "lineEn": "Halal food delivered daily, prepared to the doctor's diet.",
    "lineBn": "প্রতিদিন হালাল খাবার, ডাক্তারের দেওয়া ডায়েট মেনে রান্না।",
    "youEn": "Tell us your tastes. Your doctor's diet comes first.",
    "youBn": "আপনার পছন্দ জানান। তবে ডাক্তারের ডায়েট সবার আগে।",
    "weEn": "We work with Muslim restaurants and cooks near the hospital and confirm each delivery.",
    "weBn": "হাসপাতালের কাছের মুসলিম রেস্তোরাঁ ও রাঁধুনির সঙ্গে কাজ করি, প্রতিটি ডেলিভারি নিশ্চিত করি।"
  },
  {
    "en": "Coming home",
    "bn": "দেশে ফেরা",
    "whereEn": "China to Dhaka",
    "whereBn": "চীন থেকে ঢাকা",
    "lineEn": "Discharge papers in Bangla, fit-to-fly check, and pickup in Dhaka.",
    "lineBn": "বাংলায় ছাড়পত্র, ভ্রমণের উপযুক্ততা যাচাই, ঢাকায় পিকআপ।",
    "youEn": "Keep your discharge summary and medicines together for the flight.",
    "youBn": "ছাড়পত্র আর ওষুধ একসঙ্গে হাতের কাছে রাখুন।",
    "weEn": "We translate your discharge papers and arrange help at both airports.",
    "weBn": "ছাড়পত্র অনুবাদ করি, দুই বিমানবন্দরেই সহায়তার ব্যবস্থা করি।"
  },
  {
    "en": "Follow-up care",
    "bn": "ফলো-আপ সেবা",
    "whereEn": "Back home",
    "whereBn": "দেশে ফিরে",
    "lineEn": "Medicine reminders, check-ins and video follow-ups with your doctor in China.",
    "lineBn": "ওষুধের রিমাইন্ডার, নিয়মিত খোঁজ, আর চীনের ডাক্তারের সঙ্গে ভিডিও ফলো-আপ।",
    "youEn": "Answer our weekly check-in and tell us at once if something feels wrong.",
    "youBn": "সাপ্তাহিক খোঁজের উত্তর দিন, খারাপ লাগলে সঙ্গে সঙ্গে জানান।",
    "weEn": "We schedule follow-ups and share your records with your doctor in Bangladesh, with consent.",
    "weBn": "ফলো-আপের সময় ঠিক করি, সম্মতিতে আপনার রেকর্ড দেশের ডাক্তারকে দিই।"
  }
];

export const CHAIN: ChainItem[] = [
  {
    "icon": "report",
    "en": "Medical reports collected",
    "bn": "মেডিকেল রিপোর্ট সংগ্রহ",
    "subEn": "Organised and translated",
    "subBn": "গুছিয়ে ও অনুবাদ করে"
  },
  {
    "icon": "doctor",
    "en": "Online doctor advice",
    "bn": "অনলাইনে ডাক্তারের পরামর্শ",
    "subEn": "Video consultation with an interpreter",
    "subBn": "দোভাষীসহ ভিডিও পরামর্শ"
  },
  {
    "icon": "path",
    "en": "Probable treatment identified",
    "bn": "সম্ভাব্য চিকিৎসা নির্ধারণ",
    "subEn": "Hospital options explained in Bangla",
    "subBn": "হাসপাতালের প্রস্তাব বাংলায় ব্যাখ্যা"
  },
  {
    "icon": "cost",
    "en": "Cost estimate prepared",
    "bn": "খরচের হিসাব প্রস্তুত",
    "subEn": "Every line written down in Taka",
    "subBn": "প্রতিটি খরচ টাকায় লেখা"
  },
  {
    "icon": "visa",
    "en": "Visa support",
    "bn": "ভিসা সহায়তা",
    "subEn": "For the patient and companions",
    "subBn": "রোগী ও সঙ্গীদের জন্য"
  },
  {
    "icon": "plane",
    "en": "Flight assistance",
    "bn": "ফ্লাইট সহায়তা",
    "subEn": "Route, dates and airport help",
    "subBn": "রুট, তারিখ ও বিমানবন্দরে সহায়তা"
  },
  {
    "icon": "guide",
    "en": "Bengali-speaking local guide",
    "bn": "বাংলাভাষী স্থানীয় গাইড",
    "subEn": "Beside you from arrival to departure",
    "subBn": "পৌঁছানো থেকে ফেরা পর্যন্ত পাশে"
  },
  {
    "icon": "home",
    "en": "Muslim-friendly accommodation",
    "bn": "মুসলিম-বান্ধব থাকার ব্যবস্থা",
    "subEn": "Inspected by our team in person",
    "subBn": "আমাদের দল নিজে গিয়ে যাচাই করে"
  },
  {
    "icon": "halal",
    "en": "Halal food support",
    "bn": "হালাল খাবারের ব্যবস্থা",
    "subEn": "Daily, following the doctor's diet",
    "subBn": "প্রতিদিন, ডাক্তারের ডায়েট মেনে"
  },
  {
    "icon": "ground",
    "en": "All support on the ground",
    "bn": "চীনে সব ধরনের সহায়তা",
    "subEn": "Transport, money, phone, errands",
    "subBn": "যাতায়াত, টাকা, ফোন, দরকারি কাজ"
  },
  {
    "icon": "hospital",
    "en": "Coordination with hospitals",
    "bn": "হাসপাতালের সঙ্গে সমন্বয়",
    "subEn": "Appointments, reports, bills",
    "subBn": "অ্যাপয়েন্টমেন্ট, রিপোর্ট, বিল"
  },
  {
    "icon": "follow",
    "en": "Follow-up care at home",
    "bn": "দেশে ফিরে ফলো-আপ",
    "subEn": "Reminders and video follow-ups",
    "subBn": "রিমাইন্ডার ও ভিডিও ফলো-আপ"
  }
];

export const SERVICE_STAGES: ServiceStage[] = [
  {
    "en": "Before you travel",
    "bn": "যাত্রার আগে",
    "code": "DHAKA",
    "items": [
      {
        "en": "Medical report review",
        "bn": "মেডিকেল রিপোর্ট পর্যালোচনা",
        "pEn": "Send photos or PDFs on WhatsApp. We organise them into one clear case file in English and Chinese, reviewed by a doctor, and tell you what is missing.",
        "pBn": "হোয়াটসঅ্যাপে ছবি বা পিডিএফ পাঠান। আমরা ইংরেজি ও চীনা ভাষায় একটি পরিষ্কার কেস ফাইল বানাই, ডাক্তার যাচাই করেন, আর কী বাকি আছে জানাই।"
      },
      {
        "en": "Online doctor consultation",
        "bn": "অনলাইনে ডাক্তারের পরামর্শ",
        "pEn": "A video call with a specialist in China, with an interpreter and our coordinator on the line. You receive a Bangla summary afterwards.",
        "pBn": "চীনের বিশেষজ্ঞের সঙ্গে ভিডিও কল, দোভাষী ও আমাদের সমন্বয়কারী সঙ্গে থাকেন। পরে বাংলায় সারসংক্ষেপ পান।"
      },
      {
        "en": "Treatment options and hospitals",
        "bn": "চিকিৎসার পথ ও হাসপাতাল",
        "pEn": "Suitable hospitals review your case and propose probable procedures, dates and costs. We put them side by side and explain each in Bangla.",
        "pBn": "উপযুক্ত হাসপাতাল কেস দেখে সম্ভাব্য চিকিৎসা, তারিখ ও খরচ প্রস্তাব করে। আমরা পাশাপাশি রেখে বাংলায় বুঝিয়ে দিই।"
      },
      {
        "en": "Cost estimate",
        "bn": "খরচের হিসাব",
        "pEn": "One written estimate in Taka covering treatment, flights, stay, meals, guide, visa and our service fee.",
        "pBn": "টাকায় একটি লিখিত হিসাব: চিকিৎসা, ফ্লাইট, থাকা, খাবার, গাইড, ভিসা আর আমাদের সেবা ফি।"
      }
    ]
  },
  {
    "en": "The journey",
    "bn": "যাত্রা",
    "code": "DAC → CHINA",
    "items": [
      {
        "en": "Visa support",
        "bn": "ভিসা সহায়তা",
        "pEn": "Hospital invitation letter, a personal checklist for the patient and each companion, and a check of every name and date before you apply.",
        "pBn": "হাসপাতালের আমন্ত্রণপত্র, রোগী ও প্রত্যেক সঙ্গীর জন্য আলাদা চেকলিস্ট, আর আবেদনের আগে প্রতিটি নাম ও তারিখ মিলিয়ে দেখা।"
      },
      {
        "en": "Flight assistance",
        "bn": "ফ্লাইট সহায়তা",
        "pEn": "The right route and dates for your admission, tickets through our travel partner, and wheelchair help at the airport when needed.",
        "pBn": "ভর্তির সঙ্গে মিলিয়ে সঠিক রুট ও তারিখ, ট্রাভেল পার্টনারের মাধ্যমে টিকিট, দরকারে বিমানবন্দরে হুইলচেয়ার।"
      },
      {
        "en": "Muslim-friendly accommodation",
        "bn": "মুসলিম-বান্ধব থাকার ব্যবস্থা",
        "pEn": "Hotels and apartments near the hospital, each inspected in person by our team, shown to you with photos before you choose.",
        "pBn": "হাসপাতালের কাছে হোটেল ও অ্যাপার্টমেন্ট, আমাদের দল নিজে যাচাই করে, বেছে নেওয়ার আগে ছবিসহ দেখাই।"
      },
      {
        "en": "Pre-departure briefing",
        "bn": "যাত্রার আগে প্রস্তুতি",
        "pEn": "A Bangla checklist for packing, medicines, a mobile data plan that keeps WhatsApp working in China, and how money will be handled.",
        "pBn": "বাংলায় চেকলিস্ট: কী গোছাবেন, ওষুধ, চীনে হোয়াটসঅ্যাপ চালু রাখার মোবাইল ডেটা প্ল্যান, আর টাকা কীভাবে চলবে।"
      }
    ]
  },
  {
    "en": "In China",
    "bn": "চীনে",
    "code": "ON THE GROUND",
    "items": [
      {
        "en": "Bengali-speaking local guide",
        "bn": "বাংলাভাষী স্থানীয় গাইড",
        "pEn": "With you from the airport onwards: admission, rounds, pharmacy, transport and daily errands. A female guide can be arranged for female patients.",
        "pBn": "বিমানবন্দর থেকেই সঙ্গে: ভর্তি, রাউন্ড, ফার্মেসি, যাতায়াত আর দৈনন্দিন কাজ। নারী রোগীর জন্য নারী গাইডের ব্যবস্থা করা যায়।"
      },
      {
        "en": "Halal food support",
        "bn": "হালাল খাবারের ব্যবস্থা",
        "pEn": "Daily halal meals delivered to the ward or your room, prepared to the doctor's diet: diabetic, low-salt, soft food and more.",
        "pBn": "প্রতিদিন ওয়ার্ডে বা ঘরে হালাল খাবার, ডাক্তারের ডায়েট মেনে: ডায়াবেটিক, কম লবণ, নরম খাবার ইত্যাদি।"
      },
      {
        "en": "Hospital coordination",
        "bn": "হাসপাতালের সঙ্গে সমন্বয়",
        "pEn": "Appointments, interpreters for important conversations, reports, payments and bills, handled with the hospital's international department.",
        "pBn": "অ্যাপয়েন্টমেন্ট, গুরুত্বপূর্ণ আলাপে দোভাষী, রিপোর্ট, পেমেন্ট ও বিল, হাসপাতালের আন্তর্জাতিক বিভাগের সঙ্গে সমন্বয় করে।"
      },
      {
        "en": "Family updates and emergency support",
        "bn": "পরিবারকে খবর ও জরুরি সহায়তা",
        "pEn": "Regular updates in Bangla to your family at home, and a team that answers at any hour if something goes wrong.",
        "pBn": "দেশে পরিবারকে নিয়মিত বাংলায় খবর, আর কোনো সমস্যা হলে যেকোনো সময় সাড়া দেওয়ার দল।"
      }
    ]
  },
  {
    "en": "After you return",
    "bn": "দেশে ফেরার পর",
    "code": "HOME AGAIN",
    "items": [
      {
        "en": "Follow-up care",
        "bn": "ফলো-আপ সেবা",
        "pEn": "Medicine reminders, weekly check-ins, and video follow-ups with your doctor in China. Worrying answers reach a person immediately.",
        "pBn": "ওষুধের রিমাইন্ডার, সাপ্তাহিক খোঁজ, চীনের ডাক্তারের সঙ্গে ভিডিও ফলো-আপ। দুশ্চিন্তার কোনো উত্তর সঙ্গে সঙ্গে মানুষের কাছে যায়।"
      },
      {
        "en": "Your doctor at home, kept informed",
        "bn": "দেশের ডাক্তারকে জানানো",
        "pEn": "With your consent, your doctor in Bangladesh receives your treatment records in English, so care continues smoothly.",
        "pBn": "আপনার সম্মতিতে দেশের ডাক্তার ইংরেজিতে চিকিৎসার রেকর্ড পান, যাতে চিকিৎসা নির্বিঘ্নে চলে।"
      },
      {
        "en": "Medicines continued",
        "bn": "ওষুধ চালিয়ে যাওয়া",
        "pEn": "Medicines prescribed in China are matched to equivalents available in Bangladesh, or refills are arranged.",
        "pBn": "চীনে দেওয়া ওষুধের সমতুল্য ওষুধ বাংলাদেশে খুঁজে দিই, না পেলে রিফিলের ব্যবস্থা করি।"
      }
    ]
  }
];

export const TREATMENTS: Bi[] = [
  {
    "en": "Cancer care",
    "bn": "ক্যান্সার চিকিৎসা"
  },
  {
    "en": "Heart and cardiac surgery",
    "bn": "হৃদরোগ ও হার্ট সার্জারি"
  },
  {
    "en": "Joint replacement and orthopaedics",
    "bn": "জয়েন্ট প্রতিস্থাপন ও অর্থোপেডিক্স"
  },
  {
    "en": "Brain, spine and nerves",
    "bn": "মস্তিষ্ক, মেরুদণ্ড ও স্নায়ু"
  },
  {
    "en": "Kidney and urology",
    "bn": "কিডনি ও ইউরোলজি"
  },
  {
    "en": "Rehabilitation",
    "bn": "পুনর্বাসন"
  },
  {
    "en": "Eye care",
    "bn": "চোখের চিকিৎসা"
  },
  {
    "en": "Health check-ups",
    "bn": "স্বাস্থ্য পরীক্ষা"
  }
];

export const DAY: DayItem[] = [
  {
    "h": 8.5,
    "time": "08:30",
    "img": "day-0830",
    "en": "Your guide arrives",
    "bn": "গাইড চলে আসেন",
    "subEn": "Together to the hospital, by car or on foot.",
    "subBn": "একসঙ্গে হাসপাতালে, গাড়িতে বা হেঁটে।"
  },
  {
    "h": 9.5,
    "time": "09:30",
    "img": "day-0930",
    "en": "Doctor's rounds",
    "bn": "ডাক্তারের রাউন্ড",
    "subEn": "An interpreter for every important conversation.",
    "subBn": "প্রতিটি গুরুত্বপূর্ণ আলাপে দোভাষী।"
  },
  {
    "h": 12.5,
    "time": "12:30",
    "img": "day-1230",
    "en": "Halal lunch on the ward",
    "bn": "ওয়ার্ডে হালাল দুপুরের খাবার",
    "subEn": "Cooked to the doctor's diet and delivered warm.",
    "subBn": "ডাক্তারের ডায়েটে রান্না, গরম অবস্থায় পৌঁছানো।"
  },
  {
    "h": 13.5,
    "time": "13:30",
    "img": "day-1330",
    "en": "Medicines and paperwork",
    "bn": "ওষুধ ও কাগজপত্র",
    "subEn": "Your guide collects your medicines and handles the paperwork while you rest.",
    "subBn": "আপনি বিশ্রাম নেন, গাইড ফার্মেসি থেকে ওষুধ আনেন ও কাগজপত্র সামলান।"
  },
  {
    "h": 17.0,
    "time": "17:00",
    "img": "day-1700",
    "en": "Call home",
    "bn": "বাড়িতে ফোন",
    "subEn": "It is 15:00 in Dhaka, a good time to talk.",
    "subBn": "ঢাকায় তখন বিকেল ৩টা, কথা বলার ভালো সময়।"
  },
  {
    "h": 19.0,
    "time": "19:00",
    "img": "day-1900",
    "en": "Dinner, and an update to the family",
    "bn": "রাতের খাবার, পরিবারকে খবর",
    "subEn": "A short note in Bangla goes to everyone at home.",
    "subBn": "বাড়ির সবার কাছে বাংলায় ছোট একটি বার্তা যায়।"
  },
  {
    "h": 21.0,
    "time": "21:00",
    "img": "day-2100",
    "en": "A quiet night",
    "bn": "শান্ত রাত",
    "subEn": "Rest well. Our team is reachable through the night.",
    "subBn": "ভালো করে বিশ্রাম নিন। রাতেও আমাদের দলকে পাওয়া যায়।"
  }
];

export const STAY_CHECKS: Bi[] = [
  {
    "en": "Walking distance to the hospital",
    "bn": "হাসপাতালে হেঁটে যাওয়ার দূরত্বে"
  },
  {
    "en": "Qibla direction marked",
    "bn": "কিবলার দিক চিহ্নিত"
  },
  {
    "en": "Space to pray",
    "bn": "নামাজের জায়গা"
  },
  {
    "en": "A mosque nearby",
    "bn": "কাছেই মসজিদ"
  },
  {
    "en": "Kitchen for the family",
    "bn": "পরিবারের জন্য রান্নাঘর"
  },
  {
    "en": "Family rooms",
    "bn": "পারিবারিক ঘর"
  },
  {
    "en": "Options for women travelling together",
    "bn": "একসঙ্গে ভ্রমণকারী নারীদের জন্য ব্যবস্থা"
  },
  {
    "en": "Inspected in person, with photos",
    "bn": "নিজে গিয়ে যাচাই, ছবিসহ"
  }
];

export const FAQ: FaqItem[] = [
  {
    "qEn": "Are you a hospital?",
    "qBn": "আপনারা কি হাসপাতাল?",
    "aEn": "No. We are a patient facilitation service based in Bangladesh. We connect you with hospitals in China and take care of everything around your treatment. Diagnosis and treatment are decided by licensed doctors.",
    "aBn": "না। আমরা বাংলাদেশভিত্তিক রোগী সহায়তা প্রতিষ্ঠান। চীনের হাসপাতালের সঙ্গে আপনাকে যুক্ত করি এবং চিকিৎসার চারপাশের সব কাজ সামলাই। রোগ নির্ণয় ও চিকিৎসা ঠিক করেন নিবন্ধিত চিকিৎসকেরা।"
  },
  {
    "qEn": "How do I start?",
    "qBn": "কীভাবে শুরু করব?",
    "aEn": "Send photos of your medical reports on WhatsApp, or fill in the contact form. We reply in Bangla and explain the next step. There is no obligation.",
    "aBn": "হোয়াটসঅ্যাপে রিপোর্টের ছবি পাঠান, অথবা যোগাযোগ ফর্ম পূরণ করুন। আমরা বাংলায় উত্তর দিয়ে পরের ধাপ বুঝিয়ে বলি। কোনো বাধ্যবাধকতা নেই।"
  },
  {
    "qEn": "How much will it cost?",
    "qBn": "খরচ কত হবে?",
    "aEn": "It depends on the treatment, the hospital, the city and the length of stay. Before you travel, you receive one written estimate in Taka that lists treatment, flights, stay, meals, guide, visa and our service fee separately.",
    "aBn": "চিকিৎসা, হাসপাতাল, শহর ও থাকার সময়ের ওপর নির্ভর করে। যাত্রার আগেই টাকায় একটি লিখিত হিসাব পাবেন, যেখানে চিকিৎসা, ফ্লাইট, থাকা, খাবার, গাইড, ভিসা ও আমাদের ফি আলাদা করে লেখা।"
  },
  {
    "qEn": "Can family members travel with the patient?",
    "qBn": "রোগীর সঙ্গে কি পরিবারের কেউ যেতে পারবেন?",
    "aEn": "Yes. We arrange visa documents, flights and accommodation for companions too, and include them in the estimate.",
    "aBn": "হ্যাঁ। সঙ্গীদের ভিসার কাগজ, ফ্লাইট ও থাকার ব্যবস্থাও আমরা করি এবং হিসাবে যুক্ত করি।"
  },
  {
    "qEn": "We do not speak Chinese or English. Is that a problem?",
    "qBn": "আমরা চীনা বা ইংরেজি জানি না। সমস্যা হবে?",
    "aEn": "No. A Bangla-speaking guide is with you in China, and an interpreter joins every important conversation with doctors.",
    "aBn": "না। চীনে বাংলাভাষী গাইড আপনার সঙ্গে থাকেন, আর ডাক্তারের সঙ্গে প্রতিটি গুরুত্বপূর্ণ আলাপে দোভাষী থাকেন।"
  },
  {
    "qEn": "Will we get halal food?",
    "qBn": "হালাল খাবার পাব তো?",
    "aEn": "Yes. Halal meals are delivered daily to the ward or your accommodation, prepared to the doctor's diet.",
    "aBn": "হ্যাঁ। প্রতিদিন ওয়ার্ডে বা থাকার জায়গায় হালাল খাবার পৌঁছে দেওয়া হয়, ডাক্তারের ডায়েট মেনে।"
  },
  {
    "qEn": "How long does the visa take?",
    "qBn": "ভিসা পেতে কত সময় লাগে?",
    "aEn": "It varies. We begin as soon as the hospital issues the invitation letter, check your documents before you apply, and keep you updated at every stage.",
    "aBn": "সময় ভিন্ন হয়। হাসপাতাল আমন্ত্রণপত্র দিলেই কাজ শুরু করি, আবেদনের আগে কাগজ যাচাই করি, প্রতিটি ধাপে আপনাকে জানাই।"
  },
  {
    "qEn": "Who sees my medical reports?",
    "qBn": "আমার রিপোর্ট কারা দেখতে পায়?",
    "aEn": "Our team and the hospitals you agree to. Hospitals receive your case without your name until you choose one of them.",
    "aBn": "আমাদের দল এবং আপনার সম্মতি দেওয়া হাসপাতাল। আপনি বেছে না নেওয়া পর্যন্ত হাসপাতাল আপনার নাম ছাড়াই কেস দেখে।"
  },
  {
    "qEn": "What happens after we come home?",
    "qBn": "দেশে ফেরার পর কী হবে?",
    "aEn": "We translate your discharge papers into Bangla, send medicine reminders, check in every week and arrange video follow-ups with your doctor in China.",
    "aBn": "ছাড়পত্র বাংলায় অনুবাদ করি, ওষুধের রিমাইন্ডার পাঠাই, প্রতি সপ্তাহে খোঁজ নিই এবং চীনের ডাক্তারের সঙ্গে ভিডিও ফলো-আপের ব্যবস্থা করি।"
  }
];

export const TREATMENT_OPTIONS: Option[] = [
  {
    "value": "",
    "en": "Choose one",
    "bn": "একটি বেছে নিন"
  },
  {
    "value": "Cancer care",
    "en": "Cancer care",
    "bn": "ক্যান্সার চিকিৎসা"
  },
  {
    "value": "Heart",
    "en": "Heart and cardiac surgery",
    "bn": "হৃদরোগ ও হার্ট সার্জারি"
  },
  {
    "value": "Orthopaedics",
    "en": "Joint replacement and orthopaedics",
    "bn": "জয়েন্ট ও অর্থোপেডিক্স"
  },
  {
    "value": "Neuro",
    "en": "Brain, spine and nerves",
    "bn": "মস্তিষ্ক, মেরুদণ্ড ও স্নায়ু"
  },
  {
    "value": "Kidney",
    "en": "Kidney and urology",
    "bn": "কিডনি ও ইউরোলজি"
  },
  {
    "value": "Check-up",
    "en": "Health check-up",
    "bn": "স্বাস্থ্য পরীক্ষা"
  },
  {
    "value": "Not sure",
    "en": "Not sure yet",
    "bn": "এখনো নিশ্চিত নই"
  }
];

