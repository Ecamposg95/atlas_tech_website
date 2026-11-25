import React from "react";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import StatusTag from "../components/StatusTag";
import FigureNote from "../components/FigureNote";
import Atmosphere from "../components/Atmosphere";
import StepsStrip from "../components/StepsStrip";
import ClientLogos from "../components/ClientLogos";
import ProjectRows from "../components/ProjectRows";
import { hero, heroStats, moonshot, buildTitle, pillars, closing } from "../content/home";
import { steps } from "../content/cortex";
import * as one from "../content/atlasOne";
import { projects } from "../../data/projects";
import { waLink, TRIAL_MESSAGE } from "../lib/whatsapp";
import "./pages.css";
import "./HomePage.css";

// Una fuente de luz por vista: la imagen de portada arriba, el haz tras el statement
// y el horizonte (motivo de la marca, en CSS) en el cierre.
// Para cambiar la portada basta con sustituir los archivos de /public/images/hero/.
const COVER = {
  src: "/images/hero/atlas-horizon.webp",
  srcSet: "/images/hero/atlas-horizon-960.webp 960w, /images/hero/atlas-horizon.webp 1672w",
};
const HomePage: React.FC = () => {
  const portfolio = projects.filter((p) => p.slug !== "atlas-one");

  return (
    <SiteLayout>
      {/* Portada: imagen de marca a pantalla completa, antes de la primera sección.
          El texto va dentro de la imagen; el alt lo expone a lectores de pantalla y buscadores. */}
      <section className="cover" data-testid="sec-portada">
        <img
          className="cover__img"
          src={COVER.src}
          srcSet={COVER.srcSet}
          sizes="100vw"
          width={1672}
          height={941}
          alt="Atlas Tech. Tecnología de frontera, aplicada."
          decoding="async"
        />
      </section>

      <section className="hero" data-testid="sec-hero">
        <div className="wrap hero__copy">
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
      </section>

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
          <dl className="stats" data-testid="home-stats">
            {heroStats.map((st) => (
              <div className="stats__item" key={st.value}>
                <dt>{st.value}</dt>
                <dd>{st.label}</dd>
              </div>
            ))}
          </dl>
          <FigureNote source={one.figures[0].source} period={one.figures[0].period} cutoff={one.figures[0].cutoff} />
        </div>
      </section>

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
          <ul className="one__modules">
            {one.modules.slice(0, 6).map((m) => (
              <li key={m.name}>{m.name}</li>
            ))}
          </ul>
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
