import React from "react";
import { useDemo, useInView } from "../lib/motion";
import "./cortex-visuals.css";

// Ilustraciones de Atlas Cortex dibujadas en código (SVG y CSS), fieles al producto real:
// tipos de nodo y predicados del grafo, pasos del agente y tarjeta de aprobación tal como
// aparecen en la consola. No son capturas y no muestran cifras: son esquemas con datos de ejemplo.

/* ------------------------------------------------------------------ */
/* Grafo de conocimiento                                                */
/* ------------------------------------------------------------------ */
type Kind = "proyecto" | "cliente" | "persona" | "decision" | "proveedor" | "nota";

const KINDS: { kind: Kind; label: string }[] = [
  { kind: "proyecto", label: "Proyecto" },
  { kind: "cliente", label: "Cliente" },
  { kind: "persona", label: "Persona" },
  { kind: "decision", label: "Decisión" },
  { kind: "proveedor", label: "Proveedor" },
  { kind: "nota", label: "Nota" },
];

interface GNode {
  id: string;
  x: number;
  y: number;
  r: number;
  kind: Kind;
  label?: string;
}

const NODES: GNode[] = [
  { id: "p1", x: 280, y: 250, r: 15, kind: "proyecto", label: "Proyecto" },
  { id: "c1", x: 122, y: 150, r: 11, kind: "cliente", label: "Cliente" },
  { id: "pe1", x: 432, y: 132, r: 10, kind: "persona", label: "Persona" },
  { id: "pe2", x: 458, y: 332, r: 8, kind: "persona" },
  { id: "d1", x: 188, y: 382, r: 9, kind: "decision", label: "Decisión" },
  { id: "s1", x: 362, y: 432, r: 8, kind: "proveedor", label: "Proveedor" },
  { id: "p2", x: 92, y: 302, r: 8, kind: "proyecto" },
  { id: "n1", x: 60, y: 88, r: 3.5, kind: "nota" },
  { id: "n2", x: 204, y: 70, r: 4, kind: "nota" },
  { id: "n3", x: 312, y: 92, r: 3.5, kind: "nota" },
  { id: "n4", x: 504, y: 222, r: 4, kind: "nota" },
  { id: "n5", x: 520, y: 404, r: 3.5, kind: "nota" },
  { id: "n6", x: 262, y: 482, r: 4, kind: "nota" },
  { id: "n7", x: 70, y: 432, r: 3.5, kind: "nota" },
  { id: "n8", x: 152, y: 240, r: 4, kind: "nota" },
  { id: "n9", x: 382, y: 222, r: 4, kind: "nota" },
  { id: "n10", x: 332, y: 302, r: 3.5, kind: "nota" },
  { id: "n11", x: 232, y: 162, r: 3.5, kind: "nota" },
  { id: "n12", x: 474, y: 58, r: 3.5, kind: "nota" },
  { id: "n13", x: 38, y: 212, r: 3.5, kind: "nota" },
  { id: "n14", x: 424, y: 484, r: 3.5, kind: "nota" },
];

