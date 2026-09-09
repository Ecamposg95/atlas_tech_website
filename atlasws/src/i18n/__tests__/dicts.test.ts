import { es } from "../es";
import { en } from "../en";

const shape = (v: unknown, prefix = ""): string[] => {
  if (Array.isArray(v)) return [prefix + "[]"];
  if (v && typeof v === "object") {
    return Object.entries(v as Record<string, unknown>)
      .flatMap(([k, x]) => shape(x, `${prefix}${k}.`))
      .sort();
  }
  return [prefix.replace(/\.$/, "")];
};

test("es and en have the same key structure", () => {
  expect(shape(en)).toEqual(shape(es));
});

test("arrays have the same length in both languages", () => {
  expect(en.pattern.industries).toHaveLength(es.pattern.industries.length);
  expect(en.pattern.symptoms).toHaveLength(6);
  expect(es.pattern.symptoms).toHaveLength(6);
  expect(en.ladder.steps).toHaveLength(6);
  expect(es.ladder.steps).toHaveLength(6);
  expect(es.production.stats).toHaveLength(4);
  expect(en.production.stats).toHaveLength(4);
});

test("brand phrases are not translated", () => {
  expect(en.builders.title).toBe("Built by builders.");
  expect(es.builders.title).toBe("Built by builders.");
  expect(en.record.poster).toBe("From system of record to system of action.");
  expect(es.record.poster).toBe("From system of record to system of action.");
});

test("published figures carry the cutoff date in the source line", () => {
  for (const d of [es, en]) {
    expect(d.production.stats.map((s) => s.value)).toEqual(["$80.1M", "134,844", "$593.93", "13"]);
    expect(d.production.source).toContain("09.09.2026");
  }
});
