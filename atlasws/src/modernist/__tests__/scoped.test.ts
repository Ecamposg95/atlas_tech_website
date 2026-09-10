import fs from "fs";
import path from "path";

const FILES = ["modernist.css", "home.css"];
// Pasos de @keyframes (from / to / 50%) no son selectores de elementos y quedan permitidos.
const ALLOWED = /^(\.mst\b|html\[data-theme="modernist"\]|from$|to$|\d+%$)/;

const selectorsOf = (css: string): string[] => {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out: string[] = [];
  const re = /(^|[{};])\s*([^{}@;]+?)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) {
    m[2].split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => out.push(s));
  }
  return out;
};

// Igual que selectorsOf, pero se queda con el cuerpo de cada bloque hoja (sin llaves anidadas)
// para poder inspeccionar qué declaraciones vive dentro de cada selector.
const blocksOf = (css: string): { selectors: string[]; body: string }[] => {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out: { selectors: string[]; body: string }[] = [];
  const re = /(^|[{};])\s*([^{}@;]+?)\s*\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) {
    const selectors = m[2].split(",").map((s) => s.trim()).filter(Boolean);
    out.push({ selectors, body: m[3] });
  }
  return out;
};

// Solo estos dos selectores pueden traer los tokens de tipografía: el subárbol .mst (primer
// pintado) y el atributo en <html> (para que el body legado resuelva las variables heredadas).
const FONT_SCOPE = /^(\.mst\b|html\[data-theme="modernist"\])/;

describe("modernist css scope", () => {
  for (const file of FILES) {
    test(`${file}: every selector is scoped`, () => {
      const css = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
      const selectors = selectorsOf(css);
      expect(selectors.length).toBeGreaterThan(0);
      const bad = selectors.filter((s) => !ALLOWED.test(s));
      expect(bad).toEqual([]);
    });
    test(`${file}: no hard-coded radius or centering`, () => {
      const css = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
      expect(css).not.toMatch(/border-radius:\s*(?!\s*var\(--radius|\s*calc\(var\(--radius|\s*50%)/);
      expect(css).not.toMatch(/text-align:\s*center/);
    });
    test(`${file}: --font-body/--font-heading nunca se declaran fuera de .mst o html[data-theme="modernist"]`, () => {
      const css = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
      const blocks = blocksOf(css);
      const offenders = blocks.filter(
        (b) =>
          /--font-(heading|body)\s*:/.test(b.body) &&
          !b.selectors.every((s) => FONT_SCOPE.test(s))
      );
      expect(offenders).toEqual([]);
    });
  }
});
