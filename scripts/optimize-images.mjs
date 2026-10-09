// Converts every image in /images-src into compressed WebP files in /public/img (two widths each).
// Usage: put a JPG/PNG with the same file name into /images-src, then run `npm run images`.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const OUT = "public/img";
const WIDTHS = [800, 1600];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
for (const f of files) {
  const name = path.parse(f).name;
  for (const w of WIDTHS) {
    await sharp(path.join(SRC, f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  console.log("done", name);
}
