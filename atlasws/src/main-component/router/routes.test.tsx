import React from "react";
import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./index";

// Maqueta visual pesada del demo de Atlas ONE: no aporta a las pruebas de rutas.
jest.mock("../../components/AtlasOneDemos/AtlasOneDemos", () => ({
  AtlasOneDemosPlayer: () => <div data-testid="one-demo" />,
}));

const at = (p: string) =>
  render(
    <MemoryRouter initialEntries={[p]}>
      <AppRoutes />
    </MemoryRouter>
  );

test.each([
  ["/", /frontera de lo posible/i],
  ["/home", /frontera de lo posible/i],
  ["/cortex", /atlas cortex/i],
  ["/atlas-one", /atlas one/i],
  ["/portafolio", /portafolio/i],
  ["/nosotros", /startup/i],
  ["/vision", /futuro de las organizaciones/i],
  ["/contacto", /agenda una llamada/i],
  ["/about", /startup/i],
  ["/about/", /startup/i],
  ["/contact", /agenda una llamada/i],
  ["/service", /atlas cortex/i],
  ["/service-details", /atlas cortex/i],
  ["/proyectos", /portafolio/i],
  ["/proyectos/", /portafolio/i],
  ["/proyectos/atlas-one?x=1", /atlas one/i],
])("%s llega a la página correcta", (p, h1) => {
  at(p);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(h1);
});

test.each(["/proyectos/loquesea", "/no-existe", "/404"])("%s muestra error con salida a inicio", (p) => {
  at(p);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/no encontramos esta página/i);
  expect(screen.getByRole("link", { name: /volver al inicio/i })).toHaveAttribute("href", "/");
});

test.each(["/proyectos/sigma", "/proyectos/harvestt", "/proyectos/open-cashback"])(
  "%s usa la navegación y el pie nuevos",
  (p) => {
    at(p);
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Agenda una llamada" })[0]).toHaveAttribute("href", "/contacto");
    expect(document.querySelector('a[href*="twitter.com"], a[href*="linkedin.com"]')).toBeNull();
  }
);

describe(".htaccess", () => {
  const ht = fs.readFileSync(path.join(__dirname, "../../../public/.htaccess"), "utf8");
  const rules: [string, string][] = [
    ["home", "/"],
    ["about", "/nosotros"],
    ["contact", "/contacto"],
    ["service", "/cortex"],
    ["service-details", "/cortex"],
    ["proyectos", "/portafolio"],
    ["proyectos/atlas-one", "/atlas-one"],
  ];

  test.each(rules)("redirige /%s con 301 a %s (tolera barra final)", (from, to) => {
    const line = `RewriteRule ^${from}/?$ ${to} [R=301,L]`;
    expect(ht).toContain(line);
    expect(ht.indexOf(line)).toBeLessThan(ht.indexOf("SPA fallback"));
  });

  test("404 real y sin comodín hacia index.html", () => {
    expect(ht).toContain("ErrorDocument 404 /404.html");
    expect(ht).not.toMatch(/RewriteRule \. \/index\.html/);
  });

  test("no redirige los detalles vivos del portafolio", () => {
    expect(ht).not.toMatch(/RewriteRule \^proyectos\/(harvestt|sigma|open-cashback)/);
  });
});
