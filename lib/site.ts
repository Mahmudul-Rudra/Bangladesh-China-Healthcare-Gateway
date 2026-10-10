/** Contact details and links used across the whole site. Change them here only. */
export const SITE = {
  nameEn: "Bangladesh – China Healthcare Gateway",
  whatsappNumber: "8801645252756", // digits only, with country code
  whatsappDisplay: "+880 1645-252756",
  email: "info@bevsbd.com",
  /** FormSubmit sends form entries to the email above. The first submission asks the inbox to activate it once. */
  formEndpoint: "https://formsubmit.co/ajax/info@bevsbd.com",
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type Bi = { en: string; bn: string };

export const NAV: Array<{ href: string; accent?: boolean } & Bi> = [
  { href: "/", en: "Home", bn: "হোম" },
  { href: "/services/", en: "Services", bn: "সেবাসমূহ" },
  { href: "/journey/", en: "The journey", bn: "যাত্রাপথ" },
  { href: "/life-in-china/", en: "Life in China", bn: "চীনে থাকা" },
  { href: "/prayer/", en: "Prayer", bn: "নামাজ" },
  { href: "/family-care/", en: "Fertility", bn: "সন্তান-আশা", accent: true },
  { href: "/about/", en: "About & FAQ", bn: "আমাদের কথা" },
  { href: "/contact/", en: "Contact", bn: "যোগাযোগ" },
];
