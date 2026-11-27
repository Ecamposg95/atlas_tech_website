// ============================================================
// Atlas Cortex — contenido. Cada capacidad declara su estado real:
// nada de roadmap presentado como hecho (ver spec §7).
// ============================================================
import type { Status } from "./status";

export const cortexStatus: Status = "MVP";

export const tagline = "De la intención empresarial a la ejecución verificable.";

export const intro = {
  title: "Consultoría como servicio, ligada al software.",
  text: "Una consultora tradicional entrega un diagnóstico y se va. Con Cortex, nuestro equipo y nuestros agentes de IA trabajan sobre la misma plataforma: entienden tu operación, arman el plan contigo y lo llevan a ejecución dentro de tus sistemas, con evidencia de cada paso.",
  points: [
    {
      title: "Nuestro equipo + agentes",
      text: "La consultoría la entrega hoy el equipo de Atlas Tech, apoyado en Cortex. No es un módulo de autoservicio: es un servicio continuo con personas responsables.",
    },
    {
      title: "Servicio continuo",
      text: "En lugar de un entregable único, un ciclo permanente: actúa, registra, aprende y se reconstruye.",
    },
    {
      title: "Ejecución con evidencia",
      text: "Cada acción queda trazada: qué se propuso, quién lo aprobó y qué resultado tuvo.",
    },
  ],
};

// Texto de la sección que muestra la consola (lo que hoy hace el agente, verificado en el repo).
export const consoleIntro = {
  title: "El agente propone. Una persona confirma.",
  text: "El agente busca en la memoria de la organización, muestra cada paso que dio y prepara la acción con su vista previa. Nada se escribe hasta que alguien la confirma, y cada acción queda en la auditoría.",
};

export interface Step {
  n: string;
  title: string;
  text: string;
}

export const steps: Step[] = [
  { n: "01", title: "Diagnóstico", text: "Entendemos tu operación y la modelamos: entidades, procesos, decisiones y reglas." },
  { n: "02", title: "Plan", text: "Objetivos, procesos y responsables. Qué hace una persona y qué hace un agente." },
  { n: "03", title: "Ejecución", text: "El agente propone cada acción y tú la apruebas; nuestro equipo la lleva a tus sistemas, bajo tus reglas." },
  { n: "04", title: "Evidencia", text: "Cada resultado queda trazado y medido, y alimenta el siguiente ciclo." },
];

export interface Capability {
  name: string;
  text: string;
  status: Status;
  group: "hoy" | "construccion" | "vision";
}

export const groupTitles: Record<Capability["group"], string> = {
  hoy: "Hoy",
  construccion: "En construcción",
  vision: "Visión",
};

export const capabilities: Capability[] = [
  { group: "hoy", status: "MVP", name: "Memoria por organización", text: "Tus documentos y conocimiento, consultables por los agentes y aislados por empresa." },
  { group: "hoy", status: "MVP", name: "Grafo de entidades", text: "Clientes, proyectos, personas y decisiones conectados, no dispersos en carpetas." },
  { group: "hoy", status: "MVP", name: "CRM, OKRs, KPIs y decisiones", text: "El tablero operativo de la empresa en un solo lugar." },
  { group: "hoy", status: "MVP", name: "Motor de políticas con auditoría", text: "Quién puede hacer qué, por rol y por acción, con registro de cada cambio." },
  { group: "hoy", status: "MVP", name: "Agente que propone, persona que confirma", text: "El agente prepara la acción; nada se escribe sin tu aprobación." },
  { group: "construccion", status: "En desarrollo", name: "Flujos agénticos con aprobación", text: "Procesos de varios pasos que el agente ejecuta y tú autorizas en los puntos de control." },
  { group: "construccion", status: "En desarrollo", name: "Equipo de agentes especializados", text: "Agentes por función, coordinados por Cortex como orquestador." },
  { group: "vision", status: "Concepto", name: "Integraciones con ERPs de terceros", text: "Operar sobre los sistemas que tu empresa ya usa, sin obligarte a cambiarlos." },
  { group: "vision", status: "Concepto", name: "Aprendizaje de decisiones", text: "Que cada caso cerrado se convierta en memoria reutilizable." },
  { group: "vision", status: "Concepto", name: "Operación autónoma dentro de política", text: "Ejecución sin aprobación caso por caso, dentro de límites definidos por personas." },
  { group: "vision", status: "Investigación", name: "Ontología formal de la empresa", text: "Un modelo explícito del negocio sobre el que los agentes razonan." },
  { group: "vision", status: "Investigación", name: "GraphRAG", text: "Respuestas que combinan el grafo de conocimiento con los documentos." },
];

