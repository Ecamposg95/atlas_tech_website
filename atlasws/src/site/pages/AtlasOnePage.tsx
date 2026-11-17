import React from "react";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import StatusTag from "../components/StatusTag";
import FigureNote from "../components/FigureNote";
import { Lockup } from "../components/SiteHeader";
import { AtlasOneDemosPlayer } from "../../components/AtlasOneDemos/AtlasOneDemos";
import * as one from "../content/atlasOne";
import { waLink, TRIAL_MESSAGE } from "../lib/whatsapp";
import "./pages.css";
import "./AtlasOnePage.css";

const trialHref = waLink(TRIAL_MESSAGE);

const AtlasOnePage: React.FC = () => (
  <SiteLayout>
    <section className="page-head" data-testid="one-head">
      <div className="wrap">
        <div className="page-head__meta mono">
          <Lockup product="ONE" />
          <StatusTag status={one.atlasOneStatus} />
        </div>
        <h1 className="one-head__title">
          Atlas ONE. El problema no es cobrar — es <em className="accent">operar sin visibilidad.</em>
        </h1>
        <p className="lead">{one.head.text}</p>
        <div className="cta-row">
          <CtaButton href={trialHref}>Pruébalo 1 mes gratis</CtaButton>
          <CtaButton to="#demo" variant="secondary">
            Ver el demo
          </CtaButton>
        </div>
      </div>
    </section>

    <Section label="En operación">
      <dl className="figures figures--row">
        {one.figures.map((f) => (
          <div className="figures__item" key={f.value}>
            <dt>{f.value}</dt>
            <dd>{f.label}</dd>
          </div>
        ))}
      </dl>
      <FigureNote source={one.figures[0].source} period={one.figures[0].period} cutoff={one.figures[0].cutoff} />
    </Section>

    <Section label="Demo interactivo" id="demo" className="anchor">
      <h2 className="sec-title">Un solo software, una experiencia por giro.</h2>
      <div className="one-demo">
        <AtlasOneDemosPlayer />
      </div>
      <p className="figure-note">Demostración de interfaz con datos de ejemplo.</p>
    </Section>

    <Section label="Módulos">
      <h2 className="sec-title">Empieza con el punto de venta. Activa lo demás cuando lo necesites.</h2>
      <ul className="modules">
        {one.modules.map((m) => (
          <li className="modules__item" data-module key={m.name}>
            <div className="modules__head">
              <h3>{m.name}</h3>
              <StatusTag status={m.status} />
            </div>
            <p>{m.text}</p>
          </li>
        ))}
      </ul>
    </Section>

    <Section label="Giros">
      <div className="split">
        <h2>{one.verticalsLine}</h2>
        <ul className="verticals" data-testid="one-verticals">
          {one.verticals.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>
    </Section>

    <Section label="Precio">
      <div className="split">
        <div>
          <h2>
            {one.pricing.from}. {one.pricing.trial}.
          </h2>
        </div>
        <div>
          <p className="lead">{one.pricing.text}</p>
          <div className="cta-row">
            <CtaButton href={trialHref}>Pruébalo 1 mes gratis</CtaButton>
          </div>
          <p className="one-landing">
            Sitio del producto:{" "}
            <a href={one.landingUrl} target="_blank" rel="noopener noreferrer">
              atlasone.com.mx
            </a>
          </p>
          <p className="one-stack data">{one.stack.join(" / ")}</p>
        </div>
      </div>
    </Section>

    <Section label="Atlas ONE y Cortex">
      <div className="split">
        <h2>{one.bridgeToCortex.title}</h2>
        <div>
          <p className="lead">{one.bridgeToCortex.text}</p>
          <div className="cta-row">
            <CtaButton to="/cortex" variant="secondary">
              Conoce Atlas Cortex
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  </SiteLayout>
);

export default AtlasOnePage;