// Los predicados son los que Cortex escribe en las notas del vault.
const EDGES: { a: string; b: string; pred?: string; live?: boolean }[] = [
  { a: "p1", b: "c1", pred: "client", live: true },
  { a: "p1", b: "pe1", pred: "led_by", live: true },
  { a: "p1", b: "pe2", pred: "team_member" },
  { a: "p1", b: "d1", pred: "part_of", live: true },
  { a: "p1", b: "s1" },
  { a: "d1", b: "pe2", pred: "decision_maker" },
  { a: "c1", b: "p2" },
  { a: "c1", b: "n1" },
  { a: "c1", b: "n13" },
  { a: "c1", b: "n2" },
  { a: "pe1", b: "n12" },
  { a: "pe1", b: "n3" },
  { a: "pe1", b: "n4" },
  { a: "pe2", b: "n5" },
  { a: "d1", b: "n7" },
  { a: "d1", b: "n6" },
  { a: "s1", b: "n14" },
  { a: "p1", b: "n8" },
  { a: "p1", b: "n9" },
  { a: "p1", b: "n10" },
  { a: "p1", b: "n11" },
  { a: "p2", b: "n7" },
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export const KnowledgeGraph: React.FC = () => (
  <figure className="kgraph" data-testid="cortex-graph">
    <svg
      className="kgraph__svg"
      viewBox="0 0 560 540"
      role="img"
      aria-label="Ilustración del grafo de conocimiento de Cortex: un proyecto conectado con su cliente, personas, decisiones, proveedores y notas."
    >
      <defs>
        <radialGradient id="kg-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff6a1f" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff6a1f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="kgraph__halo" cx={byId.p1.x} cy={byId.p1.y} r="92" fill="url(#kg-halo)" />
      <g>
        {EDGES.map((e) => {
          const a = byId[e.a];
          const b = byId[e.b];
          return (
            <line
              key={e.a + e.b}
              className={"kgraph__edge" + (e.live ? " is-live" : "")}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
            />
          );
        })}
      </g>
      <g className="kgraph__pulses" aria-hidden="true">
        {EDGES.filter((e) => e.live || e.pred).map((e, i) => {
          const a = byId[e.a];
          const b = byId[e.b];
          return (
            <circle key={e.a + e.b} r="2.6">
              <animateMotion
                dur={`${2.6 + i * 0.5}s`}
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
                path={`M${a.x} ${a.y} L${b.x} ${b.y}`}
              />
            </circle>
          );
        })}
      </g>
      <g aria-hidden="true">
        {EDGES.filter((e) => e.pred).map((e) => {
          const a = byId[e.a];
          const b = byId[e.b];
          return (
            <text key={e.pred} className="kgraph__pred" x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 6} textAnchor="middle">
              {e.pred}
            </text>
          );
        })}
      </g>
      <g aria-hidden="true">
        {NODES.map((n, i) => (
          <g key={n.id} className="kgraph__n" style={{ animationDelay: `${i * 70}ms` }}>
            <circle className={`kgraph__node kgraph__node--${n.kind}`} cx={n.x} cy={n.y} r={n.r} />
            {n.label && (
              <text className="kgraph__label" x={n.x} y={n.y + n.r + 17} textAnchor="middle">
                {n.label}
              </text>
            )}
          </g>
        ))}
      </g>
    </svg>
    <figcaption className="kgraph__legend">
      {KINDS.map((k) => (
        <span key={k.kind} className="kgraph__key">
          <i className={`kgraph__dot kgraph__dot--${k.kind}`} />
          {k.label}
        </span>
      ))}
    </figcaption>
  </figure>
);

/* ------------------------------------------------------------------ */
/* Consola del agente                                                   */
/* ------------------------------------------------------------------ */
const NAV = ["Torre", "Agente", "Proyectos", "Cartera", "Directorio", "Grafo", "Infra"];
const STEPS = ["Buscó en el vault", "Leyó una nota", "Revisó tareas"];
const ASK = "Registra la decisión de la junta y crea la tarea de seguimiento.";

// Guion de la demo. Paso 0: la persona escribe · 1: envía · 2-4: pasos del agente ·
// 5: primera acción hecha · 6: propone y espera · 7: alguien confirma · 8: hecho.
const CONSOLE_TIMES = [1900, 800, 800, 800, 900, 1000, 2800, 700, 2400];
const CONSOLE_REST = 6;
const on = (cond: boolean) => (cond ? " is-on" : "");

