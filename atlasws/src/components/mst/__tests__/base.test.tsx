import React from "react";
import { render, screen } from "@testing-library/react";
import { Band } from "../Band";
import { Grid } from "../Grid";
import { StatRow } from "../StatRow";
import { AtlasMark } from "../AtlasMark";

test("Band renders numbered kicker, title, children, bleed and a 2px rule", () => {
  const { container } = render(
    <Band n="05" kicker="Producción real" title="Ya está en producción." bleed={<div data-testid="bleed" />}>
      <p>hijo</p>
    </Band>
  );
  const section = container.querySelector("section#s05")!;
  expect(section).toBeInTheDocument();
  expect(section.querySelector(".mst-kicker")).toHaveTextContent("05 · Producción real");
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Ya está en producción.");
  expect(screen.getByText("hijo")).toBeInTheDocument();
  const bleed = screen.getByTestId("bleed");
  expect(bleed.closest(".mst-wrap")).toBeNull();
  expect(section.querySelector("hr.hr")).toBeInTheDocument();
});

test("Grid renders equal cells with the cols class and chosen tag", () => {
  const { container } = render(
    <Grid cols={3} as="ol"><li>a</li><li>b</li><li>c</li></Grid>
  );
  const ol = container.querySelector("ol.mst-grid.mst-grid-3")!;
  expect(ol).toBeInTheDocument();
  expect(ol.children).toHaveLength(3);
});

test("StatRow renders four figures and the mandatory source caption", () => {
  const stats = [
    { value: "$80.1M", label: "Ventas" }, { value: "134,844", label: "Tickets" },
    { value: "$593.93", label: "Ticket promedio" }, { value: "13", label: "Sucursales" },
  ];
  const { container } = render(<StatRow stats={stats} source="Fuente: panel · corte 09.09.2026" />);
  expect(container.querySelectorAll(".mst-stat-value")).toHaveLength(4);
  expect(container.querySelector("figcaption")).toHaveTextContent("corte 09.09.2026");
});

test("StatRow refuses to render figures without a source", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<StatRow stats={[{ value: "1", label: "x" }]} source="  " />)).toThrow(/source/);
  spy.mockRestore();
});

test("AtlasMark is an inline svg on currentColor", () => {
  const { container } = render(<AtlasMark title="Atlas" />);
  const svg = container.querySelector("svg")!;
  expect(svg).toBeInTheDocument();
  expect(svg.querySelector("g")).toHaveAttribute("fill", "currentColor");
});
