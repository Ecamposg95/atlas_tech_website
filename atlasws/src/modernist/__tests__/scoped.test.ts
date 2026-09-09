import fs from "fs";
import path from "path";

const FILES = ["modernist.css", "home.css"];
const ALLOWED = /^(\.mst\b|:root\b|html\[data-theme="modernist"\])/;

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
      expect(css).not.toMatch(/border-radius:\s+(?!var\(--radius|calc\(var\(--radius|50%)/);
      expect(css).not.toMatch(/text-align:\s*center/);
    });
  }
});
