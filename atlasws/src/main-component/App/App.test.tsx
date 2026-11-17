import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Lenis maneja el scroll del navegador real; en jsdom no hay nada que suavizar.
// (Clase simple y no jest.fn(): CRA reinicia las implementaciones de los mocks entre pruebas.)
jest.mock("lenis", () => class {
  raf() {}
  destroy() {}
});
jest.mock("../../components/AtlasOneDemos/AtlasOneDemos", () => ({
  AtlasOneDemosPlayer: () => <div />,
}));

test("la app arranca en el Home con el mensaje de Cortex", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Consultoría que no entrega un PDF. Entrega ejecución."
  );
});
