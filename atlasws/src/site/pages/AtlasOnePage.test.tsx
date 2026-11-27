import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AtlasOnePage from "./AtlasOnePage";
import { waLink, TRIAL_MESSAGE } from "../lib/whatsapp";
import { projects } from "../../data/projects";

// El demo interactivo es una maqueta visual pesada; aquí solo importa que la página lo monte.
jest.mock("../../components/AtlasOneDemos/AtlasOneDemos", () => ({
  AtlasOneDemosPlayer: () => <div data-testid="one-demo" />,
}));

const renderOne = () =>
  render(
    <MemoryRouter>
      <AtlasOnePage />
    </MemoryRouter>
  );

test("encabezado con estado Validado y título", () => {
  renderOne();
  const head = screen.getByTestId("one-head");
  expect(within(head).getByRole("heading", { level: 1 })).toHaveTextContent(/Atlas ONE/);
  expect(within(head).getByText("Validado")).toBeInTheDocument();
});

test("botón de prueba abre WhatsApp con el mensaje de prueba", () => {
  renderOne();
  screen
    .getAllByRole("link", { name: /1 mes gratis/i })
    .forEach((a) => expect(a).toHaveAttribute("href", waLink(TRIAL_MESSAGE)));
  expect(screen.getByRole("link", { name: /atlasone\.com\.mx/i })).toHaveAttribute("href", "https://atlasone.com.mx");
});

test("Atlas ONE AI aparece como En desarrollo", () => {
  renderOne();
  const mod = screen.getByText(/Atlas ONE AI/).closest("[data-module]") as HTMLElement;
  expect(within(mod).getByText("En desarrollo")).toBeInTheDocument();
});

test("cifras con pie de fuente", () => {
  renderOne();
  expect(screen.getByText("134,844")).toBeInTheDocument();
  // Una nota por bloque de cifras: las de 90 días (con corte) y las anuales.
  expect(screen.getAllByText(/Fuente: datos de operación de Atlas ONE/)).toHaveLength(2);
  expect(within(screen.getByTestId("one-year")).getByText("$350M MXN")).toBeInTheDocument();
});

test("monta el demo interactivo y lista los 11 giros", () => {
  renderOne();
  expect(screen.getByTestId("one-demo")).toBeInTheDocument();
  expect(within(screen.getByTestId("one-verticals")).getAllByRole("listitem")).toHaveLength(11);
});

test("no enlaza el repositorio de código", () => {
  renderOne();
  expect(document.querySelector('a[href*="github.com"]')).toBeNull();
});

test("Atlas ONE ya no es un proyecto del portafolio", () => {
  expect(projects.map((p) => p.slug)).toEqual(["harvestt", "sigma", "open-cashback"]);
});
