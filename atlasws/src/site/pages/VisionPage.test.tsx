import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VisionPage from "./VisionPage";

const renderVision = () =>
  render(
    <MemoryRouter>
      <VisionPage />
    </MemoryRouter>
  );

test("visión: lema traducido y cada tiempo de la declaración con su estado", () => {
  renderVision();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Ingeniería para el futuro de las organizaciones."
  );
  const items = within(screen.getByTestId("vision-stages")).getAllByRole("listitem");
  expect(items).toHaveLength(4);
  items.forEach((li) => expect(li.querySelector(".status-tag")).not.toBeNull());
});

test("visión: la hoja de ruta se presenta como escenario y Labs como investigación", () => {
  renderVision();
  expect(within(screen.getByTestId("vision-roadmap")).getByText(/no predicciones/)).toBeInTheDocument();
  expect(within(screen.getByTestId("vision-labs")).getByText("Investigación")).toBeInTheDocument();
});

test("visión: una sola composición de luz", () => {
  renderVision();
  expect(screen.getAllByTestId("atmosphere")).toHaveLength(1);
});

test("visión: siete capas del software y cuatro niveles de acción", () => {
  renderVision();
  expect(within(screen.getByTestId("vision-layers")).getAllByRole("listitem")).toHaveLength(7);
  expect(within(screen.getByTestId("vision-governance")).getByText("Prohibida para agentes", { selector: "dt" })).toBeInTheDocument();
});

test("visión: portada moonshot decorativa y esquemas con texto alternativo", () => {
  renderVision();
  expect(within(screen.getByTestId("vision-head")).getByTestId("vision-moonshot")).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByTestId("vision-stack")).toHaveAttribute("aria-label", expect.stringMatching(/capa Agéntico/));
  expect(screen.getByTestId("vision-org")).toHaveAttribute("aria-label", expect.stringMatching(/propósito humano/));
  // En reposo el esquema muestra el caso que exige revisión humana.
  expect(within(screen.getByTestId("vision-gate")).getByText("Espera revisión humana")).toBeInTheDocument();
});
