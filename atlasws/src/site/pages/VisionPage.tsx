import React from "react";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import StatusTag from "../components/StatusTag";
import Atmosphere from "../components/Atmosphere";
import { MoonshotScene, LayerStack, ActionGate, RoadmapTrack } from "../components/VisionVisuals";
import { AgentOrbit } from "../components/CortexVisuals";
import * as v from "../content/vision";
import "./pages.css";
import "./OtherPages.css";
import "./VisionPage.css";

// Luz en dos momentos: la portada "Moonshot" de la marca (horizonte, luna y trayectoria)
// y el cierre. Entre ambos la página respira sobre negro, con esquemas de línea.
const VisionPage: React.FC = () => (
  <SiteLayout>
    <section className="page-head vision-head" data-testid="vision-head">
      <MoonshotScene />
      <div className="wrap">
        <div className="section__label">{v.head.label}</div>
        <h1 className="vision__title">
          {v.head.title} <em className="accent">{v.head.accent}</em>
        </h1>
        <p className="lead">{v.head.text}</p>
      </div>
    </section>

    <Section label={v.era.label} testId="vision-layers">
      <div className="split split--center">
        <div>
          <h2>
            {v.era.title} <em className="accent">{v.era.accent}</em>
          </h2>
          <p className="lead era__text">{v.era.text}</p>
        </div>
        <LayerStack layers={v.layers} />
      </div>
      <ol className="rows rows--tag section__block">
        {v.layers.map((l) => (
          <li className={"rows__item" + (l.current ? " is-current" : "")} key={l.n}>
            <span className="rows__n data">{l.n}</span>
            <span className="rows__name">{l.name}</span>
            <span className="rows__text">{l.text}</span>
            <span className="rows__tag mono">{l.atlas}</span>
          </li>
        ))}
      </ol>
    </Section>

    <Section label="Hacia dónde vamos" testId="vision-stages">
      <ol className="stages">
        {v.stages.map((s) => (
          <li className="stages__item" key={s.when}>
            <span className="stages__when mono">{s.when}</span>
            <span className="stages__text">{s.text}</span>
            <StatusTag status={s.status} />
          </li>
        ))}
      </ol>
    </Section>

    <Section label="En qué creemos">
      <ul className="manifesto">
        {v.manifesto.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </Section>

    <Section label="Nuestro moonshot" testId="vision-definition">
      <div className="split split--center">
        <div>
          <h2>{v.definition.title}</h2>
          <div className="definition__orbit">
            <AgentOrbit
              testId="vision-org"
              agents={v.orgParts}
              core={{ name: "Propósito", role: "humano" }}
              label={`Esquema de una organización sintética: ${v.orgParts.join(", ")}, coordinados alrededor de un propósito humano.`}
            />
          </div>
        </div>
        <div>
          <p className="moonshot__text">{v.definition.text}</p>
          <p className="moonshot__note">{v.definition.note}</p>
        </div>
      </div>
      <dl className="principles">
        {v.principles.map((p) => (
          <div className="principles__item" key={p.name}>
            <dt>{p.name}</dt>
            <dd>{p.text}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section label="Lo que no buscamos">
      <ul className="manifesto manifesto--quiet">
        {v.notGoals.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </Section>

    <Section label={v.governance.label} testId="vision-governance">
      <div className="split">
        <h2>
          {v.governance.title} <em className="accent">{v.governance.accent}</em>
        </h2>
        <p className="lead">{v.governance.text}</p>
      </div>
      <dl className="principles">
        {v.actionLevels.map((a) => (
          <div className="principles__item" key={a.n}>
            <span className="data levels__n">{a.n}</span>
            <dt>{a.name}</dt>
            <dd>{a.text}</dd>
          </div>
        ))}
      </dl>
      <ActionGate levels={v.actionLevels} />
      <div className="duo">
        <div>
          <h3>Controles base</h3>
          <ul className="plain-list">
            {v.controls.slice(0, 3).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 aria-hidden="true">&nbsp;</h3>
          <ul className="plain-list">
            {v.controls.slice(3).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>

    <Section label="Cómo lo financiamos">
      <h2 className="sec-title">El negocio de hoy financia la investigación de mañana.</h2>
      <div className="cols3">
        {v.horizons.map((h) => (
          <div className="cols3__item" key={h.n}>
            <span className="data horizons__n">{h.n}</span>
            <h3>{h.name}</h3>
            <p>{h.text}</p>
            <p className="horizons__measure">Medimos: {h.measure}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section label="Hoja de ruta" testId="vision-roadmap">
      <RoadmapTrack phases={v.roadmap} />
      <ol className="roadmap">
        {v.roadmap.map((r) => (
          <li className="roadmap__item" key={r.years}>
            <span className="roadmap__years data">{r.years}</span>
            <span className="roadmap__name">{r.name}</span>
            <span className="roadmap__goal">{r.goal}</span>
            <span className="roadmap__gate">Avanzamos cuando: {r.gate}</span>
          </li>
        ))}
      </ol>
      <p className="figure-note">{v.roadmapNote}</p>
    </Section>

    <Section label={v.labs.label} testId="vision-labs">
      <div className="split">
        <div>
          <StatusTag status={v.labs.status} />
          <h2 className="split__title">{v.labs.title}</h2>
          <p className="lead">{v.labs.text}</p>
          <ul className="plain-list labs__method">
            {v.labsMethod.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <dl className="lines">
          {v.researchLines.map((l) => (
            <div className="lines__item" key={l.name}>
              <dt>{l.name}</dt>
              <dd>{l.question}</dd>
              <dd className="lines__exp">Primer experimento: {l.experiment}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>

    <section className="closing">
      <Atmosphere variant="close" />
      <div className="wrap">
        <h2>
          {v.closing.title} <em className="accent">{v.closing.accent}</em>
        </h2>
        <p className="lead">{v.closing.text}</p>
        <div className="cta-row">
          <CtaButton to="/contacto">Agenda una llamada</CtaButton>
          <CtaButton to="/cortex" variant="secondary">
            Conoce Atlas Cortex
          </CtaButton>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default VisionPage;
