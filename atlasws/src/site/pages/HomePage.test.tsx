import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { waLink, TRIAL_MESSAGE } from "../lib/whatsapp";

const renderHome = () =>
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

test("hero con el mensaje y el CTA a contacto", () => {
  renderHome();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Consultoría que no entrega un PDF. Entrega ejecución."
  );
  expect(
    within(screen.getByTestId("sec-hero")).getByRole("link", { name: "Agenda una llamada" })
  ).toHaveAttribute("href", "/contacto");
  expect(within(screen.getByTestId("sec-hero")).getByRole("link", { name: "Cómo funciona" })).toHaveAttribute(
    "href",
    "#como"
  );
});

test("las ocho secciones en orden", () => {
  renderHome();
  expect(screen.getAllByTestId(/^sec-/).map((e) => e.getAttribute("data-testid"))).toEqual([
    "sec-hero",
    "sec-como",
    "sec-moonshot",
    "sec-construimos",
    "sec-atlas-one",
    "sec-clientes",
    "sec-portafolio",
    "sec-cierre",
  ]);
});

test("cómo funciona muestra los cuatro pasos", () => {
  renderHome();
  const s = screen.getByTestId("sec-como");
  ["Diagnóstico", "Plan", "Ejecución", "Evidencia"].forEach((t) =>
    expect(within(s).getByRole("heading", { name: t })).toBeInTheDocument()
  );
});

test("Atlas ONE: cifras con pie de fuente, estado y prueba gratis", () => {
  renderHome();
  const s = screen.getByTestId("sec-atlas-one");
  expect(within(s).getByText("$80.1M MXN")).toBeInTheDocument();
  expect(within(s).getByText(/Corte: 09\.09\.2026/)).toBeInTheDocument();
  expect(within(s).getByText("Validado")).toBeInTheDocument();
  expect(within(s).getByRole("link", { name: /1 mes gratis/i })).toHaveAttribute("href", waLink(TRIAL_MESSAGE));
  expect(within(s).getByRole("link", { name: /conoce atlas one/i })).toHaveAttribute("href", "/atlas-one");
});

test("clientes: los nueve logos publicados", () => {
  renderHome();
  expect(within(screen.getByTestId("sec-clientes")).getAllByRole("img")).toHaveLength(9);
});

test("portafolio enlaza a las tres páginas existentes y no a Atlas ONE", () => {
  renderHome();
  const s = screen.getByTestId("sec-portafolio");
  ["harvestt", "sigma", "open-cashback"].forEach((sl) =>
    expect(s.querySelector(`a[href="/proyectos/${sl}"]`)).not.toBeNull()
  );
  expect(s.querySelector('a[href*="atlas-one"]')).toBeNull();
});

test("sin WebGL el hero muestra el motivo estático", () => {
  renderHome();
  expect(within(screen.getByTestId("sec-hero")).getByTestId("orbit-motif")).toBeInTheDocument();
});
