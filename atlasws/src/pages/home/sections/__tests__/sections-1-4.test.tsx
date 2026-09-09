import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";
import { Pattern } from "../Pattern";
import { Thesis } from "../Thesis";
import { Stack } from "../Stack";
import { es } from "../../../../i18n/es";
import { en } from "../../../../i18n/en";

describe.each([["es", es], ["en", en]])("sections 01-04 in %s", (_, dict) => {
  test("Hero: h1, lead, meta and a single external primary CTA", () => {
    const { container } = render(<Hero dict={dict} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(dict.hero.title);
    expect(screen.getByText(dict.hero.meta)).toBeInTheDocument();
    const ctas = container.querySelectorAll("a.btn-primary");
    expect(ctas).toHaveLength(1);
    expect(ctas[0]).toHaveAttribute("href", "https://atlasone.com.mx/");
    expect(ctas[0]).toHaveAttribute("target", "_blank");
    expect(ctas[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("Pattern: four industries, six symptoms, close line", () => {
    const { container } = render(<Pattern dict={dict} />);
    expect(container.querySelector(".mst-grid-4")!.children).toHaveLength(4);
    const symptoms = container.querySelectorAll(".mst-grid-3");
    expect(symptoms).toHaveLength(2);
    expect(screen.getByText(dict.pattern.close)).toBeInTheDocument();
  });

  test("Thesis: three numbered items and close", () => {
    const { container } = render(<Thesis dict={dict} />);
    expect(container.querySelectorAll(".mst-cell-n")).toHaveLength(3);
    expect(screen.getByText(dict.thesis.close)).toBeInTheDocument();
  });

  test("Stack: three layers top-down 03→01, only Cortex carries the accent", () => {
    const { container } = render(<Stack dict={dict} />);
    const layers = container.querySelectorAll(".mst-layer");
    expect(layers).toHaveLength(3);
    expect(layers[0]).toHaveTextContent("Atlas Cortex");
    expect(layers[2]).toHaveTextContent("Atlas ONE");
    expect(container.querySelectorAll(".mst-layer-accent")).toHaveLength(1);
    expect(layers[0].querySelectorAll(".tag-accent")).toHaveLength(6);
    expect(layers[2].querySelectorAll(".tag-neutral")).toHaveLength(8);
  });
});
