// Generates optimized web assets in public/images from the client's original
// files in assets-src/. Run with `npm run images` whenever a source changes.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'assets-src';
const OUT = 'public/images';
const NAVY = '#0B1F3A';

await mkdir(OUT, { recursive: true });

// ---------- Logo ----------
// The original logo is a stacked lockup (mark above wordmark) on a transparent
// canvas. We split it so the navbar can use a horizontal lockup, and recolour
// it for dark backgrounds. Shapes and proportions are untouched.
const logo = `${SRC}/numberx-logo.png`;
const crop = async (top, height) =>
  sharp(await sharp(logo).extract({ left: 0, top, width: 1500, height }).png().toBuffer())
    .trim()
    .png()
    .toBuffer();
const mark = await crop(290, 600);
const word = await crop(945, 240);

/** Recolour every visible pixel to `color`, keeping the alpha channel. */
async function tint(buf, color) {
  const { width, height } = await sharp(buf).metadata();
  const alpha = await sharp(buf).ensureAlpha().extractChannel('alpha').toBuffer();
  return sharp({ create: { width, height, channels: 3, background: color } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

async function horizontal(color) {
  const H = 160;
  const m = await sharp(await tint(mark, color))
    .resize({ height: H })
    .toBuffer();
  const w = await sharp(await tint(word, color))
    .resize({ height: Math.round(H * 0.5) })
    .toBuffer();
  const mm = await sharp(m).metadata();
  const wm = await sharp(w).metadata();
  const gap = 36;
  return sharp({
    create: { width: mm.width + gap + wm.width, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: m, left: 0, top: 0 },
      // Align the wordmark baseline with the base of the mark.
      { input: w, left: mm.width + gap, top: H - wm.height - 4 },
    ])
    .png()
    .toBuffer();
}

for (const [name, color] of [
  ['navy', NAVY],
  ['white', '#FFFFFF'],
]) {
  const buf = await horizontal(color);
  await sharp(buf).png({ compressionLevel: 9 }).toFile(`${OUT}/numberx-logo-${name}.png`);
  await sharp(buf).webp({ quality: 92 }).toFile(`${OUT}/numberx-logo-${name}.webp`);
}
await sharp(logo).trim().resize({ width: 600 }).png({ compressionLevel: 9 }).toFile(`${OUT}/numberx-logo-stacked.png`);

// Favicons / app icons: navy mark centred on white.
async function icon(size, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(await tint(mark, NAVY))
    .resize({ width: inner, height: inner, fit: 'inside' })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#FFFFFF' } })
    .composite([{ input: m, gravity: 'center' }])
    .png();
}
await (await icon(32, 0.06)).toFile('public/favicon-32.png');
await (await icon(180, 0.14)).toFile('public/apple-touch-icon.png');
await (await icon(512, 0.14)).toFile('public/icon-512.png');

// Open Graph image (1200x630): white logo on brand navy.
{
  const white = await horizontal('#FFFFFF');
  const lockup = await sharp(white).resize({ width: 640 }).toBuffer();
  const rule = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
       <rect x="80" y="520" width="96" height="4" fill="#C9A55C"/>
       <text x="80" y="580" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#CBD5E1">Richmond, VA Certified Public Accountant</text>
     </svg>`,
  );
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: NAVY } })
    .composite([{ input: lockup, left: 80, top: 200 }, { input: rule }])
    .jpeg({ quality: 88 })
    .toFile(`${OUT}/og-image.jpg`);
}

// ---------- Photography ----------
// Founder portrait (3024x4032 original).
for (const w of [480, 800, 1200]) {
  await sharp(`${SRC}/kaleem-baig-portrait.jpg`)
    .resize({ width: w })
    .webp({ quality: 80 })
    .toFile(`${OUT}/kaleem-baig-${w}.webp`);
}
await sharp(`${SRC}/kaleem-baig-portrait.jpg`)
  .resize({ width: 800 })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(`${OUT}/kaleem-baig-800.jpg`);

// Office workspace: crop to the right-hand desk scene (portrait-ish 4:5).
const office = sharp(`${SRC}/office-workspace.jpg`).extract({ left: 2650, top: 1350, width: 3300, height: 2700 });
const officeBuf = await office.toBuffer();
for (const w of [640, 960, 1400]) {
  await sharp(officeBuf).resize({ width: w }).webp({ quality: 76 }).toFile(`${OUT}/office-${w}.webp`);
}
await sharp(officeBuf).resize({ width: 960 }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/office-960.jpg`);

// Calculator & notes (640px original — used small only).
await sharp(`${SRC}/calculator-notes.jpg`).webp({ quality: 80 }).toFile(`${OUT}/calculator-notes-640.webp`);

console.log('Images written to', OUT);
