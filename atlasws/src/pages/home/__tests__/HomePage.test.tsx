import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { HomePage } from "../HomePage";
import { es } from "../../../i18n/es";
import { en } from "../../../i18n/en";

const mount = (lang: "es" | "en") =>
  render(<MemoryRouter initialEntries={[lang === "en" ? "/en" : "/"]}><HomePage lang={lang} /></MemoryRouter>);

test("renders the nine bands plus contact inside .mst, in order", () => {
  const { container } = mount("es");
  const ids = Array.from(container.querySelectorAll("section")).map((s) => s.id);
  expect(ids).toEqual(["s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "contacto"]);
  expect(container.querySelector(".mst")).toBeInTheDocument();
  expect(container.querySelectorAll("hr.hr").length).toBeGreaterThanOrEqual(9);
});

test("marks the document theme while mounted and clears it on unmount", () => {
  const { unmount } = mount("es");
  expect(document.documentElement.dataset.theme).toBe("modernist");
  unmount();
  expect(document.documentElement.dataset.theme).toBeUndefined();
});

test("uses the English dictionary on /en", () => {
  mount("en");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(en.hero.title);
});

test("accent poster appears exactly once; only the founders photo is grayscale", () => {
  const { container } = mount("es");
  expect(container.querySelectorAll(".mst-poster")).toHaveLength(1);
  const founders = container.querySelector('img[src="/images/home/founders-intarg-2017.webp"]')!;
  expect(founders.closest(".grayscale")).not.toBeNull();
  const decorative = container.querySelectorAll(".mst-hero-bg img, .mst-band-bg img");
  expect(decorative).toHaveLength(2);
  decorative.forEach((img) => expect(img).toHaveAttribute("alt", ""));
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(es.hero.title);
});
