import fs from "fs";
import os from "os";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildAll, seoBlock } = require("../../../scripts/seo-build.cjs");

const TEMPLATE = `<!DOCTYPE html><html lang="es"><head><title>x</title><meta name="description" content="y" /></head><body><div id="root"></div></body></html>`;

test("seoBlock for /en emits hreflang links and en_US locale", () => {
  const block = seoBlock({
    path: "/en", title: "T", description: "D", locale: "en_US",
    alternates: { "es-MX": "/", en: "/en", "x-default": "/" },
  });
  expect(block).toContain(`<link rel="alternate" hreflang="en" href="https://atlastech.mx/en" />`);
  expect(block).toContain(`<link rel="alternate" hreflang="x-default" href="https://atlastech.mx/" />`);
  expect(block).toContain(`<meta property="og:locale" content="en_US" />`);
  expect(block).toContain(`<link rel="canonical" href="https://atlastech.mx/en" />`);
});

test("buildAll writes /en/index.html with lang=en and sitemap includes /en", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "seo-"));
  fs.writeFileSync(path.join(dir, "index.html"), TEMPLATE);
  buildAll(dir);
  const enHtml = fs.readFileSync(path.join(dir, "en", "index.html"), "utf8");
  expect(enHtml).toContain(`<html lang="en">`);
  expect(enHtml).toContain(`hreflang="es-MX"`);
  const esHtml = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  expect(esHtml).toContain(`<html lang="es">`);
  expect(esHtml).toContain(`hreflang="en"`);
  const sitemap = fs.readFileSync(path.join(dir, "sitemap.xml"), "utf8");
  expect(sitemap).toContain("<loc>https://atlastech.mx/en</loc>");
});
