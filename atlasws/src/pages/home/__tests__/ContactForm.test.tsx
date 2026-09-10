import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";
import { es } from "../../../i18n/es";

const fill = async () => {
  await userEvent.type(screen.getByLabelText("Nombre"), "Ana");
  await userEvent.type(screen.getByLabelText("Correo"), "ana@ejemplo.mx");
  await userEvent.type(screen.getByLabelText("Mensaje"), "Queremos operar con agentes.");
};

afterEach(() => { delete (global as any).fetch; });

test("posts JSON to the endpoint and shows the sent state", async () => {
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
  (global as any).fetch = fetchMock;
  render(<ContactForm dict={es} />);
  await fill();
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  await waitFor(() => expect(screen.getByText(es.contact.sent)).toBeInTheDocument());
  expect(fetchMock).toHaveBeenCalledWith("/api/contact.php", expect.objectContaining({ method: "POST" }));
  const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
  expect(body).toMatchObject({ name: "Ana", email: "ana@ejemplo.mx", website: "" });
});

test("shows the error state with direct fallbacks when the request fails", async () => {
  (global as any).fetch = jest.fn().mockRejectedValue(new Error("network"));
  render(<ContactForm dict={es} />);
  await fill();
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  await waitFor(() => expect(screen.getByText(es.contact.error)).toBeInTheDocument());
  expect(screen.getByRole("link", { name: "hola@atlastech.mx" })).toHaveAttribute("href", "mailto:hola@atlastech.mx");
  expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/527221495215");
});

test("treats a non-ok HTTP response as an error", async () => {
  (global as any).fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ ok: false, error: "invalid" }) });
  render(<ContactForm dict={es} />);
  await fill();
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  await waitFor(() => expect(screen.getByText(es.contact.error)).toBeInTheDocument());
});
