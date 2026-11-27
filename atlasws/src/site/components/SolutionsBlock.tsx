import React from "react";
import StatusTag from "./StatusTag";
import CtaButton from "./CtaButton";
import * as s from "../content/solutions";

// Atlas Solutions: versión compacta (Home) o completa con metodología (Portafolio).
const SolutionsBlock: React.FC<{ full?: boolean }> = ({ full }) => (
  <>
    <div className="split">
      <div>
        <StatusTag status={s.solutionsStatus} />
        <h2 className="split__title">
          {s.head.title} <em className="accent">{s.head.accent}</em>
        </h2>
      </div>
      <div>
        <p className="lead">{s.head.text}</p>
        {!full && (
          <div className="cta-row">
            <CtaButton to="/portafolio#solutions" variant="secondary">
              Cómo trabajamos
            </CtaButton>
          </div>
        )}
      </div>
    </div>
    <dl className="figures figures--four section__block" data-testid="solutions-figures">
      {s.figures.map((f) => (
        <div className="figures__item" key={f.value}>
          <dt>{f.value}</dt>
          <dd>{f.label}</dd>
        </div>
      ))}
    </dl>
    <p className="figure-note">{s.figuresNote}</p>
    {full && (
      <>
        <ol className="rows section__block" data-testid="solutions-method">
          {s.method.map((m) => (
            <li className="rows__item" key={m.n}>
              <span className="rows__n data">{m.n}</span>
              <span className="rows__name">{m.name}</span>
              <span className="rows__text">{m.text}</span>
            </li>
          ))}
        </ol>
        <div className="duo">
          <div>
            <h3>Casos frecuentes</h3>
            <ul className="plain-list">
              {s.cases.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Modelos de trabajo</h3>
            <ul className="plain-list">
              {s.models.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )}
  </>
);

export default SolutionsBlock;
