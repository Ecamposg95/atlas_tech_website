// ============================================================
// Atlas ONE — contenido del producto en producción.
// Cifras: solo las autorizadas, siempre con fuente, periodo y corte.
// ============================================================
import type { Status } from "./status";

export const atlasOneStatus: Status = "Validado";

export const head = {
  title: "El problema no es cobrar — es operar sin visibilidad.",
  text: "Atlas ONE es la suite todo-en-uno para operar, vender, controlar y escalar negocios físicos desde una sola plataforma. Empiezas con el punto de venta y activas módulos conforme creces.",
};

export interface Figure {
  value: string;
  label: string;
  source: string;
  period: string;
  cutoff: string;
}

const SOURCE = { source: "datos de operación de Atlas ONE", period: "90 días", cutoff: "09.09.2026" };

export const figures: Figure[] = [
  { value: "$80.1M MXN", label: "en ventas registradas", ...SOURCE },
  { value: "134,844", label: "tickets procesados", ...SOURCE },
  { value: "$593.93", label: "ticket promedio", ...SOURCE },
];

// Cifras anuales (brochure 2026, p. 06; autorizadas en la skill de marca).
// Llevan fuente y periodo; falta la fecha de corte exacta (pendiente de los founders).
export const yearFigures: { value: string; label: string }[] = [
  { value: "$350M MXN", label: "procesados en la plataforma durante 2026" },
  { value: "13", label: "sucursales activas operando sobre Atlas ONE" },
];
export const yearFiguresNote = "Fuente: datos de operación de Atlas ONE. Periodo: 2026.";

export const modules: { name: string; text: string; status: Status }[] = [
  { name: "Punto de venta y caja", text: "Cobro rápido, apertura y cierre, arqueo y cortes por turno.", status: "Validado" },
  { name: "Inventario y catálogo", text: "Existencias, kardex, variantes, etiquetas y lectura por cámara.", status: "Validado" },
  { name: "Clientes y CRM", text: "Historial, recurrencia, cotizaciones y estado de cuenta.", status: "Validado" },
  { name: "Restaurante, café y bar", text: "Mesas, comandas, cocina, recetas con costeo y control de botellas.", status: "Validado" },
  { name: "Citas y servicios", text: "Agenda, comisiones y membresías para barberías, estética y consultorios.", status: "Validado" },
  { name: "Multi-sucursal", text: "Varias sucursales, roles y permisos desde una sola cuenta.", status: "Validado" },
  { name: "Atlas ONE AI", text: "Copilotos y predicciones sobre tu operación: qué comprar, quién dejó de venir, dónde se pierde margen.", status: "En desarrollo" },
];

// Atlas Core: el núcleo de Atlas ONE (en los repos, Atlas BOS). Cada otro software de
// Atlas es un módulo que se activa sobre él. Estados según los repos al 25.11.2026.
export const core = {
  label: "Atlas Core",
  title: "Un núcleo. Cada software, un módulo.",
  text: "Atlas ONE se construye sobre Atlas Core: el núcleo API-first que comparten todos nuestros sistemas, con usuarios y roles, productos, inventario, ventas, caja y la estructura de datos. Encima se activan módulos y presets por giro, y sobre la misma base construimos las implementaciones a la medida de Atlas Solutions.",
  modules: [
    { name: "Atlas Financials", text: "Finanzas y contabilidad sin saber contabilidad: registras en tu lenguaje y por debajo corre la partida doble.", status: "MVP" },
    { name: "Atlas Booking", text: "Reservas y agenda: eliges profesional, ves disponibilidad real y confirmas la cita.", status: "MVP" },
    { name: "Print Agent", text: "Impresión de tickets y etiquetas desde la caja, en producción en Atlas ONE.", status: "Validado" },
  ] as { name: string; text: string; status: Status }[],
};

export const verticalsLine =
  "Una barbería, una ferretería y un restaurante no operan igual. El software tampoco debería sentirse igual.";

export const verticals: string[] = [
  "Punto de venta",
  "Retail y ferretería",
  "Barbería",
  "Belleza y estética",
  "Salud y consultorios",
  "Restaurante",
  "Cafetería",
  "Bar",
  "Servicios técnicos",
  "Enterprise",
  "Custom",
];

export const pricing = {
  from: "Desde $12 MXN al día",
  trial: "1 mes gratis",
  text: "Un mes para validar en operación real. Crece dentro del sistema, sin reinstalar nada: cada mejora es activación, no migración.",
};

export const stack: string[] = ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "PWA"];

export const landingUrl = "https://atlasone.com.mx";

export const bridgeToCortex = {
  title: "Los órganos y el cerebro.",
  text: "Atlas ONE registra lo que pasa en tu negocio. Atlas Cortex lo entiende, planea y ejecuta. Juntos son la base de una empresa operada por humanos y agentes.",
};
