import React from "react";
import { render, screen } from "@testing-library/react";
import { Production } from "../Production";
import { Ladder } from "../Ladder";
import { es } from "../../../../i18n/es";
import { en } from "../../../../i18n/en";

describe.each([["es", es], ["en", en]])("sections 05-06 in %s", (_, dict) => {
  test("Production: panel figure, four figures, source with cutoff", () => {
    const { container } = render(<Production dict={dict} />);
    const fig = container.querySelector("figure.mst-figure")!;
    expect(fig).toBeInTheDocument();
    expect(fig.querySelector("img")).toHaveAttribute("src", "/images/home/atlasone-metrics-crop.webp");
    expect(fig.querySelector("img")).toHaveAttribute("alt", dict.production.figureAlt);
    expect(container.querySelectorAll(".mst-stat-value")).toHaveLength(4);
    expect(screen.getByText(/09\.09\.2026/)).toBeInTheDocument();
  });

  test("Ladder: six ordered steps and close", () => {
    const { container } = render(<Ladder dict={dict} />);
    const ol = container.querySelector("ol.mst-grid-6")!;
    expect(ol.children).toHaveLength(6);
    expect(ol.children[0]).toHaveTextContent("01");
    expect(ol.children[5]).toHaveTextContent(dict.ladder.steps[5]);
    expect(screen.getByText(dict.ladder.close)).toBeInTheDocument();
  });
});
