import React from "react";
import { render, screen } from "@testing-library/react";
import { RecordToAction } from "../RecordToAction";
import { Horizons } from "../Horizons";
import { Builders } from "../Builders";
import { es } from "../../../../i18n/es";
import { en } from "../../../../i18n/en";

describe.each([["es", es], ["en", en]])("sections 07-09 in %s", (_, dict) => {
  test("RecordToAction: two confronted columns and a single full-bleed poster", () => {
    const { container } = render(<RecordToAction dict={dict} />);
    const cols = container.querySelector(".mst-grid-2")!;
    expect(cols.children).toHaveLength(2);
    expect(cols.children[1].querySelector(".mst-list-accent")).toBeInTheDocument();
    const poster = container.querySelectorAll(".mst-poster");
    expect(poster).toHaveLength(1);
    expect(poster[0]).toHaveTextContent("From system of record to system of action.");
    expect(poster[0].closest(".mst-wrap")).toBeNull();
  });

  test("Horizons: three cells with status tags, Labs dashed", () => {
    const { container } = render(<Horizons dict={dict} />);
    const cells = container.querySelector(".mst-grid-3")!.children;
    expect(cells).toHaveLength(3);
    expect(container.querySelectorAll(".mst-cell-status .tag")).toHaveLength(3);
    expect(cells[2]).toHaveClass("mst-dashed");
    expect(cells[0]).not.toHaveClass("mst-dashed");
  });

  test("Builders: grayscale photo, three people, awards line, close", () => {
    const { container } = render(<Builders dict={dict} />);
    const fig = container.querySelector("figure.grayscale")!;
    expect(fig.querySelector("img")).toHaveAttribute("src", "/images/home/founders-intarg-2017.webp");
    expect(container.querySelectorAll(".mst-person-name")).toHaveLength(3);
    expect(screen.getByText(dict.builders.awards)).toBeInTheDocument();
    expect(screen.getByText(dict.builders.close)).toBeInTheDocument();
  });
});
