import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const SRC = join(homedir(), "Downloads", "drum-extract");
const OUT = join(process.cwd(), "public", "images", "drumming");
mkdirSync(OUT, { recursive: true });

// Curated selection of the best REAL bucket-drumming photos.
// hero = wide landscape; gallery = square-ish; about = detail.
const jobs = [
  // Wide hero (instructor mid-action, sticks raised, full circle) — 1000px native
  { in: "IMG_20241015_173944.jpg", out: "hero-wide.jpg", w: 1600, h: 900, fit: "cover" },
  // OG / social card (same energetic shot, 1200x630)
  { in: "IMG_20241015_173944.jpg", out: "og.jpg", w: 1200, h: 630, fit: "cover" },
  // About section detail (instructor demonstrating to circle)
  { in: "IMG_20241015_162951.jpg", out: "about.jpg", w: 1200, h: 800, fit: "cover" },

  // Gallery — 9 photos
  { in: "IMG_20241015_173944.jpg", out: "g1.jpg", w: 1000, h: 1000, fit: "cover" },
  { in: "IMG_20241015_173939.jpg", out: "g2.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_162951.jpg", out: "g3.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_161935.jpg", out: "g4.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_162938.jpg", out: "g5.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_162955.jpg", out: "g6.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_173940.jpg", out: "g7.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_162930.jpg", out: "g8.jpg", w: 900, h: 900, fit: "cover" },
  { in: "IMG_20241015_160439.jpg", out: "g9.jpg", w: 900, h: 900, fit: "cover" },
];

let total = 0;
for (const j of jobs) {
  const dst = join(OUT, j.out);
  await sharp(join(SRC, j.in))
    .rotate() // honor EXIF orientation
    .resize(j.w, j.h, { fit: j.fit, position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(dst);
  const meta = await sharp(dst).metadata();
  const stat = (await import("node:fs")).statSync(dst);
  console.log(`${j.out}  ${meta.width}x${meta.height}  ${(stat.size / 1024).toFixed(0)}KB`);
  total += stat.size;
}
console.log(`\nTotal: ${(total / 1024).toFixed(0)}KB across ${jobs.length} files`);
