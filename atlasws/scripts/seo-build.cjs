/* ============================================================
 * scripts/seo-build.cjs
 * Post-build SEO: inyecta <title>, meta, Open Graph, Twitter y JSON-LD
 * por ruta dentro de build/<ruta>/index.html, y genera sitemap.xml + robots.txt.
 *
 * Por qué: Hostinger sirve estático (Apache, sin SSR). Los crawlers sociales
 * (WhatsApp/Facebook/X/LinkedIn) NO ejecutan JS, así que cada URL necesita su
 * meta real en el HTML entregado. Este script crea un index.html por ruta con
 * los metadatos correctos; el cuerpo lo sigue hidratando React.
 *
 * Se ejecuta solo tras `npm run build` (lifecycle npm: "postbuild").
 * ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const cfg = require(path.join(ROOT, "src", "seo", "seo.config.json"));

const SITE = String(cfg.siteUrl).replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

if (SITE.includes("tu-dominio.com")) {
  console.warn("\n⚠️  SEO: 'siteUrl' sigue siendo el placeholder en src/seo/seo.config.json.");
  console.warn("    Cambia 'siteUrl' por el dominio real antes de subir a producción.\n");
}

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const abs = (p) => {
  if (!p) return "";
  if (/^https?:\/\//.test(p)) return p;
  return SITE + (p.startsWith("/") ? p : "/" + p);
};

const tmpl = (title, isHome) => (isHome ? title : String(cfg.titleTemplate).replace("%s", title));

const hydrate = (nodes) => {
  if (!nodes || !nodes.length) return [];
  return JSON.parse(JSON.stringify(nodes).replace(/\{siteUrl\}/g, SITE));
};

function seoBlock(route) {
  const isHome = route.path === "/";
  const title = tmpl(route.title, isHome);
  const desc = route.description || cfg.organization.description;
  const canonical = abs(route.path);
  const image = abs(route.image || cfg.defaultImage);
  const type = route.type || "website";
  const robots = route.noindex ? "noindex, nofollow" : "index, follow";

  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    route.keywords ? `<meta name="keywords" content="${esc(route.keywords)}" />` : "",
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${esc(cfg.brand)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="${cfg.locale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    cfg.twitter ? `<meta name="twitter:site" content="${esc(cfg.twitter)}" />` : "",
  ];

  const jsonld = hydrate(route.jsonld);
  if (jsonld.length) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld)}</script>`);
  }
  return lines.filter(Boolean).join("\n    ");
}

// Borra los tags SEO existentes (CRA minifica y elimina los comentarios
// marcadores, así que no dependemos de ellos) y reinyecta los nuevos.
function injectInto(html, route) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']keywords["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "");

  const block = seoBlock(route);
  return out.replace(/<\/head>/i, "    " + block + "\n  </head>");
}

function main() {
  const templatePath = path.join(BUILD, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("❌ SEO: no existe build/index.html. ¿Corriste `npm run build`?");
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, "utf8");
  const routes = cfg.routes;
  let count = 0;

  for (const route of routes) {
    const html = injectInto(template, route);
    let outDir;
    if (route.path === "/") {
      outDir = BUILD;
    } else {
      outDir = path.join(BUILD, route.path);
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
    count++;
  }

  // sitemap.xml
  const urls = routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const priority = r.path === "/" ? "1.0" : r.path.startsWith("/proyectos/") ? "0.8" : "0.6";
      return `  <url>\n    <loc>${abs(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap, "utf8");

  // robots.txt
  const robots = `# Atlas Tech\nUser-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${SITE}/sitemap.xml\n`;
  fs.writeFileSync(path.join(BUILD, "robots.txt"), robots, "utf8");

  console.log(`✅ SEO: ${count} rutas con meta inyectada · sitemap.xml + robots.txt generados (${SITE}).`);
}

main();