// Alcance del MVP y su criterio de salida (brochure 2026, p. 07).
export const mvpScope: { name: string; exit: string }[] = [
  { name: "Ingesta", exit: "Documentos indexados con fuente, versión y permisos." },
  { name: "Recuperación", exit: "Respuestas evaluadas y citas verificables." },
  { name: "Herramientas", exit: "Acciones registradas, validadas y limitadas por rol." },
  { name: "Memoria", exit: "Contexto persistente útil, sin fuga entre organizaciones." },
  { name: "Flujos", exit: "Reanudación tras fallos y escalamiento de excepciones." },
  { name: "Gobernanza", exit: "Revocación, auditoría y aprobación de acciones sensibles." },
  { name: "Evaluación", exit: "Línea base y conjunto de regresión antes de liberar cambios." },
];

export const mvpSuccess =
  "Que una organización encuentre conocimiento confiable y ejecute procesos delimitados mejor que con su flujo anterior.";
export const mvpLater =
  "Aprendizaje de pesos, simulación integral de empresas y generación autónoma de módulos son investigación posterior: no forman parte del MVP.";

export const agentsTitle = "El equipo de agentes que estamos construyendo";
export const agentsNote =
  "Hoy Cortex opera con un agente dentro de la plataforma. Este es el equipo por función que estamos diseñando sobre él.";

export const agents: { name: string; role: string; status: Status }[] = [
  { name: "CFO", role: "Flujo de caja, cobranza y cierre.", status: "En desarrollo" },
  { name: "Ventas", role: "Pipeline, seguimiento y cotizaciones.", status: "En desarrollo" },
  { name: "Compras", role: "Proveedores, órdenes y reabasto.", status: "En desarrollo" },
  { name: "Operaciones", role: "Procesos, inventario y cumplimiento de entregas.", status: "En desarrollo" },
  { name: "Customer Success", role: "Retención, renovaciones y atención.", status: "En desarrollo" },
  { name: "Cumplimiento", role: "Políticas, auditoría y evidencia.", status: "En desarrollo" },
  { name: "Project Manager", role: "Planes, responsables y fechas.", status: "En desarrollo" },
  { name: "Analista de datos", role: "KPIs, hallazgos y reportes.", status: "En desarrollo" },
];

export const autonomyLevels: { name: string; text: string; status: Status; current: boolean }[] = [
  { name: "Observa", text: "Lee la operación y señala lo que requiere atención.", status: "MVP", current: false },
  { name: "Propone", text: "Prepara la acción completa y espera tu confirmación.", status: "MVP", current: true },
  { name: "Ejecuta con aprobación", text: "Corre flujos de varios pasos y se detiene en los puntos de control.", status: "En desarrollo", current: false },
  { name: "Ejecuta en política", text: "Actúa por su cuenta dentro de límites que definen las personas.", status: "Concepto", current: false },
];

export const principles: { title: string; text: string }[] = [
  { title: "Autoridad humana", text: "Las personas definen las reglas y conservan la última palabra." },
  { title: "Contexto antes que autonomía", text: "Un agente solo actúa sobre lo que entiende. Primero el modelo de la empresa, después la ejecución." },
  { title: "Autonomía progresiva", text: "Cada nivel se gana con evidencia del anterior." },
  { title: "Evidencia por defecto", text: "Toda acción deja rastro: qué, quién, cuándo y con qué resultado." },
];

export const manifesto: string[] = [
  "Nativo de IA. No una app con IA encima.",
  "Un cerebro, no diez herramientas dispersas.",
  "Humanos y agentes: un solo equipo.",
  "De la intención al resultado, con trazabilidad.",
];

export const orchestratorLine = "Cortex no es un agente más: es el orquestador.";

export const bridgeToOne =
  "Atlas ONE proporciona los órganos y sistemas de la empresa; Atlas Cortex el cerebro, la memoria y el sistema nervioso.";
