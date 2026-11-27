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
    "Lleva tu empresa a la frontera de lo posible."
  );
  expect(
    within(screen.getByTestId("sec-hero")).getByRole("link", { name: "Agenda una llamada" })
  ).toHaveAttribute("href", "/contacto");
  expect(within(screen.getByTestId("sec-hero")).getByRole("link", { name: "Cómo funciona" })).toHaveAttribute(
    "href",
    "#como"
  );
});

test("las diez secciones en orden, con la portada como primera", () => {
  renderHome();
  expect(screen.getAllByTestId(/^sec-/).map((e) => e.getAttribute("data-testid"))).toEqual([
    "sec-hero",
    "sec-como",
    "sec-moonshot",
    "sec-cifras",
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

test("Atlas en números: todas las cifras publicadas, por origen y con su fuente", () => {
  renderHome();
  const sec = screen.getByTestId("sec-cifras");
  const nums = within(sec).getByTestId("numbers");
  ["$350M MXN", "$80.1M MXN", "134,844", "$593.93", "7", "25", "100+", "2 sem", "2016"].forEach((v) =>
    expect(within(nums).getByText(v)).toBeInTheDocument()
  );
  // Las cifras de operación dicen de qué producto son: no deben leerse como tracción de Cortex.
  expect(within(nums).getAllByText(/en Atlas ONE/)).toHaveLength(3);
  expect(within(nums).getByText(/2016–2021/, { selector: "dd" })).toBeInTheDocument();
  // Cada grupo trae su pie de fuente.
  expect(within(nums).getAllByText(/^Fuente:/)).toHaveLength(4);
  expect(within(nums).getByText(/Corte: 09\.09\.2026/)).toBeInTheDocument();
  // Línea de tiempo de 2016 a 2026.
  expect(within(within(sec).getByTestId("timeline")).getAllByRole("listitem")).toHaveLength(6);
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

test("portada: el amanecer de la marca va detrás del titular y es decorativo", () => {
  renderHome();
  const hero = screen.getByTestId("sec-hero");
  const art = within(hero).getByTestId("hero-horizon");
  expect(art).toHaveAttribute("aria-hidden", "true");
  // El titular es texto real (no va dentro de una imagen) y vive en la misma sección.
  expect(within(hero).getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(within(hero).queryByRole("img")).toBeNull();
});

test("portada: carril de productos con su estado y enlace", () => {
  renderHome();
  const rail = screen.getByTestId("hero-rail");
  const links = within(rail).getAllByRole("link");
  expect(links.map((l) => l.getAttribute("href"))).toEqual(["/cortex", "/atlas-one", "/portafolio#solutions"]);
  expect(within(rail).getByText("MVP")).toBeInTheDocument();
  expect(within(rail).getAllByText("Validado")).toHaveLength(2);
});

test("Atlas ONE: la ilustración del punto de venta no muestra importes", () => {
  renderHome();
  const pos = screen.getByTestId("one-pos");
  ["Carrito", "Subtotal", "IVA 16%", "Efectivo", "Tarjeta", "Mixto"].forEach((t) =>
    expect(within(pos).getByText(t)).toBeInTheDocument()
  );
  expect(pos.textContent).not.toMatch(/\$\s?\d/);
});

test("una sola fuente de luz por vista: el horizonte pasa al cierre", () => {
  renderHome();
  expect(within(screen.getByTestId("sec-hero")).queryByTestId("atmosphere")).toBeNull();
  expect(within(screen.getByTestId("sec-cierre")).getByTestId("atmosphere")).toHaveClass("atmo--horizon");
});
