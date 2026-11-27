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
  { when: "Hoy", text: "Construimos sistemas agénticos.", status: "Validado" },
  { when: "Siguiente", text: "Desarrollamos software autónomo y autoevolutivo.", status: "En desarrollo" },
  { when: "Nuestra plataforma", text: "Construimos hacia sistemas operativos cognitivos.", status: "MVP" },
  { when: "Nuestro moonshot", text: "Investigamos las organizaciones sintéticas.", status: "Investigación" },
];

// Las siete capas del software (brochure 2026, p. 02). No se sustituyen: se apilan.
export const era = {
  label: "La próxima era del software",
  title: "Primero digitalizamos registros.",
  accent: "Ahora el software actúa.",
  text: "La IA permite que el software interprete situaciones, formule planes y ejecute acciones. Estas capas no se sustituyen: la inteligencia probabilística complementa la integridad transaccional, nunca la erosiona.",
};

export const layers: { n: string; name: string; text: string; atlas: string; current?: boolean }[] = [
  { n: "01", name: "Determinista", text: "Ejecuta reglas: contabilidad, inventario, autorizaciones.", atlas: "Base" },
  { n: "02", name: "Generativo", text: "Produce artefactos: textos, código, análisis.", atlas: "Base" },
  { n: "03", name: "Agéntico", text: "Planifica y actúa mediante herramientas autorizadas.", atlas: "Hoy", current: true },
  { n: "04", name: "Autónomo", text: "Persigue objetivos persistentes dentro de políticas.", atlas: "Siguiente" },
  { n: "05", name: "Autoevolutivo", text: "Mejora capacidades mediante evaluación controlada.", atlas: "Siguiente" },
  { n: "06", name: "Cognitivo", text: "Integra memoria, objetivos, simulación y coordinación.", atlas: "Plataforma" },
  { n: "07", name: "Organización sintética", text: "Usa todas las capas como arquitectura institucional.", atlas: "Moonshot" },
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

// Gobernanza (brochure 2026, p. 09): qué puede hacer un agente según el riesgo de la acción.
export const governance = {
  label: "Gobernanza",
  title: "Confianza por diseño.",
  accent: "Autonomía con responsabilidad.",
  text: "La autonomía se concede por capacidad y contexto, nunca por una etiqueta comercial. Cada herramienta tiene esquema, permisos, tiempo límite, clasificación de riesgo y registro de ejecución.",
};

export const actionLevels: { n: string; name: string; text: string }[] = [
  { n: "N1", name: "Lectura", text: "Bajo riesgo." },
  { n: "N2", name: "Escritura reversible", text: "Con registro y posibilidad de revertir." },
  { n: "N3", name: "Operación sensible", text: "Revisión humana según el riesgo." },
  { n: "N4", name: "Prohibida para agentes", text: "Transferencias, permisos y despliegues críticos." },
];

export const controls: string[] = [
  "Identidad humana y de agente separadas",
  "Mínimo privilegio y autorización del lado del servidor",
  "Aislamiento entre organizaciones",
  "Secretos fuera de las instrucciones del agente",
  "Interruptor de paro, recuperación y reversión",
  "Auditoría basada en evidencia observable",
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
    years: "2035–2040+",
    name: "Moonshot",
    goal: "Demostraciones de organizaciones sintéticas.",
    gate: "Viabilidad técnica, económica, humana y jurídica.",
  },
];

export const labs = {
  label: "Atlas Labs",
  title: "Las preguntas que investigamos.",
  text: "Atlas Labs es nuestra unidad de investigación aplicada, en formación e inicialmente virtual: IA, cibernética, sistemas complejos, teoría organizacional, métodos formales y simulación.",
  status: "Investigación" as Status,
};

export const labsMethod: string[] = [
  "Hipótesis y métricas definidas de antemano",
  "Comparación con alternativas simples",
  "Incertidumbre y resultados negativos reportados",
  "Datos de clientes solo con autorización contractual",
];

export const researchLines: { name: string; question: string; experiment: string }[] = [
  { name: "Memoria", question: "¿Qué representación del conocimiento mejora las decisiones repetidas?", experiment: "RAG frente a memoria estructurada y grafo." },
  { name: "Autonomía", question: "¿Cuánto trabajo puede completarse bien sin intervención?", experiment: "Tareas durables con fallos inducidos." },
  { name: "Evolución", question: "¿Puede un agente mejorar un flujo de trabajo sin introducir regresiones?", experiment: "Candidatos evaluados en un entorno aislado." },
  { name: "Simulación", question: "¿Qué modelos anticipan mejor los resultados operativos?", experiment: "Contraste de escenarios de inventario con datos históricos." },
  { name: "Coordinación", question: "¿Cuándo aporta valor un equipo de agentes frente a uno solo?", experiment: "Agente único frente a equipo de agentes." },
  { name: "Gobernanza", question: "¿Qué controles reducen las acciones indebidas?", experiment: "Pruebas adversariales de permisos." },
  { name: "Inteligencia física", question: "¿Cómo se adapta un controlador a condiciones cambiantes?", experiment: "Experimentos controlados en Harvestt." },
];

export const closing = {
  title: "Construimos para hoy.",
  accent: "Investigamos para mañana.",
  text: "Si tu organización quiere resolver un problema concreto o colaborar en investigación, hablemos.",
};
