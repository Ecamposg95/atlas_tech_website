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
