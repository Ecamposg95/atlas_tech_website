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

test("tokens de Atlas Horizon: negro, tinta cálida y luz ámbar", () => {
  const t = read("src/site/tokens.css").toLowerCase();
  [
    "--bg: #050505",
    "--night: #0b0a09",
    "--ink: #f5f2ee",
    "--muted: #a8a29a",
    "--dim: #6e6862",
    "--accent: #ff6a1f",
    "--amber: #ffa14a",
    "--glow: #ffd3a8",
    "--deep: #7a240a",
    "--dawn: #c9dbea",
    "--signal: #9fe0c0",
  ].forEach((decl) => expect(t).toContain(decl));
});

test("no quedan acentos de marcas anteriores (lima, azul hielo, violeta)", () => {
  siteSources.forEach(([f, src]) => {
    expect([f, /c6ff3d|d6ff70|a8e024|a9c9eb|70a7e0|ff6a2b|9333ea|a855f7/i.test(src)]).toEqual([f, false]);
  });
  expect(read("src/components/scrollbar/style.css")).not.toMatch(/c6ff3d|a9c9eb|ff6a2b/i);
});

test("tipografía ligera: titulares en 300 y ningún peso 700", () => {
  expect(read("src/site/tokens.css")).toMatch(/\.noir h1,[\s\S]{0,120}font-weight: 300;/);
  siteSources.forEach(([f, src]) => {
    expect([f, /font-weight:\s*(600|700|800|900|bold)/i.test(src)]).toEqual([f, false]);
  });
});

test("botones en píldora, cards de vidrio y grano de película", () => {
  const t = read("src/site/tokens.css");
  expect(t).toMatch(/\.noir \.cta \{[^}]*border-radius: 999px/);
  expect(t).toMatch(/\.noir \.card \{[^}]*border-radius: 22px/);
  expect(t).toMatch(/\.noir \.card--ember \{/);
  expect(read("src/site/components/site-frame.css")).toMatch(/feTurbulence/);
});

test("color de tema oscuro en HTML, manifest y SEO", () => {
  expect(read("public/index.html")).toMatch(/theme-color" content="#050505"/i);
  expect(JSON.parse(read("public/manifest.json")).theme_color.toLowerCase()).toBe("#050505");
  expect(cfg.themeColor.toLowerCase()).toBe("#050505");
});
