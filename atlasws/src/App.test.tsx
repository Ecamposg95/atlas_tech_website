import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("la app arranca en el Home con el mensaje de Cortex", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Consultoría que no entrega un PDF. Entrega ejecución."
  );
});
