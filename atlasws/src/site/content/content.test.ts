import * as cortex from "./cortex";
import * as atlasOne from "./atlasOne";
import * as home from "./home";
import * as nosotros from "./nosotros";
import * as vision from "./vision";
import * as solutions from "./solutions";

const all = JSON.stringify({ cortex, atlasOne, home, nosotros, vision });

test("no hay términos prohibidos", () => {
  expect(all).not.toMatch(/sophia|dataxpos|blockchain|sinergia|revolucionari|kaory|eleven|ginebra|imaltzin/i);
});

test("no aparecen metas aspiracionales", () => {
  expect(all).not.toMatch(/80 ?%/);
});

// Autorizadas por la skill de marca y publicadas en el brochure institucional 2026.
test("cifras anuales y de Atlas Solutions: las autorizadas, con fuente y periodo", () => {
  expect(atlasOne.yearFigures.map((f) => f.value)).toEqual(["$350M MXN", "13"]);
  expect(atlasOne.yearFiguresNote).toMatch(/Fuente: .+ Periodo: 2026/);
  expect(solutions.figures.map((f) => f.value)).toEqual(["7", "25", "100+", "2 sem"]);
  expect(solutions.figuresNote).toMatch(/Fuente: .+ Periodo: 2026/);
});

test("brochure 2026: siete capas, cuatro niveles de acción y alcance del MVP", () => {
  expect(vision.layers).toHaveLength(7);
  expect(vision.layers.filter((l) => l.current).map((l) => l.name)).toEqual(["Agéntico"]);
  expect(vision.actionLevels.map((a) => a.n)).toEqual(["N1", "N2", "N3", "N4"]);
  expect(cortex.mvpScope).toHaveLength(7);
  expect(cortex.mvpLater).toMatch(/no forman parte del MVP/);
  expect(solutions.method).toHaveLength(5);
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
  expect(home.hero.eyebrow).toBe("Tecnología de frontera, aplicada");
  expect(home.hero.title).toBe("Lleva tu empresa a");
  expect(home.hero.accent).toBe("la frontera de lo posible.");
  expect(home.hero.sub.endsWith("de la intención a la ejecución verificable.")).toBe(true);
  expect(home.moonshot.accent).toBe("organizaciones sintéticas.");
  expect(home.moonshot.note).toMatch(/no una promesa de disponibilidad/);
  expect(home.pillars.map((p) => [p.title, p.status])).toEqual([
    ["Sistemas agénticos", "Validado"],
    ["Software autónomo", "En desarrollo"],
    ["Software autoevolutivo", "Investigación"],
    ["Sistemas operativos cognitivos", "MVP"],
  ]);
});

test("visión: el moonshot es investigación y la hoja de ruta, escenarios", () => {
  expect(vision.stages.find((s) => s.when === "Nuestro moonshot")?.status).toBe("Investigación");
  expect(vision.labs.status).toBe("Investigación");
  expect(vision.roadmapNote).toMatch(/no predicciones/);
  // Nombres internos pendientes de validación (§27 del documento fundacional).
  expect(JSON.stringify(vision)).not.toMatch(/Genesis|SOMM|OCGR|VAO/);
  // Todo en español: los mensajes del documento van traducidos.
  expect(JSON.stringify(vision)).not.toMatch(/Engineering the future|Pioneering|Synthetic Organizations/);
});

test("Atlas Core: núcleo de Atlas ONE con módulos y su estado", () => {
  expect(atlasOne.core.modules.map((m) => [m.name, m.status])).toEqual([
    ["Atlas Financials", "MVP"],
    ["Atlas Booking", "MVP"],
    ["Print Agent", "Validado"],
  ]);
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
