import { waLink, isLeadComplete, leadMessage, mailtoLink, EMAIL } from "./whatsapp";

test("waLink codifica caracteres especiales", () => {
  const url = waLink("Café & más #1\nlínea 2 🚀");
  expect(url.startsWith("https://wa.me/527221495215?text=")).toBe(true);
  expect(decodeURIComponent(url.split("text=")[1])).toBe("Café & más #1\nlínea 2 🚀");
  expect(url.split("text=")[1]).not.toMatch(/[ #&\n]/);
});

test("isLeadComplete rechaza vacíos y espacios", () => {
  expect(isLeadComplete({ nombre: "Ana", empresa: "  ", objetivo: "cobranza" })).toBe(false);
  expect(isLeadComplete({ nombre: "Ana", empresa: "ACME", objetivo: "cobranza" })).toBe(true);
});

test("leadMessage incluye los tres campos", () => {
  expect(leadMessage({ nombre: "Ana", empresa: "ACME", objetivo: "cobranza" })).toBe(
    "Hola, soy Ana de ACME. Queremos automatizar: cobranza"
  );
});

test("mailtoLink apunta al correo de contacto y codifica asunto y cuerpo", () => {
  const url = mailtoLink("Llamada & demo", "línea 1\nlínea 2");
  expect(url.startsWith(`mailto:${EMAIL}?subject=`)).toBe(true);
  expect(url).toContain(encodeURIComponent("Llamada & demo"));
  expect(url).toContain(encodeURIComponent("línea 1\nlínea 2"));
});
