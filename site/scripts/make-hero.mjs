// Pre-sizes the hero photo: node scripts/make-hero.mjs (output is committed).
import sharp from "sharp";

const SRC = "public/images/machine-shop.jpg";
const WIDTHS = [1280, 1920, 2400];

for (const w of WIDTHS) {
  const img = sharp(SRC).resize({ width: w, withoutEnlargement: true });
  await img.clone().avif({ quality: 50 }).toFile(`public/images/machine-shop-${w}.avif`);
  await img.clone().webp({ quality: 72 }).toFile(`public/images/machine-shop-${w}.webp`);
  await img.clone().jpeg({ quality: 75, progressive: true }).toFile(`public/images/machine-shop-${w}.jpg`);
}
