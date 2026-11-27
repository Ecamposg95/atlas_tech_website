import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import StatusTag from "../components/StatusTag";
import Atmosphere from "../components/Atmosphere";
import HeroHorizon from "../components/HeroHorizon";
import StepsStrip from "../components/StepsStrip";
import ClientLogos from "../components/ClientLogos";
import ProjectRows from "../components/ProjectRows";
import SolutionsBlock from "../components/SolutionsBlock";
import { PosMock } from "../components/ProductVisuals";
import { KnowledgeGraph } from "../components/CortexVisuals";
import { FigureGroups, Timeline, Marquee } from "../components/Numbers";
import { head as solutionsHead, solutionsStatus } from "../content/solutions";
import { hero, marquee, moonshot, buildTitle, pillars, closing } from "../content/home";
import { steps, cortexStatus } from "../content/cortex";
import * as one from "../content/atlasOne";
import { projects } from "../../data/projects";
import { waLink, TRIAL_MESSAGE } from "../lib/whatsapp";
import "./pages.css";
import "./HomePage.css";

// Una composición de luz por vista: el amanecer de la portada arriba, el haz tras el
// statement y el horizonte en el cierre.
const RAIL = [
  { to: "/cortex", name: "Atlas Cortex", text: "Consultoría y agentes sobre una misma plataforma", status: cortexStatus },
  { to: "/atlas-one", name: "Atlas ONE", text: "ERP y punto de venta en operación", status: one.atlasOneStatus },
  { to: "/portafolio#solutions", name: "Atlas Solutions", text: "Ingeniería a la medida de cada reto", status: solutionsStatus },
];

const HomePage: React.FC = () => {
  const portfolio = projects.filter((p) => p.slug !== "atlas-one");

  return (
    <SiteLayout>
      {/* Portada: el amanecer de la marca a pantalla completa, bajo la navbar flotante. */}
      <section className="hero hero--epic" data-testid="sec-hero">
        <HeroHorizon />
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow mono">{hero.eyebrow}</p>
            <h1>
              {hero.title} <em className="accent">{hero.accent}</em>
            </h1>
            <p className="lead hero__sub">{hero.sub}</p>
            <div className="cta-row hero__cta">
              <CtaButton to="/contacto">Agenda una llamada</CtaButton>
              <CtaButton to="#como" variant="secondary">
                Cómo funciona
              </CtaButton>
            </div>
          </div>
          <ul className="hero__rail" data-testid="hero-rail">
            {RAIL.map((r) => (
              <li key={r.name}>
                <Link className="hero__rail-item" to={r.to}>
                  <span className="hero__rail-head">
                    <span className="hero__rail-name">{r.name}</span>
                    <StatusTag status={r.status} />
                  </span>
                  <span className="hero__rail-text">{r.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Marquee items={marquee} />

      <section id="como" className="section como" data-testid="sec-como">
        <div className="wrap">
          <div className="section__label">Cómo funciona</div>
          <StepsStrip steps={steps} />
        </div>
      </section>

      <section className="section statement" data-testid="sec-moonshot">
        <Atmosphere variant="beam" />
        <div className="wrap">
          <div className="statement__grid">
            <div className="section__label">{moonshot.label}</div>
            <div>
              <h2 className="statement__title">
                {moonshot.title} <em className="accent">{moonshot.accent}</em>
              </h2>
              <p className="lead statement__text">{moonshot.text}</p>
              <p className="statement__note">{moonshot.note}</p>
              <div className="cta-row">
                <CtaButton to="/vision" variant="secondary">
                  Conoce nuestra visión
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section testId="sec-cifras" label="Atlas en números">
        <h2 className="sec-title">Diez años construyendo. Esto es lo que hoy opera.</h2>
        <FigureGroups />
        <Timeline />
      </Section>

      <Section testId="sec-construimos" label="Qué construimos">
        <h2 className="sec-title">{buildTitle}</h2>
        <div className="cards4">
          {pillars.map((p, i) => (
            <article className={"card pillar" + (i === 0 ? " card--ember" : "")} data-testid="card" key={p.title}>
              <StatusTag status={p.status} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <div className="build__cortex">
          <KnowledgeGraph />
          <div>
            <StatusTag status={cortexStatus} />
            <h3 className="build__title">Atlas Cortex conecta lo que tu empresa sabe.</h3>
            <p className="lead">
              Clientes, proyectos, personas y decisiones en un solo grafo de conocimiento. Sobre él trabaja el agente:
              busca, propone la acción y espera a que una persona la confirme.
            </p>
            <div className="cta-row">
              <CtaButton to="/cortex" variant="secondary">
                Conoce Atlas Cortex
              </CtaButton>
            </div>
          </div>
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
            <ul className="one__modules">
              {one.modules.slice(0, 6).map((m) => (
                <li key={m.name}>{m.name}</li>
              ))}
            </ul>
          </div>
          <PosMock />
        </div>
      </Section>

      <Section testId="sec-solutions" label={solutionsHead.label}>
        <SolutionsBlock />
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

      <section className="closing closing--horizon" data-testid="sec-cierre">
        <div className="wrap">
          <h2>{closing.title}</h2>
          <p className="lead">{closing.text}</p>
          <div className="cta-row">
            <CtaButton to="/contacto">Agenda una llamada</CtaButton>
          </div>
        </div>
        <div className="closing__horizon">
          <Atmosphere variant="horizon" />
        </div>
      </section>
    </SiteLayout>
  );
};

export default HomePage;
