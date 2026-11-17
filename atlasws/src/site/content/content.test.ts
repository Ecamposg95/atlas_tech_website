import * as cortex from "./cortex";
import * as atlasOne from "./atlasOne";
import * as home from "./home";
import * as nosotros from "./nosotros";

const all = JSON.stringify({ cortex, atlasOne, home, nosotros });

test("no hay términos prohibidos", () => {
  expect(all).not.toMatch(/sophia|dataxpos|blockchain|sinergia|revolucionari|kaory|eleven|ginebra|imaltzin/i);
});

test("no aparecen cifras pendientes ni metas aspiracionales", () => {
  expect(all).not.toMatch(/350M|13 sucursales|7 clientes|25 integraciones|100\+|2 semanas|80 ?%/);
});

test("toda cifra trae fuente, periodo y corte", () => {
  [...atlasOne.figures, nosotros.awardsFigure].forEach((f) =>
    [f.source, f.period, f.cutoff].forEach((v) => expect(v.trim()).not.toBe(""))
  );
  expect(atlasOne.figures.map((f) => f.value)).toEqual(["$80.1M MXN", "134,844", "$593.93"]);
});

test("estados según el spec", () => {
  expect(cortex.cortexStatus).toBe("MVP");
  expect(atlasOne.atlasOneStatus).toBe("Validado");
  expect(cortex.agents).toHaveLength(8);
  cortex.agents.forEach((a) => expect(a.status).toBe("En desarrollo"));
  const hoy = cortex.capabilities.filter((c) => c.group === "hoy");
  expect(hoy.length).toBeGreaterThanOrEqual(5);
  hoy.forEach((c) => expect(c.status).toBe("MVP"));
  cortex.capabilities
    .filter((c) => c.group === "construccion")
    .forEach((c) => expect(c.status).toBe("En desarrollo"));
  const vision = cortex.capabilities.filter((c) => c.group === "vision");
  expect(vision.length).toBeGreaterThanOrEqual(5);
  vision.forEach((c) => expect(["Concepto", "Investigación"]).toContain(c.status));
  expect(cortex.autonomyLevels.map((l) => l.name)).toEqual([
    "Observa",
    "Propone",
    "Ejecuta con aprobación",
    "Ejecuta en política",
  ]);
  expect(cortex.autonomyLevels.filter((l) => l.current).map((l) => l.name)).toEqual(["Propone"]);
  expect(atlasOne.modules.find((m) => /AI/.test(m.name))?.status).toBe("En desarrollo");
  expect(cortex.steps.map((s) => s.title)).toEqual(["Diagnóstico", "Plan", "Ejecución", "Evidencia"]);
});

test("mensaje del hero y moonshot fijados por el spec", () => {
  expect(home.hero.eyebrow).toBe("Consulting as a Service · Atlas Cortex");
  expect(home.hero.title).toBe("Consultoría que no entrega un PDF.");
  expect(home.hero.accent).toBe("Entrega ejecución.");
  expect(home.hero.sub.endsWith("De la intención empresarial a la ejecución verificable.")).toBe(true);
  expect(home.moonshot.text).toBe(
    "Hacer posible que cualquier empresa se convierta en una organización AI-native, operada por un equipo humano compacto y una red coordinada de agentes digitales."
  );
  expect(home.pillars).toHaveLength(3);
});

test("Atlas ONE: 11 giros, precio y stack real", () => {
  expect(atlasOne.verticals).toHaveLength(11);
  expect(atlasOne.pricing.from).toBe("Desde $12 MXN al día");
  expect(atlasOne.pricing.trial).toBe("1 mes gratis");
  expect(atlasOne.stack.join(" ")).toMatch(/FastAPI/);
  expect(atlasOne.stack.join(" ")).not.toMatch(/Node|Railway/i);
});

test("no se afirma como hecho la ejecución autónoma ni un modelo comercial no definido", () => {
  expect(all).not.toMatch(/agentes proponen y actúan|suscripción/i);
  // Hoy el agente propone y la persona confirma (spec §7).
  expect(cortex.steps[2].text).toMatch(/propone/i);
  expect(cortex.steps[2].text).toMatch(/equipo|aprob|confirm/i);
});
