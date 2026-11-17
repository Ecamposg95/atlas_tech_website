import cfg from "./seo.config.json";
import { resolveSeo } from "./resolveSeo";

const routes = cfg.routes as any[];
const paths = routes.map((r) => r.path);

test("rutas nuevas presentes y viejas fuera", () => {
  ["/", "/cortex", "/atlas-one", "/portafolio", "/nosotros", "/contacto"].forEach((p) => expect(paths).toContain(p));
  ["/about", "/service", "/proyectos", "/proyectos/atlas-one", "/contact"].forEach((p) =>
    expect(paths).not.toContain(p)
  );
  ["/proyectos/harvestt", "/proyectos/sigma", "/proyectos/open-cashback"].forEach((p) => expect(paths).toContain(p));
});

test("el posicionamiento viejo no aparece en rutas compartidas", () => {
  const shared = routes.filter((r) => !r.path.startsWith("/proyectos/"));
  expect(JSON.stringify([shared, cfg.organization])).not.toMatch(/venture studio|blockchain/i);
});

test("el Home posiciona sistemas agénticos y Cortex", () => {
  const home = routes.find((r) => r.path === "/");
  expect(`${home.title} ${home.description}`).toMatch(/agéntic/i);
  expect(`${home.title} ${home.description}`).toMatch(/Cortex/);
});

test("cada ruta tiene título y descripción suficientes", () => {
  routes.forEach((r) => expect(r.title).toBeTruthy());
  // La 404 no se indexa: su descripción puede ser breve.
  routes
    .filter((r) => !r.noindex)
    .forEach((r) => {
      expect(r.description.length).toBeGreaterThan(50);
      expect(r.description.length).toBeLessThanOrEqual(200);
    });
});

test("sin cifras pendientes ni clientes no autorizados en metadatos", () => {
  expect(JSON.stringify(cfg)).not.toMatch(/350M|13 sucursales|7 clientes|sophia|kaory|dataxpos|aggregateRating/i);
});

test("resolveSeo entrega canónicos de las rutas nuevas", () => {
  expect(resolveSeo("/cortex").canonical).toBe("https://atlastech.mx/cortex");
  expect(resolveSeo("/nosotros/").canonical).toBe("https://atlastech.mx/nosotros");
  expect(resolveSeo("/cortex").title).toMatch(/Atlas Cortex/);
});

test("tema oscuro Atlas Noir", () => {
  expect(cfg.themeColor.toLowerCase()).toBe("#0b0d10");
});
