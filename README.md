# Bangladesh – China Healthcare Gateway (website)

Next.js 16 + TypeScript. Six pages, English and Bangla, built as a static site.

## Run it on your computer

Needs Node.js 20 or newer (check with `node -v`).

```bash
npm install        # first time only
npm run dev        # open http://localhost:3000
```

Edits to any file show up instantly in the browser.

## Build for hosting

```bash
npm run build      # creates the finished website in the /out folder
npm start          # preview the built site at http://localhost:3000
```

## Put it online

- **Vercel:** push this folder to GitHub, then import the repo at vercel.com. It builds automatically.
- **Netlify:** build command `npm run build`, publish directory `out`. Or drag the `out` folder onto app.netlify.com/drop.
- **Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **cPanel:** run `npm run build`, then upload everything inside `out` to `public_html`.

## Turn on the email form (one time)

After the site is live, send one test from the Contact page with **Send by email**.
FormSubmit emails an activation link to the address in `lib/site.ts`. Click it once; every message after that arrives normally.

## Photos

The optimised photos live in `public/img` (WebP, 800px and 1600px versions of each).
To replace a photo, for example when the client sends a real one:

1. Create a folder called `images-src` in the project root (if it isn't there).
2. Put the new JPG or PNG in it with the **same file name** as the photo it replaces, e.g. `arch-guide.png`.
3. Run `npm run images`. The new WebP versions overwrite the old ones in `public/img`.

Photo names and their descriptions (English and Bangla, for screen readers) are listed in `lib/images.ts`.

## Where things live

| What | File |
| --- | --- |
| WhatsApp number, email, menu links | `lib/site.ts` |
| All text in English and Bangla (journey stops, services, FAQ, day in China) | `lib/content.ts` |
| Colours (light "Dawn over Dianchi" at the top, dark below it), fonts, spacing, responsive rules | `app/globals.css` |
| Theme switch (horizon dial) | `components/ThemeDial.tsx` |
| Pages | `app/page.tsx`, `app/services/`, `app/journey/`, `app/life-in-china/`, `app/prayer/`, `app/family-care/`, `app/about/`, `app/contact/` |
| Header, footer, WhatsApp button | `components/Header.tsx`, `Footer.tsx`, `WhatsAppFloat.tsx` |
| Scroll-drawn journey line and "you are here" dial | `components/Journey.tsx` |
| Hero map | `components/HeroMap.tsx` |
| Contact form (boarding pass) | `components/ContactPass.tsx` |
| Hero photo inside the moon gate | `components/HeroMap.tsx` |
| Full-screen "step through the gate" scroll | `components/GatePassage.tsx` |
| Which photo or illustration each journey stop shows | `components/StopMedia.tsx` |
| The five drawn illustrations (options, receipt, passport, plane window, phone) | `components/Illustrations.tsx` |
| Day in Kunming (film strip, live sky, twin clocks) | `components/DayStrip.tsx` |
| Prayer page | `app/prayer/page.tsx`, live dial and qibla in `components/PrayerLive.tsx` |
| Prayer time and qibla calculations (Karachi method, Hanafi/Shafi'i Asr) | `lib/prayer.ts` |
| Cities inside their Chinese names | `components/CityGlyphs.tsx` |
| Fertility program page (Shapla), at `/family-care/` | `app/family-care/page.tsx` |
| Fertility program text (paths, halal, ages, tests, messages) | `lib/fertility.ts` |
| Fertility program interactive parts (two paths, privacy demo, planner, checklist, bloom) | `components/fert/` |

Bangla text uses the `<T en="..." bn="..." />` component. The chosen language is remembered in the visitor's browser.
