import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
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

test("demo jugable: armar el carrito, cobrar y ver moverse el tablero", () => {
  renderOne();
  const play = within(screen.getByTestId("pos-playground"));
  const cobrar = play.getByRole("button", { name: /^Cobrar/ });
  expect(cobrar).toBeDisabled();

  // Dos refrescos ($18) y un pan ($42): total $78.00, con IVA desglosado.
  fireEvent.click(play.getByRole("button", { name: /Agregar Refresco 600 ml/ }));
  fireEvent.click(play.getByRole("button", { name: /Agregar Refresco 600 ml/ }));
  fireEvent.click(play.getByRole("button", { name: /Agregar Pan de caja/ }));
  expect(play.getByTestId("pos-total")).toHaveTextContent("$78.00");
  fireEvent.click(play.getByRole("button", { name: "Quitar uno de Refresco 600 ml" }));
  expect(play.getByTestId("pos-total")).toHaveTextContent("$60.00");

  // Paga con un billete de $100: el ticket muestra el cambio.
  fireEvent.click(play.getByRole("button", { name: "$100.00" }));
  fireEvent.click(cobrar);
  const ticket = within(play.getByTestId("pos-ticket"));
  expect(ticket.getByText("Venta cobrada")).toBeInTheDocument();
  expect(ticket.getByText("Ticket #0001")).toBeInTheDocument();
  expect(ticket.getByText("$40.00")).toBeInTheDocument();
  expect(play.getByTestId("pos-session")).toHaveTextContent("$60.00");

  // Cambiar de giro cambia el catálogo; la búsqueda filtra.
  fireEvent.click(play.getByRole("button", { name: "Café" }));
  expect(play.getByRole("button", { name: /Agregar Capuchino/ })).toBeInTheDocument();
  fireEvent.change(play.getByRole("searchbox"), { target: { value: "latte" } });
  expect(play.queryByRole("button", { name: /Agregar Capuchino/ })).toBeNull();
  // Aclara que son datos de ejemplo.
  expect(play.getByText(/productos y precios de ejemplo/)).toBeInTheDocument();
});
