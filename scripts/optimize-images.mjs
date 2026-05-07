import sharp from "sharp";
import { existsSync } from "fs";
import { join } from "path";

const publicDir = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const jobs = [
  // Hero/Avatar (display 165px, 2x retina = 330px)
  { src: "kavindu-hero.png",          out: "kavindu-hero.webp",          width: 330, quality: 85 },
  { src: "kavindu-hero-light.png",    out: "kavindu-hero-light.webp",    width: 330, quality: 85 },
  { src: "kavindu-hero-optional.png", out: "kavindu-hero-optional.webp", width: 330, quality: 85 },

  // Work / Education / Cert logos (display 34-53px, 2x = 80px max)
  { src: "horizon-campus-logo.png",   out: "horizon-campus-logo.webp",   width: 80,  quality: 85 },
  { src: "uom-logo.png",              out: "uom-logo.webp",              width: 80,  quality: 85 },
  { src: "mtf-logo.png",              out: "mtf-logo.webp",              width: 80,  quality: 85 },
  { src: "fiverr-logo.png",           out: "fiverr-logo.webp",           width: 80,  quality: 85 },
  { src: "group-1.png",               out: "group-1.webp",               width: 80,  quality: 85 },
  { src: "great-learning-logo.png",   out: "great-learning-logo.webp",   width: 80,  quality: 85 },
  { src: "udemy-logo.png",            out: "udemy-logo.webp",            width: 80,  quality: 85 },

  // Project card images (display max 634px wide, h-48 = 192px)
  { src: "Nextrimo.jpg",    out: "Nextrimo.webp",    width: 634, quality: 80 },
  { src: "cima-cleaners.jpg", out: "cima-cleaners.webp", width: 634, quality: 80 },
  { src: "group-48.png",    out: "group-48.webp",    width: 634, quality: 80 },
  { src: "group-48-1.jpg",  out: "group-48-1.webp",  width: 634, quality: 80 },
  { src: "group-3-2.jpg",   out: "group-3-2.webp",   width: 634, quality: 80 },
  { src: "group-3-3.jpg",   out: "group-3-3.webp",   width: 634, quality: 80 },
  { src: "group-3-4-1.jpg", out: "group-3-4-1.webp", width: 634, quality: 80 },
  { src: "group-3-5.jpg",   out: "group-3-5.webp",   width: 634, quality: 80 },
  { src: "group-3-6.jpg",   out: "group-3-6.webp",   width: 634, quality: 80 },
  { src: "group-3-7.jpg",   out: "group-3-7.webp",   width: 634, quality: 80 },
  { src: "group-52-1.jpg",  out: "group-52-1.webp",  width: 634, quality: 80 },
  { src: "group-53.jpg",    out: "group-53.webp",    width: 634, quality: 80 },
];

let totalSaved = 0;

for (const { src, out, width, quality } of jobs) {
  const srcPath = join(publicDir, src);
  const outPath = join(publicDir, out);

  if (!existsSync(srcPath)) {
    console.log(`  SKIP  ${src} (not found)`);
    continue;
  }

  const meta = await sharp(srcPath).metadata();
  const originalSize = (await import("fs")).statSync(srcPath).size;

  await sharp(srcPath)
    .resize(width, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality })
    .toFile(outPath);

  const newSize = (await import("fs")).statSync(outPath).size;
  const saved = originalSize - newSize;
  totalSaved += saved;

  const pct = ((saved / originalSize) * 100).toFixed(0);
  console.log(`  ✓  ${src.padEnd(30)} ${(originalSize/1024).toFixed(0).padStart(5)}KB  →  ${out.padEnd(30)} ${(newSize/1024).toFixed(0).padStart(4)}KB  (saved ${pct}%)`);
}

console.log(`\nTotal saved: ${(totalSaved / 1024).toFixed(0)} KB`);
