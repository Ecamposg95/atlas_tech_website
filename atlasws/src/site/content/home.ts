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
  title: "Empresas operadas por humanos y agentes.",
  text: "Hacer posible que cualquier empresa se convierta en una organización AI-native, operada por un equipo humano compacto y una red coordinada de agentes digitales.",
  note: "Es hacia donde vamos, no donde estamos. Por eso en este sitio cada capacidad dice en qué etapa está.",
};

export const pillars: { title: string; text: string }[] = [
  {
    title: "Sistemas agénticos",
    text: "Agentes que no solo responden: proponen, ejecutan y dejan evidencia, con una persona en cada punto de control.",
  },
  {
    title: "Ontologías de conocimiento",
    text: "Modelamos tu empresa —entidades, procesos, reglas— para que los agentes razonen sobre tu negocio y no sobre texto suelto.",
  },
  {
    title: "Tecnologías de frontera",
    text: "Integramos los modelos y herramientas más recientes en operación real. Somos una startup: probamos pronto y medimos todo.",
  },
];

export const closing = {
  title: "Cuéntanos qué quieres automatizar.",
  text: "Una llamada para entender tu operación y decirte con franqueza qué podemos ejecutar hoy.",
};
