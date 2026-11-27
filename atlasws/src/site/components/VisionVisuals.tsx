import React from "react";
import { useDemo, useInView } from "../lib/motion";
import "./vision-visuals.css";

// Ilustraciones de la página de Visión. Son esquemas de la tesis, no capturas de producto.

/* ---------- Portada: variante "Moonshot" de la marca ---------- */
// Horizonte abajo, luna arriba a la derecha y una trayectoria punteada entre ambos.
export const MoonshotScene: React.FC = () => (
  <div className="moon" data-testid="vision-moonshot" aria-hidden="true">
    <div className="moon__arc" />
    <div className="moon__sky">
      <svg className="moon__path" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path d="M610 590 C 700 450, 790 280, 868 118" />
        <circle className="moon__probe" r="5">
          <animateMotion dur="9s" repeatCount="indefinite" path="M610 590 C 700 450, 790 280, 868 118" />
        </circle>
      </svg>
      <div className="moon__moon" />
    </div>
  </div>
);

/* ---------- Las siete capas, apiladas ---------- */
export const LayerStack: React.FC<{ layers: { n: string; name: string; current?: boolean }[] }> = ({ layers }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const rest = layers.findIndex((l) => l.current);
  const times = React.useMemo(() => layers.map(() => 1100), [layers]);
  const lit = useDemo(times, rest, inView);
  const now = rest;
  return (
    <div
      className="stack"
      ref={ref}
      data-testid="vision-stack"
      role="img"
      aria-label={`Esquema de las siete capas del software apiladas: ${layers.map((l) => l.name).join(", ")}. Hoy trabajamos en la capa ${layers[now].name}.`}
    >
      {/* La primera capa va abajo: el orden visual se invierte con CSS. */}
      {layers.map((l, i) => (
        <div
          key={l.n}
          aria-hidden="true"
          className={
            "stack__row" + (i <= now ? " is-built" : "") + (i === now ? " is-now" : "") + (i === lit ? " is-lit" : "")
          }
          style={{ "--i": i } as React.CSSProperties}
        >
          <span className="stack__plate" />
          <span className="stack__n data">{l.n}</span>
          <span className="stack__name">{l.name}</span>
        </div>
      ))}
    </div>
  );
};

/* ---------- Niveles de acción: qué pasa con cada tipo de acción ---------- */
const GATE = [
  { action: "Consultar el inventario", outcome: "Se ejecuta", tone: "ok" },
  { action: "Crear una tarea", outcome: "Se ejecuta, queda registrada y puede revertirse", tone: "ok" },
  { action: "Enviar una cotización", outcome: "Espera revisión humana", tone: "wait" },
  { action: "Hacer una transferencia", outcome: "Bloqueada para agentes", tone: "stop" },
];

export const ActionGate: React.FC<{ levels: { n: string; name: string }[] }> = ({ levels }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const times = React.useMemo(() => levels.map(() => 2600), [levels]);
  const step = useDemo(times, 2, inView);
  const g = GATE[step];
  return (
    <figure className="gate" data-testid="vision-gate">
      <div
        className="gate__box"
        ref={ref}
        role="img"
        aria-label="Esquema: un agente pide ejecutar una acción y el nivel de riesgo decide si se ejecuta, espera revisión humana o queda bloqueada."
      >
        <ol className="gate__levels" aria-hidden="true">
          {levels.map((l, i) => (
            <li key={l.n} className={i === step ? "is-on" : undefined} data-tone={GATE[i].tone}>
              <span className="data">{l.n}</span>
              {l.name}
            </li>
          ))}
        </ol>
        <div className="gate__flow" aria-hidden="true" key={step}>
          <div className="gate__cell">
            <span className="gate__cap">El agente pide</span>
            <span className="gate__action">{g.action}</span>
          </div>
          <span className="gate__arrow" />
          <div className="gate__cell gate__cell--out" data-tone={g.tone}>
            <span className="gate__cap">Resultado</span>
            <span className="gate__action">{g.outcome}</span>
          </div>
        </div>
      </div>
      <figcaption className="figure-note">Esquema ilustrativo de los niveles de acción.</figcaption>
    </figure>
  );
};

/* ---------- Hoja de ruta: dónde estamos ---------- */
export const RoadmapTrack: React.FC<{ phases: { years: string; name: string }[] }> = ({ phases }) => (
  <div className="track" data-testid="vision-track" aria-hidden="true">
    <span className="track__light" />
    <ol>
      {phases.map((p, i) => (
        <li key={p.years} className={i === 0 ? "is-now" : undefined}>
          <i />
          <span className="data">{p.years}</span>
          <strong>{p.name}</strong>
          {i === 0 && <em>Estamos aquí</em>}
        </li>
      ))}
    </ol>
  </div>
);
