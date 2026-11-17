import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatusTag from "./StatusTag";
import FigureNote from "./FigureNote";
import CtaButton from "./CtaButton";
import Section from "./Section";

test("StatusTag muestra el estado", () => {
  render(<StatusTag status="MVP" />);
  expect(screen.getByText("MVP")).toBeInTheDocument();
});

test("StatusTag marca Investigación para el borde punteado", () => {
  render(<StatusTag status="Investigación" />);
  expect(screen.getByText("Investigación")).toHaveClass("status-tag--research");
});

test("FigureNote muestra fuente, periodo y corte", () => {
  render(<FigureNote source="datos de operación de Atlas ONE" period="90 días" cutoff="09.09.2026" />);
  expect(
    screen.getByText(/Fuente: datos de operación de Atlas ONE\. Periodo: 90 días\. Corte: 09\.09\.2026\./)
  ).toBeInTheDocument();
});

test("CtaButton externo abre en pestaña nueva con rel seguro", () => {
  render(<CtaButton href="https://wa.me/1">Hola</CtaButton>);
  const a = screen.getByRole("link", { name: "Hola" });
  expect(a).toHaveAttribute("rel", expect.stringContaining("noopener"));
  expect(a).toHaveAttribute("target", "_blank");
});

test("CtaButton interno enlaza por router", () => {
  render(
    <MemoryRouter>
      <CtaButton to="/contacto">Agenda una llamada</CtaButton>
    </MemoryRouter>
  );
  expect(screen.getByRole("link", { name: "Agenda una llamada" })).toHaveAttribute("href", "/contacto");
});

test("Section muestra su etiqueta y contenido", () => {
  render(
    <Section label="01 · Cómo funciona" id="como">
      <p>cuerpo</p>
    </Section>
  );
  expect(screen.getByText("01 · Cómo funciona")).toBeInTheDocument();
  expect(screen.getByText("cuerpo")).toBeInTheDocument();
});

test("StatusTag aplica el color de estado de Atlas Noir", () => {
  render(
    <>
      <StatusTag status="Validado" />
      <StatusTag status="MVP" />
      <StatusTag status="En desarrollo" />
      <StatusTag status="Concepto" />
    </>
  );
  expect(screen.getByText("Validado")).toHaveClass("status-tag--validated");
  expect(screen.getByText("MVP")).toHaveClass("status-tag--mvp");
  expect(screen.getByText("En desarrollo")).toHaveClass("status-tag--dev");
  expect(screen.getByText("Concepto")).toHaveClass("status-tag--concept");
});
