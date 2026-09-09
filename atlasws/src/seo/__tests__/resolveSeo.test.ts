import { resolveSeo } from "../resolveSeo";

test("/ is Spanish with alternates to /en and x-default", () => {
  const s = resolveSeo("/");
  expect(s.lang).toBe("es");
  expect(s.locale).toBe("es_MX");
  expect(s.alternates).toEqual(
    expect.arrayContaining([
      { hreflang: "es-MX", href: "https://atlastech.mx/" },
      { hreflang: "en", href: "https://atlastech.mx/en" },
      { hreflang: "x-default", href: "https://atlastech.mx/" },
    ])
  );
});

test("/en is English with its own canonical", () => {
  const s = resolveSeo("/en");
  expect(s.lang).toBe("en");
  expect(s.locale).toBe("en_US");
  expect(s.canonical).toBe("https://atlastech.mx/en");
  expect(s.title).toMatch(/Atlas Tech/);
  expect(s.alternates.map((a) => a.hreflang).sort()).toEqual(["en", "es-MX", "x-default"]);
});

test("routes without alternates default to site locale and empty list", () => {
  const s = resolveSeo("/proyectos");
  expect(s.lang).toBe("es");
  expect(s.locale).toBe("es_MX");
  expect(s.alternates).toEqual([]);
});
