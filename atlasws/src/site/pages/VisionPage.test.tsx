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
