// ============================================================
// Atlas en números — todas las cifras publicadas, agrupadas por origen.
// Cada grupo lleva su pie de fuente y periodo. No se agregan cifras sin fuente:
// los acumulados históricos de Atlas ONE entran aquí cuando los founders den el corte.
// ============================================================
import * as one from "./atlasOne";
import * as solutions from "./solutions";
import { awardsFigure } from "./nosotros";

export interface FigureGroup {
  id: string;
  title: string;
  items: { value: string; label: string }[];
  note: string;
}

const f0 = one.figures[0];

export const figureGroups: FigureGroup[] = [
  {
    id: "anual",
    title: "Atlas ONE · 2026",
    items: one.yearFigures,
    note: one.yearFiguresNote,
  },
  {
    id: "operacion",
    title: "Atlas ONE · últimos 90 días",
    items: one.figures.map((f) => ({ value: f.value, label: `${f.label} en Atlas ONE` })),
    note: `Fuente: ${f0.source}. Periodo: ${f0.period}. Corte: ${f0.cutoff}.`,
  },
  {
    id: "solutions",
    title: "Atlas Solutions · 2026",
    items: solutions.figures,
    note: solutions.figuresNote,
  },
  {
    id: "trayectoria",
    title: "Trayectoria",
    items: [
      { value: "2016", label: "año en que empezamos" },
      { value: awardsFigure.value, label: `${awardsFigure.label}, ${awardsFigure.period}` },
    ],
    note: `Fuente: ${awardsFigure.source}. Periodo: ${awardsFigure.period}.`,
  },
];

// Línea de tiempo: solo hechos que ya están publicados en el sitio.
export const timeline: { year: string; title: string; text: string }[] = [
  { year: "2016", title: "El inicio", text: "Empezamos a construir tecnología aplicada en Ciudad de México." },
  { year: "2017", title: "Medalla de plata", text: "Harvestt en INTARG, Katowice, Polonia." },
  { year: "2018", title: "Mejor invención de Norteamérica", text: "Harvestt en ICAN, Toronto, Canadá." },
  { year: "2019", title: "Medalla de oro", text: "ICAN, Canadá." },
  { year: "2021", title: "Medalla honoraria", text: "13 reconocimientos internacionales entre 2016 y 2021." },
  { year: "2026", title: "Operación y agentes", text: "Atlas ONE en 13 sucursales; Atlas Cortex en MVP." },
];
