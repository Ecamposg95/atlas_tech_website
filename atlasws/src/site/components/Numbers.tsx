import React from "react";
import { CountUp } from "../lib/motion";
import { figureGroups, timeline } from "../content/figures";
import "./numbers.css";

// Todas las cifras publicadas, por origen, cada grupo con su pie de fuente.
export const FigureGroups: React.FC = () => (
  <div className="numbers" data-testid="numbers">
    {figureGroups.map((g) => (
      <section className="numbers__group" key={g.id} data-group={g.id}>
        <h3 className="numbers__title">{g.title}</h3>
        <dl className="numbers__grid">
          {g.items.map((f) => (
            <div className="numbers__item" key={f.value + f.label}>
              <dt>
                <CountUp value={f.value} />
              </dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
        <p className="figure-note">{g.note}</p>
      </section>
    ))}
  </div>
);

// Línea de tiempo 2016–2026.
export const Timeline: React.FC = () => (
  <ol className="timeline" data-testid="timeline">
    {timeline.map((t) => (
      <li className="timeline__item" key={t.year}>
        <span className="timeline__year data">{t.year}</span>
        <h3>{t.title}</h3>
        <p>{t.text}</p>
      </li>
    ))}
  </ol>
);

// Franja en movimiento. El contenido se duplica para el bucle; la copia se oculta a lectores.
export const Marquee: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="marquee" data-testid="marquee">
    <div className="marquee__track">
      {[0, 1].map((k) => (
        <ul key={k} aria-hidden={k === 1 ? "true" : undefined}>
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);
