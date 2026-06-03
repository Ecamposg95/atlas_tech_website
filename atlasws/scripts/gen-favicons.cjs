/* ============================================================
 * scripts/gen-favicons.cjs
 * Genera el set de iconos Atlas (PWA / Apple / favicon) a partir de
 * public/favicon.svg, reemplazando los logos por defecto de React.
 * Uso: node scripts/gen-favicons.cjs   (o `npm run gen-favicons`)
 * ============================================================ */
const sharp = require("sharp");
const path = require("path");

const PUB = path.resolve(__dirname, "..", "public");
const SVG = path.join(PUB, "favicon.svg");

const out = [
  { name: "logo512.png", size: 512 },
  { name: "logo192.png", size: 192 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-16.png", size: 16 },
];

(async () => {
  for (const o of out) {
    await sharp(SVG, { density: 512 })
      .resize(o.size, o.size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(PUB, o.name));
    console.log(`✓ ${o.name} (${o.size}×${o.size})`);
  }
  console.log("\n✅ Iconos Atlas generados desde favicon.svg");
})();
