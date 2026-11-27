import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import PortfolioPage from "./PortfolioPage";
import NosotrosPage from "./NosotrosPage";
import ContactoPage from "./ContactoPage";
import { waLink, CALL_MESSAGE } from "../lib/whatsapp";

const renderAt = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

afterEach(() => jest.restoreAllMocks());

test("LeadForm no abre WhatsApp con campos vacíos", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  render(<LeadForm />);
  fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));
  expect(open).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent("Completa los tres campos.");
});

test("LeadForm abre WhatsApp con el mensaje íntegro", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  render(<LeadForm />);
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana & Co" } });
  fireEvent.change(screen.getByLabelText(/empresa/i), { target: { value: "ACME #1" } });
  fireEvent.change(screen.getByLabelText(/automatizar/i), { target: { value: "cobranza\ny compras 🚀" } });
  fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));
  expect(open).toHaveBeenCalledTimes(1);
  const url = open.mock.calls[0][0] as string;
  expect(url.startsWith("https://wa.me/527221495215?text=")).toBe(true);
  expect(decodeURIComponent(url.split("text=")[1])).toBe(
    "Hola, soy Ana & Co de ACME #1. Queremos automatizar: cobranza\ny compras 🚀"
  );
  expect(screen.queryByRole("alert")).toBeNull();
});

test("LeadForm ofrece correo con los mismos datos y no pide archivos", () => {
  render(<LeadForm />);
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana" } });
  expect(screen.getByRole("link", { name: /prefiero correo/i }).getAttribute("href")).toMatch(
    /^mailto:hola@atlastech\.mx\?subject=.*Ana/
  );
  expect(document.querySelector('input[type="file"]')).toBeNull();
});

test("contacto: titular, WhatsApp directo y formulario", () => {
  renderAt(<ContactoPage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Agenda una llamada");
  expect(screen.getByRole("link", { name: /escríbenos por whatsapp/i })).toHaveAttribute("href", waLink(CALL_MESSAGE));
  expect(screen.getByRole("button", { name: /enviar por whatsapp/i })).toBeInTheDocument();
});

test("portafolio lista tres proyectos sin Atlas ONE", () => {
  renderAt(<PortfolioPage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Portafolio/);
  const cards = screen.getAllByTestId("portfolio-card");
  expect(cards).toHaveLength(3);
  // (el header sí enlaza /atlas-one; aquí importan solo las fichas)
  cards.forEach((c) => expect(c.querySelector('a[href*="atlas-one"]')).toBeNull());
});

test("portafolio liga la plataforma y el repo público de Harvestt", () => {
  renderAt(<PortfolioPage />);
  const card = screen.getAllByTestId("portfolio-card")[0];
  expect(within(card).getByRole("link", { name: /plataforma en vivo/i })).toHaveAttribute(
    "href",
    "https://harvestt-production.up.railway.app"
  );
  expect(within(card).getByRole("link", { name: /código en github/i })).toHaveAttribute(
    "href",
    "https://github.com/Ecamposg95/harvestt"
  );
  expect(within(card).getByText(/telemetría simulada/i)).toBeInTheDocument();
});

test("nosotros muestra los reconocimientos con periodo", () => {
  renderAt(<NosotrosPage />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/Periodo: 2016–2021/)).toBeInTheDocument();
});

test("LeadForm: el correo conserva lo escrito aunque falte un campo", () => {
  render(<LeadForm />);
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana" } });
  fireEvent.change(screen.getByLabelText(/automatizar/i), { target: { value: "cobranza & compras" } });
  const href = screen.getByRole("link", { name: /prefiero correo/i }).getAttribute("href") as string;
  const body = decodeURIComponent(href.split("body=")[1]);
  expect(body).toContain("Ana");
  expect(body).toContain("cobranza & compras");
});

test("portafolio: Atlas Solutions con cifras, fuente y metodología", () => {
  render(
    <MemoryRouter>
      <PortfolioPage />
    </MemoryRouter>
  );
  const sec = screen.getByTestId("portfolio-solutions");
  expect(within(sec).getByText(/Fuente: Atlas Tech, datos internos\. Periodo: 2026\./)).toBeInTheDocument();
  expect(within(screen.getByTestId("solutions-method")).getAllByRole("listitem")).toHaveLength(5);
});
