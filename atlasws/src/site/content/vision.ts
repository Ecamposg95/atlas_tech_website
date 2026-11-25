// ============================================================
// Visión — tesis de largo plazo de Atlas Tech.
// Fuente: documento fundacional "The Road to Synthetic Organizations" v1.0 (nov. 2026),
// traducido al español. Todo lo que no existe hoy se marca como investigación o
// escenario: el moonshot no es una promesa de disponibilidad.
// No publicar Project Genesis, SOMM, OCGR ni VAO hasta que se validen.
// ============================================================
import type { Status } from "./status";

export const tagline = "Ingeniería para el futuro de las organizaciones.";

export const head = {
  label: "Visión",
  title: "Ingeniería para el futuro de las",
  accent: "organizaciones.",
  text: "Construimos sistemas agénticos que resuelven problemas reales y generan ingresos hoy. Con eso financiamos la investigación de cómo podrán operar, aprender y evolucionar las organizaciones de mañana.",
};

export interface Stage {
  when: string;
  text: string;
  status: Status;
}

// Declaración final del documento (§28), cada tiempo con su estado real.
export const stages: Stage[] = [
  { when: "Hoy", text: "Construimos sistemas agénticos.", status: "MVP" },
  { when: "Siguiente", text: "Desarrollamos software autónomo y autoevolutivo.", status: "En desarrollo" },
  { when: "Nuestra plataforma", text: "Construimos hacia sistemas operativos cognitivos.", status: "MVP" },
  { when: "Nuestro moonshot", text: "Investigamos las organizaciones sintéticas.", status: "Investigación" },
];

export const manifesto: string[] = [
  "Los agentes son el inicio de una transición, no su punto final.",
  "Una organización no es una colección de aplicaciones: es un sistema de conocimiento, decisiones, relaciones, recursos y objetivos que cambia con el tiempo.",
  "El conocimiento no debería irse cuando una persona deja la empresa, y cada decisión debería poder contrastarse con sus consecuencias.",
  "Investigamos sobre problemas reales. No confundimos acceso a datos con derecho a reutilizarlos.",
  "Autonomía sin responsabilidad no es progreso: identidad, permisos, evidencia, supervisión y la posibilidad de intervenir.",
  "Las personas conservan la autoridad sobre el propósito y sobre las decisiones que exigen responsabilidad humana.",
];

export const definition = {
  title: "Qué es una organización sintética.",
  text: "Una arquitectura organizacional formada por personas, agentes inteligentes, sistemas computacionales y recursos físicos, coordinados mediante objetivos compartidos, conocimiento persistente, gobernanza y mecanismos de adaptación.",
  note: "Usamos el término como hipótesis de ingeniería, no como categoría científica ni forma jurídica. Una empresa con muchos agentes no se vuelve por eso una organización sintética: hace falta coordinación, responsabilidad, memoria y aprendizaje colectivo verificable.",
};

export const principles: { name: string; text: string }[] = [
  { name: "Percepción", text: "Captar eventos relevantes y distinguir evidencia de inferencia." },
  { name: "Memoria", text: "Conservar conocimiento con procedencia y vigencia." },
  { name: "Agencia", text: "Actuar solo con herramientas autorizadas." },
  { name: "Autonomía", text: "Sostener objetivos dentro de límites." },
  { name: "Adaptación", text: "Cambiar de estrategia según los resultados." },
  { name: "Evolución", text: "Desarrollar capacidades nuevas mediante pruebas." },
  { name: "Coordinación", text: "Resolver dependencias entre personas y agentes." },
  { name: "Gobernanza", text: "Asignar autoridad, responsabilidad y control." },
];

export const notGoals: string[] = [
  "Reemplazar personas de forma indiscriminada.",
  "Crear entidades sin responsabilidad jurídica.",
  "Maximizar la autonomía como fin en sí mismo.",
  "Que un agente pueda cambiar sus propios permisos.",
  "Presentar una simulación de departamentos como prueba de una organización que funciona.",
];

export const horizons: { n: string; name: string; text: string; measure: string }[] = [
  {
    n: "H1",
    name: "Motor de ingresos",
    text: "Productos, implementaciones y consultoría que hoy resuelven problemas y se cobran.",
    measure: "Margen, cobranza, retención y tiempo de entrega.",
  },
  {
    n: "H2",
    name: "Motor tecnológico",
    text: "Componentes reutilizables, autonomía gobernada y Atlas Cortex.",
    measure: "Reutilización, esfuerzo de implementación, confiabilidad y costo de ejecución.",
  },
  {
    n: "H3",
    name: "Moonshot",
    text: "Investigación de organizaciones sintéticas: simulación, aprendizaje colectivo y evolución.",
    measure: "Experimentos reproducibles, hipótesis descartadas y capacidades demostradas.",
  },
];

export const roadmapNote = "Las fechas son escenarios de planificación, no predicciones. Se revisan cada semestre.";

export const roadmap: { years: string; name: string; goal: string; gate: string }[] = [
  {
    years: "2026–2027",
    name: "Fundamentos",
    goal: "Oferta agéntica, MVP de Cortex y estándares de seguridad.",
    gate: "Casos comerciales aceptados y línea base documentada.",
  },
  {
    years: "2027–2029",
    name: "Adaptación",
    goal: "Memoria, objetivos, flujos durables y evolución controlada.",
    gate: "Mejoras reproducibles sin regresiones críticas.",
  },
  {
    years: "2029–2032",
    name: "Cognición",
    goal: "Simulación y coordinación entre áreas.",
    gate: "Evidencia de valor en varias áreas, con gobernanza.",
  },
  {
    years: "2032–2035",
    name: "Arquitectura sintética",
    goal: "Pilotos de organizaciones híbridas.",
    gate: "Resultados longitudinales y evaluación independiente cuando sea viable.",
  },
  {
    years: "2035–2040",
    name: "Moonshot",
    goal: "Demostraciones de organizaciones sintéticas.",
    gate: "Viabilidad técnica, económica, humana y jurídica.",
  },
];

export const labs = {
  label: "Atlas Labs",
  title: "Las preguntas que investigamos.",
  text: "Atlas Labs es nuestra unidad de investigación aplicada. Cada línea parte de una hipótesis, se compara contra alternativas simples y documenta también los resultados negativos.",
  status: "Investigación" as Status,
};

export const researchLines: { name: string; question: string }[] = [
  { name: "Memoria", question: "¿Qué representación del conocimiento mejora las decisiones repetidas?" },
  { name: "Autonomía", question: "¿Cuánto trabajo puede completarse bien sin intervención?" },
  { name: "Evolución", question: "¿Puede un agente mejorar un flujo de trabajo sin introducir regresiones?" },
  { name: "Simulación", question: "¿Qué modelos anticipan mejor los resultados operativos?" },
  { name: "Coordinación", question: "¿Cuándo aporta valor un equipo de agentes frente a uno solo?" },
  { name: "Gobernanza", question: "¿Qué controles reducen las acciones indebidas?" },
  { name: "Inteligencia física", question: "¿Cómo se adapta un controlador a condiciones cambiantes? Lo probamos en Harvestt." },
];

export const closing = {
  title: "Construimos para hoy.",
  accent: "Investigamos para mañana.",
  text: "Si tu organización quiere resolver un problema concreto o colaborar en investigación, hablemos.",
};
