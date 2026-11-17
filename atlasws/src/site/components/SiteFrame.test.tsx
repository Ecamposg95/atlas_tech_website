import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SiteLayout from "./SiteLayout";
import Atmosphere from "./Atmosphere";

const frame = () =>
  render(
    <MemoryRouter>
      <SiteLayout>
        <p>contenido</p>
      </SiteLayout>
    </MemoryRouter>
  );

test("navegación con las cuatro rutas y el CTA", () => {
  frame();
  const nav = screen.getByRole("navigation", { name: "Principal" });
  [
    ["Cortex", "/cortex"],
    ["Atlas ONE", "/atlas-one"],
    ["Portafolio", "/portafolio"],
    ["Nosotros", "/nosotros"],
  ].forEach(([n, h]) => expect(within(nav).getByRole("link", { name: n })).toHaveAttribute("href", h));
  expect(screen.getAllByRole("link", { name: "Agenda una llamada" })[0]).toHaveAttribute("href", "/contacto");
});

test("el menú móvil abre y cierra", () => {
  frame();
  const btn = screen.getByRole("button", { name: /menú/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "false");
});

test("el footer no enlaza redes genéricas y sí las reales", () => {
  frame();
  expect(document.querySelector('a[href*="twitter.com"], a[href*="linkedin.com"], a[href*="x.com"]')).toBeNull();
  expect(document.querySelector('a[href="https://www.instagram.com/atlas_tech.mx/"]')).not.toBeNull();
  expect(document.querySelector('a[href="mailto:hola@atlastech.mx"]')).not.toBeNull();
});

test("el layout envuelve el contenido en la identidad noir", () => {
  frame();
  expect(screen.getByText("contenido").closest(".noir")).not.toBeNull();
  expect(screen.getByRole("main")).toContainElement(screen.getByText("contenido"));
});

test("la atmósfera de luz es decorativa", () => {
  render(<Atmosphere variant="horizon" />);
  const atmo = screen.getByTestId("atmosphere");
  expect(atmo).toHaveAttribute("aria-hidden", "true");
  // El horizonte es el motivo de la marca: arco de luz con el logo sobre la línea.
  expect(atmo.querySelector(".atmo__arc")).not.toBeNull();
  expect(atmo.querySelector(".atmo__mark")).not.toBeNull();
});

test("lockup de marca Atlas Tech y descriptor en el pie", () => {
  frame();
  const brand = screen.getAllByRole("link", { name: "Atlas Tech, inicio" })[0];
  expect(brand).toHaveTextContent("Atlas Tech");
  expect(screen.getByText("ATLAS TECH / FRONTIER TECHNOLOGY")).toBeInTheDocument();
  expect(screen.getByText("Ciudad de México · Desde 2016")).toBeInTheDocument();
});
