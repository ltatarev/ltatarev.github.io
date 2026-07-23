// Rasterises public/pointer-charm.svg into the cursor PNGs used by globals.css.
// Cursors have to be bitmaps at a fixed size: Chromium ignores any cursor image
// larger than 128x128, so the @2x variants are kept under that ceiling.
// Run with: node scripts/make-cursors.mjs

import sharp from 'sharp';

const SRC = 'public/pointer-charm.svg';
const VIEW = { w: 220, h: 350 }; // the SVG viewBox
const ALPHA_MIN = 16; // ignore the faintest drop-shadow pixels when cropping
const DENSITY = 72 * 8; // render 8x oversized, then box-filter down

// The arrow tip is drawn at (44 38) but the whole group is rotated by
// -8deg about (120 190); this is where the tip actually ends up.
const TIP = (() => {
  const a = (-8 * Math.PI) / 180;
  const [cx, cy] = [120, 190];
  const [dx, dy] = [44 - cx, 38 - cy];
  return {
    x: cx + dx * Math.cos(a) - dy * Math.sin(a),
    y: cy + dx * Math.sin(a) + dy * Math.cos(a),
  };
})();

const VARIANTS = [
  { name: 'pointer-charm', height: 46 }, // default
  { name: 'pointer-charm-lg', height: 53 }, // "this is clickable"
];

const { data, info } = await sharp(SRC, { density: DENSITY })
  .raw()
  .toBuffer({ resolveWithObject: true });

// tight bounding box of the visible artwork
let [minX, minY, maxX, maxY] = [info.width, info.height, -1, -1];
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * info.channels + 3] > ALPHA_MIN) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const box = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

// where the tip sits inside that box, as a fraction
const scale = info.width / VIEW.w;
const fx = (TIP.x * scale - box.left) / box.width;
const fy = (TIP.y * scale - box.top) / box.height;

console.log(`render ${info.width}x${info.height}, art ${box.width}x${box.height}`);
console.log(`tip fraction (${fx.toFixed(4)}, ${fy.toFixed(4)})\n`);

for (const { name, height } of VARIANTS) {
  const width = Math.round((height * box.width) / box.height);
  for (const dpr of [1, 2]) {
    const [w, h] = [width * dpr, height * dpr];
    if (w > 128 || h > 128)
      throw new Error(`${name}@${dpr}x is ${w}x${h}, over the 128px cursor limit`);
    const out = `public/${name}${dpr === 2 ? '@2x' : ''}.png`;
    await sharp(SRC, { density: DENSITY })
      .extract(box)
      .resize(w, h, { fit: 'fill' })
      .png({ compressionLevel: 9 })
      .toFile(out);
    if (dpr === 1) {
      console.log(`${out}  ${w}x${h}  hotspot ${Math.round(fx * w)} ${Math.round(fy * h)}`);
    } else {
      console.log(`${out}  ${w}x${h}`);
    }
  }
}
