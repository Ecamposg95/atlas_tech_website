import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MstHeader } from "../MstHeader";
import { MstFooter } from "../MstFooter";
import { es } from "../../../i18n/es";
import { en } from "../../../i18n/en";

const wrap = (ui: React.ReactElement, path = "/") => render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

test("header links to existing routes and marks the current language", () => {
  wrap(<MstHeader dict={es} lang="es" />);
  // Los enlaces aparecen dos veces: nav de escritorio y <details> móvil (jsdom renderiza ambos).
  expect(screen.getAllByRole("link", { name: /nosotros/i })[0]).toHaveAttribute("href", "/about");
  expect(screen.getAllByRole("link", { name: /proyectos/i })[0]).toHaveAttribute("href", "/proyectos");
  expect(screen.getAllByRole("link", { name: /contacto/i })[0]).toHaveAttribute("href", "/contact");
  const esToggle = screen.getByRole("link", { name: "ES" });
  const enToggle = screen.getByRole("link", { name: "EN" });
  expect(esToggle).toHaveAttribute("aria-current", "page");
  expect(enToggle).toHaveAttribute("href", "/en");
  expect(enToggle).not.toHaveAttribute("aria-current");
});

test("header marks the current route with aria-current=page", () => {
  wrap(<MstHeader dict={es} lang="es" />, "/about");
  const aboutLinks = screen.getAllByRole("link", { name: /nosotros/i });
  aboutLinks.forEach((link) => expect(link).toHaveAttribute("aria-current", "page"));
  const contactLinks = screen.getAllByRole("link", { name: /contacto/i });
  contactLinks.forEach((link) => expect(link).not.toHaveAttribute("aria-current"));
});

test("header in English points the brand to /en", () => {
  wrap(<MstHeader dict={en} lang="en" />, "/en");
  expect(screen.getByRole("link", { name: /atlas tech/i })).toHaveAttribute("href", "/en");
  expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/");
});

test("footer shows contact channels", () => {
  wrap(<MstFooter dict={es} />);
  expect(screen.getByRole("link", { name: "hola@atlastech.mx" })).toHaveAttribute("href", "mailto:hola@atlastech.mx");
  expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/527221495215");
  expect(screen.getByText("© 2026 Atlas Tech")).toBeInTheDocument();
});
