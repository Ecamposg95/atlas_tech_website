import React from "react";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import StatusTag from "../components/StatusTag";
import OrbitMotif from "../components/OrbitMotif";
import StepsStrip from "../components/StepsStrip";
import * as c from "../content/cortex";
import "./pages.css";
import "./CortexPage.css";

const GROUPS: c.Capability["group"][] = ["hoy", "construccion", "vision"];

const CortexPage: React.FC = () => (
  <SiteLayout>
    <section className="page-head cortex-head" data-testid="cortex-head">
      <div className="wrap cortex-head__grid">
        <div>
          <div className="page-head__meta mono">
            <span>Consulting as a Service</span>
            <StatusTag status={c.cortexStatus} />
          </div>
          <h1>
            Atlas Cortex. <em className="accent">{c.tagline}</em>
          </h1>
          <p className="lead">{c.intro.text}</p>
          <div className="cta-row">
            <CtaButton to="/contacto">Agenda una llamada</CtaButton>
            <CtaButton to="#estado" variant="secondary">
              Qué funciona hoy
            </CtaButton>
          </div>
        </div>
        <div className="cortex-head__visual">
          <OrbitMotif size={360} />
        </div>
      </div>
    </section>

    <Section label="Consultoría + software">
      <h2 className="sec-title">{c.intro.title}</h2>
      <div className="cols3">
        {c.intro.points.map((p) => (
          <div className="cols3__item" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section label="Cómo funciona">
      <h2 className="sec-title">Actúa, registra, aprende y se reconstruye.</h2>
      <StepsStrip steps={c.steps} />
    </Section>

    <Section label="Qué funciona hoy y qué viene" id="estado" className="anchor">
      <h2 className="sec-title">Te decimos en qué etapa está cada cosa.</h2>
      <div className="stage">
        {GROUPS.map((g) => (
          <div className="stage__col" data-group={g} key={g}>
            <h3 className="stage__title">{c.groupTitles[g]}</h3>
            <ul>
              {c.capabilities
                .filter((cap) => cap.group === g)
                .map((cap) => (
                  <li className="stage__item" data-cap key={cap.name}>
                    <div className="stage__head">
                      <span className="stage__name">{cap.name}</span>
                      <StatusTag status={cap.status} />
                    </div>
                    <p>{cap.text}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    <Section testId="cortex-agents" label="Agentes">
      <div className="split">
        <div>
          <h2>{c.agentsTitle}</h2>
          <p className="lead agents__note">{c.agentsNote}</p>
          <p className="agents__line">{c.orchestratorLine}</p>
        </div>
        <ul className="agents">
          {c.agents.map((a) => (
            <li className="agents__item" key={a.name}>
              <div>
                <span className="agents__name">{a.name}</span>
                <p>{a.role}</p>
              </div>
              <StatusTag status={a.status} />
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section label="Autonomía progresiva">
      <h2 className="sec-title">Cada nivel se gana con evidencia del anterior.</h2>
      <ol className="ladder">
        {c.autonomyLevels.map((l, i) => (
          <li
            key={l.name}
            data-level
            className={"ladder__item" + (l.current ? " is-current" : "")}
            aria-current={l.current ? "step" : undefined}
          >
            <span className="ladder__n mono">Nivel {i + 1}</span>
            <h3>{l.name}</h3>
            <p>{l.text}</p>
            <div className="ladder__foot">
              <StatusTag status={l.status} />
              {l.current && <span className="ladder__now mono">Cortex hoy</span>}
            </div>
          </li>
        ))}
      </ol>
    </Section>

    <Section label="Gobierno">
      <div className="split">
        <div>
          <h2>La autonomía sin gobierno es un riesgo.</h2>
          <p className="lead agents__note">
            Por eso Cortex parte de un punto de control humano: las personas definen las reglas, aprueban las
            acciones y pueden revisar cada paso.
          </p>
        </div>
        <dl className="principles">
          {c.principles.map((p) => (
            <div className="principles__item" key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>

    <Section label="Cortex y Atlas ONE">
      <p className="bridge">{c.bridgeToOne}</p>
      <div className="cta-row section__cta">
        <CtaButton to="/atlas-one" variant="secondary">
          Conoce Atlas ONE
        </CtaButton>
      </div>
    </Section>

    <section className="closing">
      <div className="wrap">
        <h2>¿Qué objetivo quieres llevar a ejecución?</h2>
        <p className="lead">Cuéntanos el caso. Te decimos qué podemos hacer hoy y qué todavía no.</p>
        <div className="cta-row">
          <CtaButton to="/contacto">Agenda una llamada</CtaButton>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default CortexPage;
