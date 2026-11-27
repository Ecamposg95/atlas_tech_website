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

test("la portada y las nueve secciones en orden", () => {
  renderHome();
  expect(screen.getAllByTestId(/^sec-/).map((e) => e.getAttribute("data-testid"))).toEqual([
    "sec-portada",
    "sec-hero",
    "sec-como",
    "sec-moonshot",
    "sec-construimos",
    "sec-atlas-one",
    "sec-solutions",
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

test("cifras con regla vertical tras el statement, con atribución explícita y pie de fuente", () => {
  renderHome();
  const sec = screen.getByTestId("sec-moonshot");
  const stats = within(sec).getByTestId("home-stats");
  ["$80.1M", "134,844", "$593.93", "13"].forEach((v) => expect(within(stats).getByText(v)).toBeInTheDocument());
  // Las tres cifras de operación dicen de qué producto son: no deben leerse como tracción de Cortex.
  expect(within(stats).getAllByText(/Atlas ONE/)).toHaveLength(3);
  expect(within(stats).getByText(/2016–2021/)).toBeInTheDocument();
  expect(within(sec).getByText(/Corte: 09\.09\.2026/)).toBeInTheDocument();
});

test("qué construimos: cuatro cards con estado, una sola destacada en ember", () => {
  renderHome();
  const cards = within(screen.getByTestId("sec-construimos")).getAllByTestId("card");
  expect(cards).toHaveLength(4);
  cards.forEach((c) => expect(c.querySelector(".status-tag")).not.toBeNull());
  expect(cards.filter((c) => c.classList.contains("card--ember"))).toHaveLength(1);
});

test("Atlas ONE: estado, prueba gratis y enlace al producto", () => {
  renderHome();
  const s = screen.getByTestId("sec-atlas-one");
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

test("portada: imagen a pantalla completa antes de la primera sección, con texto alternativo", () => {
  renderHome();
  const cover = screen.getByTestId("sec-portada");
  const img = within(cover).getByRole("img");
  // El texto va dentro de la imagen: el alt lo hace legible para lectores de pantalla y buscadores.
  expect(img).toHaveAttribute("alt", "Atlas Tech. Tecnología de frontera, aplicada.");
  expect(img.getAttribute("src")).toMatch(/\/images\/hero\/.+\.webp$/);
  expect(img).toHaveAttribute("width");
  expect(img).toHaveAttribute("height");
  // La portada es lo primero que carga: no debe ser lazy.
  expect(img).not.toHaveAttribute("loading", "lazy");
  // El titular principal sigue siendo el de Cortex, no la portada.
  expect(within(cover).queryByRole("heading")).toBeNull();
});

test("una sola fuente de luz por vista: el horizonte pasa al cierre", () => {
  renderHome();
  expect(within(screen.getByTestId("sec-hero")).queryByTestId("atmosphere")).toBeNull();
  expect(within(screen.getByTestId("sec-cierre")).getByTestId("atmosphere")).toHaveClass("atmo--horizon");
});
