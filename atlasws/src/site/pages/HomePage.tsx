import React from "react";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import StatusTag from "../components/StatusTag";
import FigureNote from "../components/FigureNote";
import OrbitMotif from "../components/OrbitMotif";
import StepsStrip from "../components/StepsStrip";
import ClientLogos from "../components/ClientLogos";
import ProjectRows from "../components/ProjectRows";
import { hero, moonshot, pillars, closing } from "../content/home";
import { steps } from "../content/cortex";
import * as one from "../content/atlasOne";
import { projects } from "../../data/projects";
import { waLink, TRIAL_MESSAGE } from "../lib/whatsapp";
import "./pages.css";
import "./HomePage.css";

// El hero usa el motivo de órbitas en SVG (no WebGL): se ve igual sin GPU
// y queda estático con prefers-reduced-motion.
const HomePage: React.FC = () => {
  const portfolio = projects.filter((p) => p.slug !== "atlas-one");

  return (
    <SiteLayout>
      <section className="hero" data-testid="sec-hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow mono">{hero.eyebrow}</p>
            <h1>
              {hero.title} <em className="accent">{hero.accent}</em>
            </h1>
            <p className="lead hero__sub">{hero.sub}</p>
            <div className="cta-row">
              <CtaButton to="/contacto">Agenda una llamada</CtaButton>
              <CtaButton to="#como" variant="secondary">
                Cómo funciona
              </CtaButton>
            </div>
          </div>
          <div className="hero__visual">
            <OrbitMotif size={520} />
          </div>
        </div>
      </section>

      <section id="como" className="como" data-testid="sec-como">
        <div className="wrap">
          <StepsStrip steps={steps} />
        </div>
      </section>

      <Section testId="sec-moonshot" label={moonshot.label} className="moonshot">
        <div className="split">
          <h2 className="moonshot__title">{moonshot.title}</h2>
          <div>
            <p className="moonshot__text">{moonshot.text}</p>
            <p className="moonshot__note">{moonshot.note}</p>
          </div>
        </div>
      </Section>

      <Section testId="sec-construimos" label="Qué construimos">
        <div className="cols3">
          {pillars.map((p) => (
            <div className="cols3__item" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <div className="cta-row section__cta">
          <CtaButton to="/cortex" variant="secondary">
            Conoce Atlas Cortex
          </CtaButton>
        </div>
      </Section>

      <Section testId="sec-atlas-one" label="Atlas ONE">
        <div className="split">
          <div>
            <StatusTag status={one.atlasOneStatus} />
            <h2 className="split__title">La base operativa, ya en producción.</h2>
            <p className="lead">{one.head.text}</p>
            <p className="one__price">
              {one.pricing.from}. {one.pricing.trial} para probarlo.
            </p>
            <div className="cta-row">
              <CtaButton href={waLink(TRIAL_MESSAGE)}>Pruébalo 1 mes gratis</CtaButton>
              <CtaButton to="/atlas-one" variant="secondary">
                Conoce Atlas ONE
              </CtaButton>
            </div>
          </div>
          <div>
            <dl className="figures">
              {one.figures.map((f) => (
                <div className="figures__item" key={f.value}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
            <FigureNote
              source={one.figures[0].source}
              period={one.figures[0].period}
              cutoff={one.figures[0].cutoff}
            />
          </div>
        </div>
      </Section>

      <Section testId="sec-clientes" label="Empresas e instituciones con las que hemos trabajado">
        <ClientLogos />
      </Section>

      <Section testId="sec-portafolio" label="Portafolio">
        <ProjectRows projects={portfolio} />
        <div className="cta-row section__cta">
          <CtaButton to="/portafolio" variant="secondary">
            Ver el portafolio
          </CtaButton>
        </div>
      </Section>

      <section className="closing" data-testid="sec-cierre">
        <div className="wrap closing__grid">
          <div>
            <h2>{closing.title}</h2>
            <p className="lead">{closing.text}</p>
            <div className="cta-row">
              <CtaButton to="/contacto">Agenda una llamada</CtaButton>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default HomePage;