export const AgentConsole: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const step = useDemo(CONSOLE_TIMES, CONSOLE_REST, inView);
  const confirmed = step >= 8;
  return (
    <figure className="console" data-testid="cortex-console" ref={ref} data-step={step}>
      <div
        className="console__win"
        role="img"
        aria-label="Demostración de la consola de Cortex: el agente muestra sus pasos, propone crear una tarea y espera la confirmación de una persona."
      >
        <div className="console__bar" aria-hidden="true">
          <span className="console__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="console__title">Cortex · Agente</span>
          <span className={"console__thinking" + on(step >= 2 && step <= 5)}>El agente está pensando…</span>
        </div>
        <div className="console__body" aria-hidden="true">
          <ul className="console__nav">
            {NAV.map((n) => (
              <li key={n} className={n === "Agente" ? "is-active" : undefined}>
                {n}
              </li>
            ))}
          </ul>
          <div className="console__chat">
            <p className={"console__msg console__fx" + on(step >= 1)}>{ASK}</p>

            <div className={"console__steps console__fx" + on(step >= 2)}>
              <span className="console__cap">Pasos del agente</span>
              <ul>
                {STEPS.map((st, i) => (
                  <li key={st} className={"console__fx" + on(step >= 2 + i)}>
                    {st}
                  </li>
                ))}
              </ul>
            </div>

            <div className={"console__card is-done console__fx" + on(step >= 5)}>
              <div className="console__card-head">
                <code>registrar_decision</code>
                <span className="console__state console__state--done">Hecho</span>
              </div>
            </div>

            <div className={"console__card console__fx" + (confirmed ? " is-done" : " is-waiting") + on(step >= 6)}>
              <div className="console__card-head">
                <code>crear_tarea</code>
                <span className={"console__state" + (confirmed ? " console__state--done" : "")}>
                  {confirmed ? "Hecho" : "Esperando tu confirmación"}
                </span>
              </div>
              <span className="console__cap">Vista previa</span>
              <dl className="console__preview">
                <div>
                  <dt>Título</dt>
                  <dd>Seguimiento de la junta</dd>
                </div>
                <div>
                  <dt>Proyecto</dt>
                  <dd>Implementación</dd>
                </div>
                <div>
                  <dt>Responsable</dt>
                  <dd>Dirección de operaciones</dd>
                </div>
              </dl>
              <pre className="console__diff">
                <span>+ tarea: Seguimiento de la junta</span>
                <span>+ estado: pendiente</span>
              </pre>
              <div className={"console__actions" + (confirmed ? " is-off" : "")}>
                <span className={"console__btn console__btn--ok" + (step === 7 ? " is-pressed" : "")}>Confirmar</span>
                <span className="console__btn">Rechazar</span>
              </div>
            </div>

            <div className={"console__input" + (step === 0 ? " is-typing" : "")}>
              {step === 0 ? <span className="console__typed">{ASK}</span> : "Pídele algo al agente…"}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="figure-note">Demostración de la interfaz con datos de ejemplo.</figcaption>
    </figure>
  );
};

/* ------------------------------------------------------------------ */
/* Equipo de agentes alrededor del orquestador                          */
/* ------------------------------------------------------------------ */
export const AgentOrbit: React.FC<{
  agents: string[];
  core?: { name: string; role: string };
  label?: string;
  testId?: string;
}> = ({ agents, core = { name: "Cortex", role: "Orquestador" }, label, testId = "cortex-orbit" }) => {
  const R = 37; // radio del anillo, en % del lado
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  // El orquestador "llama" a un agente a la vez; en reposo no resalta ninguno.
  const times = React.useMemo(() => agents.map(() => 1300), [agents]);
  const active = useDemo(times, -1, inView);
  return (
    <div
      className="orbit"
      ref={ref}
      data-testid={testId}
      role="img"
      aria-label={
        label ||
        `Esquema: Cortex como orquestador al centro y, alrededor, el equipo de agentes en desarrollo: ${agents.join(", ")}.`
      }
    >
      <svg className="orbit__svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="orbit__ring" cx="50" cy="50" r={R} />
        <circle className="orbit__ring orbit__ring--inner" cx="50" cy="50" r="19" />
        {agents.map((a, i) => {
          const t = ((22.5 + (360 / agents.length) * i) * Math.PI) / 180;
          return (
            <line
              key={a}
              className={"orbit__spoke" + (i === active ? " is-active" : "")}
              x1={50 + 12 * Math.sin(t)}
              y1={50 - 12 * Math.cos(t)}
              x2={50 + R * Math.sin(t)}
              y2={50 - R * Math.cos(t)}
            />
          );
        })}
      </svg>
      <div className="orbit__core" aria-hidden="true">
        <span className="orbit__core-name">{core.name}</span>
        <span className="orbit__core-role">{core.role}</span>
      </div>
      {agents.map((a, i) => {
        const t = ((22.5 + (360 / agents.length) * i) * Math.PI) / 180;
        return (
          <span
            key={a}
            className={"orbit__agent" + (i === active ? " is-active" : "")}
            aria-hidden="true"
            style={{ left: `${50 + R * Math.sin(t)}%`, top: `${50 - R * Math.cos(t)}%` }}
          >
            {a}
          </span>
        );
      })}
    </div>
  );
};
