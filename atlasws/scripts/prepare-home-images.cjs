/* ============================================================
 * scripts/prepare-home-images.cjs
 * Genera los assets del Home Modernist a partir de contex/atlas startup/assets.
 *  - Captura del panel Atlas ONE recortada a cabecera + Revenue/Tickets/AOV.
 *    Fuera: Tenants, MRR proxy, tasas y gráfica histórica (no autorizados).
 *  - Foto INTARG 2017 reducida a 1600px.
 * Uso: node scripts/prepare-home-images.cjs
 * ============================================================ */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.resolve(ROOT, "..", "contex", "atlas startup", "assets");
const OUT = path.join(ROOT, "public", "images", "home");

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  await sharp(path.join(SRC, "atlasone-metrics.png"))
    .extract({ left: 240, top: 40, width: 1230, height: 260 })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, "atlasone-metrics-crop.webp"));

  await sharp(path.join(SRC, "photo-intarg-2017.jpg"))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, "founders-intarg-2017.webp"));

  for (const f of fs.readdirSync(OUT)) {
    const { width, height } = await sharp(path.join(OUT, f)).metadata();
    console.log(`✅ ${f} ${width}×${height} · ${(fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0)} KB`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
