/* ============================================================
 * scripts/optimize-images.cjs
 * Convierte a WebP las imágenes pesadas que se muestran en página
 * (las que pesan en Core Web Vitals). Las imágenes de Open Graph se
 * dejan en PNG/JPG aparte, porque varios crawlers sociales no renderizan WebP.
 *
 * Uso: node scripts/optimize-images.cjs   (o `npm run optimize-images`)
 * ============================================================ */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// Imágenes pesadas mostradas en página → WebP (rutas relativas a /atlasws).
// Las imágenes Open Graph se dejan en PNG aparte (crawlers sociales).
const targets = [
  // Página de Harvestt (public, referenciadas por ruta absoluta)
  { file: "public/images/projects/harvestt/hero-dome.png", quality: 82 },
  { file: "public/images/projects/harvestt/geodesic-vision.png", quality: 82 },
  { file: "public/images/projects/harvestt/product-node.png", quality: 84 },
  // Página de servicios del template (src, importadas por webpack)
  { file: "src/images/service/img13.png", quality: 82 },
  { file: "src/images/service/img14.png", quality: 82 },
  { file: "src/images/service/img15.png", quality: 82 },
  { file: "src/images/service/img16.png", quality: 82 },
];

(async () => {
  let saved = 0;
  for (const t of targets) {
    const inp = path.join(ROOT, t.file);
    if (!fs.existsSync(inp)) { console.warn(`omitido (no existe): ${t.file}`); continue; }
    const out = inp.replace(/\.(png|jpe?g)$/i, ".webp");
    const before = fs.statSync(inp).size;
    await sharp(inp).webp({ quality: t.quality, effort: 5 }).toFile(out);
    const after = fs.statSync(out).size;
    saved += before - after;
    console.log(`${path.basename(t.file)}  ${(before / 1e6).toFixed(2)}MB → ${path.basename(out)} ${(after / 1e6).toFixed(2)}MB  (-${Math.round((1 - after / before) * 100)}%)`);
  }
  console.log(`\n✅ WebP generados. Ahorro total: ${(saved / 1e6).toFixed(2)} MB`);
})();
