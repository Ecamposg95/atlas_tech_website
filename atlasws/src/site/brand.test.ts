import fs from "fs";
import path from "path";
import cfg from "../seo/seo.config.json";

const root = path.join(__dirname, "../..");
const read = (p: string) => fs.readFileSync(path.join(root, p), "utf8");
const VIOLET = /9333ea|a855f7/i;

test("el favicon ya no usa el violeta de la marca anterior", () => {
  expect(read("public/favicon.svg")).not.toMatch(VIOLET);
});

test("el demo de Atlas ONE no muestra violeta en su marco", () => {
  expect(read("src/components/AtlasOneDemos/AtlasOneDemos.tsx")).not.toMatch(VIOLET);
});

test("las rutas compartidas usan una imagen de vista previa propia, no la de Harvestt", () => {
  expect(cfg.defaultImage).not.toMatch(/harvestt/);
  (cfg.routes as any[])
    .filter((r) => !r.path.startsWith("/proyectos/"))
    .forEach((r) => expect(r.image ?? cfg.defaultImage).not.toMatch(/harvestt/));
  expect(fs.existsSync(path.join(root, "public", cfg.defaultImage))).toBe(true);
  expect(read("public/index.html")).not.toMatch(/og:image" content="[^"]*harvestt/);
});

test("los metadatos no afirman que los agentes ya ejecutan solos", () => {
  expect(JSON.stringify(cfg)).not.toMatch(/proponen y ejecutan|agentes[^."]{0,80}lo ejecutan/i);
});

// ---------- Atlas Noir (guía de marca vigente) ----------
const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
const siteSources = walk(path.join(root, "src/site"))
  .filter((f) => /\.(css|tsx|ts)$/.test(f) && !/\.test\./.test(f))
  .map((f) => [f, fs.readFileSync(f, "utf8")] as const);

test("tokens de Atlas Noir con acento verde lima (preferencia del dueño sobre el azul hielo)", () => {
  const t = read("src/site/tokens.css").toLowerCase();
  [
    "--bg: #0b0d10",
    "--panel: #13171c",
    "--rule: #242b33",
    "--rule-strong: #303741",
    "--ink: #f4f5f7",
    "--muted: #a3adb9",
    "--dim: #77828f",
    "--accent: #c6ff3d",
    "--accent-2: #a8e024",
    "--on-accent: #0b0d10",
    "--signal: #8fd9b6",
  ].forEach((decl) => expect(t).toContain(decl));
});

test("no queda azul hielo, ni glow, ni esquinas redondeadas en el sitio", () => {
  siteSources.forEach(([f, src]) => {
    expect([f, /a9c9eb|70a7e0|c3daf2|25364a/i.test(src)]).toEqual([f, false]);
    expect([f, /drop-shadow|box-shadow:\s*0 0/i.test(src)]).toEqual([f, false]);
    expect([f, /border-radius:\s*(999px|1[0-9]px|[4-9]px)/i.test(src)]).toEqual([f, false]);
  });
  expect(read("src/components/scrollbar/style.css")).not.toMatch(/a9c9eb/i);
});

test("color de tema Atlas Noir en HTML, manifest y SEO", () => {
  expect(read("public/index.html")).toMatch(/theme-color" content="#0B0D10"/i);
  expect(JSON.parse(read("public/manifest.json")).theme_color.toLowerCase()).toBe("#0b0d10");
  expect(cfg.themeColor.toLowerCase()).toBe("#0b0d10");
});
