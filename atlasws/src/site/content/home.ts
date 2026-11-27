import type { Status } from "./status";

// Home — mensaje principal (valores del hero y moonshot fijados por el spec §3).
export const hero = {
  eyebrow: "Consulting as a Service · Atlas Cortex",
  title: "Consultoría que no entrega un PDF.",
  accent: "Entrega ejecución.",
  sub: "Consultores y agentes de IA que diagnostican tu empresa, arman el plan y lo ejecutan sobre tus sistemas. De la intención empresarial a la ejecución verificable.",
};

// Fila de cifras del hero. Las de operación son de Atlas ONE y lo dicen en su etiqueta:
// no deben leerse como tracción de Cortex. El pie de fuente va debajo de la fila.
export const heroStats: { value: string; label: string }[] = [
  { value: "$80.1M", label: "MXN en ventas registradas en Atlas ONE" },
  { value: "134,844", label: "tickets procesados en Atlas ONE" },
  { value: "$593.93", label: "ticket promedio en Atlas ONE" },
  { value: "13", label: "reconocimientos internacionales, 2016–2021" },
];

export const moonshot = {
  label: "Nuestro moonshot",
  title: "De agentes a",
  accent: "organizaciones sintéticas.",
  text: "Investigamos cómo personas, agentes, sistemas digitales y recursos físicos pueden coordinarse como una organización capaz de aprender y evolucionar, con propósito y responsabilidad humanos.",
  note: "Es nuestra apuesta de investigación, no una promesa de disponibilidad. Por eso en este sitio cada capacidad dice en qué etapa está.",
};

// Las cuatro familias del documento fundacional (§5), cada una con su estado real.
export const buildTitle = "De los sistemas agénticos a la infraestructura cognitiva.";

export const pillars: { title: string; text: string; status: Status }[] = [
  {
    title: "Sistemas agénticos",
    text: "Agentes conectados a tus datos, herramientas y procesos reales. Proponen, ejecutan acciones autorizadas y dejan evidencia.",
    status: "Validado",
  },
  {
    title: "Software autónomo",
    text: "Objetivos persistentes con ejecución acotada: permisos, presupuesto, escalamiento y condiciones de parada.",
    status: "En desarrollo",
  },
  {
    title: "Software autoevolutivo",
    text: "Mejora controlada de flujos y capacidades: cada cambio se prueba, se aprueba y puede revertirse.",
    status: "Investigación",
  },
  {
    title: "Sistemas operativos cognitivos",
    text: "Memoria, contexto, objetivos y coordinación de la organización en una sola capa. Atlas Cortex es nuestro MVP.",
    status: "MVP",
  },
];

export const closing = {
  title: "Cuéntanos qué quieres automatizar.",
  text: "Una llamada para entender tu operación y decirte con franqueza qué podemos ejecutar hoy.",
};
