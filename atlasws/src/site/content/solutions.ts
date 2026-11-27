// ============================================================
// Atlas Solutions — ingeniería a la medida, integración y consultoría.
// Fuente: brochure institucional 2026 (p. 08). Cifras autorizadas en la skill de marca;
// llevan fuente y periodo. Falta la fecha de corte exacta (pendiente de los founders).
// ============================================================
import type { Status } from "./status";

export const solutionsStatus: Status = "Validado";

export const head = {
  label: "Atlas Solutions",
  title: "Ingeniería aplicada",
  accent: "a cada reto.",
  text: "Ingeniería a la medida, integración y consultoría. Cada entregable tiene criterios de aceptación y condiciones de soporte explícitas, y cada proyecto alimenta componentes reutilizables.",
};

export const figures: { value: string; label: string }[] = [
  { value: "7", label: "clientes enterprise" },
  { value: "25", label: "integraciones activas" },
  { value: "100+", label: "usuarios directos" },
  { value: "2 sem", label: "a un primer MVP" },
];

export const figuresNote = "Fuente: Atlas Tech, datos internos. Periodo: 2026.";

export const method: { n: string; name: string; text: string }[] = [
  { n: "01", name: "Diagnóstico", text: "Elegimos el proceso y definimos riesgos y criterios de aceptación." },
  { n: "02", name: "Línea base", text: "Medimos el punto de partida para comparar con evidencia." },
  { n: "03", name: "Piloto en observación", text: "El sistema propone; las personas deciden." },
  { n: "04", name: "Acciones limitadas", text: "Habilitamos ejecución acotada, auditada y reversible." },
  { n: "05", name: "Revisión continua", text: "Comparamos contra la línea base y documentamos los hallazgos." },
];

export const cases: string[] = [
  "Análisis documental y licitaciones",
  "Cotizaciones y propuestas",
  "Clasificación de productos",
  "Seguimiento de cartera y cobranza",
];

export const models: string[] = [
  "Licencia SaaS",
  "Implementación y consultoría",
  "Consumo para ejecución intensiva",
  "Servicios gestionados",
];
