import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CortexPage from "./CortexPage";
import { capabilities } from "../content/cortex";

const renderCortex = () =>
  render(
    <MemoryRouter>
      <CortexPage />
    </MemoryRouter>
  );

test("encabezado: nombre, estado del producto y CTA", () => {
  renderCortex();
  const head = screen.getByTestId("cortex-head");
  expect(within(head).getByRole("heading", { level: 1 })).toHaveTextContent(/Atlas Cortex/);
  expect(within(head).getByText("MVP")).toBeInTheDocument();
  expect(within(head).getByRole("link", { name: "Agenda una llamada" })).toHaveAttribute("href", "/contacto");
});

test("cada capacidad muestra su etiqueta de estado en su grupo", () => {
  renderCortex();
  capabilities.forEach((c) => {
    const item = screen.getByText(c.name).closest("[data-cap]") as HTMLElement;
    expect(item).not.toBeNull();
    expect(within(item).getByText(c.status)).toBeInTheDocument();
    expect(item.closest(`[data-group="${c.group}"]`)).not.toBeNull();
  });
});

test("los agentes se presentan como en construcción", () => {
  renderCortex();
  const sec = screen.getByTestId("cortex-agents");
  expect(within(sec).getByRole("heading", { level: 2 })).toHaveTextContent(/estamos construyendo/i);
  expect(within(sec).getAllByText("En desarrollo")).toHaveLength(8);
});

test("la escalera marca solo el nivel actual", () => {
  renderCortex();
  expect(screen.getByText("Propone").closest("[data-level]")).toHaveAttribute("aria-current", "step");
  expect(document.querySelectorAll('[data-level][aria-current="step"]')).toHaveLength(1);
});

test("aclara que la consultoría la entrega el equipo, no un autoservicio", () => {
  renderCortex();
  expect(screen.getByText(/No es un módulo de autoservicio/)).toBeInTheDocument();
});

test("ilustraciones: grafo, consola con aprobación humana y equipo de agentes", () => {
  renderCortex();
  expect(within(screen.getByTestId("cortex-head")).getByTestId("cortex-graph")).toBeInTheDocument();
  const ui = screen.getByTestId("cortex-console");
  ["Pasos del agente", "Esperando tu confirmación", "Confirmar", "Rechazar"].forEach((t) =>
    expect(within(ui).getByText(t)).toBeInTheDocument()
  );
  // Es una demostración y lo dice.
  expect(within(ui).getByText(/Demostración de la interfaz con datos de ejemplo/)).toBeInTheDocument();
  expect(within(screen.getByTestId("cortex-agents")).getByTestId("cortex-orbit")).toHaveAttribute("role", "img");
});
